import { NextRequest, NextResponse } from 'next/server';
import { getAuthContext } from '@/lib/auth';
import { getDb } from '@/lib/mongodb';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = await getDb();
  await db.collection('auth_sessions').deleteOne({ token: auth.token });

  return NextResponse.json({ ok: true });
}
