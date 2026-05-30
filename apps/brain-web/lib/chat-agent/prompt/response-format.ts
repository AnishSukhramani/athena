import { CHAT_AGENT_CONFIG } from '@/lib/chat-agent/config';
import type { ToolRunResult } from '@/lib/chat-agent/types';

function compactToolResult(tool: ToolRunResult) {
  const base = {
    toolName: tool.toolName,
    summary: tool.summary,
    payload: tool.payload,
  };

  const raw = JSON.stringify(base);
  if (raw.length <= CHAT_AGENT_CONFIG.maxCharsPerToolPayload) return base;

  return {
    toolName: tool.toolName,
    summary: tool.summary,
    payload: {
      truncated: true,
      originalChars: raw.length,
      preview: raw.slice(0, CHAT_AGENT_CONFIG.maxCharsPerToolPayload),
    },
  };
}

export function buildUserPrompt(message: string, toolResults: ToolRunResult[]) {
  const compactTools = toolResults.map(compactToolResult);
  const compactContext = JSON.stringify(compactTools);

  const header = [
    'User question:',
    message,
    '',
    'Internal context (JSON):',
  ].join('\n');

  const footer = [
    '',
    'Answer requirements:',
    '- Use only provided context.',
    '- If uncertain, say uncertainty explicitly.',
    '- Keep response clear and actionable.',
    '- Keep markdown compact: avoid unnecessary empty lines between list items.',
  ].join('\n');

  const fixedChars = header.length + footer.length + 2;
  const maxContextChars = Math.max(1000, CHAT_AGENT_CONFIG.maxPromptChars - fixedChars);
  const contextBody =
    compactContext.length > maxContextChars
      ? `${compactContext.slice(0, maxContextChars)}...{"truncatedContext":true}`
      : compactContext;

  return `${header}\n${contextBody}\n${footer}`;
}
