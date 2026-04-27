'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, User } from 'lucide-react';
import { cn, SITE } from '@/lib/utils';
import { CATEGORIES } from '@/lib/categories';
import { useCartCount, useCartHydrated, useCartStore } from '@/store/cartStore';

/**
 * HeaderLuxury — هيدر فاخر
 * ─────────────────────────────────────────────────────
 * Sticky, glass-morphic on scroll. Three-zone RTL layout:
 *   [right] logo + brand    [center] nav    [left] search/wishlist/cart/account
 * Mobile: collapses to a hamburger drawer.
 *
 * Connects to cart store for the live count badge.
 */

export interface HeaderLuxuryProps {
  className?: string;
}

const NAV_ITEMS = CATEGORIES.map((c) => ({
  href: `/categories/${c.slug}`,
  label: c.name,
}));

export function HeaderLuxury({ className }: HeaderLuxuryProps) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const cartCount = useCartCount();
  const hydrated = useCartHydrated();
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  return (
    <motion.header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-500 ease-luxe',
        scrolled
          ? 'glass-panel border-b border-onyx/8'
          : 'bg-transparent border-b border-transparent',
        className,
      )}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="boutique-container">
        <div className="flex h-[var(--header-h)] items-center justify-between gap-4">
          {/* RIGHT (RTL start) — Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              type="button"
              className="md:hidden p-2 -ms-2 rounded-luxe hover:bg-onyx/5 transition-colors"
              aria-label="فتح القائمة"
              onClick={() => setDrawerOpen(true)}
            >
              <Menu size={22} strokeWidth={1.6} />
            </button>

            <Link
              href="/"
              className="group flex items-center gap-2 select-none"
              aria-label={SITE.name}
            >
              <span className="font-ruqaa text-2xl md:text-3xl tracking-tight text-onyx group-hover:text-champagne-700 transition-colors duration-500">
                سردة
              </span>
              <span className="hidden sm:inline-block text-[0.6rem] tracking-[0.32em] uppercase text-taupe self-end pb-1">
                Boutique
              </span>
            </Link>
          </div>

          {/* CENTER — Nav (desktop only) */}
          <nav
            className="hidden md:flex items-center gap-7 lg:gap-9"
            aria-label="التصنيفات"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative text-sm font-tajawal font-medium text-onyx-700 hover:text-onyx transition-colors duration-300"
              >
                {item.label}
                <span className="absolute -bottom-1.5 inset-x-0 h-px bg-champagne origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-luxe" />
              </Link>
            ))}
          </nav>

          {/* LEFT (RTL end) — Actions */}
          <div className="flex items-center gap-1.5">
            <IconButton ariaLabel="بحث">
              <Search size={18} strokeWidth={1.6} />
            </IconButton>

            <IconButton ariaLabel="المفضلة" className="hidden sm:inline-flex">
              <Heart size={18} strokeWidth={1.6} />
            </IconButton>

            <IconButton ariaLabel="حسابي" className="hidden sm:inline-flex">
              <User size={18} strokeWidth={1.6} />
            </IconButton>

            {/* Cart */}
            <button
              type="button"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-onyx/5 transition-colors"
              aria-label="السلة"
              onClick={openCart}
            >
              <ShoppingBag size={18} strokeWidth={1.6} />
              {hydrated && cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -end-0.5 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-champagne px-1 text-[0.6rem] font-semibold text-onyx nums-latin shadow-soft"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ──────── Mobile Drawer ──────── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-[60] bg-onyx/40 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setDrawerOpen(false)}
              aria-hidden
            />
            <motion.aside
              key="drawer"
              className="fixed inset-y-0 start-0 z-[70] w-[86%] max-w-[340px] bg-pearl shadow-editorial md:hidden flex flex-col"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-label="قائمة التصنيفات"
              aria-modal="true"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between p-5 border-b border-onyx/8">
                <span className="font-ruqaa text-2xl">سردة</span>
                <button
                  type="button"
                  className="p-2 -me-2 rounded-luxe hover:bg-onyx/5 transition-colors"
                  aria-label="إغلاق القائمة"
                  onClick={() => setDrawerOpen(false)}
                >
                  <X size={20} strokeWidth={1.6} />
                </button>
              </div>

              {/* Drawer nav */}
              <nav className="flex-1 overflow-y-auto p-5">
                <span className="editorial-eyebrow mb-4">التصنيفات</span>
                <ul className="mt-4 flex flex-col gap-1">
                  {CATEGORIES.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/categories/${c.slug}`}
                        onClick={() => setDrawerOpen(false)}
                        className="flex items-center justify-between rounded-luxe px-3 py-3 hover:bg-onyx/5 transition-colors"
                      >
                        <div>
                          <span className="font-ruqaa text-lg block">{c.name}</span>
                          {c.subtitle && (
                            <span className="text-[0.7rem] text-taupe tracking-wider">
                              {c.subtitle}
                            </span>
                          )}
                        </div>
                        <span className="text-champagne-600 text-xl leading-none">‹</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="gold-divider my-6" />

                <ul className="flex flex-col gap-1">
                  <li>
                    <Link
                      href="/about"
                      onClick={() => setDrawerOpen(false)}
                      className="block rounded-luxe px-3 py-3 hover:bg-onyx/5 text-sm"
                    >
                      عن سردة
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/policies"
                      onClick={() => setDrawerOpen(false)}
                      className="block rounded-luxe px-3 py-3 hover:bg-onyx/5 text-sm"
                    >
                      سياسات المتجر
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      onClick={() => setDrawerOpen(false)}
                      className="block rounded-luxe px-3 py-3 hover:bg-onyx/5 text-sm"
                    >
                      تواصلي معنا
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Drawer footer */}
              <div className="p-5 border-t border-onyx/8 text-center">
                <span className="text-[0.7rem] tracking-[0.28em] uppercase text-taupe">
                  Sardah · بوتيك العبايات الفاخرة
                </span>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ─────────────────────────────────────────────────────
   Tiny icon button helper
   ───────────────────────────────────────────────────── */

function IconButton({
  children,
  ariaLabel,
  className,
  onClick,
}: {
  children: React.ReactNode;
  ariaLabel: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-onyx/5 transition-colors',
        className,
      )}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
