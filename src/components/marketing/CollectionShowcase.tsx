'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import type { Category } from '@/types/category';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { MagneticDeep } from '@/components/motion/MagneticDeep';
import { EASE_LUXE } from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * <CollectionShowcase/>
 * ─────────────────────────────────────────────────────────────
 * Asymmetric editorial grid that highlights all 6 collections in
 * a magazine-style layout (a tall hero tile + smaller tiles).
 * Replaces the plain grid of <CategoryCard/>.
 */
export interface CollectionShowcaseProps {
  categories: readonly Category[];
}

export function CollectionShowcase({ categories }: CollectionShowcaseProps) {
  if (!categories.length) return null;
  const [hero, ...rest] = categories;

  return (
    <section className="relative bg-pearl-50 py-24 md:py-32">
      <div className="boutique-container">
        {/* Heading */}
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <Reveal direction="fade">
              <span className="editorial-eyebrow text-champagne-700">
                <span className="ml-2">●</span> ست مجموعات · بصمة واحدة
              </span>
            </Reveal>
            <h2 className="mt-6 font-ruqaa text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.05] text-onyx-950">
              <SplitText as="span" text="استكشفي" stagger={0.06} />
              <span className="text-champagne-600">
                {' '}
                <SplitText as="span" text="عوالم سردة" stagger={0.06} delay={0.2} />
              </span>
            </h2>
            <Reveal direction="up" delay={0.35}>
              <p className="mt-6 max-w-lg text-base leading-loose text-onyx-700">
                ست مجموعات منسوجة بعناية — من العبايات اليومية إلى نقاب
                الأمسيات — كلٌّ بحكاية مختلفة.
              </p>
            </Reveal>
          </div>

          <Reveal direction="up" delay={0.4}>
            <MagneticDeep strength={10}>
              <Link
                href="/categories"
                data-cursor="استعرضي"
                className="group inline-flex items-center gap-3 rounded-full border border-onyx-950/15 px-7 py-3.5 font-tajawal text-sm font-medium tracking-[0.18em] text-onyx-950 transition-colors duration-500 hover:border-champagne-500 hover:text-champagne-700"
              >
                <span>كل التشكيلات</span>
                <ArrowLeft
                  size={14}
                  className="transition-transform duration-500 ease-luxe group-hover:-translate-x-1"
                />
              </Link>
            </MagneticDeep>
          </Reveal>
        </div>

        {/* Asymmetric grid */}
        <div className="mt-14 grid gap-5 md:gap-6 lg:grid-cols-12 lg:grid-rows-2">
          {/* Hero tile (spans 7×2) */}
          <CollectionTile
            category={hero}
            index={0}
            ratio="aspect-[4/5] lg:aspect-auto"
            className="lg:col-span-7 lg:row-span-2"
            featured
          />

          {/* Rest tiles */}
          {rest.slice(0, 4).map((c, i) => (
            <CollectionTile
              key={c.slug}
              category={c}
              index={i + 1}
              ratio="aspect-[4/5]"
              className="lg:col-span-5"
            />
          ))}

          {/* If 6th exists, span full width below */}
          {rest[4] && (
            <CollectionTile
              category={rest[4]}
              index={5}
              ratio="aspect-[4/3] md:aspect-[16/7]"
              className="lg:col-span-12"
              wide
            />
          )}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── Tile ───────────────── */

interface CollectionTileProps {
  category: Category;
  index: number;
  ratio: string;
  className?: string;
  featured?: boolean;
  wide?: boolean;
}

function CollectionTile({
  category,
  index,
  ratio,
  className,
  featured = false,
  wide = false,
}: CollectionTileProps) {
  const href = `/categories/${category.slug}`;
  const accentBg = category.accentColor || '#1F1F1F';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{
        duration: 1,
        delay: Math.min(index * 0.07, 0.45),
        ease: EASE_LUXE,
      }}
      className={cn('group relative', className)}
    >
      <Link
        href={href}
        aria-label={category.name}
        data-cursor="افتحي"
        className="block h-full"
      >
        <div
          className={cn(
            'relative h-full overflow-hidden rounded-luxe-lg shadow-card transition-all duration-[900ms] ease-luxe group-hover:shadow-editorial',
            ratio,
          )}
          style={{
            backgroundColor: accentBg,
          }}
        >
          {/* base gradient */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(135deg, ${accentBg} 0%, #080808 95%)`,
            }}
          />

          {/* noise */}
          <div
            aria-hidden
            className="absolute inset-0 bg-noise-overlay opacity-[0.08] mix-blend-overlay"
          />

          {/* concentric champagne rings (decorative) */}
          <div aria-hidden className="absolute inset-0 overflow-hidden">
            <span className="absolute -right-24 -top-24 block h-72 w-72 rounded-full border border-champagne-400/15 transition-transform duration-[1200ms] ease-luxe group-hover:scale-[1.15]" />
            <span className="absolute -right-10 top-12 block h-40 w-40 rounded-full border border-champagne-400/10 transition-transform duration-[1200ms] ease-luxe group-hover:scale-[1.08]" />
          </div>

          {/* Inner gold border on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-3 rounded-luxe border border-champagne-400/0 transition-colors duration-[900ms] ease-luxe group-hover:border-champagne-400/40"
          />

          {/* Top-end sparkles */}
          <div className="absolute right-6 top-6 flex items-center gap-2 text-champagne-300/80">
            <Sparkles size={featured ? 22 : 16} strokeWidth={1.4} />
            {featured && (
              <span className="font-tajawal text-[10px] uppercase tracking-[0.32em] text-champagne-200/80">
                مجموعة المشهد
              </span>
            )}
          </div>

          {/* Number */}
          <div className="absolute left-6 top-6 nums-latin font-ruqaa text-champagne-300/45 text-3xl md:text-4xl">
            {String(category.order ?? index + 1).padStart(2, '0')}
          </div>

          {/* Bottom content with reveal-on-hover description */}
          <div
            className={cn(
              'absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 text-pearl-50 sm:p-8',
              wide && 'lg:p-10',
            )}
          >
            {category.subtitle && (
              <p className="font-tajawal text-[10px] uppercase tracking-[0.32em] text-champagne-200/85">
                {category.subtitle}
              </p>
            )}

            <div className="flex items-end justify-between gap-4">
              <h3
                className={cn(
                  'font-ruqaa leading-[1.05] tracking-tight text-pearl-50',
                  featured
                    ? 'text-4xl md:text-5xl lg:text-6xl'
                    : wide
                      ? 'text-3xl md:text-4xl'
                      : 'text-2xl md:text-3xl',
                )}
              >
                {category.name}
              </h3>

              <span className="shrink-0 grid h-12 w-12 place-items-center rounded-full bg-pearl-50/10 backdrop-blur-sm border border-pearl-50/15 text-pearl-50 transition-all duration-500 ease-luxe group-hover:bg-champagne-400 group-hover:border-champagne-400 group-hover:text-onyx-950">
                <ArrowLeft
                  size={16}
                  strokeWidth={1.6}
                  className="transition-transform duration-500 ease-luxe group-hover:-translate-x-0.5"
                />
              </span>
            </div>

            <div className="overflow-hidden">
              <p
                className={cn(
                  'mt-1 max-w-prose text-pearl-100/80 transition-all duration-700 ease-luxe',
                  featured
                    ? 'text-sm md:text-base opacity-90 line-clamp-3'
                    : 'text-xs md:text-sm opacity-0 max-h-0 group-hover:opacity-90 group-hover:max-h-24',
                )}
              >
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
