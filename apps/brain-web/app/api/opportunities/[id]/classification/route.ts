import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

type Body = {
  accepted_actionable: boolean;
  accepted_content: boolean;
};

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (typeof body.accepted_actionable !== 'boolean' || typeof body.accepted_content !== 'boolean') {
    return NextResponse.json(
      { error: 'accepted_actionable and accepted_content must be booleans' },
      { status: 400 }
    );
  }

  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from('opportunities_athena')
    .update({
      accepted_actionable: body.accepted_actionable,
      accepted_content: body.accepted_content,
      accepted_at: now,
    })
    .eq('id', id)
    .select()
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({ opportunity: data });
}
