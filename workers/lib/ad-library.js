/**
 * Meta Ad Library — Hyperbrowser extract → competitor_ads_athena (Athena v1.2).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod';
import { Hyperbrowser } from '@hyperbrowser/sdk';
import { supabase } from '@jobportalscout/db';
import { HB_EXTRACT_SESSION } from './hyperbrowser-helpers.js';

const AdExtractZ = z.object({
  ads: z
    .array(
      z.object({
        primaryText: z.string().optional(),
        headline: z.string().optional(),
        daysActiveApprox: z.number().optional(),
        deliveryNote: z.string().optional(),
      }),
    )
    .optional(),
});

function loadCompetitorConfig(log) {
  const rawEnv = process.env.COMPETITOR_FB_PAGES_JSON?.trim();
  if (rawEnv) {
    try {
      return JSON.parse(rawEnv);
    } catch {
      log.warn('COMPETITOR_FB_PAGES_JSON invalid JSON');
    }
  }
  const dir = path.dirname(fileURLToPath(import.meta.url));
  const fp = path.join(dir, '../config/competitor-pages.json');
  if (!fs.existsSync(fp)) return { competitors: [] };
  try {
    return JSON.parse(fs.readFileSync(fp, 'utf8'));
  } catch (err) {
    log.warn({ err: err.message }, 'competitor-pages.json read failed');
    return { competitors: [] };
  }
}

export async function runAdLibraryFragment(log) {
  const apiKey = process.env.HYPERBROWSER_API_KEY?.trim();
  if (!apiKey) {
    log.warn('HYPERBROWSER_API_KEY not set — skipping ad_library');
    return 0;
  }

  const cfg = loadCompetitorConfig(log);
  const list = cfg.competitors || [];
  if (list.length === 0) {
    log.info('ad_library: no competitors configured');
    return 0;
  }

  const client = new Hyperbrowser({ apiKey });
  let inserted = 0;

  for (const c of list) {
    const url = c.adLibraryUrl;
    if (!url || String(url).includes('REPLACE_WITH_META_PAGE_ID')) {
      log.debug({ key: c.key }, 'ad_library: skip placeholder or missing URL');
      continue;
    }

    try {
      const result = await client.extract.startAndWait({
        urls: [url],
        prompt:
          'From this Meta Ad Library page, list each distinct ad. For each ad return primaryText (main copy), headline if shown, daysActiveApprox as an integer if the UI indicates how many days the ad has been active, and deliveryNote for any raw date text. Omit empty ads.',
        schema: AdExtractZ,
        sessionOptions: HB_EXTRACT_SESSION,
      });

      const data = result?.data ?? result;
      const ads = Array.isArray(data?.ads) ? data.ads : [];
      const metaBase = { extractJobId: result?.jobId, competitorName: c.name };

      for (const ad of ads) {
        const body = [ad.headline, ad.primaryText, ad.deliveryNote].filter(Boolean).join('\n').trim();
        if (!body) continue;
        const days = ad.daysActiveApprox;
        const metadata = {
          ...metaBase,
          daysActiveApprox: days,
          longRunning: typeof days === 'number' && days >= 30,
        };

        await supabase.from('competitor_ads_athena').insert({
          competitor_key: c.key,
          page_url: c.name || c.key,
          ad_library_url: url,
          ad_body: body.slice(0, 32000),
          metadata,
        });
        inserted += 1;
      }
    } catch (err) {
      log.warn({ key: c.key, err: err.message }, 'ad_library extract failed');
    }
  }

  log.info({ rowsInserted: inserted }, 'ad_library fragment done');
  return inserted;
}
