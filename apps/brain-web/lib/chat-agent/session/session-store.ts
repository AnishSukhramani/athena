import type { ChatSessionMeta } from '@/lib/chat-agent/types';

const SESSION_KEY = 'brain-web-chat-session-meta-v1';

export function makeDefaultChatSession(): ChatSessionMeta {
  return {
    startedAtMs: Date.now(),
    turnCount: 0,
    totalChars: 0,
    limitReached: false,
  };
}

export function loadChatSessionMeta(): ChatSessionMeta {
  if (typeof window === 'undefined') return makeDefaultChatSession();
  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) return makeDefaultChatSession();
  try {
    const parsed = JSON.parse(raw) as ChatSessionMeta;
    if (
      typeof parsed.startedAtMs !== 'number' ||
      typeof parsed.turnCount !== 'number' ||
      typeof parsed.totalChars !== 'number' ||
      typeof parsed.limitReached !== 'boolean'
    ) {
      return makeDefaultChatSession();
    }
    return parsed;
  } catch {
    return makeDefaultChatSession();
  }
}

export function saveChatSessionMeta(session: ChatSessionMeta) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearChatSessionMeta() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(SESSION_KEY);
}
