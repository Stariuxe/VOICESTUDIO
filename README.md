# JARVIS — Stariuxe Enterprises

JARVIS is a responsive Next.js command-centre app for Windows 11 and Android. It includes Supabase email/password authentication, a protected AI chat endpoint, browser speech input where supported, female-voice preference for speech output, and PWA install metadata.

## Development

Requires Node.js 20+.

```bash
npm install
npm run dev
```

## Vercel environment variables

Configure these in the Vercel project settings for the environments you deploy:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (publishable/anon key only; never use a service-role key in browser code)
- `OPENAI_API_KEY` (server-side secret; never prefix with `NEXT_PUBLIC_`)

After changing environment variables, create a new deployment so the deployment receives the updated values.

## Security and integrations

The dashboard and chat endpoint require a signed-in Supabase user. The OpenAI key is used only by the server-side API route. The health endpoint reports whether required configuration is present; it does not prove that external services are reachable or that credentials are valid.

External services such as GitHub, Vercel, Gmail, Stripe, PayPal, Canva, and PropertyOS AI must each be connected through their own OAuth/API authorisation and least-privilege permissions before JARVIS can access them. No autonomous money movement, publishing, account changes, or other consequential actions should run without explicit approval and an audit trail.

## Voice and installation

Voice features depend on browser support and installed operating-system voices. On Windows 11, use Edge or Chrome's install-app control after HTTPS deployment. On Android, use Chrome menu > Install app / Add to Home screen.

## Branches

The `jarvis-preview` branch is for preview testing. Promote to the production branch only after authentication, AI chat, voice, and mobile checks pass.
