import { Link } from 'react-router-dom';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/currency';
import { checkoutViaWhatsApp } from '../../utils/whatsapp';
import { useBodyScrollLock, useEscapeKey } from '../../hooks';
import LazyImage from '../common/LazyImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const {
    items,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    getSubtotal,
    getItemCount,
  } = useCart();

  useBodyScrollLock(isOpen);
  useEscapeKey(onClose);

  const subtotal = getSubtotal();
  const itemCount = getItemCount();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <div className="backdrop absolute inset-0" onClick={onClose} />

      {/* Drawer */}
      <aside
        className="absolute right-0 top-0 bottom-0 w-[400px] max-w-[90vw] bg-bg-cream animate-slide-in-right flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border-light">
          <h2 className="font-serif text-xl text-forest">
            Cart{' '}
            {itemCount > 0 && (
              <span className="text-sm text-text-muted font-sans">
                ({itemCount})
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-text-secondary hover:text-forest transition-colors"
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <p className="text-text-muted text-sm mb-4">
              Your cart is empty
            </p>
            <button
              onClick={onClose}
              className="text-sm text-forest underline underline-offset-4 hover:text-forest-light transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 pb-4 border-b border-border-light last:border-0"
              >
                <Link
                  to={`/product/${item.product.productNumber}`}
                  onClick={onClose}
                  className="w-20 h-24 flex-shrink-0 bg-bg-secondary overflow-hidden"
                >
                  <LazyImage
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link
                    to={`/product/${item.product.productNumber}`}
                    onClick={onClose}
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

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-0 border border-border-medium rounded-sm overflow-hidden bg-bg-white shadow-2xs">
                      <button
                        onClick={() => decreaseQuantity(item.product.id)}
                        className="p-1.5 hover:bg-bg-secondary text-forest transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-3 text-xs font-semibold min-w-[32px] text-center text-forest">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.product.id)}
                        className="p-1.5 hover:bg-bg-secondary text-forest transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-1.5 text-text-muted hover:text-discount transition-colors"
                      aria-label={`Remove ${item.product.name}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border-light px-6 py-6 space-y-4 bg-bg-primary/50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Subtotal</span>
              <span className="text-xl font-serif font-semibold text-forest">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="text-xs text-text-muted">
              Shipping calculated at checkout
            </p>
            <div className="flex flex-col gap-2.5 pt-1">
              <button
                onClick={() => {
                  checkoutViaWhatsApp(items, subtotal);
                }}
                className="btn-whatsapp w-full !min-h-[48px] text-xs font-semibold tracking-wider"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Checkout via WhatsApp
              </button>
              <Link
                to="/cart"
                onClick={onClose}
                className="btn-secondary w-full !min-h-[44px] text-xs font-semibold tracking-wider text-center"
              >
                View Cart
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
