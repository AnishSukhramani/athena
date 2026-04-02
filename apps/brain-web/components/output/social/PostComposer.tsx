'use client';

import { useEffect, useState } from 'react';

import type { SocialPlatform, SocialPostRow, SocialPostType } from '@/types/social';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

import { TextareaField } from './textarea-field';

const POST_TYPES: { id: SocialPostType; label: string }[] = [
  { id: 'text', label: 'Text' },
  { id: 'link_article', label: 'Link / article' },
  { id: 'image', label: 'Image' },
  { id: 'video', label: 'Video' },
];

type Props = {
  defaultPlatforms: SocialPlatform[];
  initialPost?: SocialPostRow | null;
  onSaved?: () => void;
  onCancelEdit?: () => void;
};

export function PostComposer({ defaultPlatforms, initialPost, onSaved, onCancelEdit }: Props) {
  const [postType, setPostType] = useState<SocialPostType>('text');
  const [useFacebook, setUseFacebook] = useState(defaultPlatforms.includes('facebook'));
  const [useLinkedIn, setUseLinkedIn] = useState(defaultPlatforms.includes('linkedin'));
  const [content, setContent] = useState('');
  const [articleUrl, setArticleUrl] = useState('');
  const [articleTitle, setArticleTitle] = useState('');
  const [articleDescription, setArticleDescription] = useState('');
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (!initialPost) {
      setEditingId(null);
      return;
    }
    setEditingId(initialPost.id);
    setPostType(initialPost.post_type);
    setUseFacebook(initialPost.target_platforms.includes('facebook'));
    setUseLinkedIn(initialPost.target_platforms.includes('linkedin'));
    setContent(initialPost.content);
    setArticleUrl(initialPost.article_url ?? '');
    setArticleTitle(initialPost.article_title ?? '');
    setArticleDescription(initialPost.article_description ?? '');
    setMediaUrls(initialPost.media_urls ?? []);
  }, [initialPost]);

  function targetPlatforms(): SocialPlatform[] {
    const p: SocialPlatform[] = [];
    if (useFacebook) p.push('facebook');
    if (useLinkedIn) p.push('linkedin');
    return p;
  }

  async function uploadFiles(files: FileList | null) {
    if (!files?.length) return;
    setPending(true);
    setMessage(null);
    try {
      const next = [...mediaUrls];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fd = new FormData();
        fd.set('file', file);
        const res = await fetch('/api/social/upload', { method: 'POST', body: fd });
        const j = (await res.json()) as { url?: string; error?: string };
        if (!res.ok) throw new Error(j.error || 'Upload failed');
        if (j.url) next.push(j.url);
      }
      setMediaUrls(next);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setPending(false);
    }
  }

  async function saveDraft() {
    const tp = targetPlatforms();
    if (tp.length === 0) {
      setMessage('Select at least one platform');
      return;
    }
    setPending(true);
    setMessage(null);
    try {
      const body = {
        post_type: postType,
        target_platforms: tp,
        content,
        media_urls: mediaUrls,
        article_url: articleUrl.trim() || null,
        article_title: articleTitle.trim() || null,
        article_description: articleDescription.trim() || null,
        status: 'draft' as const,
      };
      const url = editingId ? `/api/social/posts/${editingId}` : '/api/social/posts';
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const j = (await res.json()) as { error?: string; post?: SocialPostRow };
      if (!res.ok) throw new Error(j.error || 'Save failed');
      setMessage('Saved as draft');
      if (!editingId && j.post) setEditingId(j.post.id);
      onSaved?.();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setPending(false);
    }
  }

  async function publishNow() {
    const tp = targetPlatforms();
    if (tp.length === 0) {
      setMessage('Select at least one platform');
      return;
    }
    setPending(true);
    setMessage(null);
    try {
      let id = editingId;
      if (!id) {
        const create = await fetch('/api/social/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            post_type: postType,
            target_platforms: tp,
            content,
            media_urls: mediaUrls,
            article_url: articleUrl.trim() || null,
            article_title: articleTitle.trim() || null,
            article_description: articleDescription.trim() || null,
            status: 'draft',
          }),
        });
        const cj = (await create.json()) as { error?: string; post?: SocialPostRow };
        if (!create.ok || !cj.post) throw new Error(cj.error || 'Create failed');
        id = cj.post.id;
        setEditingId(id);
      } else {
        const up = await fetch(`/api/social/posts/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            post_type: postType,
            target_platforms: tp,
            content,
            media_urls: mediaUrls,
            article_url: articleUrl.trim() || null,
            article_title: articleTitle.trim() || null,
            article_description: articleDescription.trim() || null,
          }),
        });
        if (!up.ok) {
          const uj = (await up.json()) as { error?: string };
          throw new Error(uj.error || 'Update failed');
        }
      }

      const pub = await fetch('/api/social/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: id }),
      });
      const pj = (await pub.json()) as { error?: string; summary?: unknown; status?: string };
      if (!pub.ok) throw new Error(pj.error || 'Publish failed');
      setMessage(`Publish finished: ${pj.status}. Check list for details.`);
      onSaved?.();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Publish failed');
    } finally {
      setPending(false);
    }
  }

  function clearForm() {
    setEditingId(null);
    setPostType('text');
    setUseFacebook(defaultPlatforms.includes('facebook'));
    setUseLinkedIn(defaultPlatforms.includes('linkedin'));
    setContent('');
    setArticleUrl('');
    setArticleTitle('');
    setArticleDescription('');
    setMediaUrls([]);
    setMessage(null);
    onCancelEdit?.();
  }

  return (
    <section className="card font-sans">
      <h2>Create post</h2>

      <div className="mb-4 mt-4 flex flex-wrap gap-2">
        {POST_TYPES.map((t) => (
          <Button
            key={t.id}
            type="button"
            size="sm"
            variant={postType === t.id ? 'default' : 'outline'}
            className="h-8"
            onClick={() => setPostType(t.id)}
          >
            {t.label}
          </Button>
        ))}
      </div>

      <div className="mb-4">
        <p className="meta mb-2">Platforms</p>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant={useFacebook ? 'default' : 'outline'}
            className="h-8"
            onClick={() => setUseFacebook(!useFacebook)}
          >
            Facebook
          </Button>
          <Button
            type="button"
            size="sm"
            variant={useLinkedIn ? 'default' : 'outline'}
            className="h-8"
            onClick={() => setUseLinkedIn(!useLinkedIn)}
          >
            LinkedIn
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="grid gap-2">
          <Label htmlFor="post-content">Caption / text</Label>
          <TextareaField
            id="post-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post…"
            maxLength={12000}
          />
        </div>

        {postType === 'link_article' ? (
          <>
            <div className="grid gap-2">
              <Label htmlFor="article-url">Article URL</Label>
              <Input
                id="article-url"
                value={articleUrl}
                onChange={(e) => setArticleUrl(e.target.value)}
                placeholder="https://…"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="article-title">Title (LinkedIn)</Label>
              <Input
                id="article-title"
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
                placeholder="Optional headline"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="article-desc">Description (LinkedIn)</Label>
              <TextareaField
                id="article-desc"
                value={articleDescription}
                onChange={(e) => setArticleDescription(e.target.value)}
                placeholder="Optional description"
                className="min-h-[72px]"
              />
            </div>
          </>
        ) : null}

        {postType === 'image' || postType === 'video' ? (
          <div className="grid gap-2">
            <Label htmlFor="media-files">{postType === 'image' ? 'Images' : 'Video file'}</Label>
            <Input
              id="media-files"
              type="file"
              accept={postType === 'image' ? 'image/*' : 'video/*'}
              multiple={postType === 'image'}
              onChange={(e) => uploadFiles(e.target.files)}
              disabled={pending}
              className="h-auto py-2"
            />
            {mediaUrls.length > 0 ? (
              <ul className="text-xs text-muted-foreground">
                {mediaUrls.map((u) => (
                  <li key={u} className="truncate">
                    {u}
                  </li>
                ))}
              </ul>
            ) : null}
            {postType === 'image' && mediaUrls.length > 0 ? (
              <Button type="button" variant="ghost" size="sm" className="w-fit" onClick={() => setMediaUrls([])}>
                Clear media URLs
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>

      {message ? (
        <p
          className={cn(
            'meta mt-4 mb-0',
            message.startsWith('Publish') || message.includes('draft') || message === 'Saved as draft'
              ? 'text-muted-foreground'
              : 'text-destructive'
          )}
        >
          {message}
        </p>
      ) : null}

      <div className="actions mb-0">
        <Button type="button" className="h-8" disabled={pending} onClick={saveDraft}>
          Save draft
        </Button>
        <Button type="button" variant="secondary" className="h-8" disabled={pending} onClick={publishNow}>
          Publish now
        </Button>
        {initialPost ? (
          <Button type="button" variant="outline" className="h-8" disabled={pending} onClick={clearForm}>
            Cancel edit
          </Button>
        ) : null}
      </div>
    </section>
  );
}
