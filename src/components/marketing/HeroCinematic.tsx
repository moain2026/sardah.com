'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { SplitText } from '@/components/motion/SplitText';
import { Marquee } from '@/components/motion/Marquee';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { GrainOverlay } from '@/components/motion/GrainOverlay';
import { MagneticDeep } from '@/components/motion/MagneticDeep';
import { EASE_LUXE } from '@/lib/motion';
import { usePrefersReducedMotion } from '@/lib/use-reduced-motion';
import { cn } from '@/lib/utils';

export interface HeroCinematicProps {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  intro: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  /** Strip of small phrases scrolling under the hero. */
  marqueeItems?: string[];
}

/**
 * <HeroCinematic/>
 * ─────────────────────────────────────────────────────────────
 * The new flagship hero for sardah.com — replaces the static
 * <HeroSlide/>. Features:
 *   • Slow gradient-mesh + grain backdrop
 *   • Parallax accent rings reacting to scroll
 *   • Kinetic split-text headline (RTL-safe)
 *   • Pair of magnetic CTAs
 *   • Side editorial frame (collection number + abaya silhouette card)
 *   • Brand-statement marquee strip at the bottom
 * Designed to feel like Saint Laurent / Hermès editorials.
 */
export function HeroCinematic({
  eyebrow,
  headline,
  headlineAccent,
  intro,
  primaryCta,
  secondaryCta,
  marqueeItems = [
    'أقمشة كورية مختارة',
    'خياطة نظيفة بإمضاء سردة',
    'شحن مجاني داخل المملكة',
    'طرحة مجانية مع تصاميم مختارة',
    'تصميم بصمة شخصية',
    'تواصل خاص عبر واتساب',
  ],
}: HeroCinematicProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // parallax layers
  const yRing1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yRing2 = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.6, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-onyx-950 text-pearl-50"
      style={{ minHeight: 'min(94vh, 920px)' }}
    >
      {/* Backgrounds */}
      <div className="absolute inset-0 -z-10 bg-onyx-950" />
      <GradientMesh tone="dark" className="-z-10" />
      <GrainOverlay tone="dark" opacity={0.13} fixed={false} zIndex={1} />

      {/* Subtle vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(80% 60% at 50% 30%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 95%)',
        }}
      />

      {/* Decorative gold rings (parallax) */}
      {!reduced && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-40 top-1/4 h-[480px] w-[480px] rounded-full border border-champagne-500/20"
            style={{ y: yRing1, opacity, scale }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-32 -bottom-24 h-[640px] w-[640px] rounded-full border border-champagne-500/10"
            style={{ y: yRing2, opacity }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-champagne-500/[0.06]"
            style={{ y: yRing1 }}
          />
        </>
      )}

      <div className="boutique-container relative z-10 flex min-h-[88vh] flex-col justify-center pt-[calc(var(--header-h)+3rem)] pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* ───── Editorial side card (collection number) ───── */}
          <motion.aside
            className="hidden lg:col-span-3 lg:block"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: EASE_LUXE }}
          >
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-luxe-lg border border-champagne-500/20"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-luxe-lg border border-champagne-500/30 bg-onyx-900/60 p-7 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="font-tajawal text-[10px] uppercase tracking-[0.32em] text-champagne-300">
                    Collection
                  </span>
                  <span className="nums-latin font-ruqaa text-2xl text-champagne-300">
                    Nº 2026
                  </span>
                </div>

                <div className="my-7 h-px w-full bg-gradient-to-l from-transparent via-champagne-500/40 to-transparent" />

                <p className="font-tajawal text-[11px] leading-loose tracking-[0.18em] text-pearl-200/80">
                  ست مجموعات
                  <br />
                  عشرون قطعة
                  <br />
                  بصمة سردة
                </p>

                <div className="mt-7 flex items-center gap-2 text-champagne-300">
                  <Sparkles size={14} />
                  <span className="font-tajawal text-[11px] tracking-[0.2em]">
                    صنع يد
                  </span>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* ───── Centerpiece headline ───── */}
          <div className="lg:col-span-9">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_LUXE }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-10 bg-champagne-500/60" />
              <span className="font-tajawal text-[11px] uppercase tracking-[0.32em] text-champagne-300">
                {eyebrow}
              </span>
            </motion.div>

            <h1 className="mt-7 font-ruqaa text-[clamp(2.6rem,7.4vw,6rem)] leading-[1.05] tracking-[-0.01em] text-pearl-50">
              <SplitText text={headline} as="span" delay={0.15} stagger={0.07} />
              <br />
              <span className="bg-gradient-to-l from-champagne-300 via-champagne-400 to-champagne-200 bg-clip-text text-transparent">
                <SplitText text={headlineAccent} as="span" delay={0.55} stagger={0.07} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 1.1, ease: EASE_LUXE }}
              className="mt-9 max-w-xl text-base leading-loose text-pearl-200/80 md:text-lg"
            >
              {intro}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 1.3, ease: EASE_LUXE }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticDeep strength={14}>
                <Link
                  href={primaryCta.href}
                  data-cursor="تسوّقي"
                  className={cn(
                    'group relative inline-flex items-center gap-3 rounded-full bg-champagne-400 px-8 py-4 font-tajawal',
                    'text-sm font-semibold uppercase tracking-[0.18em] text-onyx-950',
                    'transition-shadow duration-500 hover:shadow-[0_18px_40px_-12px_rgba(200,169,106,0.55)]',
                  )}
                >
                  <span>{primaryCta.label}</span>
                  <span
                    aria-hidden
                    className="grid h-7 w-7 place-items-center rounded-full bg-onyx-950 text-champagne-300 transition-transform duration-500 ease-luxe group-hover:-translate-x-1"
                  >
                    <ArrowLeft size={14} />
                  </span>
                </Link>
              </MagneticDeep>

              <MagneticDeep strength={10}>
                <Link
                  href={secondaryCta.href}
                  data-cursor="استكشفي"
                  className={cn(
                    'group inline-flex items-center gap-3 rounded-full border border-pearl-50/25 px-8 py-4 font-tajawal',
                    'text-sm font-medium tracking-[0.18em] text-pearl-100',
                    'transition-colors duration-400 hover:border-champagne-300 hover:text-champagne-200',
                  )}
                >
                  <span>{secondaryCta.label}</span>
                  <ArrowLeft
                    size={14}
                    className="transition-transform duration-500 ease-luxe group-hover:-translate-x-1"
                  />
                </Link>
              </MagneticDeep>
            </motion.div>

            {/* Stats line */}
            <motion.dl
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.5, ease: EASE_LUXE }}
              className="mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-pearl-50/10 pt-8"
            >
              {[
                { v: '20', l: 'تصميم حصري' },
                { v: '6', l: 'مجموعات' },
                { v: '4.9', l: 'تقييم العميلات' },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="nums-latin font-ruqaa text-3xl text-champagne-300 md:text-4xl">
                    {s.v}
                  </dt>
                  <dd className="mt-1 font-tajawal text-[11px] uppercase tracking-[0.22em] text-pearl-200/60">
                    {s.l}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="relative z-10 border-y border-pearl-50/10 bg-onyx-950/60 py-5 backdrop-blur-sm">
        <Marquee speed={30} gap={4}>
          {marqueeItems.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-4 font-tajawal text-[12px] uppercase tracking-[0.3em] text-pearl-200/60"
            >
              <span>{item}</span>
              <span className="text-champagne-300/60">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* Scroll cue */}
      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.4, 1] }}
          transition={{ duration: 2.4, delay: 1.8, ease: EASE_LUXE }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-tajawal text-[10px] uppercase tracking-[0.3em] text-pearl-200/50">
              تمرّري
            </span>
            <span className="h-10 w-px overflow-hidden bg-pearl-50/15">
              <motion.span
                className="block h-1/2 w-full bg-champagne-300"
                animate={{ y: ['-100%', '200%'] }}
                transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity }}
              />
            </span>
          </div>
        </motion.div>
      )}
    </section>
  );
}
