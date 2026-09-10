/**
 * Format a number as Indian currency (₹)
 */
export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Calculate discount percentage
 */
export function calculateDiscount(price: number, originalPrice: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
