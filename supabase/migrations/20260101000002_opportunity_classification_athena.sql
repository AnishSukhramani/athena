-- =============================================================================
-- Migration 02 — Opportunity classification (recommender + human-in-the-loop)
-- =============================================================================
--
-- Adds recommendation vs accepted boolean pairs on opportunities_athena.
-- Safe to re-run: uses IF NOT EXISTS for columns and indexes.
--
-- Depends on: opportunities_athena (brain core baseline or earlier migrations).
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Columns (recommended block, then acceptance block)
-- ---------------------------------------------------------------------------

alter table opportunities_athena
  add column if not exists recommended_actionable boolean,
  add column if not exists recommended_content boolean,
  add column if not exists recommendation_confidence real,
  add column if not exists recommendation_reason text,
  add column if not exists classifier_version text,
  add column if not exists recommended_at timestamptz,
  add column if not exists accepted_actionable boolean,
  add column if not exists accepted_content boolean,
  add column if not exists accepted_at timestamptz;

comment on column opportunities_athena.recommended_at is 'Null until classifier has run at least once for this row.';
comment on column opportunities_athena.accepted_at is 'Null until operator has committed accepted_actionable/content.';

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------

create index if not exists idx_opportunities_athena_recommended_at on opportunities_athena (recommended_at desc);
create index if not exists idx_opportunities_athena_accepted_at on opportunities_athena (accepted_at desc);
create index if not exists idx_opportunities_athena_accepted_flags on opportunities_athena (accepted_actionable, accepted_content)
  where accepted_at is not null;
