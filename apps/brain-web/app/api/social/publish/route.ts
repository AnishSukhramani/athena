import { NextResponse } from 'next/server';
import { z } from 'zod';

import { publishToFacebook } from '@/lib/facebook-publish';
import { publishToLinkedIn } from '@/lib/linkedin-publish';
import { supabase } from '@/lib/db';
import { jsonSocialSupabaseError } from '@/lib/social-supabase-errors';

export const dynamic = 'force-dynamic';

const bodySchema = z.object({
  postId: z.string().uuid(),
});

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }

  const { postId } = parsed.data;

  const { data: post, error: postErr } = await supabase.from('social_posts').select('*').eq('id', postId).maybeSingle();
  if (postErr) return jsonSocialSupabaseError(postErr);
  if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

  const row = post as {
    id: string;
    post_type: string;
    target_platforms: string[];
    content: string;
    media_urls: string[];
    article_url: string | null;
    article_title: string | null;
    article_description: string | null;
  };

  if (row.post_type === 'link_article' && !row.article_url?.trim()) {
    return NextResponse.json({ error: 'link_article requires article_url' }, { status: 400 });
  }
  if ((row.post_type === 'image' || row.post_type === 'video') && (!row.media_urls || row.media_urls.length === 0)) {
    return NextResponse.json({ error: 'image/video posts require at least one media URL' }, { status: 400 });
  }

  const platforms = row.target_platforms as ('facebook' | 'linkedin')[];
  const { data: accountRows, error: accErr } = await supabase
    .from('social_accounts')
    .select('*')
    .in('platform', platforms);

  if (accErr) return jsonSocialSupabaseError(accErr);

  const byPlatform = new Map<string, { account_id: string; access_token: string }>();
  for (const a of accountRows ?? []) {
    const p = (a as { platform: string }).platform;
    if (!byPlatform.has(p)) {
      byPlatform.set(p, {
        account_id: (a as { account_id: string }).account_id,
        access_token: (a as { access_token: string }).access_token,
      });
    }
  }

  const summary: { platform: string; ok: boolean; message?: string; platformPostId?: string }[] = [];

  for (const platform of platforms) {
    const acct = byPlatform.get(platform);
    if (!acct) {
      summary.push({ platform, ok: false, message: `No social_accounts row for ${platform}` });
      await supabase.from('social_post_results').insert({
        post_id: postId,
        platform,
        platform_post_id: null,
        status_message: `No social_accounts row for ${platform}`,
      });
      continue;
    }

    if (platform === 'facebook') {
      const r = await publishToFacebook({
        pageId: acct.account_id,
        accessToken: acct.access_token,
        postType: row.post_type as 'text' | 'link_article' | 'image' | 'video',
        content: row.content,
        articleUrl: row.article_url,
        mediaUrls: row.media_urls ?? [],
      });
      if (r.ok) {
        summary.push({ platform, ok: true, platformPostId: r.platformPostId });
        await supabase.from('social_post_results').insert({
          post_id: postId,
          platform,
          platform_post_id: r.platformPostId,
          status_message: null,
        });
      } else {
        summary.push({ platform, ok: false, message: r.message });
        await supabase.from('social_post_results').insert({
          post_id: postId,
          platform,
          platform_post_id: null,
          status_message: r.message,
        });
      }
    } else if (platform === 'linkedin') {
      const r = await publishToLinkedIn({
        authorUrn: acct.account_id,
        accessToken: acct.access_token,
        postType: row.post_type as 'text' | 'link_article' | 'image' | 'video',
        content: row.content,
        articleUrl: row.article_url,
        articleTitle: row.article_title,
        articleDescription: row.article_description,
        mediaUrls: row.media_urls ?? [],
      });
      if (r.ok) {
        summary.push({ platform, ok: true, platformPostId: r.platformPostId });
        await supabase.from('social_post_results').insert({
          post_id: postId,
          platform,
          platform_post_id: r.platformPostId,
          status_message: null,
        });
      } else {
        summary.push({ platform, ok: false, message: r.message });
        await supabase.from('social_post_results').insert({
          post_id: postId,
          platform,
          platform_post_id: null,
          status_message: r.message,
        });
      }
    }
  }

  const anyOk = summary.some((s) => s.ok);
  const status = anyOk ? 'published' : 'failed';

  await supabase.from('social_posts').update({ status }).eq('id', postId);

  return NextResponse.json({ summary, status });
}
