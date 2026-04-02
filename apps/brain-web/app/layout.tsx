import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

import { SplashOverlay } from '@/components/splash-overlay';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Sova',
  description: 'Ranked dental practice opportunities',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn('dark font-sans', geist.variable)}>
      <body className="min-h-svh antialiased">
        <TooltipProvider delay={0}>
          {children}
          <SplashOverlay />
        </TooltipProvider>
      </body>
    </html>
  );
}
