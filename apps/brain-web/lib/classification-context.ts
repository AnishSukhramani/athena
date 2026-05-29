import { supabase } from '@/lib/db';
import {
  classifyOpportunity,
  CLASSIFIER_VERSION,
  type ClassificationInput,
  type SignalTypeForClassify,
} from '@/lib/classifier';

const VALID_SIGNALS = new Set<SignalTypeForClassify>([
  'job_frontdesk',
  'chronic_turnover',
  'phone_friction',
  'new_practice',
  'low_automation',
  'legacy_tech_stack',
  'competitor_xray_engagement',
]);

export async function buildClassificationInputForOpportunity(
  opportunityId: string
): Promise<{ input: ClassificationInput; error?: string }> {
  const { data: opp, error: oErr } = await supabase
    .from('opportunities_athena')
    .select('id, score, summary, practice_id')
    .eq('id', opportunityId)
    .maybeSingle();

  if (oErr) return { input: emptyInput(), error: oErr.message };
  if (!opp) return { input: emptyInput(), error: 'Opportunity not found' };

  const { data: evidence } = await supabase
    .from('evidence_athena')
    .select('content')
    .eq('opportunity_id', opportunityId);

  const { data: signals } = await supabase
    .from('signals_athena')
    .select('type')
    .eq('practice_id', opp.practice_id);

  const signalTypes: SignalTypeForClassify[] = (signals || [])
    .map((s: { type: string }) => s.type)
    .filter((t: string): t is SignalTypeForClassify => VALID_SIGNALS.has(t as SignalTypeForClassify));

  const input: ClassificationInput = {
    score: opp.score,
    summary: opp.summary,
    evidenceTexts: (evidence || []).map((e: { content: string }) => e.content || ''),
    signalTypes,
  };

  return { input };
}

function emptyInput(): ClassificationInput {
  return { score: 0, summary: null, evidenceTexts: [], signalTypes: [] };
}

export async function runClassifierAndPersistRecommendation(opportunityId: string) {
  const { input, error } = await buildClassificationInputForOpportunity(opportunityId);
  if (error) return { error };

  const result = classifyOpportunity(input);
  const now = new Date().toISOString();

  const { data, error: uErr } = await supabase
    .from('opportunities_athena')
    .update({
      recommended_actionable: result.recommended_actionable,
      recommended_content: result.recommended_content,
      recommendation_confidence: result.recommendation_confidence,
      recommendation_reason: result.recommendation_reason,
      classifier_version: CLASSIFIER_VERSION,
      recommended_at: now,
    })
    .eq('id', opportunityId)
    .select()
    .maybeSingle();

  if (uErr) return { error: uErr.message };
  return { opportunity: data, recommendation: result };
}
