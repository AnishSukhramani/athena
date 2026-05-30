import { CHAT_AGENT_CONFIG } from '@/lib/chat-agent/config';
import { ChatAgentError } from '@/lib/chat-agent/errors';

type OpenAIChatParams = {
  systemPrompt: string;
  userPrompt: string;
  timeoutMs?: number;
};

type OpenAIChatResult = {
  text: string;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
};

export async function runOpenAIChat({
  systemPrompt,
  userPrompt,
  timeoutMs = CHAT_AGENT_CONFIG.providerTimeoutMs,
}: OpenAIChatParams): Promise<OpenAIChatResult> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    throw new ChatAgentError({
      layer: 'provider',
      code: 'missing_openai_api_key',
      message: 'OPENAI_API_KEY is not configured.',
      status: 500,
    });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: CHAT_AGENT_CONFIG.model,
        temperature: CHAT_AGENT_CONFIG.temperature,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      }),
    });

    const json = (await response.json().catch(() => ({}))) as {
      choices?: Array<{ message?: { content?: string } }>;
      usage?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number };
      error?: { message?: string };
    };

    if (!response.ok) {
      throw new ChatAgentError({
        layer: 'provider',
        code: 'openai_request_failed',
        message: json.error?.message || `OpenAI request failed with status ${response.status}`,
        status: 502,
      });
    }

    const text = json.choices?.[0]?.message?.content?.trim() || '';
    if (!text) {
      throw new ChatAgentError({
        layer: 'provider',
        code: 'empty_model_response',
        message: 'OpenAI returned an empty response.',
        status: 502,
      });
    }

    return {
      text,
      usage: {
        promptTokens: json.usage?.prompt_tokens,
        completionTokens: json.usage?.completion_tokens,
        totalTokens: json.usage?.total_tokens,
      },
    };
  } catch (error) {
    if (error instanceof ChatAgentError) throw error;
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ChatAgentError({
        layer: 'provider',
        code: 'provider_timeout',
        message: 'The chat provider timed out. Please try again.',
        status: 504,
      });
    }
    throw new ChatAgentError({
      layer: 'provider',
      code: 'provider_unknown_error',
      message: error instanceof Error ? error.message : 'Unknown provider error',
      status: 502,
    });
  } finally {
    clearTimeout(timer);
  }
}
