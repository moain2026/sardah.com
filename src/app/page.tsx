import Link from 'next/link';
import { SITE } from '@/lib/utils';

/**
 * Phase 1 Placeholder Homepage.
 * يعرض بطاقة فخامة بسيطة للتحقق من النظام البصري:
 *   - الخطوط العربية (Aref Ruqaa + IBM Plex Sans Arabic)
 *   - لوحة الألوان (onyx, pearl, champagne)
 *   - utility classes (.boutique-container, .editorial-heading, .gradient-text…)
 *   - RTL layout
 *
 * المرحلة 3 ستستبدل هذه الصفحة بـ Hero, Categories, Featured… إلخ.
 */
export default function HomePagePlaceholder() {
  return (
    <main className="relative min-h-screen pearl-texture">
      {/* Top fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-top-fade opacity-30" />

      {/* Hero placeholder */}
      <section className="relative section-padding-lg">
        <div className="boutique-container">
          {/* Eyebrow */}
          <div className="flex justify-center mb-8">
            <span className="editorial-eyebrow">Phase 1 · Foundation</span>
          </div>

          {/* Brand wordmark */}
          <h1 className="editorial-heading text-center text-display-xl mb-6">
            <span className="block">عبــايــات</span>
            <span className="block gradient-text-shimmer">ســـــردة</span>
          </h1>

          {/* Tagline */}
          <p className="text-center text-base md:text-lg text-onyx-500 max-w-prose mx-auto mb-12 leading-loose">
            {SITE.tagline} — تجربة بوتيك رقمي فاخر للعبايات السعودية.
            <br />
            هذه صفحة مرحلية للتحقق من نظام التصميم. الصفحة الكاملة ستُبنى في المرحلة الثالثة.
          </p>

          {/* Gold divider */}
          <div className="gold-divider max-w-md mx-auto mb-12" />

          {/* Color swatches preview */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 max-w-3xl mx-auto mb-16">
            {[
              { name: 'Onyx', hex: '#080808', bg: 'bg-onyx', text: 'text-pearl' },
              { name: 'Charcoal', hex: '#151515', bg: 'bg-onyx-700', text: 'text-pearl' },
              { name: 'Pearl', hex: '#F8F5EF', bg: 'bg-pearl', text: 'text-onyx' },
              { name: 'Champagne', hex: '#C8A96A', bg: 'bg-champagne', text: 'text-onyx' },
              { name: 'Sand', hex: '#E8DED0', bg: 'bg-sand', text: 'text-onyx' },
            ].map((swatch) => (
              <div
                key={swatch.name}
                className={`${swatch.bg} ${swatch.text} aspect-square rounded-luxe gold-border flex flex-col items-center justify-center text-xs font-medium tracking-wider`}
              >
                <span className="font-ruqaa text-base">{swatch.name}</span>
                <span className="opacity-70 mt-1 nums-latin">{swatch.hex}</span>
              </div>
            ))}
          </div>

          {/* CTA buttons preview */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
            <button className="magnetic-button magnetic-button-gold">
              <span>تسوقي العبايات</span>
            </button>
            <button className="magnetic-button">
              <span>اكتشفي التشكيلة</span>
            </button>
            <button className="magnetic-button magnetic-button-outline">
              <span>اعرفي المزيد</span>
            </button>
          </div>

          {/* Card preview */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="luxury-card p-8">
              <span className="badge-new mb-4">جديد</span>
              <h3 className="font-ruqaa text-2xl mb-3 mt-4">أقمشة كورية</h3>
              <p className="text-sm leading-loose text-onyx-500">
                مختارة بعناية لتمنحك راحة وأناقة طوال اليوم.
              </p>
            </div>

            <div className="luxury-card p-8 gold-border">
              <span className="badge-sale mb-4">تخفيض</span>
              <h3 className="font-ruqaa text-2xl mb-3 mt-4">خياطة نظيفة</h3>
              <p className="text-sm leading-loose text-onyx-500">
                تفاصيل دقيقة وحياكة محترفة في كل قطعة.
              </p>
            </div>

            <div className="luxury-card p-8">
              <span className="badge-soldout mb-4">نفدت الكمية</span>
              <h3 className="font-ruqaa text-2xl mb-3 mt-4">طرحة مجانية</h3>
              <p className="text-sm leading-loose text-onyx-500">
                مع التصاميم المختارة من تشكيلتنا الفاخرة.
              </p>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-24 text-center">
            <div className="gold-divider max-w-xs mx-auto mb-6" />
            <p className="text-xs tracking-luxe uppercase text-taupe">
              Sardah Abayas · Phase 1 Foundation Ready
            </p>
            <Link
              href="/"
              className="inline-block mt-4 text-xs text-champagne-600 hover:text-champagne-400 transition-colors"
            >
              ↻ Reload to verify fonts &amp; theme
            </Link>
          </div>
        </div>
      </section>

      {/* Onyx editorial preview */}
      <section className="onyx-section grain-on-dark section-padding mt-section">
        <div className="boutique-container relative">
          <div className="text-center">
            <span className="editorial-eyebrow text-champagne">Onyx Editorial</span>
            <h2 className="editorial-heading text-display-lg mt-6 mb-4 text-pearl">
              تفاصيل سوداء…{' '}
              <span className="gradient-text">حضور لا يُنسى</span>
            </h2>
            <p className="text-pearl/70 max-w-prose mx-auto leading-loose">
              تجربة سينمائية على خلفية أونيكس، مع لمسة ذهب شامبانيا.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
