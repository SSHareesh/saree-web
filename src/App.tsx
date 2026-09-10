import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ToastContainer from './components/common/ToastContainer';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const CollectionPage = lazy(() => import('./pages/CollectionPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const SearchResultsPage = lazy(() => import('./pages/SearchResultsPage'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center py-40">
      <div className="w-6 h-6 border-2 border-border-medium border-t-forest rounded-full" style={{ animation: 'spin-slow 1s linear infinite' }} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/collection/:slug" element={<CollectionPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            {/* Fallback */}
            <Route
              path="*"
              element={
                <div className="site-container py-36 text-center">
                  <div>
                    <h1 className="font-serif text-4xl text-forest mb-4">
                      Page Not Found
                    </h1>
                    <p className="text-text-muted text-sm">
                      The page you're looking for doesn't exist.
                    </p>
                  </div>
                </div>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
