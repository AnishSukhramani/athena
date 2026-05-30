import { z } from 'zod';

export const toolNameSchema = z.enum([
  'opportunities',
  'signals',
  'competitors',
  'practice',
  'evidence',
]);

export const baseToolResultSchema = z.object({
  toolName: toolNameSchema,
  summary: z.string(),
  payload: z.unknown(),
});

export type ToolName = z.infer<typeof toolNameSchema>;
