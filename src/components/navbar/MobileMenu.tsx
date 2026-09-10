import { Link, useLocation } from 'react-router-dom';
import { X, Heart } from 'lucide-react';
import { mainNavigation } from '../../data/navigation';
import { useBodyScrollLock, useEscapeKey } from '../../hooks';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const location = useLocation();

  useBodyScrollLock(isOpen);
  useEscapeKey(onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      {/* Backdrop */}
      <div className="backdrop absolute inset-0" onClick={onClose} />

      {/* Drawer */}
      <aside
        className="absolute left-0 top-0 bottom-0 w-[300px] max-w-[85vw] bg-bg-cream animate-slide-in-left flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border-light">
          <span className="font-serif text-xl font-semibold text-forest tracking-wide">
            Menu
          </span>
          <button
            onClick={onClose}
            className="p-1 text-text-secondary hover:text-forest transition-colors"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4" aria-label="Mobile navigation">
          <ul className="flex flex-col">
            {mainNavigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className={`block px-6 py-3 text-sm tracking-wide transition-colors border-l-2 ${
                      isActive
                        ? 'text-forest border-forest bg-bg-secondary font-medium'
                        : 'text-text-secondary hover:text-forest border-transparent hover:border-forest-light hover:bg-bg-secondary/50'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Links */}
        <div className="border-t border-border-light px-6 py-5 space-y-3">
          <Link
            to="/wishlist"
            onClick={onClose}
            className="flex items-center gap-3 text-sm text-text-secondary hover:text-forest transition-colors"
          >
            <Heart size={18} />
            <span>Wishlist</span>
          </Link>
        </div>
      </aside>
    </div>
  );
}
