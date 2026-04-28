# Phase 4 — Page Composition (Categories + Products)

> Status: ✅ Completed — `genspark_ai_developer` branch
> Build: 30 static pages prerendered, 0 type errors

## Deliverables

### Pages (3 routes)

| Route | Type | Count | Notes |
|---|---|---|---|
| `/categories` | Static | 1 | Editorial index of all 6 categories |
| `/categories/[slug]` | SSG | 6 | One per category, `dynamicParams = false` |
| `/products/[slug]` | SSG | 20 | One per SKU, `dynamicParams = false` |

`generateStaticParams()` is exported on both dynamic routes — every URL is
fully prebuilt at deploy time.

### `/categories` — Index page (`src/app/categories/page.tsx`)

- Pure server component, breadcrumb + `SectionHeading` hero, 3‑column grid
  of `CategoryCard`s ordered by their `order` field.
- Per-page metadata: title, description, canonical, Open Graph.

### `/categories/[slug]` — Category page

- **Server-side facet extraction**: walks the in-category product set once
  to produce the unique fabrics, available cuts, and price min/max for
  the toolbar (no client-side recomputation on initial paint).
- **JSON-LD `ItemList`** emitted with all products in the slice (SEO).
- Hands the data to a single client island — `CategoryToolbar` — which
  owns sort + filter UI.
- Empty state CTA ↔ back to `/categories` when a slice is empty.
- Dynamic per-category metadata (title from `category.seoTitle`,
  Open Graph image from `coverImage`, canonical URL).

### `/products/[slug]` — Product detail page

- Two-column lockup at `lg:` (gallery sticky on the left, purchase panel
  on the right).
- **Gallery (`ProductGallery`)**: cross-fade main + 5-up thumbnail rail,
  graceful fallback monogram on 404 via `ProductImageFrame`.
- **Purchase panel (`ProductPurchasePanel`)**: code + name + rating +
  badges, `PriceTag`, description, `CutSelector`, `SizeSelector` with
  size-guide trigger, `QuantityStepper`, animated Add-to-cart →
  Zustand cart store, customer-note textarea (when allowed),
  reassurance grid, specs strip.
- **Story strip**: 3 luxury cards — design details / shipping /
  quality + tag chips.
- **Reviews section**: per-product reviews via `getReviewsByProduct(code)`.
- **Related products** (`getRelatedProducts`, limit 4) → 4-up grid.
- **Closing**: `PolicyStrip`.
- **JSON-LD**: `Product` schema (offers, aggregateRating, review[]) +
  `BreadcrumbList`.

## New components added in Phase 4

| Component | Purpose | Lines |
|---|---|---|
| `Breadcrumb` (server) | RTL crumbs with optional gold separator | 90 |
| `CategoryToolbar` (client) | Sort + filter + grid + mobile drawer | 477 |
| `ProductGallery` (client) | Main image with cross-fade + thumb rail | 99 |
| `ProductPurchasePanel` (client) | The full right-column purchase island | 312 |
| `CutSelector` (client) | Pill-style radio group for `AbayaCut` | 65 |
| `SizeSelector` (client) | 6-col chip grid with strike on unavailable | 75 |
| `QuantityStepper` (client) | Accessible +/- stepper (3 sizes, inverse) | 109 |

`src/components/index.ts` updated with full exports for the new pieces.

## Validation

```bash
$ npm run type-check
> tsc --noEmit
# 0 errors

$ npm run build
✓ Compiled successfully in 5.8s
✓ Generating static pages using 3 workers (30/30) in 979ms

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /categories
├ ● /categories/[slug]   (6 paths)
└ ● /products/[slug]    (20 paths)
```

### Live route checks

| URL | Status |
|---|---|
| `/` | 200 |
| `/categories` | 200 (renders all 6 category names) |
| `/categories/abayas` | 200 (renders 10+ product codes incl. K-09, S-138, S-114, …) |
| `/categories/sale` | 200 (renders K-09, S-138, S-162) |
| `/products/abaya-k09` | 200 (renders K-09, “القصة”, “المقاس”, “إضافة للسلة”, “دليل المقاسات”) |
| `/products/abaya-lace-s138` | 200 |

JSON-LD: 4 `application/ld+json` blocks on every product page —
`Product`, `Offer`, `Brand`, `Organization`, `BreadcrumbList`, `ListItem`.

## Notes

- All inputs in the Purchase Panel are accessible (`role`, `aria-checked`,
  `aria-live`). The CTA only enables once a size is selected; tapping
  it without one shows an inline Arabic error.
- Filter drawer locks body scroll on mobile (`document.body.style.overflow`).
- All product/category links use clean slugs (`/products/abaya-k09`,
  `/categories/abayas`). Legacy Salla short links remain in data for
  potential future redirects but aren't surfaced in the UI.
- No client JS at all on `/categories` (index page) — pure SSG markup
  except the inner `CategoryCard` (when the user scrolls into view).

## Next — Phase 5 (proposed)

Cart drawer + checkout flow:

1. `CartDrawer` (slide-in from edge, glass surface, line-item rows with
   `QuantityStepper`, totals, "متابعة عبر واتساب" CTA wired to
   `buildCheckoutUrl` from `lib/whatsapp.ts`).
2. `/cart` full page mirror of the drawer.
3. `/checkout` (lightweight WhatsApp confirmation form).
4. `/order-confirmation` (post-WhatsApp success state).
5. Empty-cart visuals + persistent footer CTA.
