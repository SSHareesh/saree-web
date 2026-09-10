import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProducts, getNewArrivals } from '../../data/products';
import ProductGrid from '../product/ProductGrid';
import { useScrollReveal } from '../../hooks';

export default function FeaturedProducts() {
  const { ref: ref1, isVisible: vis1 } = useScrollReveal<HTMLElement>();
  const { ref: ref2, isVisible: vis2 } = useScrollReveal<HTMLElement>();

  const featured = getFeaturedProducts().slice(0, 8);
  const newArrivals = getNewArrivals().slice(0, 4);

  return (
    <>
      {/* Featured Products */}
      <section ref={ref1} className="py-24 sm:py-32 lg:py-40 bg-bg-cream">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28">
          <div
            className={`transition-all duration-700 ${
              vis1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 lg:mb-20">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-px bg-warm" />
                  <p className="text-xs tracking-[0.3em] uppercase text-warm font-sans font-medium">
                    Handpicked for You
                  </p>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-forest">
                  Featured Sarees
                </h2>
              </div>
              <Link
                to="/collection/new-arrivals"
                className="btn-secondary hidden sm:inline-flex group text-xs !py-2.5 !px-5"
              >
                View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="mb-12 sm:mb-16 lg:mb-20">
              <ProductGrid products={featured} />
            </div>

            <div className="text-center sm:hidden">
              <Link
                to="/collection/new-arrivals"
                className="btn-primary w-full group"
              >
                View All Collections <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative divider between sections */}
      <div className="w-full border-t border-border-light/70" />

      {/* New Arrivals Band */}
      <section ref={ref2} className="py-24 sm:py-32 lg:py-40 bg-bg-secondary">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28">
          <div
            className={`transition-all duration-700 ${
              vis2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 lg:mb-20">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-px bg-warm" />
                  <p className="text-xs tracking-[0.3em] uppercase text-warm font-sans font-medium">
                    Just In
                  </p>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-forest">
                  New Arrivals
                </h2>
              </div>
              <Link
                to="/collection/new-arrivals"
                className="btn-secondary hidden sm:inline-flex group text-xs !py-2.5 !px-5"
              >
                View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="mb-12 sm:mb-16 lg:mb-20">
              <ProductGrid products={newArrivals} />
            </div>

            <div className="text-center sm:hidden">
              <Link
                to="/collection/new-arrivals"
                className="btn-primary w-full group"
              >
                Explore New Arrivals <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
