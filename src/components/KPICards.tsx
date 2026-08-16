import React from 'react';
import { KPIMetrics } from '../types';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ChartIncreaseIcon,
  UserGroupIcon,
  BarChartIcon,
  TradeUpIcon,
  CheckmarkCircle01Icon
} from '@hugeicons/core-free-icons';

interface KPICardsProps {
  metrics: KPIMetrics | null;
}

export const KPICards: React.FC<KPICardsProps> = ({ metrics }) => {
  if (!metrics) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-3 h-24 animate-pulse">
            <div className="h-3 bg-[var(--surface-alt)] rounded w-1/2 mb-2"></div>
            <div className="h-6 bg-[var(--surface-alt)] rounded w-3/4 mb-1.5"></div>
            <div className="h-2.5 bg-[var(--surface-alt)] rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  const {
    meanITB,
    meanITK,
    stdITB,
    stdITK,
    correlation,
    totalRecords
  } = metrics;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6 font-body text-[var(--fg)]">
      {/* Card 1: RATA-RATA ITB */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-3 shadow-xs hover:border-[var(--accent-border)] transition-all flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider font-heading">
            RATA-RATA ITB
          </span>
          <div className="w-8 h-8 rounded-full bg-[var(--bps-blue)]/10 text-[var(--bps-blue)] flex items-center justify-center shrink-0">
            <HugeiconsIcon icon={ChartIncreaseIcon} size={18} />
          </div>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-extrabold text-[var(--fg)] tabular-nums leading-none mt-1 font-mono">
            {meanITB.toFixed(2).replace('.', ',')}
          </div>
          <div className="pt-1.5 mt-1.5 border-t border-[var(--border-light)] text-[10px] font-semibold text-[var(--bps-green)] font-heading">
            &gt; Level Netral (100)
          </div>
        </div>
      </div>

      {/* Card 2: RATA-RATA ITK */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-3 shadow-xs hover:border-[var(--accent-border)] transition-all flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider font-heading">
            RATA-RATA ITK
          </span>
          <div className="w-8 h-8 rounded-full bg-[var(--bps-blue)]/10 text-[var(--bps-blue)] flex items-center justify-center shrink-0">
            <HugeiconsIcon icon={UserGroupIcon} size={18} />
          </div>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-extrabold text-[var(--fg)] tabular-nums leading-none mt-1 font-mono">
            {meanITK.toFixed(2).replace('.', ',')}
          </div>
          <div className="pt-1.5 mt-1.5 border-t border-[var(--border-light)] text-[10px] font-semibold text-[var(--bps-green)] font-heading">
            &gt; Level Netral (100)
          </div>
        </div>
      </div>

      {/* Card 3: STD. DEV. ITB */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-3 shadow-xs hover:border-[var(--accent-border)] transition-all flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider font-heading">
            STD. DEV. ITB
          </span>
          <div className="w-8 h-8 rounded-full bg-[var(--bps-blue)]/10 text-[var(--bps-blue)] flex items-center justify-center shrink-0">
            <HugeiconsIcon icon={BarChartIcon} size={18} />
          </div>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-extrabold text-[var(--fg)] tabular-nums leading-none mt-1 font-mono">
            {stdITB.toFixed(2).replace('.', ',')}
          </div>
          <div className="pt-1.5 mt-1.5 border-t border-[var(--border-light)] text-[10px] font-medium text-[var(--muted)] truncate">
            Stabilitas Lebih Tinggi
          </div>
        </div>
      </div>

      {/* Card 4: STD. DEV. ITK */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-3 shadow-xs hover:border-[var(--accent-border)] transition-all flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider font-heading">
            STD. DEV. ITK
          </span>
          <div className="w-8 h-8 rounded-full bg-[var(--bps-blue)]/10 text-[var(--bps-blue)] flex items-center justify-center shrink-0">
            <HugeiconsIcon icon={TradeUpIcon} size={18} />
          </div>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-extrabold text-[var(--fg)] tabular-nums leading-none mt-1 font-mono">
            {stdITK.toFixed(2).replace('.', ',')}
          </div>
          <div className="pt-1.5 mt-1.5 border-t border-[var(--border-light)] text-[10px] font-medium text-[var(--muted)] truncate">
            Lebih Volatil
          </div>
        </div>
      </div>

      {/* Card 5: KORELASI ITB–ITK */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-3 shadow-xs hover:border-[var(--accent-border)] transition-all flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider font-heading">
            KORELASI ITB–ITK
          </span>
          <div className="w-8 h-8 rounded-full bg-[var(--bps-blue)]/10 text-[var(--bps-blue)] flex items-center justify-center shrink-0">
            <HugeiconsIcon icon={BarChartIcon} size={18} />
          </div>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-extrabold text-[var(--fg)] tabular-nums leading-none mt-1 font-mono">
            {correlation.toFixed(3).replace('.', ',')}
          </div>
          <div className="pt-1.5 mt-1.5 border-t border-[var(--border-light)] text-[10px] font-medium text-[var(--muted)] truncate">
            Positif Moderat
          </div>
        </div>
      </div>

      {/* Card 6: JML OBSERVASI */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-3 shadow-xs hover:border-[var(--accent-border)] transition-all flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider font-heading">
            JML OBSERVASI
          </span>
          <div className="w-8 h-8 rounded-full bg-[var(--bps-blue)]/10 text-[var(--bps-blue)] flex items-center justify-center shrink-0">
            <HugeiconsIcon icon={CheckmarkCircle01Icon} size={18} />
          </div>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-extrabold text-[var(--fg)] tabular-nums leading-none mt-1 font-mono">
            {totalRecords}
          </div>
          <div className="pt-1.5 mt-1.5 border-t border-[var(--border-light)] text-[10px] font-medium text-[var(--muted)] truncate">
            2000 Q2 – 2020 Q1
          </div>
        </div>
      </div>
    </div>
  );
};
