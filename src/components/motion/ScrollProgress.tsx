'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/use-reduced-motion';

/**
 * <ScrollProgress/>
 * ─────────────────────────────────────────────────────────────
 * Slim champagne progress bar fixed under the header that tracks
 * page scroll. Adds a refined "premium reading" cue.
 */
export function ScrollProgress() {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 26,
    restDelta: 0.001,
  });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-right bg-gradient-to-l from-champagne-500 via-champagne-300 to-transparent"
      style={{ scaleX }}
    />
  );
}
