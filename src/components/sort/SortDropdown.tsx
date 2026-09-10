import { useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
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
    sortOptions.find((opt) => opt.value === currentSort)?.label || 'Sort';

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 border border-border-medium rounded-md shadow-2xs bg-white/80 text-xs tracking-wider uppercase text-text-secondary hover:border-forest hover:text-forest transition-all"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        Sort: {currentLabel}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full right-0 mt-1.5 bg-white border border-border-light rounded-md shadow-lg z-30 min-w-[200px] animate-scale-in overflow-hidden"
          role="listbox"
          aria-label="Sort options"
        >
          <div className="py-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value);
                  setIsOpen(false);
                }}
                role="option"
                aria-selected={currentSort === option.value}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  currentSort === option.value
                    ? 'text-forest font-medium bg-bg-secondary'
                    : 'text-text-secondary hover:text-forest hover:bg-bg-secondary/50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
