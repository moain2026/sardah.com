# Phase 6.5 — Luxury Design Upgrade
**عبايات سردة — ترقية تصميم سينمائية**

This phase elevates the visual & motion language of sardah.com to the level of award-winning fashion editorials (Saint Laurent, Hermès, Awwwards SOTD), inspired by the user's previous project [keifaldiafa.com](https://www.keifaldiafa.com/).

## Highlights

### 1. Motion design system (`src/lib/motion.ts`)
* Centralised cubic-bezier easings (`EASE_LUXE`, `EASE_REVEAL`, `EASE_SOFT`, ...).
* Standard durations (`fast`, `base`, `slow`, `cinematic`, `reveal`).
* Reusable Framer Motion variants: `fadeUp`, `fadeIn`, `fadeDown`, `maskReveal`, `zoomIn`, `wordReveal`, `pageVariants`, `stagger()` factory.
* `viewportOnce` / `viewportRepeat` defaults for `whileInView`.

### 2. Reduced-motion hook (`src/lib/use-reduced-motion.ts`)
Reactive React hook that mirrors `(prefers-reduced-motion: reduce)`. Every motion primitive degrades gracefully when the user opts out.

### 3. Motion primitives (`src/components/motion/`)
| Component | Purpose |
| --- | --- |
| `<Reveal/>` | Scroll-triggered fade/slide/mask reveal with 6 directions. |
| `<SplitText/>` | Per-word/char kinetic typography (RTL-safe). |
| `<Marquee/>` | Seamless infinite horizontal scroller (mirrored track). |
| `<ParallaxImage/>` | Scroll-driven parallax wrapper around `next/image`. |
| `<MagneticDeep/>` | Premium magnetic hover with optional inner-layer parallax. |
| `<ScrollProgress/>` | Slim champagne progress bar fixed at viewport top. |
| `<CustomCursor/>` | Bespoke cursor (champagne ring + dot) that morphs on `[data-cursor]`. |
| `<PageTransition/>` | Smooth route-change fade & drift. |
| `<GrainOverlay/>` | Procedural film-grain SVG turbulence layer. |
| `<GradientMesh/>` | Slow drifting multi-radial-gradient backdrop. |

All primitives respect `prefers-reduced-motion` and are tree-shaken via `optimizePackageImports`.

### 4. Cinematic homepage sections (`src/components/marketing/`)
| Component | Description |
| --- | --- |
| `<HeroCinematic/>` | New flagship hero with kinetic split-text headline, parallax accent rings, magnetic CTAs, side editorial card, stats line, scroll cue, and a brand-statement marquee strip. |
| `<EditorialStory/>` | Two-column manifesto with split-text statement & three numbered pillars (parallax). |
| `<CollectionShowcase/>` | Asymmetric magazine-style grid for the 6 categories: a tall hero tile + smaller tiles + wide bottom tile, each with hover-revealed description and concentric champagne rings. |
| `<FeaturedSelection/>` | Sticky-side "manifesto" + 4-up grid with offset rows. Light or dark tone. |
| `<MarqueeStatement/>` | Big editorial brand-mantra strip (onyx/pearl/champagne tones). |
| `<SaleSpotlight/>` | Onyx-toned discount-code marquee + 4-up on-sale grid. |
| `<ReviewsCinema/>` | Dark cinematic hero quote + 3-up stories with avatars & ratings. |
| `<CtaCinematic/>` | Final champagne block with massive serif "سردة" parallax watermark and signature card. |

### 5. Global integrations (`src/app/layout.tsx`)
* `<ScrollProgress/>`, `<CustomCursor/>`, `<PageTransition/>` mounted globally.
* `luxe-cursor` body class hides native cursor on fine-pointer devices, restored automatically when `prefers-reduced-motion` is set.

### 6. Global CSS additions (`src/app/globals.css`)
* `.lux-halo` — golden halo on hover with masked gradient.
* `.lux-sheen` — radial sheen that follows the pointer (`--mx`, `--my` CSS vars set by JS).
* Reduced-motion overrides for cursor handling.

### 7. ProductCard 3D tilt
The existing `ProductCard` now tilts subtly toward the cursor (springed `rotateX/Y`), with a champagne sheen tracking the pointer. Disabled on reduced-motion.

## Validation
| Check | Result |
| --- | --- |
| `npm run type-check` | ✅ 0 errors |
| `npm run build` | ✅ 33 static pages in ~6.6 s |
| Routes `/`, `/categories/abayas`, `/products/abaya-k09`, `/cart` | All return 200 |
| Homepage Arabic content | ✅ 7 new section headlines render |
| Reduced-motion fallback | ✅ All motion primitives degrade gracefully |
| RTL safety | ✅ Marquee, SplitText, Magnetic primitives tested in RTL |

## Next steps
This upgrade fully replaces the previous Phase 3 "showroom" homepage with a luxury cinematic experience. Phases 6–9 (PWA, deep SEO, static pages, performance) will inherit the new motion/section vocabulary.
