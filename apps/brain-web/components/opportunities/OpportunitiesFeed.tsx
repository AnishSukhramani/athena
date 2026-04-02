import Link from 'next/link';
import { supabase } from '@/lib/db';
import type { SignalType } from '@/types/prisma';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type SearchParams = { minScore?: string; state?: string; signal?: string };

const VALID_SIGNALS: SignalType[] = [
  'job_frontdesk',
  'chronic_turnover',
  'phone_friction',
  'new_practice',
  'low_automation',
  'legacy_tech_stack',
  'competitor_xray_engagement',
];

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

  const { data: opportunities } = await supabase
    .from('opportunities_athena')
    .select('*, practice:practices_athena(*), evidence:evidence_athena(*)')
    .gte('score', minScore)
    .order('score', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(150);

  let filtered = opportunities || [];

  if (signalType) {
    const { data: matchIds } = await supabase
      .from('signals_athena')
      .select('practice_id')
      .eq('type', signalType);
    const pids = new Set((matchIds || []).map((r: { practice_id: string }) => r.practice_id));
    filtered = filtered.filter((o: { practice_id: string }) => pids.has(o.practice_id));
  }

  if (state) {
    filtered = filtered.filter((o: { practice: { locations: unknown } }) => {
      const blob = JSON.stringify(o.practice?.locations ?? []);
      return blob.toUpperCase().includes(state.toUpperCase());
    });
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
        <Button type="submit" size="default" className="h-8">
          Apply
        </Button>
      </form>

      <section>
        {filtered.length === 0 ? (
          <p className="meta">
            No opportunities match. Run workers: <code>pnpm run worker -- all</code>
          </p>
        ) : (
          filtered.map((o: any) => (
            <article key={o.id} className="card">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2>{o.practice?.name}</h2>
                  <div className="meta">
                    Score <strong>{o.score}</strong>
                    {o.practice?.domain ? ` · ${o.practice.domain}` : ''}
                  </div>
                </div>
                <Link href={`/opportunity/${o.id}`} className="text-sm font-medium text-primary underline-offset-4 hover:underline">
                  Details →
                </Link>
              </div>
              {o.summary && <p className="mb-0">{o.summary}</p>}
              <div className="mt-2">
                {(o.evidence || []).slice(0, 2).map((e: any) => (
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
