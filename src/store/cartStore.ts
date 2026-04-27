/**
 * Sardah Cart Store — Zustand
 * ─────────────────────────────────────────────────────────
 * - Client-side persistent cart (localStorage)
 * - Normalized line items (productId × cut × size)
 * - Computes derived totals on demand
 * - SSR-safe: hydration is gated via `useCartHydrated()`
 */

'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
  AddToCartPayload,
  CartItem,
  CartTotals,
  CheckoutCustomer,
} from '@/types/cart';
import type { AbayaCut } from '@/types/product';

/* ─────────────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────────────── */

const CUT_LABELS: Record<AbayaCut, string> = {
  regular: 'عادي',
  'quarter-flare': 'ربع كلوش',
  'half-flare': 'نص كلوش',
  'full-flare': 'كلوش كامل',
  blazer: 'بليزر',
  classic: 'كلاسيك',
};

const SIZE_LABELS_AR: Record<number, string> = {
  50: '٥٠',
  52: '٥٢',
  54: '٥٤',
  56: '٥٦',
  58: '٥٨',
  60: '٦٠',
};

function lineIdFor(productId: string, cut: AbayaCut, size: number): string {
  return `${productId}::${cut}::${size}`;
}

/* ─────────────────────────────────────────────────────
   Store shape
   ───────────────────────────────────────────────────── */

export interface CartState {
  /** Hydration flag — false during SSR / first render */
  hasHydrated: boolean;
  /** Drawer open state */
  isOpen: boolean;
  /** Line items */
  items: CartItem[];
  /** Customer data captured at checkout */
  customer: CheckoutCustomer | null;
  /** Optional applied discount code (sD1544 by default) */
  discountCode: string | null;

  /* mutations */
  setHasHydrated: (v: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  addItem: (payload: AddToCartPayload) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  updateNote: (lineId: string, note: string) => void;
  clear: () => void;

  setCustomer: (customer: CheckoutCustomer | null) => void;
  setDiscountCode: (code: string | null) => void;

  /* derived (computed) */
  totals: () => CartTotals;
  hasItem: (productId: string, cut: AbayaCut, size: number) => boolean;
  itemCount: () => number;
}

/* ─────────────────────────────────────────────────────
   Store
   ───────────────────────────────────────────────────── */

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      hasHydrated: false,
      isOpen: false,
      items: [],
      customer: null,
      discountCode: null,

      setHasHydrated: (v) => set({ hasHydrated: v }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (payload) => {
        const { product, cut, size, quantity = 1, note } = payload;
        const lineId = lineIdFor(product.id, cut, size);
        const existing = get().items.find((i) => i.lineId === lineId);

        if (existing) {
          set({
            items: get().items.map((i) =>
              i.lineId === lineId
                ? { ...i, quantity: i.quantity + quantity }
                : i,
            ),
            isOpen: true,
          });
          return;
        }

        const primaryImage =
          product.images.find((img) => img.primary) ?? product.images[0];

        const newItem: CartItem = {
          lineId,
          productId: product.id,
          productSlug: product.slug,
          productCode: product.code,
          productName: product.name,
          image: primaryImage,
          cut,
          cutLabel: CUT_LABELS[cut] ?? cut,
          size,
          sizeLabel: SIZE_LABELS_AR[size] ?? String(size),
          unitPrice: product.price,
          oldUnitPrice: product.oldPrice,
          quantity: Math.max(1, quantity),
          includesTarha: product.includesTarha,
          note,
          addedAt: new Date().toISOString(),
        };

        set({ items: [...get().items, newItem], isOpen: true });
      },

      removeItem: (lineId) =>
        set({ items: get().items.filter((i) => i.lineId !== lineId) }),

      updateQuantity: (lineId, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((i) => i.lineId !== lineId) });
          return;
        }
        set({
          items: get().items.map((i) =>
            i.lineId === lineId ? { ...i, quantity } : i,
          ),
        });
      },

      updateNote: (lineId, note) =>
        set({
          items: get().items.map((i) =>
            i.lineId === lineId ? { ...i, note } : i,
          ),
        }),

      clear: () =>
        set({ items: [], customer: null, discountCode: null, isOpen: false }),

      setCustomer: (customer) => set({ customer }),
      setDiscountCode: (code) => set({ discountCode: code }),

      totals: () => {
        const items = get().items;
        const subtotal = items.reduce(
          (acc, i) => acc + i.unitPrice * i.quantity,
          0,
        );
        const discount = items.reduce(
          (acc, i) =>
            acc +
            (i.oldUnitPrice && i.oldUnitPrice > i.unitPrice
              ? (i.oldUnitPrice - i.unitPrice) * i.quantity
              : 0),
          0,
        );
        const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
        // Sardah: free shipping inside KSA.
        const deliveryFee = 0;
        const grandTotal = subtotal + deliveryFee;

        return { totalItems, subtotal, discount, deliveryFee, grandTotal };
      },

      hasItem: (productId, cut, size) =>
        get().items.some((i) => i.lineId === lineIdFor(productId, cut, size)),

      itemCount: () =>
        get().items.reduce((acc, i) => acc + i.quantity, 0),
    }),
    {
      name: 'sardah-cart-v1',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      // Persist only the items + customer + discount code — never the
      // transient `isOpen` / `hasHydrated` flags.
      partialize: (state) => ({
        items: state.items,
        customer: state.customer,
        discountCode: state.discountCode,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

/* ─────────────────────────────────────────────────────
   Convenience selectors / hooks
   ───────────────────────────────────────────────────── */

/** Subscribe only to the hydration flag — avoids SSR/CSR mismatch. */
export function useCartHydrated(): boolean {
  return useCartStore((s) => s.hasHydrated);
}

/** Subscribe only to the count badge — minimizes re-renders. */
export function useCartCount(): number {
  return useCartStore((s) =>
    s.items.reduce((acc, i) => acc + i.quantity, 0),
  );
}
