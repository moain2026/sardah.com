/**
 * Category — فئة منتجات
 * Maps to one of the 6 real Sardah category collections.
 */
export type CategorySlug =
  | 'abayas'
  | 'winter'
  | 'occasions'
  | 'practical'
  | 'niqab'
  | 'sale';

export interface Category {
  /** Internal slug used in URL: /categories/[slug] */
  slug: CategorySlug;
  /** Original Salla short link (kept for reference) */
  legacySlug: string;
  /** Arabic display name */
  name: string;
  /** Arabic plural / sub-line */
  subtitle?: string;
  /** Short Arabic description for category hero */
  description: string;
  /** Cover image path (in /public) */
  coverImage: string;
  /** Optional dominant color for placeholder bg */
  accentColor?: string;
  /** Display order on homepage */
  order: number;
  /** Featured on homepage showcase? */
  featured?: boolean;
  /** SEO */
  seoTitle: string;
  seoDescription: string;
}
