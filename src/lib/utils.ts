import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes intelligently — handles conflicts.
 * @example cn('px-2 py-1', condition && 'bg-onyx', 'px-4') → 'py-1 bg-onyx px-4'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price with Arabic-friendly grouping.
 * Returns plain Latin numerals (universally readable).
 * @example formatPrice(1280) → '1,280'
 */
export function formatPrice(value: number): string {
  if (!Number.isFinite(value)) return '0';
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format price in SAR with currency symbol.
 * @example formatSAR(259) → '259 ر.س'
 */
export function formatSAR(value: number): string {
  return `${formatPrice(value)} ر.س`;
}

/**
 * Calculate discount percentage from old → new price.
 * @example discountPercent(400, 259) → 35
 */
export function discountPercent(oldPrice: number, currentPrice: number): number {
  if (!oldPrice || oldPrice <= currentPrice) return 0;
  return Math.round(((oldPrice - currentPrice) / oldPrice) * 100);
}

/**
 * Convert Arabic-Indic numerals to Latin numerals.
 * Useful for parsing prices scraped from Arabic sources.
 */
export function toLatinNumerals(input: string): string {
  const arabicIndic = '٠١٢٣٤٥٦٧٨٩';
  const easternArabic = '۰۱۲۳۴۵۶۷۸۹';
  return input
    .split('')
    .map((ch) => {
      const a = arabicIndic.indexOf(ch);
      if (a !== -1) return String(a);
      const e = easternArabic.indexOf(ch);
      if (e !== -1) return String(e);
      return ch;
    })
    .join('');
}

/**
 * Convert Latin numerals to Arabic-Indic numerals.
 * Used for traditional display in product cards.
 */
export function toArabicNumerals(input: string | number): string {
  const map = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(input).replace(/\d/g, (d) => map[Number(d)] ?? d);
}

/**
 * Slugify Arabic strings for URLs.
 * Falls back to removing diacritics and special characters.
 */
export function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, '') // Arabic diacritics
    .replace(/[^\w\u0621-\u064A\s-]/g, '') // keep Arabic letters
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Truncate text to max chars, append ellipsis.
 */
export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
}

/**
 * Sleep helper (for staggered effects/tests).
 */
export function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

/**
 * Build a WhatsApp click-to-chat URL with encoded message.
 * Phone must be international format without '+' (e.g., '966500000000').
 */
export function buildWhatsAppUrl(phone: string, message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

/**
 * Stagger-friendly delay generator for Framer Motion.
 */
export function stagger(index: number, base = 0.08): number {
  return index * base;
}

/**
 * Type-safe object key iteration.
 */
export function keysOf<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

/**
 * Clamp a number between min/max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Extract initials (Arabic-aware) for avatars.
 */
export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0);
  return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`;
}

/**
 * Site config helper.
 */
export const SITE = {
  name: 'عبايات سردة',
  shortName: 'سردة',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://sardah.com',
  tagline: 'فخامة التفاصيل وأناقة الحضور',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '966500000000',
  instagram: 'https://www.instagram.com/sardah.abaya/',
  tiktok: 'https://www.tiktok.com/@sardah.abaya',
  discountCode: 'sD1544',
} as const;
