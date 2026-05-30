import { CHAT_AGENT_CONFIG } from '@/lib/chat-agent/config';
import type { ToolContext, ToolRunResult } from '@/lib/chat-agent/types';
import { supabase } from '@/lib/db';

export async function runEvidenceTool(_ctx: ToolContext): Promise<ToolRunResult> {
  const { data, error } = await supabase
    .from('evidence_athena')
    .select('id, opportunity_id, type, content, source_url, created_at')
    .order('created_at', { ascending: false })
    .limit(CHAT_AGENT_CONFIG.maxRowsPerTool);

  if (error) throw new Error(`evidence tool failed: ${error.message}`);

  const rows = (data || []).map((row: Record<string, unknown>) => ({
    id: row.id,
    opportunity_id: row.opportunity_id,
    type: row.type,
    content:
      typeof row.content === 'string'
        ? row.content.slice(0, 400)
        : null,
    source_url: row.source_url,
    created_at: row.created_at,
  }));

  return {
    toolName: 'evidence',
    summary: `Loaded ${rows.length} evidence rows.`,
    payload: rows,
  };
}
