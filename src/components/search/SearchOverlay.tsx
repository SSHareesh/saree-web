import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import { useDebounce, useBodyScrollLock, useEscapeKey } from '../../hooks';
import { searchProducts } from '../../utils/search';
import { formatPrice } from '../../utils/currency';
import { allProducts } from '../../data/products';
import LazyImage from '../common/LazyImage';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 250);
  const inputRef = useRef<HTMLInputElement>(null);

  useBodyScrollLock(isOpen);
  useEscapeKey(onClose);

  const results = debouncedQuery.length >= 2
    ? searchProducts(allProducts, debouncedQuery)
    : [];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      {/* Backdrop */}
      <div className="backdrop absolute inset-0" onClick={onClose} />

      {/* Search Panel */}
      <div className="relative bg-bg-cream animate-slide-up max-h-[90vh] flex flex-col">
        {/* Search Input */}
        <div className="border-b border-border-light">
          <div className="max-w-[900px] mx-auto px-4 lg:px-8 py-6">
            <div className="flex items-center gap-4">
              <SearchIcon size={20} className="text-text-muted flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, product number, fabric, colour..."
                className="flex-1 bg-transparent text-lg text-text-primary placeholder:text-text-light outline-none font-sans"
                aria-label="Search products"
              />
              <button
                onClick={onClose}
                className="p-2 text-text-muted hover:text-forest transition-colors"
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[900px] mx-auto px-4 lg:px-8 py-6">
            {debouncedQuery.length >= 2 && results.length === 0 && (
              <div className="text-center py-12">
                <p className="text-text-muted text-sm mb-1">
                  No results found for "{debouncedQuery}"
                </p>
                <p className="text-text-light text-xs">
                  Try searching with different keywords
                </p>
              </div>
            )}

            {results.length > 0 && (
              <>
                <p className="text-xs text-text-muted uppercase tracking-wider mb-4">
                  {results.length} result{results.length !== 1 ? 's' : ''}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.slice(0, 9).map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.productNumber}`}
                      onClick={onClose}
                      className="flex gap-4 p-3 hover:bg-bg-secondary transition-colors group"
                    >
                      <div className="w-20 h-24 flex-shrink-0 bg-bg-secondary overflow-hidden">
                        <LazyImage
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                        <p className="text-xs text-text-muted tracking-wider mb-0.5">
                          {product.productNumber}
                        </p>
                        <p className="text-sm font-medium text-text-primary truncate group-hover:text-forest transition-colors">
                          {product.name}
                        </p>
                        <p className="text-sm text-forest font-medium mt-1">
                          {formatPrice(product.price)}
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-text-light line-through ml-2 text-xs">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                {results.length > 9 && (
                  <p className="text-center text-xs text-text-muted mt-4">
                    Showing 9 of {results.length} results
                  </p>
                )}
              </>
            )}

            {debouncedQuery.length < 2 && (
              <div className="text-center py-12">
                <p className="text-text-light text-sm">
                  Type at least 2 characters to search
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
