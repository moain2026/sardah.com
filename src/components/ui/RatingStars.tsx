import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * RatingStars — تقييم بالنجوم
 * ─────────────────────────────────────────────────────
 * Renders 1–5 stars with optional half-star and a tiny numeric label.
 * Display-only (no interaction). Champagne fill on Onyx outline.
 */

export interface RatingStarsProps {
  value: number; // 0..5
  /** Show "(4.9)" beside the stars */
  showValue?: boolean;
  /** Show "12 تقييم" beside */
  reviewsCount?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Use light variant for dark backgrounds */
  inverse?: boolean;
  className?: string;
}

const STAR_PX: Record<NonNullable<RatingStarsProps['size']>, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
};

export function RatingStars({
  value,
  showValue = false,
  reviewsCount,
  size = 'sm',
  inverse = false,
  className,
}: RatingStarsProps) {
  const px = STAR_PX[size];
  const clamped = Math.max(0, Math.min(5, value));
  const fullStars = Math.floor(clamped);
  const hasHalf = clamped - fullStars >= 0.25 && clamped - fullStars < 0.75;
  const fullCount = hasHalf ? fullStars : Math.round(clamped);
  const stars = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 align-middle',
        className,
      )}
      aria-label={`تقييم ${clamped} من ٥`}
    >
      <span className="inline-flex items-center gap-[2px]">
        {stars.map((i) => {
          const filled = i < fullCount;
          const half = hasHalf && i === fullCount;
          return (
            <span key={i} className="relative inline-block" style={{ width: px, height: px }}>
              <Star
                size={px}
                strokeWidth={1.5}
                className={cn(
                  'absolute inset-0',
                  inverse ? 'text-pearl/30' : 'text-onyx-200',
                )}
                aria-hidden
              />
              {(filled || half) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: half ? '50%' : '100%' }}
                >
                  <Star
                    size={px}
                    strokeWidth={1.5}
                    className="fill-champagne text-champagne"
                    aria-hidden
                  />
                </span>
              )}
            </span>
          );
        })}
      </span>

      {showValue && (
        <span
          className={cn(
            'nums-latin font-medium tracking-tight',
            inverse ? 'text-pearl/85' : 'text-onyx-700',
            size === 'lg' ? 'text-sm' : 'text-xs',
          )}
        >
          {clamped.toFixed(1)}
        </span>
      )}

      {typeof reviewsCount === 'number' && reviewsCount > 0 && (
        <span
          className={cn(
            'text-[0.7rem] tracking-wide',
            inverse ? 'text-pearl/55' : 'text-taupe',
          )}
        >
          ({reviewsCount} تقييم)
        </span>
      )}
    </div>
  );
}
