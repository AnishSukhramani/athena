import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import type { SignalType } from '@/types/prisma';

const VALID_SIGNALS: SignalType[] = ['job_frontdesk', 'phone_friction', 'new_practice', 'low_automation'];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const minScore = Math.max(0, Number(searchParams.get('minScore') || 0));
  const state = searchParams.get('state')?.trim();
  const signalRaw = searchParams.get('signal')?.trim();
  const signalType = signalRaw && VALID_SIGNALS.includes(signalRaw as SignalType) ? signalRaw : undefined;

  let query = supabase
    .from('opportunities_athena')
    .select('*, practice:practices_athena(*), evidence:evidence_athena(*), validations:opportunity_validations_athena(*)')
    .gte('score', minScore)
    .order('score', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(150);

  const { data: opportunities, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  let filtered = opportunities || [];

  if (signalType) {
    const { data: matchIds } = await supabase
      .from('signals_athena')
      .select('practice_id')
      .eq('type', signalType);
    const pids = new Set((matchIds || []).map((r: { practice_id: string }) => r.practice_id));
    filtered = filtered.filter((o: { practice_id: string }) => pids.has(o.practice_id));
  }

  if (state) {
    filtered = filtered.filter((o: { practice: { locations: unknown } }) => {
      const blob = JSON.stringify(o.practice?.locations ?? []);
      return blob.toUpperCase().includes(state.toUpperCase());
    });
  }

  return NextResponse.json({ opportunities: filtered });
}
