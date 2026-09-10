import { useWishlist } from '../context/WishlistContext';
import { allProducts } from '../data/products';
import Breadcrumb from '../components/common/Breadcrumb';
import ProductGrid from '../components/product/ProductGrid';
import EmptyState from '../components/common/EmptyState';

export default function WishlistPage() {
  const { getWishlistProducts, clearWishlist, count } = useWishlist();

  const wishlistProducts = getWishlistProducts(allProducts);

  return (
    <>
      <title>Wishlist — VASTHRAM</title>
      <meta name="description" content="Your saved favourite sarees." />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28 py-6 sm:py-10">
        <div className="mb-4 sm:mb-8">
          <Breadcrumb items={[{ label: 'Wishlist' }]} />
        </div>

        <div className="py-8 sm:py-12 lg:py-16">
          <div className="flex items-center justify-between mb-10 lg:mb-14">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-forest">
              Wishlist
              {count > 0 && (
                <span className="text-lg text-text-muted font-sans ml-3">
                  ({count})
                </span>
              )}
            </h1>
            {count > 0 && (
              <button
                onClick={clearWishlist}
                className="btn-ghost !py-2 !px-4 text-xs text-discount hover:text-discount font-medium"
              >
                Clear All
              </button>
            )}
          </div>

          {wishlistProducts.length > 0 ? (
            <ProductGrid products={wishlistProducts} />
          ) : (
            <EmptyState type="wishlist" />
          )}
        </div>
      </div>
    </>
  );
}
