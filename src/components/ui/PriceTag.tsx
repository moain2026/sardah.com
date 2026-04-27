import { cn, discountPercent, formatPrice } from '@/lib/utils';

/**
 * PriceTag — ر.س بشكل أنيق
 * ─────────────────────────────────────────────────────
 * Renders a price with optional old-price strike-through and
 * automatically computed discount badge.
 */

export interface PriceTagProps {
  price: number;
  oldPrice?: number;
  /** Smaller / larger display sizes */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Hide the SAR currency symbol */
  hideCurrency?: boolean;
  /** Hide the discount badge even if oldPrice present */
  hideDiscountBadge?: boolean;
  /** Stack vertically vs inline */
  stack?: boolean;
  className?: string;
}

const SIZE: Record<NonNullable<PriceTagProps['size']>, { current: string; old: string }> = {
  sm: { current: 'text-sm', old: 'text-xs' },
  md: { current: 'text-base', old: 'text-sm' },
  lg: { current: 'text-xl', old: 'text-base' },
  xl: { current: 'text-3xl', old: 'text-lg' },
};

export function PriceTag({
  price,
  oldPrice,
  size = 'md',
  hideCurrency = false,
  hideDiscountBadge = false,
  stack = false,
  className,
}: PriceTagProps) {
  const showOld = typeof oldPrice === 'number' && oldPrice > price;
  const percent = showOld ? discountPercent(oldPrice!, price) : 0;

  return (
    <div
      className={cn(
        'flex flex-wrap items-baseline gap-x-2 gap-y-1',
        stack && 'flex-col items-start',
        className,
      )}
    >
      <span
        className={cn(
          'price-current font-tajawal font-semibold tracking-tight nums-latin',
          SIZE[size].current,
        )}
      >
        {formatPrice(price)}
        {!hideCurrency && (
          <span className="ms-1 text-[0.7em] opacity-70 font-normal">ر.س</span>
        )}
      </span>

      {showOld && (
        <span
          className={cn(
            'price-old text-onyx-300 nums-latin',
            SIZE[size].old,
          )}
        >
          {formatPrice(oldPrice!)}
          {!hideCurrency && <span className="ms-1 text-[0.7em] opacity-60">ر.س</span>}
        </span>
      )}

      {showOld && !hideDiscountBadge && percent > 0 && (
        <span className="inline-flex items-center rounded-full bg-rose/15 px-2 py-0.5 text-[0.65rem] font-semibold tracking-wider text-rose nums-latin">
          −{percent}%
        </span>
      )}
    </div>
  );
}
