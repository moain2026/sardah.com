'use client';

import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/use-reduced-motion';
import { cn } from '@/lib/utils';

export interface GradientMeshProps {
  /** Light (champagne on ivory) or dark (champagne on onyx). */
  tone?: 'light' | 'dark';
  /** Disable the slow drift animation. */
  static?: boolean;
  className?: string;
}

/**
 * <GradientMesh/>
 * ─────────────────────────────────────────────────────────────
 * Soft, slow-moving multi-radial-gradient background that gives
 * sections a luminous, hand-painted feel without imagery.
 * Used behind hero, story strips, CTA sections.
 */
export function GradientMesh({
  tone = 'light',
  static: isStatic = false,
  className,
}: GradientMeshProps) {
  const reduced = usePrefersReducedMotion();
  const animate = !reduced && !isStatic;

  const palette =
    tone === 'dark'
      ? {
          a: 'rgba(200,169,106,0.20)',
          b: 'rgba(185,141,136,0.10)',
          c: 'rgba(31,31,31,0)',
        }
      : {
          a: 'rgba(200,169,106,0.18)',
          b: 'rgba(185,141,136,0.10)',
          c: 'rgba(255,253,248,0)',
        };

  return (
    <motion.div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className,
      )}
      animate={animate ? { opacity: [0.85, 1, 0.9] } : undefined}
      transition={
        animate ? { duration: 14, repeat: Infinity, ease: 'easeInOut' } : undefined
      }
    >
      <motion.div
        className="absolute -inset-[20%]"
        animate={
          animate
            ? {
                x: ['-4%', '4%', '-2%'],
                y: ['2%', '-3%', '4%'],
              }
            : undefined
        }
        transition={
          animate
            ? { duration: 26, repeat: Infinity, ease: 'easeInOut' }
            : undefined
        }
        style={{
          backgroundImage: `
            radial-gradient(ellipse 50% 35% at 20% 30%, ${palette.a}, ${palette.c} 60%),
            radial-gradient(ellipse 45% 30% at 80% 20%, ${palette.b}, ${palette.c} 60%),
            radial-gradient(ellipse 55% 40% at 60% 80%, ${palette.a}, ${palette.c} 60%)
          `,
          filter: 'blur(40px)',
        }}
      />
    </motion.div>
  );
}
