'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type { Product } from '@/types/product';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { MagneticDeep } from '@/components/motion/MagneticDeep';
import { ProductCard } from '@/components/product/ProductCard';
import { EASE_LUXE } from '@/lib/motion';

export interface FeaturedSelectionProps {
  eyebrow: string;
  title: string;
  titleAccent: string;
  intro: string;
  products: readonly Product[];
  ctaHref?: string;
  ctaLabel?: string;
  /** Tone variant. */
  tone?: 'light' | 'dark';
}

/**
 * <FeaturedSelection/>
 * ─────────────────────────────────────────────────────────────
 * Modern asymmetric editorial featured-products row with a
 * left-side "manifesto" column and a 3-up scroll-revealed grid.
 */
export function FeaturedSelection({
  eyebrow,
  title,
  titleAccent,
  intro,
  products,
  ctaHref = '/categories/abayas',
  ctaLabel = 'استعرضي كل التشكيلة',
  tone = 'light',
}: FeaturedSelectionProps) {
  const isDark = tone === 'dark';
  const visible = products.slice(0, 4);

  return (
    <section
      className={
        isDark
          ? 'relative overflow-hidden bg-onyx-950 py-24 text-pearl-50 md:py-32'
          : 'relative bg-pearl-50 py-24 md:py-32'
      }
    >
      {/* dark accent ring */}
      {isDark && (
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-0 h-[600px] w-[600px] rounded-full border border-champagne-500/10"
        />
      )}

      <div className="boutique-container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ─── Left manifesto ─── */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <Reveal direction="fade">
              <span
                className={
                  isDark
                    ? 'editorial-eyebrow [&]:text-champagne-300'
                    : 'editorial-eyebrow text-champagne-700'
                }
              >
                <span className="ml-2">●</span> {eyebrow}
              </span>
            </Reveal>

            <h2
              className={
                'mt-6 font-ruqaa text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.05] ' +
                (isDark ? 'text-pearl-50' : 'text-onyx-950')
              }
            >
              <SplitText as="span" text={title} stagger={0.06} />
              <br />
              <span className={isDark ? 'text-champagne-300' : 'text-champagne-600'}>
                <SplitText as="span" text={titleAccent} stagger={0.06} delay={0.25} />
              </span>
            </h2>

            <Reveal direction="up" delay={0.35}>
              <p
                className={
                  'mt-7 text-base leading-loose md:text-[0.95rem] ' +
                  (isDark ? 'text-pearl-200/80' : 'text-onyx-700')
                }
              >
                {intro}
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.5} className="mt-10">
              <MagneticDeep strength={10}>
                <Link
                  href={ctaHref}
                  data-cursor="تسوّقي"
                  className={
                    'group inline-flex items-center gap-3 rounded-full px-7 py-3.5 font-tajawal text-sm font-medium tracking-[0.18em] transition-colors duration-500 ' +
                    (isDark
                      ? 'border border-pearl-50/25 text-pearl-100 hover:border-champagne-300 hover:text-champagne-200'
                      : 'border border-onyx-950/15 text-onyx-950 hover:border-champagne-500 hover:text-champagne-700')
                  }
                >
                  <span>{ctaLabel}</span>
                  <ArrowLeft
                    size={14}
                    className="transition-transform duration-500 ease-luxe group-hover:-translate-x-1"
                  />
                </Link>
              </MagneticDeep>
            </Reveal>
          </div>

          {/* ─── Right grid ─── */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-7">
              {visible.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                  transition={{
                    duration: 0.85,
                    delay: i * 0.08,
                    ease: EASE_LUXE,
                  }}
                  className={i % 2 === 1 ? 'sm:translate-y-12' : ''}
                >
                  <ProductCard product={p} index={i} priority={i < 2} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
