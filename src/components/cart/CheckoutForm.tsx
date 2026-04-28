'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MessageCircle,
  ArrowLeft,
  ShieldCheck,
  Truck,
  Tag,
  CheckCircle2,
} from 'lucide-react';
import { useCartStore, useCartHydrated } from '@/store/cartStore';
import { CartLineItem } from './CartLineItem';
import { CartSummary } from './CartSummary';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { LuxuryCard } from '@/components/ui/LuxuryCard';
import { buildCheckoutUrl } from '@/lib/whatsapp';
import { SITE, cn } from '@/lib/utils';
import type { CheckoutCustomer } from '@/types/cart';

/**
 * CheckoutForm — نموذج إتمام الطلب
 * ─────────────────────────────────────────────────────
 * Captures Arabic customer details (name + city + phone + optional
 * note), validates them inline, then opens WhatsApp with the full
 * itemised order message via `buildCheckoutUrl`.
 *
 * After firing the WA window we navigate to `/order-confirmation`
 * (the cart is preserved until the customer chooses "ابدئي طلباً جديداً").
 */

const SAUDI_PHONE_RE = /^(05\d{8}|5\d{8}|\+9665\d{8}|009665\d{8})$/;

interface FormErrors {
  name?: string;
  city?: string;
  phone?: string;
}

export function CheckoutForm() {
  const router = useRouter();
  const hydrated = useCartHydrated();
  const items = useCartStore((s) => s.items);
  const totalsFn = useCartStore((s) => s.totals);
  const customer = useCartStore((s) => s.customer);
  const setCustomer = useCartStore((s) => s.setCustomer);
  const discountCode = useCartStore((s) => s.discountCode);

  const [name, setName] = useState(customer?.name ?? '');
  const [city, setCity] = useState(customer?.city ?? '');
  const [phone, setPhone] = useState(customer?.phone ?? '');
  const [notes, setNotes] = useState(customer?.notes ?? '');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  // Pre-fill from persisted customer once hydrated
  useEffect(() => {
    if (hydrated && customer) {
      setName(customer.name);
      setCity(customer.city);
      setPhone(customer.phone);
      setNotes(customer.notes ?? '');
    }
  }, [hydrated, customer]);

  if (!hydrated) {
    return <CheckoutSkeleton />;
  }

  if (items.length === 0) {
    return <EmptyCheckoutState />;
  }

  const totals = totalsFn();

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!name.trim() || name.trim().length < 2) {
      next.name = 'يرجى إدخال الاسم الكامل';
    }
    if (!city.trim() || city.trim().length < 2) {
      next.city = 'يرجى إدخال المدينة';
    }
    const cleanPhone = phone.replace(/\s|-/g, '');
    if (!SAUDI_PHONE_RE.test(cleanPhone)) {
      next.phone = 'رقم الجوال السعودي يبدأ بـ 05 ويتكوّن من 10 أرقام';
    }
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) {
      // Focus the first invalid field
      const firstField = Object.keys(v)[0];
      const el = document.getElementById(firstField) as HTMLInputElement | null;
      el?.focus();
      return;
    }

    setSubmitting(true);

    const customerData: CheckoutCustomer = {
      name: name.trim(),
      city: city.trim(),
      phone: phone.replace(/\s|-/g, '').trim(),
      notes: notes.trim() || undefined,
    };
    setCustomer(customerData);

    const url = buildCheckoutUrl({
      items,
      totals,
      customer: customerData,
      discountCode: discountCode ?? SITE.discountCode,
    });

    // Open WhatsApp in a new tab and route to confirmation
    window.open(url, '_blank', 'noopener,noreferrer');
    router.push('/order-confirmation');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid lg:grid-cols-[minmax(0,1fr)_400px] gap-8 lg:gap-12 items-start"
      noValidate
    >
      {/* Form column */}
      <section className="min-w-0 flex flex-col gap-7">
        <div>
          <h2 className="font-ruqaa text-display-md text-onyx">
            بيانات التواصل
          </h2>
          <p className="mt-2 text-sm text-onyx-500 leading-loose">
            نحتاج هذه التفاصيل لإكمال الطلب عبر واتساب — لن يتم نشرها أو
            مشاركتها مع أي طرف آخر.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <Field
            id="name"
            label="الاسم الكامل"
            value={name}
            onChange={setName}
            error={errors.name}
            autoComplete="name"
            required
          />
          <div className="grid sm:grid-cols-2 gap-5">
            <Field
              id="city"
              label="المدينة"
              value={city}
              onChange={setCity}
              error={errors.city}
              autoComplete="address-level2"
              required
            />
            <Field
              id="phone"
              label="رقم الجوال"
              value={phone}
              onChange={setPhone}
              error={errors.phone}
              type="tel"
              dir="ltr"
              placeholder="05XXXXXXXX"
              autoComplete="tel"
              inputClassName="nums-latin tracking-wide"
              required
            />
          </div>

          <Field
            id="notes"
            label="ملاحظة عامة على الطلب"
            value={notes}
            onChange={setNotes}
            multiline
            rows={3}
            optional
            placeholder="مثلاً: تواصلوا معي بعد الساعة ٤ مساءً، أو تفاصيل إضافية على القياس…"
          />
        </div>

        {/* Items review */}
        <LuxuryCard tone="ivory" className="p-5 md:p-6">
          <div className="flex items-center gap-2 text-champagne-700 mb-4">
            <CheckCircle2 size={16} strokeWidth={1.7} />
            <span className="text-[0.7rem] tracking-[0.22em] uppercase font-tajawal">
              مراجعة القطع ({totals.totalItems})
            </span>
          </div>

          <ul className="flex flex-col divide-y divide-onyx/8">
            {items.map((item) => (
              <li key={item.lineId} className="py-4 first:pt-0 last:pb-0">
                <CartLineItem item={item} dense />
              </li>
            ))}
          </ul>

          <Link
            href="/cart"
            className="mt-4 inline-flex items-center gap-1.5 text-xs text-onyx-700 hover:text-champagne-700 transition-colors"
          >
            <ArrowLeft size={13} strokeWidth={1.7} />
            تعديل السلة
          </Link>
        </LuxuryCard>
      </section>

      {/* Sidebar */}
      <aside aria-label="ملخّص الطلب" className="lg:sticky lg:top-28">
        <LuxuryCard tone="ivory" className="p-6 md:p-7">
          <CartSummary totals={totals} />

          <div className="mt-6 flex flex-col gap-2.5">
            <motion.div
              initial={false}
              animate={{ scale: submitting ? 0.98 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <MagneticButton
                type="submit"
                variant="onyx"
                size="lg"
                block
                disabled={submitting}
                iconStart={<MessageCircle size={16} strokeWidth={1.7} />}
              >
                {submitting ? 'جارٍ فتح واتساب…' : 'إرسال الطلب عبر واتساب'}
              </MagneticButton>
            </motion.div>
            <p className="text-[0.65rem] tracking-wide text-taupe text-center mt-1 leading-loose">
              بإرسال الطلب يفتح تطبيق واتساب على رقم سردة لتأكيد العنوان
              وإصدار رابط الدفع الإلكتروني.
            </p>
          </div>
        </LuxuryCard>

        {/* Reassurance */}
        <div className="mt-4 grid grid-cols-1 gap-2 text-sm">
          <Reassurance
            icon={<ShieldCheck size={14} strokeWidth={1.7} />}
            title="بياناتك بأمان"
            sub="لا يتم تخزين أي بيانات على خوادمنا — تُرسل مباشرة إلى واتساب."
          />
          <Reassurance
            icon={<Truck size={14} strokeWidth={1.7} />}
            title="شحن مجاني"
            sub={`تحضير وتسليم خلال ٥–١٣ يوم عمل داخل المملكة.`}
          />
          <Reassurance
            icon={<Tag size={14} strokeWidth={1.7} />}
            title="كود الخصم"
            sub={`استخدمي ${SITE.discountCode} للحصول على خصم إضافي عند الدفع.`}
          />
        </div>
      </aside>
    </form>
  );
}

/* ─────────────────────────────────────────────────────
   Field
   ───────────────────────────────────────────────────── */

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  dir?: 'ltr' | 'rtl';
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  optional?: boolean;
  multiline?: boolean;
  rows?: number;
  inputClassName?: string;
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = 'text',
  dir = 'rtl',
  placeholder,
  autoComplete,
  required,
  optional,
  multiline,
  rows = 3,
  inputClassName,
}: FieldProps) {
  const baseInput = cn(
    'w-full rounded-luxe border bg-pearl px-4 py-3 text-sm leading-relaxed text-onyx placeholder:text-taupe focus:outline-none transition-colors',
    error
      ? 'border-rose focus:border-rose'
      : 'border-onyx/15 focus:border-champagne-500',
    inputClassName,
  );

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="flex items-center justify-between font-tajawal text-sm font-semibold text-onyx"
      >
        <span>
          {label}
          {required && <span className="text-rose ms-1">*</span>}
        </span>
        {optional && (
          <span className="text-[0.65rem] text-taupe font-normal">
            (اختياري)
          </span>
        )}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          dir={dir}
          placeholder={placeholder}
          className={baseInput}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          dir={dir}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={baseInput}
        />
      )}
      {error && (
        <span id={`${id}-error`} role="alert" className="text-xs text-rose">
          {error}
        </span>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Reassurance row
   ───────────────────────────────────────────────────── */

function Reassurance({
  icon,
  title,
  sub,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-luxe border border-onyx/8 bg-pearl-200 px-3.5 py-3">
      <span
        className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-pearl text-champagne-700 shrink-0"
        aria-hidden
      >
        {icon}
      </span>
      <div className="min-w-0">
        <div className="font-tajawal font-semibold text-xs text-onyx">
          {title}
        </div>
        <div className="text-[0.7rem] text-onyx-500 leading-relaxed mt-0.5">
          {sub}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Empty state (no items)
   ───────────────────────────────────────────────────── */

function EmptyCheckoutState() {
  return (
    <div className="flex flex-col items-center text-center gap-5 py-16">
      <h2 className="font-ruqaa text-display-md text-onyx">
        لا توجد قطع للطلب
      </h2>
      <p className="text-sm text-onyx-500 max-w-sm leading-loose">
        أضيفي بعض القطع إلى السلة قبل الانتقال إلى صفحة إتمام الطلب.
      </p>
      <MagneticButton href="/categories/abayas" variant="onyx" size="md">
        تصفّحي العبايات
      </MagneticButton>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Skeleton
   ───────────────────────────────────────────────────── */

function CheckoutSkeleton() {
  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_400px] gap-8 animate-pulse">
      <div className="flex flex-col gap-5">
        <div className="h-7 w-44 rounded-luxe bg-onyx/5" />
        <div className="h-12 rounded-luxe bg-onyx/5" />
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="h-12 rounded-luxe bg-onyx/5" />
          <div className="h-12 rounded-luxe bg-onyx/5" />
        </div>
        <div className="h-24 rounded-luxe bg-onyx/5" />
      </div>
      <div className="rounded-luxe bg-onyx/5 h-[320px]" />
    </div>
  );
}
