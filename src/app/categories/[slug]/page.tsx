import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { CategoryToolbar } from '@/components/category/CategoryToolbar';
import { PolicyStrip } from '@/components/marketing/PolicyStrip';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CATEGORY_SLUGS, getCategoryBySlug, getOrderedCategories } from '@/lib/categories';
import { getProductsByCategory } from '@/lib/products';
import type { AbayaCut, ProductCutOption } from '@/types/product';
import { SITE } from '@/lib/utils';

/**
 * /categories/[slug] — صفحة فئة
 * ─────────────────────────────────────────────────────
 * Server component that pre-renders all six category pages at build
 * time. It computes the in-category facets (fabrics, cuts, price
 * bounds) and hands them to the client `CategoryToolbar` for sort/
 * filter interaction.
 */

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return CATEGORY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) {
    return {
      title: 'الفئة غير موجودة — عبايات سردة',
    };
  }
  const url = `${SITE.url}/categories/${category.slug}`;
  return {
    title: category.seoTitle ?? `${category.name} — عبايات سردة`,
    description: category.seoDescription ?? category.description,
    alternates: { canonical: url },
    openGraph: {
      title: category.seoTitle ?? category.name,
      description: category.seoDescription ?? category.description,
      url,
      type: 'website',
      images: [{ url: category.coverImage, alt: category.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: category.seoTitle ?? category.name,
      description: category.seoDescription ?? category.description,
      images: [category.coverImage],
    },
  };
}

export default async function CategoryPage({ params }: RouteParams) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.slug);

  // Facet extraction — read what's actually present in this slice.
  const fabricSet = new Set<string>();
  const cutMap = new Map<AbayaCut, string>();
  let min = Infinity;
  let max = 0;

  for (const p of products) {
    p.fabric
      .split(/[+,]/)
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((f) => fabricSet.add(f));
    for (const c of p.cuts) {
      if (c.available && !cutMap.has(c.cut)) {
        cutMap.set(c.cut, c.label);
      }
    }
    if (p.price < min) min = p.price;
    if (p.price > max) max = p.price;
  }

  const fabrics = Array.from(fabricSet);
  const cuts: ProductCutOption[] = Array.from(cutMap, ([cut, label]) => ({
    cut,
    label,
    available: true,
  }));
  const priceBounds = {
    min: Number.isFinite(min) ? Math.floor(min) : 0,
    max: max > 0 ? Math.ceil(max) : 1000,
  };

  // JSON-LD ItemList for SEO.
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: category.name,
    description: category.description,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE.url}/products/${p.slug}`,
      name: p.name,
    })),
  };

  return (
    <main className="pb-20 md:pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="boutique-container pt-6 md:pt-8">
        <Breadcrumb
          items={[
            { label: 'الفئات', href: '/categories' },
            { label: category.name },
          ]}
        />
      </div>

      {/* Editorial hero */}
      <section className="boutique-container pt-8 md:pt-12 pb-10 md:pb-14">
        <SectionHeading
          eyebrow={category.subtitle ?? 'تشكيلتنا'}
          align="start"
          size="xl"
          as="h1"
          title={category.name}
          titleAccent={
            category.slug === 'sale' ? (
              <span className="gradient-text-shimmer">{category.name}</span>
            ) : undefined
          }
          intro={category.description}
        />
      </section>

      {/* Toolbar + grid */}
      <section className="boutique-container">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-5 py-24 text-center">
            <div className="font-ruqaa text-display-sm text-onyx">
              لا توجد قطع متاحة حالياً
            </div>
            <p className="max-w-sm text-sm text-onyx-500 leading-loose">
              تشكيلة هذه الفئة قيد التحديث — اطلعي على بقية تشكيلاتنا
              الفاخرة.
            </p>
            <Link
              href="/categories"
              className="magnetic-button magnetic-button-outline inline-flex items-center gap-2"
            >
              <ArrowLeft size={14} strokeWidth={1.7} />
              العودة لكل الفئات
            </Link>
          </div>
        ) : (
          <CategoryToolbar
            products={products}
            fabrics={fabrics}
            cuts={cuts}
            priceBounds={priceBounds}
          />
        )}
      </section>

      {/* Policy strip */}
      <section className="boutique-container mt-16 md:mt-24">
        <PolicyStrip />
      </section>

      {/* Sister categories */}
      <section className="boutique-container mt-16 md:mt-24">
        <SectionHeading
          eyebrow="استكشفي أكثر"
          align="center"
          size="md"
          title={
            <>
              تشكيلات{' '}
              <span className="gradient-text-shimmer">أخرى من سردة</span>
            </>
          }
        />
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          {getOrderedCategories()
            .filter((c) => c.slug !== category.slug)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/categories/${c.slug}`}
                className="rounded-luxe border border-onyx/15 bg-pearl px-4 py-2 text-sm font-tajawal hover:border-onyx hover:bg-onyx hover:text-pearl transition-all duration-400 ease-luxe"
              >
                {c.name}
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}
