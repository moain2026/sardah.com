import type { CategorySlug } from './category';

/**
 * AbayaCut — قصة العباية
 * Real cuts available on the original Sardah store.
 */
export type AbayaCut =
  | 'regular' // عادي
  | 'quarter-flare' // ربع كلوش
  | 'half-flare' // نص كلوش
  | 'full-flare' // كلوش كامل
  | 'blazer' // بليزر
  | 'classic'; // كلاسيك

/**
 * Closure type — نوع القفلة
 */
export type ClosureType =
  | 'snap' // طقطق
  | 'button' // أزرار
  | 'zipper' // سحاب
  | 'slip-on'; // بدون

/**
 * Stock state.
 */
export type StockStatus = 'in-stock' | 'sold-out' | 'low-stock' | 'pre-order';

/**
 * Product image with WebP/AVIF + LQIP placeholder.
 */
export interface ProductImage {
  /** Path under /public/images/products/<code>/ */
  src: string;
  /** Optional AVIF source */
  avifSrc?: string;
  /** Optional WebP source */
  webpSrc?: string;
  /** Arabic alt text — required for accessibility */
  alt: string;
  /** Width in pixels (intrinsic) */
  width: number;
  /** Height in pixels (intrinsic) */
  height: number;
  /** Base64 LQIP for blur placeholder */
  blurDataURL?: string;
  /** True for the primary card image */
  primary?: boolean;
}

/**
 * Available size with optional measurements.
 */
export interface ProductSize {
  /** Numeric size: 50, 52, 54, 56, 58, 60 */
  value: number;
  /** Arabic display label, e.g. "٥٤" */
  label: string;
  /** Whether this size is currently in stock */
  available: boolean;
}

/**
 * Product cut option (visual variant).
 */
export interface ProductCutOption {
  cut: AbayaCut;
  label: string; // Arabic label
  available: boolean;
}

/**
 * Product badge displayed in cards / gallery.
 */
export type ProductBadge = 'new' | 'sale' | 'limited' | 'bestseller' | 'soldout';

/**
 * Full Sardah Abaya Product.
 */
export interface Product {
  /** Stable internal id (slug-form) */
  id: string;
  /** Clean URL slug, e.g. "abaya-k09" */
  slug: string;
  /** Original Salla short link slug, kept for traceability */
  legacySlug?: string;
  /** Product code, e.g. "K-09", "S-138", "N-330" */
  code: string;
  /** Arabic title */
  name: string;
  /** Optional sub-title (e.g. "عباية دانتيل") */
  subtitle?: string;
  /** Primary category */
  category: CategorySlug;
  /** Secondary categories (e.g. sale + occasions) */
  secondaryCategories?: CategorySlug[];
  /** Current price (SAR) */
  price: number;
  /** Original price before discount, if discounted */
  oldPrice?: number;
  /** ISO currency, always SAR for Sardah */
  currency: 'SAR';
  /** Image gallery (1+ images) */
  images: ProductImage[];
  /** Fabric — نوع القماش */
  fabric: string;
  /** Cut selection */
  cuts: ProductCutOption[];
  /** Default cut (first available) */
  defaultCut: AbayaCut;
  /** Closure type — القفلة */
  closure: ClosureType;
  /** Closure label in Arabic */
  closureLabel: string;
  /** Color description (Arabic) */
  color: string;
  /** Whether a free tarha is included — طرحة مجانية */
  includesTarha: boolean;
  /** Brief Arabic description for product card */
  shortDescription: string;
  /** Full Arabic description */
  description: string;
  /** Bullet feature points (Arabic) */
  features: string[];
  /** Available sizes */
  sizes: ProductSize[];
  /** Stock summary */
  stockStatus: StockStatus;
  /** True if completely sold out across all sizes */
  isSoldOut: boolean;
  /** True if currently on sale */
  isOnSale: boolean;
  /** Badges shown on product card */
  badges: ProductBadge[];
  /** Average rating 0–5 (from reviews) */
  rating?: number;
  /** Number of reviews */
  reviewsCount?: number;
  /** Allow customizations / notes */
  customizationAllowed: boolean;
  /** Placeholder for the customization textarea */
  notesPlaceholder: string;
  /** Tags for search/filter (Arabic) */
  tags: string[];
  /** SEO */
  seoTitle: string;
  seoDescription: string;
  /** Whether product is featured on homepage */
  featured?: boolean;
  /** Whether marked as "new arrival" */
  isNew?: boolean;
  /** Optional "fast shipping" flag (شحن فوري) */
  fastShipping?: boolean;
  /** Created/updated dates (ISO) */
  createdAt?: string;
}

/**
 * Sort options for product listings.
 */
export type ProductSortOption =
  | 'recommended'
  | 'best-selling'
  | 'top-rated'
  | 'price-asc'
  | 'price-desc'
  | 'newest';

/**
 * Filter state used by category pages.
 */
export interface ProductFilterState {
  priceMin?: number;
  priceMax?: number;
  fabrics?: string[];
  cuts?: AbayaCut[];
  inStockOnly?: boolean;
  onSaleOnly?: boolean;
}
