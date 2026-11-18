# JANE — Stariuxe Enterprises

JANE is a responsive Next.js personal assistant for phone and laptop. It uses Supabase Auth for owner sign-in and routes AI requests through Vercel AI Gateway.

## Intelligent routing

- Tier 1: deterministic replies for a small set of greetings and acknowledgements; no model call.
- Tier 2: everyday questions routed to the configured quick model.
- Tier 3: coding, research, strategy and multi-step work routed to the configured work model.

The tier classifier is a lightweight heuristic, not a separate AI call. The route never executes external actions; consequential actions require separate authenticated tools and explicit approval.

## Development

Requires Node.js 20+.

```bash
npm install
npm run dev
```

## Vercel environment variables

Required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (publishable/anon key only)
- `JARVIS_ALLOWED_EMAILS` (server-side allowlist of the owner account)
- `AI_GATEWAY_API_KEY` (server-side secret), or Vercel OIDC configured for the deployment

Optional:
- `JANE_QUICK_MODEL` (default: `openai/gpt-4.1-mini`)
- `JANE_WORK_MODEL` (default: `openai/gpt-5-mini`)

Never put secrets in browser code, Git, chat, or a `NEXT_PUBLIC_` variable. Do not add a Supabase service-role key to this application.

After changing environment variables, redeploy so the deployment receives the updated values. AI Gateway usage may incur charges; monitor Gateway usage and budgets.

## Security

The chat endpoint validates the signed-in Supabase user and checks the server-side owner allowlist before any AI request. The AI Gateway credential stays server-side. Voice input is a convenience, not identity verification. No autonomous money movement, publishing, account changes, or device control is enabled by this router.

## Voice and installation

Voice features depend on browser support and installed operating-system voices. On Windows 11, use Edge or Chrome's install-app control after HTTPS deployment. On Android, use Chrome menu > Install app / Add to Home screen.
