'use client';

import { motion } from 'framer-motion';
import type { AbayaCut, ProductCutOption } from '@/types/product';
import { cn } from '@/lib/utils';

/**
 * CutSelector — اختيار القصة
 * ─────────────────────────────────────────────────────
 * Pill-style cut chooser with subtle outline + champagne fill on selection.
 */

export interface CutSelectorProps {
  cuts: readonly ProductCutOption[];
  value: AbayaCut;
  onChange: (cut: AbayaCut) => void;
  className?: string;
}

export function CutSelector({
  cuts,
  value,
  onChange,
  className,
}: CutSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="اختيار قصة العباية"
      className={cn('flex flex-wrap gap-2.5', className)}
    >
      {cuts.map((opt) => {
        const selected = opt.cut === value;
        return (
          <button
            key={opt.cut}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={!opt.available}
            onClick={() => opt.available && onChange(opt.cut)}
            className={cn(
              'relative inline-flex items-center justify-center rounded-luxe border px-4 py-2.5 text-sm font-tajawal font-medium transition-all duration-300 ease-luxe',
              selected
                ? 'border-onyx bg-onyx text-pearl shadow-soft'
                : 'border-onyx/15 bg-pearl text-onyx hover:border-onyx hover:bg-onyx/5',
              !opt.available &&
                'opacity-40 cursor-not-allowed line-through',
            )}
          >
            {selected && (
              <motion.span
                layoutId="cut-active-ring"
                className="absolute inset-0 rounded-luxe ring-1 ring-champagne-400"
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                aria-hidden
              />
            )}
            <span className="relative">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
