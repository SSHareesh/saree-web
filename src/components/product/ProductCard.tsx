import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import type { Product } from '../../types';
import { formatPrice } from '../../utils/currency';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import LazyImage from '../common/LazyImage';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem, isInCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToast } = useToast();

  const wishlisted = isWishlisted(product.id);
  const inCart = isInCart(product.id);
  const hasSecondImage = product.images.length > 1;
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    addToast(`${product.name} added to cart`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    addToast(
      wishlisted ? 'Removed from wishlist' : 'Added to wishlist',
      'info'
    );
  };

  return (
    <div
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.productNumber}`} className="block">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-bg-secondary mb-4 shadow-2xs group-hover:shadow-md transition-shadow duration-500">
          {/* Primary image */}
          <LazyImage
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 ease-out ${
              hasSecondImage && isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
            fallbackClassName="w-full h-full"
          />

          {/* Secondary image on hover */}
          {hasSecondImage && (
            <div
              className={`absolute inset-0 transition-all duration-700 ease-out ${
                isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            >
              <LazyImage
                src={product.images[1]}
                alt={`${product.name} - alternate view`}
                className="w-full h-full object-cover"
                fallbackClassName="w-full h-full"
              />
            </div>
          )}

          {/* Badges — stacked top-left */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.newArrival && (
              <span className="bg-forest text-white text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 font-medium rounded-xs shadow-xs">
                New
              </span>
            )}
            {hasDiscount && (
              <span className="bg-discount text-white text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 font-medium rounded-xs shadow-xs">
                -{product.discount}%
              </span>
            )}
            {product.availability === 'Limited Stock' && (
              <span className="bg-warm text-white text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 font-medium rounded-xs shadow-xs">
                Limited
              </span>
            )}
          </div>

          {/* Wishlist Button - bigger & modern */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-white/95 backdrop-blur-sm shadow-md hover:shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 z-10 ${
              isHovered || wishlisted
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-1 pointer-events-none sm:pointer-events-auto'
            }`}
            aria-label={
              wishlisted
                ? `Remove ${product.name} from wishlist`
                : `Add ${product.name} to wishlist`
            }
          >
            <Heart
              size={18}
              strokeWidth={1.75}
              className={
                wishlisted
                  ? 'fill-discount text-discount'
                  : 'text-forest hover:text-discount'
              }
            />
          </button>

          {/* Quick Add — bigger, modern pill button with elevation */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-3 sm:p-3.5 transition-all duration-300 z-10 ${
              isHovered
                ? 'opacity-100 translate-y-0'
                : 'opacity-90 sm:opacity-0 translate-y-0 sm:translate-y-3'
            }`}
          >
            <button
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-2.5 w-full h-11 sm:h-12 px-4 text-xs sm:text-[13px] tracking-[0.14em] uppercase font-semibold rounded-xl sm:rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98] ${
                inCart
                  ? 'bg-[#245C3F] text-white border border-white/20 ring-2 ring-white/30'
                  : 'bg-forest hover:bg-forest-light text-white'
              }`}
              aria-label={`Add ${product.name} to cart`}
            >
              {inCart ? (
                <>
                  <Check size={16} strokeWidth={2.5} className="text-accent-gold" />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={17} strokeWidth={1.75} />
                  <span>Quick Add</span>
                </>
              )}
            </button>
          </div>

          {/* Availability overlay if out of stock */}
          {product.availability === 'Out of Stock' && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-20">
              <span className="text-xs tracking-[0.2em] uppercase text-text-secondary font-medium bg-white px-4 py-2">
                Sold Out
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-1.5">
          <p className="text-[10px] text-text-muted tracking-[0.15em] uppercase font-medium">
            {product.productNumber} · {product.fabric}
          </p>
          <h3 className="text-[13px] text-text-primary leading-snug line-clamp-2 group-hover:text-forest transition-colors duration-300">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="text-[14px] font-semibold text-forest">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-[11px] text-text-light line-through">
                {formatPrice(product.originalPrice!)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
