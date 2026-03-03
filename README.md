<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/0eae8b09-c83e-4900-be28-8ffce9a35208

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set one or both keys in [.env.local](.env.local):
   - `GEMINI_API_KEY=...` or `AI_STUDIO_API_KEY=...` for AI Studio (Gemini)
   - `OPENAI_API_KEY=...` for OpenAI
   - Optional model overrides: `GEMINI_MODEL` and `OPENAI_MODEL`
3. In the app header, use the `Provider` selector to switch between AI Studio and OpenAI.
4. Run the app:
   `npm run dev`

## Authentication and Sessions

- The app now includes `Sign in` and `Sign up` flows.
- Login session is stored in browser localStorage and validated by `/api/auth/me`.
- Conversation sessions are persisted on the server (`branchchat.db`) and shown in `Session History`.
- You can create, select, and resume whole prior sessions from the right panel.
