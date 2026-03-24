#!/usr/bin/env node
/**
 * JobPortalScout v0 - Lead Generation Agent (Apify-free)
 * Uses Hyperbrowser + Reddit. Enriches with Hunter.io, writes to Google Sheets.
 */

import 'dotenv/config';
import pino from 'pino';
import { runHyperbrowserScrapers } from './scrapers/hyperbrowser.js';
import { scrapeReddit } from './scrapers/reddit.js';
import { dedupKey } from './utils.js';
import { enrichBatch } from './enricher.js';
import { appendLeads, ensureHeaders, resolveGoogleCredentials } from './sheets.js';

const log = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: { colorize: true },
  },
});

async function main() {
  const start = Date.now();
  log.info('JobPortalScout starting (Hyperbrowser + Reddit)');

  const hyperbrowserKey = process.env.HYPERBROWSER_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const hunterKey = process.env.HUNTER_API_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const hasSheetCreds = process.env.GOOGLE_SERVICE_ACCOUNT_BASE64 || process.env.GOOGLE_SERVICE_ACCOUNT_PATH;

  let googleCreds = null;
  if (sheetId && hasSheetCreds) {
    try {
      googleCreds = resolveGoogleCredentials();
    } catch (err) {
      log.warn({ err: err.message }, 'Google credentials invalid - Sheets write will be skipped');
    }
  }
  if (!sheetId || !hasSheetCreds) {
    log.warn('GOOGLE_SHEET_ID and (GOOGLE_SERVICE_ACCOUNT_BASE64 or GOOGLE_SERVICE_ACCOUNT_PATH) required for Sheets');
  }

  if (!hyperbrowserKey) {
    log.error('HYPERBROWSER_API_KEY is required');
    process.exit(1);
  }
  if (!openaiKey) {
    log.error('OPENAI_API_KEY is required for Hyperbrowser extraction');
    process.exit(1);
  }
  if (!hunterKey) {
    log.warn('HUNTER_API_KEY not set - enrichment will be skipped');
  }

  const seen = new Set();
  const uniqueRecords = [];

  try {
    log.info('Phase 1: Scraping job portals (Hyperbrowser + Reddit)');
    const [hyperbrowserResults, redditResults] = await Promise.all([
      runHyperbrowserScrapers(log),
      scrapeReddit(log),
    ]);
    const scraped = [...hyperbrowserResults, ...redditResults];

    log.info({ total: scraped.length }, 'Scraping complete');

    log.info('Phase 2: Deduplicating');
    for (const r of scraped) {
      const key = dedupKey(r);
      if (!seen.has(key)) {
        seen.add(key);
        uniqueRecords.push(r);
      }
    }
    log.info({ unique: uniqueRecords.length }, 'Deduplication complete');

    let leads = uniqueRecords;
    if (hunterKey && uniqueRecords.length > 0) {
      log.info('Phase 3: Enriching with Hunter.io');
      leads = await enrichBatch(uniqueRecords, hunterKey, log);
    } else {
      leads = uniqueRecords.map((r) => ({
        ...r,
        email: r.scrapedEmail || '',
        phone: '',
        linkedIn: '',
        facebook: '',
      }));
    }

    if (sheetId && googleCreds && leads.length > 0) {
      log.info('Phase 4: Writing to Google Sheets');
      await ensureHeaders(sheetId, googleCreds, log);
      await appendLeads(leads, sheetId, googleCreds, log);
    }

    const duration = ((Date.now() - start) / 1000).toFixed(1);
    log.info(
      {
        scraped: scraped.length,
        unique: uniqueRecords.length,
        enriched: leads.length,
        duration: `${duration}s`,
      },
      'JobPortalScout complete'
    );
    process.exit(0);
  } catch (err) {
    log.error({ err }, 'JobPortalScout failed');
    process.exit(1);
  }
}

main();
