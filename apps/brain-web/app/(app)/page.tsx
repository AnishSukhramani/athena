import { OpportunitiesFeed } from '@/components/opportunities/OpportunitiesFeed';

export const dynamic = 'force-dynamic';

type SearchParams = { minScore?: string; state?: string; signal?: string };

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  return <OpportunitiesFeed searchParams={sp} />;
}
