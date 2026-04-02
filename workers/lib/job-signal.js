/**
 * Job Signal Engine — DentalPost HTML + career-site JobPosting JSON-LD.
 * No LLM for scraping; LLM only in classify.js for labels.
 */
import * as cheerio from 'cheerio';
import { supabase } from '@jobportalscout/db';
import { DENTALPOST_URLS } from '../../src/config.js';
import { classifyJobFrontDesk } from './classify.js';
import { resolveDomainFromJob } from './practice-helpers.js';
import { ensurePractice } from './practice-db.js';
import { uploadEvidenceBlob } from './evidence-storage.js';
import {
  USER_AGENT,
  CHRONIC_TURNOVER_WINDOW_MONTHS,
  CHRONIC_TURNOVER_MIN_POSTINGS,
  CHRONIC_TURNOVER_SIGNAL_COOLDOWN_HOURS,
} from './constants.js';

function normalizeJobTitleNorm(t) {
  return String(t || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 500);
}

/**
 * Deduped job URL history + optional chronic_turnover signal (Athena v1.2).
 */
async function recordJobHistoryAndMaybeChurn(log, practice, record, source) {
  const jobUrl = record.sourceUrl || '';
  if (!jobUrl) return;

  const job_title_norm = normalizeJobTitleNorm(record.jobTitle);
  const row = {
    practice_id: practice.id,
    job_title: (record.jobTitle || '').slice(0, 2000),
    job_title_norm,
    source,
    job_url: jobUrl.slice(0, 8000),
    date_posted: new Date().toISOString(),
  };

  const { error: insErr } = await supabase.from('job_post_history_athena').insert(row);
  if (insErr) {
    if (insErr.code === '23505') return;
    log.warn({ err: insErr.message, practiceId: practice.id }, 'job_post_history insert failed');
    return;
  }

  const since = new Date();
  since.setMonth(since.getMonth() - CHRONIC_TURNOVER_WINDOW_MONTHS);

  const { count, error: cErr } = await supabase
    .from('job_post_history_athena')
    .select('*', { count: 'exact', head: true })
    .eq('practice_id', practice.id)
    .gte('date_posted', since.toISOString());

  if (cErr) {
    log.warn({ err: cErr.message }, 'job_post_history count failed');
    return;
  }

  if ((count || 0) < CHRONIC_TURNOVER_MIN_POSTINGS) return;

  const cooldownIso = new Date(
    Date.now() - CHRONIC_TURNOVER_SIGNAL_COOLDOWN_HOURS * 3600 * 1000,
  ).toISOString();
  const { data: recentChurn } = await supabase
    .from('signals_athena')
    .select('id')
    .eq('practice_id', practice.id)
    .eq('type', 'chronic_turnover')
    .gte('timestamp', cooldownIso)
    .limit(1)
    .maybeSingle();

  if (recentChurn) return;

  await supabase.from('signals_athena').insert({
    type: 'chronic_turnover',
    practice_id: practice.id,
    strength: 'HIGH',
    metadata: {
      posting_count: count,
      window_months: CHRONIC_TURNOVER_WINDOW_MONTHS,
      job_title_norm,
      source,
    },
  });
}

async function fetchHtml(url, { timeoutMs = 25000 } = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  const t0 = Date.now();
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'text/html,application/xhtml+xml',
      },
    });
    const text = await res.text();
    const ms = Date.now() - t0;
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return {
      text,
      status: res.status,
      ms,
      byteLength: Buffer.byteLength(text, 'utf8'),
    };
  } finally {
    clearTimeout(t);
  }
}

async function fetchText(url, opts) {
  const { text } = await fetchHtml(url, opts);
  return text;
}

/** DentalPost list pages use /job-post/{id}/slug/ (current). Older pages used /job/... */
function isDentalPostJobListingHref(href) {
  if (!href || href.startsWith('#')) return false;
  return href.includes('/job-post/') || href.includes('/job/');
}

export function extractDentalPostJobLinks(html, baseOrigin = 'https://www.dentalpost.net') {
  const $ = cheerio.load(html);
  const seen = new Set();
  const out = [];
  $('a[href*="/job-post/"], a[href*="/job/"]').each((_, el) => {
    let href = $(el).attr('href');
    if (!href) return;
    if (href.startsWith('/')) href = baseOrigin + href;
    if (!isDentalPostJobListingHref(href)) return;
    if (seen.has(href)) return;
    seen.add(href);
    const title = $(el).text().trim() || $(el).attr('title') || '';
    out.push({ url: href, anchorTitle: title });
  });
  return out;
}

export function parseJobDetailHtml(html, pageUrl) {
  const $ = cheerio.load(html);
  const title =
    $('meta[property="og:title"]').attr('content') ||
    $('h1').first().text().trim() ||
    $('title').text().trim();
  let company = $('[class*="company"], [class*="employer"], .company-name').first().text().trim();
  if (!company) {
    company = $('a[href*="/employer/"]').first().text().trim();
  }
  const desc =
    $('meta[name="description"]').attr('content') ||
    $('[class*="description"], article, .job-description').first().text().trim() ||
    '';
  return {
    jobTitle: title || '',
    companyName: company || '',
    description: desc.slice(0, 15000),
    sourceUrl: pageUrl,
  };
}

export function extractJobPostingJsonLd(html) {
  const $ = cheerio.load(html);
  const jobs = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    let json;
    try {
      json = JSON.parse($(el).contents().text());
    } catch {
      return;
    }
    const nodes = Array.isArray(json) ? json : [json];
    for (const node of nodes) {
      if (!node) continue;
      if (node['@graph']) {
        for (const g of node['@graph']) {
          if (g['@type'] === 'JobPosting' || (Array.isArray(g['@type']) && g['@type'].includes('JobPosting'))) {
            jobs.push(g);
          }
        }
      }
      if (node['@type'] === 'JobPosting' || (Array.isArray(node['@type']) && node['@type'].includes('JobPosting'))) {
        jobs.push(node);
      }
    }
  });
  return jobs;
}

function jobPostingToRecord(job, pageUrl) {
  const title = job.title || '';
  const desc = typeof job.description === 'string' ? job.description : job.description?.text || '';
  let companyName = '';
  if (job.hiringOrganization) {
    companyName = typeof job.hiringOrganization === 'string' ? job.hiringOrganization : job.hiringOrganization.name || '';
  }
  return {
    jobTitle: title,
    companyName,
    description: String(desc).replace(/<[^>]+>/g, ' ').slice(0, 15000),
    sourceUrl: job.url || pageUrl,
  };
}

export async function runDentalPostJobs(log) {
  const urls = process.env.DENTALPOST_URLS
    ? process.env.DENTALPOST_URLS.split(',').map((s) => s.trim())
    : DENTALPOST_URLS;

  log.info(
    { listUrlCount: urls.length, source: process.env.DENTALPOST_URLS ? 'env:DENTALPOST_URLS' : 'src/config' },
    'DentalPost job run starting',
  );

  let created = 0;
  for (const listUrl of urls) {
    let html;
    let meta = null;
    try {
      const fetched = await fetchHtml(listUrl);
      html = fetched.text;
      meta = { status: fetched.status, ms: fetched.ms, byteLength: fetched.byteLength };
    } catch (err) {
      log.warn({ listUrl, err: err.message }, 'DentalPost list fetch failed');
      continue;
    }
    const links = extractDentalPostJobLinks(html).slice(0, 40);
    const rawJobPostPathMatches = (html.match(/\/job-post\//g) || []).length;
    const rawLegacyJobPathMatches = (html.match(/\/job\//g) || []).length;
    const titleSnippet =
      html.match(/<title[^>]*>([^<]{0,160})/i)?.[1]?.replace(/\s+/g, ' ')?.trim() ?? null;

    log.info(
      {
        listUrl,
        anchorLinksParsed: links.length,
        ...meta,
        rawJobPostPathOccurrencesInHtml: rawJobPostPathMatches,
        rawLegacyJobPathOccurrencesInHtml: rawLegacyJobPathMatches,
        titleSnippet,
      },
      'DentalPost list page fetched',
    );

    if (links.length === 0 && (rawJobPostPathMatches > 0 || rawLegacyJobPathMatches > 0)) {
      log.warn(
        {
          listUrl,
          rawJobPostPathOccurrencesInHtml: rawJobPostPathMatches,
          rawLegacyJobPathOccurrencesInHtml: rawLegacyJobPathMatches,
        },
        'DentalPost: job listing paths in HTML but no usable anchor links — page structure may have changed',
      );
    }

    let skippedNotFrontDesk = 0;
    let detailErrors = 0;
    const createdBeforeList = created;

    for (const { url: jobUrl } of links) {
      try {
        const detailHtml = await fetchText(jobUrl);
        let record = parseJobDetailHtml(detailHtml, jobUrl);
        const ldJobs = extractJobPostingJsonLd(detailHtml);
        if (ldJobs.length > 0) {
          record = { ...jobPostingToRecord(ldJobs[0], jobUrl), sourceUrl: jobUrl };
        }

        const classification = await classifyJobFrontDesk({
          jobTitle: record.jobTitle,
          description: record.description,
          companyName: record.companyName,
          log,
        });

        if (!classification.frontDesk) {
          skippedNotFrontDesk += 1;
          log.debug(
            { jobUrl, jobTitle: record.jobTitle?.slice?.(0, 120) },
            'DentalPost job skipped (not front desk)',
          );
          continue;
        }

        const name = record.companyName || record.jobTitle || 'Unknown practice';
        const domain = resolveDomainFromJob(jobUrl, name);
        const practice = await ensurePractice({ name, domain: domain || null });

        await recordJobHistoryAndMaybeChurn(log, practice, record, 'dentalpost');

        let storageKey = null;
        if (process.env.S3_BUCKET) {
          const up = await uploadEvidenceBlob(detailHtml, { contentType: 'text/html' });
          storageKey = up?.key ?? null;
        }

        await supabase.from('signals_athena').insert({
          type: 'job_frontdesk',
          practice_id: practice.id,
          strength: 'HIGH',
          metadata: {
            job_title: record.jobTitle,
            job_url: jobUrl,
            keywords_detected: classification.keywords,
            classification_source: classification.source,
            company: record.companyName,
            evidence_html_key: storageKey,
          },
        });
        created += 1;
      } catch (err) {
        detailErrors += 1;
        log.warn({ jobUrl, err: err.message }, 'DentalPost job detail failed');
      }
    }

    log.info(
      {
        listUrl,
        jobLinksOnPage: links.length,
        signalsInsertedThisList: created - createdBeforeList,
        skippedNotFrontDesk,
        detailErrors,
      },
      'DentalPost list URL done',
    );
  }
  log.info({ signalsCreated: created }, 'DentalPost job signals done');
  return created;
}

export async function runCareerJsonLdJobs(log) {
  const seeds = (process.env.CAREER_DOMAIN_SEEDS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  log.info({ seedCount: seeds.length }, 'Career JSON-LD run starting');
  let created = 0;
  let skippedNotFrontDesk = 0;
  for (const pageUrl of seeds) {
    try {
      const { text: html, status, ms, byteLength } = await fetchHtml(pageUrl);
      const ldJobs = extractJobPostingJsonLd(html);
      log.info(
        { pageUrl, httpStatus: status, responseMs: ms, htmlBytes: byteLength, jobPostingNodes: ldJobs.length },
        'Career page fetched',
      );
      for (const job of ldJobs) {
        const record = jobPostingToRecord(job, pageUrl);
        const classification = await classifyJobFrontDesk({
          jobTitle: record.jobTitle,
          description: record.description,
          companyName: record.companyName,
          log,
        });
        if (!classification.frontDesk) {
          skippedNotFrontDesk += 1;
          log.debug(
            { pageUrl, jobTitle: record.jobTitle?.slice?.(0, 120) },
            'Career JSON-LD job skipped (not front desk)',
          );
          continue;
        }

        const name = record.companyName || 'Career page job';
        const domain = resolveDomainFromJob(record.sourceUrl, name);
        const practice = await ensurePractice({ name, domain: domain || null });

        await recordJobHistoryAndMaybeChurn(log, practice, record, 'json_ld');

        await supabase.from('signals_athena').insert({
          type: 'job_frontdesk',
          practice_id: practice.id,
          strength: 'HIGH',
          metadata: {
            job_title: record.jobTitle,
            job_url: record.sourceUrl,
            keywords_detected: classification.keywords,
            classification_source: classification.source,
            source: 'json_ld',
          },
        });
        created += 1;
      }
    } catch (err) {
      log.warn({ pageUrl, err: err.message }, 'Career JSON-LD fetch failed');
    }
  }
  log.info({ signalsCreated: created, skippedNotFrontDesk }, 'Career JSON-LD job signals done');
  return created;
}

export async function runJobSignalFragment(log) {
  const a = await runDentalPostJobs(log);
  const b = await runCareerJsonLdJobs(log);
  log.info({ dentalPostSignals: a, careerJsonLdSignals: b, total: a + b }, 'Job signal fragment summary');
  return a + b;
}
