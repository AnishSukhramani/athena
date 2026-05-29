# Supabase setup for Opportunity Brain

## Connection

This project uses `@supabase/supabase-js` with the standard Supabase connection:

- `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_URL` — your project URL (e.g. `https://abc.supabase.co`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — public anon key (used by the Next.js client-side if needed)
- `SUPABASE_SERVICE_ROLE_KEY` — service role key (used by workers and server-side API routes; bypasses RLS)

Find all three in: **Supabase dashboard → Project Settings → API**.

## Create tables

Open the **SQL Editor** in your Supabase dashboard and run [`supabase/brain_athena_baseline_full.sql`](../supabase/brain_athena_baseline_full.sql) for a **new** project (full Opportunity Brain DDL in one file). Layout and migration order are documented in [`supabase/README.md`](../supabase/README.md).

If the brain tables already exist and you only need **opportunity classification** columns (recommendations + accepted labels), run [`supabase/migrations/20260101000002_opportunity_classification_athena.sql`](../supabase/migrations/20260101000002_opportunity_classification_athena.sql).

## Same project as another app

All brain tables use the `_athena` suffix (e.g. `practices_athena`, `signals_athena`, `opportunities_athena`) so they are unlikely to collide with other app tables in the same database. If you need stronger isolation, move them to a dedicated PostgreSQL schema later.

## No Prisma

This project does **not** use Prisma. All database access goes through `@supabase/supabase-js` using the standard `supabase.from('table')` API.
