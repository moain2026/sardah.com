'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ProductImage } from '@/types/product';
import { ProductImageFrame } from './ProductImageFrame';
import { cn } from '@/lib/utils';

/**
 * ProductGallery — معرض صور المنتج
 * ─────────────────────────────────────────────────────
 * Main image with cross-fade animation + thumbnail rail.
 * Falls back to ProductImageFrame's monogram placeholder when an
 * image 404s. Designed for the product detail page.
 */

export interface ProductGalleryProps {
  images: readonly ProductImage[];
  productCode: string;
  className?: string;
}

export function ProductGallery({
  images,
  productCode,
  className,
}: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = images[activeIdx] ?? images[0];

  if (!active) return null;

  return (
    <div className={cn('w-full', className)}>
      {/* Main image */}
      <div className="relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProductImageFrame
              image={active}
              code={productCode}
              ratio="portrait"
              priority={activeIdx === 0}
              showFrame
              zoomOnHover={false}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Index pill */}
        {images.length > 1 && (
          <span className="absolute bottom-3 start-3 z-10 nums-latin text-[0.65rem] tracking-[0.18em] uppercase bg-onyx/65 text-pearl px-2.5 py-1 rounded-full backdrop-blur-sm">
            {activeIdx + 1} / {images.length}
          </span>
        )}
      </div>

      {/* Thumbs */}
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-2.5 sm:gap-3" role="tablist" aria-label="معرض الصور">
          {images.map((img, i) => {
            const isActive = i === activeIdx;
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveIdx(i)}
                className={cn(
                  'relative aspect-square rounded-luxe overflow-hidden transition-all duration-400 ease-luxe',
                  isActive
                    ? 'ring-2 ring-champagne-500 ring-offset-2 ring-offset-pearl shadow-soft'
                    : 'opacity-70 hover:opacity-100 ring-1 ring-onyx/10',
                )}
              >
                <ProductImageFrame
                  image={img}
                  code={productCode}
                  ratio="square"
                  showFrame={false}
                  zoomOnHover={false}
                  sizes="120px"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
