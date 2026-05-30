import { CHAT_AGENT_CONFIG } from '@/lib/chat-agent/config';
import { ChatAgentError } from '@/lib/chat-agent/errors';
import type { ChatSessionMeta } from '@/lib/chat-agent/types';

export function assertSessionLimits(message: string, session: ChatSessionMeta) {
  if (message.length > CHAT_AGENT_CONFIG.maxInputChars) {
    throw new ChatAgentError({
      code: 'input_too_long',
      layer: 'agent',
      status: 400,
      message: `Message exceeds ${CHAT_AGENT_CONFIG.maxInputChars} characters.`,
    });
  }
  if (session.limitReached) {
    throw new ChatAgentError({
      code: 'session_limit_reached',
      layer: 'agent',
      status: 400,
      message: 'Session limit reached. Start a new session.',
    });
  }
  if (session.turnCount >= CHAT_AGENT_CONFIG.maxTurns) {
    throw new ChatAgentError({
      code: 'turn_limit_reached',
      layer: 'agent',
      status: 400,
      message: 'Session turn limit reached. Start a new session.',
    });
  }
  if (session.totalChars + message.length >= CHAT_AGENT_CONFIG.maxSessionChars) {
    throw new ChatAgentError({
      code: 'char_limit_reached',
      layer: 'agent',
      status: 400,
      message: 'Session character limit reached. Start a new session.',
    });
  }
}

export function buildNextSession(
  prev: ChatSessionMeta,
  userMessage: string,
  assistantMessage: string
): ChatSessionMeta {
  const totalChars = prev.totalChars + userMessage.length + assistantMessage.length;
  const turnCount = prev.turnCount + 1;
  return {
    startedAtMs: prev.startedAtMs,
    turnCount,
    totalChars,
    limitReached: turnCount >= CHAT_AGENT_CONFIG.maxTurns || totalChars >= CHAT_AGENT_CONFIG.maxSessionChars,
  };
}
