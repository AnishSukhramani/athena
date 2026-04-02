import { NextResponse } from 'next/server';

import { supabase } from '@/lib/db';
import { jsonSocialSupabaseError } from '@/lib/social-supabase-errors';
import { updatePostBodySchema } from '@/lib/social-schema';

export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Ctx) {
  const { id } = await context.params;
  const { data, error } = await supabase.from('social_posts').select('*').eq('id', id).maybeSingle();
  if (error) return jsonSocialSupabaseError(error);
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ post: data });
}

export async function PUT(request: Request, context: Ctx) {
  const { id } = await context.params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = updatePostBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message, issues: parsed.error.issues }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};
  const d = parsed.data;
  if (d.post_type !== undefined) updates.post_type = d.post_type;
  if (d.target_platforms !== undefined) updates.target_platforms = d.target_platforms;
  if (d.content !== undefined) updates.content = d.content;
  if (d.media_urls !== undefined) updates.media_urls = d.media_urls;
  if (d.article_url !== undefined) updates.article_url = d.article_url;
  if (d.article_title !== undefined) updates.article_title = d.article_title;
  if (d.article_description !== undefined) updates.article_description = d.article_description;
  if (d.status !== undefined) updates.status = d.status;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
  }

  const { data, error } = await supabase.from('social_posts').update(updates).eq('id', id).select().single();
  if (error) return jsonSocialSupabaseError(error);
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ post: data });
}

export async function DELETE(_request: Request, context: Ctx) {
  const { id } = await context.params;

  const { data: post } = await supabase.from('social_posts').select('media_urls').eq('id', id).maybeSingle();
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const urls = (post as { media_urls: string[] }).media_urls ?? [];
  for (const url of urls) {
    try {
      const marker = '/object/public/social-media/';
      const idx = url.indexOf(marker);
      if (idx !== -1) {
        const path = decodeURIComponent(url.slice(idx + marker.length).split('?')[0]);
        if (path) await supabase.storage.from('social-media').remove([path]);
      }
    } catch {
      /* best-effort cleanup */
    }
  }

  const { error } = await supabase.from('social_posts').delete().eq('id', id);
  if (error) return jsonSocialSupabaseError(error);
  return NextResponse.json({ ok: true });
}
