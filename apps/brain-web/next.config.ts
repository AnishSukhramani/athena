import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@jobportalscout/db'],
  // pnpm monorepo: trace from repo root so client/server manifests resolve consistently
  outputFileTracingRoot: path.join(__dirname, '../..'),
  // Avoids dev-only "SegmentViewNode … not in React Client Manifest" / RSC bundler flakes in Next 15
  experimental: {
    devtoolSegmentExplorer: false,
  },
};

export default nextConfig;
