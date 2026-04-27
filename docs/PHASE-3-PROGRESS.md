# Phase 3 — Component Library (UI Showroom)

Status: ✅ **Completed** — pending approval to move to Phase 4 (page composition).

This phase delivers the entire **presentational layer** of the boutique:
primitives, domain components, layout chrome, marketing strips, and a
client-side modal — all RTL-correct, mobile-first, with Framer Motion
micro-interactions, and connected to the Phase 2 data layer via real
imports.

---

## 1. UI Primitives — `src/components/ui/`

| Component         | Variants / Sizes                              | Highlights                                                        |
| ----------------- | --------------------------------------------- | ----------------------------------------------------------------- |
| `MagneticButton`  | onyx / gold / outline / light / ghost; sm/md/lg | Spring-physics magnetic hover, renders as button / Link / external `<a>` |
| `LuxuryCard`      | ivory / pearl / onyx / glass; padding sm–xl    | Optional gold border, optional viewport fade-in                    |
| `PriceTag`        | sm / md / lg / xl, stack & inline             | Auto discount % badge, SAR symbol, Latin numerals                  |
| `RatingStars`     | xs / sm / md / lg; inverse                    | Half-star fill, optional value + reviews count                     |
| `ProductBadge` + `ProductBadgeStack` | new / sale / limited / bestseller / soldout | Lucide icon + Arabic label + theme-aware tint           |
| `SectionHeading`  | center / start; size md–2xl; inverse           | Eyebrow + heading + gold-accent + intro + CTA slot                |

---

## 2. Domain Components

### `src/components/product/`
- **`ProductImageFrame`** — Wraps `next/image` with the boutique frame,
  blur-up placeholder, and a stylized monogram fallback (sparkles + Arabic
  "سردة" + product code) when the file 404s. Lets us ship UI before the
  real photo pipeline runs.
- **`ProductCard`** — Editorial product tile: image frame, badges, code,
  name, fabric line, free-tarha pill, price, rating, CTA chevron.
  Sold-out scrim + opacity. Stagger-friendly via `index` prop.

### `src/components/category/`
- **`CategoryCard`** — Onyx tonal portrait tile with editorial fade,
  noise overlay, gold halo on hover, subtitle + description + chevron CTA.

### `src/components/feedback/`
- **`ReviewCard`** — Avatar (initials) + verified badge + star rating +
  Arabic blockquote + decorative quote glyph. `inverse` variant for
  onyx review walls.

---

## 3. Layout Chrome — `src/components/layout/`

| Component          | Purpose                                                                |
| ------------------ | ---------------------------------------------------------------------- |
| `AnnouncementBar`  | Top onyx strip; static centered on desktop, infinite marquee on mobile |
| `HeaderLuxury`     | Sticky glass-on-scroll header, three-zone RTL layout (logo / nav / icons), live cart-count badge from Zustand, mobile drawer |
| `FooterEditorial`  | Onyx footer with 4 columns (categories / boutique / care / newsletter), payment row, discount code, legal note |

All three are now mounted globally in `src/app/layout.tsx`, plus a
**skip-to-main** accessibility link.

---

## 4. Marketing & Modals — `src/components/marketing/`

- **`PolicyStrip`** — 4-up reassurance grid (delivery, payment, exchange,
  shipping…). Uses `POLICY_STRIP` from Phase 2. Light & onyx variants.
- **`HeroSlide`** — Skeleton hero block with eyebrow, headline,
  gold-shimmer accent, intro paragraph, dual CTAs, ambient blurred
  champagne/rose halos. Onyx/pearl/image tones.
- **`SizeGuideModal`** — Full editorial modal listing the size table
  (50–60 × length / chest / sleeve / shoulder / height), six cut
  explanations, and five sizing tips. ESC-to-close, scroll lock,
  optional `highlightedSize` for the row currently selected on the
  product page.
- **`SizeGuideTrigger`** — Tiny client wrapper that owns the modal's
  open/close state, exposed for product pages and the demo gallery.

---

## 5. Connected Cart Indicator

`HeaderLuxury` consumes the **Zustand cart store** from Phase 2:
- `useCartCount()` — minimum-render selector for the badge number
- `useCartHydrated()` — only render the badge after SSR hydration
  to avoid mismatch
- `openCart()` — drawer toggle (the actual `CartDrawer` component
  arrives in Phase 5)

---

## 6. Component Gallery Page

`src/app/page.tsx` is now a curated showroom that presents every
Phase 3 component in real context:

1. **Hero** — onyx tone, "عبايات تُحاك بالأناقة | بصمتك الخاصة"
2. **Categories grid** — all 6 real Sardah collections
3. **Policy strip** — 4 reassurance points
4. **Featured products** — 4 real SKUs (K-09, S-138, S-162, S-159…)
5. **On-Sale row** — 4 SKUs marked `isOnSale`, with `sD1544` callout
6. **Reviews wall** — 4 verbatim reviews on an onyx canvas
7. **Component Lab** — buttons / prices / ratings / badges / size-guide
   trigger / sold-out card sample

This page lets the brand & QA teams **see the entire library at once**
before page composition begins in Phase 4.

---

## 7. Validation

| Check                        | Result |
| ---------------------------- | ------ |
| `npm run type-check`         | ✅ 0 errors |
| `npm run build`              | ✅ 0 errors, 3 static pages, 5.2s |
| Real data on rendered HTML   | ✅ K-09, S-138, S-162, sD1544, لطيفة, ندى الغامدي, عفراء all present |
| `<html lang="ar" dir="rtl">` | ✅ |
| Cart count from Zustand      | ✅ Hydration-gated, no SSR mismatch |
| Skip-to-main link            | ✅ Present, visible on focus |
| Reduced-motion support       | ✅ Inherited from `globals.css` |

**Components delivered**: **17** files (15 components + 2 barrel files)
across 5 component folders. Total: **~50 KB** of presentational TSX.

---

## 8. Next — Phase 4 Proposal

Page composition (now that primitives exist):

- `/categories/[slug]` — generated for the 6 real categories with
  filter sidebar (price / fabric / cut / in-stock), sort dropdown,
  responsive product grid, breadcrumb, hero band per category.
- `/products/[slug]` — 20 real SKUs, image gallery + thumbs, cut +
  size selectors, qty stepper, "Add to cart", policy strip, related
  products, structured data (Product + AggregateRating + BreadcrumbList).
- `/categories` index — overview of all categories.
- Static SEO files: `robots.txt`, `sitemap.ts` (dynamic from products
  + categories), and per-page metadata.

→ Please reply **"موافقة" / "Approved"** to proceed to Phase 4, or
suggest adjustments to Phase 3.
