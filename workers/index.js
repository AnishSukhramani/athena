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
import { runScoringEngine } from './lib/scoring.js';

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
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    log.error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required — see .env.example');
    process.exit(1);
  }

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
    case 'score':
      await runScoringEngine(log);
      break;
    case 'all':
      await runJobSignalFragment(log);
      await runReviewFrictionFragment(log);
      await runNppesFragment(log);
      await runWebsiteFragment(log);
      await runScoringEngine(log);
      break;
    case 'help':
      log.info(`Usage: pnpm run worker -- <fragment>

Fragments:
  jobs     Job Signal Engine (DentalPost + JSON-LD career seeds)
  reviews  Google Places review / phone friction
  nppes    NPPES CSV ingest (NPPES_CSV_PATH)
  website  Website automation heuristic scan
  score    Opportunity scoring + evidence + summaries
  all      Run all fragments in sequence
`);
      process.exit(0);
    default:
      log.error({ fragment }, 'Unknown fragment — use: jobs | reviews | nppes | website | score | all | help');
      process.exit(1);
  }

  log.info('Worker finished');
  process.exit(0);
}

main().catch((err) => {
  log.error({ err }, 'Worker failed');
  process.exit(1);
});
