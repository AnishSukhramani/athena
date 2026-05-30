/**
 * Voice AI Scout — Competitor intelligence for voice AI companies in healthcare.
 *
 * Phases on every run:
 *   1.   Upsert known competitors from config (+ apply manual_page_id_overrides).
 *   1.5. Auto-resolve fb_page_id for competitors that still lack one — searches
 *        Meta Ad Library by company name via Hyperbrowser, saves to DB.
 *   2.   Scrape Meta Ad Library for each competitor that now has a page ID.
 *   3.   Keyword discovery — uses OpenAI to generate an aggressive, expanded query
 *        list, then searches Ad Library for each to discover new competitors.
 *
 * Command:
 *   pnpm run worker -- voice_ai_scout
 *
 * Required env:
 *   HYPERBROWSER_API_KEY
 *   SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (standard worker requirement)
 *
 * Optional env:
 *   OPENAI_API_KEY             — enables LLM-expanded discovery queries (recommended)
 *   OPENAI_MODEL               — model to use (default: gpt-4o-mini)
 *   VOICE_AI_SCOUT_MAX_ADS     — max ads scraped per competitor per run (default 50)
 *   VOICE_AI_SCOUT_DISCOVERY   — "false" to skip keyword discovery (default "true")
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { z } from 'zod';
import OpenAI from 'openai';
import { Hyperbrowser } from '@hyperbrowser/sdk';
import { supabase } from '@jobportalscout/db';
import { HB_EXTRACT_SESSION } from './hyperbrowser-helpers.js';

const __dir = path.dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// Zod schemas for Hyperbrowser structured extraction
// ---------------------------------------------------------------------------

/** Ads extracted from a competitor's Ad Library page. */
const CompetitorAdsZ = z.object({
  ads: z
    .array(
      z.object({
        headline: z.string().optional(),
        primaryText: z.string().optional(),
        ctaText: z.string().optional(),
        daysActiveApprox: z.number().optional(),
        deliveryNote: z.string().optional(),
      }),
    )
    .optional()
    .default([]),
});

/** Advertisers discovered via a keyword search on the Ad Library. */
const DiscoveryResultZ = z.object({
  advertisers: z
    .array(
      z.object({
        pageName: z.string().optional(),
        facebookPageUrl: z.string().optional(),
        pageId: z.string().optional(),
        adSample: z.string().optional(),
        isVoiceAiHealthcare: z.boolean().optional(),
      }),
    )
    .optional()
    .default([]),
});

/** Single page ID lookup from an Ad Library search. */
const PageIdLookupZ = z.object({
  pageId: z.string().optional(),
  facebookPageUrl: z.string().optional(),
  confidence: z.enum(['high', 'medium', 'low']).optional(),
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function loadConfig(log) {
  const fp = path.join(__dir, '../config/voice-ai-competitors.json');
  if (!fs.existsSync(fp)) {
    log.warn('voice-ai-competitors.json not found — using empty config');
    return { competitors: [], discovery: { keywords: [] }, manual_page_id_overrides: {} };
  }
  try {
    return JSON.parse(fs.readFileSync(fp, 'utf8'));
  } catch (err) {
    log.warn({ err: err.message }, 'voice-ai-competitors.json parse failed');
    return { competitors: [], discovery: { keywords: [] }, manual_page_id_overrides: {} };
  }
}

/** SHA-256[:16] fingerprint of a normalized headline + primary text pair. */
function adFingerprint(headline, primaryText) {
  const raw = `${String(headline || '').trim().toLowerCase()}|${String(primaryText || '').trim().toLowerCase()}`;
  return crypto.createHash('sha256').update(raw).digest('hex').slice(0, 16);
}

/** Convert a company name to a stable slug key. */
function toKey(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

/**
 * Heuristic: does this company look like a voice AI / AI receptionist company
 * in the healthcare space?
 */
function looksLikeVoiceAiHealthcare(name, adText) {
  const blob = `${name} ${adText}`.toLowerCase();
  const voiceAi =
    /\b(voice[\s-]ai|ai[\s-]receptionist|ai[\s-]front[\s-]?desk|ai[\s-]phone|virtual[\s-]receptionist|ai[\s-]answering|ai[\s-]scribe|ambient[\s-]ai|conversational[\s-]ai|ai[\s-]agent|voice[\s-]bot|voicebot|ai[\s-]caller|phone[\s-]ai|ai[\s-]call|automated[\s-]receptionist|ai[\s-]communication)\b/.test(blob);
  const health =
    /\b(health|medical|dental|clinic|hospital|practice|patient|doctor|physician|ehr|emr|scheduling|front[\s-]?desk|receptionist|dentist|chiropractic|optometry|dermatology|pediatric|orthopedic|urgent[\s-]care)\b/.test(blob);
  return voiceAi || (blob.includes('ai') && health);
}

/** Build Meta Ad Library page URL from a page ID. */
function adLibraryUrlFromPageId(pageId) {
  return `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=US&view_all_page_id=${pageId}`;
}

/** Build Meta Ad Library keyword search URL. */
function adLibrarySearchUrl(keyword) {
  return `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=${encodeURIComponent(keyword)}&search_type=keyword_unordered`;
}

// ---------------------------------------------------------------------------
// OpenAI — aggressive discovery query expansion
// ---------------------------------------------------------------------------

/**
 * Uses OpenAI to generate a large, varied set of Meta Ad Library search queries
 * for finding undiscovered voice AI / AI receptionist competitors in healthcare.
 * Falls back to config keywords if OPENAI_API_KEY is not set.
 */
async function expandDiscoveryQueries(configKeywords, knownCompetitorNames, log) {
  if (!process.env.OPENAI_API_KEY) {
    log.info('voice_ai_scout: OPENAI_API_KEY not set — using config keywords only for discovery');
    return configKeywords;
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const res = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: `You are a competitive intelligence analyst for a company that sells AI phone/voice software to dental and medical practices.
Your job: generate an aggressive, exhaustive list of Meta Ad Library search queries to uncover EVERY company running ads for voice AI, AI phone agents, AI receptionists, or front-desk automation targeting healthcare (dental, medical, chiropractic, optometry, dermatology, veterinary, urgent care, specialty clinics).

Think broadly across:
- Different product names: AI receptionist, AI front desk, AI phone agent, AI answering service, virtual receptionist, AI scribe, AI call handler, ambient AI
- Different verticals: dental office, medical practice, doctor office, clinic, hospital, chiropractic, physical therapy, urgent care, specialty care
- Different pain points: missed calls, after-hours coverage, patient scheduling, appointment reminders, insurance verification, patient intake
- Competitor-category overlaps: EHR add-ons, telehealth, patient engagement platforms that now include voice AI
- Non-obvious phrasings companies might use in their actual ad copy

Return JSON: { "queries": string[] } — aim for 25–35 diverse, specific queries. Do not repeat the existing ones.`,
        },
        {
          role: 'user',
          content: `Known competitors (skip these): ${knownCompetitorNames.slice(0, 30).join(', ')}.
Existing queries (do not repeat): ${JSON.stringify(configKeywords)}.
Generate the new aggressive queries now.`,
        },
      ],
    });

    const text = res.choices[0]?.message?.content || '{}';
    const parsed = JSON.parse(text);
    const generated = Array.isArray(parsed.queries) ? parsed.queries.filter(Boolean) : [];
    const combined = [...new Set([...configKeywords, ...generated])];

    log.info(
      { configKeywords: configKeywords.length, generated: generated.length, total: combined.length },
      'voice_ai_scout: OpenAI expanded discovery queries',
    );

    return combined;
  } catch (err) {
    log.warn({ err: err.message }, 'voice_ai_scout: OpenAI query expansion failed — using config keywords only');
    return configKeywords;
  }
}

// ---------------------------------------------------------------------------
// DB operations
// ---------------------------------------------------------------------------

/**
 * Insert-or-update a competitor.
 * first_seen_at is protected by a DB trigger so it's never overwritten on update.
 */
async function upsertCompetitor(competitor, log) {
  const now = new Date().toISOString();

  const { error: insertErr } = await supabase.from('voice_ai_competitors_athena').insert({
    key: competitor.key,
    name: competitor.name,
    website: competitor.website || null,
    description: competitor.description || null,
    fb_page_id: competitor.fb_page_id || null,
    ad_library_url: competitor.ad_library_url || null,
    category: competitor.category || 'voice_ai_healthcare',
    is_active: true,
    first_seen_at: now,
    last_seen_at: now,
    metadata: competitor.metadata || {},
  });

  if (!insertErr) return { action: 'inserted' };

  if (insertErr.code === '23505') {
    const updatePayload = {
      name: competitor.name,
      last_seen_at: now,
      is_active: true,
    };
    if (competitor.website) updatePayload.website = competitor.website;
    if (competitor.description) updatePayload.description = competitor.description;
    if (competitor.fb_page_id) updatePayload.fb_page_id = competitor.fb_page_id;
    if (competitor.ad_library_url) updatePayload.ad_library_url = competitor.ad_library_url;
    if (competitor.metadata && Object.keys(competitor.metadata).length) {
      updatePayload.metadata = competitor.metadata;
    }

    const { error: updateErr } = await supabase
      .from('voice_ai_competitors_athena')
      .update(updatePayload)
      .eq('key', competitor.key);

    if (updateErr) {
      log.warn({ key: competitor.key, err: updateErr.message }, 'voice_ai_scout: competitor update failed');
      return { action: 'error' };
    }
    return { action: 'updated' };
  }

  log.warn({ key: competitor.key, err: insertErr.message }, 'voice_ai_scout: competitor insert failed');
  return { action: 'error' };
}

/**
 * Upsert a single ad snapshot for a competitor.
 * The DB trigger increments run_count and updates last_seen_at on each conflict update.
 */
async function upsertAdSnapshot(competitorId, ad, extractJobId, log) {
  const fingerprint = adFingerprint(ad.headline, ad.primaryText);
  const isLongRunning = typeof ad.daysActiveApprox === 'number' && ad.daysActiveApprox >= 30;
  const now = new Date().toISOString();

  const { error: insertErr } = await supabase.from('voice_ai_ad_snapshots_athena').insert({
    competitor_id: competitorId,
    ad_fingerprint: fingerprint,
    headline: ad.headline || null,
    primary_text: ad.primaryText || null,
    cta_text: ad.ctaText || null,
    days_active_approx: ad.daysActiveApprox ?? null,
    is_long_running: isLongRunning,
    delivery_note: ad.deliveryNote || null,
    first_seen_at: now,
    last_seen_at: now,
    run_count: 1,
    metadata: { extractJobId: extractJobId || null },
  });

  if (!insertErr) return 'inserted';

  if (insertErr.code === '23505') {
    const { error: updateErr } = await supabase
      .from('voice_ai_ad_snapshots_athena')
      .update({
        days_active_approx: ad.daysActiveApprox ?? null,
        is_long_running: isLongRunning,
        delivery_note: ad.deliveryNote || null,
        metadata: { extractJobId: extractJobId || null },
      })
      .eq('competitor_id', competitorId)
      .eq('ad_fingerprint', fingerprint);

    if (updateErr) {
      log.warn({ competitorId, fingerprint, err: updateErr.message }, 'voice_ai_scout: ad update failed');
      return 'error';
    }
    return 'updated';
  }

  log.warn({ competitorId, fingerprint, err: insertErr.message }, 'voice_ai_scout: ad insert failed');
  return 'error';
}

// ---------------------------------------------------------------------------
// Main fragment
// ---------------------------------------------------------------------------

export async function runVoiceAiScoutFragment(log) {
  const apiKey = process.env.HYPERBROWSER_API_KEY?.trim();
  if (!apiKey) {
    log.warn('HYPERBROWSER_API_KEY not set — skipping voice_ai_scout');
    return { competitorsTracked: 0, adsUpserted: 0, newCompetitorsDiscovered: 0 };
  }

  const maxAds = Number(process.env.VOICE_AI_SCOUT_MAX_ADS || 50);
  const discoveryEnabled = (process.env.VOICE_AI_SCOUT_DISCOVERY || 'true').toLowerCase() !== 'false';

  const client = new Hyperbrowser({ apiKey });
  const cfg = loadConfig(log);

  // Manual page ID overrides: { competitor_key: "fb_page_id" }
  // Populated in voice-ai-competitors.json under "manual_page_id_overrides".
  // These always win — applied before auto-discovery and before ad scraping.
  const manualOverrides = cfg.manual_page_id_overrides || {};

  let competitorsTracked = 0;
  let adsInserted = 0;
  let adsRefreshed = 0;
  let newCompetitorsDiscovered = 0;
  let pageIdsResolved = 0;

  // -------------------------------------------------------------------------
  // Phase 1: Load & upsert competitors from config (apply manual overrides)
  // -------------------------------------------------------------------------

  log.info('voice_ai_scout [1/3]: loading and upserting competitor profiles');

  for (const c of cfg.competitors || []) {
    if (!c.key || !c.name) continue;

    // Manual override takes priority
    const pageId = manualOverrides[c.key] || c.fb_page_id || null;
    const adUrl = pageId ? adLibraryUrlFromPageId(pageId) : (c.ad_library_url || null);

    await upsertCompetitor({ ...c, fb_page_id: pageId, ad_library_url: adUrl }, log);
  }

  // If a manual override was set for a key that's already in the DB but not in config,
  // apply it directly so discovered competitors also benefit.
  for (const [key, pageId] of Object.entries(manualOverrides)) {
    if (!pageId) continue;
    const adUrl = adLibraryUrlFromPageId(pageId);
    await supabase
      .from('voice_ai_competitors_athena')
      .update({ fb_page_id: pageId, ad_library_url: adUrl, last_seen_at: new Date().toISOString() })
      .eq('key', key)
      .is('fb_page_id', null); // only update if not already set (don't override auto-discovered values)
  }

  // Fetch the full active competitor list from DB
  const { data: allCompetitors, error: fetchErr } = await supabase
    .from('voice_ai_competitors_athena')
    .select('id, key, name, fb_page_id, ad_library_url, is_active')
    .eq('is_active', true)
    .order('last_seen_at', { ascending: false });

  if (fetchErr) {
    log.error({ err: fetchErr.message }, 'voice_ai_scout: failed to fetch competitors from DB');
    return { competitorsTracked: 0, adsUpserted: 0, newCompetitorsDiscovered: 0 };
  }

  const competitors = allCompetitors || [];
  log.info({ total: competitors.length }, 'voice_ai_scout: competitors loaded');

  const knownNames = new Set(competitors.map((c) => (c.name || '').toLowerCase()));

  // -------------------------------------------------------------------------
  // Phase 1.5: Auto-resolve fb_page_id for competitors that still lack one
  // -------------------------------------------------------------------------

  const unresolved = competitors.filter((c) => !c.fb_page_id);

  if (unresolved.length > 0) {
    log.info(
      { total: unresolved.length },
      'voice_ai_scout [1.5/3]: auto-resolving fb_page_id via Ad Library name search',
    );

    for (const competitor of unresolved) {
      log.debug({ key: competitor.key }, 'voice_ai_scout: looking up page ID');
      try {
        const searchUrl = adLibrarySearchUrl(competitor.name);

        const result = await client.extract.startAndWait({
          urls: [searchUrl],
          prompt: [
            `This is a Meta Ad Library search results page for the query "${competitor.name}".`,
            `Find the entry that exactly matches (or is the closest match to) the company named "${competitor.name}".`,
            'Extract:',
            '  pageId — the numeric Facebook page ID from any view_all_page_id= URL parameter you see for this company',
            '  facebookPageUrl — their Facebook page URL if visible',
            '  confidence — "high" if the name matches well, "medium" if approximate, "low" if uncertain',
            'Return only the best single match. If no match found, leave fields empty.',
          ]
            .join(' ')
            .trim(),
          schema: PageIdLookupZ,
          sessionOptions: HB_EXTRACT_SESSION,
        });

        const data = result?.data ?? result;
        const pageId = data?.pageId?.trim();
        const confidence = data?.confidence || 'low';

        if (pageId && confidence !== 'low') {
          const adLibUrl = adLibraryUrlFromPageId(pageId);

          const { error: updateErr } = await supabase
            .from('voice_ai_competitors_athena')
            .update({
              fb_page_id: pageId,
              ad_library_url: adLibUrl,
              last_seen_at: new Date().toISOString(),
            })
            .eq('id', competitor.id);

          if (!updateErr) {
            // Patch in-memory so Phase 2 can scrape this competitor immediately
            competitor.fb_page_id = pageId;
            competitor.ad_library_url = adLibUrl;
            pageIdsResolved++;
            log.info(
              { key: competitor.key, pageId, confidence },
              'voice_ai_scout: fb_page_id resolved and saved',
            );
          } else {
            log.warn({ key: competitor.key, err: updateErr.message }, 'voice_ai_scout: page ID save failed');
          }
        } else {
          log.debug(
            { key: competitor.key, confidence, pageId: pageId || null },
            'voice_ai_scout: no confident page ID found — will retry next run',
          );
        }
      } catch (err) {
        log.warn({ key: competitor.key, err: err.message }, 'voice_ai_scout: page ID lookup failed');
      }
    }

    log.info({ pageIdsResolved }, 'voice_ai_scout: page ID resolution phase done');
  }

  // -------------------------------------------------------------------------
  // Phase 2: Scrape Meta Ad Library for each competitor with a page URL
  // -------------------------------------------------------------------------

  const toScrape = competitors.filter(
    (c) => c.ad_library_url && !c.ad_library_url.includes('REPLACE'),
  );

  log.info({ total: toScrape.length }, 'voice_ai_scout [2/3]: scraping ads for known competitors');

  for (const competitor of toScrape) {
    log.info({ key: competitor.key }, 'voice_ai_scout: fetching ads');
    try {
      const result = await client.extract.startAndWait({
        urls: [competitor.ad_library_url],
        prompt: [
          `From this Meta Ad Library page showing ads for "${competitor.name}", extract every distinct ad shown.`,
          'For each ad return:',
          '  headline — the main title or bold text of the ad',
          '  primaryText — the main body copy / description paragraph',
          '  ctaText — the call-to-action button label (e.g. "Learn More", "Book a Demo", "Get Started")',
          '  daysActiveApprox — integer number of days the ad has been running if the UI shows it',
          '  deliveryNote — any raw date range string shown (e.g. "Started running on Jan 5, 2025")',
          'Focus on ads related to voice AI, AI receptionist, healthcare automation, medical scheduling, or front desk software.',
          'Skip completely blank entries. Return up to',
          maxAds,
          'ads.',
        ]
          .join(' ')
          .trim(),
        schema: CompetitorAdsZ,
        sessionOptions: HB_EXTRACT_SESSION,
      });

      const data = result?.data ?? result;
      const ads = Array.isArray(data?.ads) ? data.ads.slice(0, maxAds) : [];

      log.info({ key: competitor.key, adsFound: ads.length }, 'voice_ai_scout: ads extracted');

      for (const ad of ads) {
        if (!ad.headline && !ad.primaryText) continue;
        const outcome = await upsertAdSnapshot(competitor.id, ad, result?.jobId, log);
        if (outcome === 'inserted') adsInserted++;
        else if (outcome === 'updated') adsRefreshed++;
      }

      competitorsTracked++;

      await supabase
        .from('voice_ai_competitors_athena')
        .update({ last_seen_at: new Date().toISOString() })
        .eq('id', competitor.id);
    } catch (err) {
      log.warn({ key: competitor.key, err: err.message }, 'voice_ai_scout: ad scrape failed');
    }
  }

  log.info(
    { tracked: competitorsTracked, newAds: adsInserted, refreshedAds: adsRefreshed },
    'voice_ai_scout: ad scraping phase done',
  );

  // -------------------------------------------------------------------------
  // Phase 3: Keyword discovery — OpenAI-expanded queries → Meta Ad Library
  // -------------------------------------------------------------------------

  if (!discoveryEnabled) {
    log.info('voice_ai_scout [3/3]: discovery disabled via VOICE_AI_SCOUT_DISCOVERY=false');
  } else {
    const configKeywords = (cfg.discovery?.keywords || []).filter(Boolean);
    const knownCompetitorNames = competitors.map((c) => c.name).filter(Boolean);

    // Expand the query list aggressively using OpenAI
    const allKeywords = await expandDiscoveryQueries(configKeywords, knownCompetitorNames, log);

    log.info({ queries: allKeywords.length }, 'voice_ai_scout [3/3]: keyword discovery searches');

    for (const keyword of allKeywords) {
      const searchUrl = adLibrarySearchUrl(keyword);
      log.debug({ keyword }, 'voice_ai_scout: discovery search');

      try {
        const result = await client.extract.startAndWait({
          urls: [searchUrl],
          prompt: [
            `This is a Meta Ad Library search results page for the query "${keyword}".`,
            'List every advertiser / Facebook page shown in the results.',
            'For each advertiser return:',
            '  pageName — the company or page name',
            '  facebookPageUrl — their Facebook page URL if visible',
            '  pageId — extract the numeric page ID from any view_all_page_id= URL parameter you see',
            '  adSample — the first 120 characters of their ad body text',
            '  isVoiceAiHealthcare — true if this company appears to offer voice AI, AI phone receptionist,',
            '    AI front desk, healthcare call automation, medical scheduling AI, or patient communication AI.',
            'Only return companies that appear genuinely related to AI-powered healthcare front desk or voice AI.',
          ]
            .join(' ')
            .trim(),
          schema: DiscoveryResultZ,
          sessionOptions: HB_EXTRACT_SESSION,
        });

        const data = result?.data ?? result;
        const advertisers = Array.isArray(data?.advertisers) ? data.advertisers : [];

        for (const adv of advertisers) {
          if (!adv.pageName) continue;

          const nameNorm = adv.pageName.toLowerCase();
          if (knownNames.has(nameNorm)) continue;

          if (!adv.isVoiceAiHealthcare && !looksLikeVoiceAiHealthcare(adv.pageName, adv.adSample || '')) {
            continue;
          }

          const key = toKey(adv.pageName);
          if (!key) continue;

          knownNames.add(nameNorm);

          const adLibUrl = adv.pageId ? adLibraryUrlFromPageId(adv.pageId) : null;

          const { action } = await upsertCompetitor(
            {
              key,
              name: adv.pageName,
              fb_page_id: adv.pageId || null,
              ad_library_url: adLibUrl,
              category: 'voice_ai_healthcare',
              metadata: {
                discovered_via: 'ad_library_keyword_search',
                discovery_keyword: keyword,
                fb_page_url: adv.facebookPageUrl || null,
                ad_sample: adv.adSample || null,
              },
            },
            log,
          );

          if (action === 'inserted') {
            newCompetitorsDiscovered++;
            log.info(
              { name: adv.pageName, key, keyword },
              'voice_ai_scout: NEW competitor discovered',
            );
          }
        }
      } catch (err) {
        log.warn({ keyword, err: err.message }, 'voice_ai_scout: discovery search failed');
      }
    }

    log.info({ newCompetitorsDiscovered }, 'voice_ai_scout: discovery phase done');
  }

  const adsUpserted = adsInserted + adsRefreshed;
  log.info(
    {
      competitorsTracked,
      adsUpserted,
      adsInserted,
      adsRefreshed,
      pageIdsResolved,
      newCompetitorsDiscovered,
    },
    'voice_ai_scout fragment done',
  );

  return { competitorsTracked, adsUpserted, newCompetitorsDiscovered };
}
