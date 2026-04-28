'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Menu, X, MessageCircle, ArrowLeft } from 'lucide-react';
import { cn, SITE, buildWhatsAppUrl } from '@/lib/utils';
import { CATEGORIES } from '@/lib/categories';

/**
 * HeaderLuxury — هيدر فاخر (نسخة الموقع الترويجي)
 * ─────────────────────────────────────────────────────
 * Sticky, glass-morphic on scroll. Three-zone RTL layout:
 *   [right] logo + brand    [center] nav    [left] WhatsApp CTA
 * Mobile: collapses to a luxe right-side drawer.
 *
 * NO cart / wishlist / account buttons — Sardah is now a
 * promotional showcase site, with WhatsApp as the only action.
 */

export interface HeaderLuxuryProps {
  className?: string;
}

const PRIMARY_NAV = [
  { href: '/', label: 'الرئيسية' },
  { href: '/categories', label: 'التشكيلات' },
  { href: '/gallery', label: 'المعرض' },
  { href: '/about', label: 'عن سردة' },
  { href: '/contact', label: 'تواصلي' },
] as const;

export function HeaderLuxury({ className }: HeaderLuxuryProps) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const whatsappUrl = buildWhatsAppUrl(
    SITE.whatsapp,
    'مرحباً سردة، أتواصل من الموقع وأحبّ أعرف المزيد عن التشكيلة 🌿',
  );

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
              className="lg:hidden -ms-2 rounded-luxe p-2 text-pearl-200 transition-colors hover:bg-pearl-200/10"
              aria-label="فتح القائمة"
              onClick={() => setDrawerOpen(true)}
            >
              <Menu size={22} strokeWidth={1.6} />
            </button>

            <Link
              href="/"
              className="group flex select-none items-center gap-2"
              aria-label={SITE.name}
            >
              <span className="font-ruqaa text-2xl tracking-tight text-pearl-200 transition-colors duration-500 group-hover:text-champagne-300 md:text-3xl">
                سردة
              </span>
              <span className="hidden self-end pb-1 text-[0.6rem] uppercase tracking-[0.32em] text-champagne-500/70 sm:inline-block">
                Boutique
              </span>
            </Link>
          </div>

          {/* CENTER — Nav (desktop only) */}
          <nav
            className="hidden items-center gap-7 lg:flex lg:gap-9"
            aria-label="القائمة الرئيسية"
          >
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative font-tajawal text-sm font-medium text-pearl-300/85 transition-colors duration-300 hover:text-champagne-300"
              >
                {item.label}
                <span className="absolute inset-x-0 -bottom-1.5 h-px origin-center scale-x-0 bg-champagne transition-transform duration-500 ease-luxe group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          {/* LEFT (RTL end) — WhatsApp CTA */}
          <div className="flex items-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="واتساب"
              className="group hidden items-center gap-2 rounded-full border border-champagne-500/40 bg-champagne-400/10 px-5 py-2.5 font-tajawal text-sm font-medium text-onyx-950 transition-all duration-500 hover:bg-champagne-400 hover:shadow-[0_12px_28px_-10px_rgba(200,169,106,0.55)] sm:inline-flex"
            >
              <MessageCircle size={16} strokeWidth={1.8} />
              <span>تواصل واتساب</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="تواصل واتساب"
              className="grid h-10 w-10 place-items-center rounded-full bg-champagne-400 text-onyx-950 sm:hidden"
            >
              <MessageCircle size={16} strokeWidth={1.8} />
            </a>
          </div>
        </div>
      </div>

      {/* ──────── Mobile Drawer ──────── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-[60] bg-onyx/55 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setDrawerOpen(false)}
              aria-hidden
            />
            <motion.aside
              key="drawer"
              className="fixed inset-y-0 start-0 z-[70] flex w-[86%] max-w-[360px] flex-col bg-onyx-950 text-pearl-50 shadow-editorial lg:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-label="القائمة الرئيسية"
              aria-modal="true"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between border-b border-pearl-50/10 p-5">
                <div className="flex items-baseline gap-2">
                  <span className="font-ruqaa text-3xl text-pearl-50">سردة</span>
                  <span className="text-[0.6rem] uppercase tracking-[0.32em] text-champagne-300">
                    Boutique
                  </span>
                </div>
                <button
                  type="button"
                  className="-me-2 rounded-luxe p-2 transition-colors hover:bg-pearl-50/10"
                  aria-label="إغلاق القائمة"
                  onClick={() => setDrawerOpen(false)}
                >
                  <X size={20} strokeWidth={1.6} />
                </button>
              </div>

              {/* Drawer nav */}
              <nav className="flex-1 overflow-y-auto p-6">
                <span className="font-tajawal text-[10px] uppercase tracking-[0.32em] text-champagne-300">
                  ● القائمة
                </span>
                <ul className="mt-5 flex flex-col gap-1">
                  {PRIMARY_NAV.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.1 + i * 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setDrawerOpen(false)}
                        className="group flex items-center justify-between rounded-luxe px-3 py-4 transition-colors hover:bg-pearl-50/10"
                      >
                        <span className="font-ruqaa text-2xl">{item.label}</span>
                        <ArrowLeft
                          size={18}
                          className="text-champagne-300/70 transition-transform duration-500 group-hover:-translate-x-1"
                        />
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <div className="my-7 h-px w-full bg-gradient-to-l from-transparent via-champagne-300/30 to-transparent" />

                <span className="font-tajawal text-[10px] uppercase tracking-[0.32em] text-champagne-300">
                  ● التشكيلات
                </span>
                <ul className="mt-4 flex flex-col gap-1">
                  {CATEGORIES.map((c, i) => (
                    <motion.li
                      key={c.slug}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.4 + i * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={`/categories/${c.slug}`}
                        onClick={() => setDrawerOpen(false)}
                        className="flex items-center justify-between rounded-luxe px-3 py-2.5 text-sm text-pearl-100/85 transition-colors hover:bg-pearl-50/10 hover:text-pearl-50"
                      >
                        <span className="font-tajawal">{c.name}</span>
                        {c.subtitle && (
                          <span className="text-[0.7rem] tracking-wider text-pearl-200/50">
                            {c.subtitle}
                          </span>
                        )}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Drawer footer — WhatsApp CTA */}
              <div className="border-t border-pearl-50/10 p-5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setDrawerOpen(false)}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-champagne-400 px-6 py-4 font-tajawal text-sm font-semibold uppercase tracking-[0.18em] text-onyx-950 transition-shadow duration-500 hover:shadow-[0_18px_40px_-12px_rgba(200,169,106,0.55)]"
                >
                  <MessageCircle size={18} strokeWidth={1.8} />
                  تواصل واتساب
                </a>
                <p className="mt-4 text-center font-tajawal text-[10px] uppercase tracking-[0.28em] text-pearl-200/50">
                  Sardah · بوتيك العبايات الفاخرة
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
