import Link from 'next/link';
import { supabase } from '@/lib/db';
import type { SignalType } from '@/types/prisma';

type SearchParams = { minScore?: string; state?: string; signal?: string };

const VALID_SIGNALS: SignalType[] = ['job_frontdesk', 'phone_friction', 'new_practice', 'low_automation'];

export const dynamic = 'force-dynamic';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const minScore = Math.max(0, Number(sp.minScore || 0));
  const state = sp.state?.trim();
  const signalRaw = sp.signal?.trim();
  const signalType = signalRaw && VALID_SIGNALS.includes(signalRaw as SignalType) ? signalRaw : undefined;

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
      <p className="meta" style={{ marginTop: 0 }}>
        Ranked opportunities (max 20-50/day via worker cap). Legacy CLI:{' '}
        <code style={{ color: 'var(--accent)' }}>pnpm run scout</code>
      </p>

      <form className="row" method="get" action="/">
        <label>
          Min score
          <input name="minScore" type="number" min={0} max={100} defaultValue={minScore || 0} />
        </label>
        <label>
          State (substring match)
          <input name="state" type="text" placeholder="TX" defaultValue={state || ''} />
        </label>
        <label>
          Signal type
          <select name="signal" defaultValue={signalType || ''}>
            <option value="">Any</option>
            <option value="job_frontdesk">job_frontdesk</option>
            <option value="phone_friction">phone_friction</option>
            <option value="new_practice">new_practice</option>
            <option value="low_automation">low_automation</option>
          </select>
        </label>
        <button type="submit">Apply</button>
      </form>

      <section>
        {filtered.length === 0 ? (
          <p className="meta">No opportunities match. Run workers: <code>pnpm run worker -- all</code></p>
        ) : (
          filtered.map((o: any) => (
            <article key={o.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                  <h2>{o.practice?.name}</h2>
                  <div className="meta">
                    Score <strong>{o.score}</strong>
                    {o.practice?.domain ? ` \u00b7 ${o.practice.domain}` : ''}
                  </div>
                </div>
                <Link href={`/opportunity/${o.id}`}>Details &rarr;</Link>
              </div>
              {o.summary && <p style={{ marginBottom: 0 }}>{o.summary}</p>}
              <div style={{ marginTop: '0.5rem' }}>
                {(o.evidence || []).slice(0, 2).map((e: any) => (
                  <div key={e.id} className="evidence">
                    {e.content?.slice(0, 280)}
                    {e.source_url && (
                      <div><a href={e.source_url} target="_blank" rel="noreferrer">Source</a></div>
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
