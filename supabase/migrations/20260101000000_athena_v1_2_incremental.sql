-- =============================================================================
-- Migration 00 — Athena v1.2 (incremental on pre-v1.2 brain installs)
-- =============================================================================
--
-- When to run:
--   Existing projects created before job history / competitor ads / x-ray leads
--   and before extra signal_type enum values.
--
-- When to skip:
--   Greenfield installs that ran `brain_athena_baseline_full.sql` already
--   include these objects.
--
-- Order: must run before social publisher and classification migrations if
--        you are applying the full chain to an old database.
-- =============================================================================

alter type signal_type_athena add value if not exists 'chronic_turnover';
alter type signal_type_athena add value if not exists 'legacy_tech_stack';
alter type signal_type_athena add value if not exists 'competitor_xray_engagement';

create table if not exists job_post_history_athena (
  id uuid primary key default gen_random_uuid(),
  practice_id uuid not null references practices_athena (id) on delete cascade,
  job_title text not null default '',
  job_title_norm text not null default '',
  source text not null,
  job_url text not null,
  date_posted timestamptz not null default now(),
  unique (practice_id, job_url)
);

create index if not exists idx_job_post_history_practice on job_post_history_athena (practice_id);
create index if not exists idx_job_post_history_window on job_post_history_athena (practice_id, date_posted desc);

create table if not exists competitor_ads_athena (
  id uuid primary key default gen_random_uuid(),
  competitor_key text not null,
  page_url text not null,
  ad_library_url text,
  ad_body text,
  metadata jsonb not null default '{}',
  scraped_at timestamptz not null default now()
);

create index if not exists idx_competitor_ads_key on competitor_ads_athena (competitor_key);
create index if not exists idx_competitor_ads_scraped on competitor_ads_athena (scraped_at desc);

create table if not exists xray_leads_athena (
  id uuid primary key default gen_random_uuid(),
  linkedin_profile_url text not null,
  full_name text,
  headline text,
  source_post_url text not null,
  matched_practice_id uuid references practices_athena (id) on delete set null,
  enrichment jsonb not null default '{}',
  created_at timestamptz not null default now(),
  unique (linkedin_profile_url, source_post_url)
);

create index if not exists idx_xray_leads_practice on xray_leads_athena (matched_practice_id);
create index if not exists idx_xray_leads_created on xray_leads_athena (created_at desc);
