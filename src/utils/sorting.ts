import type { Product, SortOption } from '../types';

/**
 * Sort products by the given sort option
 */
export function sortProducts(
  products: Product[],
  sortBy: SortOption
): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'featured':
      sorted.sort((a, b) => {
        if (a.featured === b.featured) return 0;
        return a.featured ? -1 : 1;
      });
      break;

    case 'newest':
      sorted.sort(
        (a, b) =>
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      );
      break;

    case 'price-low':
      sorted.sort((a, b) => a.price - b.price);
      break;

    case 'price-high':
      sorted.sort((a, b) => b.price - a.price);
      break;

    case 'name-az':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case 'most-ordered':
      sorted.sort((a, b) => {
        if (a.mostOrdered === b.mostOrdered) return 0;
        return a.mostOrdered ? -1 : 1;
      });
      break;

    default:
      break;
  }

  return sorted;
}
