'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { GrainOverlay } from '@/components/motion/GrainOverlay';
import { EASE_LUXE } from '@/lib/motion';
import { usePrefersReducedMotion } from '@/lib/use-reduced-motion';

/**
 * <EditorialStory/>
 * ─────────────────────────────────────────────────────────────
 * Two-column editorial strip with:
 *   • Big serif statement (split-text reveal)
 *   • Three numbered "values" cards on the right
 *   • Subtle parallax on the column
 * Tells the brand story between the hero and the catalogue grids.
 */
export function EditorialStory() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const yLeft = useTransform(scrollYProgress, [0, 1], [40, -60]);
  const yRight = useTransform(scrollYProgress, [0, 1], [80, -40]);

  const pillars = [
    {
      no: '01',
      title: 'أقمشة مختارة',
      body: 'نتعامل مع موردين كوريين ومحليين موثوقين، ونجرب القماش يدوياً قبل أن يدخل ورشتنا.',
    },
    {
      no: '02',
      title: 'خياطة بإمضاء',
      body: 'كل قطعة تخرج من سردة بمراجعة بصرية مزدوجة على الدرزات والتطريز قبل التغليف.',
    },
    {
      no: '03',
      title: 'بصمتك أنتِ',
      body: 'تخصيص القصة، المقاس، وحتى الطرحة بحسب طلبك — الفخامة بصمة شخصية لا قالب جامد.',
    },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-pearl-50 py-24 md:py-32"
    >
      <GrainOverlay tone="light" opacity={0.05} fixed={false} />

      <div className="boutique-container relative grid gap-16 lg:grid-cols-12 lg:gap-12">
        {/* ──── Left column — manifesto ──── */}
        <motion.div
          className="lg:col-span-7"
          style={reduced ? undefined : { y: yLeft }}
        >
          <Reveal direction="fade">
            <span className="editorial-eyebrow text-champagne-700">
              <span className="ml-2">●</span> سردة المنهج
            </span>
          </Reveal>

          <h2 className="mt-8 font-ruqaa text-[clamp(2.4rem,5.4vw,4.8rem)] leading-[1.07] text-onyx-950">
            <SplitText
              as="span"
              text="نصنع العباية"
              stagger={0.06}
            />
            <br />
            <span className="text-champagne-600">
              <SplitText
                as="span"
                text="كأنّها لكِ وحدكِ"
                stagger={0.06}
                delay={0.4}
              />
            </span>
            <span className="block text-onyx-950/60">
              <SplitText
                as="span"
                text="—  لأنها كذلك."
                stagger={0.06}
                delay={0.8}
              />
            </span>
          </h2>

          <Reveal direction="up" delay={0.4} className="mt-10 max-w-xl">
            <p className="text-base leading-loose text-onyx-700 md:text-lg">
              في سردة لا نتسرّع. كل تصميم يمر بثلاث مراحل: اختيار القماش،
              تشكيل القصّة، ومراجعة الخياطة. النتيجة عباية لا تُلفت بالصراخ
              — بل بالحضور.
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.55} className="mt-9 flex items-center gap-4">
            <span className="h-px w-16 bg-onyx-950/30" />
            <span className="font-ruqaa text-lg text-onyx-950">سردة · صنع يدنا</span>
          </Reveal>
        </motion.div>

        {/* ──── Right column — numbered pillars ──── */}
        <motion.div
          className="lg:col-span-5"
          style={reduced ? undefined : { y: yRight }}
        >
          <ul className="space-y-5">
            {pillars.map((p, i) => (
              <motion.li
                key={p.no}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '0px 0px -12% 0px' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE_LUXE }}
                className="group relative overflow-hidden rounded-luxe-lg border border-onyx-950/[0.06] bg-pearl-100/70 p-7 backdrop-blur-sm transition-shadow duration-500 hover:shadow-[0_20px_60px_-20px_rgba(8,8,8,0.18)]"
              >
                {/* gradient swipe on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 right-0 w-0 bg-gradient-to-l from-champagne-200/30 to-transparent transition-all duration-700 ease-luxe group-hover:w-full"
                />

                <div className="relative flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="font-ruqaa text-2xl text-onyx-950 md:text-3xl">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm leading-loose text-onyx-700 md:text-[0.95rem]">
                      {p.body}
                    </p>
                  </div>
                  <span className="nums-latin font-ruqaa text-4xl text-champagne-500/50 md:text-5xl">
                    {p.no}
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
