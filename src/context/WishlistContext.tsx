import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import type { Product } from '../types';

interface WishlistContextType {
  items: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  getWishlistProducts: (allProducts: Product[]) => Product[];
  clearWishlist: () => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

const WISHLIST_STORAGE_KEY = 'vasthram_wishlist';

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Silently fail
    }
  }, [items]);

  const toggleWishlist = (productId: string) => {
    setItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => items.includes(productId);

  const getWishlistProducts = (allProducts: Product[]) =>
    allProducts.filter((p) => items.includes(p.id));

  const clearWishlist = () => setItems([]);

  return (
    <WishlistContext.Provider
      value={{
        items,
        toggleWishlist,
        isWishlisted,
        getWishlistProducts,
        clearWishlist,
        count: items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextType {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
