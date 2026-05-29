# Supabase SQL layout

## `brain_athena_baseline_full.sql`

**Full baseline DDL** for an **empty** database: all Opportunity Brain (`*_athena`) tables, enums, indexes, and triggers in dependency order.

Use this when you are creating a new Supabase project or an empty schema and want one paste-and-run file.

Do **not** re-run on a database that already has these objects; use incremental migrations instead.

## `migrations/`

Ordered, timestamp-prefixed **incremental** migrations for existing installs. Apply in lexicographic order (file name order):

| File | Purpose |
|------|---------|
| `20260101000000_athena_v1_2_incremental.sql` | Enum values + job/competitor/x-ray tables for legacy brain DBs |
| `20260101000001_social_publisher_v1.sql` | Social posts / accounts (non-`_athena` names) |
| `20260101000002_opportunity_classification_athena.sql` | Recommendation + accepted columns on `opportunities_athena` |

Greenfield installs that used only `brain_athena_baseline_full.sql` can skip migration 00 if that baseline already included v1.2 objects; run migration 02 only if classification columns are missing.

## Deprecated paths

Older docs referred to `schema.sql` and root-level `migration_*.sql` files. Those names were ambiguous; everything lives under the files above now.
