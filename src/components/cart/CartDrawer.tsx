'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  X,
  ArrowLeft,
  ShieldCheck,
  Truck,
  Tag,
} from 'lucide-react';
import { useCartStore, useCartHydrated } from '@/store/cartStore';
import { CartLineItem } from './CartLineItem';
import { CartSummary } from './CartSummary';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { SITE } from '@/lib/utils';

/**
 * CartDrawer — درج السلة
 * ─────────────────────────────────────────────────────
 * Slide-in drawer mounted globally in `RootLayout`.
 * Subscribes to `useCartStore` for `isOpen` + items + totals.
 * Locks body scroll while open and traps focus to itself.
 *
 * Two CTAs at the bottom:
 *  - متابعة عبر واتساب  (one-tap → opens /checkout to capture
 *    customer info before generating the WhatsApp link)
 *  - عرض السلة          (full /cart page)
 */
export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const totalsFn = useCartStore((s) => s.totals);
  const hydrated = useCartHydrated();

  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, closeCart]);

  const totals = hydrated ? totalsFn() : null;
  const isEmpty = !hydrated || items.length === 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="cart-overlay"
            className="fixed inset-0 z-[80] bg-onyx/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            aria-hidden
          />

          {/* Drawer */}
          <motion.aside
            key="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="سلة المشتريات"
            className="fixed inset-y-0 start-0 z-[90] w-full sm:w-[440px] max-w-[100vw] bg-pearl shadow-editorial flex flex-col"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <header className="flex items-center justify-between gap-3 px-5 md:px-6 h-[72px] border-b border-onyx/8 shrink-0">
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={18} strokeWidth={1.7} className="text-champagne-700" />
                <span className="font-ruqaa text-2xl text-onyx">سلتك</span>
                {hydrated && items.length > 0 && (
                  <span className="nums-latin text-[0.7rem] text-taupe">
                    ({totals?.totalItems})
                  </span>
                )}
              </div>
              <button
                type="button"
                aria-label="إغلاق السلة"
                onClick={closeCart}
                className="p-2 -me-2 rounded-luxe hover:bg-onyx/5 transition-colors"
              >
                <X size={20} strokeWidth={1.6} />
              </button>
            </header>

            {/* Body */}
            {isEmpty ? (
              <CartDrawerEmpty onContinue={closeCart} />
            ) : (
              <>
                {/* Line items */}
                <div className="flex-1 overflow-y-auto px-5 md:px-6 py-4">
                  <ul className="flex flex-col divide-y divide-onyx/6">
                    {items.map((item) => (
                      <li key={item.lineId} className="py-4 first:pt-0">
                        <CartLineItem item={item} dense />
                      </li>
                    ))}
                  </ul>

                  {/* Reassurance row */}
                  <div className="mt-6 grid grid-cols-3 gap-2 text-[0.65rem] text-onyx-700 leading-tight">
                    <Bullet icon={<Truck size={13} />} label="شحن مجاني" />
                    <Bullet icon={<ShieldCheck size={13} />} label="جودة عالية" />
                    <Bullet
                      icon={<Tag size={13} />}
                      label={`كود ${SITE.discountCode}`}
                    />
                  </div>
                </div>

                {/* Footer */}
                {totals && (
                  <footer className="border-t border-onyx/8 bg-pearl/95 backdrop-blur-glass px-5 md:px-6 py-4 shrink-0">
                    <CartSummary totals={totals} compact />
                    <div className="mt-4 flex flex-col gap-2.5">
                      <MagneticButton
                        href="/checkout"
                        variant="onyx"
                        size="lg"
                        block
                        onClick={closeCart}
                      >
                        متابعة عبر واتساب
                      </MagneticButton>
                      <Link
                        href="/cart"
                        onClick={closeCart}
                        className="inline-flex items-center justify-center gap-1.5 text-sm font-tajawal font-medium text-onyx-700 hover:text-champagne-700 transition-colors py-2"
                      >
                        عرض السلة كاملة
                        <ArrowLeft size={14} strokeWidth={1.7} />
                      </Link>
                    </div>
                  </footer>
                )}
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────
   Empty state
   ───────────────────────────────────────────────────── */

function CartDrawerEmpty({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-8 py-10 gap-5">
      <span
        className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-sand/45 text-champagne-700"
        aria-hidden
      >
        <ShoppingBag size={32} strokeWidth={1.4} />
      </span>
      <div className="flex flex-col gap-2">
        <h3 className="font-ruqaa text-display-md text-onyx">سلتك بانتظارك</h3>
        <p className="text-sm text-onyx-500 leading-loose max-w-xs">
          ابدئي بإضافة قطع من تشكيلتنا الفاخرة وستظهر هنا.
        </p>
      </div>
      <div className="flex flex-col gap-2 w-full max-w-xs mt-2">
        <MagneticButton
          href="/categories/abayas"
          variant="onyx"
          size="md"
          block
          onClick={onContinue}
        >
          تصفّحي العبايات
        </MagneticButton>
        <MagneticButton
          href="/categories/sale"
          variant="outline"
          size="md"
          block
          onClick={onContinue}
        >
          تخفيضات سردة
        </MagneticButton>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Tiny bullet
   ───────────────────────────────────────────────────── */

function Bullet({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center justify-center gap-1.5 rounded-luxe bg-sand/45 border border-champagne/30 px-2 py-2 text-center">
      <span className="text-champagne-700 shrink-0" aria-hidden>
        {icon}
      </span>
      <span className="font-tajawal truncate">{label}</span>
    </div>
  );
}
