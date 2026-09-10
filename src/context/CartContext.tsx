import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from 'react';
import type { CartItem, Product } from '../types';

// ============================================================
// Types
// ============================================================

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; quantity?: number }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'INCREASE_QUANTITY'; productId: string }
  | { type: 'DECREASE_QUANTITY'; productId: string }
  | { type: 'SET_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; items: CartItem[] };

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  isInCart: (productId: string) => boolean;
}

// ============================================================
// Reducer
// ============================================================

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === action.product.id
      );
      if (existingIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity:
            newItems[existingIndex].quantity + (action.quantity || 1),
        };
        return { items: newItems };
      }
      return {
        items: [
          ...state.items,
          { product: action.product, quantity: action.quantity || 1 },
        ],
      };
    }

    case 'REMOVE_ITEM':
      return {
        items: state.items.filter(
          (item) => item.product.id !== action.productId
        ),
      };

    case 'INCREASE_QUANTITY': {
      const newItems = state.items.map((item) =>
        item.product.id === action.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return { items: newItems };
    }

    case 'DECREASE_QUANTITY': {
      const newItems = state.items
        .map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
      return { items: newItems };
    }

    case 'SET_QUANTITY': {
      if (action.quantity <= 0) {
        return {
          items: state.items.filter(
            (item) => item.product.id !== action.productId
          ),
        };
      }
      const newItems = state.items.map((item) =>
        item.product.id === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      );
      return { items: newItems };
    }

    case 'CLEAR_CART':
      return { items: [] };

    case 'LOAD_CART':
      return { items: action.items };

    default:
      return state;
  }
}

// ============================================================
// Context
// ============================================================

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'vasthram_cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const items = JSON.parse(stored) as CartItem[];
        dispatch({ type: 'LOAD_CART', items });
      }
    } catch {
      // Silently fail if localStorage is unavailable
    }
  }, []);

  // Save cart to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Silently fail
    }
  }, [state.items]);

  const addItem = (product: Product, quantity?: number) =>
    dispatch({ type: 'ADD_ITEM', product, quantity });

  const removeItem = (productId: string) =>
    dispatch({ type: 'REMOVE_ITEM', productId });

  const increaseQuantity = (productId: string) =>
    dispatch({ type: 'INCREASE_QUANTITY', productId });

  const decreaseQuantity = (productId: string) =>
    dispatch({ type: 'DECREASE_QUANTITY', productId });

  const setQuantity = (productId: string, quantity: number) =>
    dispatch({ type: 'SET_QUANTITY', productId, quantity });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const getItemCount = () =>
    state.items.reduce((total, item) => total + item.quantity, 0);

  const getSubtotal = () =>
    state.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

  const isInCart = (productId: string) =>
    state.items.some((item) => item.product.id === productId);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        setQuantity,
        clearCart,
        getItemCount,
        getSubtotal,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
