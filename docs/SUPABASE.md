# Supabase setup for Opportunity Brain

## Connection

This project uses `@supabase/supabase-js` with the standard Supabase connection:

- `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_URL` — your project URL (e.g. `https://abc.supabase.co`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — public anon key (used by the Next.js client-side if needed)
- `SUPABASE_SERVICE_ROLE_KEY` — service role key (used by workers and server-side API routes; bypasses RLS)

Find all three in: **Supabase dashboard → Project Settings → API**.

## Create tables

Open the **SQL Editor** in your Supabase dashboard and run [`supabase/schema.sql`](../supabase/schema.sql). This creates all tables, enums, indexes, and triggers.

## Same project as another app

All brain tables have distinct names (`practices`, `signals`, `opportunities`, `evidence`, `opportunity_validations`, `scoring_runs`, `npi_snapshots`). They won't collide with typical app tables. If you need stronger isolation, move them to a dedicated PostgreSQL schema later.

## No Prisma

This project does **not** use Prisma. All database access goes through `@supabase/supabase-js` using the standard `supabase.from('table')` API.
