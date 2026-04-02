'use client';

import { useState } from 'react';

import type { SocialPlatform, SocialPostRow } from '@/types/social';

import { PostComposer } from './PostComposer';
import { PostList } from './PostList';

type Props = {
  platform: SocialPlatform;
  title: string;
};

export function SocialChannelWorkspace({ platform, title }: Props) {
  const [editing, setEditing] = useState<SocialPostRow | null>(null);
  const [listTick, setListTick] = useState(0);

  function bumpList() {
    setEditing(null);
    setListTick((t) => t + 1);
  }

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-base font-semibold tracking-tight text-foreground">{title}</h1>
        <p className="meta mt-2">
          Draft and publish posts. Connect accounts in Supabase table{' '}
          <code className="rounded bg-muted px-1 py-0.5 text-[length:inherit] text-foreground">social_accounts</code>.
        </p>
      </div>
      <PostComposer
        defaultPlatforms={[platform]}
        initialPost={editing}
        onSaved={bumpList}
        onCancelEdit={() => {
          setEditing(null);
        }}
      />
      <section>
        <h2 className="mb-3 text-base font-semibold text-foreground">Your posts</h2>
        <PostList key={listTick} platform={platform} onEdit={setEditing} />
      </section>
    </div>
  );
}
