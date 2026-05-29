import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { runClassifierAndPersistRecommendation } from '@/lib/classification-context';

const MAX_BATCH = 100;

type Body = {
  ids?: string[];
  onlyMissing?: boolean;
  limit?: number;
};

/**
 * POST body:
 * - ids: optional explicit list (capped at MAX_BATCH)
 * - onlyMissing: default true — only rows where recommended_at is null
 * - limit: max rows when ids omitted (default 50, max 100)
 */
export async function POST(request: Request) {
  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    body = {};
  }

  const onlyMissing = body.onlyMissing !== false;
  const limit = Math.min(MAX_BATCH, Math.max(1, Number(body.limit) || 50));

  let ids: string[] = [];

  if (Array.isArray(body.ids) && body.ids.length > 0) {
    ids = [...new Set(body.ids.map(String))].slice(0, MAX_BATCH);
  } else {
    let q = supabase.from('opportunities_athena').select('id').order('created_at', { ascending: false }).limit(limit);
    if (onlyMissing) {
      q = q.is('recommended_at', null);
    }
    const { data, error } = await q;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    ids = (data || []).map((r: { id: string }) => r.id);
  }

  const results: { id: string; ok: boolean; error?: string }[] = [];

  for (const id of ids) {
    const r = await runClassifierAndPersistRecommendation(id);
    if (r.error) {
      results.push({ id, ok: false, error: r.error });
    } else {
      results.push({ id, ok: true });
    }
  }

  const ok = results.filter((x) => x.ok).length;
  const failed = results.filter((x) => !x.ok);

  return NextResponse.json({
    processed: ids.length,
    succeeded: ok,
    failed,
    results,
  });
}
