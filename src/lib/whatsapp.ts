/**
 * WhatsApp checkout message builder — Mode A (manual order).
 * The cart is converted to a beautifully formatted Arabic message
 * that the customer sends straight to Sardah's WhatsApp number.
 */

import type { CartItem, CartTotals, CheckoutCustomer } from '@/types/cart';
import { buildWhatsAppUrl, formatSAR, SITE } from './utils';

export interface BuildCheckoutMessageInput {
  items: readonly CartItem[];
  totals: CartTotals;
  customer: CheckoutCustomer;
  discountCode?: string | null;
}

/**
 * Format a single line item as Arabic text.
 */
function formatItemLine(item: CartItem, index: number): string {
  const lines = [
    `${index + 1}. ${item.productName} (${item.productCode})`,
    `   • القصة: ${item.cutLabel}`,
    `   • المقاس: ${item.sizeLabel}`,
    `   • الكمية: ${item.quantity}`,
    `   • السعر: ${formatSAR(item.unitPrice * item.quantity)}`,
  ];
  if (item.includesTarha) {
    lines.push('   • الطرحة: مجانية');
  }
  if (item.note && item.note.trim().length > 0) {
    lines.push(`   • ملاحظة: ${item.note.trim()}`);
  }
  return lines.join('\n');
}

/**
 * Build the full Arabic WhatsApp checkout message.
 */
export function buildCheckoutMessage(
  input: BuildCheckoutMessageInput,
): string {
  const { items, totals, customer, discountCode } = input;

  const header = [
    'السلام عليكم 🤍',
    `أرغب بإتمام طلب من بوتيك ${SITE.name}.`,
    '',
    '🛍️ تفاصيل الطلب:',
  ].join('\n');

  const itemsBlock = items.map(formatItemLine).join('\n\n');

  const totalsBlock = [
    '',
    '💰 الإجمالي:',
    `   • المجموع: ${formatSAR(totals.subtotal)}`,
    totals.discount > 0
      ? `   • وفّرتي: ${formatSAR(totals.discount)}`
      : null,
    `   • الشحن: مجاني داخل المملكة`,
    `   • المبلغ النهائي: ${formatSAR(totals.grandTotal)}`,
    discountCode ? `   • كود الخصم: ${discountCode}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const customerBlock = [
    '',
    '👤 بياناتي:',
    `   • الاسم: ${customer.name}`,
    `   • المدينة: ${customer.city}`,
    `   • الجوال: ${customer.phone}`,
    customer.notes && customer.notes.trim().length > 0
      ? `   • ملاحظة عامة: ${customer.notes.trim()}`
      : null,
  ]
    .filter(Boolean)
    .join('\n');

  const footer = [
    '',
    'شكراً لكم 🌹',
  ].join('\n');

  return `${header}\n${itemsBlock}\n${totalsBlock}\n${customerBlock}${footer}`;
}

/**
 * Build the full WhatsApp click-to-chat URL ready to open.
 */
export function buildCheckoutUrl(input: BuildCheckoutMessageInput): string {
  const message = buildCheckoutMessage(input);
  return buildWhatsAppUrl(SITE.whatsapp, message);
}
