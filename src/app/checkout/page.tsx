import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { CheckoutForm } from '@/components/cart/CheckoutForm';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SITE } from '@/lib/utils';

/**
 * /checkout — إتمام الطلب
 * ─────────────────────────────────────────────────────
 * Lightweight WhatsApp-driven checkout: customer fills name + city +
 * phone + optional notes, then we open `wa.me` with a fully
 * itemised Arabic message and route them to /order-confirmation.
 */

export const metadata: Metadata = {
  title: 'إتمام الطلب — تأكيد التواصل',
  description:
    'أكملي بياناتك لإتمام طلب عبايات سردة عبر واتساب — شحن مجاني داخل المملكة وأقمشة كورية فاخرة.',
  alternates: { canonical: `${SITE.url}/checkout` },
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <main className="pb-20 md:pb-28">
      <div className="boutique-container pt-6 md:pt-8">
        <Breadcrumb
          items={[
            { label: 'السلة', href: '/cart' },
            { label: 'إتمام الطلب' },
          ]}
        />
      </div>

      <section className="boutique-container pt-8 md:pt-12 pb-10 md:pb-12">
        <SectionHeading
          eyebrow="خطوة أخيرة"
          align="start"
          size="xl"
          as="h1"
          title={
            <>
              إتمام الطلب{' '}
              <span className="gradient-text-shimmer">عبر واتساب</span>
            </>
          }
          intro="نتأكّد من بياناتك ثم نفتح محادثة واتساب مع رقم سردة جاهزة بالطلب الكامل لإصدار رابط الدفع وتأكيد العنوان."
        />
      </section>

      <section className="boutique-container">
        <CheckoutForm />
      </section>
    </main>
  );
}
