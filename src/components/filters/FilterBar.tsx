import { useState, useCallback } from 'react';
import { ChevronDown, X } from 'lucide-react';
import type { FilterCategory, ActiveFilters } from '../../types';
import { useClickOutside } from '../../hooks';

interface FilterDropdownProps {
  filter: FilterCategory;
  activeFilters: ActiveFilters;
  onFilterChange: (filterId: string, value: string) => void;
}

function FilterDropdown({
  filter,
  activeFilters,
  onFilterChange,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = activeFilters[filter.id] || [];
  const close = useCallback(() => setIsOpen(false), []);
  const dropdownRef = useClickOutside<HTMLDivElement>(close);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 border text-xs tracking-wider uppercase rounded-md shadow-2xs transition-all ${
          selected.length > 0
            ? 'border-forest text-forest bg-forest/5 font-medium'
            : 'border-border-medium text-text-secondary hover:border-forest hover:text-forest bg-white/80'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {filter.name}
        {selected.length > 0 && (
          <span className="bg-forest text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
            {selected.length}
          </span>
        )}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 bg-white border border-border-light rounded-md shadow-lg z-30 min-w-[220px] max-h-[300px] overflow-y-auto animate-scale-in">
          <div className="py-2">
            {filter.options.map((option) => {
              const isChecked = selected.includes(option.value);
              return (
                <label
                  key={option.value}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-bg-secondary cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onFilterChange(filter.id, option.value)}
                    className="filter-checkbox"
                  />
                  <span className="text-sm text-text-primary">
                    {option.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// Desktop Filter Bar
// ============================================================

interface FilterBarProps {
  filters: FilterCategory[];
  activeFilters: ActiveFilters;
  onFilterChange: (filterId: string, value: string) => void;
  onClearAll: () => void;
  totalActive: number;
}

export default function FilterBar({
  filters,
  activeFilters,
  onFilterChange,
  onClearAll,
  totalActive,
}: FilterBarProps) {
  return (
    <div className="hidden lg:flex items-center gap-3 flex-wrap py-4">
      <div className="flex items-center gap-2 mr-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-text-secondary"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        <span className="text-xs tracking-wider uppercase text-text-secondary font-medium">
          Refined By
        </span>
      </div>

      {filters.map((filter) => (
        <FilterDropdown
          key={filter.id}
          filter={filter}
          activeFilters={activeFilters}
          onFilterChange={onFilterChange}
        />
      ))}

      {totalActive > 0 && (
        <button
          onClick={onClearAll}
          className="flex items-center gap-1.5 px-3 py-2 text-xs text-discount hover:text-discount/80 transition-colors"
        >
          <X size={14} />
          Clear All ({totalActive})
        </button>
      )}
    </div>
  );
}
