import { useState } from 'react';
import { X } from 'lucide-react';
import type { FilterCategory, ActiveFilters } from '../../types';
import { useBodyScrollLock, useEscapeKey } from '../../hooks';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterCategory[];
  activeFilters: ActiveFilters;
  onFilterChange: (filterId: string, value: string) => void;
  onClearAll: () => void;
  totalActive: number;
}

export default function FilterDrawer({
  isOpen,
  onClose,
  filters,
  activeFilters,
  onFilterChange,
  onClearAll,
  totalActive,
}: FilterDrawerProps) {
  const [activeCategory, setActiveCategory] = useState(filters[0]?.id || '');

  useBodyScrollLock(isOpen);
  useEscapeKey(onClose);

  if (!isOpen) return null;

  const activeFilter = filters.find((f) => f.id === activeCategory);

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      {/* Backdrop */}
      <div className="backdrop absolute inset-0" onClick={onClose} />

      {/* Drawer */}
      <aside
        className="absolute left-0 top-0 bottom-0 w-[340px] max-w-[90vw] bg-bg-cream animate-slide-in-left flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Filter products"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border-light">
          <span className="font-serif text-xl text-forest">Filters</span>
          <button
            onClick={onClose}
            className="p-1 text-text-secondary hover:text-forest transition-colors"
            aria-label="Close filters"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content: 2-column layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Category List */}
          <div className="w-[130px] sm:w-[145px] flex-shrink-0 border-r border-border-light bg-bg-secondary overflow-y-auto">
            {filters.map((filter) => {
              const isActive = activeCategory === filter.id;
              const selectedCount =
                (activeFilters[filter.id] || []).length;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveCategory(filter.id)}
                  className={`w-full text-left px-4 py-4 text-xs sm:text-sm tracking-wider uppercase font-semibold transition-colors relative ${
                    isActive
                      ? 'text-forest bg-bg-cream'
                      : 'text-text-secondary hover:text-forest'
                  }`}
                >
                  {filter.name}
                  {selectedCount > 0 && (
                    <span className="absolute top-2.5 right-2 min-w-[20px] h-[20px] px-1 bg-accent-gold text-forest text-[11px] font-bold rounded-full flex items-center justify-center shadow-xs">
                      {selectedCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Options */}
          <div className="flex-1 overflow-y-auto py-3">
            {activeFilter &&
              activeFilter.options.map((option) => {
                const isChecked = (
                  activeFilters[activeFilter.id] || []
                ).includes(option.value);
                return (
                  <label
                    key={option.value}
                    className="flex items-center gap-3.5 px-5 sm:px-6 py-3.5 hover:bg-bg-secondary cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() =>
                        onFilterChange(activeFilter.id, option.value)
                      }
                      className="filter-checkbox"
                    />
                    <span className="text-sm sm:text-base text-text-primary">
                      {option.label}
                    </span>
                  </label>
                );
              })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border-light px-6 py-4 flex items-center gap-3 bg-bg-primary/50">
          {totalActive > 0 && (
            <button
              onClick={onClearAll}
              className="btn-secondary flex-1 !min-h-[46px] !py-2.5 text-xs font-semibold tracking-wider"
            >
              Clear All
            </button>
          )}
          <button
            onClick={onClose}
            className="btn-primary flex-1 !min-h-[46px] !py-2.5 text-xs font-semibold tracking-wider"
          >
            Apply {totalActive > 0 ? `(${totalActive})` : ''}
          </button>
        </div>
      </aside>
    </div>
  );
}
