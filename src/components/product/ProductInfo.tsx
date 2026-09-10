import { useState } from 'react';
import { Heart, Share2, Minus, Plus, ShoppingBag, Check } from 'lucide-react';
import type { Product } from '../../types';
import { formatPrice } from '../../utils/currency';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { buyNowViaWhatsApp } from '../../utils/whatsapp';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, isInCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToast } = useToast();

  const wishlisted = isWishlisted(product.id);
  const inCart = isInCart(product.id);
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;

  const handleAddToCart = () => {
    addItem(product, quantity);
    addToast(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    buyNowViaWhatsApp(product, quantity);
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} on VASTHRAM`,
          url,
        });
      } catch {
        // User cancelled sharing
      }
    } else {
      await navigator.clipboard.writeText(url);
      addToast('Link copied to clipboard', 'info');
    }
  };

  return (
    <div className="space-y-6">
      {/* Product Number & Collection */}
      <div>
        <p className="text-xs tracking-[0.2em] uppercase text-text-muted mb-2">
          {product.productNumber} · {product.collection}
        </p>
        <h1 className="font-serif text-2xl md:text-3xl text-forest leading-snug">
          {product.name}
        </h1>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-2xl font-serif font-semibold text-forest">
          {formatPrice(product.price)}
        </span>
        {hasDiscount && (
          <>
            <span className="text-lg text-text-light line-through">
              {formatPrice(product.originalPrice!)}
            </span>
            <span className="text-sm text-discount font-medium">
              {product.discount}% off
            </span>
          </>
        )}
      </div>

      {/* Availability */}
      <div className="flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full ${
            product.availability === 'In Stock'
              ? 'bg-success'
              : product.availability === 'Limited Stock'
              ? 'bg-warm'
              : 'bg-discount'
          }`}
        />
        <span className="text-sm text-text-secondary">
          {product.availability}
        </span>
      </div>

      <hr className="border-border-light" />

      {/* Description */}
      <p className="text-sm text-text-secondary leading-relaxed">
        {product.description}
      </p>

      {/* Key Attributes */}
      <div className="grid grid-cols-2 gap-y-3 gap-x-6">
        <div>
          <p className="text-xs text-text-muted uppercase tracking-wider mb-0.5">
            Fabric
          </p>
          <p className="text-sm text-text-primary">{product.fabric}</p>
        </div>
        <div>
          <p className="text-xs text-text-muted uppercase tracking-wider mb-0.5">
            Colour
          </p>
          <p className="text-sm text-text-primary">{product.color}</p>
        </div>
        <div>
          <p className="text-xs text-text-muted uppercase tracking-wider mb-0.5">
            Design
          </p>
          <p className="text-sm text-text-primary">{product.design}</p>
        </div>
        <div>
          <p className="text-xs text-text-muted uppercase tracking-wider mb-0.5">
            Style
          </p>
          <p className="text-sm text-text-primary">{product.style}</p>
        </div>
      </div>

      <hr className="border-border-light" />

      {/* Quantity */}
      <div>
        <p className="text-xs text-text-muted uppercase tracking-wider mb-3 font-medium">
          Quantity
        </p>
        <div className="flex items-center gap-0 border border-border-medium rounded-md w-fit bg-bg-white shadow-2xs overflow-hidden">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="quantity-btn"
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
          >
            <Minus size={14} />
          </button>
          <span className="px-5 text-sm font-semibold min-w-[48px] text-center text-forest">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="quantity-btn"
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3.5 pt-3">
        <button
          onClick={handleAddToCart}
          className="btn-primary w-full !min-h-[52px] text-sm !font-semibold tracking-wider"
        >
          {inCart ? (
            <>
              <Check size={18} /> Added to Cart
            </>
          ) : (
            <>
              <ShoppingBag size={18} /> Add to Cart
            </>
          )}
        </button>

        <button
          onClick={handleBuyNow}
          className="btn-whatsapp w-full !min-h-[52px] text-sm !font-semibold tracking-wider"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Buy Now on WhatsApp
        </button>
      </div>

      {/* Wishlist & Share */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={() => {
            toggleWishlist(product.id);
            addToast(
              wishlisted ? 'Removed from wishlist' : 'Added to wishlist',
              'info'
            );
          }}
          className="btn-ghost !py-2.5 !px-4 text-xs tracking-wider"
        >
          <Heart
            size={16}
            className={wishlisted ? 'fill-discount text-discount' : 'text-forest'}
          />
          {wishlisted ? 'In Wishlist' : 'Add to Wishlist'}
        </button>
        <button
          onClick={handleShare}
          className="btn-ghost !py-2.5 !px-4 text-xs tracking-wider"
        >
          <Share2 size={16} />
          Share
        </button>
      </div>

      <hr className="border-border-light" />

      {/* Specifications */}
      <div>
        <h3 className="text-xs tracking-[0.2em] uppercase text-text-muted mb-4">
          Specifications
        </h3>
        <div className="space-y-3">
          {product.details.sareeLength && (
            <div className="flex justify-between text-sm border-b border-border-light pb-2">
              <span className="text-text-muted">Saree Length</span>
              <span className="text-text-primary">
                {product.details.sareeLength}
              </span>
            </div>
          )}
          {product.details.blouseLength && (
            <div className="flex justify-between text-sm border-b border-border-light pb-2">
              <span className="text-text-muted">Blouse Length</span>
              <span className="text-text-primary">
                {product.details.blouseLength}
              </span>
            </div>
          )}
          <div className="flex justify-between text-sm border-b border-border-light pb-2">
            <span className="text-text-muted">Blouse Included</span>
            <span className="text-text-primary">
              {product.details.blouseIncluded ? 'Yes' : 'No'}
            </span>
          </div>
          {product.details.work && (
            <div className="flex justify-between text-sm border-b border-border-light pb-2">
              <span className="text-text-muted">Work</span>
              <span className="text-text-primary">
                {product.details.work}
              </span>
            </div>
          )}
          {product.details.border && (
            <div className="flex justify-between text-sm border-b border-border-light pb-2">
              <span className="text-text-muted">Border</span>
              <span className="text-text-primary">
                {product.details.border}
              </span>
            </div>
          )}
          {product.details.weave && (
            <div className="flex justify-between text-sm border-b border-border-light pb-2">
              <span className="text-text-muted">Weave</span>
              <span className="text-text-primary">
                {product.details.weave}
              </span>
            </div>
          )}
          {product.details.weight && (
            <div className="flex justify-between text-sm border-b border-border-light pb-2">
              <span className="text-text-muted">Weight</span>
              <span className="text-text-primary">
                {product.details.weight}
              </span>
            </div>
          )}
          {product.details.careInstructions && (
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Care</span>
              <span className="text-text-primary text-right max-w-[200px]">
                {product.details.careInstructions}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Occasion Tags */}
      {product.occasion.length > 0 && (
        <div>
          <h3 className="text-xs tracking-[0.2em] uppercase text-text-muted mb-3">
            Perfect For
          </h3>
          <div className="flex flex-wrap gap-2">
            {product.occasion.map((occ) => (
              <span
                key={occ}
                className="px-3 py-1.5 border border-border-light text-xs text-text-secondary tracking-wider uppercase"
              >
                {occ}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
