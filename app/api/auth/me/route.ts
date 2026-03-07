import { NextRequest, NextResponse } from 'next/server';
import { getAuthContext } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      id: auth.userId.toString(),
      email: auth.email,
    },
  });
}
