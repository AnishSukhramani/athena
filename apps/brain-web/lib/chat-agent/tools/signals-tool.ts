import { CHAT_AGENT_CONFIG } from '@/lib/chat-agent/config';
import type { ToolContext, ToolRunResult } from '@/lib/chat-agent/types';
import { supabase } from '@/lib/db';

export async function runSignalsTool(_ctx: ToolContext): Promise<ToolRunResult> {
  const { data, error } = await supabase
    .from('signals_athena')
    .select('id, type, practice_id, timestamp, strength, metadata')
    .order('timestamp', { ascending: false })
    .limit(CHAT_AGENT_CONFIG.maxRowsPerTool);

  if (error) throw new Error(`signals tool failed: ${error.message}`);

  const rows = (data || []).map((row: Record<string, unknown>) => ({
    id: row.id,
    type: row.type,
    practice_id: row.practice_id,
    timestamp: row.timestamp,
    strength: row.strength,
    metadata:
      row.metadata == null
        ? null
        : JSON.stringify(row.metadata).slice(0, CHAT_AGENT_CONFIG.maxMetadataChars),
  }));

  return {
    toolName: 'signals',
    summary: `Loaded ${rows.length} recent signals.`,
    payload: rows,
  };
}
