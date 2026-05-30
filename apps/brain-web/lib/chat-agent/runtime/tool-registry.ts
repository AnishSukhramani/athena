import type { ToolName } from '@/lib/chat-agent/contracts/tool-schema';
import type { ToolContext, ToolRunResult } from '@/lib/chat-agent/types';
import { runCompetitorsTool } from '@/lib/chat-agent/tools/competitors-tool';
import { runEvidenceTool } from '@/lib/chat-agent/tools/evidence-tool';
import { runOpportunitiesTool } from '@/lib/chat-agent/tools/opportunities-tool';
import { runPracticeTool } from '@/lib/chat-agent/tools/practice-tool';
import { runSignalsTool } from '@/lib/chat-agent/tools/signals-tool';

type ToolRunner = (ctx: ToolContext) => Promise<ToolRunResult>;

const TOOL_RUNNERS: Record<ToolName, ToolRunner> = {
  opportunities: runOpportunitiesTool,
  signals: runSignalsTool,
  competitors: runCompetitorsTool,
  practice: runPracticeTool,
  evidence: runEvidenceTool,
};

export function pickToolsForMessage(message: string): ToolName[] {
  const normalized = message.toLowerCase();
  const selected = new Set<ToolName>(['opportunities', 'signals']);

  if (
    normalized.includes('competitor') ||
    normalized.includes('voice ai') ||
    normalized.includes('ad')
  ) {
    selected.add('competitors');
  }
  if (normalized.includes('practice') || normalized.includes('clinic') || normalized.includes('domain')) {
    selected.add('practice');
  }
  if (
    normalized.includes('evidence') ||
    normalized.includes('source') ||
    normalized.includes('why')
  ) {
    selected.add('evidence');
  }

  return Array.from(selected);
}

export async function runSelectedTools(toolNames: ToolName[], ctx: ToolContext) {
  const results: ToolRunResult[] = [];
  for (const toolName of toolNames) {
    const runner = TOOL_RUNNERS[toolName];
    const result = await runner(ctx);
    results.push(result);
  }
  return results;
}
