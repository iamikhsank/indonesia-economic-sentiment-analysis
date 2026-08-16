import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Idea01Icon, CheckmarkCircle01Icon, Alert01Icon } from '@hugeicons/core-free-icons';

export const ExecutiveRecommendations: React.FC = () => {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-5 shadow-xs mb-6 font-body text-[var(--fg)]">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-10 h-10 rounded-full bg-[var(--bps-orange)]/10 text-[var(--bps-orange)] flex items-center justify-center shrink-0">
          <HugeiconsIcon icon={Idea01Icon} size={22} />
        </span>
        <h2 className="text-base font-extrabold text-[var(--fg)] font-heading">
          Rekomendasi Kebijakan &amp; Implikasi Strategis Eksekutif
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category A: Respon Fluktuasi Sentimen Konsumen */}
        <div className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2.5 text-xs font-bold text-[var(--fg)] uppercase tracking-wider font-heading">
            <span className="w-8 h-8 rounded-full bg-[var(--bps-orange)]/10 text-[var(--bps-orange)] flex items-center justify-center shrink-0">
              <HugeiconsIcon icon={Alert01Icon} size={18} />
            </span>
            <span>1. Mitigasi Volatilitas Sentimen Konsumen (ITK)</span>
          </div>
          <p className="text-xs text-[var(--muted)] leading-relaxed">
            Mengingat ITK memiliki deviasi standar lebih tinggi ({'>'}13) dibanding ITB, belanja konsumen cenderung lebih sensitif terhadap tekanan harga makro. Disarankan penguatan jaring pengaman sosial dan insentif fiskal langsung pada periode Q1 untuk menjaga daya beli.
          </p>
        </div>

        {/* Category B: Penyesuaian Siklus Bisnis */}
        <div className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2.5 text-xs font-bold text-[var(--fg)] uppercase tracking-wider font-heading">
            <span className="w-8 h-8 rounded-full bg-[var(--bps-green)]/10 text-[var(--bps-green)] flex items-center justify-center shrink-0">
              <HugeiconsIcon icon={CheckmarkCircle01Icon} size={18} />
            </span>
            <span>2. Kapitalisasi Puncak Optimisme Kuartal Q2</span>
          </div>
          <p className="text-xs text-[var(--muted)] leading-relaxed">
            Data historis 2000–2020 menunjukkan Q2 konsisten menjadi titik puncak rerata ITB dan ITK. Pelaku industri B2B disarankan menyelaraskan peluncuran ekspansi kapasitas dan kampanye pemasaran utama pada awal Q2 untuk memaksimalkan respon pasar.
          </p>
        </div>
      </div>
    </div>
  );
};
