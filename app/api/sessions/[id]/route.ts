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

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;
  const db = await getDb();

  const session = await db.collection<ChatSessionDoc>('chat_sessions').findOne({
    _id: id,
    userId: auth.userId,
  });

  if (!session) {
    return NextResponse.json({ error: 'Session not found.' }, { status: 404 });
  }

  return NextResponse.json({
    session: {
      id: session._id,
      title: session.title,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
      state: session.conversationState,
    },
  });
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json();
  const state = body?.state;
  const title = typeof body?.title === 'string' && body.title.trim() ? body.title.trim() : 'New Session';

  if (!state) {
    return NextResponse.json({ error: 'Session state is required.' }, { status: 400 });
  }

  const db = await getDb();
  const now = Date.now();
  const result = await db.collection<ChatSessionDoc>('chat_sessions').updateOne(
    { _id: id, userId: auth.userId },
    { $set: { title, conversationState: state, updatedAt: now } }
  );

  if (result.matchedCount === 0) {
    return NextResponse.json({ error: 'Session not found.' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, updatedAt: now });
}
