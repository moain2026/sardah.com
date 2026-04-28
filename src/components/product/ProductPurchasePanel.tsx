'use client';

import { useState, useMemo } from 'react';
import {
  MessageCircle,
  Sparkles,
  Ruler,
  ShieldCheck,
  Truck,
  Heart,
} from 'lucide-react';
import type { Product, AbayaCut } from '@/types/product';
import { CutSelector } from './CutSelector';
import { SizeSelector } from './SizeSelector';
import { PriceTag } from '@/components/ui/PriceTag';
import { RatingStars } from '@/components/ui/RatingStars';
import { ProductBadgeStack } from '@/components/ui/ProductBadge';
import { SizeGuideModal } from '@/components/marketing/SizeGuideModal';
import { SITE, buildWhatsAppUrl } from '@/lib/utils';

/**
 * ProductPurchasePanel — لوحة المنتج (نسخة الموقع الترويجي)
 * ─────────────────────────────────────────────────────
 * Shows the product's editorial details (name, code, price-as-reference,
 * rating, cut & size selectors, fabric specs, story bullets).
 *
 * The single CTA is **WhatsApp**: it pre-fills a luxe enquiry message
 * with all the chosen details so the boutique can respond personally.
 *
 * No cart, no add-to-cart, no quantity stepper, no checkout.
 */

export interface ProductPurchasePanelProps {
  product: Product;
}

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const [cut, setCut] = useState<AbayaCut>(product.defaultCut);
  const [size, setSize] = useState<number | null>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const selectedCutLabel = useMemo(
    () => product.cuts.find((c) => c.cut === cut)?.label ?? cut,
    [product.cuts, cut],
  );

  // Build a personalised WhatsApp enquiry
  const whatsappUrl = useMemo(() => {
    const sizeLine = size !== null ? `• المقاس: ${size}` : '';
    const message = [
      'مرحباً سردة 🌿',
      `أحبّ أعرف تفاصيل أكثر عن:`,
      `• ${product.name}`,
      `• الكود: ${product.code}`,
      `• القصة: ${selectedCutLabel}`,
      sizeLine,
      `• القماش: ${product.fabric}`,
    ]
      .filter(Boolean)
      .join('\n');
    return buildWhatsAppUrl(SITE.whatsapp, message);
  }, [product, selectedCutLabel, size]);

  return (
    <div className="flex flex-col gap-7" aria-labelledby="product-title">
      {/* Header */}
      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="nums-latin text-[0.7rem] uppercase tracking-[0.32em] text-taupe">
            {product.code}
          </span>
          {product.subtitle && (
            <>
              <span className="text-taupe/60" aria-hidden>
                ·
              </span>
              <span className="text-xs text-onyx-500">{product.subtitle}</span>
            </>
          )}
        </div>

        <h1
          id="product-title"
          className="font-ruqaa text-3xl leading-tight text-onyx md:text-display-md"
        >
          {product.name}
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          {product.rating && (
            <RatingStars
              value={product.rating}
              showValue
              reviewsCount={product.reviewsCount}
              size="sm"
            />
          )}
          {product.badges.length > 0 && (
            <ProductBadgeStack badges={product.badges} size="sm" />
          )}
        </div>
      </header>

      {/* Reference price */}
      <div>
        <span className="font-tajawal text-[10px] uppercase tracking-[0.32em] text-taupe">
          السعر للعرض فقط
        </span>
        <div className="mt-2">
          <PriceTag price={product.price} oldPrice={product.oldPrice} size="xl" />
        </div>
        <p className="mt-2 text-[0.72rem] tracking-wide text-onyx-500">
          للطلب أو السؤال عن التوفر — تواصلي معنا مباشرة عبر واتساب.
        </p>
      </div>

      <div className="gold-divider" />

      {/* Description */}
      {product.description && (
        <p className="font-plex text-sm leading-loose text-onyx-700 md:text-[0.95rem]">
          {product.description}
        </p>
      )}

      {/* Cut selector */}
      {product.cuts.length > 0 && (
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-tajawal text-sm font-semibold tracking-wide">
              القصة
            </h2>
            <span className="text-[0.7rem] text-taupe">
              المختارة:{' '}
              <span className="font-medium text-onyx">{selectedCutLabel}</span>
            </span>
          </div>
          <CutSelector cuts={product.cuts} value={cut} onChange={setCut} />
        </section>
      )}

      {/* Size selector */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-tajawal text-sm font-semibold tracking-wide">
            المقاس
          </h2>
          <button
            type="button"
            onClick={() => setSizeGuideOpen(true)}
            className="inline-flex items-center gap-1.5 text-[0.72rem] text-champagne-700 transition-colors hover:text-champagne-500"
          >
            <Ruler size={12} strokeWidth={1.7} />
            دليل المقاسات
          </button>
        </div>
        <SizeSelector
          sizes={product.sizes}
          value={size}
          onChange={setSize}
        />
      </section>

      {/* Primary WhatsApp CTA */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="واتساب"
        className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-onyx-950 px-8 py-5 font-tajawal text-sm font-semibold uppercase tracking-[0.18em] text-pearl-50 transition-shadow duration-500 hover:shadow-[0_18px_40px_-12px_rgba(8,8,8,0.55)]"
      >
        <MessageCircle size={18} strokeWidth={1.8} />
        <span>اطلبي عبر واتساب</span>
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="-mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-champagne-500/40 bg-champagne-400/5 px-6 py-3.5 font-tajawal text-xs tracking-[0.18em] text-champagne-700 transition-colors hover:bg-champagne-400/15"
      >
        <Heart size={14} strokeWidth={1.8} />
        <span>أحجز هذه القطعة لي</span>
      </a>

      {/* Reassurance bullets */}
      <section
        className="mt-2 grid grid-cols-1 gap-3 rounded-luxe border border-champagne/30 bg-sand/35 p-5 sm:grid-cols-2"
        aria-label="ضمانات سردة"
      >
        <Bullet icon={<ShieldCheck size={14} />} label="خياطة نظيفة وأقمشة كورية" />
        <Bullet icon={<Truck size={14} />} label="شحن داخل المملكة" />
        {product.includesTarha && (
          <Bullet icon={<Sparkles size={14} />} label="طرحة مجانية مع التصميم" />
        )}
        <Bullet
          icon={<Heart size={14} />}
          label="تواصل خاص ومتابعة من البوتيك"
        />
      </section>

      {/* Specs strip */}
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-onyx/8 pt-5 text-xs sm:grid-cols-3">
        <Spec label="القماش" value={product.fabric} />
        <Spec label="القفلة" value={product.closureLabel} />
        <Spec label="اللون" value={product.color} />
      </dl>

      {/* Size-guide modal */}
      <SizeGuideModal
        open={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        highlightedSize={size ?? undefined}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Tiny presentational helpers
   ───────────────────────────────────────────────────── */

function Bullet({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs leading-snug text-onyx-700">
      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pearl text-champagne-700">
        {icon}
      </span>
      <span className="truncate">{label}</span>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-taupe">
        {label}
      </dt>
      <dd className="truncate font-tajawal font-medium text-onyx-700">{value}</dd>
    </div>
  );
}
