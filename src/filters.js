/**
 * Keyword filtering for job listings
 * Retains jobs matching dental/medical front desk intent
 */

import { JOB_TITLE_KEYWORDS, INDUSTRY_KEYWORDS, EXCLUDE_KEYWORDS } from './config.js';

/**
 * Check if job matches our target (dental/medical front desk)
 */
export function matchesTarget(job) {
  const title = (job.jobTitle || job.title || '').toLowerCase();
  const desc = (job.rawDescription || job.description || '').toLowerCase();
  const company = (job.companyName || job.company || '').toLowerCase();
  const combined = `${title} ${desc} ${company}`;

  const hasJobKeyword = JOB_TITLE_KEYWORDS.some((kw) => title.includes(kw) || desc.includes(kw));
  const hasIndustryKeyword = INDUSTRY_KEYWORDS.some((kw) => combined.includes(kw));
  const hasExclusion = EXCLUDE_KEYWORDS.some((kw) => title.includes(kw));

  return hasJobKeyword && (hasIndustryKeyword || title.includes('receptionist') || title.includes('front desk')) && !hasExclusion;
}

/**
 * Filter jobs by target criteria
 */
export function filterJobs(jobs) {
  return jobs.filter((j) => matchesTarget(j));
}
