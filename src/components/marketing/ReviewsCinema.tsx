'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import type { Review } from '@/types/review';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { GrainOverlay } from '@/components/motion/GrainOverlay';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { RatingStars } from '@/components/ui/RatingStars';
import { EASE_LUXE } from '@/lib/motion';
import { initials } from '@/lib/utils';

export interface ReviewsCinemaProps {
  reviews: readonly Review[];
}

/**
 * <ReviewsCinema/>
 * ─────────────────────────────────────────────────────────────
 * Dark cinematic reviews section with a big quote, gradient mesh,
 * grain overlay, and a 3-up cards grid that overlap a hero quote.
 */
export function ReviewsCinema({ reviews }: ReviewsCinemaProps) {
  if (!reviews.length) return null;
  const hero = reviews[0];
  const rest = reviews.slice(1, 4);

  return (
    <section className="relative isolate overflow-hidden bg-onyx-950 py-24 text-pearl-50 md:py-32">
      <GradientMesh tone="dark" />
      <GrainOverlay tone="dark" opacity={0.1} fixed={false} />

      <div className="boutique-container relative">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal direction="fade">
            <span className="editorial-eyebrow [&]:text-champagne-300">
              <span className="ml-2">●</span> صوت عميلاتنا
            </span>
          </Reveal>
          <h2 className="mt-7 font-ruqaa text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.06] text-pearl-50">
            <SplitText as="span" text="تجارب صادقة" stagger={0.06} />
            <br />
            <span className="text-champagne-300">
              <SplitText as="span" text="تروي قيمة" stagger={0.06} delay={0.25} />
            </span>
          </h2>
        </div>

        {/* Hero quote */}
        <motion.figure
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 1, ease: EASE_LUXE }}
          className="relative mx-auto mt-16 max-w-3xl text-center"
        >
          <Quote
            size={56}
            strokeWidth={1.2}
            className="mx-auto mb-7 text-champagne-300/45"
            aria-hidden
          />
          <blockquote className="font-ruqaa text-[clamp(1.4rem,2.6vw,2.2rem)] leading-[1.55] text-pearl-100">
            «{hero.text}»
          </blockquote>
          <figcaption className="mt-7 flex items-center justify-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-champagne-300/40 font-ruqaa text-champagne-300">
              {initials(hero.customerName)}
            </span>
            <div className="text-right">
              <p className="font-ruqaa text-lg text-pearl-50">
                {hero.customerName}
              </p>
              <RatingStars value={hero.rating} size="sm" inverse />
            </div>
          </figcaption>
        </motion.figure>

        {/* Smaller cards */}
        {rest.length > 0 && (
          <div className="mt-20 grid gap-5 md:grid-cols-3 md:gap-6">
            {rest.map((r, i) => (
              <motion.figure
                key={r.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.75, delay: i * 0.08, ease: EASE_LUXE }}
                className="group relative overflow-hidden rounded-luxe-lg border border-pearl-50/10 bg-onyx-900/60 p-7 backdrop-blur-sm transition-colors duration-500 hover:border-champagne-300/30"
              >
                <Quote
                  size={28}
                  strokeWidth={1.4}
                  className="text-champagne-300/40"
                />
                <p className="mt-5 font-tajawal text-sm leading-loose text-pearl-100/85 line-clamp-5">
                  {r.text}
                </p>
                <div className="mt-7 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-champagne-300/35 font-ruqaa text-xs text-champagne-300">
                      {initials(r.customerName)}
                    </span>
                    <span className="font-ruqaa text-base text-pearl-50">
                      {r.customerName}
                    </span>
                  </div>
                  <RatingStars value={r.rating} size="sm" inverse />
                </div>
              </motion.figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
