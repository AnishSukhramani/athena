import { NextResponse } from 'next/server';

import { supabase } from '@/lib/db';
import { jsonSocialSupabaseError } from '@/lib/social-supabase-errors';
import { createPostBodySchema } from '@/lib/social-schema';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get('platform');

  const { data, error } = await supabase
    .from('social_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return jsonSocialSupabaseError(error);

  let posts = data ?? [];
  if (platform === 'facebook' || platform === 'linkedin') {
    posts = posts.filter((p: { target_platforms: string[] }) =>
      (p.target_platforms ?? []).includes(platform)
    );
  }

  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = createPostBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message, issues: parsed.error.issues }, { status: 400 });
  }

  const row = {
    post_type: parsed.data.post_type,
    target_platforms: parsed.data.target_platforms,
    content: parsed.data.content,
    media_urls: parsed.data.media_urls,
    article_url: parsed.data.article_url ?? null,
    article_title: parsed.data.article_title ?? null,
    article_description: parsed.data.article_description ?? null,
    status: parsed.data.status ?? 'draft',
  };

  const { data, error } = await supabase.from('social_posts').insert(row).select().single();

  if (error) return jsonSocialSupabaseError(error);

  return NextResponse.json({ post: data }, { status: 201 });
}
