import { extractDomainFromUrl, companyNameToDomain } from '../../src/utils.js';

/**
 * Normalize practice name for dedupe
 */
export function normalizeName(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Resolve domain from job source URL and company name
 */
export function resolveDomainFromJob(sourceUrl, companyName) {
  const fromJob = extractDomainFromUrl(sourceUrl);
  if (fromJob && !['indeed.com', 'linkedin.com', 'dentalpost.net', 'ziprecruiter.com', 'glassdoor.com'].includes(fromJob)) {
    return fromJob;
  }
  return companyNameToDomain(companyName);
}
