# Phase 6.5 — Luxury Design Upgrade

> "أشتي يكون بتصميم حديث ومميز ورائع وأكثر حداثة وأنميشن وتمبلت" — العميل

## الهدف
رفع تجربة الموقع بصرياً وتفاعلياً إلى مستوى مواقع Awwwards / Saint Laurent /
Hermès / Keif Al Diafa، مع الحفاظ على الأداء والـ SEO وكود نظيف.

## ما تم إنجازه

### 1. بنية الأنميشن المركزية (`src/lib/motion.ts`)
- Easings مخصصة: `EASE_LUXE`, `EASE_REVEAL`, `EASE_SOFT`...
- Durations معيارية (`DUR.fast`, `DUR.cinematic`, `DUR.reveal`).
- Variants جاهزة: `fadeUp`, `fadeIn`, `maskReveal`, `zoomIn`, `pageVariants`...
- Stagger helpers + viewport defaults.
- Hook `usePrefersReducedMotion` لاحترام إعدادات المستخدم.

### 2. مكونات Motion الجديدة (`src/components/motion/`)
| Component | الغرض |
|-----------|-------|
| `Reveal` | كشف عام مع 6 اتجاهات (up / down / left / right / fade / mask) |
| `SplitText` | كشف نص كلمة-كلمة أو حرف-حرف (kinetic typography) |
| `Marquee` | شريط لانهائي بحلقتين مكررتين + تلاشي حواف |
| `ParallaxImage` | صورة بـ parallax محرّك بـ scroll |
| `MagneticDeep` | عنصر يتبع المؤشر بـ spring (premium quiet) |
| `ScrollProgress` | شريط تقدم القراءة فوق الصفحة |
| `CustomCursor` | مؤشر فاخر بحلقة شامبانية + علامة hover + label |
| `PageTransition` | انتقال صفحات سلس عبر AnimatePresence |
| `GrainOverlay` | طبقة حبيبات SVG procedural |
| `GradientMesh` | خلفية radial-gradient متحركة بطيئاً |

### 3. الصفحة الرئيسية الجديدة (`src/app/page.tsx`)
9 أقسام سينمائية متعاقبة:

| # | القسم | المكون |
|---|-------|--------|
| 1 | Hero السينمائي | `<HeroCinematic/>` — بطاقة جانبية + split-text + رنين parallax + CTA pair + marquee + scroll cue |
| 2 | شريط الشعار | `<MarqueeStatement tone="onyx"/>` — Saint-Laurent style |
| 3 | المنفستو (سردة المنهج) | `<EditorialStory/>` — 3 ركائز مرقّمة + parallax عمودي |
| 4 | عرض المجموعات | `<CollectionShowcase/>` — Grid 12×2 asymmetric (بطاقة كبيرة + 4 بطاقات + بطاقة عريضة) |
| 5 | المنتجات المختارة | `<FeaturedSelection/>` — Sticky-side intro + 4-up grid مع stagger zigzag |
| 6 | السياسات | `<PolicyStrip/>` — مع padding مزود |
| 7 | التخفيضات | `<SaleSpotlight/>` — onyx-900 + marquee كود الخصم + 4 منتجات |
| 8 | المراجعات | `<ReviewsCinema/>` — هيرو quote ضخم + 3 بطاقات تحته |
| 9 | CTA النهائي | `<CtaCinematic/>` — قسم شامبانيا كامل مع نص ضخم خلفي + بطاقة توقيع |

### 4. تحسينات global

- `PageTransition` ملفوف حول `<main>` في `RootLayout`.
- `ScrollProgress` + `CustomCursor` مضافان globally في `RootLayout`.
- CSS utilities جديدة في `globals.css`:
  - `.luxe-cursor` (إخفاء المؤشر الأصلي على pointer:fine).
  - `.lux-halo` (هالة ذهبية على hover).
  - `.lux-sheen` (مسح ضوئي يتبع المؤشر).

### 5. ProductCard upgrade
- Sheen sweep ذهبي على hover.
- Lift دقيق -1.5px.
- Cursor label "افتحي" عند hover.

### 6. CollectionShowcase upgrade
- Grid مغناطيسي asymmetric (بدل grid-cols-3 الممل).
- بطاقة المجموعة الأولى **كبيرة** (lg:col-span-7 row-span-2).
- 4 بطاقات وسط + بطاقة عرض كاملة في الأسفل.
- Concentric champagne rings ديكورية تتمدد على hover.
- وصف يظهر تدريجياً عند hover (max-h transition).
- Cursor label "افتحي" + "استعرضي".

## احترام إعدادات المستخدم
كل أنميشن يفحص `prefers-reduced-motion: reduce` ويعيد المحتوى ساكناً
عند تفعيله. كذلك المؤشر الفاخر يُعطّل تلقائياً على:
- أجهزة اللمس (`(pointer: coarse)`).
- المستخدمين الذين فعّلوا تقليل الحركة.

## الأداء
- جميع المكونات `motion/*` صغيرة ومقسمة.
- الصور تُحمل عبر `next/image` مع AVIF/WebP.
- Build: 33 صفحة ثابتة في ~6.7 ثانية.
- Type-check: 0 أخطاء.

## الملفات المضافة
```
src/lib/motion.ts                          (4.2 KB)
src/lib/use-reduced-motion.ts              (0.8 KB)
src/components/motion/
  Reveal.tsx                               (2.8 KB)
  SplitText.tsx                            (3.7 KB)
  Marquee.tsx                              (2.8 KB)
  ParallaxImage.tsx                        (2.0 KB)
  MagneticDeep.tsx                         (2.7 KB)
  ScrollProgress.tsx                       (0.9 KB)
  CustomCursor.tsx                         (4.1 KB)
  PageTransition.tsx                       (1.1 KB)
  GrainOverlay.tsx                         (1.5 KB)
  GradientMesh.tsx                         (2.3 KB)
  index.ts                                 (0.7 KB)
src/components/marketing/
  HeroCinematic.tsx                        (11.8 KB)
  EditorialStory.tsx                       (5.4 KB)
  CollectionShowcase.tsx                   (9.0 KB)
  FeaturedSelection.tsx                    (5.0 KB)
  MarqueeStatement.tsx                     (2.3 KB)
  ReviewsCinema.tsx                        (4.9 KB)
  CtaCinematic.tsx                         (5.9 KB)
  SaleSpotlight.tsx                        (5.3 KB)
docs/PHASE-6.5-PROGRESS.md                 (this file)
```

## الملفات المعدّلة
- `src/app/page.tsx` — كاملة (showroom → 9-section editorial).
- `src/app/layout.tsx` — أضاف ScrollProgress / CustomCursor / PageTransition.
- `src/app/globals.css` — utilities جديدة (luxe-cursor, lux-halo, lux-sheen).
- `src/components/index.ts` — exports المكونات الجديدة.
- `src/components/product/ProductCard.tsx` — sheen + lift + cursor label.

## Validation
- ✅ `npm run type-check` — 0 errors
- ✅ `npm run build` — 33 static pages in ~7s
- ✅ Routes `/`, `/cart`, `/categories`, `/checkout` → 200
- ✅ Homepage يحتوي على كل العناوين الجديدة
- ✅ لا توجد JS errors في المتصفح (الأخطاء الظاهرة هي WebSocket HMR sandbox-only + 404 صور placeholder)
- ✅ `prefers-reduced-motion` محترم في كل المكونات
