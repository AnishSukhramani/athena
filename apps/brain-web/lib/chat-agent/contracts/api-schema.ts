import { z } from 'zod';

import { CHAT_AGENT_CONFIG } from '@/lib/chat-agent/config';

export const chatSessionSchema = z.object({
  startedAtMs: z.number().int().nonnegative(),
  turnCount: z.number().int().nonnegative(),
  totalChars: z.number().int().nonnegative(),
  limitReached: z.boolean(),
});

export const chatRequestSchema = z.object({
  message: z.string().trim().min(1).max(CHAT_AGENT_CONFIG.maxInputChars),
  session: chatSessionSchema,
});

export const chatErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  layer: z.enum(['api', 'agent', 'tool', 'provider']),
  requestId: z.string(),
});

export const chatResponseSchema = z.object({
  assistant: z.object({
    id: z.string(),
    role: z.literal('assistant'),
    content: z.string(),
    createdAt: z.string(),
  }),
  session: chatSessionSchema,
  debug: z
    .object({
      requestId: z.string(),
      selectedTools: z.array(z.string()),
      elapsedMs: z.number().int().nonnegative(),
    })
    .optional(),
});

export type ChatRequestBody = z.infer<typeof chatRequestSchema>;
export type ChatResponseBody = z.infer<typeof chatResponseSchema>;
