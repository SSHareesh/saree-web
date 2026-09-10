import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';
import { ToastProvider } from './context/ToastContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>
          <RecentlyViewedProvider>
            <App />
          </RecentlyViewedProvider>
        </WishlistProvider>
      </CartProvider>
    </ToastProvider>
  </StrictMode>
);
