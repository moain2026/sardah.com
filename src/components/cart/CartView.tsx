'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowLeft, Trash2, MessageCircle } from 'lucide-react';
import { useCartStore, useCartHydrated } from '@/store/cartStore';
import { CartLineItem } from './CartLineItem';
import { CartSummary } from './CartSummary';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { LuxuryCard } from '@/components/ui/LuxuryCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CategoryCard } from '@/components/category/CategoryCard';
import { getOrderedCategories } from '@/lib/categories';
import { SITE } from '@/lib/utils';

/**
 * CartView — العرض الكامل للسلة
 * ─────────────────────────────────────────────────────
 * Used on `/cart`. Two-column lockup at lg+: line items on the left,
 * sticky summary on the right. While the store is rehydrating from
 * localStorage we render an editorial skeleton so layout doesn't
 * jank into the empty state.
 */

export function CartView() {
  const hydrated = useCartHydrated();
  const items = useCartStore((s) => s.items);
  const totalsFn = useCartStore((s) => s.totals);
  const clear = useCartStore((s) => s.clear);

  if (!hydrated) {
    return <CartSkeleton />;
  }

  if (items.length === 0) {
    return <CartEmptyState />;
  }

  const totals = totalsFn();

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-8 lg:gap-12 items-start">
      {/* Items column */}
      <section
        aria-label="قطع السلة"
        className="min-w-0"
      >
        <header className="flex items-center justify-between gap-3 pb-5 mb-5 border-b border-onyx/8">
          <h2 className="font-ruqaa text-2xl text-onyx">
            القطع المختارة{' '}
            <span className="nums-latin text-base text-taupe align-middle">
              ({totals.totalItems})
            </span>
          </h2>
          <button
            type="button"
            onClick={() => {
              if (confirm('هل أنتِ متأكدة من تفريغ السلة؟')) clear();
            }}
            className="inline-flex items-center gap-1.5 text-xs text-taupe hover:text-rose transition-colors"
          >
            <Trash2 size={13} strokeWidth={1.7} />
            إفراغ السلة
          </button>
        </header>

        <ul className="flex flex-col divide-y divide-onyx/8">
          {items.map((item, i) => (
            <motion.li
              key={item.lineId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.2) }}
              className="py-5 first:pt-0"
            >
              <CartLineItem item={item} />
            </motion.li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between">
          <Link
            href="/categories/abayas"
            className="inline-flex items-center gap-1.5 text-sm font-tajawal text-onyx-700 hover:text-champagne-700 transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={1.7} />
            متابعة التسوق
          </Link>
          <span className="text-[0.7rem] text-taupe nums-latin">
            كود {SITE.discountCode} مفعّل افتراضياً
          </span>
        </div>
      </section>

      {/* Summary column */}
      <aside aria-label="ملخّص الطلب" className="lg:sticky lg:top-28">
        <LuxuryCard tone="ivory" className="p-6 md:p-7">
          <div className="flex items-center gap-2 text-champagne-700 mb-4">
            <ShoppingBag size={16} strokeWidth={1.7} />
            <span className="text-[0.7rem] tracking-[0.22em] uppercase font-tajawal">
              ملخّص الطلب
            </span>
          </div>

          <CartSummary totals={totals} />

          <div className="mt-6 flex flex-col gap-2.5">
            <MagneticButton
              href="/checkout"
              variant="onyx"
              size="lg"
              block
              iconStart={<MessageCircle size={16} strokeWidth={1.7} />}
            >
              متابعة عبر واتساب
            </MagneticButton>
            <p className="text-[0.65rem] tracking-wide text-taupe text-center mt-1 leading-loose">
              خطوة واحدة لتأكيد الطلب — نتواصل معك مباشرة لاستكمال الدفع والتسليم.
            </p>
          </div>
        </LuxuryCard>

        {/* Reassurance card */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-[0.65rem] text-onyx-700 leading-tight">
          <Bullet label="شحن مجاني" sub="داخل المملكة" />
          <Bullet label="جودة عالية" sub="أقمشة كورية" />
          <Bullet label="٥–١٣ يوم" sub="مدّة التحضير" />
        </div>
      </aside>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Empty state
   ───────────────────────────────────────────────────── */

function CartEmptyState() {
  const featured = getOrderedCategories().slice(0, 3);
  return (
    <div className="flex flex-col items-center text-center gap-8 py-10">
      <div className="flex flex-col items-center gap-5 max-w-md">
        <span
          className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-sand/45 text-champagne-700"
          aria-hidden
        >
          <ShoppingBag size={36} strokeWidth={1.4} />
        </span>
        <SectionHeading
          align="center"
          size="lg"
          eyebrow="سلتك"
          title={
            <>
              <span className="gradient-text-shimmer">سلتك بانتظارك</span>
            </>
          }
          intro="ابدئي بتصفّح تشكيلتنا الفاخرة وستظهر القطع التي تختارينها هنا."
        />
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-2">
          <MagneticButton href="/categories/abayas" variant="onyx" size="md">
            تصفّحي العبايات
          </MagneticButton>
          <MagneticButton href="/categories/sale" variant="outline" size="md">
            تخفيضات سردة
          </MagneticButton>
        </div>
      </div>

      {/* Featured discovery */}
      <div className="w-full pt-12 mt-4 border-t border-onyx/8">
        <SectionHeading
          align="center"
          size="md"
          eyebrow="استكشفي"
          title={
            <>
              تشكيلتنا{' '}
              <span className="gradient-text-shimmer">المختارة</span>
            </>
          }
        />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-7">
          {featured.map((cat, i) => (
            <CategoryCard key={cat.slug} category={cat} index={i} size="md" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Skeleton (during rehydration)
   ───────────────────────────────────────────────────── */

function CartSkeleton() {
  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-8 lg:gap-12 items-start animate-pulse">
      <div className="flex flex-col gap-5">
        <div className="h-7 w-44 rounded-luxe bg-onyx/5" />
        <div className="h-px w-full bg-onyx/8" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex gap-4">
            <div className="w-[88px] h-[120px] rounded-luxe bg-onyx/5" />
            <div className="flex-1 flex flex-col gap-2">
              <div className="h-3 w-16 rounded-luxe bg-onyx/5" />
              <div className="h-5 w-2/3 rounded-luxe bg-onyx/5" />
              <div className="h-3 w-1/2 rounded-luxe bg-onyx/5" />
              <div className="mt-3 h-9 w-32 rounded-luxe bg-onyx/5" />
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-luxe bg-onyx/5 h-[280px]" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Bullet (reassurance under summary)
   ───────────────────────────────────────────────────── */

function Bullet({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="rounded-luxe border border-champagne/30 bg-sand/45 p-3 text-center">
      <div className="font-tajawal font-semibold text-onyx text-xs">
        {label}
      </div>
      <div className="text-[0.62rem] tracking-wide text-taupe mt-0.5">
        {sub}
      </div>
    </div>
  );
}
