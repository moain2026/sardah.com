import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { CartView } from '@/components/cart/CartView';
import { PolicyStrip } from '@/components/marketing/PolicyStrip';
import { SITE } from '@/lib/utils';

/**
 * /cart — صفحة السلة
 * ─────────────────────────────────────────────────────
 * Server shell + client `CartView` (reads the persisted Zustand
 * store with hydration gating).
 */

export const metadata: Metadata = {
  title: 'السلة — مراجعة طلبك',
  description:
    'راجعي القطع التي اخترتيها من بوتيك سردة قبل إتمام الطلب عبر واتساب — شحن مجاني داخل المملكة وأقمشة كورية مختارة.',
  alternates: { canonical: `${SITE.url}/cart` },
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <main className="pb-20 md:pb-28">
      <div className="boutique-container pt-6 md:pt-8">
        <Breadcrumb items={[{ label: 'السلة' }]} />
      </div>

      <section className="boutique-container pt-8 md:pt-12">
        <CartView />
      </section>

      <section className="boutique-container mt-16 md:mt-24">
        <PolicyStrip />
      </section>
    </main>
  );
}
