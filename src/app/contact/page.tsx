import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle, Instagram, MapPin, Clock, Mail } from 'lucide-react';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { SITE, buildWhatsAppUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'تواصلي مع سردة',
  description:
    'تواصلي مع بوتيك سردة عبر واتساب أو تابعينا على إنستغرام وتيكتوك. كل عميلة تستحق تجربة شخصية.',
  alternates: { canonical: '/contact' },
};

const TIKTOK_ICON = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.34a8.16 8.16 0 0 0 4.77 1.52V6.4a4.85 4.85 0 0 1-1.84-.45z" />
  </svg>
);

export default function ContactPage() {
  const whatsappUrl = buildWhatsAppUrl(
    SITE.whatsapp,
    'مرحباً سردة 🌿، أتواصل معكم من صفحة "تواصلي".',
  );

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative isolate overflow-hidden bg-onyx-950 pt-[calc(var(--header-h)+3rem)] pb-20 text-pearl-50 md:pb-28">
        <GradientMesh tone="dark" />
        <div className="boutique-container relative">
          <Breadcrumb inverse items={[{ label: 'تواصلي معنا' }]} />

          <div className="mt-10 max-w-3xl">
            <span className="font-tajawal text-[11px] uppercase tracking-[0.32em] text-champagne-300">
              <span className="ml-2">●</span> نتشرف بسماعك
            </span>
            <h1 className="mt-6 font-ruqaa text-[clamp(2.4rem,6vw,5rem)] leading-[1.05] text-pearl-50">
              <SplitText as="span" text="تواصلي" stagger={0.06} />
              <br />
              <span className="text-champagne-300">
                <SplitText
                  as="span"
                  text="مع بوتيك سردة"
                  stagger={0.06}
                  delay={0.25}
                />
              </span>
            </h1>
            <Reveal direction="up" delay={0.4}>
              <p className="mt-6 max-w-xl text-base leading-loose text-pearl-200/80 md:text-lg">
                كل عميلة تستحق تجربة شخصية. تواصلي معنا عبر واتساب لأي استفسار،
                طلب، أو تخصيص — نرد بكل خصوصية وسرعة.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Channels grid ─── */}
      <section className="bg-pearl-50 py-20 md:py-28">
        <div className="boutique-container">
          <div className="grid gap-5 md:grid-cols-2 md:gap-7">
            {/* WhatsApp — primary */}
            <Reveal direction="up" duration={0.9}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="واتساب"
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-luxe-lg bg-onyx-950 p-8 text-pearl-50 transition-shadow duration-700 hover:shadow-editorial md:p-12"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-champagne-400/15 transition-transform duration-1000 ease-luxe group-hover:scale-110"
                />
                <div className="relative">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-champagne-400 text-onyx-950">
                    <MessageCircle size={22} strokeWidth={1.8} />
                  </div>
                  <h2 className="mt-7 font-ruqaa text-3xl text-pearl-50 md:text-4xl">
                    واتساب
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-loose text-pearl-200/80 md:text-base">
                    أسرع طريقة للتواصل المباشر. نرد عليكِ خلال دقائق خلال
                    أوقات الدوام.
                  </p>
                </div>
                <div className="relative mt-10 flex items-center justify-between border-t border-pearl-50/10 pt-6">
                  <span className="nums-latin font-tajawal text-base tracking-[0.18em] text-champagne-300">
                    +966 50 000 0000
                  </span>
                  <span className="font-tajawal text-[10px] uppercase tracking-[0.28em] text-champagne-300/80">
                    اضغطي للمحادثة ←
                  </span>
                </div>
              </a>
            </Reveal>

            {/* Right column — small cards */}
            <div className="flex flex-col gap-5 md:gap-7">
              <Reveal direction="up" duration={0.85} delay={0.1}>
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-luxe-lg border border-onyx-950/[0.08] bg-pearl-100/70 p-6 transition-all duration-500 hover:border-champagne-500/50 hover:shadow-card md:p-7"
                >
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-onyx-950 text-pearl-50 transition-colors group-hover:bg-champagne-400 group-hover:text-onyx-950">
                      <Instagram size={18} strokeWidth={1.8} />
                    </span>
                    <div>
                      <h3 className="font-ruqaa text-xl text-onyx-950">
                        إنستغرام
                      </h3>
                      <p className="text-xs text-onyx-500">
                        تابعي أحدث التصاميم والإطلالات.
                      </p>
                    </div>
                  </div>
                  <span className="font-tajawal text-[10px] uppercase tracking-[0.28em] text-champagne-700">
                    @sardah.abaya
                  </span>
                </a>
              </Reveal>

              <Reveal direction="up" duration={0.85} delay={0.15}>
                <a
                  href={SITE.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-luxe-lg border border-onyx-950/[0.08] bg-pearl-100/70 p-6 transition-all duration-500 hover:border-champagne-500/50 hover:shadow-card md:p-7"
                >
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-onyx-950 text-pearl-50 transition-colors group-hover:bg-champagne-400 group-hover:text-onyx-950">
                      {TIKTOK_ICON}
                    </span>
                    <div>
                      <h3 className="font-ruqaa text-xl text-onyx-950">
                        تيكتوك
                      </h3>
                      <p className="text-xs text-onyx-500">
                        لقطات حيّة من الأقمشة والتصاميم.
                      </p>
                    </div>
                  </div>
                  <span className="font-tajawal text-[10px] uppercase tracking-[0.28em] text-champagne-700">
                    @sardah.abaya
                  </span>
                </a>
              </Reveal>

              <Reveal direction="up" duration={0.85} delay={0.2}>
                <div className="grid grid-cols-2 gap-3">
                  <InfoCard
                    icon={<Clock size={16} />}
                    title="أوقات الرد"
                    body="9 صباحاً – 11 مساءً"
                  />
                  <InfoCard
                    icon={<MapPin size={16} />}
                    title="الموقع"
                    body="المملكة العربية السعودية"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Editorial closing ─── */}
      <section className="bg-champagne-400 py-24 text-onyx-950 md:py-32">
        <div className="boutique-container text-center">
          <Reveal>
            <Mail
              size={28}
              strokeWidth={1.4}
              className="mx-auto mb-6 text-onyx-950/70"
            />
            <p className="mx-auto max-w-2xl font-ruqaa text-[clamp(1.6rem,3vw,2.6rem)] leading-relaxed">
              «كل سؤال يصلنا — نتعامل معه كما نتعامل مع كل قطعة:
              <br />
              <span className="italic">بهدوء وعناية وذوق.</span>»
            </p>
            <p className="mt-6 font-tajawal text-[11px] uppercase tracking-[0.32em] text-onyx-950/65">
              Sardah · Atelier
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function InfoCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-luxe-lg border border-onyx-950/[0.08] bg-pearl-100/70 p-5">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-onyx-950 text-pearl-50">
        {icon}
      </span>
      <h4 className="mt-3 font-ruqaa text-base text-onyx-950">{title}</h4>
      <p className="mt-1 text-xs text-onyx-700">{body}</p>
    </div>
  );
}
