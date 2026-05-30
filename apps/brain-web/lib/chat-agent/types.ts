export type ChatRole = 'user' | 'assistant';

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
};

export type ChatSessionMeta = {
  startedAtMs: number;
  turnCount: number;
  totalChars: number;
  limitReached: boolean;
};

export type ChatRequest = {
  message: string;
  session: ChatSessionMeta;
};

export type ChatDebugMeta = {
  requestId: string;
  selectedTools: string[];
  elapsedMs: number;
};

export type ChatResponse = {
  assistant: ChatMessage;
  session: ChatSessionMeta;
  debug?: ChatDebugMeta;
};

export type ToolContext = {
  requestId: string;
  userMessage: string;
  nowIso: string;
};

export type ToolRunResult = {
  toolName: string;
  summary: string;
  payload: unknown;
};
