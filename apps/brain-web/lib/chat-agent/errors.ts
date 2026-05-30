export type ChatAgentLayer = 'api' | 'agent' | 'tool' | 'provider';

export class ChatAgentError extends Error {
  readonly code: string;
  readonly layer: ChatAgentLayer;
  readonly status: number;
  readonly details?: unknown;

  constructor(opts: {
    message: string;
    code: string;
    layer: ChatAgentLayer;
    status?: number;
    details?: unknown;
  }) {
    super(opts.message);
    this.name = 'ChatAgentError';
    this.code = opts.code;
    this.layer = opts.layer;
    this.status = opts.status ?? 500;
    this.details = opts.details;
  }
}

export function toChatAgentError(error: unknown, fallbackLayer: ChatAgentLayer): ChatAgentError {
  if (error instanceof ChatAgentError) return error;
  const message = error instanceof Error ? error.message : 'Unknown chat agent error';
  return new ChatAgentError({
    message,
    code: 'unknown_error',
    layer: fallbackLayer,
    status: 500,
  });
}
