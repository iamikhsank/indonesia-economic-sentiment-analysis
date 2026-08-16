import React from 'react';
import { FilterState } from '../types';
import { HugeiconsIcon } from '@hugeicons/react';
import { PreferenceHorizontalIcon, Cancel01Icon } from '@hugeicons/core-free-icons';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  minYear: number;
  maxYear: number;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  setFilters,
  minYear,
  maxYear
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end font-body">
      <div className="w-full max-w-md bg-[var(--surface)] text-[var(--fg)] border-l border-[var(--border)] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 border-b border-[var(--border)] flex items-center justify-between bg-[var(--surface-alt)]">
          <div className="flex items-center gap-2">
            <span className="text-[var(--accent)]">
              <HugeiconsIcon icon={PreferenceHorizontalIcon} size={16} />
            </span>
            <h2 className="text-sm font-bold text-[var(--fg)] font-heading">Pengaturan Filter Analisis</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[var(--muted)] hover:text-[var(--fg)] hover:bg-[var(--border)] transition-colors cursor-pointer"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={16} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-6">
          {/* Benchmark Netral */}
          <div>
            <label className="block text-xs font-bold text-[var(--fg)] mb-1.5 font-heading uppercase tracking-wider">
              Benchmark Level Netral (Default = 100)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={filters.benchmark}
                onChange={(e) => setFilters(prev => ({ ...prev, benchmark: Number(e.target.value) || 100 }))}
                className="w-24 h-9 px-3 text-xs bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl font-mono font-bold text-[var(--fg)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
              <span className="text-xs text-[var(--muted)]">
                Garis ambang batas optimisme &amp; pesisme
              </span>
            </div>
          </div>

          {/* Year Range Inputs */}
          <div>
            <label className="block text-xs font-bold text-[var(--fg)] mb-1.5 font-heading uppercase tracking-wider">
              Rentang Tahun Observasi ({minYear} – {maxYear})
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] text-[var(--muted)] block mb-1">Tahun Awal</span>
                <input
                  type="number"
                  min={minYear}
                  max={filters.yearRange[1]}
                  value={filters.yearRange[0]}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    yearRange: [Number(e.target.value) || minYear, prev.yearRange[1]]
                  }))}
                  className="w-full h-9 px-3 text-xs bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl font-mono text-[var(--fg)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
              </div>
              <div>
                <span className="text-[10px] text-[var(--muted)] block mb-1">Tahun Akhir</span>
                <input
                  type="number"
                  min={filters.yearRange[0]}
                  max={maxYear}
                  value={filters.yearRange[1]}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    yearRange: [prev.yearRange[0], Number(e.target.value) || maxYear]
                  }))}
                  className="w-full h-9 px-3 text-xs bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl font-mono text-[var(--fg)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
              </div>
            </div>
          </div>

          {/* Direct Search */}
          <div>
            <label className="block text-xs font-bold text-[var(--fg)] mb-1.5 font-heading uppercase tracking-wider">
              Pencarian Spesifik Periode
            </label>
            <input
              type="text"
              placeholder="Contoh: 2017 Q3"
              value={filters.searchQuery}
              onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
              className="w-full h-9 px-3 text-xs bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl text-[var(--fg)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-[var(--border)] bg-[var(--surface-alt)] flex items-center justify-end gap-2 font-heading">
          <button
            onClick={onClose}
            className="w-full h-9 bg-[var(--accent)] text-white text-xs font-bold rounded-full hover:opacity-90 transition-all cursor-pointer shadow-xs"
          >
            Terapkan Filter
          </button>
        </div>
      </div>
    </div>
  );
};
