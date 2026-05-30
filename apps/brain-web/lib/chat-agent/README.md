# Chat Agent Module (`lib/chat-agent`)

This module isolates the chat agent from UI and route code so failures are easy to localize.

## Layer boundaries

- `components/chat/*`: UI only (no DB calls, no provider calls).
- `app/api/chat/route.ts`: request/response boundary, validation, and error mapping.
- `lib/chat-agent/runtime/*`: orchestration and flow control.
- `lib/chat-agent/tools/*`: one data concern per file.
- `lib/chat-agent/providers/*`: LLM provider adapter.

## Public entrypoint

Use only:

- `lib/chat-agent/index.ts`

This keeps external imports stable even if internals are refactored.

## Debug flow

Every request emits structured logs under `scope: chat-agent`:

1. `chat.request.received`
2. `chat.tool.selection`
3. `chat.tool.completed`
4. `chat.prompt.built`
5. `chat.response.emitted`

If errors occur, logs include:

- `code`
- `layer` (`api`, `agent`, `tool`, `provider`)
- `requestId`

## Failure localization checklist

- `layer=api`: bad payload or schema mismatch.
- `layer=agent`: session/limit orchestration failure.
- `layer=tool`: Supabase query or tool execution failure.
- `layer=provider`: OpenAI/auth/timeout/empty response.

## Session model

- Chat messages are in-memory state only.
- Session counters are local-storage metadata only.
- Reload starts a fresh session by design.

## Adding a new tool

1. Add a tool file in `tools/*` that returns `ToolRunResult`.
2. Register it in `runtime/tool-registry.ts`.
3. Add trigger keywords in `pickToolsForMessage`.
4. Keep row limits enforced via `CHAT_AGENT_CONFIG`.
