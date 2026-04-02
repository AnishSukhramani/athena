'use client';

import { useCallback, useEffect, useState } from 'react';

import type { SocialPlatform, SocialPostRow } from '@/types/social';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
  platform: SocialPlatform;
  onEdit: (post: SocialPostRow) => void;
};

function formatPostType(type: string) {
  return type.replace(/_/g, ' ');
}

export function PostList({ platform, onEdit }: Props) {
  const [posts, setPosts] = useState<SocialPostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/social/posts?platform=${platform}`);
      const j = (await res.json()) as { posts?: SocialPostRow[]; error?: string };
      if (!res.ok) throw new Error(j.error || 'Failed to load');
      setPosts(j.posts ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [platform]);

  useEffect(() => {
    load();
  }, [load]);

  async function remove(id: string) {
    if (!confirm('Delete this post?')) return;
    const res = await fetch(`/api/social/posts/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const j = (await res.json()) as { error?: string };
      alert(j.error || 'Delete failed');
      return;
    }
    load();
  }

  async function publishDraft(post: SocialPostRow) {
    const res = await fetch('/api/social/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId: post.id }),
    });
    const j = (await res.json()) as { error?: string };
    if (!res.ok) {
      alert(j.error || 'Publish failed');
      return;
    }
    load();
  }

  if (loading) {
    return <p className="meta">Loading posts…</p>;
  }
  if (error) {
    return (
      <div className="card border-destructive/30 bg-destructive/5">
        <p className="mb-0 font-medium text-destructive">{error}</p>
        <p className="meta mt-2 mb-0">
          Run <code className="rounded bg-muted px-1 py-0.5 text-foreground">migration_social_publisher_v1.sql</code> in
          Supabase and create the <code className="rounded bg-muted px-1 py-0.5 text-foreground">social-media</code>{' '}
          storage bucket if you have not yet.
        </p>
        <div className="actions mt-3 mb-0">
          <Button type="button" variant="outline" size="sm" className="h-8" onClick={() => load()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return <p className="meta">No posts yet for this channel.</p>;
  }

  return (
    <div className="card overflow-hidden p-0 font-sans">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-left">
              <th className="p-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">Preview</th>
              <th className="p-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">Type</th>
              <th className="p-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">Platforms</th>
              <th className="p-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">Status</th>
              <th className="p-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr
                key={p.id}
                className="border-b border-border last:border-0 [&:nth-child(even)]:bg-muted/15"
              >
                <td className="max-w-[240px] p-3">
                  <p className="mb-0 line-clamp-2 text-foreground/90">{p.content || '(no text)'}</p>
                </td>
                <td className="p-3">
                  <span className="badge capitalize">{formatPostType(p.post_type)}</span>
                </td>
                <td className="p-3 text-xs text-muted-foreground">{(p.target_platforms || []).join(', ')}</td>
                <td className="p-3">
                  <span
                    className={cn(
                      'inline-block rounded-md px-2 py-0.5 text-xs font-medium',
                      p.status === 'published' && 'bg-primary/15 text-primary',
                      p.status === 'draft' && 'bg-muted text-muted-foreground',
                      p.status === 'failed' && 'bg-destructive/15 text-destructive'
                    )}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-1">
                    <Button type="button" variant="outline" size="sm" className="h-8" onClick={() => onEdit(p)}>
                      Edit
                    </Button>
                    {p.status === 'draft' ? (
                      <Button type="button" size="sm" className="h-8" onClick={() => publishDraft(p)}>
                        Publish
                      </Button>
                    ) : null}
                    <Button type="button" variant="destructive" size="sm" className="h-8" onClick={() => remove(p.id)}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
