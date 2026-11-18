# JARVIS — Stariuxe Enterprises

Responsive installable Next.js PWA starter for Windows 11 and Android. Includes browser-native speech synthesis with a female-voice preference and speech recognition where supported.

## Development
Node.js 20+, then `npm install`, `npm run dev`.

## Deployment
Connect to Vercel as a Next.js project. Add Supabase URL and anon key only for a future authenticated backend. Never expose service-role keys in browser code.

## Important
This is a UI prototype, not a connected autonomous agent. External integrations require separate OAuth/API authorisation, server-side secret storage, scoped permissions, audit logs and approvals. Voice availability depends on browser and installed OS voices.

## Install
After HTTPS deployment, use Edge/Chrome install-app controls on Windows 11; on Android use Chrome menu > Install app / Add to Home screen.