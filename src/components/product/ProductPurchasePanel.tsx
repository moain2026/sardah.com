'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  CheckCircle2,
  Sparkles,
  Ruler,
  ShieldCheck,
  Truck,
  Tag,
} from 'lucide-react';
import type { Product, AbayaCut } from '@/types/product';
import { CutSelector } from './CutSelector';
import { SizeSelector } from './SizeSelector';
import { QuantityStepper } from '@/components/cart/QuantityStepper';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { PriceTag } from '@/components/ui/PriceTag';
import { RatingStars } from '@/components/ui/RatingStars';
import { ProductBadgeStack } from '@/components/ui/ProductBadge';
import { SizeGuideModal } from '@/components/marketing/SizeGuideModal';
import { useCartStore } from '@/store/cartStore';
import { cn, SITE } from '@/lib/utils';

/**
 * ProductPurchasePanel — لوحة الشراء
 * ─────────────────────────────────────────────────────
 * Right-side product detail panel: name + code, rating, price,
 * cut + size + quantity selectors, "Add to cart" CTA, customer
 * note input, free-tarha + reassurance bullets, size-guide trigger.
 *
 * This is the only client component on /products/[slug] — the rest
 * (gallery, breadcrumbs, related grid) is rendered server-side.
 */

export interface ProductPurchasePanelProps {
  product: Product;
}

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const [cut, setCut] = useState<AbayaCut>(product.defaultCut);
  const [size, setSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [touchedSize, setTouchedSize] = useState(false);

  const addItem = useCartStore((s) => s.addItem);

  const canAdd = useMemo(
    () => !product.isSoldOut && size !== null,
    [product.isSoldOut, size],
  );

  const handleAdd = () => {
    if (!canAdd || size === null) {
      setTouchedSize(true);
      return;
    }
    addItem({
      product,
      cut,
      size,
      quantity,
      note: note.trim() ? note.trim() : undefined,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  };

  return (
    <div className="flex flex-col gap-7" aria-labelledby="product-title">
      {/* Header */}
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[0.7rem] tracking-[0.32em] uppercase text-taupe nums-latin">
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
          className="font-ruqaa text-display-md text-onyx leading-tight"
        >
          {product.name}
        </h1>

        <div className="flex items-center gap-3 flex-wrap">
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

      {/* Price */}
      <div>
        <PriceTag price={product.price} oldPrice={product.oldPrice} size="xl" />
        <p className="mt-2 text-[0.72rem] text-onyx-500 tracking-wide">
          شامل ضريبة القيمة المضافة · شحن مجاني داخل المملكة
        </p>
      </div>

      <div className="gold-divider" />

      {/* Description */}
      {product.description && (
        <p className="text-sm md:text-[0.95rem] leading-loose text-onyx-700 font-plex">
          {product.description}
        </p>
      )}

      {/* Cut selector */}
      {product.cuts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-tajawal text-sm font-semibold tracking-wide">
              القصة
            </h2>
            <span className="text-[0.7rem] text-taupe">
              المختارة:{' '}
              <span className="text-onyx font-medium">
                {product.cuts.find((c) => c.cut === cut)?.label ?? cut}
              </span>
            </span>
          </div>
          <CutSelector cuts={product.cuts} value={cut} onChange={setCut} />
        </section>
      )}

      {/* Size selector */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-tajawal text-sm font-semibold tracking-wide">
            المقاس
          </h2>
          <button
            type="button"
            onClick={() => setSizeGuideOpen(true)}
            className="inline-flex items-center gap-1.5 text-[0.72rem] text-champagne-700 hover:text-champagne-500 transition-colors"
          >
            <Ruler size={12} strokeWidth={1.7} />
            دليل المقاسات
          </button>
        </div>
        <SizeSelector
          sizes={product.sizes}
          value={size}
          onChange={(v) => {
            setSize(v);
            setTouchedSize(true);
          }}
        />
        {touchedSize && size === null && !product.isSoldOut && (
          <p className="mt-2 text-xs text-rose">يرجى اختيار المقاس قبل الإضافة للسلة.</p>
        )}
      </section>

      {/* Quantity + Add to cart */}
      <section className="flex flex-wrap items-center gap-4">
        <div>
          <span className="block mb-3 font-tajawal text-sm font-semibold tracking-wide">
            الكمية
          </span>
          <QuantityStepper value={quantity} onChange={setQuantity} min={1} max={9} />
        </div>

        <div className="flex-1 min-w-[16rem]">
          <span className="block mb-3 font-tajawal text-sm font-semibold tracking-wide opacity-0 select-none">
            ـ
          </span>
          <AnimatePresence mode="wait" initial={false}>
            {justAdded ? (
              <motion.div
                key="added"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                className="inline-flex items-center justify-center gap-2 magnetic-button magnetic-button-gold w-full"
                aria-live="polite"
              >
                <CheckCircle2 size={18} strokeWidth={1.8} />
                تمت الإضافة للسلة
              </motion.div>
            ) : (
              <motion.div
                key="cta"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.35 }}
              >
                <MagneticButton
                  variant={product.isSoldOut ? 'outline' : 'onyx'}
                  size="lg"
                  block
                  disabled={product.isSoldOut}
                  iconStart={<ShoppingBag size={16} strokeWidth={1.7} />}
                  onClick={handleAdd}
                >
                  {product.isSoldOut ? 'نفدت الكمية حالياً' : 'إضافة للسلة'}
                </MagneticButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Customer note */}
      {product.customizationAllowed && !product.isSoldOut && (
        <section>
          <label
            htmlFor="customer-note"
            className="flex items-center justify-between mb-2 font-tajawal text-sm font-semibold tracking-wide"
          >
            <span className="flex items-center gap-2">
              ملاحظة على الطلب
              <span className="text-[0.65rem] text-taupe font-normal">
                (اختياري)
              </span>
            </span>
            <span className="nums-latin text-[0.65rem] text-taupe">
              {note.length}/180
            </span>
          </label>
          <textarea
            id="customer-note"
            value={note}
            onChange={(e) => setNote(e.target.value.slice(0, 180))}
            placeholder={product.notesPlaceholder}
            rows={2}
            className="w-full rounded-luxe border border-onyx/12 bg-pearl px-4 py-3 text-sm leading-relaxed text-onyx placeholder:text-taupe focus:outline-none focus:border-champagne-500 transition-colors"
          />
        </section>
      )}

      {/* Reassurance bullets */}
      <section
        className="grid grid-cols-2 gap-3 rounded-luxe bg-sand/35 border border-champagne/30 p-4 mt-2"
        aria-label="ضمانات الطلب"
      >
        <Bullet icon={<ShieldCheck size={14} />} label="خياطة نظيفة وأقمشة كورية" />
        <Bullet icon={<Truck size={14} />} label="شحن مجاني داخل المملكة" />
        {product.includesTarha && (
          <Bullet icon={<Sparkles size={14} />} label="طرحة مجانية مع التصميم" />
        )}
        <Bullet
          icon={<Tag size={14} />}
          label={`كود الخصم: ${SITE.discountCode}`}
        />
      </section>

      {/* Specs strip */}
      <dl className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4 text-xs border-t border-onyx/8 pt-5">
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
    <div className="flex items-center gap-2 text-xs text-onyx-700 leading-snug">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-pearl text-champagne-700 shrink-0">
        {icon}
      </span>
      <span className="truncate">{label}</span>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <dt className="text-[0.65rem] tracking-[0.2em] uppercase text-taupe">
        {label}
      </dt>
      <dd className="font-tajawal font-medium text-onyx-700 truncate">{value}</dd>
    </div>
  );
}
