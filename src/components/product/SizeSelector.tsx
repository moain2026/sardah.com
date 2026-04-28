'use client';

import { motion } from 'framer-motion';
import type { ProductSize } from '@/types/product';
import { cn } from '@/lib/utils';

/**
 * SizeSelector — اختيار المقاس
 * ─────────────────────────────────────────────────────
 * Square chip-style size picker. Unavailable sizes are dimmed
 * with a diagonal strike. Numeric values shown in Latin numerals
 * for universal legibility.
 */

export interface SizeSelectorProps {
  sizes: readonly ProductSize[];
  value: number | null;
  onChange: (size: number) => void;
  className?: string;
}

export function SizeSelector({
  sizes,
  value,
  onChange,
  className,
}: SizeSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="اختيار المقاس"
      className={cn('grid grid-cols-6 gap-2 sm:gap-3 max-w-md', className)}
    >
      {sizes.map((s) => {
        const selected = value === s.value;
        return (
          <button
            key={s.value}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={!s.available}
            onClick={() => s.available && onChange(s.value)}
            className={cn(
              'relative aspect-square rounded-luxe border font-tajawal font-semibold text-sm tracking-tight nums-latin transition-all duration-300 ease-luxe',
              selected
                ? 'border-onyx bg-onyx text-pearl shadow-soft'
                : 'border-onyx/15 bg-pearl text-onyx hover:border-onyx hover:bg-onyx/5',
              !s.available && 'opacity-40 cursor-not-allowed',
            )}
            title={!s.available ? 'غير متوفر' : undefined}
          >
            {selected && (
              <motion.span
                layoutId="size-active-ring"
                className="absolute inset-0 rounded-luxe ring-1 ring-champagne-400"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                aria-hidden
              />
            )}
            <span className="relative">{s.value}</span>
            {!s.available && (
              <span
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                aria-hidden
              >
                <span className="block h-px w-[140%] -rotate-45 bg-onyx/35" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
