import crypto from 'crypto';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthContext } from '@/lib/auth';
import { getDb } from '@/lib/mongodb';

export const runtime = 'nodejs';

interface ChatSessionDoc {
  _id: string;
  userId: ObjectId;
  title: string;
  conversationState: unknown;
  createdAt: number;
  updatedAt: number;
}

export async function GET(request: NextRequest) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = await getDb();
  const sessions = await db
    .collection<ChatSessionDoc>('chat_sessions')
    .find({ userId: auth.userId })
    .project({ _id: 1, title: 1, createdAt: 1, updatedAt: 1 })
    .sort({ updatedAt: -1 })
    .toArray();

  return NextResponse.json({
    sessions: sessions.map((s) => ({
      id: s._id,
      title: s.title,
      createdAt: s.createdAt,
      updatedAt: s.updatedAt,
    })),
  });
}

export async function POST(request: NextRequest) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const now = Date.now();
  const id = crypto.randomUUID();
  const title = typeof body?.title === 'string' && body.title.trim() ? body.title.trim() : 'New Session';
  const state = body?.state || { nodes: {}, activeNodeId: null, rootId: null };

  const db = await getDb();
  await db.collection<ChatSessionDoc>('chat_sessions').insertOne({
    _id: id,
    userId: auth.userId,
    title,
    conversationState: state,
    createdAt: now,
    updatedAt: now,
  });

  return NextResponse.json({
    session: {
      id,
      title,
      createdAt: now,
      updatedAt: now,
    },
  });
}
