-- Opportunity Brain v1 — run this in Supabase SQL Editor (or via psql).
-- All names suffixed with _athena to isolate from other apps in this project.

-- Enums
create type signal_type_athena as enum (
  'job_frontdesk',
  'phone_friction',
  'new_practice',
  'low_automation',
  'chronic_turnover',
  'legacy_tech_stack',
  'competitor_xray_engagement'
);
create type evidence_type_athena as enum ('url', 'snippet', 'html');
create type validation_status_athena as enum ('valid', 'not_relevant', 'duplicate');

-- Practices
create table practices_athena (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  domain text unique,
  phone text,
  locations jsonb default '[]',
  npi_ids text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_practices_athena_domain on practices_athena (domain);
create index idx_practices_athena_phone on practices_athena (phone);

-- Signals
create table signals_athena (
  id uuid primary key default gen_random_uuid(),
  type signal_type_athena not null,
  practice_id uuid not null references practices_athena (id) on delete cascade,
  timestamp timestamptz not null default now(),
  metadata jsonb not null default '{}',
  strength text
);
create index idx_signals_athena_practice on signals_athena (practice_id);
create index idx_signals_athena_type on signals_athena (type);
create index idx_signals_athena_timestamp on signals_athena (timestamp);

-- Opportunities
create table opportunities_athena (
  id uuid primary key default gen_random_uuid(),
  practice_id uuid not null references practices_athena (id) on delete cascade,
  score integer not null,
  summary text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_opportunities_athena_score on opportunities_athena (score desc);
create index idx_opportunities_athena_practice on opportunities_athena (practice_id);
create index idx_opportunities_athena_created on opportunities_athena (created_at);

-- Evidence
create table evidence_athena (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references opportunities_athena (id) on delete cascade,
  type evidence_type_athena not null,
  content text not null,
  source_url text,
  storage_key text,
  created_at timestamptz not null default now()
);
create index idx_evidence_athena_opportunity on evidence_athena (opportunity_id);

-- Validations
create table opportunity_validations_athena (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references opportunities_athena (id) on delete cascade,
  status validation_status_athena not null,
  note text,
  created_at timestamptz not null default now()
);
create index idx_validations_athena_opportunity on opportunity_validations_athena (opportunity_id);

-- Scoring runs (audit)
create table scoring_runs_athena (
  id uuid primary key default gen_random_uuid(),
  run_at timestamptz not null default now(),
  created integer not null default 0,
  capped integer not null default 0,
  message text
);

-- NPI snapshots (NPPES diffing)
create table npi_snapshots_athena (
  npi text primary key,
  address_hash text not null,
  practice_name text,
  updated_at timestamptz not null default now()
);

-- Job posting history (churn / chronic turnover velocity)
create table job_post_history_athena (
  id uuid primary key default gen_random_uuid(),
  practice_id uuid not null references practices_athena (id) on delete cascade,
  job_title text not null default '',
  job_title_norm text not null default '',
  source text not null,
  job_url text not null,
  date_posted timestamptz not null default now(),
  unique (practice_id, job_url)
);
create index idx_job_post_history_practice on job_post_history_athena (practice_id);
create index idx_job_post_history_window on job_post_history_athena (practice_id, date_posted desc);

-- Competitor Meta Ad Library snapshots (not tied to a practice)
create table competitor_ads_athena (
  id uuid primary key default gen_random_uuid(),
  competitor_key text not null,
  page_url text not null,
  ad_library_url text,
  ad_body text,
  metadata jsonb not null default '{}',
  scraped_at timestamptz not null default now()
);
create index idx_competitor_ads_key on competitor_ads_athena (competitor_key);
create index idx_competitor_ads_scraped on competitor_ads_athena (scraped_at desc);

-- LinkedIn x-ray leads (optional match to practices_athena)
create table xray_leads_athena (
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
create index idx_xray_leads_practice on xray_leads_athena (matched_practice_id);
create index idx_xray_leads_created on xray_leads_athena (created_at desc);

-- Auto-update updated_at
create or replace function update_updated_at_athena()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger practices_athena_updated_at before update on practices_athena
  for each row execute function update_updated_at_athena();

create trigger opportunities_athena_updated_at before update on opportunities_athena
  for each row execute function update_updated_at_athena();
