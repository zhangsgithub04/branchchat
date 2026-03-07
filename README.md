# BranchChat (Next.js + MongoDB)

BranchChat is a full-stack Next.js application for branching AI conversations, visual tree navigation, and learning-style insights.

## Tech Stack

- Next.js App Router (frontend + API routes)
- MongoDB for users, auth sessions, and saved chat sessions
- Gemini and OpenAI provider support through server-side API proxies

## Run Locally

Prerequisites:
- Node.js 20+
- MongoDB Atlas (or another MongoDB instance)

1. Install dependencies:
   `npm install`
2. Create `.env.local` using `.env.example` and set:
   - `MONGODB_URI`
   - `MONGODB_DB_NAME` (optional, defaults to `branchchat`)
   - `REGISTRATION_SECRET_KEY`
   - `GEMINI_API_KEY` and/or `OPENAI_API_KEY`
3. Start development server:
   `npm run dev`
4. Open:
   `http://localhost:3000`

## API Endpoints

- Auth: `/api/auth/signup`, `/api/auth/signin`, `/api/auth/reset-password`, `/api/auth/me`, `/api/auth/logout`
- Sessions: `/api/sessions`, `/api/sessions/:id`
- Chat proxy: `/api/chat`

## Deployment Notes

- Build with: `npm run build`
- Start with: `npm run start`
- If frontend and backend are deployed on different origins, set `NEXT_PUBLIC_API_BASE_URL`.
