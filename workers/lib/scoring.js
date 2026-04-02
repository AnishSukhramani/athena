/**
 * Opportunity Scoring Engine — weights, evidence gate, dedupe by practice, daily cap.
 */
import OpenAI from 'openai';
import { supabase } from '@jobportalscout/db';
import { SIGNAL_WEIGHTS, MAX_OPPORTUNITIES_PER_DAY } from './constants.js';

function startOfUtcDay(d = new Date()) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

function scoreForSignalType(type) { return SIGNAL_WEIGHTS[type] ?? 0; }

const STRONG_SIGNAL_TYPES = new Set([
  'job_frontdesk',
  'new_practice',
  'phone_friction',
  'chronic_turnover',
  'legacy_tech_stack',
  'competitor_xray_engagement',
]);

function hasStrongSignal(signals) {
  return signals.some((s) => STRONG_SIGNAL_TYPES.has(s.type));
}

function computeScore(signals) {
  let total = 0;
  const seen = new Set();
  for (const s of signals) {
    if (seen.has(s.type)) continue;
    seen.add(s.type);
    total += scoreForSignalType(s.type);
  }
  return Math.min(100, total);
}

function evidenceRowsFromSignals(signals) {
  const rows = [];
  for (const s of signals) {
    const meta = s.metadata && typeof s.metadata === 'object' ? s.metadata : {};
    if (s.type === 'job_frontdesk') {
      const url = meta.job_url || meta.jobUrl;
      if (meta.evidence_html_key) {
        rows.push({ type: 'html', content: `Raw listing HTML (key: ${meta.evidence_html_key})`, source_url: url ? String(url) : null, storage_key: String(meta.evidence_html_key) });
      }
      if (url) {
        rows.push({ type: 'url', content: `Job posting: ${meta.job_title || 'Front desk role'}`, source_url: String(url) });
      } else if (!meta.evidence_html_key) {
        rows.push({ type: 'snippet', content: `Hiring signal: ${meta.job_title || ''} ${(meta.keywords_detected || []).join(', ')}`.trim(), source_url: null });
      }
    } else if (s.type === 'phone_friction') {
      const arr = Array.isArray(meta.matched_reviews) ? meta.matched_reviews : [];
      for (const mr of arr.slice(0, 5)) {
        const text = typeof mr === 'string' ? mr : mr.text || JSON.stringify(mr);
        rows.push({ type: 'snippet', content: String(text).slice(0, 2000), source_url: meta.place_url || null });
      }
      if (rows.length === 0 && meta.summary) {
        rows.push({ type: 'snippet', content: String(meta.summary), source_url: meta.place_url || null });
      }
    } else if (s.type === 'new_practice') {
      rows.push({ type: 'snippet', content: `New/changed practice: NPI ${meta.npi_id || ''} ${meta.location || ''}`.trim(), source_url: null });
    } else if (s.type === 'low_automation') {
      rows.push({ type: 'snippet', content: `Automation: score ${meta.automation_score ?? 'n/a'}; missing: ${(meta.missing_features || []).join(', ')}`, source_url: meta.website_url || null });
    } else if (s.type === 'chronic_turnover') {
      rows.push({
        type: 'snippet',
        content: `Chronic turnover: ${meta.posting_count ?? '?'} front-desk postings in ${meta.window_months ?? 6} months (deduped by job URL).`,
        source_url: null,
      });
    } else if (s.type === 'legacy_tech_stack') {
      const m = Array.isArray(meta.matches) ? meta.matches : [];
      rows.push({
        type: 'snippet',
        content: `Legacy tech / PMS signals: ${m.length ? m.join('; ') : 'detected'}. URLs: ${(meta.urls_fetched || []).join(', ')}`.slice(0, 2000),
        source_url: meta.urls_fetched?.[0] || null,
      });
    } else if (s.type === 'competitor_xray_engagement') {
      rows.push({
        type: 'snippet',
        content: `Competitor LinkedIn engagement: ${meta.full_name || 'Lead'} — ${meta.headline || ''}. Post: ${meta.source_post_url || ''}`.trim().slice(0, 2000),
        source_url: meta.linkedin_profile_url || meta.source_post_url || null,
      });
    }
  }
  return rows.filter((r) => r.content?.length > 0);
}

async function generateSummary(practice, signals, score, log) {
  const brief = signals.map((s) => ({ type: s.type, strength: s.strength, meta: s.metadata }));
  if (!process.env.OPENAI_API_KEY) {
    return `${practice.name} — signals: ${signals.map((s) => s.type).join(', ')}. Score ${score}.`;
  }
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  try {
    const res = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Write one concise paragraph (max 3 sentences) for sales: why this dental practice is a good lead for an AI dental receptionist. Use evidence from signals only.' },
        { role: 'user', content: JSON.stringify({ practice: practice.name, score, signals: brief }) },
      ],
    });
    return res.choices[0]?.message?.content?.trim() || '';
  } catch (err) {
    log.warn({ err: err.message }, 'Summary LLM failed');
    return `${practice.name} — score ${score}.`;
  }
}

export async function runScoringEngine(log, { sinceHours = 168 } = {}) {
  const since = new Date(Date.now() - sinceHours * 60 * 60 * 1000).toISOString();

  const { data: practiceIds } = await supabase
    .from('signals_athena')
    .select('practice_id')
    .gte('timestamp', since);

  const uniqueIds = [...new Set((practiceIds || []).map((r) => r.practice_id))];
  if (uniqueIds.length === 0) {
    log.info(
      { sinceHours, sinceIso: since, rawSignalRows: (practiceIds || []).length },
      'No recent signals in window — nothing to score',
    );
    return { created: 0, updated: 0, capped: 0 };
  }

  log.info(
    { practiceCount: uniqueIds.length, sinceHours, sinceIso: since },
    'Scoring: practices with signals in window',
  );

  const dayStart = startOfUtcDay().toISOString();
  const { count: todayCount } = await supabase
    .from('opportunities_athena')
    .select('id', { count: 'exact', head: true })
    .gte('created_at', dayStart);

  let created = 0, updated = 0, capped = 0;
  let remaining = Math.max(0, MAX_OPPORTUNITIES_PER_DAY - (todayCount || 0));

  for (const pid of uniqueIds) {
    const { data: practice } = await supabase.from('practices_athena').select('*').eq('id', pid).single();
    if (!practice) continue;

    const { data: signals } = await supabase
      .from('signals_athena')
      .select('*')
      .eq('practice_id', pid)
      .gte('timestamp', since)
      .order('timestamp', { ascending: false });

    if (!signals || signals.length === 0) continue;
    const score = computeScore(signals);
    if (score < 1 || !hasStrongSignal(signals)) continue;

    const evRows = evidenceRowsFromSignals(signals);
    if (evRows.length === 0) continue;

    const summary = await generateSummary(practice, signals, score, log);

    const { data: existing } = await supabase
      .from('opportunities_athena')
      .select('id')
      .eq('practice_id', pid)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (existing) {
      await supabase.from('evidence_athena').delete().eq('opportunity_id', existing.id);
      await supabase.from('opportunities_athena').update({ score, summary }).eq('id', existing.id);
      for (const e of evRows) {
        await supabase.from('evidence_athena').insert({ opportunity_id: existing.id, ...e });
      }
      updated += 1;
      continue;
    }

    if (remaining <= 0) { capped += 1; continue; }

    const { data: opp } = await supabase
      .from('opportunities_athena')
      .insert({ practice_id: pid, score, summary })
      .select()
      .single();

    for (const e of evRows) {
      await supabase.from('evidence_athena').insert({ opportunity_id: opp.id, ...e });
    }
    remaining -= 1;
    created += 1;
  }

  await supabase.from('scoring_runs_athena').insert({
    created,
    capped,
    message: `updated=${updated} practices=${uniqueIds.length}`,
  });

  log.info({ created, updated, capped, maxPerDay: MAX_OPPORTUNITIES_PER_DAY }, 'Scoring run complete');
  return { created, updated, capped };
}
