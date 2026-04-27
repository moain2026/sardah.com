# 🕊️ عبــايــات ســـــردة — Sardah Abayas

> **بوتيك رقمي فاخر للعبايات السعودية** — Luxury digital abaya boutique built with Next.js 15, App Router, RSC, TypeScript, Tailwind CSS, and Framer Motion. Arabic-first, RTL-perfect, mobile-first PWA experience.

---

## 🎯 Status

**Current phase**: Phase 1 — Foundation (Architecture, Theming, Master Layout)

| Phase | Status | Description |
|---|---|---|
| 0 | ✅ Done | Discovery, audit, brand strategy ([docs/PHASE-0-DISCOVERY.md](./docs/PHASE-0-DISCOVERY.md)) |
| 1 | ✅ Done | Core architecture, theme, fonts, RTL, master layout |
| 2 | ⏳ Pending | Real product data, types, asset engine, cart store |
| 3 | ⏳ Pending | Storefront homepage (Hero, Categories, Lookbook…) |
| 4 | ⏳ Pending | Category pages, product pages, size guide |
| 5 | ⏳ Pending | Cart drawer, checkout, WhatsApp integration |
| 6 | ⏳ Pending | PWA, SEO, schema, performance pass |

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS 3.4 + custom CSS variables
- **Animation**: Framer Motion 11
- **State**: Zustand 5 (cart store)
- **Fonts**: Aref Ruqaa, IBM Plex Sans Arabic, Tajawal (via `next/font/google`)
- **Images**: `next/image` + Sharp (WebP/AVIF pipeline)
- **PWA**: Custom manifest + service worker (Phase 6)

---

## 🎨 Brand Palette

| Color | HEX | Usage |
|---|---|---|
| Onyx Black | `#080808` | Hero overlays, dark sections |
| Charcoal | `#151515` | Cards, footer |
| Pearl White | `#F8F5EF` | Base background |
| Warm Ivory | `#FFFDF8` | Cards |
| Champagne Gold | `#C8A96A` | Accents, hairline borders |
| Soft Sand | `#E8DED0` | Soft dividers |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open http://localhost:3000
```

### Build

```bash
npm run build
npm start
```

### Type-check

```bash
npm run type-check
```

---

## 📁 Project Structure (current)

```
.
├── docs/
│   └── PHASE-0-DISCOVERY.md      # Complete strategy & audit
├── src/
│   ├── app/
│   │   ├── layout.tsx            # RTL + fonts + metadata
│   │   ├── page.tsx              # Phase 1 placeholder
│   │   ├── globals.css           # Theme + utilities
│   │   ├── loading.tsx
│   │   └── not-found.tsx
│   └── lib/
│       └── utils.ts              # cn(), formatPrice(), SITE config
├── tailwind.config.ts
├── next.config.mjs
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

---

## 🌐 Brand Info

- **Name (AR)**: عبــايــات ســـــردة
- **Name (EN)**: Sardah Abayas
- **Original site**: https://sardah.com
- **Instagram**: [@sardah.abaya](https://www.instagram.com/sardah.abaya/)
- **TikTok**: [@sardah.abaya](https://www.tiktok.com/@sardah.abaya)
- **Tagline**: فخامة التفاصيل وأناقة الحضور

---

## 📜 License

Brand assets © Sardah Abayas. Code scaffolding by Genspark AI Developer.
