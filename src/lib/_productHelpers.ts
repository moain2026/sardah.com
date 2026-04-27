import type {
  AbayaCut,
  Product,
  ProductCutOption,
  ProductImage,
  ProductSize,
} from '@/types/product';

/**
 * Default cut options shared by most Sardah abayas.
 * Override per-product when needed.
 */
export const DEFAULT_CUT_OPTIONS: ProductCutOption[] = [
  { cut: 'regular', label: 'عادي', available: true },
  { cut: 'quarter-flare', label: 'ربع كلوش', available: true },
  { cut: 'half-flare', label: 'نص كلوش', available: true },
  { cut: 'full-flare', label: 'كلوش كامل', available: true },
];

/**
 * Default size grid 50–60 (all available).
 */
export const DEFAULT_SIZES: ProductSize[] = [
  { value: 50, label: '٥٠', available: true },
  { value: 52, label: '٥٢', available: true },
  { value: 54, label: '٥٤', available: true },
  { value: 56, label: '٥٦', available: true },
  { value: 58, label: '٥٨', available: true },
  { value: 60, label: '٦٠', available: true },
];

/**
 * Sold-out version of the size grid (used when product.isSoldOut === true).
 */
export const SOLDOUT_SIZES: ProductSize[] = DEFAULT_SIZES.map((s) => ({
  ...s,
  available: false,
}));

/**
 * Build a placeholder image for a product before real assets are processed.
 * Each image points to /public/images/products/<code>/<n>.webp.
 * The image-optimization script will fill the real bytes in Phase 2.5.
 */
export function buildImage(
  code: string,
  index: number,
  alt: string,
  primary = false,
): ProductImage {
  const slug = code.toLowerCase().replace(/[^a-z0-9]/g, '');
  return {
    src: `/images/products/${slug}/${slug}-${index + 1}.webp`,
    alt,
    width: 900,
    height: 1200,
    blurDataURL:
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2IDgiPjxyZWN0IHdpZHRoPSI2IiBoZWlnaHQ9IjgiIGZpbGw9IiNlOGRlZDAiLz48L3N2Zz4=',
    primary,
  };
}

/**
 * Build a default trio of images for an abaya (front / side / detail).
 */
export function buildAbayaImageSet(code: string, baseAlt: string): ProductImage[] {
  return [
    buildImage(code, 0, `${baseAlt} — لقطة أمامية`, true),
    buildImage(code, 1, `${baseAlt} — لقطة جانبية`),
    buildImage(code, 2, `${baseAlt} — تفاصيل القماش`),
  ];
}

/**
 * Determine which cuts are valid given a `defaultCut`.
 * If only one specific cut applies (e.g. blazer), restrict the list.
 */
export function buildCutOptions(allowedCuts: AbayaCut[]): ProductCutOption[] {
  const labels: Record<AbayaCut, string> = {
    regular: 'عادي',
    'quarter-flare': 'ربع كلوش',
    'half-flare': 'نص كلوش',
    'full-flare': 'كلوش كامل',
    blazer: 'بليزر',
    classic: 'كلاسيك',
  };
  return allowedCuts.map((cut) => ({
    cut,
    label: labels[cut],
    available: true,
  }));
}

/**
 * Type guard for safely retrieving a Product[] subset by a predicate.
 */
export type ProductPredicate = (p: Product) => boolean;
