import { GoogleGenAI, Type } from '@google/genai';

const SYSTEM_INSTRUCTION =
  'You are a helpful AI assistant. Always provide a text response and 2-3 relevant follow-up suggestions that help the user explore the topic deeper or branch the conversation in interesting directions.';

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    text: {
      type: Type.STRING,
      description: 'The main text response from the AI.',
    },
    suggestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          label: {
            type: Type.STRING,
            description: 'A short, catchy label for the suggestion button.',
          },
          prompt: {
            type: Type.STRING,
            description: 'The full prompt that will be sent if the user clicks this suggestion.',
          },
        },
        required: ['label', 'prompt'],
      },
      description: 'A list of 2-3 suggested follow-up actions or questions.',
    },
  },
  required: ['text', 'suggestions'],
};

let ai: GoogleGenAI | null = null;

function safeParseResponse(text: string | null | undefined) {
  try {
    const parsed = JSON.parse(text || '{}');
    if (parsed && typeof parsed.text === 'string' && Array.isArray(parsed.suggestions)) {
      return parsed;
    }
  } catch {
  }

  return {
    text: text || "I'm sorry, I couldn't generate a response.",
    suggestions: [],
  };
}

function getGeminiApiKey() {
  return process.env.GEMINI_API_KEY || process.env.AI_STUDIO_API_KEY;
}

export async function generateWithGemini(history: any[], content: string) {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY (or AI_STUDIO_API_KEY) not configured on server.');
  }

  if (!ai) {
    ai = new GoogleGenAI({ apiKey });
  }

  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || 'gemini-3-flash-preview',
    contents: [...history, { role: 'user', parts: [{ text: content }] }],
    config: {
      responseMimeType: 'application/json',
      responseSchema: RESPONSE_SCHEMA,
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });

  return safeParseResponse(response.text);
}

export async function generateWithOpenAI(history: any[], content: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY not configured on server.');
  }

  const messages = [
    { role: 'system', content: SYSTEM_INSTRUCTION },
    ...history.map((item) => ({
      role: item.role === 'model' ? 'assistant' : 'user',
      content: item.parts?.[0]?.text || '',
    })),
    { role: 'user', content },
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
      messages,
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'branchchat_response',
          schema: {
            type: 'object',
            properties: {
              text: { type: 'string' },
              suggestions: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    label: { type: 'string' },
                    prompt: { type: 'string' },
                  },
                  required: ['label', 'prompt'],
                },
              },
            },
            required: ['text', 'suggestions'],
            additionalProperties: false,
          },
        },
      },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI request failed: ${text}`);
  }

  const result: any = await response.json();
  const rawContent = result?.choices?.[0]?.message?.content;
  return safeParseResponse(rawContent);
}
