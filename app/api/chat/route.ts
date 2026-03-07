import { NextRequest, NextResponse } from 'next/server';
import { getAuthContext } from '@/lib/auth';
import { generateWithGemini, generateWithOpenAI } from '@/lib/ai';

export const runtime = 'nodejs';

type Provider = 'gemini' | 'openai';

function normalizeProvider(value: unknown): Provider {
  return value === 'openai' ? 'openai' : 'gemini';
}

function isGeminiKeyDenied(error: unknown) {
  const message = error instanceof Error ? error.message : String(error || '');
  return (
    message.includes('PERMISSION_DENIED') ||
    message.includes('reported as leaked') ||
    message.includes('API key')
  );
}

export async function POST(request: NextRequest) {
  const auth = await getAuthContext(request);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const history = Array.isArray(body?.history) ? body.history : [];
    const content = typeof body?.content === 'string' ? body.content : '';
    const provider = normalizeProvider(body?.provider);

    if (provider === 'openai') {
      const result = await generateWithOpenAI(history, content);
      return NextResponse.json({ ...result, providerUsed: 'openai' });
    }

    try {
      const result = await generateWithGemini(history, content);
      return NextResponse.json({ ...result, providerUsed: 'gemini' });
    } catch (geminiError) {
      if (!isGeminiKeyDenied(geminiError)) {
        throw geminiError;
      }

      // Fallback so chats still work when Gemini key is revoked/leaked.
      const fallback = await generateWithOpenAI(history, content);
      return NextResponse.json({ ...fallback, providerUsed: 'openai' });
    }
  } catch (error: any) {
    console.error('AI proxy error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate response' },
      { status: 500 }
    );
  }
}
