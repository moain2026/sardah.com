# 🕊️ المرحلة 0 — الاكتشاف، التدقيق، والاستراتيجية الإبداعية

## مشروع: عبــايــات ســـــردة — Sardah Abayas

> الهدف: تحويل المتجر الحالي (واجهة سلّة قياسية) إلى **بوتيك رقمي فاخر للعبايات السعودية/الخليجية**، يحاكي تجربة دار أزياء راقية على الموبايل أولاً، بهوية عربية وذوق تحريري سينمائي.

---

## 1) تحليل الموقع الحالي — `https://sardah.com`

### مصادر التحليل
- الصفحة الرئيسية
- صفحة فئة (`/category/GXbNOn` — عبايات شتوية)
- صفحات منتجات حقيقية (K-09, S-138, S-162, S-127, S-143, S-145, S-159, S-160, S-161, S-150, S-155)
- صفحة سياسة الاستبدال والاسترجاع
- نتائج بحث Google لاستخراج بنية الـ URLs والأوصاف

### نوع الموقع
- متجر إلكتروني مبني على **منصة سلّة (Salla)** — نموذج جاهز.
- التصميم الحالي: واجهة سلّة قياسية بسيطة بلون داكن/فاتح، خط افتراضي، شبكة منتجات كلاسيكية.

### نقاط القوة الحالية ✅
| النقطة | الوصف |
|---|---|
| تصوير المنتجات | **صور حقيقية احترافية** للعبايات (لقطات أمامية، جانبية، تفاصيل دانتيل/جاكار) |
| تصنيفات واضحة | 6 فئات منظمة: عبايات / شتوية / مناسبات / عملية / نقابات / تخفيضات |
| تفاصيل المنتج | كل منتج يحتوي على: نوع القماش، القصة، القفلة، اللون، ملحقات (طرحة)، خانة ملاحظة |
| نظام مقاسات | مقاسات 50–60 + خيارات قصة (عادي / ربع كلوش / نص كلوش / كلوش كامل) |
| إشارات ثقة | تقييمات حقيقية بالاسم، أقمشة كورية 100%، شعارات mada / Apple Pay / Tabby / Tamara |
| خصومات شفافة | كود `sD1544` + شحن مجاني، السعر القديم مشطوب بوضوح |
| سياسة واضحة | مدة طلب 5–13 يوم، لا دفع عند الاستلام، لا استرجاع إلا لعيب مصنعي |
| هوية عربية | الموقع كله عربي RTL بشكل صحيح |
| منتجات مرتبطة | قسم "منتجات قد تعجبك" في كل صفحة منتج |
| تكامل دفع | بوابات الدفع السعودية الأكثر استخداماً جاهزة |

### نقاط الضعف الحالية ❌
| النقطة | الوصف | الفرصة |
|---|---|---|
| **هوية بصرية ضعيفة** | يبدو كأي متجر سلّة آخر، بدون توقيع بصري مميز | بناء هوية فاخرة (أسود أونيكس + ذهب شامبانيا + لؤلؤي) |
| **تجربة تحريرية مفقودة** | لا يوجد lookbook، لا قصص تصميم، لا hero سينمائي | إضافة hero سينمائي + قسم Lookbook |
| **رواية العلامة شبه معدومة** | لا توجد صفحة "من نحن" بصرية، لا قصة الكاريزما | إضافة قسم Why Sardah تحريري |
| **بطاقات منتج عادية** | بدون تأثيرات hover، بدون تبديل صور، بدون quick view | بطاقات portrait فاخرة بـ image swap + magnetic CTA |
| **رحلة المقاس مربكة** | قائمة dropdown عادية، بدون دليل مقاسات بصري | Modal دليل مقاسات تفصيلي + شرح القصات |
| **حالات نفاد الكمية ضعيفة** | تظهر "نفدت الكمية" بشكل كئيب، بدون "أعلميني عند التوفر" | حالة sold-out أنيقة + زر إشعار |
| **قسم التقييمات بدائي** | مجرد نص بسيط بدون carousel أو تصميم تحريري | شريط testimonials بطاقات زجاجية متحركة |
| **عدم وجود PWA** | الموقع لا يمكن تثبيته كتطبيق | إضافة Manifest + Service Worker + قابلية التثبيت |
| **صور بدون تحسين متقدم** | تستخدم CDN بدون WebP/AVIF واضح، لا blur placeholders | صور WebP/AVIF مع blur + responsive sizes |
| **SEO/Schema محدود** | لا يوجد Product Schema واضح، metadata بسيطة | JSON-LD كامل: Product + Store + LocalBusiness + Review |
| **CTA باهت** | أزرار "إضافة للسلة" بدون شخصية | أزرار مغناطيسية ذهبية رخامية مع micro-interactions |

### استخراج DNA العلامة التجارية
- **الجوهر**: فخامة هادئة + خياطة نظيفة + خامات كورية + لمسة سعودية أنثوية.
- **النبرة**: راقية، دافئة، صادقة، لا تبالغ، تحترم العميلة.
- **اللون السائد**: الأسود (سواد العبايات نفسه) مع لمسات ذهبية.
- **الجمهور**: المرأة السعودية/الخليجية الراقية، 22–45 سنة، تبحث عن عباية تليق بحضورها بسعر منافس.

---

## 2) المنتجات الحقيقية المُستخرجة (Real Inventory)

### الفئات
```
1. عبايات          → /category/EdVRXx
2. عبايات شتوية    → /category/GXbNOn
3. عبايات مناسبات  → /category/AXDZwG
4. عباية عملية     → /category/WBPXrz
5. نقابات          → /category/dzGEoe
6. تخفيضات         → /offers
```

### نموذج بيانات المنتج (مُستخرَج من الواقع)
| الكود | الاسم/الوصف | السعر | السعر القديم | القماش | القصة | القفلة | الحالة |
|---|---|---|---|---|---|---|---|
| **K-09** | عباية K-09 سوداء فاحم | 180 | 209 | جاكار | عادي/ربع/نص/كلوش | طقطق | متوفرة + طرحة |
| **S-138** | عباية دانتيل | 269 | 300 | كريب ملكي + دانتيل | نص كلوش | طقطق | نفدت + طرحة |
| **S-162** | عباية شتوية تطريز | 219 | 269 | كريب ملكي + تل تطريز | ربع كلوش | طقطق | شحن فوري + طرحة |
| **S-161** | عباية شتوية | 229 | 259 | — | — | — | شحن فوري |
| **S-160** | عباية شتوية كلفة يدوي | 210 | 249 | كريب ملكي + كلفة يدوي | ربع كلوش | طقطق | شحن فوري + طرحة |
| **S-159** | عباية كلفة يدوي | 189 | 249 | كريب ملكي + كلفة يدوي | ربع كلوش | طقطق | شحن فوري + طرحة |
| **S-155** | عباية بليزر مخمل | — | — | بليزر + مخمل | عادية | طقطق | + طرحة |
| **S-154** | عباية | 245 | 290 | — | — | — | — |
| **S-151** | عباية | 259 | 300 | — | — | — | — |
| **S-150** | عباية عملية | — | — | كريب واقف | ربع كلوش | طقطق | للدوام/يومي |
| **S-145** | عباية | 259 | 400 | كريب واقف + جاكار | نص كلوش | طقطق | نفدت + طرحة |
| **S-143** | عباية | 245 | 290 | كريب ملكي | ربع كلوش | طقطق | + طرحة |
| **S-136** | عباية | 259 | 400 | — | — | — | — |
| **S-135** | عباية | 229 | 250 | — | — | — | — |
| **S-127** | عباية | 245 | 250 | كريب ملكي + تفته أسود | ربع كلوش | طقطق | + طرحة |
| **S-122** | عباية | — | — | — | — | — | — |
| **S-114** | عباية | 199 | 200 | — | — | — | نفدت |
| **S-157** | عباية | 205 | 249 | — | — | — | شحن فوري |
| **S-164** | عباية | 195 | 280 | — | — | — | — |
| **N-330** | نقاب | 180 | 209 | — | — | — | — |

### الـ Slugs الحقيقية (Salla short links)
- `K-09` → `/zvmODgq`
- `S-138` → `/jZwYbgd`
- `S-162` → `/VDzEdvl`
- `S-127` → `/qQBEYxv`
- `S-143` → `/yKNQowl`
- `S-145` → `/BpPAjYq`
- `S-159` → `/pAKYyKr`
- `S-160` → `/PDzvoxK`
- `S-150` → `/dbzxZZp`
- `S-155` → `/OyXKwGz`
- `S-122` → `/YgdBRyp`
- `S-135` → `/vXDpzVZ`
- `S-136` → `/wWxpYGg`
- `S-151` → `/gyAjGjO`
- `S-154` → `/DpOVPvy`
- `S-157` → `/wAYZNQR`
- `S-164` → `/jgjbNxQ`
- `N-330` → `/onoGROb`
- `S-114` → `/BrdEyga`

> في النسخة الجديدة، سنستخدم slugs أنظف وأكثر SEO: `/products/abaya-k09`, `/products/abaya-lace-s138`, …

### آراء العميلات الحقيقية (Reviews)
- **لطيفة المطيري** — "حلو وسريع" — 5★
- **ندى الغامدي** — "أول مرة أطلب عباية من موقع... جدًا حبيتها وأنصدمت بنظافة الخياطة... شكرًا من القلب على الأمانة في الشغل🩷" — 5★
- **Loly Loly** — "أسلوبها خيال... العباية والخامة وسرعة التوصيل والباكجينق... كل شي خيالي" — 5★
- **عفراء فقيه** — "العباية ولا غلطة، القماش بطل والخياطة نظيفة" — 5★

### السياسات الرسمية
- مدة الطلب من **5–13 يوم**
- **لا يوجد** الدفع عند الاستلام
- **لا** استبدال أو استرجاع إلا في حالة عيب مصنعي
- في حال وجود عيب أو خطأ من المتجر — استبدال القطعة فقط، **لا استرجاع للمبلغ**

### وسائل الدفع المتاحة
mada · Visa/Master · Apple Pay · Tabby (تقسيط) · Tamara (تقسيط) · محفظة محلي

---

## 3) الاتجاه الإبداعي للنسخة الجديدة — Luxury Boutique Direction

### الكونسبت العام
> **"عبايات تُصمم لتليق بحضورك"** — حيث الفخامة تسكن في التفاصيل الصغيرة.

تجربة تحريرية سينمائية، أبيض/أسود مع لمسات ذهب شامبانيا، تذكّر بـ:
- مجلة أزياء سعودية فاخرة
- معرض دار أزياء (وليس متجر سوبرماركت)
- تجربة "آيفون" في النعومة

### النيش البصري (Visual Niche)
- **Editorial Saudi Modesty** — لا يقلّد العبايات الغربية، يحترم الذوق الخليجي.
- **Cinematic Black** — الأسود ليس كآبة بل فخامة (مثل الفلاسفة في Saint Laurent / Toteme).
- **Pearl & Champagne** — الأبيض اللؤلؤي مع تطعيمات ذهبية رفيعة فقط.
- **Calm Motion** — حركة هادئة، لا تنطّ، لا تربك العين.

### لوحة الألوان النهائية (Confirmed Palette)
| الاسم | HEX | الاستخدام |
|---|---|---|
| Onyx Black | `#080808` | الخلفيات السينمائية + الأقسام الداكنة |
| Charcoal | `#151515` | بطاقات داكنة + Footer |
| Soft Black | `#1F1F1F` | نصوص ثقيلة |
| Pearl White | `#F8F5EF` | الخلفية الأساسية |
| Warm Ivory | `#FFFDF8` | البطاقات الفاتحة |
| Champagne Gold | `#C8A96A` | Accent — حدود ذهبية رفيعة، أيقونات صغيرة |
| Muted Gold | `#A98752` | Hover للذهب |
| Soft Sand | `#E8DED0` | فواصل ناعمة |
| Warm Taupe | `#B9A89A` | نصوص ثانوية |
| Dusty Rose | `#B98D88` | لمسة أنثوية نادرة (badges احتفالية) |

### الطباعة (Typography)
- **العناوين الرئيسية / Editorial**: `Aref Ruqaa` (خط عربي كلاسيكي راقي) — للـ hero والـ section titles.
- **العناوين الثانوية**: `Tajawal` Bold — للـ subheadings و navigation.
- **النصوص**: `IBM Plex Sans Arabic` — للـ paragraphs والوصف (قابلية قراءة عالية على الموبايل).
- **الأرقام والأسعار**: `Tajawal` (خط لاتيني/عربي مزدوج).
- ارتفاع سطر سخي (`leading-loose`) + tracking دقيق.

### التأثيرات البصرية
- ✅ Subtle grain/noise texture (1-2% opacity) على الخلفيات
- ✅ Soft vignette gradients في الـ hero
- ✅ Pearl paper texture في البطاقات
- ✅ Champagne hairline borders (1px)
- ✅ Cinematic black gradients (top-bottom dark fade)
- ✅ Glass panels (للـ header الشفاف)
- ✅ Soft product shadows (لا shadows ثقيلة)
- ✅ Magnetic CTA buttons (Framer Motion)
- ✅ Image hover swap (front → side)
- ✅ Staggered reveal animations
- ✅ Cart drawer انزلاق ناعم من اليسار (RTL)

### ما يجب تجنبه (Hard NOs)
- ❌ ألوان سوبرماركت (أحمر صارخ، أصفر، أزرق فاقع)
- ❌ Gradients رخيصة (rainbow, neon)
- ❌ شعارات Salla theme الافتراضية
- ❌ أيقونات مجانية بدون اتساق
- ❌ Overuse للذهب (يجب أن يبقى accent فقط)
- ❌ نصوص لاتينية كبيرة في صفحة عربية
- ❌ Layouts متكدسة

---

## 4) خطة استخراج الأصول — Asset Extraction Plan

### تصنيف الأصول
| النوع | المصدر | الحالة | الإجراء |
|---|---|---|---|
| **شعار** | Header الموقع الحالي | متاح كصورة | استخراج + إعادة بناء SVG نظيف للحصول على scalability |
| **صور المنتجات** | CDN سلّة عبر روابط منتج | متاحة لكنها تمر عبر Genspark proxy | تنزيل، تحويل لـ WebP/AVIF، حفظ في `public/images/products/` |
| **صور الفئات** | غير موجودة بشكل مستقل | غير متاحة | **توليد صور editorial باستخدام image_generation** بناءً على نمط الموقع الحقيقي |
| **بانر Hero** | غير موجود | غير متاح | توليد صورة hero سينمائية بأسلوب فاشن editorial |
| **صور Lookbook** | غير موجود | غير متاح | استخدام صور المنتجات الحقيقية في layout asymmetrical |
| **أيقونات الدفع** | شعارات Salla | متاحة | إعادة بناء SVG نظيفة لـ mada/Apple Pay/Tabby/Tamara/Visa |
| **دليل المقاسات** | الصفحة موجودة لكن بدون رسم | غير متاح بصرياً | إنشاء جدول HTML أنيق + رسم سيلويت بسيط |

### استراتيجية الصور (المرحلة 0 → المرحلة 2)
في **المرحلة 2** سنقوم بـ:
1. كتابة `scripts/optimize-images.ts` يستخدم Sharp.
2. تنزيل الصور الحقيقية إلى `public/images/products/<code>/`.
3. إنتاج 4 أحجام: `480w, 768w, 1024w, 1440w`.
4. توليد WebP + AVIF + fallback JPG.
5. توليد blur placeholders (base64 LQIP).

### معايير التسمية (SEO-friendly)
```
sardah-abaya-k09-front.webp
sardah-abaya-k09-side.webp
sardah-abaya-k09-detail.webp
sardah-abaya-lace-s138-front.webp
sardah-winter-abaya-s162-front.webp
sardah-niqab-n330-front.webp
sardah-category-winter-cover.webp
sardah-hero-editorial.webp
sardah-lookbook-01.webp
sardah-logo-mark.svg
sardah-logo-wordmark.svg
sardah-payment-mada.svg
```

### Alt Text القياسي (Arabic-first)
- `"عباية K-09 سوداء بقماش جاكار من سردة"`
- `"عباية دانتيل S-138 بقصة نص كلوش من سردة"`
- `"عباية شتوية S-162 بكريب ملكي وتل تطريز من سردة"`
- `"دليل مقاسات عبايات سردة"`
- `"شعار عبايات سردة الذهبي"`

### مجلد الأصول (Final Tree)
```
public/
├── images/
│   ├── brand/
│   │   ├── sardah-logo-mark.svg
│   │   ├── sardah-logo-wordmark.svg
│   │   └── sardah-monogram.svg
│   ├── hero/
│   │   ├── sardah-hero-desktop.webp
│   │   ├── sardah-hero-mobile.webp
│   │   └── sardah-hero-editorial.webp
│   ├── products/
│   │   ├── k09/
│   │   ├── s138/
│   │   ├── s162/
│   │   ├── s161/
│   │   ├── s160/
│   │   ├── s159/
│   │   ├── s155/
│   │   ├── s150/
│   │   ├── s145/
│   │   ├── s143/
│   │   ├── s127/
│   │   └── n330/
│   ├── categories/
│   │   ├── abayas-cover.webp
│   │   ├── winter-cover.webp
│   │   ├── occasions-cover.webp
│   │   ├── practical-cover.webp
│   │   ├── niqab-cover.webp
│   │   └── sale-cover.webp
│   ├── lookbook/
│   │   ├── lookbook-01.webp
│   │   ├── lookbook-02.webp
│   │   └── lookbook-03.webp
│   ├── payment/
│   │   ├── mada.svg
│   │   ├── visa.svg
│   │   ├── mastercard.svg
│   │   ├── apple-pay.svg
│   │   ├── tabby.svg
│   │   └── tamara.svg
│   └── ui/
│       ├── noise.png
│       ├── paper-texture.png
│       └── gold-divider.svg
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icon-maskable-512.png
│   └── apple-touch-icon.png
├── manifest.json
├── robots.txt
└── og-image.png
```

> **ملاحظة شفافة**: في حال تم حظر تنزيل بعض صور المنتجات الحقيقية في المرحلة 2، سنُبلغ المستخدم ونستخدم صور editorial مولّدة كـ fallback مع وضع علامة واضحة `[demo]`. لن نتظاهر أن الصور المولّدة هي صور حقيقية.

---

## 5) خطة تحسين الصور (WebP/AVIF) — Image Optimization Plan

### الخطوات (ستُنفّذ في المرحلة 2)
```ts
// scripts/optimize-images.ts (مخطط)
1. اقرأ من /raw-images/
2. لكل صورة:
   - resize إلى [480, 768, 1024, 1440] عرض
   - أنتج .webp بـ quality 82
   - أنتج .avif بـ quality 65
   - احتفظ بـ .jpg fallback بـ quality 85 (mozjpeg)
   - احسب blurDataURL (base64 10x14 LQIP)
3. اكتب metadata.json يحوي abundance/colors/dimensions
```

### قواعد `next/image` الذهبية
- استخدام `priority` فقط لصورة Hero الأولى.
- `sizes` مدروسة لكل بطاقة منتج: `(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw`.
- `placeholder="blur"` + `blurDataURL` لكل صورة.
- نسبة العرض إلى الارتفاع للمنتجات: `3/4` (portrait — أنسب لصور العباية كاملة).
- نسبة Hero: `16/9` على desktop، `4/5` على mobile.
- `loading="lazy"` لكل ما هو خارج viewport الأولي.
- منع layout shift بتثبيت `width/height` صريحة.

---

## 6) بنية الصفحات — IA & Page Structures

### A. الصفحة الرئيسية (`/`)
```
1. شريط الإعلان (Announcement Bar)
   └─ "كود خصم sD1544 + شحن مجاني لفترة محدودة"

2. Header الفاخر (Sticky, glass on scroll)
   ├─ Logo (يسار في RTL)
   ├─ Navigation: عبايات | شتوية | مناسبات | عملية | نقابات | تخفيضات
   ├─ Search · Account · Cart (يمين في RTL)
   └─ Mobile drawer

3. Cinematic Hero
   ├─ صورة editorial كبيرة لعباية (full-bleed)
   ├─ Dark gradient overlay
   ├─ Headline: "عبايات تُصمم لتليق بحضورك"
   ├─ Sub: "اكتشفي عبايات سردة بقصات راقية، أقمشة مختارة، وتفاصيل تُصنع بعناية."
   ├─ CTA Primary: "تسوقي العبايات" (gold magnetic)
   ├─ CTA Secondary: "اكتشفي التخفيضات"
   └─ Floating badges: أقمشة كورية 100% · جودة عالية · شحن مجاني

4. Category Showcase (شبكة 6 فئات)
   └─ كل بطاقة: صورة + label ذهبي + hover zoom

5. Featured / Best Sellers
   └─ شبكة 4 منتجات portrait + Quick view + Quick add

6. New Arrivals (Horizontal Carousel)
   └─ Snap scroll مع staggered reveal

7. Lookbook Section
   ├─ Layout asymmetrical (3 صور)
   ├─ Text: "تفاصيل سوداء… حضور لا يُنسى"
   └─ CTA: "شاهدي المجموعة"

8. Why Sardah (6 ميزات)
   ├─ أقمشة مختارة بعناية
   ├─ خياطة نظيفة
   ├─ تفاصيل أنيقة
   ├─ ملاحظة على الطلب
   ├─ طرحة مجانية
   └─ تجربة شراء سهلة

9. Reviews Carousel
   └─ بطاقات testimonials زجاجية مع 4 آراء حقيقية

10. Policy Strip (شريط أبيض شفاف)
    └─ 4 أعمدة: مدة الطلب | لا دفع عند الاستلام | استبدال للعيب | دفع إلكتروني

11. Final CTA (Dark luxury block)
    └─ "اختاري عبايتك القادمة من سردة" + زر "ابدئي التسوق"

12. Footer (5 أعمدة)
    ├─ Brand & tagline
    ├─ Categories links
    ├─ Important: سياسة الاستبدال · دليل المقاسات · من نحن
    ├─ Contact: WhatsApp · Instagram · TikTok · Email
    └─ Payment methods + copyright
```

### B. صفحة الفئة (`/categories/[slug]`)
```
1. Header
2. Breadcrumb (الرئيسية / الفئة)
3. Category Hero
   ├─ صورة غلاف
   ├─ اسم الفئة بخط Aref Ruqaa
   ├─ وصف قصير
   └─ Product count
4. Toolbar
   ├─ Filters (يفتح drawer/sheet)
   │  ├─ السعر
   │  ├─ نوع القماش (جاكار، كريب ملكي، دانتيل، مخمل، تل، ...)
   │  ├─ القصة (عادي، ربع، نص، كلوش)
   │  ├─ التوفر (متوفر، نفدت)
   │  └─ التخفيضات (نعم/لا)
   └─ Sort dropdown
       ├─ مقترحاتنا
       ├─ الأكثر مبيعاً
       ├─ الأعلى تقييماً
       ├─ السعر: من الأعلى للأقل
       └─ السعر: من الأقل للأعلى
5. Product Grid (responsive: 2/3/4 cols)
6. Empty state (إذا لا توجد نتائج)
7. Pagination / Load more
8. Footer
```

### C. صفحة المنتج (`/products/[slug]`)
```
1. Header
2. Breadcrumb (الرئيسية / الفئة / كود المنتج)
3. Product Layout (2 columns desktop, stacked mobile)
   ├─ Gallery (يمين في RTL)
   │  ├─ صورة رئيسية (3:4 portrait, zoom on hover)
   │  ├─ Thumbnails عمودية
   │  ├─ Swipe على الموبايل
   │  └─ blur placeholder
   └─ Info (يسار في RTL)
       ├─ Code (S-138)
       ├─ Name
       ├─ Star rating + reviews count
       ├─ Price + Old price + Discount %
       ├─ Stock status badge
       ├─ Short description
       ├─ Specs grid:
       │  ├─ نوع القماش
       │  ├─ القصة
       │  ├─ القفلة
       │  ├─ اللون
       │  └─ ملحقات (طرحة)
       ├─ Size selector (chips: 50–60)
       ├─ Cut selector (chips: عادي / ربع كلوش / نص كلوش / كلوش كامل)
       ├─ Customer note textarea: "اكتبي أي تعديل أو ملاحظة على الطلب هنا"
       ├─ زر دليل المقاسات (يفتح modal)
       ├─ Quantity stepper
       ├─ CTA "إضافة للسلة" (gold magnetic) — disabled إذا sold out
       ├─ CTA secondary "اشتري الآن" (يفتح cart drawer)
       └─ Notify me (إذا sold out)
4. Trust strip
   └─ شحن · مدة الطلب · سياسة · دفع
5. Tabs / Accordion
   ├─ الوصف الكامل
   ├─ المقاسات (مع الـ modal)
   ├─ سياسة الاستبدال
   └─ التعليقات والأسئلة
6. Related Products (4 منتجات من نفس الفئة)
7. Footer
```

### D. السلّة (Cart Drawer)
```
- يفتح من اليمين (في RTL)
- عرض 420px على desktop، full-width على mobile
- Header: "سلّة المشتريات" + close button
- List of items:
  ├─ صورة (90×120)
  ├─ الكود + الاسم
  ├─ المقاس + القصة المختارة
  ├─ ملاحظة (إن وُجدت)
  ├─ Quantity stepper
  ├─ السعر
  └─ Remove button (icon)
- Subtotal, Discount, Delivery, Grand Total
- Policy reminder mini-strip
- CTA "إتمام الطلب" (gold)
- CTA Secondary "متابعة التسوق"
- Empty state: illustration + "سلّتك فارغة" + CTA
```

### E. صفحة الـ Checkout — استراتيجية متعددة المسارات
نظراً لأن الموقع الأصلي يستخدم سلّة، سنقدم 3 خيارات:
1. **Mode A (افتراضي للنسخة التجريبية)**: نموذج WhatsApp Order — يبني رسالة منسّقة عربية ويفتح WhatsApp.
2. **Mode B (إذا توفر API)**: redirect لـ Salla checkout الأصلي.
3. **Mode C**: نموذج static demo (اسم، مدينة، رقم) لا يحفظ شيئاً — للعرض فقط.

سنبني **Mode A + Mode C** في المرحلة 5 لأنها لا تحتاج backend.

---

## 7) بنية المكونات — Component Architecture

```
src/
├── app/
│   ├── layout.tsx              # Root + RTL + fonts + metadata
│   ├── page.tsx                # Homepage (Server Component)
│   ├── globals.css             # Tailwind + CSS vars + utility classes
│   ├── categories/
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── products/
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── cart/
│   │   └── page.tsx            # (optional standalone)
│   ├── size-guide/
│   │   └── page.tsx
│   ├── policy/
│   │   └── page.tsx            # سياسة الاستبدال والاسترجاع
│   ├── about/
│   │   └── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── layout/
│   │   ├── AnnouncementBar.tsx
│   │   ├── Header.tsx
│   │   ├── MobileMenu.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── CategoryShowcase.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── NewArrivals.tsx
│   │   ├── Lookbook.tsx
│   │   ├── WhySardah.tsx
│   │   ├── Reviews.tsx
│   │   ├── PolicyStrip.tsx
│   │   └── FinalCTA.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGallery.tsx
│   │   ├── ProductInfo.tsx
│   │   ├── ProductOptions.tsx
│   │   ├── AddToCartPanel.tsx
│   │   ├── SizeGuideModal.tsx
│   │   ├── RelatedProducts.tsx
│   │   └── ProductBadge.tsx
│   ├── category/
│   │   ├── CategoryHero.tsx
│   │   ├── CategoryFilters.tsx
│   │   ├── SortDropdown.tsx
│   │   └── ProductGrid.tsx
│   ├── cart/
│   │   ├── CartDrawer.tsx
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx
│   │   ├── CheckoutForm.tsx
│   │   └── EmptyCart.tsx
│   ├── ui/
│   │   ├── MagneticButton.tsx
│   │   ├── AnimatedBadge.tsx
│   │   ├── GoldDivider.tsx
│   │   ├── GlassPanel.tsx
│   │   ├── BlurredImage.tsx
│   │   ├── Stepper.tsx
│   │   ├── Chip.tsx
│   │   ├── Sheet.tsx
│   │   └── Drawer.tsx
│   └── seo/
│       ├── JsonLd.tsx
│       ├── OrganizationSchema.tsx
│       ├── ProductSchema.tsx
│       └── BreadcrumbSchema.tsx
├── lib/
│   ├── products.ts             # Real product data
│   ├── categories.ts           # 6 categories
│   ├── reviews.ts              # 4 real reviews
│   ├── sizeGuide.ts            # Size table data
│   ├── policy.ts               # Policy texts
│   ├── checkoutUtils.ts        # WhatsApp message builder
│   └── utils.ts                # cn(), formatPrice(), etc.
├── store/
│   └── useCartStore.ts         # Zustand + persist
├── types/
│   ├── product.ts
│   ├── review.ts
│   ├── cart.ts
│   └── category.ts
├── styles/
│   └── (extra if needed)
└── scripts/
    └── optimize-images.ts
```

### قاعدة Server vs Client Components
| Component | النوع | السبب |
|---|---|---|
| `app/layout.tsx`, `app/page.tsx`, all `page.tsx` | RSC | عرض ثابت + SEO |
| `Header`, `Footer`, `AnnouncementBar` | RSC أساس + Client wrapper للحالة | scroll behavior |
| `Hero`, `CategoryShowcase`, `WhySardah`, `PolicyStrip`, `FinalCTA` | RSC + Framer wrapper | كل المحتوى static |
| `MobileMenu`, `CartDrawer`, `SizeGuideModal`, `MagneticButton` | Client | يحتاج state |
| `ProductCard` | Hybrid (RSC outer + Client للـ hover/quick add) | تحسين الأداء |
| `CategoryFilters`, `SortDropdown` | Client | URL params + state |
| `Reviews` carousel | Client | embla/swiper |
| `CartItem`, `CartSummary` | Client | يستخدم Zustand |
| `JsonLd` components | RSC (script tag) | SEO فقط |

---

## 8) استراتيجية SEO و Schema

### Metadata الأساسية (لكل صفحة)
- **اللغة**: `lang="ar"` + `dir="rtl"` على `<html>`.
- **Charset**: UTF-8.
- **viewport**: مع `themeColor` ديناميكي.
- **Apple PWA tags**: `apple-mobile-web-app-capable`, `apple-mobile-web-app-title`, `apple-mobile-web-app-status-bar-style`.

### العناوين العربية لكل صفحة
| الصفحة | Title | Description |
|---|---|---|
| Home | `عبايات سردة — فخامة التفاصيل وأناقة الحضور` | عبايات سعودية فاخرة بأقمشة كورية وخياطة نظيفة. |
| فئة عبايات شتوية | `عبايات شتوية — سردة` | تشكيلة شتوية أنيقة بأقمشة دافئة وقصات راقية. |
| منتج K-09 | `عباية K-09 جاكار سوداء — سردة` | عباية أنيقة بقماش جاكار سوداء فاحم مع طرحة مجانية. |
| Cart | `سلّة المشتريات — سردة` | راجعي طلبك قبل إتمام الشراء. |
| Size Guide | `دليل المقاسات — سردة` | اعرفي مقاسك بدقة قبل الطلب. |
| Policy | `سياسة الاستبدال والاسترجاع — سردة` | شروط الطلب والاستبدال. |

### JSON-LD Schemas المخططة
1. **Organization** — على layout.tsx
2. **Store / LocalBusiness** — على layout.tsx
3. **WebSite** + SearchAction — على layout.tsx
4. **BreadcrumbList** — على كل صفحة internal
5. **Product + Offer + AggregateRating** — على كل صفحة منتج
6. **Review** — مدمجة في Product
7. **FAQPage** — على policy و size-guide
8. **ItemList** — على صفحات الفئات

### Open Graph & Twitter Cards
- صورة OG ديناميكية لكل منتج (1200×630).
- صورة OG ثابتة للصفحات الأخرى.
- نوع `og:type` = `product` للمنتجات.

### Sitemap
سيتم توليده من `lib/products.ts` و `lib/categories.ts` ديناميكياً.

### Robots
- `Allow: /` لكل المحركات
- `Disallow: /cart`, `/checkout`, `/api`
- `Sitemap: https://sardah.com/sitemap.xml`

---

## 9) معايير الأداء (Performance Targets)

| Metric | الهدف |
|---|---|
| Lighthouse Performance (mobile) | 90+ |
| Lighthouse Accessibility | 95+ |
| Lighthouse SEO | 100 |
| Lighthouse Best Practices | 95+ |
| LCP | < 2.5s |
| INP | < 200ms |
| CLS | < 0.05 |
| Total JS (initial) | < 150 KB gzipped |

### الأدوات
- Next.js 15 + Turbopack
- React 19 Server Components
- `next/image` + Sharp
- Font subsetting (Arabic only)
- Code splitting بـ dynamic imports للـ Drawer / Modal
- `loading.tsx` + Suspense boundaries

---

## 10) خطة PWA

### `manifest.json` (تخطيط)
```json
{
  "name": "عبايات سردة",
  "short_name": "سردة",
  "description": "عبايات فاخرة بتفاصيل راقية من سردة",
  "lang": "ar",
  "dir": "rtl",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait",
  "theme_color": "#080808",
  "background_color": "#F8F5EF",
  "categories": ["shopping", "fashion", "lifestyle"],
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ],
  "shortcuts": [
    { "name": "تخفيضات", "url": "/categories/sale" },
    { "name": "عبايات شتوية", "url": "/categories/winter" }
  ]
}
```

### Service Worker
سنستخدم `next-pwa` أو نكتب SW يدوياً في المرحلة 6 مع:
- Cache-first للأصول الثابتة
- Network-first للصفحات
- Offline fallback page

---

## 11) ملخص المخرجات (Deliverables Summary)

✅ **مخرجات المرحلة 0** (هذا المستند):
1. تدقيق الموقع الحالي — نقاط قوة وضعف.
2. استخراج DNA العلامة.
3. تحديد الاتجاه الإبداعي + لوحة الألوان + الطباعة.
4. قائمة منتجات حقيقية كاملة (20 منتج).
5. خطة استخراج وتحسين الأصول.
6. بنية الصفحات الأربع الرئيسية.
7. بنية المكونات الكاملة.
8. خريطة Server vs Client Components.
9. خطة SEO + Schema + PWA.
10. معايير أداء واضحة.

---

## 12) المخاطر والافتراضات الواضحة

### مخاطر معروفة
- **حظر الزحف**: الموقع يستخدم Genspark proxy للصور؛ إذا فشل التنزيل المباشر سنلجأ لـ image_search + image_generation مع علامة `[demo]`.
- **بعض المنتجات لا توفر تفاصيل كاملة**: سنضع placeholder واضح ولا نخترع تفاصيل خاطئة.
- **عدم وجود Salla API key**: لا يمكننا التكامل المباشر مع checkout الأصلي — سنعتمد WhatsApp + demo mode.
- **شعار سردة الأصلي**: سيتم استخراجه؛ في حال عدم وضوحه، سنعيد بناء wordmark بـ Aref Ruqaa مع علامة `[brand-mark draft]`.

### افتراضات
- العميلة موافقة على استخدام WhatsApp كمسار checkout افتراضي.
- اللغة الأساسية والوحيدة: العربية (RTL).
- الجمهور: السعودية + الخليج (شحن داخل المملكة افتراضياً).
- العملة: ريال سعودي (SAR).

---

## ✅ Phase 0 completed.

> **Do you approve moving to Phase 1?**
>
> المرحلة 1 ستشمل: إعداد مشروع Next.js 15 + App Router + TypeScript + Tailwind + RTL + الخطوط العربية + globals.css بهوية سردة الكاملة + Master layout + folder structure أساسية. **بدون أي صفحات منتجات أو منطق أعمال بعد** — فقط الأساس البصري والمعماري.

