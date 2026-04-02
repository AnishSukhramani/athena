'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

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
      <Button type="button" disabled={pending} onClick={() => submit('valid')}>
        Mark valid
      </Button>
      <Button type="button" variant="outline" disabled={pending} onClick={() => submit('not_relevant')}>
        Not relevant
      </Button>
      <Button type="button" variant="outline" disabled={pending} onClick={() => submit('duplicate')}>
        Duplicate
      </Button>
    </div>
  );
}
