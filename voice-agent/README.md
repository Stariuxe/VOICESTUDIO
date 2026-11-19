# JARVIS realtime voice worker

This directory is reserved for the separate Python voice runtime powered by [Pipecat](https://github.com/pipecat-ai/pipecat) (BSD-2-Clause).

## Why a separate worker?

The Next.js command centre runs on Vercel. Realtime microphone sessions need a long-lived WebRTC-capable process, so they should not be implemented as a normal serverless chat route.

## Planned pipeline

Browser microphone → WebRTC transport → voice activity detection → speech-to-text → JARVIS reasoning → ElevenLabs streaming TTS → browser audio

Pipecat is the orchestration layer. The initial development transport should be SmallWebRTC, which avoids requiring a separate media-provider account. A managed Daily transport can be evaluated later if mobile-network reliability or scale requires it.

## Credentials

The production worker will require server-side credentials only. Never place them in Next.js client code or commit them to this repository.

Expected secret names (not values):

- ELEVENLABS_API_KEY
- ELEVENLABS_VOICE_ID
- AI_GATEWAY_API_KEY or a verified Vercel OIDC flow
- A private JARVIS service-to-service credential for authenticated reasoning requests

The owner must configure these in the voice worker's secret manager. Do not paste secrets into GitHub or chat.

## Status

Architecture selected; worker not yet implemented or deployed.

Before adding the worker code, validate the exact Pipecat version and service APIs, including the ElevenLabs STT/TTS constructors and the AI Gateway Responses adapter. This prevents a speculative integration from breaking the working web application.

See the stack decision in docs/OPEN_SOURCE_STACK.md for security boundaries, sequence and upstream links.
