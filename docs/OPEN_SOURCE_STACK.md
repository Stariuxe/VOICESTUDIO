# JARVIS open-source collaboration stack

This project keeps its web command centre separate from its realtime voice runtime.

## Selected components

| Layer | Choice | Role | License / ownership |
|---|---|---|---|
| Realtime voice orchestration | [Pipecat](https://github.com/pipecat-ai/pipecat) | Audio pipeline, turn-taking, interruption, STT/LLM/TTS composition | BSD-2-Clause |
| Voice output | [ElevenLabs](https://elevenlabs.io/) | Natural streaming voice using the owner's existing voice selection | Commercial API; credentials remain server-side |
| Web application | [Next.js](https://github.com/vercel/next.js) | Responsive JARVIS command centre | MIT |
| AI routing | Vercel AI Gateway | Model routing, usage visibility and server-side credentials | Hosted service |
| Authentication | [Supabase](https://github.com/supabase/supabase) | Owner sign-in and session verification | Apache-2.0 core; hosted service optional |
| Realtime transport | Pipecat SmallWebRTC for development; evaluate Daily transport for production | Low-latency browser audio | Open source transport / optional hosted infrastructure |

## Architecture boundary

- The Next.js application stays on Vercel.
- The Pipecat voice worker runs as a separate long-lived Python service. Do not try to host persistent WebRTC sessions inside a short-lived Next.js route.
- Browser audio connects to the voice worker over WebRTC, not a text-oriented WebSocket.
- The worker must authenticate each session against a short-lived server-issued credential. Never expose provider API keys in browser code.
- The worker can call the existing JARVIS reasoning layer only through a narrow authenticated server-to-server interface. Do not duplicate the owner allowlist or silently bypass Supabase authorization.
- Keep voice history ephemeral initially. Persist only after a clear retention policy and owner-controlled setting exist.
- Any future tools (email, files, publishing, payments, device control) must have per-tool permissions, audit events and explicit approval for consequential actions.

## Implementation sequence

1. Keep the existing JARVIS web app and its authentication intact.
2. Add the Pipecat service as a separate voice-agent runtime.
3. Verify Pipecat's current ElevenLabs STT/TTS service APIs against the installed package version.
4. Verify the Vercel AI Gateway Responses API adapter before wiring it into the voice worker. Do not assume OpenAI-compatible base URL settings without a version-matched test.
5. Add browser WebRTC client and short-lived connection-token endpoint.
6. Add interruption, barge-in, reconnect and latency instrumentation.
7. Test on Android Chrome and desktop browsers before production rollout.

## Guardrails

- Do not copy code from third-party examples without preserving applicable license notices.
- Pin dependencies after a working compatibility test; avoid floating latest versions in production.
- Never commit .env files, API keys, voice IDs that are private, access tokens, or user audio.
- Do not modify the existing jena-assistant Vercel project or PropertyOS AI.
- No production deploy or merge until CI/build, authentication, and voice-session tests pass.

## Upstream references

- Pipecat framework: https://github.com/pipecat-ai/pipecat
- Pipecat quickstart: https://docs.pipecat.ai/get-started/quickstart
- Pipecat transport selection: https://docs.pipecat.ai/client/concepts/choosing-a-transport
- Pipecat ElevenLabs TTS: https://github.com/pipecat-ai/docs/blob/main/api-reference/server/services/tts/elevenlabs.mdx
- Pipecat examples: https://github.com/pipecat-ai/pipecat-examples
- Vercel AI SDK: https://github.com/vercel/ai
