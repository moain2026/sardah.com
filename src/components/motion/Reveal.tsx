'use client';

import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';
import { fadeUp, viewportOnce, EASE_LUXE } from '@/lib/motion';
import { usePrefersReducedMotion } from '@/lib/use-reduced-motion';
import { cn } from '@/lib/utils';

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'fade' | 'mask';

export interface RevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  once?: boolean;
}

function buildVariants(
  direction: RevealDirection,
  duration: number,
  distance: number,
): Variants {
  const transition = { duration, ease: EASE_LUXE };

  switch (direction) {
    case 'up':
      return {
        hidden: { opacity: 0, y: distance },
        show: { opacity: 1, y: 0, transition },
      };
    case 'down':
      return {
        hidden: { opacity: 0, y: -distance },
        show: { opacity: 1, y: 0, transition },
      };
    case 'left':
      return {
        hidden: { opacity: 0, x: -distance },
        show: { opacity: 1, x: 0, transition },
      };
    case 'right':
      return {
        hidden: { opacity: 0, x: distance },
        show: { opacity: 1, x: 0, transition },
      };
    case 'fade':
      return {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition },
      };
    case 'mask':
      return {
        hidden: { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
        show: {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          transition: { ...transition, duration: Math.max(duration, 1.1) },
        },
      };
    default:
      return fadeUp;
  }
}

/**
 * <Reveal/>
 * ─────────────────────────────────────────────────────────────
 * Wraps any block and animates it once it scrolls into the viewport.
 * Honours `prefers-reduced-motion`.
 *
 * Examples:
 *   <Reveal>...</Reveal>
 *   <Reveal direction="mask" delay={0.1}>...</Reveal>
 */
export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.85,
  distance = 28,
  className,
  as = 'div',
  once = true,
}: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const Component = motion[as as 'div'] as typeof motion.div;

  if (reduced) {
    const Static = as as 'div';
    return <Static className={className}>{children}</Static>;
  }

  const variants = buildVariants(direction, duration, distance);

  return (
    <Component
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={once ? viewportOnce : { once: false, margin: '0px 0px -15% 0px' }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}
