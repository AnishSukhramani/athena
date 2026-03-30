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
import { USER_AGENT } from './constants.js';

async function fetchText(url, { timeoutMs = 25000 } = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'text/html,application/xhtml+xml',
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(t);
  }
}

export function extractDentalPostJobLinks(html, baseOrigin = 'https://www.dentalpost.net') {
  const $ = cheerio.load(html);
  const seen = new Set();
  const out = [];
  $('a[href*="/job/"]').each((_, el) => {
    let href = $(el).attr('href');
    if (!href) return;
    if (href.startsWith('/')) href = baseOrigin + href;
    if (!href.includes('/job/')) return;
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

  let created = 0;
  for (const listUrl of urls) {
    let html;
    try {
      html = await fetchText(listUrl);
    } catch (err) {
      log.warn({ listUrl, err: err.message }, 'DentalPost list fetch failed');
      continue;
    }
    const links = extractDentalPostJobLinks(html).slice(0, 40);
    log.info({ listUrl, links: links.length }, 'DentalPost links parsed');

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

        if (!classification.frontDesk) continue;

        const name = record.companyName || record.jobTitle || 'Unknown practice';
        const domain = resolveDomainFromJob(jobUrl, name);
        const practice = await ensurePractice({ name, domain: domain || null });

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
        log.warn({ jobUrl, err: err.message }, 'DentalPost job detail failed');
      }
    }
  }
  log.info({ signalsCreated: created }, 'DentalPost job signals done');
  return created;
}

export async function runCareerJsonLdJobs(log) {
  const seeds = (process.env.CAREER_DOMAIN_SEEDS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  let created = 0;
  for (const pageUrl of seeds) {
    try {
      const html = await fetchText(pageUrl);
      const ldJobs = extractJobPostingJsonLd(html);
      for (const job of ldJobs) {
        const record = jobPostingToRecord(job, pageUrl);
        const classification = await classifyJobFrontDesk({
          jobTitle: record.jobTitle,
          description: record.description,
          companyName: record.companyName,
          log,
        });
        if (!classification.frontDesk) continue;

        const name = record.companyName || 'Career page job';
        const domain = resolveDomainFromJob(record.sourceUrl, name);
        const practice = await ensurePractice({ name, domain: domain || null });

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
  log.info({ signalsCreated: created }, 'Career JSON-LD job signals done');
  return created;
}

export async function runJobSignalFragment(log) {
  const a = await runDentalPostJobs(log);
  const b = await runCareerJsonLdJobs(log);
  return a + b;
}
