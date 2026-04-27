/**
 * Sardah Size Guide — دليل المقاسات
 * Sizes 50–60 are the real selectable values on the original site.
 * Length / chest / sleeve measurements are reasonable boutique-grade
 * estimates and are clearly marked as guidance rather than absolute.
 */

export interface SizeRow {
  /** Numeric size (50, 52, …) */
  size: number;
  /** Arabic display label, e.g. "٥٤" */
  label: string;
  /** Total length in cm — الطول */
  length: number;
  /** Chest (across) in cm — الصدر */
  chest: number;
  /** Sleeve length in cm — الكم */
  sleeve: number;
  /** Shoulder in cm — الكتف */
  shoulder: number;
  /** Suggested wearer height (cm) range as text — الطول المقترح */
  recommendedHeight: string;
}

export const SIZE_GUIDE: readonly SizeRow[] = [
  {
    size: 50,
    label: '٥٠',
    length: 134,
    chest: 50,
    sleeve: 56,
    shoulder: 38,
    recommendedHeight: '150–155 سم',
  },
  {
    size: 52,
    label: '٥٢',
    length: 138,
    chest: 52,
    sleeve: 58,
    shoulder: 39,
    recommendedHeight: '155–160 سم',
  },
  {
    size: 54,
    label: '٥٤',
    length: 142,
    chest: 54,
    sleeve: 60,
    shoulder: 40,
    recommendedHeight: '160–165 سم',
  },
  {
    size: 56,
    label: '٥٦',
    length: 146,
    chest: 56,
    sleeve: 62,
    shoulder: 41,
    recommendedHeight: '165–170 سم',
  },
  {
    size: 58,
    label: '٥٨',
    length: 150,
    chest: 58,
    sleeve: 64,
    shoulder: 42,
    recommendedHeight: '170–175 سم',
  },
  {
    size: 60,
    label: '٦٠',
    length: 154,
    chest: 60,
    sleeve: 66,
    shoulder: 43,
    recommendedHeight: '175 سم وأكثر',
  },
] as const;

/**
 * Cut explanation — للقصات
 */
export interface CutExplanation {
  cut: 'regular' | 'quarter-flare' | 'half-flare' | 'full-flare' | 'blazer' | 'classic';
  label: string;
  description: string;
}

export const CUT_EXPLANATIONS: readonly CutExplanation[] = [
  {
    cut: 'regular',
    label: 'عادي',
    description:
      'قصة مستقيمة كلاسيكية، تنسدل بنعومة دون اتساع كبير. مناسبة للجميع.',
  },
  {
    cut: 'quarter-flare',
    label: 'ربع كلوش',
    description:
      'اتساع خفيف من الأسفل، يمنح حركة أنيقة دون مبالغة. الأكثر طلباً.',
  },
  {
    cut: 'half-flare',
    label: 'نص كلوش',
    description:
      'اتساع متوسط يبرز أنوثة الإطلالة ويناسب المناسبات والإطلالات الراقية.',
  },
  {
    cut: 'full-flare',
    label: 'كلوش كامل',
    description: 'اتساع واضح من أسفل العباية، ملوكي ومناسب للمناسبات الكبرى.',
  },
  {
    cut: 'blazer',
    label: 'بليزر',
    description: 'قصة مستوحاة من البليزر بكتف واضح وحضور قوي وعصري.',
  },
  {
    cut: 'classic',
    label: 'كلاسيك',
    description: 'قصة تقليدية بسيطة وراقية، تليق بجميع المناسبات.',
  },
] as const;

/**
 * General sizing tips shown in the size guide modal.
 */
export const SIZE_TIPS: readonly string[] = [
  'المقاسات تقريبية وقد يحدث فرق بسيط حسب نوع القماش.',
  'ينصح باختيار المقاس المعتاد لديكِ في العبايات.',
  'إذا كنتِ بين مقاسين، يُفضّل اختيار المقاس الأكبر.',
  'يمكنكِ كتابة أي تعديل في خانة "الملاحظة" قبل إتمام الطلب.',
  'الطول يُحتسب من الكتف إلى أسفل العباية.',
];
