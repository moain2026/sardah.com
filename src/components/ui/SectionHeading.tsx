'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * SectionHeading — رأس قسم تحريري
 * ─────────────────────────────────────────────────────
 * Eyebrow + editorial heading + optional intro line + optional CTA.
 * Centered or right-aligned (RTL natural).
 */

export interface SectionHeadingProps {
  /** Small uppercase eyebrow text (e.g. "تشكيلتنا") */
  eyebrow?: string;
  title: ReactNode;
  /** Highlight a portion of the title with the gold gradient */
  titleAccent?: ReactNode;
  intro?: ReactNode;
  /** Render-anything CTA slot (e.g. <MagneticButton /> or <Link/>) */
  cta?: ReactNode;
  align?: 'center' | 'start';
  /** Switch theme for dark backgrounds */
  inverse?: boolean;
  /** Tag for the heading (default h2) */
  as?: 'h1' | 'h2' | 'h3';
  /** Heading size token */
  size?: 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

const SIZE_MAP: Record<NonNullable<SectionHeadingProps['size']>, string> = {
  md: 'text-display-md',
  lg: 'text-display-lg',
  xl: 'text-display-xl',
  '2xl': 'text-display-2xl',
};

export function SectionHeading({
  eyebrow,
  title,
  titleAccent,
  intro,
  cta,
  align = 'center',
  inverse = false,
  as = 'h2',
  size = 'lg',
  className,
}: SectionHeadingProps) {
  const Tag = as as 'h2';
  const isCenter = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'flex flex-col gap-4',
        isCenter ? 'items-center text-center' : 'items-start text-start',
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'editorial-eyebrow',
            inverse && '[&]:text-champagne-300',
          )}
        >
          {eyebrow}
        </span>
      )}

      <Tag
        className={cn(
          'editorial-heading',
          SIZE_MAP[size],
          inverse ? 'text-pearl' : 'text-onyx',
        )}
      >
        {title}
        {titleAccent && (
          <>
            {' '}
            <span className="gradient-text">{titleAccent}</span>
          </>
        )}
      </Tag>

      {intro && (
        <p
          className={cn(
            'max-w-prose text-balance leading-loose',
            isCenter && 'mx-auto',
            inverse ? 'text-pearl/75' : 'text-onyx-500',
          )}
        >
          {intro}
        </p>
      )}

      {cta && <div className="mt-2">{cta}</div>}
    </motion.div>
  );
}
