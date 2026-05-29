'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type FeedOpp = {
  id: string;
  practice_id: string;
  score: number;
  summary: string | null;
  practice: { name?: string; domain?: string; locations?: unknown } | null;
  evidence?: { id: string; content?: string; source_url?: string | null }[];
  recommended_actionable: boolean | null;
  recommended_content: boolean | null;
  recommended_at: string | null;
  accepted_actionable: boolean | null;
  accepted_content: boolean | null;
  accepted_at: string | null;
};

function clsBadge(o: FeedOpp) {
  const parts: string[] = [];
  if (o.accepted_at) {
    if (o.accepted_actionable) parts.push('acc·act');
    if (o.accepted_content) parts.push('acc·content');
    if (!o.accepted_actionable && !o.accepted_content) parts.push('acc·none');
  } else if (o.recommended_at) {
    parts.push('rec');
    if (o.recommended_actionable) parts.push('act');
    if (o.recommended_content) parts.push('content');
  } else {
    parts.push('—');
  }
  return parts.join(' ');
}

export function OpportunitiesFeedClient({ opportunities }: { opportunities: FeedOpp[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const [busy, setBusy] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    setSelected(new Set(opportunities.map((o) => o.id)));
  };

  const clearSel = () => setSelected(new Set());

  const runClassifyOne = async (id: string) => {
    setBusy(`c:${id}`);
    setToast(null);
    try {
      const res = await fetch(`/api/opportunities/${id}/classify`, { method: 'POST' });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) setToast(j.error || 'Classify failed');
      else setToast('Classified.');
      router.refresh();
    } finally {
      setBusy(null);
    }
  };

  const runClassifyBatch = async () => {
    setBusy('batch');
    setToast(null);
    try {
      const res = await fetch('/api/opportunities/classify-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ onlyMissing: true, limit: 100 }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) setToast(j.error || 'Batch failed');
      else setToast(`Batch: ${j.succeeded}/${j.processed} ok.`);
      router.refresh();
    } finally {
      setBusy(null);
    }
  };

  const acceptSelected = async () => {
    if (selected.size === 0) return;
    setBusy('accept');
    setToast(null);
    try {
      const res = await fetch('/api/opportunities/accept-recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selected) }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) setToast(j.error || 'Accept failed');
      else {
        setToast(`Accepted ${j.succeeded}/${j.processed}.`);
        clearSel();
      }
      router.refresh();
    } finally {
      setBusy(null);
    }
  };

  const acceptAllPending = async () => {
    setBusy('acceptAll');
    setToast(null);
    try {
      const res = await fetch('/api/opportunities/accept-recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ acceptAll: true }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) setToast(j.error || 'Accept all failed');
      else {
        setToast(`Accepted ${j.succeeded} pending.`);
        clearSel();
      }
      router.refresh();
    } finally {
      setBusy(null);
    }
  };

  const exportCsv = () => {
    window.open('/api/opportunities/export?acceptedOnly=1', '_blank');
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2 rounded-md border border-border bg-muted/20 p-3">
        <span className="text-sm text-muted-foreground">Bulk:</span>
        <Button type="button" size="sm" variant="secondary" disabled={busy !== null} onClick={runClassifyBatch}>
          {busy === 'batch' ? 'Running…' : 'Run classifier (missing recs)'}
        </Button>
        <Button type="button" size="sm" variant="secondary" disabled={busy !== null || selected.size === 0} onClick={acceptSelected}>
          {busy === 'accept' ? 'Accepting…' : `Accept selected (${selected.size})`}
        </Button>
        <Button type="button" size="sm" variant="outline" disabled={busy !== null} onClick={acceptAllPending}>
          {busy === 'acceptAll' ? '…' : 'Accept all pending recs'}
        </Button>
        <Button type="button" size="sm" variant="ghost" disabled={busy !== null} onClick={selectAll}>
          Select all
        </Button>
        <Button type="button" size="sm" variant="ghost" disabled={busy !== null} onClick={clearSel}>
          Clear selection
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={exportCsv}>
          Export CSV (accepted)
        </Button>
      </div>
      {toast && <p className="meta mb-3 text-primary">{toast}</p>}

      <section>
        {opportunities.length === 0 ? (
          <p className="meta">No opportunities match filters.</p>
        ) : (
          opportunities.map((o) => (
            <article key={o.id} className="card">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex min-w-0 flex-1 gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 size-4 shrink-0 rounded border-input"
                    checked={selected.has(o.id)}
                    onChange={() => toggle(o.id)}
                    aria-label={`Select ${o.practice?.name || o.id}`}
                  />
                  <div className="min-w-0">
                    <h2>{o.practice?.name}</h2>
                    <div className="meta">
                      Score <strong>{o.score}</strong>
                      {o.practice?.domain ? ` · ${o.practice.domain}` : ''}
                      <span className="ml-2 rounded bg-muted px-1.5 py-0.5 font-mono text-[0.7rem] text-muted-foreground">
                        {clsBadge(o)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={busy !== null}
                    onClick={() => runClassifyOne(o.id)}
                  >
                    {busy === `c:${o.id}` ? '…' : 'Run classifier'}
                  </Button>
                  <Link
                    href={`/opportunity/${o.id}`}
                    className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Details →
                  </Link>
                </div>
              </div>
              {o.summary && <p className="mb-0">{o.summary}</p>}
              <div className="mt-2">
                {(o.evidence || []).slice(0, 2).map((e) => (
                  <div key={e.id} className="evidence">
                    {e.content?.slice(0, 280)}
                    {e.source_url && (
                      <div>
                        <a href={e.source_url} target="_blank" rel="noreferrer">
                          Source
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
