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
  _id?: ObjectId;
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
    const registrationKey = typeof body?.registrationKey === 'string' ? body.registrationKey.trim() : '';
    const requiredRegistrationKey =
      process.env.REGISTRATION_SECRETE_KEY || process.env.REGISTRATION_SECRET_KEY || '';

    if (!requiredRegistrationKey) {
      return NextResponse.json({ error: 'Registration key is not configured on server.' }, { status: 500 });
    }

    if (!registrationKey || registrationKey !== requiredRegistrationKey) {
      return NextResponse.json({ error: 'Invalid registration secret key.' }, { status: 403 });
    }

    if (!email || !validatePassword(password)) {
      return NextResponse.json({ error: 'Email and password (min 6 chars) are required.' }, { status: 400 });
    }

    const db = await getDb();
    const existing = await db.collection<UserDoc>('users').findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'Email already exists.' }, { status: 409 });
    }

    const createdAt = new Date();
    const insertResult = await db.collection<UserDoc>('users').insertOne({
      email,
      passwordHash: createPasswordHash(password),
      createdAt,
    });

    const userId = insertResult.insertedId;
    const token = await createSessionForUser(userId);

    return NextResponse.json({
      token,
      user: {
        id: userId.toString(),
        email,
      },
    });
  } catch (error) {
    console.error('Sign up error:', error);
    return NextResponse.json({ error: 'Failed to sign up.' }, { status: 500 });
  }
}
