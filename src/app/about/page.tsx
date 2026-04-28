import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { Marquee } from '@/components/motion/Marquee';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { GrainOverlay } from '@/components/motion/GrainOverlay';
import { PRODUCTS } from '@/lib/products';
import { CATEGORIES } from '@/lib/categories';

export const metadata: Metadata = {
  title: 'عن سردة — قصة البوتيك',
  description:
    'بوتيك سعودي يصنع العباية بهدوء وعناية: أقمشة كورية مختارة، خياطة نظيفة، وتفاصيل ذهبية. اكتشفي قصة سردة.',
  alternates: { canonical: '/about' },
};

const PILLARS = [
  {
    no: '01',
    title: 'الاختيار',
    body: 'كل قماش قبل أن يدخل ورشتنا يمر بعينين خبيرتين — لمسة، نظر، وسؤال واحد: هل يستحق سردة؟',
  },
  {
    no: '02',
    title: 'التشكيل',
    body: 'القصة تُحاك على ورق ثم على القماش. الدرزات لا تتكرر، والتفاصيل تُحسب بالمليمتر.',
  },
  {
    no: '03',
    title: 'الإمضاء',
    body: 'كل عباية قبل أن تصلكِ تمر بمراجعة بصرية مزدوجة. الإمضاء النهائي — توقيع سردة.',
  },
];

const VALUES = [
  'صنع يد',
  'فخامة بإمضاء سعودي',
  'خياطة نظيفة',
  'أقمشة مختارة',
  'تفاصيل ذهبية',
  'حضور لا يُنسى',
];

export default function AboutPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative isolate overflow-hidden bg-onyx-950 pt-[calc(var(--header-h)+3rem)] pb-24 text-pearl-50 md:pb-32">
        <GradientMesh tone="dark" />
        <GrainOverlay tone="dark" opacity={0.1} fixed={false} />

        <div className="boutique-container relative">
          <Breadcrumb inverse items={[{ label: 'عن سردة' }]} />

          <div className="mt-12 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <span className="font-tajawal text-[11px] uppercase tracking-[0.32em] text-champagne-300">
                <span className="ml-2">●</span> قصة البوتيك
              </span>
              <h1 className="mt-7 font-ruqaa text-[clamp(2.6rem,7vw,6rem)] leading-[1.04] text-pearl-50">
                <SplitText as="span" text="نصنع العباية" stagger={0.06} />
                <br />
                <span className="text-champagne-300">
                  <SplitText
                    as="span"
                    text="كأنّها لكِ وحدكِ"
                    stagger={0.06}
                    delay={0.3}
                  />
                </span>
                <br />
                <span className="text-pearl-100/70">
                  <SplitText
                    as="span"
                    text="—  لأنها كذلك."
                    stagger={0.06}
                    delay={0.6}
                  />
                </span>
              </h1>
              <Reveal direction="up" delay={0.55}>
                <p className="mt-9 max-w-xl text-base leading-loose text-pearl-200/85 md:text-lg">
                  سردة بوتيك سعودي يصنع العباية بصمت وعناية. لا نلاحق الموضة —
                  نصنع لها بصمتنا. كل قطعة تخرج من ورشتنا تحمل قصّة قصيرة من
                  الاختيار والتشكيل والإمضاء.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-4">
              <Reveal direction="left" delay={0.4} duration={1}>
                <div className="relative">
                  <div
                    aria-hidden
                    className="absolute -inset-3 rounded-luxe-lg border border-champagne-500/20"
                  />
                  <div className="relative rounded-luxe-lg border border-champagne-500/30 bg-onyx-900/60 p-8 backdrop-blur-sm">
                    <Sparkles
                      size={20}
                      className="text-champagne-300"
                      aria-hidden
                    />
                    <p className="mt-5 font-ruqaa text-2xl leading-relaxed text-pearl-50">
                      «الفخامة بصمة شخصية،
                      <br />
                      لا قالب جامد.»
                    </p>
                    <div className="mt-7 h-px bg-pearl-50/15" />
                    <dl className="mt-7 grid grid-cols-2 gap-4">
                      <div>
                        <dt className="font-tajawal text-[10px] uppercase tracking-[0.28em] text-champagne-300/80">
                          مجموعات
                        </dt>
                        <dd className="nums-latin font-ruqaa text-3xl text-pearl-50">
                          {CATEGORIES.length}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-tajawal text-[10px] uppercase tracking-[0.28em] text-champagne-300/80">
                          تصاميم
                        </dt>
                        <dd className="nums-latin font-ruqaa text-3xl text-pearl-50">
                          {PRODUCTS.length}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Values marquee ─── */}
      <section className="border-y border-onyx-950/10 bg-pearl-50 py-7 md:py-10">
        <Marquee speed={35} gap={5}>
          {VALUES.map((v, i) => (
            <span
              key={i}
              className="flex items-center gap-5 font-ruqaa text-[clamp(1.4rem,2.6vw,2.4rem)]"
            >
              <span className="whitespace-nowrap text-onyx-950">{v}</span>
              <span className="text-champagne-500">✦</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* ─── 3 pillars ─── */}
      <section className="bg-pearl-50 py-24 md:py-32">
        <div className="boutique-container">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="font-tajawal text-[11px] uppercase tracking-[0.32em] text-champagne-700">
                <span className="ml-2">●</span> سردة المنهج
              </span>
              <h2 className="mt-6 font-ruqaa text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.05] text-onyx-950">
                ثلاث مراحل
                <br />
                <span className="text-champagne-600">لكل قطعة</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-3 md:gap-7">
            {PILLARS.map((p, i) => (
              <Reveal
                key={p.no}
                direction="up"
                delay={i * 0.1}
                duration={0.9}
              >
                <article className="group relative h-full overflow-hidden rounded-luxe-lg border border-onyx-950/[0.06] bg-pearl-100/70 p-7 backdrop-blur-sm transition-shadow duration-500 hover:shadow-[0_20px_60px_-20px_rgba(8,8,8,0.18)] md:p-9">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 right-0 w-0 bg-gradient-to-l from-champagne-200/30 to-transparent transition-all duration-700 ease-luxe group-hover:w-full"
                  />
                  <div className="relative">
                    <span className="nums-latin font-ruqaa text-5xl text-champagne-500/55 md:text-6xl">
                      {p.no}
                    </span>
                    <h3 className="mt-5 font-ruqaa text-3xl text-onyx-950 md:text-4xl">
                      {p.title}
                    </h3>
                    <p className="mt-4 text-sm leading-loose text-onyx-700 md:text-base">
                      {p.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Closing CTA ─── */}
      <section className="bg-onyx-950 py-24 text-pearl-50 md:py-32">
        <div className="boutique-container text-center">
          <Reveal>
            <span className="font-tajawal text-[11px] uppercase tracking-[0.32em] text-champagne-300">
              <span className="ml-2">●</span> ابدئي رحلتك
            </span>
            <h2 className="mt-6 font-ruqaa text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.05]">
              تشرّفي بزيارة
              <br />
              <span className="text-champagne-300">المعرض البصري</span>
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/gallery"
                className="group inline-flex items-center gap-3 rounded-full bg-champagne-400 px-9 py-4 font-tajawal text-sm font-semibold uppercase tracking-[0.18em] text-onyx-950 transition-shadow duration-500 hover:shadow-[0_18px_40px_-12px_rgba(200,169,106,0.55)]"
              >
                <span>افتحي المعرض</span>
                <ArrowLeft
                  size={16}
                  className="transition-transform duration-500 ease-luxe group-hover:-translate-x-1"
                />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full border border-pearl-50/25 px-7 py-3.5 font-tajawal text-sm font-medium tracking-[0.18em] text-pearl-100 transition-colors duration-500 hover:border-champagne-300 hover:text-champagne-200"
              >
                <span>تواصلي معنا</span>
                <ArrowLeft
                  size={14}
                  className="transition-transform duration-500 ease-luxe group-hover:-translate-x-1"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
