import type { Category, CategorySlug } from '@/types/category';

/**
 * Six real Sardah categories — slugs cleaned for SEO.
 * Maps:
 *   abayas      → /category/EdVRXx (عبايات)
 *   winter      → /category/GXbNOn (عبايات شتوية)
 *   occasions   → /category/AXDZwG (عبايات مناسبات)
 *   practical   → /category/WBPXrz (عباية عملية)
 *   niqab       → /category/dzGEoe (نقابات)
 *   sale        → /offers       (تخفيضات)
 */
export const CATEGORIES: readonly Category[] = [
  {
    slug: 'abayas',
    legacySlug: 'EdVRXx',
    name: 'عبايات',
    subtitle: 'التشكيلة الأساسية',
    description:
      'تشكيلة سردة الأنيقة من العبايات اليومية بقصات راقية وأقمشة مختارة بعناية.',
    coverImage: '/images/categories/abayas-cover.webp',
    accentColor: '#1E1812',
    order: 1,
    featured: true,
    seoTitle: 'عبايات سردة — تشكيلة العبايات الأنيقة',
    seoDescription:
      'اكتشفي تشكيلة عبايات سردة الأساسية بأقمشة كورية مختارة وقصات راقية تليق بحضورك اليومي.',
  },
  {
    slug: 'winter',
    legacySlug: 'GXbNOn',
    name: 'عبايات شتوية',
    subtitle: 'دفء وأناقة',
    description:
      'عبايات شتوية بأقمشة دافئة كالكريب الملكي والمخمل، مع تفاصيل التطريز اليدوي.',
    coverImage: '/images/categories/winter-cover.webp',
    accentColor: '#15110D',
    order: 2,
    featured: true,
    seoTitle: 'عبايات شتوية — سردة',
    seoDescription:
      'تشكيلة العبايات الشتوية من سردة بأقمشة دافئة وقصات راقية، مع طرحة مجانية على التصاميم المختارة.',
  },
  {
    slug: 'occasions',
    legacySlug: 'AXDZwG',
    name: 'عبايات مناسبات',
    subtitle: 'حضور لا يُنسى',
    description:
      'تصاميم مميزة للمناسبات بتفاصيل دانتيل وتطريز فاخر تمنحك حضوراً استثنائياً.',
    coverImage: '/images/categories/occasions-cover.webp',
    accentColor: '#1A140F',
    order: 3,
    featured: true,
    seoTitle: 'عبايات مناسبات — سردة',
    seoDescription:
      'عبايات مناسبات من سردة بتصاميم فاخرة وتفاصيل دانتيل وتطريز أنيق لحضور لا يُنسى.',
  },
  {
    slug: 'practical',
    legacySlug: 'WBPXrz',
    name: 'عباية عملية',
    subtitle: 'لطلاتك اليومية',
    description:
      'عبايات عملية مريحة للدوام والطلعات اليومية بقصات سهلة وأقمشة عملية.',
    coverImage: '/images/categories/practical-cover.webp',
    accentColor: '#2C2218',
    order: 4,
    featured: true,
    seoTitle: 'عبايات عملية — سردة',
    seoDescription:
      'عبايات عملية مريحة من سردة، مناسبة للدوام والطلعات اليومية بقصات سهلة وراقية.',
  },
  {
    slug: 'niqab',
    legacySlug: 'dzGEoe',
    name: 'نقابات',
    subtitle: 'لمسة من الحشمة',
    description: 'تشكيلة نقابات أنيقة بخامات ناعمة ومريحة.',
    coverImage: '/images/categories/niqab-cover.webp',
    accentColor: '#100D09',
    order: 5,
    featured: true,
    seoTitle: 'نقابات — سردة',
    seoDescription:
      'نقابات أنيقة من سردة بخامات ناعمة ومريحة، تكمّل إطلالتك بحشمة وذوق.',
  },
  {
    slug: 'sale',
    legacySlug: 'offers',
    name: 'تخفيضات',
    subtitle: 'فخامة بأسعار مميزة',
    description: 'فرصتك لاقتناء عبايات سردة بخصومات حصرية لفترة محدودة.',
    coverImage: '/images/categories/sale-cover.webp',
    accentColor: '#5E4B2D',
    order: 6,
    featured: true,
    seoTitle: 'تخفيضات سردة — عبايات بأسعار مميزة',
    seoDescription:
      'استغلي تخفيضات سردة الحصرية على تشكيلة العبايات الفاخرة لفترة محدودة.',
  },
] as const;

/* ─────────────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────────────── */

const CATEGORIES_BY_SLUG: Record<CategorySlug, Category> = CATEGORIES.reduce(
  (acc, c) => {
    acc[c.slug] = c;
    return acc;
  },
  {} as Record<CategorySlug, Category>,
);

/**
 * Lookup a category by its clean slug. Throws if unknown — useful in pages.
 */
export function getCategoryBySlug(slug: string): Category | null {
  return CATEGORIES_BY_SLUG[slug as CategorySlug] ?? null;
}

/**
 * Categories ordered by their `order` field (already pre-sorted).
 */
export function getOrderedCategories(): readonly Category[] {
  return CATEGORIES;
}

/**
 * Categories featured on the homepage.
 */
export function getFeaturedCategories(): readonly Category[] {
  return CATEGORIES.filter((c) => c.featured);
}

/**
 * All valid slugs — handy for `generateStaticParams`.
 */
export const CATEGORY_SLUGS: readonly CategorySlug[] = CATEGORIES.map(
  (c) => c.slug,
);
