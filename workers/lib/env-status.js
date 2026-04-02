/**
 * Startup diagnostics: which integrations are configured (no secret values logged).
 */
import fs from 'fs';
import path from 'path';
import { supabase } from '@jobportalscout/db';

function present(v) {
  return Boolean(v && String(v).trim());
}

function s3Status() {
  const region = present(process.env.AWS_REGION);
  const bucket = present(process.env.S3_BUCKET);
  const explicitKeys = present(process.env.AWS_ACCESS_KEY_ID) && present(process.env.AWS_SECRET_ACCESS_KEY);
  if (!region || !bucket) {
    return { active: false, mode: 'off', detail: 'Set AWS_REGION and S3_BUCKET to upload listing HTML evidence' };
  }
  return {
    active: true,
    mode: 'ready',
    credentials: explicitKeys ? 'explicit_keys' : 'default_provider_chain',
  };
}

function openAiMode() {
  return present(process.env.OPENAI_API_KEY) ? 'llm_enabled' : 'rules_only_no_key';
}

/**
 * @param {import('pino').Logger} log
 * @param {{ fragment: string }} opts
 */
export async function logWorkerServiceStatus(log, { fragment }) {
  const csvPath = process.env.NPPES_CSV_PATH;
  const nppesFileOk = Boolean(csvPath && fs.existsSync(csvPath));

  const careerSeeds = (process.env.CAREER_DOMAIN_SEEDS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const reviewEnvQueries = (process.env.REVIEW_PRACTICE_QUERIES || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const snapshot = {
    fragment,
    logLevel: process.env.LOG_LEVEL || 'info',
    supabase: {
      url: present(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL),
      serviceRoleKey: present(process.env.SUPABASE_SERVICE_ROLE_KEY),
    },
    openai: {
      apiKey: present(process.env.OPENAI_API_KEY),
      mode: openAiMode(),
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini (default)',
    },
    jobSignals: {
      dentalPostListUrls: process.env.DENTALPOST_URLS ? 'env_DENTALPOST_URLS' : 'default_src_config',
      careerDomainSeeds: careerSeeds.length,
    },
    googleMaps: {
      apiKey: present(process.env.GOOGLE_MAPS_API_KEY),
    },
    nppes: {
      csvPath: present(csvPath),
      fileExists: nppesFileOk,
      basename: csvPath && nppesFileOk ? path.basename(csvPath) : null,
      maxRows: Number(process.env.NPPES_MAX_ROWS || 5000),
    },
    reviews: {
      envQueries: reviewEnvQueries.length,
      dbPracticeLimit: Number(process.env.REVIEW_DB_PRACTICE_LIMIT || 15),
    },
    website: {
      scanLimit: Number(process.env.WEBSITE_SCAN_LIMIT || 20),
    },
    techStack: {
      scanLimit: Number(process.env.TECH_STACK_SCAN_LIMIT || process.env.WEBSITE_SCAN_LIMIT || 20),
      builtWith: present(process.env.BUILTWITH_API_KEY),
    },
    hyperbrowser: {
      apiKey: present(process.env.HYPERBROWSER_API_KEY),
    },
    adLibrary: {
      config: 'competitor-pages.json or COMPETITOR_FB_PAGES_JSON',
    },
    competitorXray: {
      posts: (process.env.XRAY_LINKEDIN_POST_URLS || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean).length,
      hunter: present(process.env.HUNTER_API_KEY),
      linkedinProfileId: present(process.env.LINKEDIN_HB_PROFILE_ID),
    },
    scoring: {
      dailyCap: Number(process.env.OPPORTUNITY_DAILY_CAP || 50),
      dailyFloor: Number(process.env.OPPORTUNITY_DAILY_FLOOR || 20),
    },
    s3Evidence: s3Status(),
  };

  log.info(snapshot, 'Worker service configuration (secrets shown as booleans only)');

  const readiness = readinessHints(fragment, snapshot, careerSeeds.length, reviewEnvQueries.length);
  log.info({ fragment, ...readiness }, 'Fragment readiness (what will run vs no-op)');

  await verifySupabaseConnection(log);
}

function readinessHints(fragment, snap, careerSeedCount, reviewEnvQueryCount) {
  const run = (name) => fragment === 'all' || fragment === name;

  const jobs = run('jobs')
    ? {
        willFetchDentalPost: true,
        careerJsonLd: careerSeedCount > 0 ? `will_try_${careerSeedCount}_seed(s)` : 'skipped_no_CAREER_DOMAIN_SEEDS',
        classify: snap.openai.mode === 'llm_enabled' ? 'rules_plus_llm' : 'rules_only',
      }
    : { skipped: true };

  const reviews = run('reviews')
    ? {
        needsApiKey: snap.googleMaps.apiKey,
        note: snap.googleMaps.apiKey
          ? 'Places API will run if query list non-empty'
          : 'set_GOOGLE_MAPS_API_KEY',
        envQueries: reviewEnvQueryCount,
      }
    : { skipped: true };

  const nppes = run('nppes')
    ? {
        willIngest: snap.nppes.fileExists,
        note: snap.nppes.fileExists ? 'will_stream_csv' : 'set_NPPES_CSV_PATH_to_existing_file',
      }
    : { skipped: true };

  const website = run('website')
    ? {
        willScanRows: 'practices_with_domain_in_db',
        note: 'needs practices_athena rows with domain set',
      }
    : { skipped: true };

  const tech_stack = run('tech_stack')
    ? {
        willScanRows: 'practices_with_domain_in_db',
        note: 'optional BUILTWITH_API_KEY for API hints',
      }
    : { skipped: true };

  const ad_library = run('ad_library')
    ? {
        willRun: snap.hyperbrowser.apiKey,
        note: snap.hyperbrowser.apiKey
          ? 'set real adLibraryUrl values in competitor-pages.json'
          : 'set_HYPERBROWSER_API_KEY',
      }
    : { skipped: true };

  const competitor_xray = run('competitor_xray')
    ? {
        willRun: snap.hyperbrowser.apiKey,
        postUrls: snap.competitorXray.posts || 'use_xray-posts.json',
        note: snap.hyperbrowser.apiKey
          ? 'LinkedIn may block; LINKEDIN_HB_PROFILE_ID optional'
          : 'set_HYPERBROWSER_API_KEY',
      }
    : { skipped: true };

  const score = run('score')
    ? {
        summaries: snap.openai.apiKey ? 'llm_summaries' : 'template_summaries',
        note: 'needs signals in signals_athena within sinceHours window',
      }
    : { skipped: true };

  return { jobs, reviews, nppes, website, tech_stack, ad_library, competitor_xray, score };
}

async function verifySupabaseConnection(log) {
  try {
    const { data, error } = await supabase.from('practices_athena').select('id').limit(1);
    if (error) {
      log.warn(
        { message: error.message, code: error.code, hint: error.hint },
        'Supabase: practices_athena query failed — check URL, service role key, and migrations',
      );
      return;
    }
    log.info(
      { table: 'practices_athena', sampleRowCount: data?.length ?? 0 },
      'Supabase: client initialized and table reachable',
    );
  } catch (err) {
    log.warn({ err: err.message }, 'Supabase: connectivity check threw');
  }
}
