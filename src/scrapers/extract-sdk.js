/**
 * Hyperbrowser SDK Extract - proxy + captcha for Indeed & LinkedIn
 * Uses paid features (useProxy, solveCaptchas) to reliably scrape anti-bot sites
 */

import { Hyperbrowser } from '@hyperbrowser/sdk';
import { filterJobs } from '../filters.js';
import { sleep } from '../utils.js';

const JOB_SCHEMA = {
  type: 'object',
  properties: {
    jobs: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          companyName: { type: 'string' },
          jobTitle: { type: 'string' },
          url: { type: 'string' },
        },
        required: ['companyName', 'jobTitle', 'url'],
      },
    },
  },
  required: ['jobs'],
};

const SESSION_OPTIONS = {
  useProxy: true,
  solveCaptchas: true,
  proxyCountry: 'US',
};

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
 * Scrape Indeed via SDK Extract (proxy + captcha)
 */
export async function scrapeIndeedSDK(log) {
  const apiKey = process.env.HYPERBROWSER_API_KEY;
  if (!apiKey) {
    log.warn('HYPERBROWSER_API_KEY not set - skipping Indeed SDK');
    return [];
  }

  const client = new Hyperbrowser({ apiKey });
  const queries = ['dental receptionist', 'dental front desk', 'medical receptionist'];
  const records = [];

  for (const q of queries) {
    const url = `https://www.indeed.com/jobs?q=${encodeURIComponent(q)}&l=United+States`;
    const t0 = Date.now();
    log.info({ query: q, url }, '[Indeed SDK] Starting extract (proxy+captcha)');
    try {
      const result = await client.extract.startAndWait({
        urls: [url],
        prompt:
          'Extract all job listings from the search results. For each job include: company name, job title, job URL (full indeed.com link).',
        schema: JOB_SCHEMA,
        sessionOptions: SESSION_OPTIONS,
      });
      const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
      const data = result?.data ?? result;
      const filtered = extractAndFilter(data, 'indeed', log);
      records.push(...filtered);
      log.info({ query: q, count: filtered.length, elapsed: `${elapsed}s` }, '[Indeed SDK] Extract done');
      await sleep(2000);
    } catch (err) {
      const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
      log.warn(
        {
          query: q,
          url,
          elapsed: `${elapsed}s`,
          errMessage: err?.message,
          errCode: err?.code,
          errStack: err?.stack?.split('\n').slice(0, 3).join(' | '),
        },
        '[Indeed SDK] Extract failed'
      );
    }
  }

  return records;
}

/**
 * Scrape LinkedIn via SDK Extract (proxy + captcha)
 */
export async function scrapeLinkedInSDK(log) {
  const apiKey = process.env.HYPERBROWSER_API_KEY;
  if (!apiKey) {
    log.warn('HYPERBROWSER_API_KEY not set - skipping LinkedIn SDK');
    return [];
  }

  const client = new Hyperbrowser({ apiKey });

  const urls = [
    'https://www.linkedin.com/jobs/search/?keywords=dental%20receptionist&location=United%20States',
    'https://www.linkedin.com/jobs/search/?keywords=medical%20receptionist&location=United%20States',
  ];

  const records = [];
  for (const url of urls) {
    const t0 = Date.now();
    log.info({ url }, '[LinkedIn SDK] Starting extract (proxy+captcha)');
    try {
      const result = await client.extract.startAndWait({
        urls: [url],
        prompt:
          'Extract all job listings from the search results. For each job include: company name, job title, job URL (linkedin.com link).',
        schema: JOB_SCHEMA,
        sessionOptions: SESSION_OPTIONS,
      });
      const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
      const data = result?.data ?? result;
      const filtered = extractAndFilter(data, 'linkedin', log);
      records.push(...filtered);
      log.info({ url, count: filtered.length, elapsed: `${elapsed}s` }, '[LinkedIn SDK] Extract done');
      await sleep(2000);
    } catch (err) {
      const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
      log.warn(
        {
          url,
          elapsed: `${elapsed}s`,
          errMessage: err?.message,
          errCode: err?.code,
          errStack: err?.stack?.split('\n').slice(0, 3).join(' | '),
        },
        '[LinkedIn SDK] Extract failed'
      );
    }
  }

  return records;
}
