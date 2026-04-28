'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/lib/use-reduced-motion';

/**
 * <CustomCursor/>
 * ─────────────────────────────────────────────────────────────
 * Minimal luxury cursor (champagne ring + dot) that grows when
 * hovering interactive elements (`a`, `button`, `[data-magnetic]`)
 * and morphs into a label when the element has `[data-cursor]`.
 *
 * Disabled on touch devices and when prefers-reduced-motion is true.
 */
export function CustomCursor() {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [touch, setTouch] = useState(false);
  const [variant, setVariant] = useState<'default' | 'hover' | 'label'>('default');
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 });

  // dot follows faster
  const dx = useSpring(x, { stiffness: 700, damping: 30, mass: 0.2 });
  const dy = useSpring(y, { stiffness: 700, damping: 30, mass: 0.2 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // detect touch
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    setTouch(isTouch);
    if (isTouch) return;

    function move(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    }
    function leave() {
      setVisible(false);
    }
    function over(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target) return;
      const interactive = target.closest(
        'a, button, [role="button"], [data-magnetic], [data-cursor], input, textarea, select, label',
      );
      if (!interactive) {
        setVariant('default');
        setLabel(null);
        return;
      }
      const cursorLabel = (interactive as HTMLElement).dataset?.cursor;
      if (cursorLabel) {
        setVariant('label');
        setLabel(cursorLabel);
      } else {
        setVariant('hover');
        setLabel(null);
      }
    }

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseleave', leave);
    window.addEventListener('mouseover', over, { passive: true });

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', leave);
      window.removeEventListener('mouseover', over);
    };
  }, [x, y]);

  if (touch || reduced) return null;

  const ringSize =
    variant === 'label' ? 92 : variant === 'hover' ? 56 : 32;

  return (
    <>
      {/* outer ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-difference"
        style={{
          x: sx,
          y: sy,
          width: ringSize,
          height: ringSize,
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.div
          className="flex h-full w-full items-center justify-center rounded-full border border-champagne-300/80 bg-transparent backdrop-blur-[2px]"
          animate={{
            scale: variant === 'hover' ? 1.05 : 1,
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {variant === 'label' && label ? (
            <span className="font-tajawal text-[10px] font-medium uppercase tracking-[0.18em] text-pearl-50 whitespace-nowrap px-1">
              {label}
            </span>
          ) : null}
        </motion.div>
      </motion.div>

      {/* inner dot (hidden on hover) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[71] h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne-400 mix-blend-difference"
        style={{
          x: dx,
          y: dy,
          opacity: visible && variant === 'default' ? 1 : 0,
        }}
      />
    </>
  );
}
