# 🕊️ عبــايــات ســـــردة — Sardah Abayas

> **بوتيك رقمي فاخر للعبايات السعودية** — A luxury, Arabic-first, RTL-perfect digital boutique for Sardah Abayas.
> Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, and Framer Motion.

The site is a **promotional showcase** (no e-commerce, no cart, no checkout). All calls-to-action funnel the visitor to **WhatsApp**, the **gallery**, or the **contact** page.

---

## 🚀 Quick start

```bash
# Install
npm install

# Dev server (default port 3000, but any free port works)
npm run dev
PORT=5000 npm run dev

# Production build + start
npm run build
npm start

# Type-check (strict)
npm run type-check

# Lint
npm run lint

# Re-optimise images (rarely needed)
npm run optimize-images
```

Open <http://localhost:3000> (or whichever port you chose).

> ℹ️ **Sandbox preview:** when running on Genspark sandbox, use `GetServiceUrl` to obtain a public HTTPS URL on the chosen port.

---

## 🎯 Project status

The site is **feature-complete**. The current branch is `genspark_ai_developer` and shipped phases are:

| Phase | Status | Description |
|---|---|---|
| 0 | ✅ | Discovery, audit, brand strategy ([docs/PHASE-0-DISCOVERY.md](./docs/PHASE-0-DISCOVERY.md)) |
| 1 | ✅ | Foundation: architecture, theme tokens, fonts, RTL, master layout |
| 2 | ✅ | Real product data (20 SKUs), categories, reviews, types |
| 3 | ✅ | Cinematic homepage (Hero, Collections, Editorial, Featured, CTA) |
| 4 | ✅ | Category pages, product pages, size guide, gallery |
| 5 | ✅ | Promotional pivot — cart/checkout removed, WhatsApp funnel |
| 6 | ✅ | PWA manifest, SEO metadata, Open Graph, mobile bottom nav |
| 6.5 | ✅ | Editorial design upgrade ([docs/PHASE-6.5-DESIGN-UPGRADE.md](./docs/PHASE-6.5-DESIGN-UPGRADE.md)) |
| 7 | ✅ | Real AI-generated abaya photography (75 images), cinematic hero photo |
| 7.1 | ✅ | Theme refinement: warm "Champagne Nude" base, clean homepage flow |

➡️ For the deep dive on architecture, conventions, and how to extend the site, read **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)**.
➡️ For the full change log and per-version notes, read **[docs/CHANGELOG.md](./docs/CHANGELOG.md)**.

---

## 🛠️ Tech stack

| Concern | Choice |
|---|---|
| Framework | **Next.js 16 / 15 (App Router)** with React 19 |
| Language | **TypeScript** (strict mode) |
| Styling | **Tailwind CSS 3.4** + custom CSS variables (`src/app/globals.css`) |
| Animation | **Framer Motion 11** (with `prefers-reduced-motion` support) |
| Icons | `lucide-react` |
| State | **Zustand 5** (kept for future light state — currently unused) |
| Fonts | Aref Ruqaa, IBM Plex Sans Arabic, Tajawal (via `next/font/google`) |
| Images | `next/image` + Sharp (WebP/AVIF pipeline) |
| Forms / commerce | **None** — site is promotional; all CTAs route to WhatsApp |
| PWA | Manifest + theme color, no SW yet |

---

## 🎨 Brand palette (current — "Champagne Nude")

The base background was deliberately **warmed** away from pure white into a soft champagne-nude, while keeping the editorial monochrome contrast.

| Token | HEX | Usage |
|---|---|---|
| `pearl` (DEFAULT) | `#EFE5D4` | Body / base background — warm champagne nude |
| `pearl-50` | `#F7EFE0` | Lifted cards on the base |
| `pearl-100` | `#F2E9D6` | Soft surfaces |
| `pearl-200` | `#EFE5D4` | Same as base, used for borders |
| `pearl-300` | `#E6D9C3` | Hairlines |
| `pearl-400` | `#D9C8AC` | Soft accents |
| `ivory` | `#F7EFE0` | Cards (legacy alias) |
| `onyx` | `#080808` | Headings, dark sections, text on light |
| `onyx-700` | `#151515` | Footer, dark cards |
| `onyx-600` | `#1F1F1F` | Cards in dark sections |
| `champagne` (DEFAULT) | `#C8A96A` | Gold accents, hairline borders, CTA |
| `champagne-200..400` | `#E5D29A → #C8A96A` | Gradient mesh, gold-text |
| `sand` | `#E8DED0` | Soft dividers (legacy) |
| `taupe` | `#B9A89A` | Muted text |
| `rose` | `#B98D88` | Editorial accent |

> Where values are defined: `tailwind.config.ts` (Tailwind classes such as `bg-pearl`, `text-onyx-950`) and `src/app/globals.css` (CSS custom properties such as `--color-pearl`, `--color-onyx`).

---

## 📁 Project structure

```
.
├── docs/                                # Phase docs + architecture + changelog
│   ├── ARCHITECTURE.md                  # ★ start here for deep context
│   ├── CHANGELOG.md
│   ├── PHASE-0-DISCOVERY.md
│   ├── PHASE-2-PROGRESS.md
│   ├── PHASE-3-PROGRESS.md
│   ├── PHASE-4-PROGRESS.md
│   ├── PHASE-5-PROGRESS.md
│   ├── PHASE-6.5-DESIGN-UPGRADE.md
│   └── PHASE-6.5-PROGRESS.md
├── public/
│   ├── images/
│   │   ├── categories/                  # 6 cover images (webp)
│   │   ├── hero/                        # cinematic hero (desktop + mobile)
│   │   └── products/                    # 20 SKUs, each in its own folder
│   ├── icons/                           # PWA icons (192, 512, apple-touch)
│   ├── manifest.json
│   ├── og-image.png
│   └── favicon.ico
├── scripts/                             # Image pipeline (Sharp)
│   ├── convert-ai-images.mjs
│   ├── generate-placeholders.mjs
│   ├── optimize-images.mjs
│   └── process-real-images.mjs
├── src/
│   ├── app/                             # App Router pages
│   │   ├── about/page.tsx
│   │   ├── categories/page.tsx
│   │   ├── categories/[slug]/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── products/[slug]/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx                   # Root layout: header, footer, bottom nav
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx                     # Homepage composition
│   ├── components/
│   │   ├── category/                    # CategoryCard, CategoryToolbar
│   │   ├── feedback/                    # ReviewCard
│   │   ├── layout/                      # HeaderLuxury, FooterEditorial, BottomNav
│   │   ├── marketing/                   # Hero, EditorialStory, CollectionShowcase…
│   │   ├── motion/                      # Reveal, SplitText, Marquee, Parallax…
│   │   ├── navigation/                  # Breadcrumb
│   │   ├── product/                     # ProductCard, Gallery, PurchasePanel…
│   │   ├── ui/                          # Primitives (MagneticButton, PriceTag…)
│   │   └── index.ts                     # Barrel export
│   ├── lib/
│   │   ├── categories.ts                # 6 categories
│   │   ├── products.ts                  # 20 real SKUs
│   │   ├── reviews.ts                   # 6 verbatim customer reviews
│   │   ├── policy.ts                    # Brand promises strip
│   │   ├── sizeGuide.ts                 # Size table data
│   │   ├── motion.ts                    # Easings, variants
│   │   ├── use-reduced-motion.ts        # a11y hook
│   │   └── utils.ts                     # cn(), formatters
│   └── types/                           # Strict types: Product, Category, Review
├── tailwind.config.ts                   # Brand tokens (single source of truth)
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```

---

## 🧭 Routes

| Path | Page | Notes |
|---|---|---|
| `/` | Homepage | Hero → Editorial → Collections → Featured → Policy → New arrivals → Reviews → CTA |
| `/about` | About | Brand story |
| `/contact` | Contact | WhatsApp + socials |
| `/gallery` | Gallery | All products in editorial grid |
| `/categories` | Categories index | 6 collection tiles |
| `/categories/[slug]` | Category page | `abayas`, `winter`, `occasions`, `practical`, `niqab`, `sale` |
| `/products/[slug]` | Product detail | 20 SKUs, generated via `generateStaticParams` |
| `/loading` | Skeleton | App-Router loading UI |
| `/not-found` | 404 | Custom |

All product and category pages are **statically generated** at build time (`33 static pages` in the production build).

---

## 🎬 Homepage flow (current)

The promotional homepage has **no moving advertisement bars** (announcement bar and brand-mantra marquees were removed). It reads cleanly top-to-bottom:

1. `<HeroCinematic/>` — large kinetic split-text headline + cinematic image + magnetic CTAs
2. `<EditorialStory/>` — 3-pillar manifesto (handcraft, fabric, signature)
3. `<CollectionShowcase/>` — asymmetric magazine-style grid of the 6 categories
4. `<FeaturedSelection/>` — sticky-side featured pieces ("الأكثر طلباً")
5. `<PolicyStrip/>` — brand assurances (free shipping, free tarha, hand-stitching, WhatsApp)
6. `<FeaturedSelection tone="dark"/>` — new arrivals on dark tone (only if any exist)
7. `<ReviewsCinema/>` — dark cinema-style customer reviews
8. `<CtaCinematic/>` — final champagne call-to-action funneling to gallery + WhatsApp

Layout chrome added globally in `src/app/layout.tsx`:

- `<HeaderLuxury/>` — sticky glass-panel header (logo, nav, WhatsApp button)
- `<FooterEditorial/>` — large editorial footer (categories, social, brand promise)
- `<BottomNav/>` — mobile-only (≤1024 px) floating bottom nav with pulsing WhatsApp CTA

---

## 📦 Data sources

All data is local-first (no DB, no API calls):

- **Products** → `src/lib/products.ts` (20 real Sardah SKUs with prices, fabrics, cuts, sizes)
- **Categories** → `src/lib/categories.ts` (6 categories with cover images and accent colors)
- **Reviews** → `src/lib/reviews.ts` (6 verbatim customer reviews from sardah.com)
- **Policy strip** → `src/lib/policy.ts`
- **Size guide** → `src/lib/sizeGuide.ts`

---

## 🌐 SEO & PWA

- Per-page `metadata` exports (title, description, OG, Twitter)
- `og-image.png` 1200×630
- Arabic-first: `<html lang="ar" dir="rtl">`
- `theme-color`: light `#EFE5D4`, dark `#080808`
- PWA manifest (`/manifest.json`) + 192/512/Apple-touch icons

---

## ♿ Accessibility

- Skip-link to `#main`
- `prefers-reduced-motion` honoured via `usePrefersReducedMotion()` (motion components no-op when reduced)
- Semantic landmarks (`<header>`, `<main>`, `<footer>`, `<nav>`)
- All interactive elements keyboard-reachable; visible focus rings
- WhatsApp / nav icons have `aria-label`s in Arabic

---

## 🤝 Brand & licensing

- **Original brand**: <https://sardah.com>
- **Instagram**: [@sardah.abaya](https://www.instagram.com/sardah.abaya)
- **TikTok**: [@sardah.abaya](https://www.tiktok.com/@sardah.abaya)
- **Tagline**: «فخامة التفاصيل وأناقة الحضور»
- **Brand assets** (logo, photography, copy): © Sardah Abayas. All rights reserved.
- **Code scaffolding & implementation**: Genspark AI Developer.

---

## 🧑‍💻 For the next agent

If you are picking up this project: **read [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) first.** It contains:

- The room-by-room tour of every component, what it does, and where it lives
- The theme system (CSS variables vs Tailwind tokens) and how to add a new color
- How to add a new product / category / review
- The motion system + reduced-motion contract
- The image pipeline
- Common pitfalls (e.g. `text-onyx-950` on dark backgrounds, `pearl` token semantics)
- Git workflow conventions used on this repo
