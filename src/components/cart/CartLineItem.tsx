'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Sparkles } from 'lucide-react';
import { useState } from 'react';
import type { CartItem } from '@/types/cart';
import { useCartStore } from '@/store/cartStore';
import { QuantityStepper } from './QuantityStepper';
import { PriceTag } from '@/components/ui/PriceTag';
import { cn } from '@/lib/utils';

/**
 * CartLineItem — صف عنصر في السلة
 * ─────────────────────────────────────────────────────
 * One row in the drawer or /cart page:
 *  [thumb]  name + code   [stepper]
 *           cut · size                [price]
 *           free-tarha pill          [remove]
 *
 * Falls back to a stylised placeholder if the image fails to load.
 */

export interface CartLineItemProps {
  item: CartItem;
  /** Compact density for the drawer */
  dense?: boolean;
  className?: string;
}

export function CartLineItem({ item, dense = false, className }: CartLineItemProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const [imgError, setImgError] = useState(false);

  const hasImage = !!item.image?.src && !imgError;

  return (
    <article
      className={cn(
        'flex items-start gap-3 md:gap-4',
        dense ? '' : 'py-2',
        className,
      )}
      aria-label={`${item.productName} — ${item.cutLabel} — مقاس ${item.sizeLabel}`}
    >
      {/* Thumb */}
      <Link
        href={`/products/${item.productSlug}`}
        className={cn(
          'relative shrink-0 overflow-hidden rounded-luxe ring-1 ring-onyx/8 bg-sand/35',
          dense ? 'w-[72px] h-[96px]' : 'w-[88px] h-[120px] md:w-[96px] md:h-[128px]',
        )}
      >
        {hasImage ? (
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes={dense ? '72px' : '96px'}
            className="object-cover"
            placeholder={item.image.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={item.image.blurDataURL}
            onError={() => setImgError(true)}
          />
        ) : (
          <PlaceholderMonogram code={item.productCode} />
        )}
      </Link>

      {/* Body */}
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <span className="block text-[0.65rem] tracking-[0.22em] uppercase text-taupe nums-latin">
              {item.productCode}
            </span>
            <Link
              href={`/products/${item.productSlug}`}
              className="block font-ruqaa text-base md:text-lg leading-snug text-onyx hover:text-champagne-700 transition-colors line-clamp-2"
            >
              {item.productName}
            </Link>
          </div>

          {/* Remove */}
          <button
            type="button"
            onClick={() => removeItem(item.lineId)}
            aria-label={`حذف ${item.productName} من السلة`}
            className="p-1.5 -mt-1 -me-1 rounded-luxe text-taupe hover:text-rose hover:bg-rose/10 transition-colors"
          >
            <Trash2 size={14} strokeWidth={1.7} />
          </button>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-1.5 flex-wrap text-[0.7rem] text-onyx-500">
          <span className="rounded-full bg-sand/60 px-2 py-0.5 font-tajawal">
            {item.cutLabel}
          </span>
          <span className="text-taupe/40" aria-hidden>·</span>
          <span className="rounded-full bg-sand/60 px-2 py-0.5 font-tajawal nums-latin">
            مقاس {item.sizeLabel}
          </span>
          {item.includesTarha && (
            <span className="inline-flex items-center gap-1 rounded-full bg-champagne/15 text-champagne-700 px-2 py-0.5 font-tajawal text-[0.65rem]">
              <Sparkles size={9} strokeWidth={2} />
              طرحة مجانية
            </span>
          )}
        </div>

        {/* Note (non-dense) */}
        {!dense && item.note && (
          <p className="text-xs text-onyx-500 leading-relaxed bg-pearl-200 rounded-luxe px-3 py-2 mt-1">
            <span className="text-[0.62rem] tracking-[0.2em] uppercase text-taupe block mb-0.5">
              ملاحظتك
            </span>
            {item.note}
          </p>
        )}

        {/* Footer row: stepper + price */}
        <div className="mt-2 flex items-center justify-between gap-3">
          <QuantityStepper
            value={item.quantity}
            onChange={(q) => updateQuantity(item.lineId, q)}
            min={1}
            max={9}
            size="sm"
          />
          <div className="text-end">
            <PriceTag
              price={item.unitPrice * item.quantity}
              oldPrice={
                item.oldUnitPrice
                  ? item.oldUnitPrice * item.quantity
                  : undefined
              }
              size={dense ? 'sm' : 'md'}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────
   Stylised placeholder when an image 404s
   ───────────────────────────────────────────────────── */

function PlaceholderMonogram({ code }: { code: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-gradient-to-br from-sand/65 via-pearl to-sand/45">
      <span className="font-ruqaa text-2xl text-champagne-700">س</span>
      <span className="text-[0.6rem] tracking-[0.18em] text-taupe nums-latin">
        {code}
      </span>
    </div>
  );
}
