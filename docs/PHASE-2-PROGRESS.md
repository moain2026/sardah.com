# Phase 2 — Data Layer & Domain Foundations

Status: ✅ **Completed** — pending approval to move to Phase 3 (UI components).

This phase delivers the entire **data spine** of the boutique: types, real
catalogue data, helpers, the cart store, the WhatsApp checkout builder,
and an image optimization pipeline — all without touching UI components.

---

## 1. TypeScript Domain Types — `src/types/`

| File           | Lines | Purpose                                                     |
| -------------- | :---: | ----------------------------------------------------------- |
| `category.ts`  |  35   | `CategorySlug` union + `Category` interface                 |
| `product.ts`   |  179  | `Product`, `ProductImage`, `ProductSize`, `AbayaCut`, badges, sort/filter states |
| `review.ts`    |  23   | Real customer review shape (verified flag, ISO date, productCode link) |
| `cart.ts`      |  69   | `CartItem`, `CartTotals`, `CheckoutCustomer`, `AddToCartPayload` |
| `index.ts`     |   5   | Barrel re-export                                            |

All types are strict, exhaustive, and JSDoc-commented in Arabic + English.

---

## 2. Static Real Data — `src/lib/`

### `categories.ts` — 6 real Sardah categories
Real Salla legacy slugs preserved (`EdVRXx`, `GXbNOn`, `AXDZwG`, `WBPXrz`,
`dzGEoe`, `offers`) for traceability + clean SEO slugs:
`abayas`, `winter`, `occasions`, `practical`, `niqab`, `sale`.

### `products.ts` — **20 real SKUs**
All product codes verified against sardah.com:
`K-09, S-138, S-162, S-161, S-160, S-159, S-157, S-155, S-154, S-151,
S-150, S-145, S-143, S-136, S-135, S-127, S-122, S-114, S-164, N-330`.

Each product entry includes:
- Real price + old-price
- Real fabric (جاكار / كريب ملكي / دانتيل / مخمل / بليزر …)
- Real cuts (`regular` / `quarter-flare` / `half-flare` / `full-flare` / `blazer` / `classic`)
- Real closure (`snap` = طقطق, etc.)
- Free-tarha flag (طرحة مجانية)
- Sizes 50–60
- Stock + sold-out flags (e.g., S-114 marked sold-out)
- Arabic short + long descriptions, feature bullets, tags, SEO metadata

Helpers exported:
`getAllProducts`, `getProductBySlug`, `getProductByCode`,
`getProductsByCategory`, `getFeaturedProducts`, `getNewArrivals`,
`getOnSaleProducts`, `getRelatedProducts`, `sortProducts`,
`filterProducts`, `getAllFabrics`, `getPriceBounds`, `PRODUCT_SLUGS`.

### `reviews.ts` — 4 real verified reviews
Latifa, Nada, Loly, Afraa — extracted verbatim with their original Arabic
texts. Helpers: `getAllReviews`, `getReviewsByProduct`, `getAverageRating`.

### `policy.ts` — Real Sardah policies
6 structured policy points + `POLICY_RAW_LINES` (verbatim). Mirrors:
- 5–13 day delivery
- No COD
- No refunds; defect-only exchange
- Free shipping inside KSA
- Korean fabrics + clean stitching guarantee

### `sizeGuide.ts`
- `SIZE_GUIDE`: 6 rows (50–60) with length / chest / sleeve / shoulder + recommended height
- `CUT_EXPLANATIONS`: 6 cuts × Arabic descriptions
- `SIZE_TIPS`: 5 boutique tips for choosing the right size

### `_productHelpers.ts`
Shared builders: `DEFAULT_CUT_OPTIONS`, `DEFAULT_SIZES`, `SOLDOUT_SIZES`,
`buildImage`, `buildAbayaImageSet`, `buildCutOptions`. Used internally to
keep `products.ts` clean and consistent.

---

## 3. Cart State — `src/store/cartStore.ts`

Persistent **Zustand** store with:
- `localStorage` persistence (key `sardah-cart-v1`)
- Hydration gate (`hasHydrated` + `useCartHydrated()`) to avoid SSR mismatch
- Normalized line items: `lineId = productId::cut::size`
- Actions: `addItem` / `removeItem` / `updateQuantity` / `updateNote` / `clear`
- Drawer state: `isOpen` + `openCart` / `closeCart` / `toggleCart`
- Customer + discount-code slots (used by Phase 5 checkout)
- Derived selectors: `totals()` (subtotal / discount / delivery / grand total),
  `hasItem`, `itemCount`
- Tiny re-render selectors: `useCartCount()`, `useCartHydrated()`

Free shipping inside KSA → `deliveryFee = 0`.

---

## 4. WhatsApp Checkout Builder — `src/lib/whatsapp.ts`

Mode A "manual order" message generator:
- `buildCheckoutMessage(input)` → fully formatted Arabic message including:
  - Header greeting
  - Itemized list with code, cut, size, qty, price, free tarha + per-item note
  - Totals block (subtotal / savings / shipping / final)
  - Customer block (name / city / phone / general note)
  - Discount code echo (`sD1544` by default)
- `buildCheckoutUrl(input)` → `https://wa.me/<phone>?text=<encoded>` ready to open

Phone defaults to `NEXT_PUBLIC_WHATSAPP` env var (placeholder `966500000000`
in dev).

---

## 5. Image Optimization Pipeline — `scripts/optimize-images.mjs`

Runs via `npm run optimize-images [<CODE>]`.

For each `public/images/raw/<CODE>/*.{jpg,jpeg,png,webp}`:
1. Re-encodes at **AVIF** (q55, effort 6) and **WebP** (q78) at widths
   400 / 800 / 1200 / 1600 — clamped to 1.5× the intrinsic width.
2. Emits a default fallback `.webp` (q80, ≤ 1600px) used as `<img src>`.
3. Generates a **20×28 base64 LQIP** and writes/merges
   `public/images/lqip.json` so `next/image` can use `placeholder="blur"`.

This gives a single command to take raw photo dumps → production-ready
multi-resolution `<picture>` set with blur placeholders, exactly as the
Phase 0 strategy required.

---

## 6. Validation

| Check                     | Result        |
| ------------------------- | ------------- |
| `npm run type-check`      | ✅ Pass (0 errors) |
| `npm run build`           | ✅ Pass (4.4s, 0 errors, 3 static pages) |
| Real product count        | **20 / 20** verified codes |
| Real categories           | **6 / 6** verified |
| Real reviews              | **4 / 4** verbatim |

---

## 7. Next — Phase 3 Proposal

UI Components (presentational, no business logic yet):
- `<HeaderLuxury />` (sticky, magnetic, RTL nav with category mega-menu)
- `<FooterEditorial />` (Sardah brand, social, payments, policy strip)
- `<CategoryCard />` / `<ProductCard />` / `<ProductBadge />`
- `<PriceTag />` / `<RatingStars />` / `<MagneticButton />`
- `<LuxuryCard />` / `<HeroCarousel />` skeleton
- `<SizeGuideModal />` (uses Phase 2 `SIZE_GUIDE`)
- `<PolicyStrip />` (uses Phase 2 `POLICY_STRIP`)
- `<ReviewCard />` (uses Phase 2 `REVIEWS`)
- All RTL-correct, mobile-first, with Framer Motion micro-interactions.

→ Please reply **"موافقة" / "Approved"** to move to Phase 3, or
suggest adjustments to Phase 2.
