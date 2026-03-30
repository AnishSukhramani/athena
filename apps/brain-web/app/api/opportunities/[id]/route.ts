import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const { data: opportunity, error } = await supabase
    .from('opportunities_athena')
    .select('*, practice:practices_athena(*), evidence:evidence_athena(*), validations:opportunity_validations_athena(*)')
    .eq('id', id)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!opportunity) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const { data: signals } = await supabase
    .from('signals_athena')
    .select('*')
    .eq('practice_id', opportunity.practice_id)
    .order('timestamp', { ascending: false })
    .limit(50);

  return NextResponse.json({ opportunity, signals });
}
