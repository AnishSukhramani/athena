/**
 * LinkedIn engagement x-ray — Hyperbrowser extract → xray_leads_athena + signals (Athena v1.2).
 * LinkedIn may block automation; use LINKEDIN_HB_PROFILE_ID for a saved Hyperbrowser profile when available.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod';
import { Hyperbrowser } from '@hyperbrowser/sdk';
import { supabase } from '@jobportalscout/db';
import { HB_EXTRACT_SESSION } from './hyperbrowser-helpers.js';

const TITLE_FILTER_RE = /\b(owner|dds|dmd|md|practice manager)\b/i;

const XrayExtractZ = z.object({
  profiles: z
    .array(
      z.object({
        profileUrl: z.string().optional(),
        name: z.string().optional(),
        headline: z.string().optional(),
        engagementType: z.string().optional(),
      }),
    )
    .optional(),
});

function normalizeTokens(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

function tokenSet(s) {
  return new Set(normalizeTokens(s));
}

function findPracticeMatch(fullName, headline, practices) {
  const blob = `${fullName || ''} ${headline || ''}`.toLowerCase();
  const leadTokens = tokenSet(`${fullName} ${headline}`);
  let best = null;
  let bestScore = 0;

  for (const pr of practices) {
    if (!pr.name) continue;
    const pn = pr.name.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim();
    if (pn.length < 4) continue;
    if (blob.includes(pn)) return pr;

    const practiceTokens = tokenSet(pr.name);
    let score = 0;
    for (const t of practiceTokens) {
      if (leadTokens.has(t)) score += 1;
    }
    if (score >= 2 && score > bestScore) {
      bestScore = score;
      best = pr;
    }
  }
  return best;
}

function loadPostList(log) {
  const fromEnv = (process.env.XRAY_LINKEDIN_POST_URLS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (fromEnv.length) return fromEnv.map((url) => ({ url }));

  const dir = path.dirname(fileURLToPath(import.meta.url));
  const fp = path.join(dir, '../config/xray-posts.json');
  if (!fs.existsSync(fp)) return [];
  try {
    const j = JSON.parse(fs.readFileSync(fp, 'utf8'));
    return (j.posts || []).filter((p) => p.url && !String(p.url).includes('REPLACE_WITH_REAL_POST'));
  } catch (err) {
    log.warn({ err: err.message }, 'xray-posts.json read failed');
    return [];
  }
}

async function hunterEnrichDomain(domain, fullName, log) {
  const key = process.env.HUNTER_API_KEY?.trim();
  if (!key || !domain || !fullName) return null;
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0] || '';
  const last = parts.slice(1).join(' ') || first;
  const host = domain.replace(/^https?:\/\//i, '').split('/')[0];
  const u = new URL('https://api.hunter.io/v2/email-finder');
  u.searchParams.set('domain', host);
  u.searchParams.set('first_name', first);
  u.searchParams.set('last_name', last);
  u.searchParams.set('api_key', key);
  try {
    const res = await fetch(u.toString());
    const j = await res.json();
    if (!res.ok) {
      log.debug({ status: res.status, host }, 'Hunter email-finder non-OK');
      return null;
    }
    return j?.data || j;
  } catch (err) {
    log.warn({ err: err.message }, 'Hunter request failed');
    return null;
  }
}

export async function runCompetitorXrayFragment(log) {
  const apiKey = process.env.HYPERBROWSER_API_KEY?.trim();
  if (!apiKey) {
    log.warn('HYPERBROWSER_API_KEY not set — skipping competitor_xray');
    return { leads: 0, signals: 0 };
  }

  const posts = loadPostList(log);
  if (posts.length === 0) {
    log.info('competitor_xray: no post URLs (set XRAY_LINKEDIN_POST_URLS or edit xray-posts.json)');
    return { leads: 0, signals: 0 };
  }

  const practiceLimit = Number(process.env.XRAY_PRACTICE_MATCH_LIMIT || 4000);
  const { data: practices } = await supabase
    .from('practices_athena')
    .select('id, name, domain, locations')
    .order('updated_at', { ascending: false })
    .limit(practiceLimit);

  const list = practices || [];
  const profileId = process.env.LINKEDIN_HB_PROFILE_ID?.trim();
  const sessionOptions = {
    ...HB_EXTRACT_SESSION,
    ...(profileId ? { profile: { id: profileId, persistChanges: false } } : {}),
  };

  const client = new Hyperbrowser({ apiKey });
  let leads = 0;
  let signals = 0;

  for (const { url: postUrl } of posts) {
    try {
      const result = await client.extract.startAndWait({
        urls: [postUrl],
        prompt:
          'Extract people who commented on or reacted to this LinkedIn post. For each person return profileUrl (full https://www.linkedin.com/... URL if visible), name, headline or title line, and engagementType (comment or reaction). Skip generic "LinkedIn Member" without a URL.',
        schema: XrayExtractZ,
        sessionOptions,
      });

      const data = result?.data ?? result;
      const profiles = Array.isArray(data?.profiles) ? data.profiles : [];

      for (const raw of profiles) {
        const fullName = (raw.name || '').trim();
        const headline = (raw.headline || '').trim();
        const linkedinUrl = (raw.profileUrl || '').trim();

        if (!linkedinUrl.includes('linkedin.com')) continue;
        if (!TITLE_FILTER_RE.test(`${headline} ${fullName}`)) continue;

        const match = findPracticeMatch(fullName, headline, list);
        let enrichment = {};
        if (match?.domain) {
          const h = await hunterEnrichDomain(match.domain, fullName, log);
          if (h) enrichment.hunter = h;
        }

        const { error: upErr } = await supabase.from('xray_leads_athena').upsert(
          {
            linkedin_profile_url: linkedinUrl.slice(0, 8000),
            full_name: fullName || null,
            headline: headline || null,
            source_post_url: postUrl.slice(0, 8000),
            matched_practice_id: match?.id ?? null,
            enrichment,
          },
          { onConflict: 'linkedin_profile_url,source_post_url' },
        );

        if (upErr) {
          log.warn({ err: upErr.message, linkedinUrl }, 'xray_leads upsert failed');
          continue;
        }
        leads += 1;

        if (match) {
          const cooldownIso = new Date(Date.now() - 72 * 3600 * 1000).toISOString();
          const { data: recentSigs } = await supabase
            .from('signals_athena')
            .select('metadata')
            .eq('practice_id', match.id)
            .eq('type', 'competitor_xray_engagement')
            .gte('timestamp', cooldownIso);

          const dup = (recentSigs || []).some((r) => r.metadata?.linkedin_profile_url === linkedinUrl);
          if (!dup) {
            await supabase.from('signals_athena').insert({
              type: 'competitor_xray_engagement',
              practice_id: match.id,
              strength: 'HIGH',
              metadata: {
                full_name: fullName,
                headline,
                linkedin_profile_url: linkedinUrl,
                source_post_url: postUrl,
                engagement_type: raw.engagementType,
              },
            });
            signals += 1;
          }
        }
      }
    } catch (err) {
      log.warn({ postUrl, err: err.message }, 'competitor_xray extract failed');
    }
  }

  log.info({ leadsUpserted: leads, signalsInserted: signals }, 'competitor_xray fragment done');
  return { leads, signals };
}
