'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  MessageCircle,
  Sparkles,
  ArrowLeft,
  RefreshCcw,
  Tag,
} from 'lucide-react';
import { useCartStore, useCartHydrated } from '@/store/cartStore';
import { CartLineItem } from './CartLineItem';
import { CartSummary } from './CartSummary';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { LuxuryCard } from '@/components/ui/LuxuryCard';
import { buildCheckoutUrl } from '@/lib/whatsapp';
import { SITE } from '@/lib/utils';

/**
 * OrderConfirmationView — تأكيد إرسال الطلب
 * ─────────────────────────────────────────────────────
 * Post-WhatsApp success state. The cart is preserved in case the
 * customer returns (e.g. closed WA tab by mistake) — they can
 * re-open the WhatsApp link or start a fresh order.
 */

export function OrderConfirmationView() {
  const hydrated = useCartHydrated();
  const items = useCartStore((s) => s.items);
  const totalsFn = useCartStore((s) => s.totals);
  const customer = useCartStore((s) => s.customer);
  const discountCode = useCartStore((s) => s.discountCode);
  const clear = useCartStore((s) => s.clear);
  const [reopenedAt, setReopenedAt] = useState<number | null>(null);

  // Confetti once on mount
  useEffect(() => {
    setReopenedAt(null);
  }, []);

  if (!hydrated) {
    return <ConfirmationSkeleton />;
  }

  const totals = totalsFn();
  const hasItems = items.length > 0;

  const reopenWhatsapp = () => {
    if (!customer || items.length === 0) return;
    const url = buildCheckoutUrl({
      items,
      totals,
      customer,
      discountCode: discountCode ?? SITE.discountCode,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
    setReopenedAt(Date.now());
  };

  const startNewOrder = () => {
    if (confirm('هل تريدين تفريغ السلة وبدء طلب جديد؟')) {
      clear();
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center gap-5"
      >
        <motion.span
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
          className="relative inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-champagne/30 via-sand/45 to-pearl text-success ring-1 ring-champagne/40"
          aria-hidden
        >
          <CheckCircle2 size={42} strokeWidth={1.6} />
          <Sparkles
            size={16}
            strokeWidth={1.5}
            className="absolute -top-1 -end-1 text-champagne-500"
          />
        </motion.span>

        <h1 className="font-ruqaa text-display-xl text-onyx">
          تم{' '}
          <span className="gradient-text-shimmer">إرسال طلبك</span>
        </h1>
        <p className="max-w-xl text-base text-onyx-500 leading-loose">
          فتحنا لكِ محادثة واتساب مع{' '}
          <span className="font-tajawal font-medium text-onyx">سردة</span> —
          أرسلي الرسالة لإصدار رابط الدفع الإلكتروني وتأكيد عنوان التسليم.
        </p>

        {customer && (
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-onyx-700">
            <span className="rounded-full border border-champagne/30 bg-sand/45 px-3 py-1 font-tajawal">
              {customer.name}
            </span>
            <span className="text-taupe/60" aria-hidden>·</span>
            <span className="rounded-full border border-champagne/30 bg-sand/45 px-3 py-1 font-tajawal">
              {customer.city}
            </span>
            <span className="text-taupe/60" aria-hidden>·</span>
            <span className="rounded-full border border-champagne/30 bg-sand/45 px-3 py-1 font-tajawal nums-latin" dir="ltr">
              {customer.phone}
            </span>
          </div>
        )}
      </motion.div>

      {/* Action card */}
      <LuxuryCard tone="ivory" className="p-6 md:p-8 max-w-2xl mx-auto w-full">
        <div className="flex flex-col items-center gap-5 text-center">
          <h2 className="font-ruqaa text-2xl text-onyx">
            لم تظهر نافذة واتساب؟
          </h2>
          <p className="text-sm text-onyx-500 leading-loose max-w-md">
            بعض المتصفحات تمنع فتح النوافذ تلقائياً — اضغطي الزر الذهبي لفتح
            محادثة واتساب مع تفاصيل طلبك جاهزة.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <MagneticButton
              variant="gold"
              size="lg"
              iconStart={<MessageCircle size={16} strokeWidth={1.7} />}
              onClick={reopenWhatsapp}
              disabled={!hasItems || !customer}
            >
              {reopenedAt ? 'فتح المحادثة مجدداً' : 'فتح واتساب الآن'}
            </MagneticButton>
            <MagneticButton href="/cart" variant="outline" size="md">
              تعديل السلة
            </MagneticButton>
          </div>
        </div>
      </LuxuryCard>

      {/* What's next */}
      <div className="grid md:grid-cols-3 gap-5 md:gap-7 max-w-3xl mx-auto w-full">
        <Step
          n="١"
          title="نتواصل معك"
          body="فريق سردة يردّ على رسالتك خلال ساعات العمل لتأكيد الطلب."
        />
        <Step
          n="٢"
          title="إصدار رابط الدفع"
          body="ستحصلين على رابط دفع إلكتروني (مدى، Apple Pay، تابي، تمارا)."
        />
        <Step
          n="٣"
          title="تجهيز وشحن"
          body="بعد الدفع، نحضّر القطعة ونشحنها مجاناً خلال ٥–١٣ يوم عمل."
        />
      </div>

      {/* Order recap */}
      {hasItems && (
        <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-8 lg:gap-12 items-start max-w-5xl mx-auto w-full">
          <section aria-label="مراجعة القطع المرسلة">
            <h3 className="font-ruqaa text-2xl text-onyx mb-5">
              ما تم إرساله
            </h3>
            <ul className="flex flex-col divide-y divide-onyx/8 rounded-luxe border border-onyx/8 bg-pearl-200/60 px-5 py-3">
              {items.map((item) => (
                <li key={item.lineId} className="py-4 first:pt-2 last:pb-2">
                  <CartLineItem item={item} dense />
                </li>
              ))}
            </ul>
          </section>

          <aside className="lg:sticky lg:top-28">
            <LuxuryCard tone="ivory" className="p-6 md:p-7">
              <CartSummary totals={totals} />
              <div className="mt-5 flex items-center gap-2 rounded-luxe bg-sand/45 border border-champagne/30 px-3.5 py-2.5">
                <Tag size={13} strokeWidth={1.7} className="text-champagne-700" />
                <span className="text-xs text-onyx-700">
                  كود الخصم{' '}
                  <span className="font-tajawal font-semibold text-champagne-700 nums-latin">
                    {discountCode ?? SITE.discountCode}
                  </span>{' '}
                  مفعّل
                </span>
              </div>
            </LuxuryCard>

            <button
              type="button"
              onClick={startNewOrder}
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-taupe hover:text-rose transition-colors w-full justify-center py-3 rounded-luxe border border-onyx/10 hover:border-rose/40 bg-pearl"
            >
              <RefreshCcw size={13} strokeWidth={1.7} />
              ابدئي طلباً جديداً (تفريغ السلة)
            </button>
          </aside>
        </div>
      )}

      {/* Continue shopping */}
      <div className="text-center">
        <Link
          href="/categories"
          className="inline-flex items-center gap-1.5 text-sm font-tajawal text-onyx-700 hover:text-champagne-700 transition-colors"
        >
          <ArrowLeft size={14} strokeWidth={1.7} />
          متابعة التسوّق في تشكيلات سردة
        </Link>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Step
   ───────────────────────────────────────────────────── */

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-luxe bg-pearl border border-onyx/8 p-5 text-center">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-onyx text-pearl font-ruqaa text-lg mb-3">
        {n}
      </span>
      <h4 className="font-tajawal font-semibold text-onyx mb-1.5">{title}</h4>
      <p className="text-xs text-onyx-500 leading-loose">{body}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Skeleton
   ───────────────────────────────────────────────────── */

function ConfirmationSkeleton() {
  return (
    <div className="flex flex-col items-center gap-6 animate-pulse">
      <div className="h-24 w-24 rounded-full bg-onyx/5" />
      <div className="h-9 w-72 rounded-luxe bg-onyx/5" />
      <div className="h-4 w-96 max-w-full rounded-luxe bg-onyx/5" />
      <div className="h-10 w-44 rounded-luxe bg-onyx/5" />
    </div>
  );
}
