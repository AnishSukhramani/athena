/** PRD §7.5 scoring weights */
export const SIGNAL_WEIGHTS = {
  job_frontdesk: 50,
  phone_friction: 30,
  new_practice: 25,
  low_automation: 20,
};

export const MAX_OPPORTUNITIES_PER_DAY = Number(process.env.OPPORTUNITY_DAILY_CAP || 50);
export const MIN_OPPORTUNITIES_PER_DAY = Number(process.env.OPPORTUNITY_DAILY_FLOOR || 20);

export const USER_AGENT = 'OpportunityBrain/1.0 (research; +https://example.com/bot)';
