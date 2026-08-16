import React, { useState } from 'react';
import { SentimentRecord } from '../types';
import { HugeiconsIcon } from '@hugeicons/react';
import { Download04Icon, Sorting05Icon, ArrowLeft01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';

interface SentimentDataTableProps {
  records: SentimentRecord[];
  onUpdateRecord?: (recordId: string, fields: Partial<SentimentRecord>) => void;
}

export const SentimentDataTable: React.FC<SentimentDataTableProps> = ({ records }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof SentimentRecord>('Tahun');
  const [sortAsc, setSortAsc] = useState(false);
  const pageSize = 15;

  const handleSort = (field: keyof SentimentRecord) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const sorted = [...records].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    if (valA === undefined || valB === undefined) return 0;
    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / pageSize) || 1;
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const exportCSV = () => {
    const headers = ['Tahun', 'Kuartal_Num', 'Kuartal', 'Periode', 'ITB', 'ITK', 'Gap_ITB_ITK', 'Quadrant'];
    const rows = sorted.map(r => [r.Tahun, r.Kuartal_Num, r.Kuartal, `"${r.Periode}"`, r.ITB, r.ITK, r.Gap_ITB_ITK, `"${r.Quadrant}"`]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'BPS_ITB_ITK_Master_Data_Export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-5 shadow-xs mb-6 font-body text-[var(--fg)]">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 font-heading">
        <div>
          <h2 className="text-base font-extrabold text-[var(--fg)]">
            Master Data Tabel Observasi Sentimen BPS
          </h2>
          <p className="text-xs font-medium text-[var(--muted)] mt-0.5">
            Menampilkan {records.length} data kuartalan ITB &amp; ITK (2000 Q2 – 2020 Q1)
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="h-8 px-3.5 flex items-center gap-1.5 text-xs font-bold text-white bg-[var(--accent)] rounded-full hover:opacity-90 transition-all cursor-pointer shadow-xs"
        >
          <HugeiconsIcon icon={Download04Icon} size={14} />
          <span>Ekspor CSV</span>
        </button>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-[var(--surface-alt)] border-b border-[var(--border)] text-[var(--fg-secondary)] font-heading">
              <th onClick={() => handleSort('Periode')} className="p-2.5 font-bold cursor-pointer hover:bg-[var(--border)]">
                <div className="flex items-center gap-1">Periode <HugeiconsIcon icon={Sorting05Icon} size={12} /></div>
              </th>
              <th onClick={() => handleSort('Tahun')} className="p-2.5 font-bold cursor-pointer hover:bg-[var(--border)]">
                <div className="flex items-center gap-1">Tahun <HugeiconsIcon icon={Sorting05Icon} size={12} /></div>
              </th>
              <th onClick={() => handleSort('Kuartal')} className="p-2.5 font-bold cursor-pointer hover:bg-[var(--border)]">
                <div className="flex items-center gap-1">Kuartal <HugeiconsIcon icon={Sorting05Icon} size={12} /></div>
              </th>
              <th onClick={() => handleSort('ITB')} className="p-2.5 font-bold cursor-pointer hover:bg-[var(--border)] text-[var(--bps-blue)]">
                <div className="flex items-center gap-1">ITB (Bisnis) <HugeiconsIcon icon={Sorting05Icon} size={12} /></div>
              </th>
              <th onClick={() => handleSort('ITK')} className="p-2.5 font-bold cursor-pointer hover:bg-[var(--border)] text-[var(--bps-green)]">
                <div className="flex items-center gap-1">ITK (Konsumen) <HugeiconsIcon icon={Sorting05Icon} size={12} /></div>
              </th>
              <th onClick={() => handleSort('Gap_ITB_ITK')} className="p-2.5 font-bold cursor-pointer hover:bg-[var(--border)] text-[var(--bps-orange)]">
                <div className="flex items-center gap-1">Gap (ITB − ITK) <HugeiconsIcon icon={Sorting05Icon} size={12} /></div>
              </th>
              <th className="p-2.5 font-bold">Klasifikasi Kuadran</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-light)] text-[var(--fg)] font-mono">
            {paginated.map((r, idx) => (
              <tr key={idx} className="hover:bg-[var(--surface-alt)] transition-colors">
                <td className="p-2.5 font-bold text-[var(--fg)]">{r.Periode}</td>
                <td className="p-2.5">{r.Tahun}</td>
                <td className="p-2.5 font-sans font-semibold text-[var(--muted)]">{r.Kuartal}</td>
                <td className="p-2.5 font-bold text-[var(--bps-blue)]">{r.ITB.toFixed(2).replace('.', ',')}</td>
                <td className="p-2.5 font-bold text-[var(--bps-green)]">{r.ITK.toFixed(2).replace('.', ',')}</td>
                <td className="p-2.5 font-bold">
                  <span className={r.Gap_ITB_ITK >= 0 ? 'text-[var(--bps-green)]' : 'text-rose-600 dark:text-rose-400'}>
                    {r.Gap_ITB_ITK >= 0 ? `+${r.Gap_ITB_ITK.toFixed(2).replace('.', ',')}` : r.Gap_ITB_ITK.toFixed(2).replace('.', ',')}
                  </span>
                </td>
                <td className="p-2.5 font-sans">
                  <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold border ${
                    r.Quadrant === 'Broad Optimism' ? 'bg-[var(--bps-green)]/10 text-[var(--bps-green)] border-[var(--bps-green)]/25' :
                    r.Quadrant === 'Business-led' ? 'bg-[var(--bps-blue)]/10 text-[var(--bps-blue)] border-[var(--bps-blue)]/25' :
                    r.Quadrant === 'Consumer-led' ? 'bg-[var(--bps-orange)]/10 text-[var(--bps-orange)] border-[var(--bps-orange)]/25' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/25'
                  }`}>
                    {r.Quadrant}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--border)] text-xs font-heading">
        <span className="text-[var(--muted)]">
          Halaman <strong className="font-mono text-[var(--fg)] font-bold">{currentPage}</strong> dari <strong className="font-mono text-[var(--fg)] font-bold">{totalPages}</strong>
        </span>
        <div className="flex items-center gap-1.5">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            className="p-1.5 border border-[var(--border)] rounded-full disabled:opacity-30 hover:bg-[var(--surface-alt)] cursor-pointer text-[var(--fg)] transition-all"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            className="p-1.5 border border-[var(--border)] rounded-full disabled:opacity-30 hover:bg-[var(--surface-alt)] cursor-pointer text-[var(--fg)] transition-all"
          >
            <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
