import { useState, useCallback } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import type { SortOption } from '../../types';
import { sortOptions } from '../../data/filters';
import { useClickOutside } from '../../hooks';

interface SortDropdownProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function SortDropdown({
  currentSort,
  onSortChange,
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);
  const ref = useClickOutside<HTMLDivElement>(close);

  const currentLabel =
    sortOptions.find((opt) => opt.value === currentSort)?.label || 'Featured';

  return (
    <div ref={ref} className={`relative ${isOpen ? 'z-50' : 'z-10'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center justify-between gap-3.5 px-5 sm:px-6 py-3 sm:py-3.5 min-w-[190px] sm:min-w-[220px] border rounded-md text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 cursor-pointer select-none ${
          isOpen
            ? 'border-forest ring-2 ring-forest/20 bg-white text-forest shadow-sm'
            : 'border-border-medium bg-white text-text-primary hover:border-forest hover:text-forest hover:shadow-xs shadow-2xs'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="font-semibold text-forest truncate">{currentLabel}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 flex-shrink-0 ${
            isOpen ? 'rotate-180 text-forest' : 'text-text-muted group-hover:text-forest'
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 bg-white border border-border-light rounded-lg shadow-2xl z-50 min-w-[240px] sm:min-w-[260px] animate-scale-in overflow-hidden p-2"
          role="listbox"
          aria-label="Sort options"
        >
          <div className="py-1 space-y-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value);
                  setIsOpen(false);
                }}
                role="option"
                aria-selected={currentSort === option.value}
                className={`w-full text-left px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-sans rounded-md transition-colors flex items-center justify-between cursor-pointer ${
                  currentSort === option.value
                    ? 'text-forest font-semibold bg-forest/5'
                    : 'text-text-secondary hover:text-forest hover:bg-bg-secondary'
                }`}
              >
                <span>{option.label}</span>
                {currentSort === option.value && (
                  <Check size={16} className="text-forest flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
