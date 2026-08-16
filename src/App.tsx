import React, { useState, useEffect, useMemo } from 'react';
import { SentimentRecord, KPIMetrics, FilterState } from './types';
import { fetchSentimentRecords, fetchSentimentAnalytics, IS_GAS_PRODUCTION } from './api/gasClient';
import { Header } from './components/Header';
import { KPICards } from './components/KPICards';
import { QuickSegments } from './components/QuickSegments';
import { FilterDrawer } from './components/FilterDrawer';
import { ChartsGrid } from './components/ChartsGrid';

export function App() {
  const [rawRecords, setRawRecords] = useState<SentimentRecord[]>([]);
  const [serverMetrics, setServerMetrics] = useState<KPIMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'overview' | 'divergence' | 'statistics' | 'data_info'>('overview');

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bps-sentiment-theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('bps-sentiment-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const [filters, setFilters] = useState<FilterState>({
    yearRange: [2000, 2020],
    selectedQuarters: [],
    searchQuery: '',
    benchmark: 100
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const records = await fetchSentimentRecords();
      setRawRecords(records);
      const metrics = await fetchSentimentAnalytics();
      setServerMetrics(metrics);
    } catch (err) {
      console.error('[ERROR] Data loading failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const minYear = useMemo(() => {
    if (rawRecords.length === 0) return 2000;
    return Math.min(...rawRecords.map(r => r.Tahun));
  }, [rawRecords]);

  const maxYear = useMemo(() => {
    if (rawRecords.length === 0) return 2020;
    return Math.max(...rawRecords.map(r => r.Tahun));
  }, [rawRecords]);

  const filteredRecords = useMemo(() => {
    return rawRecords.filter(r => {
      if (r.Tahun < filters.yearRange[0] || r.Tahun > filters.yearRange[1]) return false;
      if (filters.selectedQuarters.length > 0 && !filters.selectedQuarters.includes(r.Kuartal)) {
        return false;
      }
      const q = (searchQuery || filters.searchQuery).toLowerCase().trim();
      if (q) {
        const matchesPeriode = r.Periode.toLowerCase().includes(q);
        const matchesYear = String(r.Tahun).includes(q);
        const matchesQuadrant = r.Quadrant.toLowerCase().includes(q);
        if (!matchesPeriode && !matchesYear && !matchesQuadrant) return false;
      }
      return true;
    });
  }, [rawRecords, filters, searchQuery]);

  const computedMetrics = useMemo<KPIMetrics | null>(() => {
    const records = filteredRecords;
    const n = records.length;
    if (n === 0) return null;

    let sumItb = 0, sumItk = 0, sumGap = 0;
    let itkHigher = 0, itbHigher = 0;
    const counts = { 'Broad Optimism': 0, 'Business-led': 0, 'Consumer-led': 0, 'Broad Pessimism': 0 };

    const itbVals: number[] = [];
    const itkVals: number[] = [];

    let minGapRecord = records[0];
    let maxGapRecord = records[0];

    records.forEach(r => {
      sumItb += r.ITB;
      sumItk += r.ITK;
      sumGap += r.Gap_ITB_ITK;

      itbVals.push(r.ITB);
      itkVals.push(r.ITK);

      if (r.ITK > r.ITB) itkHigher++;
      if (r.ITB > r.ITK) itbHigher++;

      if (counts[r.Quadrant as keyof typeof counts] !== undefined) {
        counts[r.Quadrant as keyof typeof counts]++;
      }

      if (r.Gap_ITB_ITK < minGapRecord.Gap_ITB_ITK) minGapRecord = r;
      if (r.Gap_ITB_ITK > maxGapRecord.Gap_ITB_ITK) maxGapRecord = r;
    });

    const meanItb = sumItb / n;
    const meanItk = sumItk / n;
    const meanGap = sumGap / n;

    const varianceItb = itbVals.reduce((acc, val) => acc + Math.pow(val - meanItb, 2), 0) / (n - 1 || 1);
    const varianceItk = itkVals.reduce((acc, val) => acc + Math.pow(val - meanItk, 2), 0) / (n - 1 || 1);
    const stdItb = Math.sqrt(varianceItb);
    const stdItk = Math.sqrt(varianceItk);

    let cov = 0;
    for (let i = 0; i < n; i++) {
      cov += (itbVals[i] - meanItb) * (itkVals[i] - meanItk);
    }
    const corr = (stdItb > 0 && stdItk > 0) ? (cov / ((n - 1) * stdItb * stdItk)) : 0;

    const sortedItb = [...itbVals].sort((a, b) => a - b);
    const sortedItk = [...itkVals].sort((a, b) => a - b);
    const mid = Math.floor(n / 2);
    const medianItb = n % 2 !== 0 ? sortedItb[mid] : (sortedItb[mid - 1] + sortedItb[mid]) / 2;
    const medianItk = n % 2 !== 0 ? sortedItk[mid] : (sortedItk[mid - 1] + sortedItk[mid]) / 2;

    return {
      totalRecords: n,
      meanITB: Number(meanItb.toFixed(2)),
      meanITK: Number(meanItk.toFixed(2)),
      medianITB: Number(medianItb.toFixed(2)),
      medianITK: Number(medianItk.toFixed(2)),
      stdITB: Number(stdItb.toFixed(2)),
      stdITK: Number(stdItk.toFixed(2)),
      correlation: Number(corr.toFixed(3)),
      meanGap: Number(meanGap.toFixed(2)),
      itkHigherCount: itkHigher,
      itbHigherCount: itbHigher,
      quadrantCounts: counts,
      minGapRecord: minGapRecord,
      maxGapRecord: maxGapRecord
    };
  }, [filteredRecords]);

  return (
    <div className="min-h-screen w-full bg-[var(--bg)] text-[var(--fg)] flex flex-col font-body transition-colors duration-200">
      {/* 100% Full-Width Main Workspace Area */}
      <main className="max-w-[1600px] w-full mx-auto p-4 sm:p-6 space-y-6 flex-1">
        {/* Header Card Banner & Navigation */}
        <Header
          isGasProduction={IS_GAS_PRODUCTION}
          isFilterDrawerOpen={isFilterDrawerOpen}
          setIsFilterDrawerOpen={setIsFilterDrawerOpen}
          onRefresh={loadData}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          totalRecords={filteredRecords.length}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        />

        {loading ? (
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-12 text-center text-xs font-mono font-bold text-[var(--muted)] space-y-3 shadow-md">
            <div className="animate-spin w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full mx-auto" />
            <p>Memuat Master Data Sentimen Ekonomi BPS...</p>
          </div>
        ) : (
          <>
            {/* 6 KPI Cards Row - Hidden on Page 4 Data Info */}
            {activeTab !== 'data_info' && (
              <KPICards metrics={computedMetrics} />
            )}

            {/* Quick Filter Segments - Hidden on Page 4 Data Info */}
            {activeTab !== 'data_info' && (
              <QuickSegments
                filters={filters}
                setFilters={setFilters}
                minYear={minYear}
                maxYear={maxYear}
              />
            )}

            {/* Filter Drawer */}
            <FilterDrawer
              isOpen={isFilterDrawerOpen}
              onClose={() => setIsFilterDrawerOpen(false)}
              filters={filters}
              setFilters={setFilters}
              minYear={minYear}
              maxYear={maxYear}
            />

            {/* 4-Page Executive View Router */}
            <ChartsGrid
              records={filteredRecords}
              metrics={computedMetrics}
              benchmark={filters.benchmark}
              activeTab={activeTab}
            />
          </>
        )}
      </main>

      {/* Unified Global Bottom Footer */}
      <footer className="border-t border-[var(--border)] bg-[var(--surface)] py-4 px-6 text-xs text-[var(--muted)] font-body transition-colors">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-center md:text-left">
            <span className="font-bold text-[var(--fg)] font-heading">Sumber:</span>
            <span>Badan Pusat Statistik (BPS) – Indeks Tendensi Bisnis (ITB) dan Indeks Tendensi Konsumen (ITK)</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-[11px] text-[var(--fg)]">
            <span className="font-semibold">Periode Data: 2000 Q2 – 2020 Q1</span>
            <span className="opacity-30 hidden sm:inline">|</span>
            <span className="font-bold">Developed by Ikhsan Kamal</span>
            <span className="opacity-30">|</span>
            <span className="font-bold">&copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
