'use client';

import { Tag, Truck } from 'lucide-react';
import type { CartTotals } from '@/types/cart';
import { formatSAR } from '@/lib/utils';
import { cn } from '@/lib/utils';

/**
 * CartSummary — ملخّص السلة
 * ─────────────────────────────────────────────────────
 * Pure presentational. Renders subtotal, savings, shipping line,
 * and the final grand total. Two density variants:
 *  - compact (drawer)
 *  - default (cart / checkout pages)
 */

export interface CartSummaryProps {
  totals: CartTotals;
  /** Compact = drawer footer */
  compact?: boolean;
  /** Inverse text for dark surfaces */
  inverse?: boolean;
  className?: string;
}

export function CartSummary({
  totals,
  compact = false,
  inverse = false,
  className,
}: CartSummaryProps) {
  return (
    <dl
      className={cn(
        'flex flex-col gap-2',
        compact ? 'text-sm' : 'text-base',
        inverse ? 'text-pearl' : 'text-onyx',
        className,
      )}
      aria-label="ملخص الطلب"
    >
      <Row
        label="المجموع الفرعي"
        value={formatSAR(totals.subtotal)}
        inverse={inverse}
      />
      {totals.discount > 0 && (
        <Row
          label="وفّرتي"
          value={`− ${formatSAR(totals.discount)}`}
          icon={<Tag size={13} strokeWidth={1.7} />}
          tone="success"
          inverse={inverse}
        />
      )}
      <Row
        label="الشحن"
        value={totals.deliveryFee === 0 ? 'مجاني' : formatSAR(totals.deliveryFee)}
        icon={<Truck size={13} strokeWidth={1.7} />}
        tone={totals.deliveryFee === 0 ? 'success' : undefined}
        inverse={inverse}
      />

      {/* Divider */}
      <div
        className={cn(
          'mt-2 border-t',
          inverse ? 'border-pearl/15' : 'border-onyx/10',
        )}
      />

      <div className="mt-2 flex items-baseline justify-between gap-3">
        <dt
          className={cn(
            'font-ruqaa',
            compact ? 'text-lg' : 'text-2xl',
          )}
        >
          الإجمالي
        </dt>
        <dd
          className={cn(
            'nums-latin font-tajawal font-semibold',
            compact ? 'text-lg' : 'text-2xl',
          )}
        >
          {formatSAR(totals.grandTotal)}
        </dd>
      </div>

      {!compact && (
        <p
          className={cn(
            'text-xs leading-loose mt-1',
            inverse ? 'text-pearl/60' : 'text-onyx-500',
          )}
        >
          شامل ضريبة القيمة المضافة · الدفع إلكترونياً فقط (مدى، Apple Pay،
          البطاقات الائتمانية، تابي وتمارا) — يُرسل الطلب عبر واتساب لتأكيد
          العنوان وإصدار رابط الدفع.
        </p>
      )}
    </dl>
  );
}

/* ─────────────────────────────────────────────────────
   Row helper
   ───────────────────────────────────────────────────── */

function Row({
  label,
  value,
  icon,
  tone,
  inverse,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  tone?: 'success' | 'danger';
  inverse?: boolean;
}) {
  const valueClass =
    tone === 'success'
      ? 'text-success'
      : tone === 'danger'
        ? 'text-danger'
        : '';

  return (
    <div className="flex items-center justify-between gap-3">
      <dt
        className={cn(
          'inline-flex items-center gap-1.5 font-tajawal',
          inverse ? 'text-pearl/75' : 'text-onyx-700',
        )}
      >
        {icon && (
          <span className={inverse ? 'text-pearl/60' : 'text-taupe'} aria-hidden>
            {icon}
          </span>
        )}
        {label}
      </dt>
      <dd className={cn('nums-latin font-tajawal font-medium', valueClass)}>
        {value}
      </dd>
    </div>
  );
}
