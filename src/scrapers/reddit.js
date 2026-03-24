/**
 * Reddit scraper - fetches hiring posts from dental/medical subreddits
 * Uses Reddit's public JSON API (no auth required)
 */

import { filterJobs } from '../filters.js';
import { sleep } from '../utils.js';

const REDDIT_BASE = 'https://www.reddit.com';
const SUBREDDITS = ['Dentistry', 'MedicalAssistant', 'dentalassistant', 'dentalhygiene'];
const SEARCH_TERMS = ['hiring', 'looking for', 'front desk', 'receptionist', 'job opening'];

async function fetchSubredditSearch(subreddit, query, log) {
  const url = `${REDDIT_BASE}/r/${subreddit}/search.json?q=${encodeURIComponent(query)}&restrict_sr=on&sort=new&limit=15&type=link`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'JobPortalScout/1.0 (lead generation)' },
  });
  if (!res.ok) throw new Error(`Reddit ${res.status}`);
  const json = await res.json();
  return json.data?.children ?? [];
}

/**
 * Extract company/practice name from post (heuristic)
 */
function extractCompany(title, selftext) {
  const text = `${title} ${selftext}`;
  const match = text.match(/(?:at|@|from)\s+([A-Za-z\s]+(?:Dental|Dentistry|Medical|Clinic|Practice))/i);
  if (match) return match[1].trim();
  const locationMatch = text.match(/([A-Za-z\s]+(?:Dental|Dentistry|Medical|Clinic|Practice)[^.!?]*)/i);
  if (locationMatch) return locationMatch[1].trim();
  return '';
}

/**
 * Scrape Reddit for dental/medical front desk hiring posts
 */
export async function scrapeReddit(log) {
  const records = [];
  const seen = new Set();

  for (const sub of SUBREDDITS) {
    for (const term of SEARCH_TERMS.slice(0, 2)) {
      try {
        const children = await fetchSubredditSearch(sub, term, log);
        for (const c of children) {
          const d = c.data;
          const id = d.id;
          if (seen.has(id)) continue;
          seen.add(id);

          const companyName = extractCompany(d.title, d.selftext || '') || `${sub} - See post`;
          const record = {
            companyName,
            jobTitle: d.title || 'Hiring - see post',
            sourceUrl: `${REDDIT_BASE}${d.permalink}`,
            postedDate: d.created_utc ? new Date(d.created_utc * 1000).toISOString() : '',
            rawDescription: `${d.title}\n\n${d.selftext || ''}`,
            source: 'reddit',
          };
          if (record.companyName && record.jobTitle) records.push(record);
        }
        await sleep(2000);
      } catch (err) {
        log.warn({ err, sub, term }, 'Reddit fetch failed');
      }
    }
  }

  const filtered = filterJobs(records);
  log.info({ count: filtered.length }, 'Reddit scrape done');
  return filtered;
}
