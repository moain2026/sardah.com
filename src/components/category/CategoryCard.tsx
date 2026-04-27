'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import type { Category } from '@/types/category';
import { cn } from '@/lib/utils';

/**
 * CategoryCard — بطاقة فئة فاخرة
 * ─────────────────────────────────────────────────────
 * Editorial portrait tile representing a Sardah collection.
 * Onyx gradient overlay with gold details, image is purely decorative
 * and falls back to a tonal placeholder when missing.
 */

export interface CategoryCardProps {
  category: Category;
  index?: number;
  /** xl variant (homepage hero block) */
  size?: 'md' | 'lg' | 'xl';
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<CategoryCardProps['size']>, string> = {
  md: 'aspect-[3/4]',
  lg: 'aspect-[3/4] md:aspect-[4/5]',
  xl: 'aspect-[4/5] md:aspect-[3/4]',
};

export function CategoryCard({
  category,
  index = 0,
  size = 'md',
  className,
}: CategoryCardProps) {
  const href = `/categories/${category.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.8,
        delay: Math.min(index * 0.08, 0.4),
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn('group relative', className)}
    >
      <Link href={href} aria-label={category.name}>
        <div
          className={cn(
            'relative overflow-hidden rounded-luxe shadow-card transition-all duration-700 ease-luxe group-hover:shadow-editorial',
            SIZE_CLASSES[size],
          )}
        >
          {/* Tonal layer */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-onyx-700 via-onyx-800 to-onyx"
            style={{
              backgroundColor: category.accentColor,
            }}
            aria-hidden
          />

          {/* Decorative texture (subtle) */}
          <div className="absolute inset-0 bg-noise-overlay opacity-[0.06]" aria-hidden />

          {/* Gold halo on hover */}
          <div
            className="absolute inset-3 rounded-luxe border border-champagne-400/0 group-hover:border-champagne-400/40 transition-colors duration-700 ease-luxe"
            aria-hidden
          />

          {/* Top-end ornamental sparkle */}
          <div className="absolute top-5 end-5 text-champagne-300/70">
            <Sparkles size={18} strokeWidth={1.4} aria-hidden />
          </div>

          {/* Editorial fade */}
          <div
            className="absolute inset-0 bg-editorial-fade"
            aria-hidden
          />

          {/* Bottom content */}
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 text-pearl">
            <div className="flex items-end justify-between gap-3">
              <div className="min-w-0">
                {category.subtitle && (
                  <p className="text-[0.7rem] tracking-[0.3em] text-champagne-200/85 mb-2 uppercase">
                    {category.subtitle}
                  </p>
                )}
                <h3
                  className={cn(
                    'font-ruqaa text-pearl leading-tight tracking-tight',
                    size === 'xl' ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl',
                  )}
                >
                  {category.name}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-pearl/75 line-clamp-2 max-w-prose">
                  {category.description}
                </p>
              </div>

              <span
                className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-full bg-pearl/12 backdrop-blur-sm border border-pearl/20 text-pearl transition-all duration-500 ease-luxe group-hover:bg-champagne group-hover:text-onyx group-hover:border-champagne"
                aria-hidden
              >
                <ArrowLeft
                  size={16}
                  strokeWidth={1.6}
                  className="transition-transform duration-500 ease-luxe group-hover:-translate-x-0.5"
                />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
