-- =============================================================================
-- Migration 03 — Voice AI Scout (competitor intelligence for voice AI in healthcare)
-- =============================================================================
--
-- Creates two tables:
--   voice_ai_competitors_athena  — company profiles tracked by the fragment
--   voice_ai_ad_snapshots_athena — deduplicated ad snapshots per competitor
--
-- Run after the baseline + prior migrations.
-- Fragment command: pnpm run worker -- voice_ai_scout
-- Scheduled: Weekly (Mondays ~02:00 UTC — see docs/CRON.md)
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Competitor profiles
-- ---------------------------------------------------------------------------

create table if not exists voice_ai_competitors_athena (
  id               uuid        primary key default gen_random_uuid(),
  key              text        not null unique,           -- slug e.g. "hyro", "synthflow"
  name             text        not null,
  website          text,
  description      text,
  fb_page_id       text,                                  -- Meta page ID for ad library
  ad_library_url   text,                                  -- Full Meta Ad Library URL for this page
  category         text        not null default 'voice_ai_healthcare',
  is_active        boolean     not null default true,
  first_seen_at    timestamptz not null default now(),    -- set on insert, never updated
  last_seen_at     timestamptz not null default now(),    -- updated on every fragment run
  metadata         jsonb       not null default '{}'      -- extra data: social links, discovery keyword, etc.
);

create index if not exists idx_voice_ai_competitors_category
  on voice_ai_competitors_athena (category);

create index if not exists idx_voice_ai_competitors_active
  on voice_ai_competitors_athena (is_active, last_seen_at desc);

comment on table voice_ai_competitors_athena is
  'Voice AI healthcare competitors discovered and tracked by the voice_ai_scout fragment.';

comment on column voice_ai_competitors_athena.key is
  'Stable slug identifier. Never changes after insert. Used as upsert conflict key.';

comment on column voice_ai_competitors_athena.first_seen_at is
  'Set once on insert. Never overwritten — use to track when a competitor was discovered.';

-- ---------------------------------------------------------------------------
-- Ad snapshots (deduplicated by fingerprint)
-- ---------------------------------------------------------------------------

create table if not exists voice_ai_ad_snapshots_athena (
  id                 uuid        primary key default gen_random_uuid(),
  competitor_id      uuid        not null references voice_ai_competitors_athena (id) on delete cascade,
  ad_fingerprint     text        not null,       -- sha256[:16] of normalized headline+primary_text
  headline           text,
  primary_text       text,
  cta_text           text,
  days_active_approx integer,
  is_long_running    boolean     not null default false,   -- true when days_active_approx >= 30
  delivery_note      text,                                 -- raw date/delivery string from the UI
  run_count          integer     not null default 1,       -- incremented by trigger on each update
  first_seen_at      timestamptz not null default now(),
  last_seen_at       timestamptz not null default now(),
  metadata           jsonb       not null default '{}',
  unique (competitor_id, ad_fingerprint)
);

create index if not exists idx_voice_ai_ad_snapshots_competitor
  on voice_ai_ad_snapshots_athena (competitor_id, last_seen_at desc);

create index if not exists idx_voice_ai_ad_snapshots_long_running
  on voice_ai_ad_snapshots_athena (is_long_running, last_seen_at desc)
  where is_long_running = true;

comment on table voice_ai_ad_snapshots_athena is
  'Deduplicated ad snapshots scraped from Meta Ad Library for each voice AI competitor.
   One row per unique ad (keyed by competitor + ad_fingerprint). Updated in-place on each run.';

comment on column voice_ai_ad_snapshots_athena.ad_fingerprint is
  'SHA-256[:16] of lowercase-trimmed headline || "|" || primary_text. Used for dedup.';

comment on column voice_ai_ad_snapshots_athena.run_count is
  'How many scrape runs this ad has been observed. Incremented by trigger.';

-- ---------------------------------------------------------------------------
-- Trigger: auto-increment run_count and update last_seen_at on re-scrape
-- ---------------------------------------------------------------------------

create or replace function voice_ai_ad_snapshot_on_update()
returns trigger as $$
begin
  new.run_count  := old.run_count + 1;
  new.last_seen_at := now();
  -- Preserve original first_seen_at
  new.first_seen_at := old.first_seen_at;
  return new;
end;
$$ language plpgsql;

create trigger voice_ai_ad_snapshot_update
  before update on voice_ai_ad_snapshots_athena
  for each row
  execute function voice_ai_ad_snapshot_on_update();

-- ---------------------------------------------------------------------------
-- Trigger: protect first_seen_at on competitor row updates
-- ---------------------------------------------------------------------------

create or replace function voice_ai_competitor_preserve_first_seen()
returns trigger as $$
begin
  new.first_seen_at := old.first_seen_at;
  return new;
end;
$$ language plpgsql;

create trigger voice_ai_competitor_update
  before update on voice_ai_competitors_athena
  for each row
  execute function voice_ai_competitor_preserve_first_seen();
