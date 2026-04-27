import type { Review } from '@/types/review';

/**
 * Real Sardah customer reviews — extracted from sardah.com homepage.
 * Names and texts are kept verbatim for authenticity.
 */
export const REVIEWS: readonly Review[] = [
  {
    id: 'rev-latifa-mutairi',
    customerName: 'لطيفة المطيري',
    initials: 'لم',
    rating: 5,
    text: 'حلو وسريع.',
    createdAt: '2024-08-12',
    dateLabel: 'تجربة موثّقة',
    verified: true,
  },
  {
    id: 'rev-nada-ghamdi',
    customerName: 'ندى الغامدي',
    initials: 'نغ',
    rating: 5,
    text: 'أول مرة أطلب عباية من موقع من غير ما أشوف الخامات والخياطة بنفسي، لكن جداً جداً حبيتها وانصدمت بنظافة الخياطة رغم إني معدلة تعديلات بسيطة عليها. شكراً من القلب على الأمانة في الشغل، وإن شاء الله بصير أجيب عباياتي من عندكم!',
    createdAt: '2024-09-03',
    dateLabel: 'تجربة موثّقة',
    verified: true,
  },
  {
    id: 'rev-loly',
    customerName: 'Loly',
    initials: 'L',
    rating: 5,
    text: 'أتكلم عن أسلوبها الخيال؟ ولا عن العباية والخامة وسرعة التوصيل والباكجينق؟ ولا عن إيش بالضبط… الله يبارك لها كل شي خياااالي، وراح أرجع أطلب إن شاء الله من عندها دائماً.',
    createdAt: '2024-10-21',
    dateLabel: 'تجربة موثّقة',
    verified: true,
  },
  {
    id: 'rev-afrah-faqih',
    customerName: 'عفراء فقيه',
    initials: 'عف',
    rating: 5,
    text: 'الله يعطيكم العافية، العباية ولا غلطة، القماش بطل والخياطة نظيفة. وبإذن الله مو آخر تعامل معاكم.',
    createdAt: '2024-11-17',
    dateLabel: 'تجربة موثّقة',
    verified: true,
  },
] as const;

/* ─────────────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────────────── */

export function getAllReviews(): readonly Review[] {
  return REVIEWS;
}

export function getReviewsByProduct(productCode: string): readonly Review[] {
  return REVIEWS.filter((r) => r.productCode === productCode);
}

export function getAverageRating(reviews: readonly Review[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}
