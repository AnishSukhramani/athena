# Opportunity Brain — cron schedules (PRD §10)

Run workers with `pnpm run worker -- <fragment>` from the repo root (requires `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env`).

**Existing Supabase projects:** apply [`supabase/migration_athena_v1_2.sql`](../supabase/migration_athena_v1_2.sql) once in the SQL Editor (new enum labels + `job_post_history_athena`, `competitor_ads_athena`, `xray_leads_athena`). Greenfield installs can rely on [`supabase/schema.sql`](../supabase/schema.sql) only.

| Fragment | Suggested schedule | Command |
|----------|-------------------|---------|
| Jobs | Every 6 hours | `pnpm run worker -- jobs` |
| Reviews | Daily | `pnpm run worker -- reviews` |
| NPPES | Weekly | `pnpm run worker -- nppes` |
| Website | Nightly or on-demand | `pnpm run worker -- website` |
| Tech stack | Nightly (after website) | `pnpm run worker -- tech_stack` |
| Ad library | Weekly | `pnpm run worker -- ad_library` |
| Competitor x-ray | Weekly | `pnpm run worker -- competitor_xray` |
| Scoring | After fragments or hourly | `pnpm run worker -- score` |

`pnpm run worker -- all` runs jobs → reviews → nppes → website → **tech_stack** → score. It does **not** run `ad_library` or `competitor_xray` (slow, Hyperbrowser-heavy, schedule separately).

Example crontab (UTC):

```
0 */6 * * * cd /path/to/jobportalscout && pnpm run worker -- jobs
15 6 * * * cd /path/to/jobportalscout && pnpm run worker -- reviews
30 4 * * 0 cd /path/to/jobportalscout && pnpm run worker -- nppes
0 7 * * * cd /path/to/jobportalscout && pnpm run worker -- website
15 7 * * * cd /path/to/jobportalscout && pnpm run worker -- tech_stack
5 * * * * cd /path/to/jobportalscout && pnpm run worker -- score
30 3 * * 1 cd /path/to/jobportalscout && pnpm run worker -- ad_library
45 3 * * 1 cd /path/to/jobportalscout && pnpm run worker -- competitor_xray
```
