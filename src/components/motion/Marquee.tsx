'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/lib/use-reduced-motion';
import { cn } from '@/lib/utils';

export interface MarqueeProps {
  children: ReactNode;
  /** Pixels per second. */
  speed?: number;
  /** Reverse direction. */
  reverse?: boolean;
  /** Pause when the user hovers the strip. */
  pauseOnHover?: boolean;
  /** Additional class names on outer mask wrapper. */
  className?: string;
  /** Gap (in rem) between repeated tracks. */
  gap?: number;
  /** Fade edges with mask gradient. */
  fadeEdges?: boolean;
}

/**
 * <Marquee/>
 * ─────────────────────────────────────────────────────────────
 * Infinite horizontal scroller with mirrored track for seamless
 * loop. Editorial usage: brand statement strips, partner logos,
 * featured-fabrics row, "shipping · warranty · …".
 *
 * RTL handling: animation goes `x: 0 → -50%` regardless of direction,
 * the visual direction in RTL contexts naturally reads right-to-left
 * which is what we want.
 */
export function Marquee({
  children,
  speed = 60,
  reverse = false,
  pauseOnHover = true,
  className,
  gap = 3,
  fadeEdges = true,
}: MarqueeProps) {
  const reduced = usePrefersReducedMotion();

  // Approx. pixel width of one track (we don't measure; loop is based on -50%).
  // Duration scales with provided speed (lower speed → longer duration).
  const duration = Math.max(8, 1600 / speed);

  if (reduced) {
    return (
      <div
        className={cn('flex flex-wrap items-center justify-center gap-8', className)}
        style={{ gap: `${gap}rem` }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'group relative w-full overflow-hidden',
        fadeEdges &&
          '[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
        className,
      )}
    >
      <motion.div
        className="flex shrink-0 flex-nowrap items-center"
        style={{ gap: `${gap}rem`, willChange: 'transform' }}
        initial={{ x: reverse ? '-50%' : '0%' }}
        animate={{ x: reverse ? '0%' : '-50%' }}
        transition={{
          duration,
          ease: 'linear',
          repeat: Infinity,
        }}
        whileHover={pauseOnHover ? { x: undefined } : undefined}
      >
        {/* Track A */}
        <div
          className="flex shrink-0 flex-nowrap items-center"
          style={{ gap: `${gap}rem` }}
          aria-hidden="false"
        >
          {children}
        </div>
        {/* Track B – clone for seamless loop */}
        <div
          className="flex shrink-0 flex-nowrap items-center"
          style={{ gap: `${gap}rem` }}
          aria-hidden="true"
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
