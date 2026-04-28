import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { PRODUCTS } from '@/lib/products';
import { CATEGORIES } from '@/lib/categories';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { GrainOverlay } from '@/components/motion/GrainOverlay';
import { ProductImageFrame } from '@/components/product/ProductImageFrame';
import { SITE, buildWhatsAppUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'المعرض البصري — كل تشكيلة سردة',
  description:
    'معرض بصري فاخر يجمع كل تصاميم سردة من العبايات، النقابات، وعبايات المناسبات في شبكة واحدة منسقة.',
  alternates: { canonical: '/gallery' },
};

/**
 * /gallery — Editorial visual gallery
 * ─────────────────────────────────────────────────────
 * Masonry-style grid that shows the primary image of every product
 * across all six collections. Each tile links to the product showcase.
 */
export default function GalleryPage() {
  // Spread products into 4 columns to mimic a masonry layout
  const items = PRODUCTS.map((p) => ({
    slug: p.slug,
    code: p.code,
    name: p.name,
    subtitle: p.subtitle,
    image: p.images.find((i) => i.primary) ?? p.images[0],
    category: CATEGORIES.find((c) => c.slug === p.category),
  }));

  // Distribute into 4 columns (round-robin) — gives a luxe asymmetric feel
  const columns: typeof items[] = [[], [], [], []];
  items.forEach((item, i) => {
    columns[i % 4].push(item);
  });

  const whatsappUrl = buildWhatsAppUrl(
    SITE.whatsapp,
    'مرحباً سردة 🌿، شفت المعرض في الموقع وأحب أعرف المزيد عن التشكيلة.',
  );

  return (
    <>
      {/* ─── Hero header ─── */}
      <section className="relative isolate overflow-hidden bg-onyx-950 pt-[calc(var(--header-h)+3rem)] pb-20 text-pearl-50 md:pb-28">
        <GrainOverlay tone="dark" opacity={0.1} fixed={false} />
        <div className="boutique-container relative">
          <Breadcrumb
            inverse
            items={[{ label: 'المعرض البصري' }]}
          />

          <div className="mt-10 max-w-3xl">
            <span className="font-tajawal text-[11px] uppercase tracking-[0.32em] text-champagne-300">
              <span className="ml-2">●</span> كل التشكيلة في لقطة واحدة
            </span>
            <h1 className="mt-6 font-ruqaa text-[clamp(2.4rem,6vw,5rem)] leading-[1.05] text-pearl-50">
              <SplitText as="span" text="معرض" stagger={0.06} />{' '}
              <span className="text-champagne-300">
                <SplitText as="span" text="سردة" stagger={0.06} delay={0.2} />
              </span>
              <br />
              <span className="text-pearl-100/85">
                <SplitText
                  as="span"
                  text="البصري"
                  stagger={0.06}
                  delay={0.4}
                />
              </span>
            </h1>
            <Reveal direction="up" delay={0.4}>
              <p className="mt-6 max-w-xl text-base leading-loose text-pearl-200/80 md:text-lg">
                {PRODUCTS.length} تصميم منسوج بعناية في {CATEGORIES.length}{' '}
                مجموعات. تصفّحي كل قطعة، ولأي استفسار تواصلي معنا مباشرة.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Masonry grid ─── */}
      <section className="bg-pearl-50 py-16 md:py-24">
        <div className="boutique-container">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
            {columns.map((col, ci) => (
              <div key={ci} className="flex flex-col gap-3 md:gap-5 lg:gap-6">
                {col.map((it, i) => (
                  <Reveal
                    key={it.slug}
                    direction="up"
                    delay={Math.min(i * 0.05, 0.4)}
                    duration={0.85}
                  >
                    <Link
                      href={`/products/${it.slug}`}
                      data-cursor="افتحي"
                      className="group relative block overflow-hidden rounded-luxe shadow-card transition-all duration-700 ease-luxe hover:shadow-editorial"
                    >
                      <ProductImageFrame
                        image={it.image}
                        code={it.code}
                        ratio={ci % 2 === 0 ? 'portrait' : 'editorial'}
                        showFrame={false}
                      />
                      {/* Hover overlay */}
                      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-onyx-950/85 via-onyx-950/20 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <span className="font-tajawal text-[10px] uppercase tracking-[0.32em] text-champagne-300">
                          {it.category?.name ?? ''}
                        </span>
                        <h3 className="mt-1 font-ruqaa text-lg text-pearl-50 md:text-xl">
                          {it.name}
                        </h3>
                        <span className="nums-latin mt-0.5 text-[0.7rem] tracking-[0.2em] text-pearl-200/70">
                          {it.code}
                        </span>
                      </div>
                      {/* Always-visible bottom corner badge */}
                      <span className="nums-latin absolute bottom-3 end-3 rounded-full bg-pearl-50/90 px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide text-onyx-950 opacity-100 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-0">
                        {it.code}
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-onyx-950 py-20 text-pearl-50 md:py-28">
        <div className="boutique-container text-center">
          <Reveal>
            <h2 className="font-ruqaa text-[clamp(2rem,4.4vw,3.6rem)] leading-tight">
              عجبتك قطعة معينة؟
              <br />
              <span className="text-champagne-300">تواصلي معنا مباشرة.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-loose text-pearl-200/80">
              نتشرف بتشريفك في البوتيك الرقمي. أرسلي لنا كود القطعة عبر واتساب
              ونرد عليكِ بكل التفاصيل.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="واتساب"
                className="group inline-flex items-center gap-3 rounded-full bg-champagne-400 px-9 py-4 font-tajawal text-sm font-semibold uppercase tracking-[0.18em] text-onyx-950 transition-shadow duration-500 hover:shadow-[0_18px_40px_-12px_rgba(200,169,106,0.55)]"
              >
                <MessageCircle size={18} strokeWidth={1.8} />
                اطلبي عبر واتساب
              </a>
              <Link
                href="/categories"
                className="group inline-flex items-center gap-3 rounded-full border border-pearl-50/25 px-7 py-3.5 font-tajawal text-sm font-medium tracking-[0.18em] text-pearl-100 transition-colors duration-500 hover:border-champagne-300 hover:text-champagne-200"
              >
                <span>كل التشكيلات</span>
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
