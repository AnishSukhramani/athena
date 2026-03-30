import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/db';
import { ValidateButtons } from './validate-buttons';

export const dynamic = 'force-dynamic';

export default async function OpportunityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: opportunity } = await supabase
    .from('opportunities_athena')
    .select('*, practice:practices_athena(*), evidence:evidence_athena(*), validations:opportunity_validations_athena(*)')
    .eq('id', id)
    .maybeSingle();

  if (!opportunity) notFound();

  const { data: signals } = await supabase
    .from('signals_athena')
    .select('*')
    .eq('practice_id', opportunity.practice_id)
    .order('timestamp', { ascending: false })
    .limit(50);

  return (
    <div>
      <p className="meta">
        <Link href="/">&larr; Feed</Link>
      </p>
      <article className="card">
        <h2>{opportunity.practice?.name}</h2>
        <div className="meta">
          Score <strong>{opportunity.score}</strong>
          {opportunity.practice?.domain ? ` \u00b7 ${opportunity.practice.domain}` : ''}
        </div>
        {opportunity.summary && <p>{opportunity.summary}</p>}
      </article>

      <section style={{ marginTop: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem' }}>Signals</h3>
        {(signals || []).map((s: any) => (
          <div key={s.id} className="card">
            <span className="badge">{s.type}</span>
            <span className="meta">{s.strength || ''}</span>
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.8rem', color: 'var(--muted)', margin: '0.5rem 0 0' }}>
              {JSON.stringify(s.metadata, null, 2)}
            </pre>
          </div>
        ))}
      </section>

      <section style={{ marginTop: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem' }}>Evidence</h3>
        {(opportunity.evidence || []).map((e: any) => (
          <div key={e.id} className="card">
            <span className="badge">{e.type}</span>
            <p>{e.content}</p>
            {e.source_url && (
              <a href={e.source_url} target="_blank" rel="noreferrer">Open source</a>
            )}
          </div>
        ))}
      </section>

      <section style={{ marginTop: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem' }}>Validation</h3>
        <ValidateButtons opportunityId={opportunity.id} />
        {(opportunity.validations || []).map((v: any) => (
          <p key={v.id} className="meta">
            {v.status}
            {v.note ? ` \u2014 ${v.note}` : ''} &middot; {v.created_at}
          </p>
        ))}
      </section>
    </div>
  );
}
