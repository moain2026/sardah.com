'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type { Product } from '@/types/product';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { Marquee } from '@/components/motion/Marquee';
import { MagneticDeep } from '@/components/motion/MagneticDeep';
import { ProductCard } from '@/components/product/ProductCard';
import { GrainOverlay } from '@/components/motion/GrainOverlay';
import { EASE_LUXE } from '@/lib/motion';

export interface SaleSpotlightProps {
  products: readonly Product[];
  discountCode?: string;
  ctaHref?: string;
}

/**
 * <SaleSpotlight/>
 * ─────────────────────────────────────────────────────────────
 * Charcoal-toned section with a horizontal scroll of on-sale
 * products, a vertical stack on desktop, and a marquee strip
 * announcing the discount code.
 */
export function SaleSpotlight({
  products,
  discountCode = 'AKR1',
  ctaHref = '/categories/sale',
}: SaleSpotlightProps) {
  if (!products.length) return null;
  const visible = products.slice(0, 4);

  return (
    <section className="relative isolate overflow-hidden bg-onyx-900 py-24 text-pearl-50 md:py-32">
      <GrainOverlay tone="dark" opacity={0.08} fixed={false} />

      <div className="boutique-container relative">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal direction="fade">
              <span className="editorial-eyebrow [&]:text-champagne-300">
                <span className="ml-2">●</span> فرصة لا تتكرر
              </span>
            </Reveal>
            <h2 className="mt-6 font-ruqaa text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.05] text-pearl-50">
              <SplitText as="span" text="تخفيضات" stagger={0.06} />{' '}
              <span className="text-champagne-300">
                <SplitText as="span" text="حصرية" stagger={0.06} delay={0.2} />
              </span>
              <br />
              <span className="text-pearl-100/85">
                <SplitText
                  as="span"
                  text="بفخامة سردة"
                  stagger={0.06}
                  delay={0.45}
                />
              </span>
            </h2>
            <Reveal direction="up" delay={0.4}>
              <p className="mt-6 max-w-xl text-base leading-loose text-pearl-200/80">
                استغلي كود الخصم{' '}
                <span className="nums-latin font-semibold text-champagne-300">
                  {discountCode}
                </span>{' '}
                للحصول على شحن مجاني داخل المملكة على القطع المختارة.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-5 md:text-end">
            <Reveal direction="up" delay={0.55}>
              <MagneticDeep strength={12}>
                <Link
                  href={ctaHref}
                  data-cursor="تسوّقي"
                  className="group inline-flex items-center gap-3 rounded-full bg-champagne-400 px-8 py-4 font-tajawal text-sm font-semibold uppercase tracking-[0.18em] text-onyx-950 transition-shadow duration-500 hover:shadow-[0_18px_40px_-12px_rgba(200,169,106,0.55)]"
                >
                  <span>تسوّقي العروض</span>
                  <span
                    aria-hidden
                    className="grid h-7 w-7 place-items-center rounded-full bg-onyx-950 text-champagne-300 transition-transform duration-500 ease-luxe group-hover:-translate-x-1"
                  >
                    <ArrowLeft size={14} />
                  </span>
                </Link>
              </MagneticDeep>
            </Reveal>
          </div>
        </div>

        {/* Code marquee */}
        <div className="mt-12 border-y border-pearl-50/10 py-5">
          <Marquee speed={45} gap={5} fadeEdges>
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="flex items-center gap-5 font-ruqaa text-2xl text-pearl-100/85"
              >
                <span>كود الخصم</span>
                <span className="nums-latin tracking-[0.18em] text-champagne-300">
                  {discountCode}
                </span>
                <span className="text-champagne-300/60">✦</span>
                <span className="font-tajawal text-[11px] uppercase tracking-[0.32em] text-pearl-200/60">
                  شحن مجاني
                </span>
                <span className="text-champagne-300/60">✦</span>
              </span>
            ))}
          </Marquee>
        </div>

        {/* Products grid (light tone for contrast) */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
          {visible.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.85, delay: i * 0.07, ease: EASE_LUXE }}
            >
              <ProductCard product={p} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
