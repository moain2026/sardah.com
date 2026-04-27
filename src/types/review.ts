/**
 * Customer review — تقييم عميلة
 * Mirrors the real review shape on https://sardah.com
 */
export interface Review {
  id: string;
  /** Customer display name (Arabic or English) */
  customerName: string;
  /** Optional initials for avatar fallback */
  initials?: string;
  /** Star rating 1–5 */
  rating: 1 | 2 | 3 | 4 | 5;
  /** Arabic review text */
  text: string;
  /** Optional related product code (e.g. "S-138") */
  productCode?: string;
  /** Optional date label, e.g. "قبل أسبوعين" */
  dateLabel?: string;
  /** ISO date for sorting */
  createdAt: string;
  /** Verified buyer flag */
  verified?: boolean;
}
