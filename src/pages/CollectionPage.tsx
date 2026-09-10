import { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import { getProductsByCollection } from '../data/products';
import { getCollectionBySlug } from '../data/collections';
import { filterCategories } from '../data/filters';
import { applyFilters, countActiveFilters } from '../utils/filtering';
import { sortProducts } from '../utils/sorting';
import type { ActiveFilters, SortOption } from '../types';
import Breadcrumb from '../components/common/Breadcrumb';
import ProductGrid from '../components/product/ProductGrid';
import FilterBar from '../components/filters/FilterBar';
import FilterDrawer from '../components/filters/FilterDrawer';
import SortDropdown from '../components/sort/SortDropdown';
import EmptyState from '../components/common/EmptyState';

export default function CollectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Derive active filters from URL
  const activeFilters: ActiveFilters = useMemo(() => {
    const filters: ActiveFilters = {};
    filterCategories.forEach((fc) => {
      const param = searchParams.get(fc.id);
      if (param) {
        filters[fc.id] = param.split(',');
      }
    });
    return filters;
  }, [searchParams]);

  const currentSort = (searchParams.get('sort') as SortOption) || 'featured';

  const collection = slug ? getCollectionBySlug(slug) : undefined;
  const allCollectionProducts = slug ? getProductsByCollection(slug) : [];

  // Apply filters and sort
  const filteredProducts = useMemo(
    () => applyFilters(allCollectionProducts, activeFilters),
    [allCollectionProducts, activeFilters]
  );

  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, currentSort),
    [filteredProducts, currentSort]
  );

  const totalActive = countActiveFilters(activeFilters);

  const handleFilterChange = (filterId: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    const current = newParams.get(filterId);
    const values = current ? current.split(',') : [];

    if (values.includes(value)) {
      const updated = values.filter((v) => v !== value);
      if (updated.length === 0) {
        newParams.delete(filterId);
      } else {
        newParams.set(filterId, updated.join(','));
      }
    } else {
      values.push(value);
      newParams.set(filterId, values.join(','));
    }

    setSearchParams(newParams, { replace: true });
  };

  const handleClearAll = () => {
    const newParams = new URLSearchParams();
    const sort = searchParams.get('sort');
    if (sort) newParams.set('sort', sort);
    setSearchParams(newParams, { replace: true });
  };

  const handleSortChange = (sort: SortOption) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', sort);
    setSearchParams(newParams, { replace: true });
  };

  const collectionName = collection?.name || slug?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Products';
  const collectionDescription = collection?.description || '';

  return (
    <>
      <title>{collectionName} — VASTHRAM</title>
      <meta
        name="description"
        content={
          collectionDescription ||
          `Shop ${collectionName} at VASTHRAM. Premium handcrafted sarees.`
        }
      />

      <div className="site-container py-8 sm:py-12 lg:py-16">
        {/* Breadcrumb */}
        <div className="mb-4 sm:mb-8">
          <Breadcrumb items={[{ label: collectionName }]} />
        </div>

        {/* Collection Header */}
        <div className="text-center py-14 sm:py-18 lg:py-24 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-12 h-px bg-border-medium" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-warm font-medium">Collection</span>
            <div className="w-12 h-px bg-border-medium" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-forest tracking-wide mb-5">
            {collectionName}
          </h1>
          {collectionDescription && (
            <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
              {collectionDescription}
            </p>
          )}
          <p className="text-xs text-text-muted mt-5 tracking-[0.18em] uppercase font-medium">
            {sortedProducts.length} product
            {sortedProducts.length !== 1 ? 's' : ''} available
          </p>
        </div>

        {/* Filter & Sort Controls (Matches Reference Image) */}
        <div className="relative z-30 pt-6 pb-6 sm:pt-8 sm:pb-8">
          {/* Top Row: Refined By + Filter Pills */}
          <div className="flex items-center justify-between gap-4">
            {/* Desktop Filters */}
            <div className="hidden lg:block w-full">
              <FilterBar
                filters={filterCategories}
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearAll}
                totalActive={totalActive}
              />
            </div>

            {/* Mobile / Tablet Filter Button */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={() => setFilterDrawerOpen(true)}
                className="flex items-center gap-3 px-5 py-3.5 bg-white border border-border-medium rounded-md text-xs sm:text-sm font-bold tracking-wider uppercase text-forest hover:border-forest hover:shadow-xs shadow-2xs transition-all cursor-pointer select-none"
                aria-label="Open filters"
              >
                <Filter size={17} className="text-forest" />
                <span>Refined By</span>
                {totalActive > 0 && (
                  <span className="bg-forest text-white text-[11px] min-w-[20px] h-[20px] px-1.5 rounded-full flex items-center justify-center font-bold">
                    {totalActive}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Active Filter Chips */}
          {totalActive > 0 && (
            <div className="flex items-center gap-2 flex-wrap pt-4 mt-2">
              <span className="text-xs text-text-muted uppercase tracking-wider font-semibold mr-1">
                Active:
              </span>
              {Object.entries(activeFilters).flatMap(([catId, values]) =>
                values.map((val) => {
                  const cat = filterCategories.find((c) => c.id === catId);
                  const opt = cat?.options.find((o) => o.value === val);
                  return (
                    <span
                      key={`${catId}-${val}`}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white text-forest border border-border-medium rounded-md text-xs font-semibold shadow-2xs"
                    >
                      <span>{opt?.label || val}</span>
                      <button
                        type="button"
                        onClick={() => handleFilterChange(catId, val)}
                        className="text-forest/60 hover:text-discount cursor-pointer transition-colors"
                        aria-label={`Remove ${opt?.label || val} filter`}
                      >
                        <X size={13} />
                      </button>
                    </span>
                  );
                })
              )}
              <button
                type="button"
                onClick={handleClearAll}
                className="text-xs text-discount hover:underline font-semibold ml-2 cursor-pointer transition-colors"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Full-width Divider Line (as seen in reference image) */}
          <div className="w-full border-t border-border-light my-8 pt-4 sm:my-10" />

          {/* Sub-bar: Product Count on left, SORT BY on right (exactly as in reference image) */}
          <div className="flex items-center justify-between gap-4 py-2">
            <span className="text-xs sm:text-sm tracking-wider uppercase text-text-muted font-medium">
              {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''} available
            </span>

            <div className="flex items-center gap-3.5">
              <span className="text-xs sm:text-sm tracking-wider uppercase text-text-secondary font-semibold whitespace-nowrap">
                Sort By
              </span>
              <SortDropdown
                currentSort={currentSort}
                onSortChange={handleSortChange}
              />
            </div>
          </div>
        </div>

        {/* Generous Space Between Filters/Sort and Products Grid (Guaranteed uncollapsible top and bottom padding) */}
        <div className="relative z-10 pt-12 sm:pt-16 lg:pt-20 pb-24 sm:pb-32 lg:pb-40">
          {sortedProducts.length > 0 ? (
            <ProductGrid products={sortedProducts} />
          ) : allCollectionProducts.length > 0 ? (
            <EmptyState type="filter" />
          ) : (
            <EmptyState type="products" />
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <FilterDrawer
        isOpen={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        filters={filterCategories}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearAll}
        totalActive={totalActive}
      />
    </>
  );
}
