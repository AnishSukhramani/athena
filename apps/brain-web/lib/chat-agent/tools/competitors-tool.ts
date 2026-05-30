import { CHAT_AGENT_CONFIG } from '@/lib/chat-agent/config';
import type { ToolContext, ToolRunResult } from '@/lib/chat-agent/types';
import { supabase } from '@/lib/db';

export async function runCompetitorsTool(_ctx: ToolContext): Promise<ToolRunResult> {
  const limit = CHAT_AGENT_CONFIG.maxRowsPerTool;

  const [{ data: competitors, error: competitorsErr }, { data: adSnapshots, error: snapshotsErr }] =
    await Promise.all([
      supabase
        .from('voice_ai_competitors_athena')
        .select('id, key, name, website, category, is_active, last_seen_at')
        .eq('is_active', true)
        .order('last_seen_at', { ascending: false })
        .limit(limit),
      supabase
        .from('voice_ai_ad_snapshots_athena')
        .select('id, competitor_id, headline, is_long_running, days_active_approx, run_count, last_seen_at')
        .order('last_seen_at', { ascending: false })
        .limit(limit),
    ]);

  if (competitorsErr) throw new Error(`competitors tool failed: ${competitorsErr.message}`);
  if (snapshotsErr) throw new Error(`competitors snapshots failed: ${snapshotsErr.message}`);

  return {
    toolName: 'competitors',
    summary: `Loaded ${(competitors || []).length} competitors and ${(adSnapshots || []).length} ad snapshots.`,
    payload: {
      competitors: competitors || [],
      adSnapshots: (adSnapshots || []).map((row) => ({
        ...row,
        headline: typeof row.headline === 'string' ? row.headline.slice(0, 180) : row.headline,
      })),
    },
  };
}
