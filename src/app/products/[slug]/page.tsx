import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Sparkles, Truck, ShieldCheck } from 'lucide-react';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductPurchasePanel } from '@/components/product/ProductPurchasePanel';
import { ProductCard } from '@/components/product/ProductCard';
import { ReviewCard } from '@/components/feedback/ReviewCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PolicyStrip } from '@/components/marketing/PolicyStrip';
import { LuxuryCard } from '@/components/ui/LuxuryCard';
import {
  PRODUCT_SLUGS,
  getProductBySlug,
  getRelatedProducts,
} from '@/lib/products';
import { getReviewsByProduct } from '@/lib/reviews';
import { getCategoryBySlug } from '@/lib/categories';
import { SITE } from '@/lib/utils';

/**
 * /products/[slug] — صفحة منتج
 * ─────────────────────────────────────────────────────
 * Static at build time for all 20 SKUs. The interactive purchase
 * panel is the only client island — gallery, breadcrumbs, related
 * grid, reviews, and policy strip are all server-rendered.
 */

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: 'المنتج غير موجود — عبايات سردة' };
  }

  const url = `${SITE.url}/products/${product.slug}`;
  const primaryImage =
    product.images.find((i) => i.primary) ?? product.images[0];

  return {
    title: product.seoTitle,
    description: product.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      title: product.seoTitle,
      description: product.seoDescription,
      url,
      type: 'website',
      images: primaryImage
        ? [{ url: primaryImage.src, alt: primaryImage.alt }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: product.seoTitle,
      description: product.seoDescription,
      images: primaryImage ? [primaryImage.src] : undefined,
    },
  };
}

export default async function ProductPage({ params }: RouteParams) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategoryBySlug(product.category);
  const related = getRelatedProducts(product, 4);
  const productReviews = getReviewsByProduct(product.code);

  // ── JSON-LD Product schema ─────────────────────────
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: product.code,
    description: product.description,
    image: product.images.map((img) => img.src),
    brand: {
      '@type': 'Brand',
      name: SITE.name,
    },
    category: category?.name ?? 'عبايات',
    offers: {
      '@type': 'Offer',
      url: `${SITE.url}/products/${product.slug}`,
      priceCurrency: product.currency,
      price: product.price,
      availability: product.isSoldOut
        ? 'https://schema.org/OutOfStock'
        : 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: SITE.name },
    },
    ...(product.rating && product.reviewsCount
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviewsCount,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
    ...(productReviews.length > 0
      ? {
          review: productReviews.map((r) => ({
            '@type': 'Review',
            author: { '@type': 'Person', name: r.customerName },
            datePublished: r.createdAt,
            reviewBody: r.text,
            reviewRating: {
              '@type': 'Rating',
              ratingValue: r.rating,
              bestRating: 5,
            },
          })),
        }
      : {}),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'الرئيسية',
        item: SITE.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'الفئات',
        item: `${SITE.url}/categories`,
      },
      ...(category
        ? [
            {
              '@type': 'ListItem',
              position: 3,
              name: category.name,
              item: `${SITE.url}/categories/${category.slug}`,
            },
          ]
        : []),
      {
        '@type': 'ListItem',
        position: category ? 4 : 3,
        name: product.name,
      },
    ],
  };

  return (
    <main className="pb-20 md:pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="boutique-container pt-6 md:pt-8">
        <Breadcrumb
          items={[
            { label: 'الفئات', href: '/categories' },
            ...(category
              ? [{ label: category.name, href: `/categories/${category.slug}` }]
              : []),
            { label: product.name },
          ]}
        />
      </div>

      {/* Gallery + purchase grid */}
      <section className="boutique-container pt-8 md:pt-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-28">
            <ProductGallery images={product.images} productCode={product.code} />
          </div>
          <div>
            <ProductPurchasePanel product={product} />
          </div>
        </div>
      </section>

      {/* Story / details strip */}
      {(product.features.length > 0 || product.tags.length > 0) && (
        <section className="boutique-container mt-16 md:mt-24">
          <div className="grid md:grid-cols-3 gap-5 md:gap-7">
            <LuxuryCard tone="ivory" className="p-6 md:p-7">
              <div className="flex items-center gap-2 text-champagne-700 mb-3">
                <Sparkles size={16} strokeWidth={1.7} />
                <span className="text-[0.7rem] tracking-[0.22em] uppercase font-tajawal">
                  تفاصيل التصميم
                </span>
              </div>
              <h3 className="font-ruqaa text-2xl text-onyx mb-4">
                صناعة فاخرة
              </h3>
              {product.features.length > 0 ? (
                <ul className="flex flex-col gap-2.5 text-sm leading-loose text-onyx-700">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-2 inline-block h-1 w-1 rounded-full bg-champagne-500 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-onyx-500 leading-loose">
                  {product.shortDescription}
                </p>
              )}
            </LuxuryCard>

            <LuxuryCard tone="ivory" className="p-6 md:p-7">
              <div className="flex items-center gap-2 text-champagne-700 mb-3">
                <Truck size={16} strokeWidth={1.7} />
                <span className="text-[0.7rem] tracking-[0.22em] uppercase font-tajawal">
                  الشحن والتسليم
                </span>
              </div>
              <h3 className="font-ruqaa text-2xl text-onyx mb-4">
                شحن مجاني داخل المملكة
              </h3>
              <p className="text-sm text-onyx-700 leading-loose">
                التحضير والتسليم خلال <strong className="nums-latin">5–13</strong>{' '}
                يوم عمل. استخدمي كود{' '}
                <span className="font-tajawal font-semibold text-champagne-700 nums-latin">
                  {SITE.discountCode}
                </span>{' '}
                لخصم إضافي على طلبك. الدفع إلكترونياً فقط — مدى، Apple Pay،
                البطاقات الائتمانية، تابي وتمارا.
              </p>
            </LuxuryCard>

            <LuxuryCard tone="ivory" className="p-6 md:p-7">
              <div className="flex items-center gap-2 text-champagne-700 mb-3">
                <ShieldCheck size={16} strokeWidth={1.7} />
                <span className="text-[0.7rem] tracking-[0.22em] uppercase font-tajawal">
                  ضمان الجودة
                </span>
              </div>
              <h3 className="font-ruqaa text-2xl text-onyx mb-4">
                خياطة نظيفة
              </h3>
              <p className="text-sm text-onyx-700 leading-loose">
                نعتمد أقمشة كورية فاخرة وخياطة دقيقة. الاستبدال ممكن عند وجود
                عيب مصنعي خلال فترة الاستلام.
              </p>
              {product.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {product.tags.slice(0, 6).map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center rounded-luxe border border-onyx/10 bg-pearl px-2.5 py-1 text-[0.65rem] tracking-wide text-onyx-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </LuxuryCard>
          </div>
        </section>
      )}

      {/* Reviews */}
      {productReviews.length > 0 && (
        <section className="boutique-container mt-16 md:mt-24">
          <SectionHeading
            eyebrow="آراء العميلات"
            align="start"
            size="lg"
            title={
              <>
                ماذا قالت{' '}
                <span className="gradient-text-shimmer">عميلاتنا عن</span>{' '}
                {product.code}؟
              </>
            }
          />
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
            {productReviews.map((r, i) => (
              <ReviewCard key={r.id} review={r} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Related products */}
      {related.length > 0 && (
        <section className="boutique-container mt-16 md:mt-24">
          <SectionHeading
            eyebrow="قد يعجبك أيضاً"
            align="start"
            size="lg"
            title={
              <>
                قطع{' '}
                <span className="gradient-text-shimmer">مختارة بعناية</span>
              </>
            }
            intro="انتقاءات منسجمة مع هذه القطعة من تشكيلتنا."
          />
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Policy strip */}
      <section className="boutique-container mt-16 md:mt-24">
        <PolicyStrip />
      </section>
    </main>
  );
}
