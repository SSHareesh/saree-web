import type { Product } from '../types';

/**
 * Search products across multiple fields
 */
export function searchProducts(
  products: Product[],
  query: string
): Product[] {
  if (!query || query.trim().length === 0) return [];

  const searchTerm = query.toLowerCase().trim();

  return products.filter((product) => {
    // Search across all relevant fields
    const searchableFields = [
      product.name,
      product.productNumber,
      product.collection,
      product.fabric,
      product.color,
      ...product.secondaryColors,
      product.design,
      product.style,
      product.description,
      product.category,
      ...product.tags,
      ...product.occasion,
    ];

    return searchableFields.some(
      (field) => field && field.toLowerCase().includes(searchTerm)
    );
  });
}

/**
 * Highlight matching text in a string
 */
export function highlightMatch(
  text: string,
  query: string
): { before: string; match: string; after: string } | null {
  if (!query) return null;

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);

  if (index === -1) return null;

  return {
    before: text.slice(0, index),
    match: text.slice(index, index + query.length),
    after: text.slice(index + query.length),
  };
}
