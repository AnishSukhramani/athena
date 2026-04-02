-- Social publisher (Facebook / LinkedIn) — isolated from _athena tables.
-- Run in Supabase SQL Editor after reviewing storage steps below.

-- ---------------------------------------------------------------------------
-- Storage (Supabase Dashboard → Storage)
-- 1. Create bucket: social-media
-- 2. For Facebook/LinkedIn to fetch image/video URLs, either:
--    - Set bucket to **public**, OR
--    - Keep private and use a worker/CDN that exposes signed URLs at publish time.
-- 3. Optional policy (public read): allow public read on social-media for objects.
-- Service role bypasses RLS; brain-web uses service role for uploads.
-- ---------------------------------------------------------------------------

create type social_platform as enum ('facebook', 'linkedin');

create type social_post_type as enum ('text', 'link_article', 'image', 'video');

create type social_post_status as enum ('draft', 'published', 'failed');

create table social_accounts (
  id uuid primary key default gen_random_uuid(),
  platform social_platform not null,
  account_id text not null,
  account_name text not null default '',
  access_token text not null,
  token_expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (platform, account_id)
);

create index idx_social_accounts_platform on social_accounts (platform);

create table social_posts (
  id uuid primary key default gen_random_uuid(),
  post_type social_post_type not null,
  target_platforms text[] not null default '{}',
  content text not null default '',
  media_urls text[] not null default '{}',
  article_url text,
  article_title text,
  article_description text,
  status social_post_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint social_posts_target_platforms_nonempty check (cardinality(target_platforms) >= 1)
);

create index idx_social_posts_status on social_posts (status);
create index idx_social_posts_created on social_posts (created_at desc);

create table social_post_results (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references social_posts (id) on delete cascade,
  platform social_platform not null,
  platform_post_id text,
  status_message text,
  created_at timestamptz not null default now()
);

create index idx_social_post_results_post on social_post_results (post_id);

create or replace function social_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger social_posts_updated_at
  before update on social_posts
  for each row execute function social_set_updated_at();

create trigger social_accounts_updated_at
  before update on social_accounts
  for each row execute function social_set_updated_at();
