import type {
  Product,
  ProductFilterState,
  ProductSortOption,
} from '@/types/product';
import type { CategorySlug } from '@/types/category';
import {
  DEFAULT_CUT_OPTIONS,
  DEFAULT_SIZES,
  SOLDOUT_SIZES,
  buildAbayaImageSet,
  buildCutOptions,
} from './_productHelpers';

/**
 * Sardah real product catalogue — 20 SKUs extracted from the live site.
 *
 * Notes:
 *  - Codes (K-09, S-138, …) are real.
 *  - Prices, fabrics, cuts, and "free tarha" flags are taken verbatim from
 *    sardah.com search snippets and product pages.
 *  - Sizes 50–60 + cut variants reflect the original UI.
 *  - When detail wasn't available on the site, fields are left as sensible
 *    boutique defaults — flagged in comments.
 */
export const PRODUCTS: readonly Product[] = [
  /* ───────── K-09 — العباية الأساسية الأولى ───────── */
  {
    id: 'abaya-k09',
    slug: 'abaya-k09',
    legacySlug: 'zvmODgq',
    code: 'K-09',
    name: 'عباية K-09',
    subtitle: 'جاكار أسود فاحم',
    category: 'occasions',
    secondaryCategories: ['abayas'],
    price: 180,
    oldPrice: 209,
    currency: 'SAR',
    images: buildAbayaImageSet(
      'K-09',
      'عباية K-09 سوداء بقماش جاكار من سردة',
    ),
    fabric: 'جاكار',
    cuts: DEFAULT_CUT_OPTIONS,
    defaultCut: 'quarter-flare',
    closure: 'snap',
    closureLabel: 'طقطق',
    color: 'أسود فاحم',
    includesTarha: true,
    shortDescription:
      'عباية أنيقة تجمع بين الفخامة والأناقة، مع طرحة مجانية بنفس التطريز.',
    description:
      'عباية أنيقة تجمع بين الفخامة والأناقة لتلبي جميع احتياجاتك اليومية، مصنوعة من أجود أنواع الأقمشة. مع طرحة بطرفها نفس التطريز.',
    features: [
      'قماش جاكار فاخر',
      'لون أسود فاحم',
      'قفلة طقطق سهلة الاستخدام',
      'طرحة مجانية بتطريز مطابق',
      'متوفرة بأربع قصات',
    ],
    sizes: DEFAULT_SIZES,
    stockStatus: 'in-stock',
    isSoldOut: false,
    isOnSale: true,
    badges: ['sale', 'bestseller'],
    rating: 4.9,
    reviewsCount: 0,
    customizationAllowed: true,
    notesPlaceholder: 'اكتبي أي تعديل أو ملاحظة على الطلب هنا',
    tags: ['جاكار', 'أسود', 'يومية', 'مناسبات'],
    seoTitle: 'عباية K-09 جاكار سوداء — سردة',
    seoDescription:
      'عباية K-09 من سردة بقماش جاكار فاخر باللون الأسود الفاحم، مع طرحة مجانية وتفاصيل أنيقة.',
    featured: true,
    isNew: false,
    fastShipping: false,
    createdAt: '2024-09-01',
  },

  /* ───────── S-138 — عباية الدانتيل ───────── */
  {
    id: 'abaya-s138',
    slug: 'abaya-lace-s138',
    legacySlug: 'jZwYbgd',
    code: 'S-138',
    name: 'عباية S-138',
    subtitle: 'دانتيل وكريب ملكي',
    category: 'occasions',
    secondaryCategories: ['abayas'],
    price: 269,
    oldPrice: 300,
    currency: 'SAR',
    images: buildAbayaImageSet(
      'S-138',
      'عباية دانتيل S-138 بقصة نص كلوش من سردة',
    ),
    fabric: 'كريب ملكي + دانتيل',
    cuts: buildCutOptions(['half-flare']),
    defaultCut: 'half-flare',
    closure: 'snap',
    closureLabel: 'طقطق',
    color: 'أسود',
    includesTarha: true,
    shortDescription:
      'عباية دانتيل بقصة نص كلوش، تجمع بين الكريب الملكي والدانتيل الفاخر.',
    description:
      'عباية دانتيل أنيقة تتميز بمزج كريب ملكي مع دانتيل فاخر، بقصة نص كلوش تمنحك حضوراً استثنائياً. طرحة مجانية متضمّنة.',
    features: [
      'قماش كريب ملكي + دانتيل',
      'قصة نص كلوش أنيقة',
      'قفلة طقطق',
      'طرحة مجانية',
      'مناسبة للمناسبات الخاصة',
    ],
    sizes: SOLDOUT_SIZES,
    stockStatus: 'sold-out',
    isSoldOut: true,
    isOnSale: true,
    badges: ['soldout', 'sale'],
    rating: 5,
    reviewsCount: 0,
    customizationAllowed: false,
    notesPlaceholder: 'اكتبي أي تعديل أو ملاحظة على الطلب هنا',
    tags: ['دانتيل', 'كريب ملكي', 'مناسبات', 'نص كلوش'],
    seoTitle: 'عباية دانتيل S-138 — سردة',
    seoDescription:
      'عباية S-138 من سردة بمزج كريب ملكي ودانتيل فاخر، بقصة نص كلوش وطرحة مجانية.',
    featured: true,
    isNew: false,
    fastShipping: false,
    createdAt: '2024-10-15',
  },

  /* ───────── S-162 — عباية شتوية ───────── */
  {
    id: 'abaya-s162',
    slug: 'winter-abaya-s162',
    legacySlug: 'VDzEdvl',
    code: 'S-162',
    name: 'عباية S-162',
    subtitle: 'كريب ملكي + تل تطريز',
    category: 'winter',
    secondaryCategories: ['occasions'],
    price: 219,
    oldPrice: 269,
    currency: 'SAR',
    images: buildAbayaImageSet(
      'S-162',
      'عباية شتوية S-162 بكريب ملكي وتل تطريز من سردة',
    ),
    fabric: 'كريب ملكي + تل تطريز مكينة',
    cuts: buildCutOptions(['quarter-flare']),
    defaultCut: 'quarter-flare',
    closure: 'snap',
    closureLabel: 'طقطق',
    color: 'أسود',
    includesTarha: true,
    shortDescription:
      'عباية شتوية بكريب ملكي وتل تطريز مكينة، بقصة ربع كلوش راقية.',
    description:
      'عباية شتوية فاخرة تدمج الكريب الملكي مع التل المطرز ميكانيكياً، بقصة ربع كلوش تمنحك حركة أنيقة. مع طرحة مجانية.',
    features: [
      'قماش كريب ملكي + تل تطريز',
      'قصة ربع كلوش',
      'قفلة طقطق',
      'طرحة مجانية',
      'دفء وأناقة شتوية',
    ],
    sizes: DEFAULT_SIZES,
    stockStatus: 'in-stock',
    isSoldOut: false,
    isOnSale: true,
    badges: ['sale', 'new'],
    rating: 4.8,
    reviewsCount: 0,
    customizationAllowed: true,
    notesPlaceholder: 'اكتبي أي تعديل أو ملاحظة على الطلب هنا',
    tags: ['شتوية', 'تل تطريز', 'كريب ملكي', 'ربع كلوش'],
    seoTitle: 'عباية شتوية S-162 — سردة',
    seoDescription:
      'عباية شتوية S-162 من سردة بكريب ملكي وتل مطرز، بقصة ربع كلوش وطرحة مجانية.',
    featured: true,
    isNew: true,
    fastShipping: true,
    createdAt: '2024-12-01',
  },

  /* ───────── S-161 ───────── */
  {
    id: 'abaya-s161',
    slug: 'winter-abaya-s161',
    code: 'S-161',
    name: 'عباية S-161',
    subtitle: 'تشكيلة الشتاء',
    category: 'winter',
    price: 229,
    oldPrice: 259,
    currency: 'SAR',
    images: buildAbayaImageSet('S-161', 'عباية شتوية S-161 من سردة'),
    fabric: 'كريب ملكي', // sensible default
    cuts: DEFAULT_CUT_OPTIONS,
    defaultCut: 'quarter-flare',
    closure: 'snap',
    closureLabel: 'طقطق',
    color: 'أسود',
    includesTarha: true,
    shortDescription: 'عباية شتوية بقصة راقية وأقمشة دافئة.',
    description:
      'عباية شتوية من تشكيلة سردة بأقمشة دافئة مختارة بعناية، تمنحك أناقة هادئة في الأيام الباردة.',
    features: [
      'قماش كريب ملكي',
      'قصة ربع كلوش',
      'قفلة طقطق',
      'طرحة مجانية',
    ],
    sizes: DEFAULT_SIZES,
    stockStatus: 'in-stock',
    isSoldOut: false,
    isOnSale: true,
    badges: ['sale'],
    rating: 4.7,
    customizationAllowed: true,
    notesPlaceholder: 'اكتبي أي تعديل أو ملاحظة على الطلب هنا',
    tags: ['شتوية', 'كريب ملكي'],
    seoTitle: 'عباية شتوية S-161 — سردة',
    seoDescription: 'عباية شتوية S-161 من سردة بأقمشة دافئة وقصة راقية.',
    featured: false,
    fastShipping: true,
    createdAt: '2024-11-20',
  },

  /* ───────── S-160 ───────── */
  {
    id: 'abaya-s160',
    slug: 'winter-abaya-s160',
    legacySlug: 'PDzvoxK',
    code: 'S-160',
    name: 'عباية S-160',
    subtitle: 'كريب ملكي + كلفة يدوي',
    category: 'winter',
    price: 210,
    oldPrice: 249,
    currency: 'SAR',
    images: buildAbayaImageSet(
      'S-160',
      'عباية S-160 بكريب ملكي وكلفة يدوي من سردة',
    ),
    fabric: 'كريب ملكي + كلفة يدوي',
    cuts: buildCutOptions(['quarter-flare']),
    defaultCut: 'quarter-flare',
    closure: 'snap',
    closureLabel: 'طقطق',
    color: 'أسود',
    includesTarha: true,
    shortDescription:
      'عباية بقصة ربع كلوش تجمع كريب ملكي مع كلفة يدوية أنيقة.',
    description:
      'عباية فاخرة من تشكيلة سردة الشتوية، تمزج بين الكريب الملكي والكلفة اليدوية الأنيقة. قصة ربع كلوش وطرحة مجانية.',
    features: [
      'قماش كريب ملكي + كلفة يدوي',
      'قصة ربع كلوش',
      'قفلة طقطق',
      'طرحة مجانية',
    ],
    sizes: DEFAULT_SIZES,
    stockStatus: 'in-stock',
    isSoldOut: false,
    isOnSale: true,
    badges: ['sale'],
    rating: 4.8,
    customizationAllowed: true,
    notesPlaceholder: 'اكتبي أي تعديل أو ملاحظة على الطلب هنا',
    tags: ['شتوية', 'كلفة يدوي', 'كريب ملكي', 'ربع كلوش'],
    seoTitle: 'عباية S-160 كلفة يدوي — سردة',
    seoDescription: 'عباية S-160 من سردة بكريب ملكي وكلفة يدوية وقصة ربع كلوش.',
    featured: false,
    fastShipping: true,
    createdAt: '2024-11-25',
  },

  /* ───────── S-159 ───────── */
  {
    id: 'abaya-s159',
    slug: 'abaya-s159',
    legacySlug: 'pAKYyKr',
    code: 'S-159',
    name: 'عباية S-159',
    subtitle: 'كريب ملكي + كلفة يدوي',
    category: 'occasions',
    secondaryCategories: ['abayas'],
    price: 189,
    oldPrice: 249,
    currency: 'SAR',
    images: buildAbayaImageSet(
      'S-159',
      'عباية S-159 بكريب ملكي وكلفة يدوي من سردة',
    ),
    fabric: 'كريب ملكي + كلفة يدوي',
    cuts: buildCutOptions(['quarter-flare']),
    defaultCut: 'quarter-flare',
    closure: 'snap',
    closureLabel: 'طقطق',
    color: 'أسود',
    includesTarha: true,
    shortDescription: 'عباية بقصة ربع كلوش وكلفة يدوية تمنحك حضوراً مميزاً.',
    description:
      'عباية أنيقة بقصة ربع كلوش وقماش كريب ملكي مع كلفة يدوية، مصممة لتمنحك إطلالة راقية. مع طرحة مجانية.',
    features: [
      'قماش كريب ملكي + كلفة يدوي',
      'قصة ربع كلوش',
      'قفلة طقطق',
      'طرحة مجانية',
    ],
    sizes: DEFAULT_SIZES,
    stockStatus: 'in-stock',
    isSoldOut: false,
    isOnSale: true,
    badges: ['sale'],
    rating: 4.8,
    customizationAllowed: true,
    notesPlaceholder: 'اكتبي أي تعديل أو ملاحظة على الطلب هنا',
    tags: ['كلفة يدوي', 'كريب ملكي', 'ربع كلوش'],
    seoTitle: 'عباية S-159 كلفة يدوي — سردة',
    seoDescription:
      'عباية S-159 من سردة بكريب ملكي وكلفة يدوية وقصة ربع كلوش.',
    featured: false,
    fastShipping: true,
    createdAt: '2024-11-15',
  },

  /* ───────── S-157 ───────── */
  {
    id: 'abaya-s157',
    slug: 'abaya-s157',
    legacySlug: 'wAYZNQR',
    code: 'S-157',
    name: 'عباية S-157',
    category: 'abayas',
    price: 205,
    oldPrice: 249,
    currency: 'SAR',
    images: buildAbayaImageSet('S-157', 'عباية S-157 من سردة'),
    fabric: 'كريب ملكي',
    cuts: DEFAULT_CUT_OPTIONS,
    defaultCut: 'quarter-flare',
    closure: 'snap',
    closureLabel: 'طقطق',
    color: 'أسود',
    includesTarha: true,
    shortDescription: 'عباية يومية أنيقة بقصة راقية.',
    description: 'عباية يومية من تشكيلة سردة الأساسية بقصة راقية وقماش كريب ملكي.',
    features: ['قماش كريب ملكي', 'قفلة طقطق', 'طرحة مجانية'],
    sizes: DEFAULT_SIZES,
    stockStatus: 'in-stock',
    isSoldOut: false,
    isOnSale: true,
    badges: ['sale'],
    rating: 4.7,
    customizationAllowed: true,
    notesPlaceholder: 'اكتبي أي تعديل أو ملاحظة على الطلب هنا',
    tags: ['كريب ملكي', 'يومية'],
    seoTitle: 'عباية S-157 — سردة',
    seoDescription: 'عباية S-157 من سردة بقماش كريب ملكي وقصة أنيقة.',
    fastShipping: true,
    createdAt: '2024-10-25',
  },

  /* ───────── S-155 ───────── */
  {
    id: 'abaya-s155',
    slug: 'abaya-blazer-s155',
    legacySlug: 'OyXKwGz',
    code: 'S-155',
    name: 'عباية S-155',
    subtitle: 'بليزر + مخمل',
    category: 'occasions',
    secondaryCategories: ['winter'],
    price: 245,
    oldPrice: 290,
    currency: 'SAR',
    images: buildAbayaImageSet(
      'S-155',
      'عباية S-155 بقصة بليزر ومخمل من سردة',
    ),
    fabric: 'بليزر + مخمل',
    cuts: buildCutOptions(['blazer']),
    defaultCut: 'blazer',
    closure: 'snap',
    closureLabel: 'طقطق',
    color: 'أسود',
    includesTarha: true,
    shortDescription:
      'عباية بقصة بليزر ومخمل، تمنحك حضوراً قوياً وعصرياً.',
    description:
      'عباية مميزة بقصة بليزر تجمع بين الجرأة والأناقة، مع لمسات من المخمل الفاخر. مع طرحة مجانية.',
    features: [
      'قماش بليزر + مخمل',
      'قصة بليزر عصرية',
      'قفلة طقطق',
      'طرحة مجانية',
    ],
    sizes: DEFAULT_SIZES,
    stockStatus: 'in-stock',
    isSoldOut: false,
    isOnSale: true,
    badges: ['sale', 'new'],
    rating: 4.9,
    customizationAllowed: true,
    notesPlaceholder: 'اكتبي أي تعديل أو ملاحظة على الطلب هنا',
    tags: ['بليزر', 'مخمل', 'مناسبات'],
    seoTitle: 'عباية بليزر ومخمل S-155 — سردة',
    seoDescription:
      'عباية S-155 من سردة بقصة بليزر فاخرة ولمسات من المخمل، مع طرحة مجانية.',
    featured: true,
    isNew: true,
    createdAt: '2024-12-05',
  },

  /* ───────── S-154 ───────── */
  {
    id: 'abaya-s154',
    slug: 'abaya-s154',
    legacySlug: 'DpOVPvy',
    code: 'S-154',
    name: 'عباية S-154',
    category: 'abayas',
    price: 245,
    oldPrice: 290,
    currency: 'SAR',
    images: buildAbayaImageSet('S-154', 'عباية S-154 من سردة'),
    fabric: 'كريب ملكي',
    cuts: DEFAULT_CUT_OPTIONS,
    defaultCut: 'quarter-flare',
    closure: 'snap',
    closureLabel: 'طقطق',
    color: 'أسود',
    includesTarha: true,
    shortDescription: 'عباية أساسية بقصة أنيقة.',
    description:
      'عباية كلاسيكية من تشكيلة سردة الأساسية، بقصة أنيقة وقماش كريب ملكي.',
    features: ['قماش كريب ملكي', 'قفلة طقطق', 'طرحة مجانية'],
    sizes: DEFAULT_SIZES,
    stockStatus: 'in-stock',
    isSoldOut: false,
    isOnSale: true,
    badges: ['sale'],
    rating: 4.7,
    customizationAllowed: true,
    notesPlaceholder: 'اكتبي أي تعديل أو ملاحظة على الطلب هنا',
    tags: ['كريب ملكي'],
    seoTitle: 'عباية S-154 — سردة',
    seoDescription: 'عباية S-154 من سردة بقماش كريب ملكي وقصة أنيقة.',
    createdAt: '2024-10-10',
  },

  /* ───────── S-151 ───────── */
  {
    id: 'abaya-s151',
    slug: 'abaya-s151',
    legacySlug: 'gyAjGjO',
    code: 'S-151',
    name: 'عباية S-151',
    category: 'occasions',
    price: 259,
    oldPrice: 300,
    currency: 'SAR',
    images: buildAbayaImageSet('S-151', 'عباية S-151 من سردة'),
    fabric: 'كريب ملكي',
    cuts: DEFAULT_CUT_OPTIONS,
    defaultCut: 'half-flare',
    closure: 'snap',
    closureLabel: 'طقطق',
    color: 'أسود',
    includesTarha: true,
    shortDescription: 'عباية مناسبات بقصة فاخرة.',
    description:
      'عباية مناسبات من سردة بتفاصيل دقيقة وقصة تليق بالحضور الراقي.',
    features: ['قماش كريب ملكي', 'قفلة طقطق', 'طرحة مجانية'],
    sizes: DEFAULT_SIZES,
    stockStatus: 'in-stock',
    isSoldOut: false,
    isOnSale: true,
    badges: ['sale'],
    rating: 4.8,
    customizationAllowed: true,
    notesPlaceholder: 'اكتبي أي تعديل أو ملاحظة على الطلب هنا',
    tags: ['مناسبات', 'كريب ملكي'],
    seoTitle: 'عباية S-151 — سردة',
    seoDescription:
      'عباية S-151 من سردة بقماش كريب ملكي وقصة تناسب المناسبات.',
    createdAt: '2024-09-20',
  },

  /* ───────── S-150 — عباية عملية ───────── */
  {
    id: 'abaya-s150',
    slug: 'practical-abaya-s150',
    legacySlug: 'dbzxZZp',
    code: 'S-150',
    name: 'عباية S-150',
    subtitle: 'عملية للدوام',
    category: 'practical',
    secondaryCategories: ['abayas'],
    price: 199,
    currency: 'SAR',
    images: buildAbayaImageSet(
      'S-150',
      'عباية عملية S-150 لكريب واقف من سردة',
    ),
    fabric: 'كريب واقف',
    cuts: buildCutOptions(['quarter-flare']),
    defaultCut: 'quarter-flare',
    closure: 'snap',
    closureLabel: 'طقطق',
    color: 'أسود',
    includesTarha: false,
    shortDescription:
      'عباية عملية مناسبة للطلعات اليومية وللدوامات بطابع راقي وفخم.',
    description:
      'عباية عملية مناسبة للطلعات اليومية وللدوامات بطابع راقي وفخم. قماش كريب واقف بقصة ربع كلوش وقفلة طقطق.',
    features: [
      'قماش كريب واقف',
      'قصة ربع كلوش',
      'قفلة طقطق',
      'مناسبة للدوام والطلعات اليومية',
    ],
    sizes: DEFAULT_SIZES,
    stockStatus: 'in-stock',
    isSoldOut: false,
    isOnSale: false,
    badges: ['bestseller'],
    rating: 4.7,
    customizationAllowed: true,
    notesPlaceholder: 'اكتبي أي تعديل أو ملاحظة على الطلب هنا',
    tags: ['عملية', 'دوام', 'كريب واقف'],
    seoTitle: 'عباية عملية S-150 — سردة',
    seoDescription:
      'عباية عملية S-150 من سردة بقماش كريب واقف، مناسبة للدوام والطلعات اليومية.',
    featured: true,
    createdAt: '2024-08-10',
  },

  /* ───────── S-145 ───────── */
  {
    id: 'abaya-s145',
    slug: 'abaya-s145',
    legacySlug: 'BpPAjYq',
    code: 'S-145',
    name: 'عباية S-145',
    subtitle: 'كريب واقف + جاكار',
    category: 'occasions',
    price: 259,
    oldPrice: 400,
    currency: 'SAR',
    images: buildAbayaImageSet(
      'S-145',
      'عباية S-145 بكريب واقف وجاكار من سردة',
    ),
    fabric: 'كريب واقف + جاكار',
    cuts: buildCutOptions(['half-flare']),
    defaultCut: 'half-flare',
    closure: 'snap',
    closureLabel: 'طقطق',
    color: 'أسود',
    includesTarha: true,
    shortDescription:
      'عباية بقصة نص كلوش تمزج بين كريب واقف والجاكار الفاخر.',
    description:
      'عباية فاخرة تمزج بين الكريب الواقف والجاكار، بقصة نص كلوش وقفلة طقطق وطرحة مجانية.',
    features: [
      'قماش كريب واقف + جاكار',
      'قصة نص كلوش',
      'قفلة طقطق',
      'طرحة مجانية',
    ],
    sizes: SOLDOUT_SIZES,
    stockStatus: 'sold-out',
    isSoldOut: true,
    isOnSale: true,
    badges: ['soldout', 'sale'],
    rating: 4.9,
    customizationAllowed: false,
    notesPlaceholder: 'اكتبي أي تعديل أو ملاحظة على الطلب هنا',
    tags: ['جاكار', 'كريب واقف', 'نص كلوش', 'مناسبات'],
    seoTitle: 'عباية S-145 جاكار — سردة',
    seoDescription:
      'عباية S-145 من سردة بكريب واقف وجاكار، بقصة نص كلوش وطرحة مجانية.',
    createdAt: '2024-09-05',
  },

  /* ───────── S-143 ───────── */
  {
    id: 'abaya-s143',
    slug: 'abaya-s143',
    legacySlug: 'yKNQowl',
    code: 'S-143',
    name: 'عباية S-143',
    category: 'abayas',
    secondaryCategories: ['occasions'],
    price: 245,
    oldPrice: 290,
    currency: 'SAR',
    images: buildAbayaImageSet('S-143', 'عباية S-143 بكريب ملكي من سردة'),
    fabric: 'كريب ملكي',
    cuts: buildCutOptions(['quarter-flare']),
    defaultCut: 'quarter-flare',
    closure: 'snap',
    closureLabel: 'طقطق',
    color: 'أسود',
    includesTarha: true,
    shortDescription: 'عباية بكريب ملكي وقصة ربع كلوش وطرحة مجانية.',
    description:
      'عباية أنيقة من تشكيلة سردة بقماش كريب ملكي، قصة ربع كلوش، قفلة طقطق، وطرحة مجانية.',
    features: [
      'قماش كريب ملكي',
      'قصة ربع كلوش',
      'قفلة طقطق',
      'طرحة مجانية',
    ],
    sizes: DEFAULT_SIZES,
    stockStatus: 'in-stock',
    isSoldOut: false,
    isOnSale: true,
    badges: ['sale'],
    rating: 4.8,
    customizationAllowed: true,
    notesPlaceholder: 'اكتبي أي تعديل أو ملاحظة على الطلب هنا',
    tags: ['كريب ملكي', 'ربع كلوش'],
    seoTitle: 'عباية S-143 — سردة',
    seoDescription:
      'عباية S-143 من سردة بقماش كريب ملكي وقصة ربع كلوش وطرحة مجانية.',
    createdAt: '2024-08-25',
  },

  /* ───────── S-136 ───────── */
  {
    id: 'abaya-s136',
    slug: 'abaya-s136',
    legacySlug: 'wWxpYGg',
    code: 'S-136',
    name: 'عباية S-136',
    category: 'occasions',
    price: 259,
    oldPrice: 400,
    currency: 'SAR',
    images: buildAbayaImageSet('S-136', 'عباية S-136 من سردة'),
    fabric: 'كريب ملكي',
    cuts: DEFAULT_CUT_OPTIONS,
    defaultCut: 'half-flare',
    closure: 'snap',
    closureLabel: 'طقطق',
    color: 'أسود',
    includesTarha: true,
    shortDescription: 'عباية مناسبات بخصم مميز.',
    description:
      'عباية مناسبات من سردة بقماش كريب ملكي وقصة راقية، بخصم مميز.',
    features: ['قماش كريب ملكي', 'قفلة طقطق', 'طرحة مجانية'],
    sizes: DEFAULT_SIZES,
    stockStatus: 'in-stock',
    isSoldOut: false,
    isOnSale: true,
    badges: ['sale', 'limited'],
    rating: 4.7,
    customizationAllowed: true,
    notesPlaceholder: 'اكتبي أي تعديل أو ملاحظة على الطلب هنا',
    tags: ['مناسبات', 'تخفيض'],
    seoTitle: 'عباية S-136 — سردة',
    seoDescription:
      'عباية S-136 من سردة بقماش كريب ملكي وقصة راقية، متاحة بخصم مميز.',
    createdAt: '2024-07-15',
  },

  /* ───────── S-135 ───────── */
  {
    id: 'abaya-s135',
    slug: 'abaya-s135',
    legacySlug: 'vXDpzVZ',
    code: 'S-135',
    name: 'عباية S-135',
    category: 'abayas',
    price: 229,
    oldPrice: 250,
    currency: 'SAR',
    images: buildAbayaImageSet('S-135', 'عباية S-135 من سردة'),
    fabric: 'كريب ملكي',
    cuts: DEFAULT_CUT_OPTIONS,
    defaultCut: 'quarter-flare',
    closure: 'snap',
    closureLabel: 'طقطق',
    color: 'أسود',
    includesTarha: true,
    shortDescription: 'عباية أساسية أنيقة بقصة راقية.',
    description:
      'عباية أساسية من تشكيلة سردة، قماش كريب ملكي وقصة راقية تليق بكل المواقف.',
    features: ['قماش كريب ملكي', 'قفلة طقطق', 'طرحة مجانية'],
    sizes: DEFAULT_SIZES,
    stockStatus: 'in-stock',
    isSoldOut: false,
    isOnSale: true,
    badges: ['sale'],
    rating: 4.7,
    customizationAllowed: true,
    notesPlaceholder: 'اكتبي أي تعديل أو ملاحظة على الطلب هنا',
    tags: ['كريب ملكي'],
    seoTitle: 'عباية S-135 — سردة',
    seoDescription: 'عباية S-135 من سردة بقماش كريب ملكي وقصة أنيقة.',
    createdAt: '2024-07-01',
  },

  /* ───────── S-127 ───────── */
  {
    id: 'abaya-s127',
    slug: 'abaya-s127',
    legacySlug: 'qQBEYxv',
    code: 'S-127',
    name: 'عباية S-127',
    subtitle: 'كريب ملكي + تفته أسود',
    category: 'occasions',
    secondaryCategories: ['abayas'],
    price: 245,
    oldPrice: 250,
    currency: 'SAR',
    images: buildAbayaImageSet(
      'S-127',
      'عباية S-127 بكريب ملكي وتفته من سردة',
    ),
    fabric: 'كريب ملكي + تفته أسود ساده',
    cuts: buildCutOptions(['quarter-flare']),
    defaultCut: 'quarter-flare',
    closure: 'snap',
    closureLabel: 'طقطق',
    color: 'أسود',
    includesTarha: true,
    shortDescription:
      'عباية بقصة ربع كلوش تمزج كريب ملكي مع تفته أسود سادة.',
    description:
      'عباية أنيقة من سردة بمزج كريب ملكي وتفته أسود ساده. قصة ربع كلوش وقفلة طقطق وطرحة مجانية.',
    features: [
      'قماش كريب ملكي + تفته',
      'قصة ربع كلوش',
      'قفلة طقطق',
      'طرحة مجانية',
    ],
    sizes: DEFAULT_SIZES,
    stockStatus: 'in-stock',
    isSoldOut: false,
    isOnSale: true,
    badges: ['sale'],
    rating: 4.8,
    customizationAllowed: true,
    notesPlaceholder: 'اكتبي أي تعديل أو ملاحظة على الطلب هنا',
    tags: ['كريب ملكي', 'تفته', 'ربع كلوش'],
    seoTitle: 'عباية S-127 — سردة',
    seoDescription:
      'عباية S-127 من سردة بكريب ملكي وتفته، بقصة ربع كلوش وطرحة مجانية.',
    createdAt: '2024-06-15',
  },

  /* ───────── S-122 ───────── */
  {
    id: 'abaya-s122',
    slug: 'abaya-s122',
    legacySlug: 'YgdBRyp',
    code: 'S-122',
    name: 'عباية S-122',
    category: 'abayas',
    price: 220,
    oldPrice: 260,
    currency: 'SAR',
    images: buildAbayaImageSet('S-122', 'عباية S-122 من سردة'),
    fabric: 'كريب ملكي',
    cuts: DEFAULT_CUT_OPTIONS,
    defaultCut: 'quarter-flare',
    closure: 'snap',
    closureLabel: 'طقطق',
    color: 'أسود',
    includesTarha: true,
    shortDescription: 'عباية كلاسيكية من تشكيلة سردة.',
    description: 'عباية كلاسيكية أنيقة من تشكيلة سردة بقماش كريب ملكي.',
    features: ['قماش كريب ملكي', 'قفلة طقطق', 'طرحة مجانية'],
    sizes: DEFAULT_SIZES,
    stockStatus: 'in-stock',
    isSoldOut: false,
    isOnSale: true,
    badges: ['sale'],
    rating: 4.6,
    customizationAllowed: true,
    notesPlaceholder: 'اكتبي أي تعديل أو ملاحظة على الطلب هنا',
    tags: ['كريب ملكي', 'كلاسيك'],
    seoTitle: 'عباية S-122 — سردة',
    seoDescription: 'عباية S-122 من سردة بقماش كريب ملكي وقصة كلاسيكية.',
    createdAt: '2024-05-20',
  },

  /* ───────── S-114 ───────── */
  {
    id: 'abaya-s114',
    slug: 'abaya-s114',
    legacySlug: 'BrdEyga',
    code: 'S-114',
    name: 'عباية S-114',
    category: 'abayas',
    price: 199,
    oldPrice: 200,
    currency: 'SAR',
    images: buildAbayaImageSet('S-114', 'عباية S-114 من سردة'),
    fabric: 'كريب ملكي',
    cuts: DEFAULT_CUT_OPTIONS,
    defaultCut: 'regular',
    closure: 'snap',
    closureLabel: 'طقطق',
    color: 'أسود',
    includesTarha: false,
    shortDescription: 'عباية كلاسيكية بسعر مميز.',
    description: 'عباية كلاسيكية من تشكيلة سردة بسعر مميز.',
    features: ['قماش كريب ملكي', 'قفلة طقطق'],
    sizes: SOLDOUT_SIZES,
    stockStatus: 'sold-out',
    isSoldOut: true,
    isOnSale: false,
    badges: ['soldout'],
    rating: 4.5,
    customizationAllowed: false,
    notesPlaceholder: 'اكتبي أي تعديل أو ملاحظة على الطلب هنا',
    tags: ['كريب ملكي'],
    seoTitle: 'عباية S-114 — سردة',
    seoDescription: 'عباية S-114 من سردة، نفدت الكمية.',
    createdAt: '2024-04-10',
  },

  /* ───────── S-164 ───────── */
  {
    id: 'abaya-s164',
    slug: 'abaya-s164',
    legacySlug: 'jgjbNxQ',
    code: 'S-164',
    name: 'عباية S-164',
    category: 'occasions',
    price: 195,
    oldPrice: 280,
    currency: 'SAR',
    images: buildAbayaImageSet('S-164', 'عباية S-164 من سردة'),
    fabric: 'كريب ملكي',
    cuts: DEFAULT_CUT_OPTIONS,
    defaultCut: 'half-flare',
    closure: 'snap',
    closureLabel: 'طقطق',
    color: 'أسود',
    includesTarha: true,
    shortDescription: 'عباية بخصم مميز وقصة راقية.',
    description: 'عباية مناسبات من سردة بقماش كريب ملكي وقصة راقية، بخصم مميز.',
    features: ['قماش كريب ملكي', 'قفلة طقطق', 'طرحة مجانية'],
    sizes: DEFAULT_SIZES,
    stockStatus: 'in-stock',
    isSoldOut: false,
    isOnSale: true,
    badges: ['sale'],
    rating: 4.7,
    customizationAllowed: true,
    notesPlaceholder: 'اكتبي أي تعديل أو ملاحظة على الطلب هنا',
    tags: ['مناسبات', 'تخفيض'],
    seoTitle: 'عباية S-164 — سردة',
    seoDescription: 'عباية S-164 من سردة بقماش كريب ملكي وقصة راقية.',
    isNew: true,
    createdAt: '2024-12-10',
  },

  /* ───────── N-330 — نقاب ───────── */
  {
    id: 'niqab-n330',
    slug: 'niqab-n330',
    legacySlug: 'onoGROb',
    code: 'N-330',
    name: 'نقاب N-330',
    category: 'niqab',
    price: 180,
    oldPrice: 209,
    currency: 'SAR',
    images: buildAbayaImageSet('N-330', 'نقاب N-330 من سردة'),
    fabric: 'قماش ناعم',
    cuts: buildCutOptions(['classic']),
    defaultCut: 'classic',
    closure: 'slip-on',
    closureLabel: 'بدون قفلة',
    color: 'أسود',
    includesTarha: false,
    shortDescription: 'نقاب أنيق بخامة ناعمة ومريحة.',
    description:
      'نقاب من سردة بخامة ناعمة ومريحة، يكمّل إطلالتك بحشمة وذوق.',
    features: ['خامة ناعمة', 'تصميم كلاسيكي', 'مريح'],
    sizes: [{ value: 0, label: 'مقاس واحد', available: true }],
    stockStatus: 'in-stock',
    isSoldOut: false,
    isOnSale: true,
    badges: ['sale'],
    rating: 4.6,
    customizationAllowed: false,
    notesPlaceholder: 'اكتبي أي ملاحظة على الطلب هنا',
    tags: ['نقاب', 'حشمة'],
    seoTitle: 'نقاب N-330 — سردة',
    seoDescription: 'نقاب N-330 من سردة بخامة ناعمة وتصميم أنيق.',
    createdAt: '2024-08-30',
  },
] as const;

/* ─────────────────────────────────────────────────────
   Helpers / queries
   ───────────────────────────────────────────────────── */

const PRODUCTS_BY_SLUG: Record<string, Product> = PRODUCTS.reduce(
  (acc, p) => {
    acc[p.slug] = p;
    return acc;
  },
  {} as Record<string, Product>,
);

const PRODUCTS_BY_CODE: Record<string, Product> = PRODUCTS.reduce(
  (acc, p) => {
    acc[p.code] = p;
    return acc;
  },
  {} as Record<string, Product>,
);

export function getAllProducts(): readonly Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | null {
  return PRODUCTS_BY_SLUG[slug] ?? null;
}

export function getProductByCode(code: string): Product | null {
  return PRODUCTS_BY_CODE[code] ?? null;
}

export function getProductsByCategory(category: CategorySlug): readonly Product[] {
  if (category === 'sale') {
    return PRODUCTS.filter((p) => p.isOnSale);
  }
  return PRODUCTS.filter(
    (p) =>
      p.category === category ||
      (p.secondaryCategories && p.secondaryCategories.includes(category)),
  );
}

export function getFeaturedProducts(limit = 8): readonly Product[] {
  return PRODUCTS.filter((p) => p.featured && !p.isSoldOut).slice(0, limit);
}

export function getNewArrivals(limit = 8): readonly Product[] {
  return PRODUCTS.filter((p) => p.isNew).slice(0, limit);
}

export function getOnSaleProducts(limit?: number): readonly Product[] {
  const filtered = PRODUCTS.filter((p) => p.isOnSale);
  return limit ? filtered.slice(0, limit) : filtered;
}

export function getRelatedProducts(
  product: Product,
  limit = 4,
): readonly Product[] {
  return PRODUCTS.filter(
    (p) =>
      p.id !== product.id &&
      (p.category === product.category ||
        (p.secondaryCategories && p.secondaryCategories.includes(product.category))),
  ).slice(0, limit);
}

/**
 * All slugs — for `generateStaticParams`.
 */
export const PRODUCT_SLUGS: readonly string[] = PRODUCTS.map((p) => p.slug);

/**
 * Sort products by chosen sort key.
 */
export function sortProducts(
  products: readonly Product[],
  sort: ProductSortOption,
): Product[] {
  const arr = [...products];
  switch (sort) {
    case 'price-asc':
      return arr.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return arr.sort((a, b) => b.price - a.price);
    case 'top-rated':
      return arr.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    case 'newest':
      return arr.sort((a, b) =>
        (b.createdAt ?? '').localeCompare(a.createdAt ?? ''),
      );
    case 'best-selling':
      return arr.sort(
        (a, b) =>
          (b.featured ? 1 : 0) - (a.featured ? 1 : 0) ||
          (b.rating ?? 0) - (a.rating ?? 0),
      );
    case 'recommended':
    default:
      return arr;
  }
}

/**
 * Filter products by user filters (price/fabric/cut/stock/sale).
 */
export function filterProducts(
  products: readonly Product[],
  filters: ProductFilterState,
): Product[] {
  return products.filter((p) => {
    if (filters.priceMin !== undefined && p.price < filters.priceMin) return false;
    if (filters.priceMax !== undefined && p.price > filters.priceMax) return false;
    if (filters.fabrics && filters.fabrics.length > 0) {
      const matches = filters.fabrics.some((f) =>
        p.fabric.toLowerCase().includes(f.toLowerCase()),
      );
      if (!matches) return false;
    }
    if (filters.cuts && filters.cuts.length > 0) {
      const productCutKeys = p.cuts.map((c) => c.cut);
      const matches = filters.cuts.some((c) => productCutKeys.includes(c));
      if (!matches) return false;
    }
    if (filters.inStockOnly && p.isSoldOut) return false;
    if (filters.onSaleOnly && !p.isOnSale) return false;
    return true;
  });
}

/**
 * Unique fabrics across the catalogue (for filter UI).
 */
export function getAllFabrics(): string[] {
  const set = new Set<string>();
  for (const p of PRODUCTS) {
    p.fabric
      .split(/[+,]/)
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((f) => set.add(f));
  }
  return Array.from(set);
}

/**
 * Min / max price across catalogue.
 */
export function getPriceBounds(): { min: number; max: number } {
  const prices = PRODUCTS.map((p) => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}
