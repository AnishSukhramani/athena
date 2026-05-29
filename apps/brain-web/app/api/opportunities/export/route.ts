import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

/**
 * CSV of opportunities with accepted classification (and recommendation columns for review).
 * Query: ?acceptedOnly=1 — only rows with accepted_at set (default 1)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const acceptedOnly = searchParams.get('acceptedOnly') !== '0';

  let q = supabase
    .from('opportunities_athena')
    .select(
      'id, score, summary, recommended_actionable, recommended_content, recommended_at, accepted_actionable, accepted_content, accepted_at, practice:practices_athena(name, domain)'
    )
    .order('score', { ascending: false })
    .limit(500);

  if (acceptedOnly) {
    q = q.not('accepted_at', 'is', null);
  }

  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const rows = data || [];
  const header = [
    'id',
    'practice_name',
    'domain',
    'score',
    'accepted_actionable',
    'accepted_content',
    'accepted_at',
    'recommended_actionable',
    'recommended_content',
    'recommended_at',
    'summary',
  ];

  const escape = (v: string | number | boolean | null | undefined) => {
    if (v === null || v === undefined) return '';
    const s = String(v);
    if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };

  const lines = [header.join(',')];
  for (const o of rows as any[]) {
    const p = o.practice || {};
    lines.push(
      [
        escape(o.id),
        escape(p.name),
        escape(p.domain),
        escape(o.score),
        escape(o.accepted_actionable),
        escape(o.accepted_content),
        escape(o.accepted_at),
        escape(o.recommended_actionable),
        escape(o.recommended_content),
        escape(o.recommended_at),
        escape((o.summary || '').slice(0, 2000)),
      ].join(',')
    );
  }

  const csv = lines.join('\n');
  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="opportunities-classification.csv"',
    },
  });
}
