'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import type { ProductImage } from '@/types/product';
import { cn } from '@/lib/utils';

/**
 * ProductImageFrame — إطار صورة المنتج
 * ─────────────────────────────────────────────────────
 * Wraps next/image with the boutique frame, gracefully falls back
 * to a stylized monogram placeholder when the file 404s
 * (real product photos arrive in a later phase).
 */

export interface ProductImageFrameProps {
  image: ProductImage;
  /** Product code shown as fallback monogram (e.g. "K-09") */
  code?: string;
  /** sizes attr for next/image */
  sizes?: string;
  /** Add gold border on hover-out */
  showFrame?: boolean;
  /** Apply zoom-on-hover */
  zoomOnHover?: boolean;
  /** Apply ratio override (default keeps the natural ratio) */
  ratio?: 'portrait' | 'square' | 'editorial';
  /** Force priority load (above-the-fold) */
  priority?: boolean;
  className?: string;
}

const RATIO_CLASSES: Record<NonNullable<ProductImageFrameProps['ratio']>, string> = {
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
  editorial: 'aspect-[4/5]',
};

export function ProductImageFrame({
  image,
  code,
  sizes = '(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw',
  showFrame = true,
  zoomOnHover = true,
  ratio = 'portrait',
  priority = false,
  className,
}: ProductImageFrameProps) {
  const [errored, setErrored] = useState(false);

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-pearl-300 rounded-luxe',
        showFrame && 'product-frame',
        RATIO_CLASSES[ratio],
        className,
      )}
    >
      {/* Real image */}
      {!errored && (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder={image.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={image.blurDataURL}
          className={cn(
            'object-cover object-center',
            zoomOnHover &&
              'transition-transform duration-[1200ms] ease-luxe group-hover:scale-[1.06]',
          )}
          onError={() => setErrored(true)}
        />
      )}

      {/* Fallback luxury placeholder when image is missing */}
      {errored && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-pearl-300 via-sand to-pearl-200">
          {/* gold halo */}
          <div className="pointer-events-none absolute inset-6 rounded-luxe gold-border opacity-60" />
          {/* monogram */}
          <Sparkles
            size={28}
            className="text-champagne-700/60 mb-3"
            strokeWidth={1.4}
          />
          <span className="font-ruqaa text-3xl text-onyx-700 leading-none">
            سردة
          </span>
          {code && (
            <span className="mt-2 nums-latin text-[0.7rem] tracking-[0.32em] text-taupe">
              {code}
            </span>
          )}
        </div>
      )}

      {/* Subtle bottom-edge fade for text legibility on overlays */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-onyx/40 via-onyx/0 to-transparent"
        aria-hidden
      />
    </div>
  );
}
