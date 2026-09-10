import { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu } from 'lucide-react';
import { mainNavigation } from '../../data/navigation';
import { siteConfig } from '../../data/siteConfig';
import { useCart } from '../../context/CartContext';
import AnnouncementBar from './AnnouncementBar';
import MobileMenu from '../navbar/MobileMenu';
import SearchOverlay from '../search/SearchOverlay';
import CartDrawer from '../cart/CartDrawer';
import { useWishlist } from '../../context/WishlistContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { getItemCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const location = useLocation();
  const cartCount = getItemCount();

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  return (
    <>
      <AnnouncementBar />

      <header className="bg-bg-cream/95 backdrop-blur-sm border-b border-border-light sticky top-0 z-50">
        {/* Main Header Row */}
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20 gap-4">
            {/* Left: Mobile hamburger + Brand Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-forest hover:text-forest-light lg:hidden"
                aria-label="Open menu"
              >
                <Menu size={24} strokeWidth={1.5} />
              </button>

              <Link to="/" className="flex-shrink-0">
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-semibold text-forest tracking-[0.08em] whitespace-nowrap">
                  {siteConfig.brandName}
                </h1>
              </Link>
            </div>

            {/* Center: Full Modern Search Bar with typing placeholder (Desktop & Tablet) */}
            <div className="hidden sm:flex flex-1 max-w-md lg:max-w-xl mx-4 lg:mx-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const input = form.elements.namedItem('search') as HTMLInputElement;
                  if (input && input.value.trim()) {
                    window.location.href = `/search?q=${encodeURIComponent(input.value.trim())}`;
                  }
                }}
                className="relative w-full"
              >
                <Search
                  size={19}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-forest/60 pointer-events-none"
                  strokeWidth={1.75}
                />
                <input
                  name="search"
                  type="text"
                  placeholder="Search for silk sarees, bridal, kanjivaram, colors..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white/90 hover:bg-white focus:bg-white border border-border-medium focus:border-forest rounded-full outline-none transition-all placeholder:text-text-muted text-text-primary shadow-2xs focus:shadow-md"
                  onClick={() => setSearchOpen(true)}
                />
              </form>
            </div>

            {/* Right: Action icons - bigger size with generous gap */}
            <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 flex-shrink-0">
              {/* Mobile Search Icon button (only on smallest mobile) */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-forest hover:text-forest-light sm:hidden"
                aria-label="Search"
              >
                <Search size={23} strokeWidth={1.5} />
              </button>

              <Link
                to="/wishlist"
                className="p-2 text-forest hover:text-forest-light relative flex items-center justify-center transition-transform hover:scale-105"
                aria-label={`Wishlist${wishlistCount > 0 ? ` (${wishlistCount} items)` : ''}`}
              >
                <Heart size={24} strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-forest text-white text-[10px] font-semibold rounded-full flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setCartOpen(true)}
                className="p-2 text-forest hover:text-forest-light relative flex items-center justify-center transition-transform hover:scale-105"
                aria-label={`Cart${cartCount > 0 ? ` (${cartCount} items)` : ''}`}
              >
                <ShoppingBag size={24} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-forest text-white text-[10px] font-semibold rounded-full flex items-center justify-center shadow-xs animate-scale-in">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile full search bar row below header on phones */}
          <div className="sm:hidden pb-3 pt-1">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const input = form.elements.namedItem('searchMobile') as HTMLInputElement;
                if (input && input.value.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(input.value.trim())}`;
                }
              }}
              className="relative w-full"
            >
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-forest/60 pointer-events-none"
                strokeWidth={1.75}
              />
              <input
                name="searchMobile"
                type="text"
                placeholder="Search silk sarees, bridal, collections..."
                className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-border-medium focus:border-forest rounded-full outline-none placeholder:text-text-muted text-text-primary shadow-2xs"
                onClick={() => setSearchOpen(true)}
              />
            </form>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:block border-t border-border-light/60"
          aria-label="Main navigation"
        >
          <div className="max-w-[1400px] mx-auto px-8">
            <ul className="flex items-center justify-center gap-5 xl:gap-7 py-2.5 flex-wrap">
              {mainNavigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className={`nav-link text-[11px] tracking-[0.14em] uppercase font-medium py-1 ${
                        isActive
                          ? 'text-forest active'
                          : 'text-text-secondary hover:text-forest'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </header>

      {/* Overlays */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
      <SearchOverlay isOpen={searchOpen} onClose={closeSearch} />
      <CartDrawer isOpen={cartOpen} onClose={closeCart} />
    </>
  );
}
