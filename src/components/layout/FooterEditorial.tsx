'use client';

import Link from 'next/link';
import { Instagram, MessageCircle, Mail, Phone, Sparkles } from 'lucide-react';
import { CATEGORIES } from '@/lib/categories';
import { SITE } from '@/lib/utils';
import { cn } from '@/lib/utils';

/**
 * FooterEditorial — تذييل تحريري فاخر
 * ─────────────────────────────────────────────────────
 * Onyx canvas, gold accents, four-column layout collapsing to
 * a stacked mobile order. Includes social handles, payment row,
 * brand legal note, and a top-edge gold gradient divider.
 */

export interface FooterEditorialProps {
  className?: string;
}

const PAYMENT_METHODS: { name: string; label: string }[] = [
  { name: 'mada', label: 'مدى' },
  { name: 'visa', label: 'Visa' },
  { name: 'mastercard', label: 'Mastercard' },
  { name: 'apple-pay', label: 'Apple Pay' },
  { name: 'tabby', label: 'تابي' },
  { name: 'tamara', label: 'تمارا' },
];

export function FooterEditorial({ className }: FooterEditorialProps) {
  return (
    <footer
      className={cn(
        'relative bg-onyx text-pearl pt-section section-padding overflow-hidden',
        className,
      )}
      aria-label="تذييل الصفحة"
    >
      {/* Top gold divider */}
      <span
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-champagne/60 to-transparent"
        aria-hidden
      />

      {/* Soft noise */}
      <div className="absolute inset-0 bg-noise-overlay opacity-[0.05] pointer-events-none" aria-hidden />

      <div className="boutique-container relative">
        {/* Top brand block */}
        <div className="text-center mb-16">
          <Sparkles size={20} className="mx-auto text-champagne-300 mb-4" strokeWidth={1.4} />
          <h2 className="font-ruqaa text-4xl md:text-5xl mb-3 text-pearl">
            عبــايــات{' '}
            <span className="gradient-text">ســـــردة</span>
          </h2>
          <p className="text-pearl/65 max-w-prose mx-auto leading-loose text-sm md:text-base">
            {SITE.tagline} — بوتيك رقمي للعبايات السعودية الفاخرة. أقمشة كورية،
            خياطة نظيفة، وتفاصيل تليق بحضورك.
          </p>
        </div>

        {/* Columns */}
        <div className="grid gap-12 md:grid-cols-4 mb-16">
          {/* Categories */}
          <div>
            <h3 className="text-[0.7rem] tracking-[0.32em] uppercase text-champagne-300 mb-5 font-tajawal">
              التصنيفات
            </h3>
            <ul className="flex flex-col gap-2.5">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/categories/${c.slug}`}
                    className="text-sm text-pearl/75 hover:text-champagne-300 transition-colors duration-300"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Boutique */}
          <div>
            <h3 className="text-[0.7rem] tracking-[0.32em] uppercase text-champagne-300 mb-5 font-tajawal">
              البوتيك
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-pearl/75">
              <li>
                <Link href="/about" className="hover:text-champagne-300 transition-colors">
                  عن سردة
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-champagne-300 transition-colors">
                  دليل المقاسات
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-champagne-300 transition-colors">
                  سياسات المتجر
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-champagne-300 transition-colors">
                  الأسئلة الشائعة
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-champagne-300 transition-colors">
                  تواصلي معنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer care */}
          <div>
            <h3 className="text-[0.7rem] tracking-[0.32em] uppercase text-champagne-300 mb-5 font-tajawal">
              خدمة العميلات
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-pearl/80">
              <li className="flex items-center gap-2">
                <MessageCircle size={14} strokeWidth={1.6} className="text-champagne-300 shrink-0" />
                <a
                  href={`https://wa.me/${SITE.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-champagne-300 transition-colors nums-latin"
                >
                  واتساب
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} strokeWidth={1.6} className="text-champagne-300 shrink-0" />
                <span className="nums-latin tracking-wide opacity-90">+966 50 000 0000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} strokeWidth={1.6} className="text-champagne-300 shrink-0" />
                <span className="opacity-90">care@sardah.com</span>
              </li>
              <li className="text-xs leading-loose text-pearl/55 mt-3">
                ساعات الرد: الأحد — الخميس · 9 صباحاً — 9 مساءً
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[0.7rem] tracking-[0.32em] uppercase text-champagne-300 mb-5 font-tajawal">
              تابعينا
            </h3>
            <p className="text-sm text-pearl/70 mb-4 leading-loose">
              كوني أول من يطّلع على جديد التشكيلة والعروض الحصرية.
            </p>
            <form
              className="flex flex-col gap-2.5"
              onSubmit={(e) => e.preventDefault()}
            >
              <label className="sr-only" htmlFor="footer-email">
                بريدك الإلكتروني
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="بريدك الإلكتروني"
                className="bg-pearl/8 border border-pearl/15 rounded-luxe px-4 py-3 text-sm text-pearl placeholder:text-pearl/50 focus:outline-none focus:border-champagne-400 transition-colors"
              />
              <button
                type="submit"
                className="magnetic-button magnetic-button-gold text-xs"
              >
                اشتركي بالنشرة
              </button>
            </form>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="انستغرام"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-pearl/8 border border-pearl/15 hover:bg-champagne hover:text-onyx hover:border-champagne transition-all duration-500"
              >
                <Instagram size={16} strokeWidth={1.6} />
              </a>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="واتساب"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-pearl/8 border border-pearl/15 hover:bg-champagne hover:text-onyx hover:border-champagne transition-all duration-500"
              >
                <MessageCircle size={16} strokeWidth={1.6} />
              </a>
            </div>
          </div>
        </div>

        {/* Payment row */}
        <div className="border-t border-pearl/10 pt-8 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[0.7rem] tracking-[0.28em] uppercase text-pearl/55 me-2">
                طرق الدفع
              </span>
              {PAYMENT_METHODS.map((p) => (
                <span
                  key={p.name}
                  className="inline-flex items-center px-2.5 py-1 rounded-full bg-pearl/8 border border-pearl/12 text-[0.65rem] tracking-wider"
                >
                  {p.label}
                </span>
              ))}
            </div>

            {/* Discount code */}
            <div className="text-[0.7rem] text-pearl/65 tracking-wide">
              كود الخصم: <span className="text-champagne-300 font-semibold tracking-luxe nums-latin">{SITE.discountCode}</span>
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="text-center pt-2">
          <p className="text-[0.7rem] tracking-[0.18em] text-pearl/50 nums-latin">
            © {new Date().getFullYear()} {SITE.name} — جميع الحقوق محفوظة
          </p>
          <p className="text-[0.65rem] tracking-[0.2em] text-pearl/35 mt-1.5">
            صُمّم بحب · نُسج بأناقة
          </p>
        </div>
      </div>
    </footer>
  );
}
