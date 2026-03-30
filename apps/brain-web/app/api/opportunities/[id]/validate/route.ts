import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import type { ValidationStatus } from '@/types/prisma';

const VALID: ValidationStatus[] = ['valid', 'not_relevant', 'duplicate'];

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  let body: { status?: string; note?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const status = body.status as ValidationStatus;
  if (!status || !VALID.includes(status)) {
    return NextResponse.json({ error: 'status must be valid | not_relevant | duplicate' }, { status: 400 });
  }

  const { data: opp } = await supabase.from('opportunities_athena').select('id').eq('id', id).maybeSingle();
  if (!opp) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const { data: row, error } = await supabase
    .from('opportunity_validations_athena')
    .insert({
      opportunity_id: id,
      status,
      note: body.note?.slice(0, 2000) || null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ validation: row });
}
