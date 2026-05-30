import { CHAT_AGENT_CONFIG } from '@/lib/chat-agent/config';
import type { ToolContext, ToolRunResult } from '@/lib/chat-agent/types';
import { supabase } from '@/lib/db';

function extractCandidate(query: string) {
  const cleaned = query.trim().toLowerCase();
  if (!cleaned) return null;
  return cleaned.slice(0, 80);
}

export async function runPracticeTool(ctx: ToolContext): Promise<ToolRunResult> {
  const search = extractCandidate(ctx.userMessage);
  const query = supabase
    .from('practices_athena')
    .select('id, name, domain, phone, locations, updated_at')
    .order('updated_at', { ascending: false })
    .limit(CHAT_AGENT_CONFIG.maxRowsPerTool);

  const { data, error } = search ? await query.ilike('name', `%${search}%`) : await query;
  if (error) throw new Error(`practice tool failed: ${error.message}`);

  const rows = (data || []).map((row: Record<string, unknown>) => ({
    id: row.id,
    name: row.name,
    domain: row.domain,
    phone: row.phone,
    locations: row.locations,
    updated_at: row.updated_at,
  }));

  return {
    toolName: 'practice',
    summary: `Loaded ${rows.length} practices${search ? ` matching "${search}"` : ''}.`,
    payload: rows,
  };
}
