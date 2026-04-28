# Phase 5 — Cart Drawer + Checkout (WhatsApp)

> Status: ✅ Completed — `genspark_ai_developer` branch
> Build: 33 static pages, 0 type errors, 0 build errors

## Deliverables

### Routes (3 new)

| Route | Type | Notes |
|---|---|---|
| `/cart` | Static + client island | Server shell renders breadcrumbs + skeleton; client `CartView` reads persisted Zustand store |
| `/checkout` | Static + client island | Arabic form (name + city + phone + notes) → opens WhatsApp |
| `/order-confirmation` | Static + client island | Success state, re-open WA CTA, recap, "start new order" |

`robots.index = false` is set on `/cart`, `/checkout`, and `/order-confirmation` so search engines don't crawl them (they're transient).

### Components (7 new)

| Component | Lines | Responsibility |
|---|---|---|
| `CartDrawer` | 200+ | Global slide-in drawer mounted in `RootLayout`; reads `isOpen` from store |
| `CartLineItem` | 165 | One row: thumb + name + cut/size/tarha pills + stepper + price + remove |
| `CartSummary` | 130 | Subtotal · savings · shipping · grand total (compact + inverse variants) |
| `CartView` | 230 | `/cart` content: items list + sticky summary + reassurance bullets, with skeleton + empty state |
| `CheckoutForm` | 380 | Arabic form with inline validation (Saudi phone regex) + persists customer + opens WA + routes to confirmation |
| `OrderConfirmationView` | 220 | Animated success hero + 3-step explainer + recap + "re-open WA" + "start new order" |
| (existing) `QuantityStepper` | 109 | Reused inside `CartLineItem` |

### Wiring

- `HeaderLuxury` was already wired to `useCartStore.openCart()` from Phase 3 — the drawer simply listens to `isOpen` and slides in.
- `CartDrawer` is mounted **once** in `RootLayout` so it works from every page (drawer opens whether the user is on `/`, a category, or a product page).
- `addItem()` already auto-opens the drawer (set in `cartStore.addItem`), so adding from any product page → drawer slides in.

## WhatsApp Checkout Flow

```
User → /products/:slug
     → Add to cart  (Zustand: addItem; isOpen = true)
     → CartDrawer slides in
     → "متابعة عبر واتساب"  → /checkout
     → Fill name + city + phone + (optional notes)
     → Submit
        ├─ validate inline (Saudi phone regex)
        ├─ setCustomer(data)  // persisted
        ├─ buildCheckoutUrl({ items, totals, customer, discountCode })
        ├─ window.open(url, '_blank')   // WhatsApp
        └─ router.push('/order-confirmation')
     → Success state → cart preserved → "ابدئي طلباً جديداً" → cart.clear()
```

The WA message is fully Arabic, itemised:

```
السلام عليكم 🤍
أرغب بإتمام طلب من بوتيك عبايات سردة.

🛍️ تفاصيل الطلب:

1. عباية جاكار (K-09)
   • القصة: عادي
   • المقاس: ٥٤
   • الكمية: 1
   • السعر: 180 ر.س
   • الطرحة: مجانية

💰 الإجمالي:
   • المجموع: 180 ر.س
   • الشحن: مجاني داخل المملكة
   • المبلغ النهائي: 180 ر.س
   • كود الخصم: sD1544

👤 بياناتي:
   • الاسم: أم سلطان
   • المدينة: الرياض
   • الجوال: 0501234567

شكراً لكم 🌹
```

## Validation

```bash
$ npm run type-check
> tsc --noEmit
# 0 errors

$ npm run build
✓ Compiled successfully in 5.9s
✓ Generating static pages using 3 workers (33/33) in 1258ms

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /cart                   ← NEW
├ ○ /categories
├ ● /categories/[slug]      (6 paths)
├ ○ /checkout               ← NEW
├ ○ /order-confirmation     ← NEW
└ ● /products/[slug]        (20 paths)
```

### Live route checks

| URL | Status |
|---|---|
| `/cart` | 200 (skeleton on server, client view on hydrate) |
| `/checkout` | 200 (form fields render after hydrate) |
| `/order-confirmation` | 200 (renders "تم إرسال طلبك", 3-step explainer) |
| Existing | All 30 pre-existing routes still 200 |

## SSR-safe hydration design

All three pages render an editorial `animate-pulse` skeleton on the server (the persisted cart only exists client-side in `localStorage`). Once `useCartHydrated()` flips to true, the real view renders — preventing SSR/CSR mismatch warnings.

## Accessibility

- `CartDrawer`: `role="dialog"`, `aria-modal="true"`, `aria-label`, ESC closes, body-scroll locked, overlay click closes.
- `CheckoutForm`: every field has `<label htmlFor>`, errors use `aria-invalid` + `aria-describedby`, focus auto-jumps to the first invalid field.
- All CTAs are real `<button>` / `<MagneticButton>` with proper `disabled` and visible focus rings.

## Notes

- Saudi phone regex accepts `05XXXXXXXX`, `5XXXXXXXX`, `+9665XXXXXXXX`, `009665XXXXXXXX`.
- Cart is **preserved** after the WhatsApp send so the customer can re-open WA if they accidentally closed the tab. They can manually clear via "ابدئي طلباً جديداً".
- `discountCode` is stored on the cart and defaults to `SITE.discountCode` (`sD1544`).

## Next — Phase 6 (proposed)

PWA shell:

1. `manifest.json` (Arabic name, icons, theme colors, start_url, display = standalone)
2. Service worker (Workbox precache + runtime cache for images + offline fallback)
3. Offline fallback page
4. Full icon set (favicon, apple-touch-icon, maskable PNGs, splash screens)
5. `og-image.png` for social sharing
