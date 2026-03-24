/**
 * Hyperbrowser scrapers - Apify-free scraping for job portals
 * Requires HYPERBROWSER_API_KEY and OPENAI_API_KEY (or other LLM)
 */

import { z } from 'zod';
import { filterJobs } from '../filters.js';
import { DENTALPOST_URLS } from '../config.js';
import { sleep } from '../utils.js';

const JOB_SCHEMA = z.object({
  jobs: z.array(
    z.object({
      companyName: z.string(),
      jobTitle: z.string(),
      url: z.string(),
    })
  ),
});

function toRecord(item, source) {
  return {
    companyName: item.companyName ?? item.company ?? '',
    jobTitle: item.jobTitle ?? item.title ?? '',
    sourceUrl: item.sourceUrl ?? item.url ?? item.link ?? '',
    postedDate: item.postedDate ?? item.posted ?? item.date ?? '',
    rawDescription: item.rawDescription ?? item.description ?? '',
    source,
  };
}

function extractAndFilter(data, source, log) {
  const jobs = data?.jobs ?? [];
  const records = jobs.map((j) => toRecord({ ...j, sourceUrl: j.url, description: j.description ?? '' }, source));
  const valid = records.filter((r) => r.companyName && r.jobTitle);
  return filterJobs(valid);
}

/**
 * Scrape DentalPost - dental-specific job board
 */
export async function scrapeDentalPost(agent, log) {
  const records = [];
  for (const url of DENTALPOST_URLS.slice(0, 2)) {
    const t0 = Date.now();
    log.info({ url }, '[DentalPost] Starting page');
    try {
      const page = await agent.newPage();
      log.info({ url, elapsed: `${((Date.now() - t0) / 1000).toFixed(1)}s` }, '[DentalPost] Page created, navigating');
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      log.info({ url, elapsed: `${((Date.now() - t0) / 1000).toFixed(1)}s` }, '[DentalPost] Loaded, extracting');
      const data = await page.extract(
        'Extract all job listings visible on the page. For each job include: company/practice name, job title, full job URL, and description if visible.',
        JOB_SCHEMA
      );
      records.push(...extractAndFilter(data, 'dentalpost', log));
      log.info({ url, count: data?.jobs?.length ?? 0, elapsed: `${((Date.now() - t0) / 1000).toFixed(1)}s` }, '[DentalPost] Page done');
      await sleep(1500);
    } catch (err) {
      log.warn(
        { url, elapsed: `${((Date.now() - t0) / 1000).toFixed(1)}s`, errMessage: err?.message, errCode: err?.code },
        '[DentalPost] Scrape failed'
      );
    }
  }
  return records;
}

/**
 * Indeed & LinkedIn use SDK Extract (proxy+captcha) - see extract-sdk.js
 * Agent-based scrapers fail on these sites; SDK with paid features succeeds.
 */

/**
 * Scrape iHireDental
 */
export async function scrapeIHireDental(agent, log) {
  const url = 'https://www.ihiredental.com/jobs';
  const t0 = Date.now();
  log.info({ url }, '[iHireDental] Starting');
  try {
    const page = await agent.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    const data = await page.extract(
      'Extract all job listings. For each job include: company name, job title, job URL, and description.',
      JOB_SCHEMA
    );
    const records = extractAndFilter(data, 'ihiredental', log);
    log.info({ url, count: records.length, elapsed: `${((Date.now() - t0) / 1000).toFixed(1)}s` }, '[iHireDental] Done');
    return records;
  } catch (err) {
    log.warn({ url, elapsed: `${((Date.now() - t0) / 1000).toFixed(1)}s`, errMessage: err?.message, errCode: err?.code }, '[iHireDental] Scrape failed');
    return [];
  }
}

/**
 * Scrape Jobley (Job Medley)
 */
export async function scrapeJobley(agent, log) {
  const url = 'https://us.job-medley.com/dc/';
  const t0 = Date.now();
  log.info({ url }, '[Jobley] Starting');
  try {
    const page = await agent.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    const data = await page.extract(
      'Extract all job listings. For each job include: company/practice name, job title, job URL, and description.',
      JOB_SCHEMA
    );
    const records = extractAndFilter(data, 'jobley', log);
    log.info({ url, count: records.length, elapsed: `${((Date.now() - t0) / 1000).toFixed(1)}s` }, '[Jobley] Done');
    return records;
  } catch (err) {
    log.warn({ url, elapsed: `${((Date.now() - t0) / 1000).toFixed(1)}s`, errMessage: err?.message, errCode: err?.code }, '[Jobley] Scrape failed');
    return [];
  }
}

/**
 * Run all Hyperbrowser scrapers
 * Indeed & LinkedIn: SDK Extract with proxy+captcha (paid features)
 * DentalPost, iHireDental, Jobley: HyperAgent page.extract
 */
export async function runHyperbrowserScrapers(log) {
  const { scrapeIndeedSDK, scrapeLinkedInSDK } = await import('./extract-sdk.js');
  const { HyperAgent } = await import('@hyperbrowser/agent');

  log.info('[Scrapers] Starting Indeed SDK (proxy+captcha) and LinkedIn SDK (proxy+captcha) in parallel with agent scrapers');
  const t0 = Date.now();

  const agent = new HyperAgent({
    browserProvider: 'Hyperbrowser',
    llm: { provider: 'openai', model: 'gpt-4o' },
  });
  log.info('[Scrapers] HyperAgent created');

  const [sdkResults, agentResults] = await Promise.all([
    Promise.all([scrapeIndeedSDK(log), scrapeLinkedInSDK(log)]),
    Promise.all([
      scrapeDentalPost(agent, log),
      scrapeIHireDental(agent, log),
      scrapeJobley(agent, log),
    ]),
  ]);

  await agent.closeAgent?.();
  const total = [...sdkResults.flat(), ...agentResults.flat()];
  log.info({ total: total.length, elapsed: `${((Date.now() - t0) / 1000).toFixed(1)}s` }, '[Scrapers] All scrapers complete');

  return total;
}
