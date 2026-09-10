import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/currency';
import { checkoutViaWhatsApp } from '../utils/whatsapp';
import Breadcrumb from '../components/common/Breadcrumb';
import EmptyState from '../components/common/EmptyState';
import LazyImage from '../components/common/LazyImage';

export default function CartPage() {
  const {
    items,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getSubtotal,
  } = useCart();

  const subtotal = getSubtotal();

  return (
    <>
      <title>Cart — VASTHRAM</title>
      <meta name="description" content="Review your cart and checkout via WhatsApp." />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28 py-6 sm:py-10">
        <div className="mb-4 sm:mb-8">
          <Breadcrumb items={[{ label: 'Cart' }]} />
        </div>

        <div className="py-8 sm:py-12 lg:py-16">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-forest mb-10 lg:mb-14">
            Your Cart
          </h1>

          {items.length === 0 ? (
            <EmptyState type="cart" />
          ) : (
            <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                {/* Header row (desktop) */}
                <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_auto] gap-4 pb-4 border-b border-border-light text-xs tracking-wider uppercase text-text-muted">
                  <span>Product</span>
                  <span className="text-center">Quantity</span>
                  <span className="text-right">Subtotal</span>
                  <span className="w-8" />
                </div>

                <div className="divide-y divide-border-light">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="py-6 grid grid-cols-[auto_1fr] lg:grid-cols-[2fr_1fr_1fr_auto] gap-4 lg:gap-4 items-center"
                    >
                      {/* Product */}
                      <div className="flex gap-4 col-span-1 lg:col-span-1">
                        <Link
                          to={`/product/${item.product.productNumber}`}
                          className="w-20 h-24 lg:w-24 lg:h-28 flex-shrink-0 bg-bg-secondary rounded-md overflow-hidden shadow-2xs"
                        >
                          <LazyImage
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                        <div className="flex flex-col justify-center min-w-0">
                          <Link
                            to={`/product/${item.product.productNumber}`}
                            className="text-sm font-medium text-text-primary hover:text-forest transition-colors line-clamp-2"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-xs text-text-muted mt-0.5">
                            {item.product.productNumber}
                          </p>
                          <p className="text-sm text-forest font-medium mt-1">
                            {formatPrice(item.product.price)}
                          </p>
                        </div>
                      </div>

                      {/* Mobile: quantity + remove in one row */}
                      <div className="flex items-center justify-between lg:hidden col-span-2 mt-2">
                        <div className="flex items-center gap-0 border border-border-light">
                          <button
                            onClick={() =>
                              decreaseQuantity(item.product.id)
                            }
                            className="p-2 hover:bg-bg-secondary transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-4 text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              increaseQuantity(item.product.id)
                            }
                            className="p-2 hover:bg-bg-secondary transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-semibold text-forest">
                            {formatPrice(
                              item.product.price * item.quantity
                            )}
                          </span>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="p-1 text-text-muted hover:text-discount transition-colors"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Desktop: Quantity */}
                      <div className="hidden lg:flex items-center justify-center">
                        <div className="flex items-center gap-0 border border-border-medium rounded-sm overflow-hidden bg-bg-white shadow-2xs">
                          <button
                            onClick={() =>
                              decreaseQuantity(item.product.id)
                            }
                            className="p-2 hover:bg-bg-secondary text-forest transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-5 text-sm font-semibold min-w-[48px] text-center text-forest">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              increaseQuantity(item.product.id)
                            }
                            className="p-2 hover:bg-bg-secondary text-forest transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Desktop: Subtotal */}
                      <div className="hidden lg:block text-right">
                        <span className="text-base font-serif font-semibold text-forest">
                          {formatPrice(
                            item.product.price * item.quantity
                          )}
                        </span>
                      </div>

                      {/* Desktop: Remove */}
                      <div className="hidden lg:flex justify-end w-8">
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-2 text-text-muted hover:text-discount transition-colors rounded-full hover:bg-discount/10"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Actions */}
                <div className="flex items-center justify-between pt-8 border-t border-border-light">
                  <Link
                    to="/collection/new-arrivals"
                    className="btn-ghost !py-2.5 !px-5 text-xs tracking-wider rounded-md font-medium"
                  >
                    <ArrowLeft size={16} />
                    Continue Shopping
                  </Link>
                  <button
                    onClick={clearCart}
                    className="text-xs tracking-wider uppercase text-discount hover:text-discount/80 font-medium px-4 py-2 hover:bg-discount/5 rounded-md transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-28 bg-bg-secondary/70 rounded-lg border border-border-light shadow-xs p-6 lg:p-8">
                  <h2 className="font-serif text-2xl text-forest mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-3.5 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Subtotal</span>
                      <span className="text-text-primary font-semibold">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Shipping</span>
                      <span className="text-text-muted text-xs">
                        {subtotal >= 2500
                          ? 'Free'
                          : 'Calculated at checkout'}
                      </span>
                    </div>
                  </div>

                  <hr className="border-border-light mb-6" />

                  <div className="flex justify-between mb-8 items-baseline">
                    <span className="text-base font-medium text-text-primary">
                      Total
                    </span>
                    <span className="text-2xl font-serif font-bold text-forest">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <button
                    onClick={() => checkoutViaWhatsApp(items, subtotal)}
                    className="btn-whatsapp w-full !min-h-[52px] text-sm !font-semibold tracking-wider"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Checkout via WhatsApp
                  </button>

                  <p className="text-xs text-text-muted text-center mt-4 leading-relaxed">
                    Your order details will be sent to our WhatsApp for
                    processing.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
