'use client';

import {
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/lib/use-reduced-motion';
import { cn } from '@/lib/utils';

export interface MagneticDeepProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  /** How far the element follows the cursor (px). */
  strength?: number;
  /** Spring stiffness/damping. */
  stiffness?: number;
  damping?: number;
  className?: string;
  /** Inner content also follows cursor with reduced strength. */
  withInner?: boolean;
  innerClassName?: string;
}

/**
 * <MagneticDeep/>
 * ─────────────────────────────────────────────────────────────
 * High-end magnetic interaction primitive — wraps any block (card,
 * cta, image) and makes it gently track the cursor on hover with a
 * spring. The optional inner layer follows at ~50 % strength giving
 * a subtle parallax-on-hover feel used by Awwwards/SOTD sites.
 *
 * Designed to feel "premium and quiet"; do NOT use on every element.
 */
export function MagneticDeep({
  children,
  strength = 22,
  stiffness = 180,
  damping = 18,
  className,
  withInner = false,
  innerClassName,
  ...rest
}: MagneticDeepProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, { stiffness, damping, mass: 0.5 });
  const sy = useSpring(y, { stiffness, damping, mass: 0.5 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  if (reduced) {
    return (
      <div className={cn(className)} {...(rest as React.HTMLAttributes<HTMLDivElement>)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn('will-change-transform', className)}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...rest}
    >
      {withInner ? (
        <motion.div
          className={cn('will-change-transform', innerClassName)}
          style={{ x: useSpring(x, { stiffness: 120, damping: 22 }), y: useSpring(y, { stiffness: 120, damping: 22 }) }}
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  );
}
