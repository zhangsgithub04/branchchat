import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import {
  createPasswordHash,
  createSessionForUser,
  sanitizeEmail,
  validatePassword,
} from '@/lib/auth';
import { ensureIndexes, getDb } from '@/lib/mongodb';

export const runtime = 'nodejs';

interface UserDoc {
  _id: ObjectId;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

export async function POST(request: NextRequest) {
  try {
    await ensureIndexes();

    const body = await request.json();
    const email = sanitizeEmail(body?.email);
    const password = body?.password;

    if (!email || !validatePassword(password)) {
      return NextResponse.json(
        { error: 'Email and new password (min 6 chars) are required.' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const user = await db.collection<UserDoc>('users').findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'Account not found. Please sign up first.' }, { status: 404 });
    }

    await db.collection<UserDoc>('users').updateOne(
      { _id: user._id },
      { $set: { passwordHash: createPasswordHash(password) } }
    );

    const token = await createSessionForUser(user._id);

    return NextResponse.json({
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ error: 'Failed to reset password.' }, { status: 500 });
  }
}
