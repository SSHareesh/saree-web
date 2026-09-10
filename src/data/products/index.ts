import type { Product } from '../../types';
import { getMockSareeImages } from '../mockImages';

import { silkSarees } from './silkSarees';
import { cottonSarees } from './cottonSarees';
import { silkCotton } from './silkCotton';
import { halfPureSarees } from './halfPureSarees';
import { everydaySarees } from './everydaySarees';

// ============================================================
// Aggregated Product Data with Mock Images
// ============================================================

const rawProducts: Product[] = [
  ...silkSarees,
  ...cottonSarees,
  ...silkCotton,
  ...halfPureSarees,
  ...everydaySarees,
];

export const allProducts: Product[] = rawProducts.map((product, index) => ({
  ...product,
  images: getMockSareeImages(index, 3),
}));

// ============================================================
// Product Helpers
// ============================================================

export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id || p.productNumber === id);
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  // Special virtual collections
  if (collectionSlug === 'new-arrivals') {
    return allProducts.filter((p) => p.newArrival);
  }
  if (collectionSlug === 'most-ordered') {
    return allProducts.filter((p) => p.mostOrdered);
  }
  return allProducts.filter((p) => p.collectionSlug === collectionSlug);
}

export function getFeaturedProducts(): Product[] {
  return allProducts.filter((p) => p.featured);
}

export function getNewArrivals(): Product[] {
  return allProducts.filter((p) => p.newArrival);
}

export function getMostOrdered(): Product[] {
  return allProducts.filter((p) => p.mostOrdered);
}

export function getRelatedProducts(product: Product, limit: number = 4): Product[] {
  const related = allProducts.filter(
    (p) =>
      p.id !== product.id &&
      (p.collectionSlug === product.collectionSlug ||
        p.fabric === product.fabric ||
        p.style === product.style ||
        p.tags.some((tag) => product.tags.includes(tag)))
  );

  // Sort by relevance: same collection first, then fabric, then style
  related.sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;
    if (a.collectionSlug === product.collectionSlug) scoreA += 3;
    if (b.collectionSlug === product.collectionSlug) scoreB += 3;
    if (a.fabric === product.fabric) scoreA += 2;
    if (b.fabric === product.fabric) scoreB += 2;
    if (a.style === product.style) scoreA += 1;
    if (b.style === product.style) scoreB += 1;
    return scoreB - scoreA;
  });

  return related.slice(0, limit);
}

// Re-export individual collections for direct access
export { silkSarees, cottonSarees, silkCotton, halfPureSarees, everydaySarees };
