import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

const MAX_BATCH = 200;

type Body = {
  ids?: string[];
  acceptAll?: boolean;
};

/**
 * Copies current recommended_actionable/content into accepted_* and sets accepted_at.
 */
export async function POST(request: Request) {
  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    body = {};
  }

  let targetIds: string[] = [];

  if (body.acceptAll) {
    const { data, error } = await supabase
      .from('opportunities_athena')
      .select('id, recommended_actionable, recommended_content')
      .not('recommended_at', 'is', null)
      .is('accepted_at', null)
      .order('created_at', { ascending: false })
      .limit(MAX_BATCH);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    targetIds = (data || []).map((r: { id: string }) => r.id).slice(0, MAX_BATCH);
  } else if (Array.isArray(body.ids) && body.ids.length) {
    targetIds = [...new Set(body.ids.map(String))].slice(0, MAX_BATCH);
  } else {
    return NextResponse.json({ error: 'Provide ids[] or acceptAll: true' }, { status: 400 });
  }

  const now = new Date().toISOString();
  const results: { id: string; ok: boolean; error?: string }[] = [];

  for (const id of targetIds) {
    const { data: row, error: fErr } = await supabase
      .from('opportunities_athena')
      .select('id, recommended_actionable, recommended_content, recommended_at')
      .eq('id', id)
      .maybeSingle();

    if (fErr || !row) {
      results.push({ id, ok: false, error: fErr?.message || 'Not found' });
      continue;
    }
    if (!row.recommended_at) {
      results.push({ id, ok: false, error: 'No recommendation to accept' });
      continue;
    }

    const { error: uErr } = await supabase
      .from('opportunities_athena')
      .update({
        accepted_actionable: Boolean(row.recommended_actionable),
        accepted_content: Boolean(row.recommended_content),
        accepted_at: now,
      })
      .eq('id', id);

    if (uErr) {
      results.push({ id, ok: false, error: uErr.message });
    } else {
      results.push({ id, ok: true });
    }
  }

  return NextResponse.json({
    processed: targetIds.length,
    succeeded: results.filter((r) => r.ok).length,
    results,
  });
}
