# Opportunity Brain — cron schedules (PRD §10)

Run workers with `pnpm run worker -- <fragment>` from the repo root (requires `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env`).

**Existing Supabase projects:** apply [`supabase/migrations/20260101000000_athena_v1_2_incremental.sql`](../supabase/migrations/20260101000000_athena_v1_2_incremental.sql) once in the SQL Editor (new enum labels + `job_post_history_athena`, `competitor_ads_athena`, `xray_leads_athena`). Greenfield installs that ran [`supabase/brain_athena_baseline_full.sql`](../supabase/brain_athena_baseline_full.sql) already include those objects.

| Fragment | Suggested schedule | Command |
|----------|-------------------|---------|
| Jobs | Every 6 hours | `pnpm run worker -- jobs` |
| Reviews | Daily | `pnpm run worker -- reviews` |
| NPPES | Weekly | `pnpm run worker -- nppes` |
| Website | Nightly or on-demand | `pnpm run worker -- website` |
| Tech stack | Nightly (after website) | `pnpm run worker -- tech_stack` |
| Ad library | Weekly | `pnpm run worker -- ad_library` |
| Competitor x-ray | Weekly | `pnpm run worker -- competitor_xray` |
| Voice AI Scout | Weekly | `pnpm run worker -- voice_ai_scout` |
| Scoring | After fragments or hourly | `pnpm run worker -- score` |

`pnpm run worker -- all` runs jobs → reviews → nppes → website → **tech_stack** → score. It does **not** run `ad_library`, `competitor_xray`, or `voice_ai_scout` (slow, Hyperbrowser-heavy, schedule separately).

**voice_ai_scout** requires `HYPERBROWSER_API_KEY`. With `OPENAI_API_KEY` set, discovery queries are expanded automatically by LLM (recommended). Competitor Facebook page IDs are auto-resolved each run — no manual lookup needed. To pin a page ID manually, add it to `manual_page_id_overrides` in `workers/config/voice-ai-competitors.json`.

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
0 2 * * 1 cd /path/to/jobportalscout && pnpm run worker -- voice_ai_scout
```
