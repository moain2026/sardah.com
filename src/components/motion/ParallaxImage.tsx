'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { usePrefersReducedMotion } from '@/lib/use-reduced-motion';
import { cn } from '@/lib/utils';

export interface ParallaxImageProps {
  src: string;
  alt: string;
  /** Strength of vertical translation (in pixels). */
  strength?: number;
  /** Optional gentle scale-in while in view. */
  scaleOnView?: boolean;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  /** Aspect ratio class for outer wrapper, e.g. "aspect-[3/4]". */
  ratio?: string;
}

/**
 * <ParallaxImage/>
 * ─────────────────────────────────────────────────────────────
 * Lightweight scroll-driven parallax wrapper around next/image.
 * Used for editorial hero / story sections.
 */
export function ParallaxImage({
  src,
  alt,
  strength = 80,
  scaleOnView = true,
  className,
  imageClassName,
  priority = false,
  sizes = '100vw',
  ratio = 'aspect-[4/5]',
}: ParallaxImageProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // shift image up as the section scrolls past
  const y = useTransform(scrollYProgress, [0, 1], [strength, -strength]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.02, 1.06]);

  return (
    <div
      ref={ref}
      className={cn('relative overflow-hidden', ratio, className)}
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={
          reduced
            ? undefined
            : {
                y,
                scale: scaleOnView ? scale : 1,
              }
        }
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn('object-cover', imageClassName)}
        />
      </motion.div>
    </div>
  );
}
