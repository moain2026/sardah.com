import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { OrderConfirmationView } from '@/components/cart/OrderConfirmationView';
import { SITE } from '@/lib/utils';

/**
 * /order-confirmation — تأكيد إرسال الطلب
 * ─────────────────────────────────────────────────────
 * Post-checkout success state. Reads from the persisted cart store
 * (the cart is preserved until the customer chooses to clear it).
 */

export const metadata: Metadata = {
  title: 'تم إرسال طلبك — عبايات سردة',
  description:
    'تم إرسال طلبك إلى واتساب سردة. سنتواصل معكِ قريباً لإصدار رابط الدفع وتأكيد العنوان.',
  alternates: { canonical: `${SITE.url}/order-confirmation` },
  robots: { index: false, follow: false },
};

export default function OrderConfirmationPage() {
  return (
    <main className="pb-20 md:pb-28">
      <div className="boutique-container pt-6 md:pt-8">
        <Breadcrumb
          items={[
            { label: 'السلة', href: '/cart' },
            { label: 'تأكيد الطلب' },
          ]}
        />
      </div>

      <section className="boutique-container pt-8 md:pt-12">
        <OrderConfirmationView />
      </section>
    </main>
  );
}
