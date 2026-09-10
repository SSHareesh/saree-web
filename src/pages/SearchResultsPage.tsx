import { useSearchParams } from 'react-router-dom';
import { searchProducts } from '../utils/search';
import { allProducts } from '../data/products';
import Breadcrumb from '../components/common/Breadcrumb';
import ProductGrid from '../components/product/ProductGrid';
import EmptyState from '../components/common/EmptyState';

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = query.length >= 2
    ? searchProducts(allProducts, query)
    : [];

  return (
    <>
      <title>Search: {query} — VASTHRAM</title>
      <meta name="description" content={`Search results for "${query}" at VASTHRAM.`} />

      <div className="site-container py-8 sm:py-12 lg:py-16">
        <div className="mb-4 sm:mb-8">
          <Breadcrumb items={[{ label: `Search: "${query}"` }]} />
        </div>

        <div className="py-12 sm:py-16 lg:py-24">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-forest mb-3">
              Search Results
            </h1>
            {query && (
              <p className="text-sm text-text-secondary">
                {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
              </p>
            )}
          </div>

          {results.length > 0 ? (
            <ProductGrid products={results} />
          ) : (
            <EmptyState type="search" searchQuery={query} />
          )}
        </div>
      </div>
    </>
  );
}
