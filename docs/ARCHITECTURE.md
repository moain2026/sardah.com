# 🏛️ Sardah Abayas — Architecture & Agent Handover Guide

> **For the next agent:** read this file end-to-end before touching anything.
> It contains the room-by-room tour of the codebase, every convention, the theme system, the data shape, the motion contract, the image pipeline, and the most common pitfalls discovered across the build.

---

## 1. Mental model in 30 seconds

- **Sardah is a promotional showcase**, not a store. There is no cart, no checkout, no payment. Every CTA funnels to **WhatsApp**, the **gallery**, or the **contact** page.
- The site is **Arabic-first, RTL-perfect**, mobile-first, and built for **editorial luxury** (Hermès / Saint Laurent visual language).
- All data is **local** (no DB, no API). Products, categories, and reviews live in `src/lib/*.ts`.
- All pages are **statically rendered** at build time. The production build outputs **33 static HTML pages**.
- The **single source of truth for colors** is `tailwind.config.ts`. The **single source of truth for the homepage composition** is `src/app/page.tsx`.

---

## 2. Stack & runtime

| Layer | Choice | File |
|---|---|---|
| Framework | Next.js 16/15 App Router | `next.config.ts` |
| React | 19 | `package.json` |
| Language | TypeScript (strict) | `tsconfig.json` |
| Styling | Tailwind CSS 3.4 + CSS variables | `tailwind.config.ts`, `src/app/globals.css` |
| Animation | Framer Motion 11 | `src/components/motion/*` + `src/lib/motion.ts` |
| Icons | `lucide-react` | — |
| Fonts | `next/font/google`: Aref Ruqaa, IBM Plex Sans Arabic, Tajawal | `src/app/layout.tsx` |
| Images | `next/image` + Sharp pipeline | `scripts/*.mjs`, `public/images/*` |
| State | Zustand 5 (currently unused; kept for future light state) | — |

> No backend. No analytics. No SW yet (PWA manifest only).

---

## 3. Folder map (read me first)

```
src/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # ★ Root layout + global chrome
│   ├── page.tsx                      # ★ Homepage composition
│   ├── globals.css                   # CSS variables + base styles
│   ├── loading.tsx                   # Global loading skeleton
│   ├── not-found.tsx                 # 404
│   ├── about/page.tsx                # /about
│   ├── contact/page.tsx              # /contact
│   ├── gallery/page.tsx              # /gallery (full grid)
│   ├── categories/
│   │   ├── page.tsx                  # /categories (index)
│   │   └── [slug]/page.tsx           # /categories/abayas, /winter, …
│   └── products/
│       └── [slug]/page.tsx           # /products/<slug> (20 SSG pages)
│
├── components/
│   ├── index.ts                      # ★ Barrel export. Add NEW components here.
│   ├── layout/                       # Site chrome
│   │   ├── HeaderLuxury.tsx          # Sticky glass header + mobile drawer
│   │   ├── FooterEditorial.tsx       # Large editorial footer
│   │   └── BottomNav.tsx             # Mobile-only floating nav (≤1024px)
│   │                                 # NOTE: AnnouncementBar.tsx + MarqueeStatement.tsx
│   │                                 # were intentionally REMOVED (commit 7a4a8e5).
│   │                                 # Do not re-introduce them without explicit ask.
│   ├── marketing/                    # Homepage + landing sections
│   │   ├── HeroCinematic.tsx         # ★ Hero (split-text + parallax + magnetic CTAs)
│   │   ├── EditorialStory.tsx        # 3-pillar manifesto
│   │   ├── CollectionShowcase.tsx    # Asymmetric category grid
│   │   ├── FeaturedSelection.tsx     # Sticky-side product strip
│   │   ├── PolicyStrip.tsx           # Brand assurances (free shipping, etc.)
│   │   ├── ReviewsCinema.tsx         # Dark cinema reviews
│   │   ├── CtaCinematic.tsx          # Final champagne CTA
│   │   ├── SaleSpotlight.tsx         # Optional sale highlight
│   │   ├── HeroSlide.tsx             # Legacy hero (kept, unused on homepage)
│   │   ├── SizeGuideModal.tsx        # Size table modal
│   │   └── SizeGuideTrigger.tsx      # Button that opens the modal
│   ├── product/
│   │   ├── ProductCard.tsx           # Card on grids
│   │   ├── ProductGallery.tsx        # PDP image gallery
│   │   ├── ProductImageFrame.tsx     # 3:4 portrait frame w/ overlays
│   │   ├── ProductPurchasePanel.tsx  # PDP info + WhatsApp CTA (NOT a buy button)
│   │   ├── CutSelector.tsx           # Cut variants
│   │   └── SizeSelector.tsx          # Size pills
│   ├── category/
│   │   ├── CategoryCard.tsx
│   │   └── CategoryToolbar.tsx       # Sort + filter chips
│   ├── feedback/
│   │   └── ReviewCard.tsx
│   ├── navigation/
│   │   └── Breadcrumb.tsx
│   ├── ui/                           # Primitives (no business logic)
│   │   ├── MagneticButton.tsx        # Magnetic hover button
│   │   ├── LuxuryCard.tsx
│   │   ├── PriceTag.tsx
│   │   ├── ProductBadge.tsx          # NEW / SALE / SOLD-OUT
│   │   ├── RatingStars.tsx
│   │   ├── SectionHeading.tsx
│   │   └── index.ts
│   └── motion/                       # Reusable animation primitives
│       ├── Reveal.tsx                # Fade-up on enter
│       ├── SplitText.tsx             # Letter / word split for hero
│       ├── Marquee.tsx               # Low-level horizontal scroller (still used in
│       │                             # HeroCinematic? NO — only in SaleSpotlight + about)
│       ├── ParallaxImage.tsx
│       ├── MagneticDeep.tsx          # Magnetic wrapper for any child
│       ├── ScrollProgress.tsx        # Top progress bar
│       ├── CustomCursor.tsx          # Desktop only
│       ├── PageTransition.tsx        # Fade between routes
│       ├── GrainOverlay.tsx          # Subtle noise
│       ├── GradientMesh.tsx          # Animated gradient mesh
│       └── index.ts
│
├── lib/                              # Pure data & utilities (no React)
│   ├── products.ts                   # ★ 20 real Sardah SKUs
│   ├── categories.ts                 # ★ 6 categories
│   ├── reviews.ts                    # ★ 6 verbatim reviews
│   ├── policy.ts                     # Brand promises (free shipping, etc.)
│   ├── sizeGuide.ts                  # Size table
│   ├── motion.ts                     # EASE_LUXE, variants, durations
│   ├── use-reduced-motion.ts         # a11y hook
│   ├── utils.ts                      # cn(), formatters, formatPrice
│   └── _productHelpers.ts            # Internal helpers for products.ts
│
└── types/                            # Strict TS types (single source of truth)
    ├── product.ts                    # Product, ProductImage, ProductSize, AbayaCut, …
    ├── category.ts                   # Category, CategorySlug
    ├── review.ts                     # Review
    └── index.ts
```

---

## 4. Theme system — read this carefully

There are **two parallel theme layers**. Both must agree, otherwise dark text appears on dark backgrounds (we have learned this the hard way — see §11 pitfalls).

### 4.1 Tailwind tokens (`tailwind.config.ts`)

These are the literal HEX values that drive every `bg-*`, `text-*`, `border-*` class:

```ts
colors: {
  onyx: {
    DEFAULT: '#080808',
    50:  '#f6f6f6', 100: '#e7e7e7', 200: '#cfcfcf',
    300: '#9e9e9e', 400: '#5e5e5e', 500: '#2c2c2c',
    600: '#1f1f1f', 700: '#151515', 800: '#0e0e0e', 900: '#080808',
  },
  pearl: {
    DEFAULT: '#EFE5D4',  // ★ "Champagne Nude" — warm beige base
    50:  '#F7EFE0',
    100: '#F2E9D6',
    200: '#EFE5D4',
    300: '#E6D9C3',
    400: '#D9C8AC',
  },
  ivory:    '#F7EFE0',
  champagne: { DEFAULT: '#C8A96A', 50…900 },
  sand:  '#E8DED0',
  taupe: '#B9A89A',
  rose:  { DEFAULT: '#B98D88', soft: '#D4ABA6' },
  // semantic
  success: '#5C8A6F', danger: '#A14A4A', warning: '#C99B5C',
}
```

### 4.2 CSS variables (`src/app/globals.css`)

The same palette, mirrored as `--color-*` custom properties so non-Tailwind contexts (gradients, inline styles, SVG) can stay in sync:

```css
:root {
  --color-onyx: 8 8 8;          /* RGB triplets for rgb(var(--color-onyx) / .8) */
  --color-charcoal: 21 21 21;
  --color-pearl: 239 229 212;   /* ★ stays in sync with tailwind.config.ts */
  --color-ivory: 247 239 224;
  --color-champagne: 200 169 106;
  /* … */
  --bg-base: var(--color-pearl);
  --text-primary: var(--color-onyx);
}
```

### 4.3 Semantic conventions (memorise these)

| Class | Meaning |
|---|---|
| `bg-pearl` / `bg-pearl-50` | **Light editorial background** (default body, cream sections) |
| `bg-onyx-950` / `bg-onyx` | **Dark cinematic background** (hero overlays, footer, dark CTA) |
| `text-onyx-950` / `text-onyx-900` | **Dark text on light background** |
| `text-pearl-50` / `text-pearl-100` | **Light text on dark background** |
| `text-champagne-300` | **Gold accent text on dark backgrounds** |
| `text-champagne-700` | **Gold accent text on light backgrounds** |
| `border-pearl-300` | Soft hairline on light bg |
| `border-pearl/15` | Soft hairline on dark bg (use opacity, not pearl-300) |

> ⚠️ Never put `text-onyx-950` on a `bg-onyx-*` background — text will be invisible.
> ⚠️ Never put `text-pearl-50` on a `bg-pearl-*` background — text will be invisible.

### 4.4 How to change the base color (lesson learned)

The cleanest, lowest-risk way to recolor the whole site is to change the **`pearl` token in `tailwind.config.ts`** AND the matching **`--color-pearl` in `globals.css`** in the same commit. Everything else cascades automatically (header, footer, cards, sections).

This was done in commit `77c1d5f` to swap pure white `#F8F5EF` → champagne nude `#EFE5D4`.

> ❌ Do NOT attempt a "dark espresso" inversion by remapping `pearl` → dark. We tried this in commit `acd48bf` and reverted in `6c4fadf` because there are 85+ `text-onyx-950` headings throughout the codebase that become invisible. Inversion requires touching every component, not just the tokens.

---

## 5. Fonts (Arabic + RTL)

Configured in `src/app/layout.tsx` via `next/font/google`:

| Family | Variable | Use |
|---|---|---|
| **Aref Ruqaa** | `--font-aref-ruqaa` | Display / large editorial titles (`font-ruqaa`) |
| **IBM Plex Sans Arabic** | `--font-ibm-plex-arabic` | Default body (`font-sans` / `font-plex`) |
| **Tajawal** | `--font-tajawal` | Buttons, captions (`font-tajawal`) |

`<html lang="ar" dir="rtl">` is set globally. Tailwind's logical properties (`ms-*`, `me-*`, `start-*`, `end-*`) are used everywhere — never `ml-*` / `mr-*`.

---

## 6. Data shape

### 6.1 Product (`src/lib/products.ts` — 20 SKUs)

```ts
{
  id: 'abaya-k09',
  slug: 'abaya-k09',          // → /products/abaya-k09
  legacySlug: 'zvmODgq',      // original sardah.com slug for reference
  code: 'K-09',
  name: 'عباية K-09',
  subtitle: 'جاكار أسود فاحم',
  category: 'occasions',      // primary
  secondaryCategories: ['abayas'],
  price: 180,
  oldPrice: 209,              // optional — triggers SALE badge
  currency: 'SAR',
  images: ProductImage[],     // built via buildAbayaImageSet(...)
  cuts: AbayaCut[],           // 'regular' | 'half-flare' | …
  sizes: ProductSize[],       // 50, 52, 54, 56, 58, 60
  closure: 'snap' | 'button' | 'zipper' | 'slip-on',
  fabric: 'كريب ملكي' | …,
  features: string[],
  freeTarha: boolean,
  isNew: boolean,
  featured: boolean,
  stockStatus: 'in-stock' | 'sold-out' | 'low-stock' | 'pre-order',
}
```

Helper exports in `products.ts`: `getFeaturedProducts(n)`, `getNewArrivals(n)`, `getProductBySlug(slug)`, `getProductsByCategory(slug)`, `filterAndSortProducts(filter, sort)`.

### 6.2 Category (`src/lib/categories.ts` — 6 entries)

Slugs are: `abayas`, `winter`, `occasions`, `practical`, `niqab`, `sale`.
Each has: `name`, `subtitle`, `description`, `coverImage`, `accentColor`, `order`, `featured`, `seoTitle`, `seoDescription`.

### 6.3 Review (`src/lib/reviews.ts`)

Verbatim from sardah.com homepage. **Do not edit names or texts** — they are real customers.

---

## 7. Routing & static generation

| Route | File | Strategy |
|---|---|---|
| `/` | `src/app/page.tsx` | Static |
| `/about`, `/contact`, `/gallery` | `src/app/<route>/page.tsx` | Static |
| `/categories` | `src/app/categories/page.tsx` | Static |
| `/categories/[slug]` | `src/app/categories/[slug]/page.tsx` | SSG via `generateStaticParams()` returning all 6 slugs |
| `/products/[slug]` | `src/app/products/[slug]/page.tsx` | SSG via `generateStaticParams()` returning all 20 slugs |

Production build = **33 static pages**. There is **no SSR**, **no ISR**, **no client-side fetching**. All Arabic content is in the bundle.

---

## 8. Motion contract

- Easings live in `src/lib/motion.ts` (`EASE_LUXE`, `EASE_SMOOTH`, `EASE_EDITORIAL`).
- Reusable variants are exported there (`fadeUp`, `scaleIn`, …).
- Every motion component checks **`usePrefersReducedMotion()`** and **disables transforms / variants** when `true`.
- Hover effects on interactive UI use `transition-all duration-600 ease-luxe` (Tailwind utilities mapped via `transitionTimingFunction.luxe`).
- The custom cursor (`<CustomCursor/>`) is desktop-only and hidden on touch devices.

If you add a new animation, you **must**:
1. Read `usePrefersReducedMotion()` and short-circuit when reduced.
2. Set `viewport={{ once: true, margin: '0px 0px -10% 0px' }}` so it triggers as the section enters the viewport.
3. Use `EASE_LUXE` for entrance animations (long, soft) and `EASE_SMOOTH` for hover (short, snappy).

---

## 9. Image pipeline

All product / category / hero images live under `public/images/`. They are **already optimised** (WebP, with intrinsic dimensions known to `next/image`).

If you need to re-optimise, use the scripts:

```bash
npm run optimize-images          # Re-runs Sharp on existing assets
node scripts/process-real-images.mjs   # Convert raw photography → WebP
node scripts/generate-placeholders.mjs # Generate LQIP base64
```

Image structure:

```
public/images/
├── categories/
│   ├── abayas-cover.webp
│   ├── winter-cover.webp
│   ├── occasions-cover.webp
│   ├── practical-cover.webp
│   ├── niqab-cover.webp
│   └── sale-cover.webp
├── hero/
│   ├── hero-cinematic.webp           # Desktop hero
│   └── hero-cinematic-mobile.webp    # Mobile hero
└── products/
    └── <code>/                       # e.g. k09, s138, n330
        ├── 01.webp
        ├── 02.webp
        └── …
```

`buildAbayaImageSet()` in `src/lib/_productHelpers.ts` is the canonical way to attach images to a product.

---

## 10. Adding things — quick recipes

### 10.1 Add a new product

1. Drop your WebP files in `public/images/products/<code>/01.webp`, `02.webp`, …
2. Open `src/lib/products.ts` and add a new entry to the `PRODUCTS` array, copying the shape of an existing SKU.
3. Use `buildAbayaImageSet('<code>', N)` to attach images.
4. Run `npm run type-check` then `npm run build` — your new `/products/<slug>` will SSG automatically.

### 10.2 Add a new category

1. Add the cover at `public/images/categories/<slug>-cover.webp`.
2. Extend `CategorySlug` in `src/types/category.ts` (this will surface every place that needs to handle the new slug — the type system is your friend).
3. Add the new category object to `CATEGORIES` in `src/lib/categories.ts`.
4. Build — `/categories/<slug>` SSGs automatically.

### 10.3 Add a new review

Append to `REVIEWS` in `src/lib/reviews.ts`. The cinema reviews section auto-paginates.

### 10.4 Add a new color

1. Add the token to `tailwind.config.ts` under `theme.extend.colors`.
2. Add the matching CSS variable to `:root` in `src/app/globals.css`.
3. Use `bg-<token>` / `text-<token>` in JSX — never inline hex.

---

## 11. Pitfalls discovered during the build (must-read)

### 11.1 Dark text on dark background
There are **85+ instances of `text-onyx-950`** (dark text). They are deliberately paired with `bg-pearl-*` (light) sections. **Do not flip `pearl` to dark without a holistic remap of every `text-onyx-*`.** The "Royal Espresso" attempt (commit `acd48bf`) was reverted in `6c4fadf` for exactly this reason.

### 11.2 Removed promotional bars (do not re-add)
Three bars were intentionally removed at the user's request:
- **AnnouncementBar** (top of page) — file deleted
- **MarqueeStatement** (mantra strip after hero) — file deleted
- **HeroCinematic bottom marquee** (in-hero scrolling promo) — block removed inside `HeroCinematic.tsx`

The `<Marquee/>` low-level primitive is still kept in `src/components/motion/` because `SaleSpotlight.tsx` and `about/page.tsx` use it for editorial purposes (not advertising).

### 11.3 Mobile chrome theme color
`themeColor` in `src/app/layout.tsx` controls the mobile browser address-bar tint. After the Champagne Nude swap, light theme is `#EFE5D4`. Keep it in sync if you change `--color-pearl`.

### 11.4 `bg-pearl-50` cards on a pearl-50 section
When a card uses `bg-pearl-50` *inside* a section that is also `bg-pearl-50`, contrast collapses. Use `bg-ivory` (`#F7EFE0`) or `bg-pearl-100/70` for elevated cards on a pearl-50 surface.

### 11.5 `pkill -9 -f "next"` hangs in this sandbox
Use `KillBash` on the background shell ID instead, or `npx kill-port <port>`.

### 11.6 Dev mode is slow (≈16s first load)
Always test perceived performance with `npm run build && npm start`, not `npm run dev`.

### 11.7 The site is RTL
**Never** use `ml-*` / `mr-*` / `left-*` / `right-*`. Use `ms-*` / `me-*` / `start-*` / `end-*`. Tailwind's `dir`-aware logical utilities are enabled by default in v3.4.

---

## 12. Git workflow

- Working branch: **`genspark_ai_developer`**.
- After every meaningful change: **commit immediately**, then **push** to `origin/genspark_ai_developer`.
- PR target: `main`. PR #1 is the long-running PR for this branch: <https://github.com/moain2026/sardah.com/pull/1>.
- Commit format: `type(scope): subject` (Conventional Commits). Examples in this repo:
  - `feat(theme): swap white/cream to warm champagne nude`
  - `chore: cleanup dead components + refresh README`
  - `feat: remove all promotional bars from homepage`
- When squashing local commits before pushing, prefer non-interactive: `git reset --soft HEAD~N && git commit -m "…"`.

---

## 13. Useful npm scripts

| Script | What it does |
|---|---|
| `npm run dev` | Next dev server (slow first load — only for development) |
| `npm run build` | Static production build (33 pages) |
| `npm start` | Serve the production build |
| `npm run type-check` | `tsc --noEmit` (zero errors expected) |
| `npm run lint` | `next lint` |
| `npm run optimize-images` | Re-run Sharp pipeline |

---

## 14. Where to start if you only have 5 minutes

1. Open `src/app/page.tsx` — see how the homepage is composed.
2. Open `tailwind.config.ts` — see the entire palette.
3. Open `src/lib/products.ts` — see the data shape.
4. Run `npm run build && npm start`, then open the site.
5. If you need to tweak a color, change `tailwind.config.ts` + `src/app/globals.css` together. If you need to tweak content, edit `src/lib/*.ts`. If you need to tweak layout, edit `src/components/marketing/*` or the corresponding `src/app/<route>/page.tsx`.

— Last updated: 2026-04-28
