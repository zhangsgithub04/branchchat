import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import {
  createSessionForUser,
  sanitizeEmail,
  verifyPassword,
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

    if (!email || typeof password !== 'string') {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const db = await getDb();
    const user = await db.collection<UserDoc>('users').findOne({ email });

    if (!user || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    const token = await createSessionForUser(user._id);

    return NextResponse.json({
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Sign in error:', error);
    return NextResponse.json({ error: 'Failed to sign in.' }, { status: 500 });
  }
}
