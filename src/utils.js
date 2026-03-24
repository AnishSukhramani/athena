/**
 * Utilities: deduplication, domain extraction, helpers
 */

import crypto from 'crypto';

/**
 * Create a deduplication key from job record
 */
export function dedupKey(record) {
  const company = normalizeString(record.companyName);
  const title = normalizeString(record.jobTitle);
  const source = record.source || 'unknown';
  const raw = `${company}|${title}|${source}`;
  return crypto.createHash('sha256').update(raw).digest('hex');
}

/**
 * Normalize string for comparison
 */
function normalizeString(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extract domain from URL
 * @param {string} url - Any URL (job link, company page, etc.)
 * @returns {string|null} - Root domain or null
 */
export function extractDomainFromUrl(url) {
  if (!url || typeof url !== 'string') return null;
  try {
    const u = new URL(url);
    const host = u.hostname;
    if (host.startsWith('www.')) return host.slice(4);
    return host;
  } catch {
    return null;
  }
}

/**
 * Convert company name to likely domain (heuristic)
 * e.g. "Sage Dental of Neptune Beach" -> "sagedental.com"
 */
export function companyNameToDomain(companyName) {
  if (!companyName || typeof companyName !== 'string') return null;
  const cleaned = companyName
    .toLowerCase()
    .replace(/\s+(of|and|&|the)\s+/gi, ' ')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '')
    .slice(0, 50);
  if (!cleaned) return null;
  return `${cleaned}.com`;
}

/**
 * Sleep for ms milliseconds
 */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
