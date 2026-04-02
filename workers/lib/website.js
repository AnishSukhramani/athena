/**
 * Website Automation Scanner — heuristic signals from practice homepages.
 */
import { supabase } from '@jobportalscout/db';
import { uploadEvidenceBlob } from './evidence-storage.js';
import { USER_AGENT } from './constants.js';

const BOOKING_PATTERNS = [/zocdoc/i, /localmed/i, /nexhealth/i, /book online/i, /schedule online/i, /appointments?/i];
const CHAT_PATTERNS = [/intercom/i, /drift/i, /hubspot.*chat/i, /tawk/i, /livechat/i, /chat widget/i];
const SMS_PATTERNS = [/text us/i, /sms/i, /message us/i];
const PORTAL_PATTERNS = [/patient portal/i, /login.*patient/i, /healow/i, /dentrix/i, /dental.*portal/i];

function scoreAutomation(html) {
  const missing = [];
  let score = 0;
  if (BOOKING_PATTERNS.some((p) => p.test(html))) score += 25; else missing.push('online_booking');
  if (CHAT_PATTERNS.some((p) => p.test(html))) score += 25; else missing.push('chat_widget');
  if (SMS_PATTERNS.some((p) => p.test(html))) score += 20; else missing.push('text_flow');
  if (PORTAL_PATTERNS.some((p) => p.test(html))) score += 30; else missing.push('patient_portal');
  return { automation_score: Math.min(100, score), missing_features: missing };
}

async function fetchHomepage(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 20000);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { 'User-Agent': USER_AGENT, Accept: 'text/html' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(t);
  }
}

export async function runWebsiteFragment(log) {
  const take = Number(process.env.WEBSITE_SCAN_LIMIT || 20);
  const { data: practices } = await supabase
    .from('practices_athena')
    .select('id, name, domain')
    .not('domain', 'is', null)
    .order('updated_at', { ascending: false })
    .limit(take);

  log.info(
    { practicesToScan: (practices || []).length, scanLimit: take },
    'Website fragment: scanning homepages',
  );

  let created = 0;
  for (const p of (practices || [])) {
    if (!p.domain) continue;
    const url = p.domain.startsWith('http') ? p.domain : `https://${p.domain}`;
    try {
      const html = await fetchHomepage(url);
      const { automation_score, missing_features } = scoreAutomation(html);
      if (process.env.S3_BUCKET) {
        await uploadEvidenceBlob(html, { contentType: 'text/html' });
      }
      if (missing_features.length === 0 && automation_score >= 80) {
        log.debug({ domain: p.domain }, 'High automation — skip');
        continue;
      }

      await supabase.from('signals_athena').insert({
        type: 'low_automation',
        practice_id: p.id,
        strength: 'MEDIUM',
        metadata: { missing_features, automation_score, website_url: url },
      });
      created += 1;
    } catch (err) {
      log.warn({ domain: p.domain, err: err.message }, 'Website scan failed');
    }
  }

  log.info({ signalsCreated: created }, 'Website fragment done');
  return created;
}
