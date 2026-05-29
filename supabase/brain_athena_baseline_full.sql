-- =============================================================================
-- Opportunity Brain — FULL BASELINE (greenfield / empty database)
-- =============================================================================
--
-- What this file is:
--   One-shot DDL for a **new** Supabase project: all `_athena` brain tables,
--   enums, indexes, and triggers in dependency order.
--
-- What this file is NOT:
--   Do not re-run on production that already has these objects; use
--   `supabase/migrations/` incremental files instead (see supabase/README.md).
--
-- Naming:
--   Table suffix `_athena` isolates this schema from other apps in the same DB.
--
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------

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

-- ---------------------------------------------------------------------------
-- Practices
-- ---------------------------------------------------------------------------

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

-- ---------------------------------------------------------------------------
-- Signals (per practice; feed classifier + scoring)
-- ---------------------------------------------------------------------------

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

-- ---------------------------------------------------------------------------
-- Opportunities (ranked lead rows)
--
-- Classification (recommender + HITL):
--   recommended_*  — classifier output; null recommended_at = never run
--   accepted_*     — operator commit; null accepted_at = not committed yet
--   Both axes independent (actionable and/or content).
-- ---------------------------------------------------------------------------

create table opportunities_athena (
  id uuid primary key default gen_random_uuid(),
  practice_id uuid not null references practices_athena (id) on delete cascade,
  score integer not null,
  summary text,
  recommended_actionable boolean,
  recommended_content boolean,
  recommendation_confidence real,
  recommendation_reason text,
  classifier_version text,
  recommended_at timestamptz,
  accepted_actionable boolean,
  accepted_content boolean,
  accepted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_opportunities_athena_score on opportunities_athena (score desc);
create index idx_opportunities_athena_practice on opportunities_athena (practice_id);
create index idx_opportunities_athena_created on opportunities_athena (created_at);
create index idx_opportunities_athena_recommended_at on opportunities_athena (recommended_at desc);
create index idx_opportunities_athena_accepted_at on opportunities_athena (accepted_at desc);
create index idx_opportunities_athena_accepted_flags on opportunities_athena (accepted_actionable, accepted_content)
  where accepted_at is not null;

comment on column opportunities_athena.recommended_at is 'Null until classifier has run at least once for this row.';
comment on column opportunities_athena.accepted_at is 'Null until operator has committed accepted_actionable/content.';

-- ---------------------------------------------------------------------------
-- Evidence (ties to opportunity)
-- ---------------------------------------------------------------------------

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

-- ---------------------------------------------------------------------------
-- Validations (human relevance / duplicate)
-- ---------------------------------------------------------------------------

create table opportunity_validations_athena (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references opportunities_athena (id) on delete cascade,
  status validation_status_athena not null,
  note text,
  created_at timestamptz not null default now()
);

create index idx_validations_athena_opportunity on opportunity_validations_athena (opportunity_id);

-- ---------------------------------------------------------------------------
-- Scoring runs (audit)
-- ---------------------------------------------------------------------------

create table scoring_runs_athena (
  id uuid primary key default gen_random_uuid(),
  run_at timestamptz not null default now(),
  created integer not null default 0,
  capped integer not null default 0,
  message text
);

-- ---------------------------------------------------------------------------
-- NPI snapshots (NPPES diffing)
-- ---------------------------------------------------------------------------

create table npi_snapshots_athena (
  npi text primary key,
  address_hash text not null,
  practice_name text,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Job posting history (churn / turnover velocity)
-- ---------------------------------------------------------------------------

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

-- ---------------------------------------------------------------------------
-- Competitor Meta Ad Library snapshots
-- ---------------------------------------------------------------------------

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

-- ---------------------------------------------------------------------------
-- LinkedIn x-ray leads (optional link to practice)
-- ---------------------------------------------------------------------------

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

-- ---------------------------------------------------------------------------
-- Triggers: updated_at
-- ---------------------------------------------------------------------------

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
