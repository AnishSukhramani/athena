import { CHAT_AGENT_CONFIG } from '@/lib/chat-agent/config';
import { ChatAgentError } from '@/lib/chat-agent/errors';
import { chatAgentLogger } from '@/lib/chat-agent/logger';
import { buildUserPrompt } from '@/lib/chat-agent/prompt/response-format';
import { getSystemPrompt } from '@/lib/chat-agent/prompt/system-prompt';
import { runOpenAIChat } from '@/lib/chat-agent/providers/openai-client';
import { buildContext } from '@/lib/chat-agent/runtime/build-context';
import { assertSessionLimits, buildNextSession } from '@/lib/chat-agent/session/session-limits';
import type { ChatRequest, ChatResponse } from '@/lib/chat-agent/types';

export async function runAgentTurn(input: ChatRequest & { requestId: string }): Promise<ChatResponse> {
  const started = Date.now();
  const { requestId, message, session } = input;
  chatAgentLogger.info(requestId, 'chat.request.received', {
    turnCount: session.turnCount,
    totalChars: session.totalChars,
  });

  assertSessionLimits(message, session);

  const nowIso = new Date().toISOString();
  const { selectedTools, results } = await buildContext({
    requestId,
    userMessage: message,
    nowIso,
  });
  chatAgentLogger.info(requestId, 'chat.tool.completed', {
    selectedTools,
    count: results.length,
  });

  const systemPrompt = getSystemPrompt(nowIso);
  const userPrompt = buildUserPrompt(message, results);
  if (userPrompt.length > CHAT_AGENT_CONFIG.maxPromptChars) {
    throw new ChatAgentError({
      layer: 'agent',
      code: 'prompt_budget_exceeded',
      message: `Prompt exceeded configured budget (${CHAT_AGENT_CONFIG.maxPromptChars} chars).`,
      status: 500,
    });
  }
  chatAgentLogger.info(requestId, 'chat.prompt.built', {
    promptChars: userPrompt.length,
  });

  const completion = await runOpenAIChat({ systemPrompt, userPrompt });
  if (!completion.text.trim()) {
    throw new ChatAgentError({
      layer: 'provider',
      code: 'empty_provider_response',
      message: 'Provider returned an empty response',
      status: 502,
    });
  }

  const assistantText = completion.text.trim();
  const nextSession = buildNextSession(session, message, assistantText);
  const elapsedMs = Date.now() - started;
  chatAgentLogger.info(requestId, 'chat.response.emitted', {
    elapsedMs,
    usage: completion.usage,
  });

  return {
    assistant: {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: assistantText,
      createdAt: nowIso,
    },
    session: nextSession,
    debug: CHAT_AGENT_CONFIG.includeDebugMeta
      ? {
          requestId,
          selectedTools,
          elapsedMs,
        }
      : undefined,
  };
}
