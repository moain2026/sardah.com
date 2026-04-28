import {
  HeroCinematic,
  EditorialStory,
  CollectionShowcase,
  FeaturedSelection,
  MarqueeStatement,
  SaleSpotlight,
  ReviewsCinema,
  CtaCinematic,
  PolicyStrip,
} from '@/components';
import { CATEGORIES } from '@/lib/categories';
import {
  getFeaturedProducts,
  getOnSaleProducts,
  getNewArrivals,
} from '@/lib/products';
import { REVIEWS } from '@/lib/reviews';
import { SITE } from '@/lib/utils';

/**
 * ───────────────────────────────────────────────────────────────
 *  Sardah Abayas — Homepage (Phase 6.5 luxury upgrade)
 * ───────────────────────────────────────────────────────────────
 * A fully cinematic editorial homepage:
 *   1. <HeroCinematic/> — kinetic split-text + parallax hero
 *   2. <MarqueeStatement/> — brand mantra strip
 *   3. <EditorialStory/> — three-pillar manifesto
 *   4. <CollectionShowcase/> — asymmetric magazine-style grid
 *   5. <FeaturedSelection/> — sticky-side featured pieces
 *   6. <PolicyStrip/> — assurances
 *   7. <SaleSpotlight/> — discount marquee + on-sale grid
 *   8. <ReviewsCinema/> — dark customer stories
 *   9. <CtaCinematic/> — final champagne call-to-action
 *
 * Every block is server-rendered for SEO and progressively enhanced
 * with motion components on the client.
 */
export default function HomePage() {
  const featured = getFeaturedProducts(4);
  // On-sale spotlight: prefer on-sale + a sprinkle of "new arrivals"
  const onSale = getOnSaleProducts(4).length
    ? getOnSaleProducts(4)
    : getNewArrivals(4);

  return (
    <>
      {/* 1. Cinematic hero */}
      <HeroCinematic
        eyebrow="مجموعة سردة 2026"
        headline="فخامة تُحاك"
        headlineAccent="ببصمتك الخاصة"
        intro="بوتيك سعودي يصنع العباية بهدوء وعناية: أقمشة كورية مختارة، خياطة نظيفة، وتفاصيل ذهبية تروي حضوراً لا يُنسى."
        primaryCta={{ label: 'تسوّقي التشكيلة', href: '/categories/abayas' }}
        secondaryCta={{ label: 'عبايات المناسبات', href: '/categories/occasions' }}
      />

      {/* 2. Brand statement */}
      <MarqueeStatement
        tone="onyx"
        speed={35}
        items={[
          'سردة',
          'صنع يد',
          'فخامة بإمضاء سعودي',
          'خياطة نظيفة',
          'أقمشة مختارة',
          'بصمتك الخاصة',
          'شحن مجاني',
        ]}
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
        ctaHref="/categories/abayas"
        ctaLabel="استعرضي كل التشكيلة"
      />

      {/* 6. Policy assurances */}
      <section className="bg-pearl-50 pb-24">
        <div className="boutique-container">
          <PolicyStrip />
        </div>
      </section>

      {/* 7. On-sale spotlight */}
      <SaleSpotlight
        products={onSale}
        discountCode={SITE.discountCode}
        ctaHref="/categories/sale"
      />

      {/* 8. Reviews — cinematic */}
      <ReviewsCinema reviews={REVIEWS} />

      {/* 9. Final CTA */}
      <CtaCinematic
        eyebrow="لحظتك مع سردة"
        headline="ابدئي تجربتكِ"
        headlineAccent="مع البوتيك"
        intro="من الإطلالة الأولى حتى التسليم — تجربة تسوق فاخرة بإمضاء سعودي. تواصلي عبر واتساب وتابعي طلبك بكل خصوصية."
        primaryCta={{ label: 'تسوّقي الآن', href: '/categories/abayas' }}
        secondaryCta={{ label: 'تواصلي معنا', href: '/contact' }}
      />
    </>
  );
}
