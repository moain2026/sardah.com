'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * LuxuryCard — حاوية فاخرة قابلة لإعادة الاستخدام
 * ─────────────────────────────────────────────────────
 * Wraps any content in the boutique's signature surface treatment.
 * Three tonalities, optional gold border, optional hover lift,
 * optional fade-in on viewport entry.
 */

export type LuxuryCardTone = 'ivory' | 'pearl' | 'onyx' | 'glass';

export interface LuxuryCardProps {
  tone?: LuxuryCardTone;
  /** Apply gold hairline border */
  goldBorder?: boolean;
  /** Disable hover lift effect */
  flat?: boolean;
  /** Animate in when scrolled into view */
  animate?: boolean;
  /** Stagger delay (seconds) used when `animate` */
  delay?: number;
  /** Padding shorthand */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Render as a different HTML element */
  as?: 'div' | 'article' | 'section' | 'li';
  className?: string;
  children: ReactNode;
}

const TONE_CLASSES: Record<LuxuryCardTone, string> = {
  ivory: 'luxury-card',
  pearl: 'luxury-card bg-pearl-200',
  onyx: 'bg-onyx text-pearl border border-pearl/8 rounded-luxe shadow-editorial',
  glass: 'glass-panel rounded-luxe',
};

const PADDING_CLASSES: Record<NonNullable<LuxuryCardProps['padding']>, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

export function LuxuryCard({
  tone = 'ivory',
  goldBorder = false,
  flat = false,
  animate = false,
  delay = 0,
  padding = 'lg',
  as = 'div',
  className,
  children,
}: LuxuryCardProps) {
  const classes = cn(
    TONE_CLASSES[tone],
    PADDING_CLASSES[padding],
    goldBorder && 'gold-border',
    flat && 'hover:transform-none hover:shadow-card hover:border-[var(--border-hairline)]',
    'relative',
    className,
  );

  if (!animate) {
    const Tag = as as 'div';
    return <Tag className={classes}>{children}</Tag>;
  }

  // Animated variant — Motion component map
  const motionMap = {
    div: motion.div,
    article: motion.article,
    section: motion.section,
    li: motion.li,
  } as const;

  const M = motionMap[as];

  return (
    <M
      className={classes}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
    >
      {children}
    </M>
  );
}
