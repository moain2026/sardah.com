import type { Metadata } from 'next';
import { CategoryCard } from '@/components/category/CategoryCard';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getOrderedCategories } from '@/lib/categories';
import { SITE } from '@/lib/utils';

/**
 * /categories — فهرس الفئات
 * ─────────────────────────────────────────────────────
 * Editorial overview of every Sardah category. Pure server component:
 * pre-renders at build time, ships zero client JS for the page itself
 * (the inner CategoryCard is animated on the client only when visible).
 */

export const metadata: Metadata = {
  title: 'الفئات — تشكيلة عبايات سردة الفاخرة',
  description:
    'استكشفي كل فئات عبايات سردة: العبايات اليومية، العبايات الشتوية، عبايات المناسبات، العبايات العملية، النقابات، وعروض التخفيضات الحصرية.',
  alternates: {
    canonical: `${SITE.url}/categories`,
  },
  openGraph: {
    title: 'تشكيلة عبايات سردة الفاخرة — جميع الفئات',
    description:
      'تشكيلة كاملة من عبايات سردة الفاخرة بفئاتها الست — صُمّمت بأقمشة كورية فاخرة وخياطة دقيقة.',
    url: `${SITE.url}/categories`,
    type: 'website',
  },
};

export default function CategoriesIndexPage() {
  const categories = getOrderedCategories();

  return (
    <main className="pb-20 md:pb-28">
      {/* Breadcrumb strip */}
      <div className="boutique-container pt-6 md:pt-8">
        <Breadcrumb items={[{ label: 'الفئات' }]} />
      </div>

      {/* Hero */}
      <section className="boutique-container pt-10 md:pt-16 pb-10 md:pb-16">
        <SectionHeading
          eyebrow="تشكيلتنا"
          align="center"
          size="xl"
          title={
            <>
              فئات{' '}
              <span className="gradient-text-shimmer">عبايات سردة</span>
            </>
          }
          intro={
            <>
              جولة ضمن ست تشكيلات حصرية — من العبايات اليومية إلى قطع
              المناسبات الكبرى — كلّها مصنوعة بأقمشة كورية فاخرة وخياطة
              عناية محترفة.
            </>
          }
        />
      </section>

      {/* Grid */}
      <section className="boutique-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.slug}
              category={cat}
              index={i}
              size={i === 0 ? 'xl' : 'lg'}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
