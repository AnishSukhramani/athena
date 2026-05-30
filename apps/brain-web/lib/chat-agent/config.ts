export const CHAT_AGENT_CONFIG = {
  model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
  temperature: 0.2,
  providerTimeoutMs: 45_000,
  maxInputChars: 4_000,
  maxTurns: 40,
  maxSessionChars: 60_000,
  maxRowsPerTool: 15,
  maxPromptChars: 30_000,
  maxCharsPerToolPayload: 8_000,
  maxSummaryChars: 300,
  maxMetadataChars: 350,
  includeDebugMeta: (process.env.CHAT_AGENT_DEBUG || '').toLowerCase() === 'true',
} as const;
