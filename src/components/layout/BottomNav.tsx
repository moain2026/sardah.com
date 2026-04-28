'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Home, Sparkles, Image as ImageIcon, MessageCircle, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn, SITE, buildWhatsAppUrl } from '@/lib/utils';
import { EASE_LUXE } from '@/lib/motion';

/**
 * <BottomNav/>
 * ─────────────────────────────────────────────────────────────
 * Premium glass-morphic bottom navigation bar for mobile devices
 * (≤ 1024 px). Five luxury items, with a centered floating
 * WhatsApp CTA that lifts above the bar (the brand "primary
 * action" since the site is purely promotional).
 *
 * Auto-hides when the user scrolls down, returns when they
 * scroll up — feels luxe and unobtrusive.
 */
const NAV_ITEMS = [
  { href: '/', label: 'الرئيسية', icon: Home },
  { href: '/categories', label: 'التشكيلات', icon: Sparkles },
  // center slot is the floating WhatsApp CTA
  { href: '/gallery', label: 'المعرض', icon: ImageIcon },
  { href: '/contact', label: 'تواصلي', icon: Phone },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);

  // Hide on scroll-down, show on scroll-up
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        // ignore tiny variations
        if (Math.abs(y - lastY) > 8) {
          setHidden(y > lastY && y > 120);
          lastY = y;
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const whatsappUrl = buildWhatsAppUrl(
    SITE.whatsapp,
    'مرحباً سردة، أتواصل من الموقع وأحبّ أعرف المزيد عن التشكيلة 🌿',
  );

  return (
    <>
      {/* Spacer so content above doesn't sit beneath the bar on mobile */}
      <div aria-hidden className="h-24 lg:hidden" />

      <AnimatePresence>
        {!hidden && (
          <motion.nav
            key="bottom-nav"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_LUXE }}
            aria-label="القائمة السفلية"
            className="fixed inset-x-0 bottom-3 z-50 mx-auto flex max-w-md justify-center px-4 lg:hidden"
          >
            <div className="relative w-full">
              {/* Glass bar */}
              <div className="relative grid grid-cols-5 items-center rounded-full border border-pearl-50/15 bg-onyx-950/85 px-2 py-2 backdrop-blur-xl shadow-[0_18px_48px_-12px_rgba(0,0,0,0.55)]">
                {/* Item 1 */}
                <NavItem item={NAV_ITEMS[0]} pathname={pathname} />
                {/* Item 2 */}
                <NavItem item={NAV_ITEMS[1]} pathname={pathname} />

                {/* Center — floating WhatsApp */}
                <div className="relative flex justify-center">
                  <motion.a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="تواصلي عبر واتساب"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, ease: EASE_LUXE }}
                    whileTap={{ scale: 0.94 }}
                    className="absolute -top-7 grid h-14 w-14 place-items-center rounded-full bg-champagne-400 text-onyx-950 shadow-[0_14px_28px_-6px_rgba(200,169,106,0.55)] ring-4 ring-onyx-950/85"
                  >
                    {/* pulsing halo */}
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-champagne-400/40 animate-[ping_2.6s_cubic-bezier(0,0,0.2,1)_infinite]"
                    />
                    <MessageCircle size={22} strokeWidth={1.8} className="relative" />
                  </motion.a>
                  <span className="font-tajawal text-[9px] font-semibold tracking-[0.18em] text-champagne-300">
                    واتساب
                  </span>
                </div>

                {/* Item 3 */}
                <NavItem item={NAV_ITEMS[2]} pathname={pathname} />
                {/* Item 4 */}
                <NavItem item={NAV_ITEMS[3]} pathname={pathname} />
              </div>

              {/* Soft shadow underneath */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-6 -bottom-1 h-3 rounded-full bg-onyx-950/30 blur-md"
              />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

/* ────────── Single nav item ────────── */
function NavItem({
  item,
  pathname,
}: {
  item: (typeof NAV_ITEMS)[number];
  pathname: string;
}) {
  const Icon = item.icon;
  const isActive =
    item.href === '/'
      ? pathname === '/'
      : pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <Link
      href={item.href}
      aria-label={item.label}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'relative flex flex-col items-center justify-center gap-0.5 py-2 transition-colors',
        isActive ? 'text-champagne-300' : 'text-pearl-100/70 hover:text-pearl-50',
      )}
    >
      {isActive && (
        <motion.span
          layoutId="bottom-nav-active"
          aria-hidden
          className="absolute inset-x-3 top-0 h-[2px] rounded-full bg-champagne-300"
          transition={{ duration: 0.45, ease: EASE_LUXE }}
        />
      )}
      <Icon size={20} strokeWidth={isActive ? 2 : 1.6} />
      <span className="font-tajawal text-[10px] font-medium tracking-[0.06em]">
        {item.label}
      </span>
    </Link>
  );
}
