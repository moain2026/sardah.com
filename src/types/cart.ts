import type { AbayaCut, Product, ProductImage } from './product';

/**
 * A single line item in the cart.
 * Stored normalized — we cache visible product data so cart still renders
 * even if the product later goes out of stock or is renamed.
 */
export interface CartItem {
  /** Stable line id = `${productId}::${cut}::${size}` */
  lineId: string;
  /** Reference back to product */
  productId: string;
  productSlug: string;
  productCode: string;
  productName: string;
  /** Cached primary image for cart preview */
  image: ProductImage;
  /** Selected cut */
  cut: AbayaCut;
  cutLabel: string;
  /** Selected size value (e.g. 54) */
  size: number;
  /** Selected size display label (e.g. "٥٤") */
  sizeLabel: string;
  /** Per-unit price (SAR) at time of add */
  unitPrice: number;
  /** Old price at time of add (for discount display) */
  oldUnitPrice?: number;
  /** Quantity ≥ 1 */
  quantity: number;
  /** Includes free tarha */
  includesTarha: boolean;
  /** Optional customer note for this specific line */
  note?: string;
  /** ISO timestamp when added */
  addedAt: string;
}

/**
 * Snapshot of the totals — derived, not persisted.
 */
export interface CartTotals {
  totalItems: number;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  grandTotal: number;
}

/**
 * Customer-supplied checkout data (for WhatsApp message builder).
 */
export interface CheckoutCustomer {
  name: string;
  city: string;
  phone: string;
  notes?: string;
}

/**
 * Payload required to add a product to cart.
 */
export interface AddToCartPayload {
  product: Product;
  cut: AbayaCut;
  size: number;
  quantity?: number;
  note?: string;
}
