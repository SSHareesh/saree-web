import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Search as SearchIcon } from 'lucide-react';

interface EmptyStateProps {
  type: 'cart' | 'wishlist' | 'search' | 'filter' | 'products';
  title?: string;
  message?: string;
  searchQuery?: string;
}

export default function EmptyState({
  type,
  title,
  message,
  searchQuery,
}: EmptyStateProps) {
  const defaults = {
    cart: {
      icon: <ShoppingBag size={48} strokeWidth={1} />,
      title: 'Your Cart is Empty',
      message: 'Looks like you haven\'t added anything to your cart yet. Start exploring our beautiful collection.',
      cta: { label: 'Continue Shopping', href: '/collection/new-arrivals' },
    },
    wishlist: {
      icon: <Heart size={48} strokeWidth={1} />,
      title: 'Your Wishlist is Empty',
      message: 'Save your favourite pieces to your wishlist and come back to them anytime.',
      cta: { label: 'Explore Collections', href: '/collection/new-arrivals' },
    },
    search: {
      icon: <SearchIcon size={48} strokeWidth={1} />,
      title: searchQuery
        ? `No results for "${searchQuery}"`
        : 'No Results Found',
      message: 'Try searching with different keywords — product names, fabrics, colours, or product numbers.',
      cta: { label: 'View All Products', href: '/collection/new-arrivals' },
    },
    filter: {
      icon: <SearchIcon size={48} strokeWidth={1} />,
      title: 'No Products Match',
      message: 'Try adjusting your filters to find what you\'re looking for.',
      cta: null,
    },
    products: {
      icon: <ShoppingBag size={48} strokeWidth={1} />,
      title: 'No Products Available',
      message: 'Check back soon — we\'re constantly adding new pieces to our collection.',
      cta: { label: 'Go Home', href: '/' },
    },
  };

  const config = defaults[type];

  return (
    <div className="flex flex-col items-center justify-center py-24 sm:py-32 px-6 sm:px-10 text-center">
      <div className="text-text-light mb-6">{config.icon}</div>
      <h2 className="font-serif text-2xl text-text-primary mb-3">
        {title || config.title}
      </h2>
      <p className="text-text-secondary text-sm max-w-md mb-8 leading-relaxed">
        {message || config.message}
      </p>
      {config.cta && (
        <Link
          to={config.cta.href}
          className="btn-primary"
        >
          {config.cta.label}
        </Link>
      )}
    </div>
  );
}
