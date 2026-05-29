import { supabase } from '@/lib/db';
import type { SignalType } from '@/types/prisma';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { OpportunitiesFeedClient, type FeedOpp } from '@/components/opportunities/OpportunitiesFeedClient';

type SearchParams = {
  minScore?: string;
  state?: string;
  signal?: string;
  classification?: string;
};

const VALID_SIGNALS: SignalType[] = [
  'job_frontdesk',
  'chronic_turnover',
  'phone_friction',
  'new_practice',
  'low_automation',
  'legacy_tech_stack',
  'competitor_xray_engagement',
];

const CLASS_FILTERS = [
  '',
  'needs_review',
  'no_rec',
  'accepted_actionable',
  'accepted_content',
  'accepted_both',
  'accepted_neither',
] as const;

function matchesClassification(o: FeedOpp, filter: string | undefined) {
  if (!filter) return true;
  const hasAcc = o.accepted_at != null;
  const hasRec = o.recommended_at != null;
  switch (filter) {
    case 'needs_review':
      return hasRec && !hasAcc;
    case 'no_rec':
      return !hasRec;
    case 'accepted_actionable':
      return hasAcc && Boolean(o.accepted_actionable);
    case 'accepted_content':
      return hasAcc && Boolean(o.accepted_content);
    case 'accepted_both':
      return hasAcc && Boolean(o.accepted_actionable) && Boolean(o.accepted_content);
    case 'accepted_neither':
      return hasAcc && !o.accepted_actionable && !o.accepted_content;
    default:
      return true;
  }
}

const selectClassName = cn(
  'h-8 w-full min-w-[10rem] rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm shadow-none transition-colors',
  'outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
  'dark:bg-input/30'
);

export async function OpportunitiesFeed({ searchParams }: { searchParams: SearchParams }) {
  const minScore = Math.max(0, Number(searchParams.minScore || 0));
  const state = searchParams.state?.trim();
  const signalRaw = searchParams.signal?.trim();
  const signalType =
    signalRaw && VALID_SIGNALS.includes(signalRaw as SignalType) ? signalRaw : undefined;
  const classRaw = searchParams.classification?.trim();
  const classification =
    classRaw && CLASS_FILTERS.includes(classRaw as (typeof CLASS_FILTERS)[number])
      ? classRaw
      : undefined;

  const { data: opportunities } = await supabase
    .from('opportunities_athena')
    .select(
      'id, practice_id, score, summary, practice:practices_athena(*), evidence:evidence_athena(*), recommended_actionable, recommended_content, recommended_at, accepted_actionable, accepted_content, accepted_at'
    )
    .gte('score', minScore)
    .order('score', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(150);

  let filtered: FeedOpp[] = (opportunities || []) as FeedOpp[];

  if (signalType) {
    const { data: matchIds } = await supabase
      .from('signals_athena')
      .select('practice_id')
      .eq('type', signalType);
    const pids = new Set((matchIds || []).map((r: { practice_id: string }) => r.practice_id));
    filtered = filtered.filter((o) => pids.has(o.practice_id));
  }

  if (state) {
    filtered = filtered.filter((o) => {
      const blob = JSON.stringify(o.practice?.locations ?? []);
      return blob.toUpperCase().includes(state.toUpperCase());
    });
  }

  if (classification) {
    filtered = filtered.filter((o) => matchesClassification(o, classification));
  }

  return (
    <div>
      <p className="meta mb-4" style={{ marginTop: 0 }}>
        Ranked opportunities (max 20-50/day via worker cap). Legacy CLI:{' '}
        <code className="text-[var(--accent)]">pnpm run scout</code>
      </p>

      <form className="mb-6 flex flex-wrap items-end gap-4" method="get" action="/">
        <div className="grid gap-2">
          <Label htmlFor="minScore">Min score</Label>
          <Input
            id="minScore"
            name="minScore"
            type="number"
            min={0}
            max={100}
            defaultValue={minScore || 0}
            className="w-[7rem]"
          />
        </div>
        <div className="grid min-w-[8rem] flex-1 gap-2">
          <Label htmlFor="state">State (substring match)</Label>
          <Input id="state" name="state" type="text" placeholder="TX" defaultValue={state || ''} />
        </div>
        <div className="grid min-w-[12rem] gap-2">
          <Label htmlFor="signal">Signal type</Label>
          <select
            id="signal"
            name="signal"
            defaultValue={signalType || ''}
            className={selectClassName}
          >
            <option value="">Any</option>
            <option value="job_frontdesk">job_frontdesk</option>
            <option value="chronic_turnover">chronic_turnover</option>
            <option value="phone_friction">phone_friction</option>
            <option value="new_practice">new_practice</option>
            <option value="low_automation">low_automation</option>
            <option value="legacy_tech_stack">legacy_tech_stack</option>
            <option value="competitor_xray_engagement">competitor_xray_engagement</option>
          </select>
        </div>
        <div className="grid min-w-[14rem] gap-2">
          <Label htmlFor="classification">Classification</Label>
          <select
            id="classification"
            name="classification"
            defaultValue={classification || ''}
            className={selectClassName}
          >
            <option value="">Any</option>
            <option value="needs_review">Has rec, not accepted</option>
            <option value="no_rec">No recommendation yet</option>
            <option value="accepted_actionable">Accepted · actionable</option>
            <option value="accepted_content">Accepted · content</option>
            <option value="accepted_both">Accepted · both</option>
            <option value="accepted_neither">Accepted · neither</option>
          </select>
        </div>
        <Button type="submit" size="default" className="h-8">
          Apply
        </Button>
      </form>

      <OpportunitiesFeedClient opportunities={filtered} />
    </div>
  );
}
