import crypto from 'crypto';
import { ObjectId } from 'mongodb';
import { NextRequest } from 'next/server';
import { ensureIndexes, getDb } from './mongodb';

interface UserDoc {
  _id: ObjectId;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

interface AuthSessionDoc {
  token: string;
  userId: ObjectId;
  expiresAt: Date;
  createdAt: Date;
}

export interface AuthContext {
  token: string;
  userId: ObjectId;
  email: string;
}

export function sanitizeEmail(email: unknown) {
  return typeof email === 'string' ? email.trim().toLowerCase() : '';
}

export function validatePassword(password: unknown) {
  return typeof password === 'string' && password.length >= 6;
}

export function createPasswordHash(password: string) {
  const salt = crypto.randomBytes(16).toString('hex');
  const digest = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${digest}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, digest] = storedHash.split(':');
  if (!salt || !digest) {
    return false;
  }

  const computed = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(digest, 'hex');

  if (computed.length !== expected.length) {
    return false;
  }

  return crypto.timingSafeEqual(computed, expected);
}

export function createAuthToken() {
  return crypto.randomBytes(32).toString('hex');
}

function readBearerToken(request: NextRequest) {
  const header = request.headers.get('authorization') || '';
  if (!header.startsWith('Bearer ')) {
    return null;
  }
  return header.slice(7).trim() || null;
}

export async function getAuthContext(request: NextRequest): Promise<AuthContext | null> {
  await ensureIndexes();

  const token = readBearerToken(request);
  if (!token) {
    return null;
  }

  const db = await getDb();

  const session = await db.collection<AuthSessionDoc>('auth_sessions').findOne({ token });
  if (!session || session.expiresAt.getTime() < Date.now()) {
    return null;
  }

  const user = await db.collection<UserDoc>('users').findOne({ _id: session.userId });
  if (!user) {
    return null;
  }

  return {
    token,
    userId: user._id,
    email: user.email,
  };
}

export async function createSessionForUser(userId: ObjectId) {
  await ensureIndexes();

  const token = createAuthToken();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 30);

  const db = await getDb();
  await db.collection<AuthSessionDoc>('auth_sessions').insertOne({
    token,
    userId,
    createdAt: now,
    expiresAt,
  });

  return token;
}
