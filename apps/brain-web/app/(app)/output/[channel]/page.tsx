import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';

import { OutputBlogNewsletter } from '@/components/output/OutputBlogNewsletter';
import { OutputEmail } from '@/components/output/OutputEmail';
import { OutputFacebook } from '@/components/output/OutputFacebook';
import { OutputLinkedIn } from '@/components/output/OutputLinkedIn';
import type { OutputChannelId } from '@/lib/output-channels';

const VALID: Record<OutputChannelId, ReactNode> = {
  facebook: <OutputFacebook />,
  linkedin: <OutputLinkedIn />,
  email: <OutputEmail />,
  blog: <OutputBlogNewsletter />,
};

export default async function OutputChannelPage({
  params,
}: {
  params: Promise<{ channel: string }>;
}) {
  const { channel } = await params;
  if (!(channel in VALID)) notFound();
  return (
    <div className={channel === 'facebook' || channel === 'linkedin' ? 'max-w-5xl' : 'max-w-3xl'}>
      {VALID[channel as OutputChannelId]}
    </div>
  );
}
