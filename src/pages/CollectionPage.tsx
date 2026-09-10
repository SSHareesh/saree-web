import { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
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

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28 py-6 sm:py-10">
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

        {/* Filter & Sort Controls */}
        <div className="border-y border-border-light my-6 sm:my-8 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Desktop Filters */}
            <FilterBar
              filters={filterCategories}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearAll={handleClearAll}
              totalActive={totalActive}
            />

            {/* Mobile Filter Button */}
            <button
              onClick={() => setFilterDrawerOpen(true)}
              className="lg:hidden btn-ghost !py-2.5 !px-4 text-xs tracking-wider rounded-md font-medium shadow-2xs"
              aria-label="Open filters"
            >
              <SlidersHorizontal size={14} />
              Filter
              {totalActive > 0 && (
                <span className="bg-forest text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalActive}
                </span>
              )}
            </button>

            {/* Sort */}
            <div className="py-2">
              <SortDropdown
                currentSort={currentSort}
                onSortChange={handleSortChange}
              />
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="py-12 sm:py-16 lg:py-24">
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
