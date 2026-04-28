'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { MagneticDeep } from '@/components/motion/MagneticDeep';
import { GrainOverlay } from '@/components/motion/GrainOverlay';
import { EASE_LUXE } from '@/lib/motion';
import { usePrefersReducedMotion } from '@/lib/use-reduced-motion';

export interface CtaCinematicProps {
  eyebrow?: string;
  headline: string;
  headlineAccent: string;
  intro: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

/**
 * <CtaCinematic/>
 * ─────────────────────────────────────────────────────────────
 * Final boutique CTA — large champagne block with grain texture,
 * massive serif headline, and a pair of CTAs.
 */
export function CtaCinematic({
  eyebrow = 'لحظتك مع سردة',
  headline,
  headlineAccent,
  intro,
  primaryCta,
  secondaryCta,
}: CtaCinematicProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-champagne-400 py-24 text-onyx-950 md:py-32"
    >
      {/* Grain */}
      <GrainOverlay tone="dark" opacity={0.05} fixed={false} />

      {/* Decorative type */}
      {!reduced && (
        <motion.div
          aria-hidden
          style={{ y }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <span className="select-none font-ruqaa text-[clamp(8rem,28vw,28rem)] leading-none text-onyx-950/[0.04]">
            سردة
          </span>
        </motion.div>
      )}

      <div className="boutique-container relative grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Reveal direction="fade">
            <span className="font-tajawal text-[11px] uppercase tracking-[0.32em] text-onyx-950/70">
              <span className="mx-2">●</span> {eyebrow}
            </span>
          </Reveal>

          <h2 className="mt-6 font-ruqaa text-[clamp(2.4rem,6vw,5.4rem)] leading-[1.05]">
            <SplitText as="span" text={headline} stagger={0.06} />
            <br />
            <span className="italic text-onyx-950/85">
              <SplitText as="span" text={headlineAccent} stagger={0.06} delay={0.25} />
            </span>
          </h2>

          <Reveal direction="up" delay={0.4}>
            <p className="mt-7 max-w-xl text-base leading-loose text-onyx-950/85 md:text-lg">
              {intro}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.55}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticDeep strength={14}>
                <Link
                  href={primaryCta.href}
                  data-cursor="ابدئي"
                  className="group inline-flex items-center gap-3 rounded-full bg-onyx-950 px-9 py-4 font-tajawal text-sm font-semibold uppercase tracking-[0.18em] text-pearl-50 transition-shadow duration-500 hover:shadow-[0_18px_40px_-12px_rgba(8,8,8,0.45)]"
                >
                  <span>{primaryCta.label}</span>
                  <span
                    aria-hidden
                    className="grid h-7 w-7 place-items-center rounded-full bg-champagne-300 text-onyx-950 transition-transform duration-500 ease-luxe group-hover:-translate-x-1"
                  >
                    <ArrowLeft size={14} />
                  </span>
                </Link>
              </MagneticDeep>

              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  data-cursor="استكشفي"
                  className="group inline-flex items-center gap-3 rounded-full border border-onyx-950/30 px-7 py-3.5 font-tajawal text-sm font-medium tracking-[0.18em] text-onyx-950 transition-colors duration-500 hover:border-onyx-950 hover:text-onyx-950"
                >
                  <span>{secondaryCta.label}</span>
                  <ArrowLeft
                    size={14}
                    className="transition-transform duration-500 ease-luxe group-hover:-translate-x-1"
                  />
                </Link>
              )}
            </div>
          </Reveal>
        </div>

        {/* Signature card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 1, ease: EASE_LUXE }}
          className="lg:col-span-4"
        >
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-4 rotate-2 rounded-luxe-lg border border-onyx-950/15"
            />
            <div className="relative rounded-luxe-lg border border-onyx-950/15 bg-pearl-50/40 p-8 backdrop-blur-sm">
              <Sparkles
                size={20}
                className="text-onyx-950"
                aria-hidden
              />
              <p className="mt-5 font-ruqaa text-2xl leading-relaxed text-onyx-950">
                «الفخامة بصمة شخصية،
                <br />
                لا قالب جامد.»
              </p>
              <div className="mt-6 h-px bg-onyx-950/15" />
              <p className="mt-5 font-tajawal text-[11px] uppercase tracking-[0.3em] text-onyx-950/70">
                Sardah · Atelier
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
