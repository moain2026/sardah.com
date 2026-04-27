/**
 * Sardah official policies — extracted from
 * https://sardah.com/سياسة-الاستبدال-والاسترجاع/page-898604809
 *
 * These texts must be presented clearly in product pages,
 * cart, and FAQ. Do NOT hide them.
 */

export interface PolicyPoint {
  id: string;
  /** Short Arabic title */
  title: string;
  /** Detailed Arabic description */
  body: string;
  /** Lucide icon name to display alongside the point */
  icon: 'clock' | 'wallet' | 'shield' | 'sparkles' | 'truck' | 'lock';
}

export const POLICY_POINTS: readonly PolicyPoint[] = [
  {
    id: 'order-time',
    title: 'مدة الطلب',
    body: 'مدة تجهيز وتوصيل الطلب من 5 إلى 13 يوم عمل من تاريخ تأكيد الطلب.',
    icon: 'clock',
  },
  {
    id: 'no-cod',
    title: 'الدفع الإلكتروني',
    body: 'الدفع متاح إلكترونياً عبر mada وApple Pay والبطاقات الائتمانية وTabby وTamara — لا يوجد خيار الدفع عند الاستلام.',
    icon: 'wallet',
  },
  {
    id: 'exchange',
    title: 'الاستبدال',
    body: 'لا يوجد استبدال أو استرجاع للمنتج إلا إذا كان هناك عيب مصنعي. وفي هذه الحالة يتم استبدال القطعة فقط.',
    icon: 'shield',
  },
  {
    id: 'no-refund',
    title: 'لا يوجد استرجاع للمبلغ',
    body: 'في حال وجود خطأ من قبل المتجر، يتم استبدال القطعة فقط ولا يتم استرجاع المبلغ.',
    icon: 'lock',
  },
  {
    id: 'free-shipping',
    title: 'شحن مجاني',
    body: 'شحن مجاني داخل المملكة العربية السعودية مع كود الخصم لفترة محدودة.',
    icon: 'truck',
  },
  {
    id: 'quality',
    title: 'جودة عالية',
    body: 'أقمشة كورية 100% مختارة بعناية، وخياطة نظيفة بتفاصيل دقيقة في كل قطعة.',
    icon: 'sparkles',
  },
] as const;

/**
 * Compact policy strip used in homepage / cart drawer.
 */
export const POLICY_STRIP: readonly PolicyPoint[] = POLICY_POINTS.filter(
  (p) => p.id !== 'quality' && p.id !== 'no-refund',
);

/**
 * Original raw policy text (for FAQ / dedicated policy page).
 */
export const POLICY_RAW_LINES: readonly string[] = [
  'مدة الطلب من 5 - 13 يوم.',
  'لا يوجد الدفع عند الاستلام.',
  'لا يوجد استبدال أو استرجاع المنتج إلا إذا كان عيب مصنعي.',
  'في حال وجود عيب أو خطأ من قبل المتجر سيتم استبدال القطعة.',
  'لا يمكن الاسترجاع.',
];
