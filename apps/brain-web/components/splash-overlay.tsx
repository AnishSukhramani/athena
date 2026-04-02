'use client';

import Image from 'next/image';
import { useLayoutEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const TOTAL_MS = 2000;
const FADE_START_MS = 1300;

/**
 * Full-screen intro overlay (sibling to page content — does not wrap RSC children).
 * Logo: 3× Y spin (~0.8s), then fade out (~2s total). Skipped when prefers-reduced-motion.
 */
export function SplashOverlay() {
  const [phase, setPhase] = useState<'on' | 'fade' | 'gone'>('on');

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('gone');
      return;
    }

    document.body.style.overflow = 'hidden';
    const fadeTimer = window.setTimeout(() => setPhase('fade'), FADE_START_MS);
    const offTimer = window.setTimeout(() => {
      setPhase('gone');
      document.body.style.overflow = '';
    }, TOTAL_MS);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(offTimer);
      document.body.style.overflow = '';
    };
  }, []);

  if (phase === 'gone') {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-[200] flex items-center justify-center bg-background transition-opacity duration-700 ease-out',
        phase === 'fade' && 'pointer-events-none opacity-0'
      )}
      aria-hidden="true"
    >
      <div
        className="sova-loader-stage relative flex items-center justify-center"
        style={{ width: 'min(36vw, 9rem)', height: 'min(36vw, 9rem)' }}
      >
        <div className="sova-loader-spin relative size-full will-change-transform">
          <Image
            src="/sova-logo.png"
            alt=""
            width={256}
            height={256}
            className="size-full object-contain drop-shadow-lg"
            priority
          />
        </div>
      </div>
    </div>
  );
}
