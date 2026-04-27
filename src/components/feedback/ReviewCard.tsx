'use client';

import { motion } from 'framer-motion';
import { Quote, BadgeCheck } from 'lucide-react';
import type { Review } from '@/types/review';
import { cn, initials } from '@/lib/utils';
import { RatingStars } from '@/components/ui/RatingStars';

/**
 * ReviewCard — بطاقة تقييم عميلة
 * ─────────────────────────────────────────────────────
 * Editorial review block with avatar (initials), verified badge,
 * star rating, quoted review text, optional product code link line.
 */

export interface ReviewCardProps {
  review: Review;
  index?: number;
  /** Variant for dark backgrounds */
  inverse?: boolean;
  className?: string;
}

export function ReviewCard({
  review,
  index = 0,
  inverse = false,
  className,
}: ReviewCardProps) {
  const avatar = review.initials ?? initials(review.customerName);

  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.7,
        delay: Math.min(index * 0.08, 0.35),
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        'relative flex flex-col rounded-luxe p-7 md:p-8 transition-all duration-500 ease-luxe',
        inverse
          ? 'glass-panel-dark text-pearl'
          : 'luxury-card',
        className,
      )}
    >
      {/* Decorative quote glyph */}
      <Quote
        size={28}
        strokeWidth={1.2}
        className={cn(
          'absolute top-5 end-6 -scale-x-100',
          inverse ? 'text-champagne-300/40' : 'text-champagne-400/40',
        )}
        aria-hidden
      />

      {/* Header */}
      <header className="flex items-center gap-3 mb-5">
        {/* Avatar */}
        <div
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-full font-tajawal font-semibold text-sm select-none ring-1',
            inverse
              ? 'bg-pearl/8 text-pearl ring-pearl/20'
              : 'bg-onyx text-pearl ring-champagne-400/30',
          )}
          aria-hidden
        >
          {avatar}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                'font-tajawal font-semibold text-sm truncate',
                inverse ? 'text-pearl' : 'text-onyx',
              )}
            >
              {review.customerName}
            </span>
            {review.verified && (
              <BadgeCheck
                size={14}
                strokeWidth={1.8}
                className="text-champagne-600 shrink-0"
                aria-label="موثقة"
              />
            )}
          </div>
          {review.dateLabel && (
            <span
              className={cn(
                'text-[0.65rem] tracking-[0.2em] uppercase',
                inverse ? 'text-pearl/55' : 'text-taupe',
              )}
            >
              {review.dateLabel}
            </span>
          )}
        </div>

        <RatingStars value={review.rating} size="sm" inverse={inverse} />
      </header>

      {/* Body */}
      <blockquote
        className={cn(
          'text-sm md:text-[0.95rem] leading-loose font-plex',
          inverse ? 'text-pearl/85' : 'text-onyx-700',
        )}
      >
        {review.text}
      </blockquote>

      {/* Optional related product line */}
      {review.productCode && (
        <figcaption
          className={cn(
            'mt-5 pt-4 text-[0.7rem] tracking-[0.28em] uppercase nums-latin border-t',
            inverse
              ? 'border-pearl/12 text-champagne-200/75'
              : 'border-onyx/8 text-champagne-700',
          )}
        >
          عن المنتج {review.productCode}
        </figcaption>
      )}
    </motion.figure>
  );
}
