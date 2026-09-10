import type { Product } from '../../types';
import { getRelatedProducts } from '../../data/products';
import ProductGrid from './ProductGrid';
import { useScrollReveal } from '../../hooks';

interface RelatedProductsProps {
  product: Product;
}

export default function RelatedProducts({ product }: RelatedProductsProps) {
  const related = getRelatedProducts(product, 4);
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  if (related.length === 0) return null;

  return (
    <section ref={ref} className="py-20 sm:py-24 lg:py-32 border-t border-border-light">
      <div
        className={`transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-forest mb-12 lg:mb-16 text-center">
          You May Also Like
        </h2>
        <ProductGrid products={related} />
      </div>
    </section>
  );
}
