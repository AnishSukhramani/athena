/**
 * Lead enrichment via Hunter.io API
 * Domain search / company search to find email and contact info
 */

import { extractDomainFromUrl, companyNameToDomain, sleep } from './utils.js';

const HUNTER_BASE = 'https://api.hunter.io/v2';

/**
 * Call Hunter domain-search or company search
 */
async function hunterDomainSearch(domainOrCompany, apiKey, isCompany = false) {
  const params = new URLSearchParams({
    api_key: apiKey,
    ...(isCompany ? { company: domainOrCompany } : { domain: domainOrCompany }),
    limit: '5',
  });
  const url = `${HUNTER_BASE}/domain-search?${params}`;
  const res = await fetch(url);
  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors.map((e) => e.details).join('; '));
  }
  return json.data;
}

/**
 * Resolve domain for a job record
 * Priority: companyWebsite URL -> company URL domain -> heuristic from company name
 */
function resolveDomain(record) {
  if (record.companyWebsite) {
    const d = extractDomainFromUrl(record.companyWebsite);
    if (d && !['indeed.com', 'linkedin.com', 'dentalpost.net', 'ziprecruiter.com'].includes(d)) {
      return d;
    }
  }
  if (record.companyUrl) {
    const d = extractDomainFromUrl(record.companyUrl);
    if (d && !['indeed.com', 'linkedin.com'].includes(d)) {
      return d;
    }
  }
  return companyNameToDomain(record.companyName);
}

/**
 * Pick best email from Hunter response - prefer receptionist/hr/front office
 */
function pickBestEmail(emails) {
  if (!emails || emails.length === 0) return null;
  const priority = ['receptionist', 'front office', 'office manager', 'hr', 'human resources', 'admin', 'contact'];
  for (const kw of priority) {
    const match = emails.find((e) => {
      const pos = (e.position_raw || e.position || '').toLowerCase();
      const val = (e.value || '').toLowerCase();
      return pos.includes(kw) || val.includes(kw);
    });
    if (match) return match;
  }
  const personal = emails.find((e) => e.type === 'personal' && (e.confidence || 0) >= 70);
  if (personal) return personal;
  const generic = emails.find((e) => e.type === 'generic');
  return generic || emails[0];
}

/**
 * Enrich a single job record with email/phone/contact info
 */
export async function enrichRecord(record, apiKey, log) {
  if (record.scrapedEmail) {
    return {
      ...record,
      email: record.scrapedEmail,
      phone: record.phone ?? '',
      linkedIn: record.linkedIn ?? '',
      facebook: record.facebook ?? '',
    };
  }

  const domain = resolveDomain(record);
  if (!domain) {
    log.debug({ company: record.companyName }, 'No domain for enrichment');
    return { ...record, email: '', phone: '', linkedIn: '', facebook: '' };
  }

  try {
    const isCompany = !domain.includes('.');
    const data = await hunterDomainSearch(domain, apiKey, isCompany);
    const emails = data?.emails ?? [];
    const best = pickBestEmail(emails);

    return {
      ...record,
      email: best?.value ?? '',
      phone: best?.phone_number ?? '',
      linkedIn: best?.linkedin ?? '',
      facebook: '',
    };
  } catch (err) {
    log.warn({ err, company: record.companyName, domain }, 'Hunter enrichment failed');
    return { ...record, email: '', phone: '', linkedIn: '', facebook: '' };
  }
}

/**
 * Enrich a batch of records, with rate limiting
 */
export async function enrichBatch(records, apiKey, log) {
  const results = [];
  const seen = new Set();
  for (const r of records) {
    const key = (r.companyName || '').toLowerCase().trim();
    if (seen.has(key)) {
      results.push({ ...r, email: '', phone: '', linkedIn: '', facebook: '' });
      continue;
    }
    seen.add(key);
    const enriched = await enrichRecord(r, apiKey, log);
    results.push(enriched);
    await sleep(500);
  }
  return results;
}
