import { useState, useCallback } from 'react';
import { ChevronDown, X, Filter, Check } from 'lucide-react';
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
    <div ref={dropdownRef} className={`relative ${isOpen ? 'z-50' : 'z-10'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center justify-between gap-3.5 px-5 sm:px-6 py-3 sm:py-3.5 min-w-[150px] sm:min-w-[175px] border text-xs sm:text-sm tracking-wider uppercase rounded-md transition-all duration-200 cursor-pointer select-none ${
          selected.length > 0
            ? 'bg-forest/5 text-forest border-forest font-semibold shadow-xs'
            : 'bg-white border-border-medium text-text-primary hover:border-forest hover:text-forest hover:shadow-xs shadow-2xs'
        } ${isOpen ? 'ring-2 ring-forest/20 border-forest' : ''}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="font-semibold truncate">{filter.name}</span>
        <div className="flex items-center gap-2 flex-shrink-0">
          {selected.length > 0 && (
            <span className="bg-forest text-white text-[11px] min-w-[20px] h-[20px] px-1.5 rounded-full flex items-center justify-center font-bold shadow-2xs">
              {selected.length}
            </span>
          )}
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-forest' : selected.length > 0 ? 'text-forest' : 'text-text-muted group-hover:text-forest'
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-border-light rounded-lg shadow-2xl z-50 min-w-[280px] sm:min-w-[320px] max-h-[380px] overflow-y-auto animate-scale-in p-2.5">
          <div className="px-3.5 py-2.5 border-b border-border-light/60 flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold tracking-wider uppercase text-text-muted">
              {filter.name}
            </span>
            {selected.length > 0 && (
              <span className="text-xs text-forest font-bold">
                {selected.length} selected
              </span>
            )}
          </div>
          <div className="space-y-1">
            {filter.options.map((option) => {
              const isChecked = selected.includes(option.value);
              return (
                <label
                  key={option.value}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-md cursor-pointer transition-all duration-150 ${
                    isChecked
                      ? 'bg-forest/5 text-forest font-semibold'
                      : 'hover:bg-bg-secondary text-text-primary'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onFilterChange(filter.id, option.value)}
                      className="filter-checkbox"
                    />
                    <span className="text-sm font-sans leading-normal">
                      {option.label}
                    </span>
                  </div>
                  {isChecked && (
                    <Check size={16} className="text-forest flex-shrink-0" />
                  )}
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
    <div className="flex items-center gap-3.5 sm:gap-4 flex-wrap">
      <div className="flex items-center gap-2.5 pr-2">
        <Filter size={17} className="text-forest flex-shrink-0" />
        <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-forest font-bold whitespace-nowrap">
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
          className="flex items-center gap-2 px-4 py-3 text-xs sm:text-sm uppercase tracking-wider text-discount hover:text-discount font-semibold border border-discount/30 hover:border-discount rounded-md hover:bg-discount/5 transition-all cursor-pointer shadow-2xs"
        >
          <X size={15} />
          Clear All ({totalActive})
        </button>
      )}
    </div>
  );
}
