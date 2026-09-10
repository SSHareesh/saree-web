import type { CartItem, Product } from '../types';
import { siteConfig } from '../data/siteConfig';
import { formatPrice } from './currency';

/**
 * Generate a structured WhatsApp message for cart checkout
 */
export function generateCartWhatsAppMessage(
  items: CartItem[],
  subtotal: number
): string {
  const lines: string[] = [];

  lines.push('Hello, I would like to place an order.');
  lines.push('');
  lines.push('Order Details:');
  lines.push('');

  items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.product.name}`);
    lines.push(`   Product No: ${item.product.productNumber}`);
    lines.push(`   Quantity: ${item.quantity}`);
    lines.push(`   Price: ${formatPrice(item.product.price)}`);
    if (item.quantity > 1) {
      lines.push(
        `   Subtotal: ${formatPrice(item.product.price * item.quantity)}`
      );
    }
    lines.push('');
  });

  lines.push('-------------------------');
  lines.push(`Subtotal: ${formatPrice(subtotal)}`);
  lines.push('');
  lines.push('Please let me know the availability and next steps.');
  lines.push('');
  lines.push('Thank you.');

  return lines.join('\n');
}

/**
 * Generate a WhatsApp message for a single product (Buy Now)
 */
export function generateBuyNowMessage(
  product: Product,
  quantity: number = 1
): string {
  const lines: string[] = [];

  lines.push('Hello, I am interested in purchasing:');
  lines.push('');
  lines.push(`Product: ${product.name}`);
  lines.push(`Product No: ${product.productNumber}`);
  lines.push(`Price: ${formatPrice(product.price)}`);
  lines.push(`Quantity: ${quantity}`);
  if (quantity > 1) {
    lines.push(`Total: ${formatPrice(product.price * quantity)}`);
  }
  lines.push('');
  lines.push('Please let me know the availability and next steps.');

  return lines.join('\n');
}

/**
 * Open WhatsApp with a pre-filled message
 */
export function openWhatsApp(message: string): void {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodedMessage}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Open WhatsApp with cart checkout message
 */
export function checkoutViaWhatsApp(
  items: CartItem[],
  subtotal: number
): void {
  const message = generateCartWhatsAppMessage(items, subtotal);
  openWhatsApp(message);
}

/**
 * Open WhatsApp for a single product purchase
 */
export function buyNowViaWhatsApp(
  product: Product,
  quantity: number = 1
): void {
  const message = generateBuyNowMessage(product, quantity);
  openWhatsApp(message);
}
