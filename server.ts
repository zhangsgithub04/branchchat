import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import Database from "better-sqlite3";
import crypto from "crypto";
import path from "path";

dotenv.config({ path: ".env.local" });
dotenv.config();

let ai: GoogleGenAI | null = null;
const SYSTEM_INSTRUCTION = "You are a helpful AI assistant. Always provide a text response and 2-3 relevant follow-up suggestions that help the user explore the topic deeper or branch the conversation in interesting directions.";

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    text: {
      type: Type.STRING,
      description: "The main text response from the AI.",
    },
    suggestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          label: {
            type: Type.STRING,
            description: "A short, catchy label for the suggestion button.",
          },
          prompt: {
            type: Type.STRING,
            description: "The full prompt that will be sent if the user clicks this suggestion.",
          },
        },
        required: ["label", "prompt"],
      },
      description: "A list of 2-3 suggested follow-up actions or questions.",
    },
  },
  required: ["text", "suggestions"],
};

type Provider = "gemini" | "openai";

type AuthenticatedRequest = express.Request & {
  userId?: number;
  token?: string;
};

const db = new Database(path.join(process.cwd(), "branchchat.db"));

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS auth_sessions (
    token TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    expires_at INTEGER NOT NULL,
    created_at INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS chat_sessions (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    conversation_state TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_updated
  ON chat_sessions(user_id, updated_at DESC);
`);

function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const digest = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${digest}`;
}

function verifyPassword(password: string, storedHash: string) {
  const [salt, digest] = storedHash.split(":");
  if (!salt || !digest) {
    return false;
  }

  const computed = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(digest, "hex");
  if (computed.length !== expected.length) {
    return false;
  }

  return crypto.timingSafeEqual(computed, expected);
}

function createAuthToken() {
  return crypto.randomBytes(32).toString("hex");
}

function sanitizeEmail(email: unknown) {
  return typeof email === "string" ? email.trim().toLowerCase() : "";
}

function validatePassword(password: unknown) {
  return typeof password === "string" && password.length >= 6;
}

function readAuthToken(req: express.Request) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return null;
  }
  return header.slice(7).trim() || null;
}

function authRequired(req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) {
  const token = readAuthToken(req);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const row = db
    .prepare("SELECT user_id, expires_at FROM auth_sessions WHERE token = ?")
    .get(token) as { user_id: number; expires_at: number } | undefined;

  if (!row || row.expires_at < Date.now()) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  req.userId = row.user_id;
  req.token = token;
  next();
}

function normalizeProvider(value: unknown): Provider {
  return value === "openai" ? "openai" : "gemini";
}

function getGeminiApiKey() {
  return process.env.GEMINI_API_KEY || process.env.AI_STUDIO_API_KEY;
}

function safeParseResponse(text: string | null | undefined) {
  try {
    const parsed = JSON.parse(text || "{}");
    if (parsed && typeof parsed.text === "string" && Array.isArray(parsed.suggestions)) {
      return parsed;
    }
  } catch {
  }

  return {
    text: text || "I'm sorry, I couldn't generate a response.",
    suggestions: [],
  };
}

async function generateWithGemini(history: any[], content: string) {
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY (or AI_STUDIO_API_KEY) not configured on server.");
  }

  if (!ai) {
    ai = new GoogleGenAI({ apiKey });
  }

  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-3-flash-preview",
    contents: [
      ...history,
      { role: "user", parts: [{ text: content }] },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA,
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });

  return safeParseResponse(response.text);
}

async function generateWithOpenAI(history: any[], content: string) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY not configured on server.");
  }

  const messages = [
    { role: "system", content: SYSTEM_INSTRUCTION },
    ...history.map((item) => ({
      role: item.role === "model" ? "assistant" : "user",
      content: item.parts?.[0]?.text || "",
    })),
    { role: "user", content },
  ];

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      messages,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "branchchat_response",
          schema: {
            type: "object",
            properties: {
              text: { type: "string" },
              suggestions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    label: { type: "string" },
                    prompt: { type: "string" },
                  },
                  required: ["label", "prompt"],
                },
              },
            },
            required: ["text", "suggestions"],
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

async function startServer() {
  const app = express();
  const PORT = 3000;
  const isDevScript = process.env.npm_lifecycle_event === "dev";

  app.use(express.json());

  app.post("/api/auth/signup", (req, res) => {
    try {
      const email = sanitizeEmail(req.body?.email);
      const password = req.body?.password;

      if (!email || !validatePassword(password)) {
        return res.status(400).json({ error: "Email and password (min 6 chars) are required." });
      }

      const exists = db.prepare("SELECT id FROM users WHERE email = ?").get(email) as { id: number } | undefined;
      if (exists) {
        return res.status(409).json({ error: "Email already exists." });
      }

      const now = Date.now();
      const insert = db
        .prepare("INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, ?)")
        .run(email, hashPassword(password), now);

      const userId = Number(insert.lastInsertRowid);
      const token = createAuthToken();
      const expiresAt = now + 1000 * 60 * 60 * 24 * 30;

      db.prepare("INSERT INTO auth_sessions (token, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)")
        .run(token, userId, expiresAt, now);

      return res.json({ token, user: { id: userId, email } });
    } catch (error: any) {
      console.error("Sign up error:", error);
      return res.status(500).json({ error: "Failed to sign up." });
    }
  });

  app.post("/api/auth/signin", (req, res) => {
    try {
      const email = sanitizeEmail(req.body?.email);
      const password = req.body?.password;

      if (!email || typeof password !== "string") {
        return res.status(400).json({ error: "Email and password are required." });
      }

      const user = db
        .prepare("SELECT id, email, password_hash FROM users WHERE email = ?")
        .get(email) as { id: number; email: string; password_hash: string } | undefined;

      if (!user || !verifyPassword(password, user.password_hash)) {
        return res.status(401).json({ error: "Invalid credentials." });
      }

      const now = Date.now();
      const token = createAuthToken();
      const expiresAt = now + 1000 * 60 * 60 * 24 * 30;

      db.prepare("INSERT INTO auth_sessions (token, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)")
        .run(token, user.id, expiresAt, now);

      return res.json({ token, user: { id: user.id, email: user.email } });
    } catch (error: any) {
      console.error("Sign in error:", error);
      return res.status(500).json({ error: "Failed to sign in." });
    }
  });

  app.post("/api/auth/reset-password", (req, res) => {
    try {
      const email = sanitizeEmail(req.body?.email);
      const password = req.body?.password;

      if (!email || !validatePassword(password)) {
        return res.status(400).json({ error: "Email and new password (min 6 chars) are required." });
      }

      const user = db
        .prepare("SELECT id, email FROM users WHERE email = ?")
        .get(email) as { id: number; email: string } | undefined;

      if (!user) {
        return res.status(404).json({ error: "Account not found. Please sign up first." });
      }

      db.prepare("UPDATE users SET password_hash = ? WHERE id = ?").run(hashPassword(password), user.id);

      const now = Date.now();
      const token = createAuthToken();
      const expiresAt = now + 1000 * 60 * 60 * 24 * 30;

      db.prepare("INSERT INTO auth_sessions (token, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)")
        .run(token, user.id, expiresAt, now);

      return res.json({ token, user: { id: user.id, email: user.email } });
    } catch (error: any) {
      console.error("Reset password error:", error);
      return res.status(500).json({ error: "Failed to reset password." });
    }
  });

  app.get("/api/auth/me", authRequired, (req: AuthenticatedRequest, res) => {
    const user = db
      .prepare("SELECT id, email FROM users WHERE id = ?")
      .get(req.userId) as { id: number; email: string } | undefined;

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.json({ user });
  });

  app.post("/api/auth/logout", authRequired, (req: AuthenticatedRequest, res) => {
    db.prepare("DELETE FROM auth_sessions WHERE token = ?").run(req.token);
    res.json({ ok: true });
  });

  app.get("/api/sessions", authRequired, (req: AuthenticatedRequest, res) => {
    const rows = db
      .prepare(
        "SELECT id, title, created_at as createdAt, updated_at as updatedAt FROM chat_sessions WHERE user_id = ? ORDER BY updated_at DESC"
      )
      .all(req.userId);
    res.json({ sessions: rows });
  });

  app.post("/api/sessions", authRequired, (req: AuthenticatedRequest, res) => {
    const now = Date.now();
    const id = crypto.randomUUID();
    const title = typeof req.body?.title === "string" && req.body.title.trim() ? req.body.title.trim() : "New Session";
    const state = req.body?.state || { nodes: {}, activeNodeId: null, rootId: null };

    db.prepare(
      "INSERT INTO chat_sessions (id, user_id, title, conversation_state, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
    ).run(id, req.userId, title, JSON.stringify(state), now, now);

    res.json({
      session: {
        id,
        title,
        createdAt: now,
        updatedAt: now,
      },
    });
  });

  app.get("/api/sessions/:id", authRequired, (req: AuthenticatedRequest, res) => {
    const row = db
      .prepare(
        "SELECT id, title, conversation_state as conversationState, created_at as createdAt, updated_at as updatedAt FROM chat_sessions WHERE id = ? AND user_id = ?"
      )
      .get(req.params.id, req.userId) as
      | { id: string; title: string; conversationState: string; createdAt: number; updatedAt: number }
      | undefined;

    if (!row) {
      return res.status(404).json({ error: "Session not found." });
    }

    return res.json({
      session: {
        id: row.id,
        title: row.title,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        state: JSON.parse(row.conversationState),
      },
    });
  });

  app.put("/api/sessions/:id", authRequired, (req: AuthenticatedRequest, res) => {
    const now = Date.now();
    const state = req.body?.state;
    const title = typeof req.body?.title === "string" && req.body.title.trim() ? req.body.title.trim() : "New Session";

    if (!state) {
      return res.status(400).json({ error: "Session state is required." });
    }

    const result = db
      .prepare(
        "UPDATE chat_sessions SET title = ?, conversation_state = ?, updated_at = ? WHERE id = ? AND user_id = ?"
      )
      .run(title, JSON.stringify(state), now, req.params.id, req.userId);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Session not found." });
    }

    return res.json({ ok: true, updatedAt: now });
  });

  // API route for Gemini proxy
  app.post("/api/chat", authRequired, async (req: AuthenticatedRequest, res) => {
    try {
      const { history = [], content = "", provider } = req.body;

      const selectedProvider = normalizeProvider(provider);

      const result = selectedProvider === "openai"
        ? await generateWithOpenAI(history, content)
        : await generateWithGemini(history, content);

      res.json(result);
    } catch (error: any) {
      console.error("AI Proxy Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate response" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: isDevScript ? undefined : false,
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
