'use client';

import Link from 'next/link';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import type { Product } from '@/types/product';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/lib/use-reduced-motion';
import { PriceTag } from '@/components/ui/PriceTag';
import { RatingStars } from '@/components/ui/RatingStars';
import { ProductBadgeStack } from '@/components/ui/ProductBadge';
import { ProductImageFrame } from './ProductImageFrame';

/**
 * ProductCard — بطاقة منتج فاخرة
 * ─────────────────────────────────────────────────────
 * Editorial card with primary image, badges, code, name,
 * fabric line, free-tarha hint, price + old-price, rating,
 * and a discreet "اطلعي" CTA. RTL-natural.
 */

export interface ProductCardProps {
  product: Product;
  /** Stagger reveal index for grid animations */
  index?: number;
  /** Higher density compact card (no rating, no fabric) */
  dense?: boolean;
  /** Force priority on the image (first card above fold) */
  priority?: boolean;
  /** Hide the CTA chevron */
  hideCta?: boolean;
  className?: string;
}

export function ProductCard({
  product,
  index = 0,
  dense = false,
  priority = false,
  hideCta = false,
  className,
}: ProductCardProps) {
  const primaryImage =
    product.images.find((img) => img.primary) ?? product.images[0];

  const href = `/products/${product.slug}`;

  // 3D tilt on hover (gently tracks the cursor)
  const reduced = usePrefersReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [4, -4]), {
    stiffness: 180,
    damping: 22,
  });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-5, 5]), {
    stiffness: 180,
    damping: 22,
  });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left) / rect.width - 0.5;
    const dy = (e.clientY - rect.top) / rect.height - 0.5;
    px.set(dx);
    py.set(dy);
    el.style.setProperty('--mx', `${(dx + 0.5) * 100}%`);
    el.style.setProperty('--my', `${(dy + 0.5) * 100}%`);
  }

  function handleLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <motion.article
      className={cn(
        'group relative flex flex-col text-start',
        product.isSoldOut && 'opacity-90',
        className,
      )}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.7,
        delay: Math.min(index * 0.06, 0.4),
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={href}
        data-cursor="افتحي"
        className="block"
        aria-label={`${product.name} ${product.code}`}
      >
        {/* Image frame with luxe sheen + 3D tilt on hover */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className="lux-sheen relative overflow-hidden rounded-luxe transition-transform duration-[700ms] ease-luxe group-hover:-translate-y-1.5"
          style={
            reduced
              ? undefined
              : {
                  rotateX: rx,
                  rotateY: ry,
                  transformStyle: 'preserve-3d',
                  perspective: 1000,
                }
          }
        >
          <ProductImageFrame
            image={primaryImage}
            code={product.code}
            priority={priority}
            ratio="portrait"
          />

          {/* gold sheen sweep on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-l from-transparent via-champagne-300/15 to-transparent transition-transform duration-[1100ms] ease-luxe group-hover:translate-x-full"
          />

          {/* Top-right (RTL→ left visually) badges */}
          {product.badges.length > 0 && (
            <div className="absolute top-3 start-3 z-10">
              <ProductBadgeStack badges={product.badges} size="sm" />
            </div>
          )}

          {/* Sold-out scrim */}
          {product.isSoldOut && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-onyx/55 backdrop-blur-[2px]">
              <span className="font-ruqaa text-pearl text-2xl tracking-luxe">
                نفدت الكمية
              </span>
            </div>
          )}

          {/* Free tarha pill */}
          {product.includesTarha && !product.isSoldOut && (
            <span className="absolute bottom-3 end-3 z-10 inline-flex items-center gap-1 rounded-full bg-pearl/90 backdrop-blur px-2.5 py-1 text-[0.65rem] font-tajawal font-semibold tracking-wide text-onyx shadow-soft">
              <Sparkles size={10} strokeWidth={2.4} className="text-champagne-600" />
              طرحة مجانية
            </span>
          )}
        </motion.div>

        {/* Body */}
        <div className="pt-5 pb-2 px-1">
          {/* Code + rating row */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[0.7rem] tracking-[0.32em] text-taupe nums-latin">
              {product.code}
            </span>
            {!dense && product.rating && (
              <RatingStars
                value={product.rating}
                showValue
                size="xs"
              />
            )}
          </div>

          {/* Name */}
          <h3 className="font-ruqaa text-lg md:text-xl text-onyx leading-snug group-hover:text-champagne-700 transition-colors duration-500 ease-luxe">
            {product.name}
          </h3>

          {/* Fabric / subtitle */}
          {!dense && (
            <p className="mt-1 text-xs text-onyx-500 line-clamp-1">
              {product.subtitle ?? product.fabric}
            </p>
          )}

          {/* Price */}
          <div className="mt-3">
            <PriceTag
              price={product.price}
              oldPrice={product.oldPrice}
              size="md"
              hideDiscountBadge={dense}
            />
          </div>

          {/* CTA chevron */}
          {!hideCta && !product.isSoldOut && (
            <div className="mt-3 flex items-center gap-2 text-[0.72rem] text-onyx-500 group-hover:text-champagne-700 transition-colors duration-500">
              <span className="tracking-wide">اطلعي على التفاصيل</span>
              <ArrowLeft
                size={14}
                strokeWidth={1.7}
                className="transition-transform duration-500 ease-luxe group-hover:-translate-x-1"
              />
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
