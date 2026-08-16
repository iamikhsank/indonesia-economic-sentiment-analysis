import React from 'react';
import { FilterState } from '../types';
import { HugeiconsIcon } from '@hugeicons/react';
import { RefreshIcon } from '@hugeicons/core-free-icons';

interface QuickSegmentsProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  minYear: number;
  maxYear: number;
}

export const QuickSegments: React.FC<QuickSegmentsProps> = ({
  filters,
  setFilters,
  minYear,
  maxYear
}) => {
  const yearPresets = [
    { label: 'Semua Periode', range: [minYear, maxYear] as [number, number] },
    { label: '2000 – 2005', range: [2000, 2005] as [number, number] },
    { label: '2006 – 2010', range: [2006, 2010] as [number, number] },
    { label: '2011 – 2015', range: [2011, 2015] as [number, number] },
    { label: '2016 – 2020', range: [2016, 2020] as [number, number] }
  ];

  const quarterOptions = ['Q1', 'Q2', 'Q3', 'Q4'];

  const handleYearPreset = (range: [number, number]) => {
    setFilters(prev => ({ ...prev, yearRange: range }));
  };

  const handleQuarterToggle = (q: string) => {
    setFilters(prev => {
      const exists = prev.selectedQuarters.includes(q);
      const updated = exists
        ? prev.selectedQuarters.filter(item => item !== q)
        : [...prev.selectedQuarters, q];
      return { ...prev, selectedQuarters: updated };
    });
  };

  const handleReset = () => {
    setFilters({
      yearRange: [minYear, maxYear],
      selectedQuarters: [],
      searchQuery: '',
      benchmark: 100
    });
  };

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-3.5 mb-6 flex flex-wrap items-center justify-between gap-3 shadow-xs font-body text-[var(--fg)]">
      {/* Year Presets */}
      <div className="flex flex-wrap items-center gap-1.5 font-heading">
        <span className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider mr-1">
          Periode:
        </span>
        {yearPresets.map((preset, idx) => {
          const isActive =
            filters.yearRange[0] === preset.range[0] && filters.yearRange[1] === preset.range[1];
          return (
            <button
              key={idx}
              onClick={() => handleYearPreset(preset.range)}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                isActive
                  ? 'bg-[var(--accent)] text-white shadow-xs'
                  : 'bg-[var(--surface-alt)] hover:bg-[var(--border)] text-[var(--fg-secondary)] border border-[var(--border)]'
              }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>

      {/* Quarter Filter & Reset */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 font-heading">
          <span className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider mr-1">
            Kuartal:
          </span>
          {quarterOptions.map(q => {
            const isSelected = filters.selectedQuarters.includes(q);
            return (
              <button
                key={q}
                onClick={() => handleQuarterToggle(q)}
                className={`w-7 h-7 text-xs font-semibold rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--success)] text-white shadow-xs'
                    : 'bg-[var(--surface-alt)] hover:bg-[var(--border)] text-[var(--fg-secondary)] border border-[var(--border)]'
                }`}
              >
                {q}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleReset}
          className="h-7 px-2.5 flex items-center gap-1 text-xs font-semibold text-[var(--muted)] hover:text-[var(--fg)] border border-[var(--border)] rounded-full hover:bg-[var(--surface-alt)] transition-all cursor-pointer"
          title="Reset Filter"
        >
          <HugeiconsIcon icon={RefreshIcon} size={12} />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};
