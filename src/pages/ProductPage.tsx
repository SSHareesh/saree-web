import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getProductById } from '../data/products';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import Breadcrumb from '../components/common/Breadcrumb';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import RelatedProducts from '../components/product/RelatedProducts';
import EmptyState from '../components/common/EmptyState';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { addViewed } = useRecentlyViewed();

  const product = id ? getProductById(id) : undefined;

  useEffect(() => {
    if (product) {
      addViewed(product.id);
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="site-container py-20">
        <EmptyState
          type="products"
          title="Product Not Found"
          message="The product you're looking for doesn't exist or may have been removed."
        />
      </div>
    );
  }

  return (
    <>
      <title>{product.name} — VASTHRAM</title>
      <meta name="description" content={product.description} />

      <div className="site-container py-8 sm:py-12 lg:py-16">
        {/* Breadcrumb */}
        <div className="mb-4 sm:mb-8">
          <Breadcrumb
            items={[
              {
                label: product.collection,
                href: `/collection/${product.collectionSlug}`,
              },
              { label: product.name },
            ]}
          />
        </div>

        {/* Product Content */}
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 py-8 sm:py-12 lg:py-16">
          {/* Gallery */}
          <ProductGallery product={product} />

          {/* Info */}
          <ProductInfo product={product} />
        </div>

        {/* Related Products */}
        <div className="mt-8 sm:mt-16">
          <RelatedProducts product={product} />
        </div>
      </div>
    </>
  );
}
