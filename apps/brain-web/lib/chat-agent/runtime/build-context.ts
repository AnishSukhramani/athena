import { ChatAgentError } from '@/lib/chat-agent/errors';
import { chatAgentLogger } from '@/lib/chat-agent/logger';
import { pickToolsForMessage, runSelectedTools } from '@/lib/chat-agent/runtime/tool-registry';
import type { ToolContext } from '@/lib/chat-agent/types';

export async function buildContext(toolContext: ToolContext) {
  const selectedTools = pickToolsForMessage(toolContext.userMessage);
  chatAgentLogger.info(toolContext.requestId, 'chat.tool.selection', { selectedTools });

  try {
    const results = await runSelectedTools(selectedTools, toolContext);
    const payloadCharsByTool = results.map((result) => ({
      toolName: result.toolName,
      chars: JSON.stringify(result.payload).length,
    }));
    chatAgentLogger.info(toolContext.requestId, 'chat.tool.payload_size', {
      payloadCharsByTool,
    });
    return { selectedTools, results };
  } catch (error) {
    throw new ChatAgentError({
      layer: 'tool',
      code: 'tool_execution_failed',
      message: error instanceof Error ? error.message : 'Tool execution failed',
      status: 500,
    });
  }
}
