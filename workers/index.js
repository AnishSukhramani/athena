#!/usr/bin/env node
/**
 * Opportunity Brain workers — run fragments on schedule (see docs/CRON.md).
 */
import 'dotenv/config';
import pino from 'pino';
import { runJobSignalFragment } from './lib/job-signal.js';
import { runReviewFrictionFragment } from './lib/reviews.js';
import { runNppesFragment } from './lib/nppes.js';
import { runWebsiteFragment } from './lib/website.js';
import { runTechStackFragment } from './lib/tech-stack.js';
import { runAdLibraryFragment } from './lib/ad-library.js';
import { runCompetitorXrayFragment } from './lib/competitor-xray.js';
import { runScoringEngine } from './lib/scoring.js';
import { logWorkerServiceStatus } from './lib/env-status.js';

const log = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: { colorize: true },
  },
});

const args = process.argv.slice(2).filter((a) => a !== '--');
const fragment = (args[0] || 'help').toLowerCase();

async function main() {
  if (fragment === 'help') {
    log.info(`Usage: pnpm run worker -- <fragment>

Fragments:
  jobs             Job Signal Engine (DentalPost + JSON-LD career seeds)
  reviews          Google Places review / phone friction
  nppes            NPPES CSV ingest (NPPES_CSV_PATH)
  website          Website automation heuristic scan
  tech_stack       Legacy PMS / portal detection (fetch + regex + optional BuiltWith)
  ad_library       Meta Ad Library via Hyperbrowser extract → competitor_ads_athena
  competitor_xray  LinkedIn engagement extract → xray_leads_athena (+ signals when matched)
  score            Opportunity scoring + evidence + summaries
  all              jobs → reviews → nppes → website → tech_stack → score (no ad_library/xray)
`);
    process.exit(0);
  }

  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    log.error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required — see .env.example');
    process.exit(1);
  }

  await logWorkerServiceStatus(log, { fragment });

  switch (fragment) {
    case 'jobs':
      await runJobSignalFragment(log);
      break;
    case 'reviews':
      await runReviewFrictionFragment(log);
      break;
    case 'nppes':
      await runNppesFragment(log);
      break;
    case 'website':
      await runWebsiteFragment(log);
      break;
    case 'tech_stack':
      await runTechStackFragment(log);
      break;
    case 'ad_library':
      await runAdLibraryFragment(log);
      break;
    case 'competitor_xray':
      await runCompetitorXrayFragment(log);
      break;
    case 'score':
      await runScoringEngine(log);
      break;
    case 'all':
      log.info('Fragment: jobs (job signals)');
      await runJobSignalFragment(log);
      log.info('Fragment: reviews');
      await runReviewFrictionFragment(log);
      log.info('Fragment: nppes');
      await runNppesFragment(log);
      log.info('Fragment: website');
      await runWebsiteFragment(log);
      log.info('Fragment: tech_stack');
      await runTechStackFragment(log);
      log.info('Fragment: score');
      await runScoringEngine(log);
      break;
    default:
      log.error(
        { fragment },
        'Unknown fragment — use: jobs | reviews | nppes | website | tech_stack | ad_library | competitor_xray | score | all | help',
      );
      process.exit(1);
  }

  log.info('Worker finished');
  process.exit(0);
}

main().catch((err) => {
  log.error({ err }, 'Worker failed');
  process.exit(1);
});
