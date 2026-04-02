/** PRD §7.5 scoring weights + Athena v1.2 */
export const SIGNAL_WEIGHTS = {
  job_frontdesk: 50,
  chronic_turnover: 40,
  phone_friction: 30,
  competitor_xray_engagement: 35,
  new_practice: 25,
  legacy_tech_stack: 20,
  low_automation: 20,
};

/** Rolling window (months) for chronic turnover job-post velocity */
export const CHRONIC_TURNOVER_WINDOW_MONTHS = 6;
/** Min distinct job URLs in window to emit chronic_turnover */
export const CHRONIC_TURNOVER_MIN_POSTINGS = 2;
/** Suppress duplicate chronic_turnover signals within this many hours */
export const CHRONIC_TURNOVER_SIGNAL_COOLDOWN_HOURS = 48;

export const MAX_OPPORTUNITIES_PER_DAY = Number(process.env.OPPORTUNITY_DAILY_CAP || 50);
export const MIN_OPPORTUNITIES_PER_DAY = Number(process.env.OPPORTUNITY_DAILY_FLOOR || 20);

export const USER_AGENT = 'OpportunityBrain/1.0 (research; +https://example.com/bot)';
