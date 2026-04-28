import {
  HeroCinematic,
  EditorialStory,
  CollectionShowcase,
  FeaturedSelection,
  ReviewsCinema,
  CtaCinematic,
  PolicyStrip,
} from '@/components';
import { CATEGORIES } from '@/lib/categories';
import { getFeaturedProducts, getNewArrivals } from '@/lib/products';
import { REVIEWS } from '@/lib/reviews';

/**
 * ───────────────────────────────────────────────────────────────
 *  Sardah Abayas — Homepage (promotional, no commerce)
 * ───────────────────────────────────────────────────────────────
 * A fully cinematic editorial homepage. The site is a promotional
 * showcase — every action funnels to either the gallery, the
 * contact page, or WhatsApp.
 *
 *   1. <HeroCinematic/>      — kinetic split-text + parallax hero
 *   2. <EditorialStory/>     — three-pillar manifesto
 *   3. <CollectionShowcase/> — asymmetric magazine-style grid
 *   4. <FeaturedSelection/>  — sticky-side featured pieces
 *   5. <PolicyStrip/>        — assurances
 *   6. <FeaturedSelection/>  — new arrivals (dark tone)
 *   7. <ReviewsCinema/>      — dark customer stories
 *   8. <CtaCinematic/>       — final champagne call-to-action
 *
 * Layered globally by src/app/layout.tsx:
 *   <HeaderLuxury/> at top, <FooterEditorial/> at bottom,
 *   <BottomNav/> on mobile (≤1024 px) with floating WhatsApp CTA.
 */
export default function HomePage() {
  const featured = getFeaturedProducts(4);
  const newArrivals = getNewArrivals(4);

  return (
    <>
      {/* 1. Cinematic hero */}
      <HeroCinematic
        eyebrow="مجموعة سردة 2026"
        headline="فخامة تُحاك"
        headlineAccent="ببصمتك الخاصة"
        intro="بوتيك سعودي يصنع العباية بهدوء وعناية: أقمشة كورية مختارة، خياطة نظيفة، وتفاصيل ذهبية تروي حضوراً لا يُنسى."
        primaryCta={{ label: 'افتحي المعرض', href: '/gallery' }}
        secondaryCta={{ label: 'عبايات المناسبات', href: '/categories/occasions' }}
      />

      {/* 3. Editorial manifesto */}
      <EditorialStory />

      {/* 4. Collections — asymmetric showcase */}
      <CollectionShowcase categories={CATEGORIES} />

      {/* 5. Featured products */}
      <FeaturedSelection
        eyebrow="الأكثر طلباً"
        title="مفضّلات"
        titleAccent="المُختارات"
        intro="قطع بصموا بصمتها في خزائن عميلاتنا — قصات تنسدل بنعومة وأقمشة تُلامس الفخامة. كل قطعة مرّت بمراجعة بصرية مزدوجة قبل أن تصلك."
        products={featured}
        ctaHref="/gallery"
        ctaLabel="افتحي المعرض البصري"
      />

      {/* 6. Policy assurances */}
      <section className="bg-pearl-50 pb-24">
        <div className="boutique-container">
          <PolicyStrip />
        </div>
      </section>

      {/* 7. New arrivals — dark */}
      {newArrivals.length > 0 && (
        <FeaturedSelection
          eyebrow="جديد سردة"
          title="إطلالات"
          titleAccent="جديدة"
          intro="آخر تصاميمنا — قصص جديدة بأقمشة ولمسات حصرية. تشرّفي بمعرفة كل قطعة قبل غيرك."
          products={newArrivals}
          ctaHref="/categories"
          ctaLabel="كل التشكيلات"
          tone="dark"
        />
      )}

      {/* 8. Reviews — cinematic */}
      <ReviewsCinema reviews={REVIEWS} />

      {/* 9. Final CTA */}
      <CtaCinematic
        eyebrow="لحظتك مع سردة"
        headline="ابدئي تجربتكِ"
        headlineAccent="مع البوتيك"
        intro="من الإطلالة الأولى حتى التسليم — تجربة فاخرة بإمضاء سعودي. تواصلي عبر واتساب وستجدين فريقنا بانتظارك بكل خصوصية."
        primaryCta={{ label: 'تواصلي الآن', href: '/contact' }}
        secondaryCta={{ label: 'افتحي المعرض', href: '/gallery' }}
      />
    </>
  );
}
