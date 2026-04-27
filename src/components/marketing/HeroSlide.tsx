'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { MagneticButton } from '@/components/ui/MagneticButton';

/**
 * HeroSlide — سلايد البطل
 * ─────────────────────────────────────────────────────
 * Phase 3 skeleton — onyx canvas with editorial typography,
 * eyebrow + headline + sublines + dual CTA. The actual hero
 * carousel will be assembled in Phase 4 (page composition).
 */

export interface HeroSlideProps {
  eyebrow: string;
  headline: ReactNode;
  /** Highlight portion of the headline in gold */
  headlineAccent?: ReactNode;
  intro: ReactNode;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Background mode */
  tone?: 'onyx' | 'pearl' | 'image';
  /** When tone === 'image', use this src as the hero photo */
  imageSrc?: string;
  className?: string;
}

export function HeroSlide({
  eyebrow,
  headline,
  headlineAccent,
  intro,
  primaryCta,
  secondaryCta,
  tone = 'onyx',
  imageSrc,
  className,
}: HeroSlideProps) {
  const isOnyx = tone === 'onyx' || tone === 'image';

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        tone === 'pearl' ? 'pearl-texture' : 'onyx-section grain-on-dark',
        'min-h-[78vh] md:min-h-[88vh] flex items-center',
        className,
      )}
      aria-label="مقدمة البوتيك"
    >
      {/* Background image (when tone=image) */}
      {tone === 'image' && imageSrc && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            aria-hidden
          />
          <div className="absolute inset-0 bg-onyx/55" aria-hidden />
          <div className="absolute inset-0 bg-editorial-fade" aria-hidden />
        </>
      )}

      {/* Top fade for header */}
      <div className="absolute inset-x-0 top-0 h-40 bg-top-fade pointer-events-none" aria-hidden />

      {/* Decorative champagne glow */}
      <div
        className="absolute -top-32 end-[-10%] w-[460px] h-[460px] rounded-full bg-champagne/15 blur-3xl pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute -bottom-32 start-[-10%] w-[420px] h-[420px] rounded-full bg-rose/12 blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="boutique-container relative z-10 py-section">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex justify-center mb-7"
          >
            <span className="editorial-eyebrow">
              <Sparkles size={11} strokeWidth={1.8} />
              {eyebrow}
            </span>
          </motion.div>

          {/* Headline */}
          <h1
            className={cn(
              'editorial-heading text-display-xl md:text-display-2xl mb-7',
              isOnyx ? 'text-pearl' : 'text-onyx',
            )}
          >
            {headline}
            {headlineAccent && (
              <>
                <br className="hidden md:block" />{' '}
                <span className="gradient-text-shimmer">{headlineAccent}</span>
              </>
            )}
          </h1>

          {/* Intro */}
          <p
            className={cn(
              'mx-auto max-w-prose text-base md:text-lg leading-loose mb-10',
              isOnyx ? 'text-pearl/75' : 'text-onyx-500',
            )}
          >
            {intro}
          </p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton variant="gold" size="lg" href={primaryCta.href}>
              {primaryCta.label}
            </MagneticButton>
            {secondaryCta && (
              <MagneticButton
                variant={isOnyx ? 'light' : 'outline'}
                size="lg"
                href={secondaryCta.href}
              >
                {secondaryCta.label}
              </MagneticButton>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gold hairline */}
      <span
        className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent"
        aria-hidden
      />
    </section>
  );
}
