import type { Product, ActiveFilters } from '../types';
import { priceRanges } from '../data/filters';

/**
 * Apply all active filters to a list of products.
 * Filters are composable — each filter type is applied sequentially.
 * Within a single filter category, selections are OR'd (any match).
 * Across categories, filters are AND'd (all must match).
 */
export function applyFilters(
  products: Product[],
  activeFilters: ActiveFilters
): Product[] {
  let filtered = [...products];

  for (const [filterKey, selectedValues] of Object.entries(activeFilters)) {
    if (!selectedValues || selectedValues.length === 0) continue;

    if (filterKey === 'priceRange') {
      filtered = filtered.filter((product) =>
        selectedValues.some((rangeStr) => {
          const [minStr, maxStr] = rangeStr.split('-');
          const min = Number(minStr);
          const max = maxStr === 'Infinity' ? Infinity : Number(maxStr);
          return product.price >= min && product.price <= max;
        })
      );
    } else if (filterKey === 'occasion') {
      filtered = filtered.filter((product) =>
        selectedValues.some((val) =>
          product.occasion.some(
            (occ) => occ.toLowerCase() === val.toLowerCase()
          )
        )
      );
    } else {
      filtered = filtered.filter((product) => {
        const productValue = product[filterKey as keyof Product];
        if (typeof productValue === 'string') {
          return selectedValues.some(
            (val) => val.toLowerCase() === productValue.toLowerCase()
          );
        }
        if (Array.isArray(productValue)) {
          return selectedValues.some((val) =>
            (productValue as string[]).some(
              (pv) => pv.toLowerCase() === val.toLowerCase()
            )
          );
        }
        return true;
      });
    }
  }

  return filtered;
}

/**
 * Get the count of products matching each filter option
 */
export function getFilterCounts(
  products: Product[],
  filterKey: string
): Record<string, number> {
  const counts: Record<string, number> = {};

  if (filterKey === 'priceRange') {
    for (const range of priceRanges) {
      const key = `${range.min}-${range.max}`;
      counts[key] = products.filter(
        (p) => p.price >= range.min && p.price <= range.max
      ).length;
    }
  } else if (filterKey === 'occasion') {
    for (const product of products) {
      for (const occ of product.occasion) {
        counts[occ] = (counts[occ] || 0) + 1;
      }
    }
  } else {
    for (const product of products) {
      const value = product[filterKey as keyof Product];
      if (typeof value === 'string') {
        counts[value] = (counts[value] || 0) + 1;
      } else if (Array.isArray(value)) {
        for (const v of value as string[]) {
          counts[v] = (counts[v] || 0) + 1;
        }
      }
    }
  }

  return counts;
}

/**
 * Count total active filter selections
 */
export function countActiveFilters(activeFilters: ActiveFilters): number {
  return Object.values(activeFilters).reduce(
    (total, values) => total + values.length,
    0
  );
}
