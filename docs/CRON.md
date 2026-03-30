# Opportunity Brain — cron schedules (PRD §10)

Run workers with `pnpm run worker -- <fragment>` from the repo root (requires `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env`).

| Fragment | Suggested schedule | Command |
|----------|-------------------|---------|
| Jobs | Every 6 hours | `pnpm run worker -- jobs` |
| Reviews | Daily | `pnpm run worker -- reviews` |
| NPPES | Weekly | `pnpm run worker -- nppes` |
| Website | Nightly or on-demand | `pnpm run worker -- website` |
| Scoring | After fragments or hourly | `pnpm run worker -- score` |

Example crontab (UTC):

```
0 */6 * * * cd /path/to/jobportalscout && pnpm run worker -- jobs
15 6 * * * cd /path/to/jobportalscout && pnpm run worker -- reviews
30 4 * * 0 cd /path/to/jobportalscout && pnpm run worker -- nppes
0 7 * * * cd /path/to/jobportalscout && pnpm run worker -- website
5 * * * * cd /path/to/jobportalscout && pnpm run worker -- score
```
