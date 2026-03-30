'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function ValidateButtons({ opportunityId }: { opportunityId: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function submit(status: 'valid' | 'not_relevant' | 'duplicate') {
    setPending(true);
    try {
      const res = await fetch(`/api/opportunities/${opportunityId}/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error(await res.text());
      router.refresh();
    } catch (e) {
      console.error(e);
      alert('Validation failed');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="actions">
      <button type="button" disabled={pending} onClick={() => submit('valid')}>
        Mark valid
      </button>
      <button type="button" className="secondary" disabled={pending} onClick={() => submit('not_relevant')}>
        Not relevant
      </button>
      <button type="button" className="secondary" disabled={pending} onClick={() => submit('duplicate')}>
        Duplicate
      </button>
    </div>
  );
}
