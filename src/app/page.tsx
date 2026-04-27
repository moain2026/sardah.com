import { Sparkles, ArrowLeft } from 'lucide-react';
import {
  HeroSlide,
  SectionHeading,
  CategoryCard,
  ProductCard,
  ReviewCard,
  PolicyStrip,
  LuxuryCard,
  MagneticButton,
  PriceTag,
  RatingStars,
  ProductBadge,
  SizeGuideTrigger,
} from '@/components';
import { CATEGORIES } from '@/lib/categories';
import { PRODUCTS } from '@/lib/products';
import { REVIEWS } from '@/lib/reviews';
import { SITE } from '@/lib/utils';

/**
 * Phase 3 — Component Gallery
 * ─────────────────────────────────────────────────────
 * This page is intentionally a "showroom" of every Phase 3 component
 * so the brand & QA team can see them in context. Phase 4 will replace
 * it with the real composed homepage flow.
 */
export default function ComponentGalleryPage() {
  // Cherry-pick a few products for the showcase
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 4);
  const onSale = PRODUCTS.filter((p) => p.isOnSale).slice(0, 4);
  const soldOutSample = PRODUCTS.find((p) => p.isSoldOut);

  return (
    <>
      {/* ─────────────────────── Hero ─────────────────────── */}
      <HeroSlide
        eyebrow="مجموعة سردة 2026"
        headline="عبــايــات تُحاك بالأناقة"
        headlineAccent="بصمتك الخاصة"
        intro="أقمشة كورية مختارة، خياطة نظيفة، وتفاصيل ذهبية تروي حضوراً لا يُنسى. اكتشفي تشكيلتنا من العبايات اليومية، الشتوية، والمناسبات."
        primaryCta={{ label: 'تسوقي التشكيلة', href: '/categories/abayas' }}
        secondaryCta={{ label: 'عبايات المناسبات', href: '/categories/occasions' }}
        tone="onyx"
      />

      {/* ─────────────── Categories grid ─────────────── */}
      <section className="section-padding">
        <div className="boutique-container">
          <SectionHeading
            eyebrow="تشكيلتنا"
            title="ست مجموعات"
            titleAccent="لكلّ إطلالة"
            intro="من العبايات اليومية حتى نقاب الأمسيات — كل قطعة في سردة تُختار بعناية لتمنحك تجربة بوتيك حقيقية."
            cta={
              <MagneticButton variant="ghost" href="/categories" iconEnd={<ArrowLeft size={14} />}>
                استعرضي كل التصنيفات
              </MagneticButton>
            }
          />
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {CATEGORIES.map((c, i) => (
              <CategoryCard key={c.slug} category={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── Policy strip ─────────────── */}
      <section className="boutique-container">
        <PolicyStrip />
      </section>

      {/* ─────────────── Featured products ─────────────── */}
      <section className="section-padding">
        <div className="boutique-container">
          <SectionHeading
            align="start"
            eyebrow="الأكثر طلباً"
            title="مفضّلات"
            titleAccent="المُختارات"
            intro="قطع بصموا بصمتها في خزائن عميلاتنا — قصات تنسدل بنعومة وأقمشة تُلامس الفخامة."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} priority={i < 2} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── On Sale row ─────────────── */}
      <section className="section-padding bg-pearl-100/60">
        <div className="boutique-container">
          <SectionHeading
            align="start"
            eyebrow="فرصة لا تتكرر"
            title="تخفيضات"
            titleAccent="حصرية"
            intro={`استغلي كود الخصم ${SITE.discountCode} للحصول على شحن مجاني داخل المملكة.`}
            cta={
              <MagneticButton variant="onyx" size="md" href="/categories/sale">
                تسوقي العروض
              </MagneticButton>
            }
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
            {onSale.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── Reviews ─────────────── */}
      <section className="section-padding onyx-section grain-on-dark">
        <div className="boutique-container relative">
          <SectionHeading
            inverse
            eyebrow="آراء عميلاتنا"
            title="تجارب موثّقة"
            titleAccent="من قلب البوتيك"
            intro="كلمات صادقة من عميلاتنا — وحدها تؤكّد ما نسعى إليه: أناقة بلا تكلّف، وتفاصيل تروي قيمة."
          />
          <div className="mt-12 grid gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {REVIEWS.map((r, i) => (
              <ReviewCard key={r.id} review={r} index={i} inverse />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── Component lab ─────────────── */}
      <section className="section-padding">
        <div className="editorial-container">
          <SectionHeading
            eyebrow="Phase 3 · Component Lab"
            title="مختبر المكوّنات"
            titleAccent="UI Showroom"
            intro="عرض تقني مختصر لكل المكوّنات الجاهزة قبل تركيب صفحات الفئات والمنتجات في المرحلة الرابعة."
          />

          {/* Buttons */}
          <LuxuryCard tone="ivory" padding="xl" goldBorder className="mt-12 space-y-5">
            <h3 className="font-ruqaa text-2xl flex items-center gap-2">
              <Sparkles size={18} className="text-champagne-600" />
              MagneticButton — كل الأنماط
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton variant="onyx">زر أونيكس</MagneticButton>
              <MagneticButton variant="gold">زر شامبانيا</MagneticButton>
              <MagneticButton variant="outline">زر شفّاف</MagneticButton>
              <MagneticButton variant="ghost" iconEnd={<ArrowLeft size={14} />}>
                زر نصّي
              </MagneticButton>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton size="sm">صغير</MagneticButton>
              <MagneticButton size="md">متوسط</MagneticButton>
              <MagneticButton size="lg">كبير</MagneticButton>
              <MagneticButton variant="onyx" disabled>
                معطّل
              </MagneticButton>
            </div>
          </LuxuryCard>

          {/* Cards + Prices + Ratings */}
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <LuxuryCard tone="ivory" padding="lg" animate>
              <span className="editorial-eyebrow">PriceTag</span>
              <div className="mt-4 space-y-3">
                <PriceTag price={269} oldPrice={300} size="lg" />
                <PriceTag price={189} size="md" />
                <PriceTag price={400} oldPrice={500} size="sm" stack />
              </div>
            </LuxuryCard>

            <LuxuryCard tone="ivory" padding="lg" animate delay={0.05}>
              <span className="editorial-eyebrow">RatingStars</span>
              <div className="mt-4 space-y-3">
                <RatingStars value={5} showValue size="md" />
                <RatingStars value={4.5} showValue reviewsCount={87} size="md" />
                <RatingStars value={3} size="sm" />
              </div>
            </LuxuryCard>

            <LuxuryCard tone="onyx" padding="lg" animate delay={0.1}>
              <span className="editorial-eyebrow [&]:text-champagne-300">ProductBadge</span>
              <div className="mt-4 flex flex-wrap gap-2">
                <ProductBadge type="new" />
                <ProductBadge type="sale" />
                <ProductBadge type="bestseller" />
                <ProductBadge type="limited" />
                <ProductBadge type="soldout" />
              </div>
            </LuxuryCard>
          </div>

          {/* SizeGuide trigger */}
          <LuxuryCard tone="pearl" padding="xl" className="mt-6">
            <h3 className="font-ruqaa text-2xl mb-3">SizeGuideModal</h3>
            <p className="text-sm text-onyx-500 max-w-prose mb-6 leading-loose">
              عرض دليل المقاسات الكامل (٦ مقاسات × أبعاد + شرح القصات + نصائح) في
              نافذة منبثقة فاخرة. يفتح من زر داخل صفحة المنتج أو السلة.
            </p>
            <SizeGuideTrigger />
          </LuxuryCard>

          {/* Sold-out product showcase */}
          {soldOutSample && (
            <LuxuryCard tone="ivory" padding="xl" className="mt-6">
              <h3 className="font-ruqaa text-2xl mb-2">حالة "نفدت الكمية"</h3>
              <p className="text-sm text-onyx-500 mb-6 leading-loose">
                طريقة عرض المنتجات غير المتوفرة (مثال:{' '}
                <span className="nums-latin">{soldOutSample.code}</span>).
              </p>
              <div className="max-w-xs">
                <ProductCard product={soldOutSample} />
              </div>
            </LuxuryCard>
          )}
        </div>
      </section>

      {/* ─────────────── Phase footer note ─────────────── */}
      <section className="boutique-container pb-section">
        <div className="text-center">
          <div className="gold-divider max-w-xs mx-auto mb-5" />
          <p className="text-[0.7rem] tracking-luxe uppercase text-taupe">
            Sardah Abayas · Phase 3 · Component Library Ready
          </p>
        </div>
      </section>
    </>
  );
}
