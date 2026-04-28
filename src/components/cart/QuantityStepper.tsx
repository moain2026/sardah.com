'use client';

import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * QuantityStepper — عدّاد الكمية
 * ─────────────────────────────────────────────────────
 * Controlled +/- stepper with min/max clamps, accessible labels,
 * and a luxe outlined surface. RTL-natural (− on the right side
 * is "before" in reading order).
 */

export interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  /** Render in inverse (dark backgrounds) */
  inverse?: boolean;
  ariaLabel?: string;
  className?: string;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
  inverse = false,
  ariaLabel = 'الكمية',
  className,
}: QuantityStepperProps) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  const sizeClasses =
    size === 'sm'
      ? 'h-9 text-xs'
      : size === 'lg'
        ? 'h-12 text-base'
        : 'h-10 text-sm';

  const btnSize =
    size === 'sm' ? 'w-9' : size === 'lg' ? 'w-12' : 'w-10';

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-stretch select-none rounded-luxe border overflow-hidden transition-colors',
        inverse
          ? 'border-pearl/15 bg-pearl/5 text-pearl'
          : 'border-onyx/15 bg-pearl text-onyx',
        sizeClasses,
        className,
      )}
    >
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="تقليل الكمية"
        className={cn(
          'flex items-center justify-center transition-colors',
          btnSize,
          value <= min
            ? 'opacity-40 cursor-not-allowed'
            : inverse
              ? 'hover:bg-pearl/10'
              : 'hover:bg-onyx/5',
        )}
      >
        <Minus size={size === 'sm' ? 13 : 15} strokeWidth={1.7} />
      </button>

      <span
        className={cn(
          'min-w-[2.4rem] flex items-center justify-center font-tajawal font-semibold nums-latin border-x',
          inverse ? 'border-pearl/12' : 'border-onyx/8',
        )}
        aria-live="polite"
      >
        {value}
      </span>

      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label="زيادة الكمية"
        className={cn(
          'flex items-center justify-center transition-colors',
          btnSize,
          value >= max
            ? 'opacity-40 cursor-not-allowed'
            : inverse
              ? 'hover:bg-pearl/10'
              : 'hover:bg-onyx/5',
        )}
      >
        <Plus size={size === 'sm' ? 13 : 15} strokeWidth={1.7} />
      </button>
    </div>
  );
}
