import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Sun01Icon,
  Moon02Icon,
  Search01Icon,
  RefreshIcon,
  PreferenceHorizontalIcon,
  Calendar03Icon
} from '@hugeicons/core-free-icons';

interface HeaderProps {
  isGasProduction: boolean;
  isFilterDrawerOpen: boolean;
  setIsFilterDrawerOpen: (open: boolean) => void;
  onRefresh: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalRecords: number;
  activeTab: 'overview' | 'divergence' | 'statistics' | 'data_info';
  setActiveTab: (tab: 'overview' | 'divergence' | 'statistics' | 'data_info') => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isGasProduction,
  isFilterDrawerOpen,
  setIsFilterDrawerOpen,
  onRefresh,
  searchQuery,
  setSearchQuery,
  totalRecords,
  activeTab,
  setActiveTab,
  isDarkMode,
  onToggleDarkMode
}) => {
  return (
    <header className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-5 shadow-md shadow-slate-200/60 dark:shadow-black/60 font-body transition-all text-[var(--fg)]">
      
      {/* Top Row: Brand Badge, Title & Action Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Left Side: Official BPS Logo Image (Enlarged) + Title & Subtitle */}
        <div className="flex items-center space-x-4">
          <img
            src="https://www.bps.go.id/_next/image?url=%2Fassets%2Flogo-bps.png&w=3840&q=75"
            alt="Logo Badan Pusat Statistik (BPS)"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-contain bg-white p-1.5 border border-[var(--border)] shadow-md shrink-0 transition-all hover:scale-105"
          />

          <div className="flex flex-col border-l border-[var(--border)] pl-4">
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[var(--surface-alt)] text-[var(--fg)] border border-[var(--border)] font-mono">
                Badan Pusat Statistik (BPS)
              </span>
              <span className="text-xs font-mono text-[var(--muted)] font-semibold">2000 Q2 – 2020 Q1</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--fg)] mt-0.5 font-heading uppercase">
              INDONESIA ECONOMIC SENTIMENT ANALYSIS
            </h1>
            <p className="text-xs font-medium text-[var(--muted)] mt-0.5 leading-relaxed">
              Business &amp; Consumer Sentiment Dynamics (ITB &amp; ITK) | Analisis Komparatif Indeks Tendensi Bisnis vs Konsumen
            </p>
          </div>
        </div>

        {/* Right Side: Controls (Search, Refresh, Filter, Theme Toggle) */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          
          {/* Quick Search */}
          <div className="relative min-w-[180px] sm:w-52">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)] huge-icon">
              <HugeiconsIcon icon={Search01Icon} size={16} />
            </span>
            <input
              type="text"
              placeholder="Search Periode / Year..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--surface-alt)] border border-[var(--border)] text-xs text-[var(--fg)] placeholder-[var(--muted)] rounded-full pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all font-body"
            />
          </div>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-full bg-[var(--surface-alt)] hover:bg-[var(--border)] border border-[var(--border)] text-xs font-semibold text-[var(--fg)] transition-all shadow-2xs cursor-pointer font-heading"
            title="Refresh Data Engine"
          >
            <span className="huge-icon">
              <HugeiconsIcon icon={RefreshIcon} size={16} />
            </span>
            <span className="hidden sm:inline font-bold">Refresh</span>
          </button>

          {/* Filter Drawer Toggle Button */}
          <button
            onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
            className={`inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer font-heading ${
              isFilterDrawerOpen
                ? 'bg-[var(--accent)] text-white border border-[var(--accent)] shadow-xs'
                : 'bg-[var(--surface-alt)] hover:bg-[var(--border)] text-[var(--fg)] border border-[var(--border)] shadow-2xs'
            }`}
          >
            <span className="huge-icon">
              <HugeiconsIcon icon={PreferenceHorizontalIcon} size={16} />
            </span>
            <span className="hidden sm:inline font-bold">Filter</span>
          </button>

          {/* Theme Toggle Button (Sun / Moon) */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-full text-[var(--fg)] bg-[var(--surface-alt)] hover:bg-[var(--border)] border border-[var(--border)] transition-colors cursor-pointer"
            title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            <span className="huge-icon text-[var(--fg)]">
              {isDarkMode ? (
                <HugeiconsIcon icon={Sun01Icon} size={16} className="text-[var(--fg)]" />
              ) : (
                <HugeiconsIcon icon={Moon02Icon} size={16} className="text-[var(--fg)]" />
              )}
            </span>
          </button>

        </div>

      </div>

      {/* Navigation Tabs Pill Bar (Primary Header Navigation) */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-3 mt-3">
        
        <div className="flex flex-wrap items-center gap-1.5 font-heading">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[var(--accent)] text-white shadow-xs font-bold'
                : 'bg-[var(--surface-alt)] hover:bg-[var(--border)] text-[var(--fg-secondary)] border border-[var(--border)]'
            }`}
          >
            Executive Overview
          </button>

          <button
            onClick={() => setActiveTab('divergence')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'divergence'
                ? 'bg-[var(--accent)] text-white shadow-xs font-bold'
                : 'bg-[var(--surface-alt)] hover:bg-[var(--border)] text-[var(--fg-secondary)] border border-[var(--border)]'
            }`}
          >
            Sentiment Divergence
          </button>

          <button
            onClick={() => setActiveTab('statistics')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'statistics'
                ? 'bg-[var(--accent)] text-white shadow-xs font-bold'
                : 'bg-[var(--surface-alt)] hover:bg-[var(--border)] text-[var(--fg-secondary)] border border-[var(--border)]'
            }`}
          >
            Statistical Profile
          </button>

          <button
            onClick={() => setActiveTab('data_info')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'data_info'
                ? 'bg-[var(--accent)] text-white shadow-xs font-bold'
                : 'bg-[var(--surface-alt)] hover:bg-[var(--border)] text-[var(--fg-secondary)] border border-[var(--border)]'
            }`}
          >
            Master Data Info
          </button>
        </div>

        {/* Right Side Metadata Line */}
        <div className="flex flex-wrap items-center space-x-2 shrink-0 text-xs font-mono text-[var(--muted)]">
          <span className="flex items-center gap-1">
            <HugeiconsIcon icon={Calendar03Icon} size={15} className="text-[var(--muted)]" />
            <strong className="text-[var(--muted)] font-normal uppercase text-[10px] tracking-wider font-heading">Last Update:</strong>{' '}
            <strong className="text-[var(--fg)] font-bold tabular-nums">May 20, 2024</strong>
          </span>
          <span className="text-[var(--muted)] font-normal font-sans">|</span>
          <span>
            <strong className="text-[var(--muted)] font-normal">Sumber:</strong>{' '}
            <strong className="text-[var(--fg)] font-bold">Badan Pusat Statistik (BPS)</strong>
          </span>
        </div>

      </div>

    </header>
  );
};
