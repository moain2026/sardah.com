# 📜 Changelog — Sardah Abayas

All notable changes to this project, in reverse-chronological order.
Branch tracked: `genspark_ai_developer`. PR #1: <https://github.com/moain2026/sardah.com/pull/1>.

---

## [Unreleased] — 2026-04-28

### Added
- **`docs/ARCHITECTURE.md`** — full agent handover guide (folder map, theme system, data shape, motion contract, image pipeline, pitfalls, recipes).
- **`docs/CHANGELOG.md`** — this file.
- Fully refreshed `README.md` reflecting the actual state of the project (all phases ✅, current Champagne Nude palette, full route map).

### Changed
- `npm run lint` now uses `next lint` instead of the old `eslint . --ext .ts,.tsx` (no more "no such directory: lint" error).

### Removed
- `src/components/layout/AnnouncementBar.tsx` — dead file deleted.
- `src/components/marketing/MarqueeStatement.tsx` — dead file deleted.
- `--announcement-h` CSS variable from `globals.css` — no longer referenced.
- `AnnouncementBar` / `MarqueeStatement` exports from `src/components/index.ts`.

> Commit: `7a4a8e5` — `chore: cleanup dead components + refresh README`

---

## 7.1 — 2026-04-28 — Champagne Nude theme + clean homepage

### Added
- New brand base color: **Champagne Nude `#EFE5D4`** — warm beige replacing pure white `#F8F5EF`.
- Matching CSS variables in `globals.css`.
- Updated `themeColor` (mobile browser chrome) to `#EFE5D4`.

### Removed (per user request)
- Top **AnnouncementBar** (the strip above the header).
- After-hero **MarqueeStatement** (the «سردة · صنع يد · فخامة بإمضاء سعودي…» scrolling bar).
- In-hero **bottom marquee** inside `HeroCinematic` (the «شحن مجاني داخل المملكة، طرحة مجانية…» scrolling promo bar).

### Result
- Homepage now reads cleanly: Header → Hero → Editorial → Collections → Featured → Policy → New Arrivals → Reviews → CTA → Footer.
- No moving advertisement bars anywhere on the homepage.
- All 33 static pages still build with 0 TypeScript errors.

> Commits: `77c1d5f` (theme + announcement removal) and `a6765b6` (marquee removal).

---

## 7.0 — Reverted "Royal Espresso" experiment

### Reverted
- Commit `acd48bf` (`feat(theme): Royal Espresso palette — cinematic dark luxury`) was reverted via `6c4fadf`.

### Why
- The Royal Espresso attempt remapped `pearl` (light) → dark espresso to flip the entire site dark with one change. **This broke 85+ `text-onyx-950` headings** that suddenly became dark-on-dark and disappeared.
- The lesson: a true dark-mode pivot requires touching every `text-onyx-*` instance, not just the tokens. The user reverted to the working light-cream version.

> Commits: `acd48bf` (introduced) → `6c4fadf` (reverted).

---

## 6.5 — Real photography + cinematic hero — 2026-04-2x

### Added
- 75 real AI-generated luxury abaya photos (`public/images/products/<code>/01.webp` …).
- Cinematic hero photo for desktop + mobile (`public/images/hero/hero-cinematic.webp` + `…-mobile.webp`).
- Editorial design upgrade — see `docs/PHASE-6.5-DESIGN-UPGRADE.md`.

### Replaced
- All previous SVG product placeholders → real WebP photography.

> Commits: `2d89679`, `d9a6303`, `bf85bde`.

---

## 6 — Promotional pivot

### Removed
- Cart store, cart drawer, checkout flow, payment integration.
- Cart-related types and helpers.

### Added
- BottomNav (mobile-only ≤1024px) with pulsing WhatsApp CTA.
- WhatsApp deep-link in header, footer, BottomNav, and product purchase panel.
- Luxury mobile UX: floating WhatsApp button, edge-to-edge cards, sticky header on scroll.

> Commit: `38647be` — `feat(phase-7): convert to promotional showcase + luxury mobile UX`.

---

## 5 — Cinematic homepage

### Added
- `<HeroCinematic/>` — kinetic split-text headline, parallax accent rings, magnetic CTAs, side editorial frame.
- `<EditorialStory/>` — 3-pillar manifesto.
- `<CollectionShowcase/>` — asymmetric magazine-style category grid.
- `<FeaturedSelection/>` — sticky-side featured pieces.
- `<ReviewsCinema/>` — dark cinema-style customer reviews.
- `<CtaCinematic/>` — final champagne CTA.
- Motion primitives: `Reveal`, `SplitText`, `Marquee`, `ParallaxImage`, `MagneticDeep`, `ScrollProgress`, `CustomCursor`, `PageTransition`, `GrainOverlay`, `GradientMesh`.

---

## 4 — Catalog & detail pages

### Added
- Category pages with toolbar (sort + filter chips).
- Product detail page with gallery, cut/size selectors, fabric info, free-tarha indicator, WhatsApp CTA.
- Size guide modal.
- Gallery page (full editorial grid of all products).

---

## 3 — Storefront foundations

### Added
- Real Sardah product catalogue (20 SKUs) extracted from sardah.com.
- 6 categories with cover images and accent colors.
- 6 verbatim customer reviews.
- Strict TypeScript types for `Product`, `Category`, `Review`.
- Helpers: `getFeaturedProducts`, `getNewArrivals`, `getProductBySlug`, `getProductsByCategory`, `filterAndSortProducts`.

---

## 2 — Real data

> See `docs/PHASE-2-PROGRESS.md`.

---

## 1 — Foundation

### Added
- Next.js 15 App Router scaffold.
- Tailwind CSS 3.4 + custom CSS variables.
- Brand fonts via `next/font/google`: Aref Ruqaa, IBM Plex Sans Arabic, Tajawal.
- RTL global config (`<html lang="ar" dir="rtl">`).
- Master layout with `<HeaderLuxury/>`, `<FooterEditorial/>`, `<ScrollProgress/>`, `<CustomCursor/>`, `<PageTransition/>`.
- PWA manifest, theme-color, favicons.

---

## 0 — Discovery

> See `docs/PHASE-0-DISCOVERY.md`.

Brand audit, target audience, original site (sardah.com) analysis, color extraction, content inventory.
