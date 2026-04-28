/**
 * Sardah Abayas — Motion Design System
 * ═══════════════════════════════════════════════════════════════
 * Reusable Framer Motion variants & easings used across the app.
 * Centralised so every animation feels coherent, premium and quiet.
 *
 * Inspired by: Apple, Saint Laurent, Hermès, Studio Berthet, Awwwards SOTD.
 */

import type { Variants, Transition } from 'framer-motion';

/* ───────────── Eases ───────────── */
// Custom cubic-beziers tuned for editorial feel (no bouncy springs).
export const EASE_LUXE = [0.16, 1, 0.3, 1] as const;        // expo-out · "luxury exit"
export const EASE_SOFT = [0.22, 1, 0.36, 1] as const;        // smooth-out
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;      // editorial in-out
export const EASE_REVEAL = [0.7, 0, 0.2, 1] as const;        // mask reveal
export const EASE_QUICK = [0.4, 0, 0.2, 1] as const;         // material standard

/* ───────────── Durations ───────────── */
export const DUR = {
  fast: 0.32,
  base: 0.55,
  slow: 0.85,
  cinematic: 1.2,
  reveal: 1.4,
} as const;

/* ───────────── Generic transitions ───────────── */
export const tLuxe: Transition = { duration: DUR.base, ease: EASE_LUXE };
export const tSlow: Transition = { duration: DUR.slow, ease: EASE_LUXE };
export const tCinematic: Transition = { duration: DUR.cinematic, ease: EASE_LUXE };

/* ───────────── Fade ───────────── */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.slow, ease: EASE_LUXE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.base, ease: EASE_SOFT } },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.slow, ease: EASE_LUXE },
  },
};

/* ───────────── Stagger containers ───────────── */
export const stagger = (delay = 0, gap = 0.08): Variants => ({
  hidden: {},
  show: {
    transition: {
      delayChildren: delay,
      staggerChildren: gap,
    },
  },
});

export const staggerFast: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

/* ───────────── Mask reveal (clip-path) ─────────────
 * Used on hero images / editorial cards. Inset shrinks to 0
 * to reveal the image as if a curtain pulled back.
 */
export const maskReveal: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  show: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: DUR.reveal, ease: EASE_REVEAL },
  },
};

export const maskRevealHorizontal: Variants = {
  hidden: { clipPath: 'inset(0% 100% 0% 0%)' }, // RTL: from right edge
  show: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: DUR.reveal, ease: EASE_REVEAL },
  },
};

/* ───────────── Scale-in (gentle) ───────────── */
export const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 1.06 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: DUR.cinematic, ease: EASE_LUXE },
  },
};

/* ───────────── Word-by-word reveal (kinetic typography) ───────────── */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: '60%' },
  show: {
    opacity: 1,
    y: '0%',
    transition: { duration: DUR.slow, ease: EASE_LUXE },
  },
};

/* ───────────── Hover lifts ───────────── */
export const hoverLift = {
  whileHover: { y: -4, transition: { duration: 0.4, ease: EASE_LUXE } },
  whileTap: { scale: 0.98 },
};

/* ───────────── Page transition ─────────────
 * Mounted by <PageTransition/> to wrap each route.
 * Brief fade + slight upward drift; respects prefers-reduced-motion in component.
 */
export const pageVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_LUXE },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.3, ease: EASE_QUICK },
  },
};

/* ───────────── Viewport defaults for whileInView ───────────── */
export const viewportOnce = { once: true, margin: '0px 0px -10% 0px' } as const;
export const viewportRepeat = { once: false, margin: '0px 0px -15% 0px' } as const;
