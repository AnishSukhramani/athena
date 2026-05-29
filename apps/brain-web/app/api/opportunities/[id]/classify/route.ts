import { NextResponse } from 'next/server';
import { runClassifierAndPersistRecommendation } from '@/lib/classification-context';

export async function POST(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const result = await runClassifierAndPersistRecommendation(id);
  if (result.error) {
    const status = result.error === 'Opportunity not found' ? 404 : 500;
    return NextResponse.json({ error: result.error }, { status });
  }
  return NextResponse.json(result);
}
