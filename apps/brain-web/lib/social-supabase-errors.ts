import { NextResponse } from 'next/server';

type SbError = { message: string; code?: string };

const MIGRATION_HINT =
  'Run supabase/migration_social_publisher_v1.sql in the Supabase SQL editor. Server routes need SUPABASE_SERVICE_ROLE_KEY.';

const BUCKET_HINT =
  'Create a Storage bucket named social-media (public read if Facebook/LinkedIn must fetch media by URL).';

function missingSocialTable(message: string, code?: string) {
  if (code === 'PGRST205' || code === '42P01') return true;
  return (
    /social_(posts|accounts|post_results)/i.test(message) &&
    /does not exist|schema cache|Could not find the table|relation/i.test(message)
  );
}

function missingBucket(message: string) {
  return /social-media/i.test(message) && /not found|does not exist|Bucket/i.test(message);
}

/** JSON response for Supabase errors from /api/social/* with optional setup hints. */
export function jsonSocialSupabaseError(error: SbError, status = 500) {
  const message = error.message;
  let hint: string | undefined;
  if (missingSocialTable(message, error.code)) hint = MIGRATION_HINT;
  else if (missingBucket(message)) hint = BUCKET_HINT;

  return NextResponse.json({ error: message, ...(hint && { hint }) }, { status });
}
