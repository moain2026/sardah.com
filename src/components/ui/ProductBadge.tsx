import { Sparkles, Crown, Tag, Flame, X } from 'lucide-react';
import type { ProductBadge as BadgeType } from '@/types/product';
import { cn } from '@/lib/utils';

/**
 * ProductBadge — شارة المنتج
 * ─────────────────────────────────────────────────────
 * Display-only chip used on product cards / gallery overlays.
 */

export interface ProductBadgeProps {
  type: BadgeType;
  size?: 'sm' | 'md';
  className?: string;
}

const BADGE_META: Record<
  BadgeType,
  { label: string; classes: string; Icon: typeof Sparkles }
> = {
  new: {
    label: 'جديد',
    classes: 'bg-onyx text-pearl',
    Icon: Sparkles,
  },
  sale: {
    label: 'تخفيض',
    classes: 'bg-rose text-pearl',
    Icon: Tag,
  },
  bestseller: {
    label: 'الأكثر طلباً',
    classes: 'bg-gold-gradient text-onyx',
    Icon: Crown,
  },
  limited: {
    label: 'محدود',
    classes: 'bg-champagne-700 text-pearl',
    Icon: Flame,
  },
  soldout: {
    label: 'نفدت الكمية',
    classes: 'bg-onyx-300 text-pearl',
    Icon: X,
  },
};

export function ProductBadge({ type, size = 'sm', className }: ProductBadgeProps) {
  const meta = BADGE_META[type];
  const { Icon } = meta;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-tajawal font-semibold tracking-wider whitespace-nowrap select-none',
        size === 'sm' ? 'px-2.5 py-1 text-[0.65rem]' : 'px-3 py-1.5 text-xs',
        meta.classes,
        className,
      )}
    >
      <Icon size={size === 'sm' ? 11 : 13} strokeWidth={2} />
      {meta.label}
    </span>
  );
}

/**
 * ProductBadgeStack — يعرض عدّة شارات بدون ازدحام.
 */
export function ProductBadgeStack({
  badges,
  size = 'sm',
  className,
}: {
  badges: readonly BadgeType[];
  size?: 'sm' | 'md';
  className?: string;
}) {
  if (badges.length === 0) return null;
  return (
    <div className={cn('flex flex-wrap items-center gap-1.5', className)}>
      {badges.map((b) => (
        <ProductBadge key={b} type={b} size={size} />
      ))}
    </div>
  );
}
