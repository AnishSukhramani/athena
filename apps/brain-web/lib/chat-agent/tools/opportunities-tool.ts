import { CHAT_AGENT_CONFIG } from '@/lib/chat-agent/config';
import type { ToolContext, ToolRunResult } from '@/lib/chat-agent/types';
import { supabase } from '@/lib/db';

export async function runOpportunitiesTool(_ctx: ToolContext): Promise<ToolRunResult> {
  const { data, error } = await supabase
    .from('opportunities_athena')
    .select('id, practice_id, score, summary, created_at, practice:practices_athena(name, domain)')
    .order('score', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(CHAT_AGENT_CONFIG.maxRowsPerTool);

  if (error) throw new Error(`opportunities tool failed: ${error.message}`);

  const rows = (data || []).map((row: Record<string, unknown>) => ({
    id: row.id,
    practice_id: row.practice_id,
    score: row.score,
    summary:
      typeof row.summary === 'string'
        ? row.summary.slice(0, CHAT_AGENT_CONFIG.maxSummaryChars)
        : row.summary,
    created_at: row.created_at,
    practice: row.practice,
  }));

  return {
    toolName: 'opportunities',
    summary: `Loaded ${rows.length} ranked opportunities.`,
    payload: rows,
  };
}
