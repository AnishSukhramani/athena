'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type ClassificationFields = {
  id: string;
  recommended_actionable: boolean | null;
  recommended_content: boolean | null;
  recommendation_reason: string | null;
  recommendation_confidence: number | null;
  classifier_version: string | null;
  recommended_at: string | null;
  accepted_actionable: boolean | null;
  accepted_content: boolean | null;
  accepted_at: string | null;
};

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'badge mr-1 inline-block',
        className
      )}
    >
      {children}
    </span>
  );
}

export function ClassificationPanel({ initial }: { initial: ClassificationFields }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [accA, setAccA] = useState(() =>
    initial.accepted_at != null
      ? Boolean(initial.accepted_actionable)
      : Boolean(initial.recommended_at && initial.recommended_actionable)
  );
  const [accC, setAccC] = useState(() =>
    initial.accepted_at != null
      ? Boolean(initial.accepted_content)
      : Boolean(initial.recommended_at && initial.recommended_content)
  );
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setAccA(
      initial.accepted_at != null
        ? Boolean(initial.accepted_actionable)
        : Boolean(initial.recommended_at && initial.recommended_actionable)
    );
    setAccC(
      initial.accepted_at != null
        ? Boolean(initial.accepted_content)
        : Boolean(initial.recommended_at && initial.recommended_content)
    );
  }, [
    initial.accepted_at,
    initial.accepted_actionable,
    initial.accepted_content,
    initial.recommended_at,
    initial.recommended_actionable,
    initial.recommended_content,
  ]);

  const hasRec = initial.recommended_at != null;
  const recA = Boolean(initial.recommended_actionable);
  const recC = Boolean(initial.recommended_content);
  const hasAccepted = initial.accepted_at != null;

  const runClassify = async () => {
    setLoading('classify');
    setMessage(null);
    try {
      const res = await fetch(`/api/opportunities/${initial.id}/classify`, { method: 'POST' });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(j.error || 'Classify failed');
        return;
      }
      setMessage('Recommendation updated.');
      router.refresh();
    } finally {
      setLoading(null);
    }
  };

  const acceptRecommendation = async () => {
    setLoading('accept');
    setMessage(null);
    try {
      const res = await fetch('/api/opportunities/accept-recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: [initial.id] }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(j.error || 'Accept failed');
        return;
      }
      setAccA(recA);
      setAccC(recC);
      setMessage('Recommendation accepted.');
      router.refresh();
    } finally {
      setLoading(null);
    }
  };

  const saveOverride = async () => {
    setLoading('save');
    setMessage(null);
    try {
      const res = await fetch(`/api/opportunities/${initial.id}/classification`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accepted_actionable: accA, accepted_content: accC }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(j.error || 'Save failed');
        return;
      }
      setMessage('Accepted labels saved.');
      router.refresh();
    } finally {
      setLoading(null);
    }
  };

  return (
    <section className="mt-6">
      <h3 className="text-base font-medium">Classification (recommender)</h3>
      <p className="meta mt-1">
        Run the classifier for a suggestion, then accept it or edit checkboxes and save.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="button" size="sm" disabled={loading !== null} onClick={runClassify}>
          {loading === 'classify' ? 'Running…' : 'Run classifier'}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          disabled={!hasRec || loading !== null}
          onClick={acceptRecommendation}
        >
          {loading === 'accept' ? 'Accepting…' : 'Accept recommendation'}
        </Button>
      </div>

      <div className="mt-4 rounded-md border border-border bg-muted/30 p-4">
        <p className="mb-2 text-sm font-medium text-foreground">Recommendation</p>
        {!hasRec ? (
          <p className="meta mb-0">No recommendation yet — run the classifier.</p>
        ) : (
          <>
            <div className="mb-2 flex flex-wrap gap-1">
              {recA ? <Badge>actionable</Badge> : <Badge className="opacity-60">not actionable</Badge>}
              {recC ? <Badge>content</Badge> : <Badge className="opacity-60">not content</Badge>}
            </div>
            {initial.classifier_version && (
              <p className="meta mb-1">Model: {initial.classifier_version}</p>
            )}
            {initial.recommendation_confidence != null && (
              <p className="meta mb-1">Confidence: {initial.recommendation_confidence}</p>
            )}
            {initial.recommendation_reason && (
              <p className="mb-0 text-sm text-muted-foreground">{initial.recommendation_reason}</p>
            )}
            {hasAccepted && (recA !== Boolean(initial.accepted_actionable) || recC !== Boolean(initial.accepted_content)) && (
              <p className="mt-2 text-sm text-amber-200/90">
                Recommendation differs from accepted labels — re-run does not change accepted until you accept or save again.
              </p>
            )}
          </>
        )}
      </div>

      <div className="mt-4 space-y-3">
        <p className="text-sm font-medium">Accepted (committed)</p>
        <div className="flex flex-wrap items-center gap-6">
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="size-4 rounded border-input"
              checked={accA}
              onChange={(e) => setAccA(e.target.checked)}
            />
            Actionable
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="size-4 rounded border-input"
              checked={accC}
              onChange={(e) => setAccC(e.target.checked)}
            />
            Content
          </label>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" disabled={loading !== null} onClick={saveOverride}>
            {loading === 'save' ? 'Saving…' : 'Save accepted labels'}
          </Button>
        </div>
        {hasAccepted && initial.accepted_at && (
          <p className="meta mb-0">Last accepted: {new Date(initial.accepted_at).toLocaleString()}</p>
        )}
      </div>

      {message && <p className="mt-3 text-sm text-primary">{message}</p>}
    </section>
  );
}
