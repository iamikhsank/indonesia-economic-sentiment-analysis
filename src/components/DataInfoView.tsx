import React from 'react';
import { SentimentRecord } from '../types';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  InformationCircleIcon,
  DatabaseIcon,
  RefreshIcon,
  CheckmarkCircle01Icon,
  Calendar03Icon,
  ChartIncreaseIcon,
  BookOpen01Icon,
  Alert01Icon,
  UserIcon
} from '@hugeicons/core-free-icons';
import { SentimentDataTable } from './SentimentDataTable';

interface DataInfoViewProps {
  records: SentimentRecord[];
}

export const DataInfoView: React.FC<DataInfoViewProps> = ({ records }) => {
  return (
    <div className="space-y-6 font-body text-[var(--fg)] animate-in fade-in duration-300">

      {/* Top Row: 3 Cards (Tentang Proyek, Sumber Data, Data Refresh) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Card 1: TENTANG PROYEK (4 Cols) */}
        <div className="lg:col-span-4 bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-10 h-10 rounded-full bg-[var(--bps-blue)]/10 text-[var(--bps-blue)] flex items-center justify-center shrink-0">
                <HugeiconsIcon icon={InformationCircleIcon} size={22} />
              </span>
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-[var(--fg)] font-heading">
                TENTANG PROYEK
              </h2>
            </div>
            <p className="text-xs font-medium text-[var(--muted)] leading-relaxed mb-4">
              Proyek ini menganalisis perbandingan sentimen ekonomi di Indonesia menggunakan dua indikator utama dari BPS yaitu Indeks Tendensi Bisnis (ITB) dan Indeks Tendensi Konsumen (ITK). Periode analisis mencakup 2000 Q2 hingga 2020 Q1 (80 observasi kuartalan).
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[var(--border-light)]">
            <div className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--bps-green)]/10 text-[var(--bps-green)] flex items-center justify-center shrink-0">
                <HugeiconsIcon icon={ChartIncreaseIcon} size={20} />
              </div>
              <div>
                <div className="text-[14px] font-extrabold text-[var(--fg)] font-mono tabular-nums leading-tight">80</div>
                <div className="text-[10px] font-semibold text-[var(--muted)]">Observasi Kuartalan</div>
                <div className="text-[9px] font-mono text-[var(--muted)]">2000 Q2 – 2020 Q1</div>
              </div>
            </div>

            <div className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--bps-blue)]/10 text-[var(--bps-blue)] flex items-center justify-center shrink-0">
                <HugeiconsIcon icon={Calendar03Icon} size={20} />
              </div>
              <div>
                <div className="text-[14px] font-extrabold text-[var(--fg)] font-mono tabular-nums leading-tight">20 Tahun</div>
                <div className="text-[10px] font-semibold text-[var(--muted)]">Rentang Waktu</div>
                <div className="text-[9px] font-mono text-[var(--muted)]">2000 – 2020</div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: SUMBER DATA (5 Cols) */}
        <div className="lg:col-span-5 bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-10 h-10 rounded-full bg-[var(--bps-blue)]/10 text-[var(--bps-blue)] flex items-center justify-center shrink-0">
                <HugeiconsIcon icon={DatabaseIcon} size={22} />
              </span>
              <div>
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-[var(--fg)] font-heading">
                  SUMBER DATA
                </h2>
                <p className="text-xs font-medium text-[var(--muted)]">
                  Data diperoleh dari publikasi resmi Badan Pusat Statistik (BPS).
                </p>
              </div>
            </div>

            <div className="overflow-x-auto mt-2">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--surface-alt)] text-[var(--fg)] border-b border-[var(--border)] font-heading">
                    <th className="p-2 font-bold">Indikator</th>
                    <th className="p-2 font-bold">Sumber</th>
                    <th className="p-2 font-bold">Frekuensi</th>
                    <th className="p-2 font-bold">Periode</th>
                    <th className="p-2 font-bold">Satuan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-light)] font-mono text-[var(--fg)] text-[11px]">
                  <tr>
                    <td className="p-2 font-sans font-bold text-[var(--bps-blue)] flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[var(--bps-blue)]"></span> ITB – Indeks Tendensi Bisnis
                    </td>
                    <td className="p-2 font-sans">BPS</td>
                    <td className="p-2 font-sans">Kuartalan</td>
                    <td className="p-2">2000 Q2 – 2020 Q1</td>
                    <td className="p-2 font-sans">Indeks (2010 = 100)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-sans font-bold text-[var(--bps-green)] flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[var(--bps-green)]"></span> ITK – Indeks Tendensi Konsumen
                    </td>
                    <td className="p-2 font-sans">BPS</td>
                    <td className="p-2 font-sans">Kuartalan</td>
                    <td className="p-2">2000 Q2 – 2020 Q1</td>
                    <td className="p-2 font-sans">Indeks (2010 = 100)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--border-light)] text-[10px] text-[var(--muted)] font-body">
            <span>Sumber Publikasi BPS: </span>
            <a
              href="https://www.bps.go.id/id/statistics-table/2/NDMjMg==/indeks-tendensi-bisnis--itb--dan-indeks-tendensi-konsumen--itk-.html"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--bps-blue)] hover:underline font-mono underline ml-1 break-all"
            >
              https://www.bps.go.id/id/statistics-table/2/NDMjMg==/indeks-tendensi-bisnis--itb--dan-indeks-tendensi-konsumen--itk-.html
            </a>
          </div>
        </div>

        {/* Card 3: DATA REFRESH (3 Cols) */}
        <div className="lg:col-span-3 bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <HugeiconsIcon icon={RefreshIcon} size={22} />
              </span>
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-[var(--fg)] font-heading">
                DATA REFRESH
              </h2>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[var(--surface-alt)] text-[var(--muted)] flex items-center justify-center shrink-0 border border-[var(--border)]">
                  <HugeiconsIcon icon={RefreshIcon} size={18} />
                </div>
                <div>
                  <div className="font-bold text-[var(--fg)] font-heading">Frekuensi Update</div>
                  <div className="text-[11px] text-[var(--muted)]">Sesuai rilis resmi BPS (kuartalan)</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[var(--surface-alt)] text-[var(--muted)] flex items-center justify-center shrink-0 border border-[var(--border)]">
                  <HugeiconsIcon icon={Calendar03Icon} size={18} />
                </div>
                <div>
                  <div className="font-bold text-[var(--fg)] font-heading">Update Terakhir</div>
                  <div className="text-[11px] font-mono text-[var(--muted)]">20 Mei 2024</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[var(--surface-alt)] text-[var(--muted)] flex items-center justify-center shrink-0 border border-[var(--border)]">
                  <HugeiconsIcon icon={Calendar03Icon} size={18} />
                </div>
                <div>
                  <div className="font-bold text-[var(--fg)] font-heading">Data Periode Terakhir</div>
                  <div className="text-[11px] font-mono text-[var(--muted)]">2020 Q1</div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <div className="w-9 h-9 rounded-full bg-[var(--bps-green)]/10 text-[var(--bps-green)] flex items-center justify-center shrink-0">
                  <HugeiconsIcon icon={CheckmarkCircle01Icon} size={18} />
                </div>
                <div>
                  <div className="font-bold text-[var(--fg)] font-heading">Status</div>
                  <div className="text-[11px] font-bold text-[var(--bps-green)]">Data Final (Tidak Direvisi)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Middle Row: KAMUS DATA (DATA DICTIONARY) & KUALITAS DATA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: KAMUS DATA (8 Cols) */}
        <div className="lg:col-span-8 bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-5 shadow-xs">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-10 h-10 rounded-full bg-[var(--bps-blue)]/10 text-[var(--bps-blue)] flex items-center justify-center shrink-0">
              <HugeiconsIcon icon={BookOpen01Icon} size={22} />
            </span>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-[var(--fg)] font-heading">
              KAMUS DATA (DATA DICTIONARY)
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-[var(--surface-alt)] text-[var(--fg)] border-b border-[var(--border)] font-heading">
                  <th className="p-2.5 font-bold">Kolom</th>
                  <th className="p-2.5 font-bold">Nama Kolom</th>
                  <th className="p-2.5 font-bold">Definisi</th>
                  <th className="p-2.5 font-bold">Tipe Data</th>
                  <th className="p-2.5 font-bold">Satuan / Nilai</th>
                  <th className="p-2.5 font-bold">Sumber</th>
                  <th className="p-2.5 font-bold">Catatan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-light)] font-mono text-[11px] text-[var(--fg)]">
                <tr>
                  <td className="p-2 font-bold text-[var(--bps-blue)]">Tahun</td>
                  <td className="p-2 font-sans font-medium">Tahun</td>
                  <td className="p-2 font-sans text-[var(--muted)]">Tahun observasi</td>
                  <td className="p-2 font-sans">Integer</td>
                  <td className="p-2">2000 – 2020</td>
                  <td className="p-2 font-sans">BPS</td>
                  <td className="p-2 font-sans text-[var(--muted)]">-</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-[var(--bps-blue)]">Kuartal</td>
                  <td className="p-2 font-sans font-medium">Kuartal</td>
                  <td className="p-2 font-sans text-[var(--muted)]">Kuartal observasi (Q1–Q4)</td>
                  <td className="p-2 font-sans">Kategori</td>
                  <td className="p-2">Q1, Q2, Q3, Q4</td>
                  <td className="p-2 font-sans">BPS</td>
                  <td className="p-2 font-sans text-[var(--muted)]">-</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-[var(--bps-blue)]">Periode</td>
                  <td className="p-2 font-sans font-medium">Periode</td>
                  <td className="p-2 font-sans text-[var(--muted)]">Tahun dan kuartal dalam format teks</td>
                  <td className="p-2 font-sans">Teks</td>
                  <td className="p-2">Contoh: 2000 Q2</td>
                  <td className="p-2 font-sans text-[var(--bps-orange)]">Turunan</td>
                  <td className="p-2 font-sans text-[var(--muted)]">Dibuat dari Tahun + Kuartal</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-[var(--bps-blue)]">ITB</td>
                  <td className="p-2 font-sans font-medium">Indeks Tendensi Bisnis</td>
                  <td className="p-2 font-sans text-[var(--muted)]">Indeks sentimen pelaku bisnis</td>
                  <td className="p-2 font-sans">Numerik</td>
                  <td className="p-2">Indeks (2010 = 100)</td>
                  <td className="p-2 font-sans">BPS</td>
                  <td className="p-2 font-sans text-[var(--muted)]">ITB &gt; 100 = Optimis</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-[var(--bps-green)]">ITK</td>
                  <td className="p-2 font-sans font-medium">Indeks Tendensi Konsumen</td>
                  <td className="p-2 font-sans text-[var(--muted)]">Indeks sentimen konsumen</td>
                  <td className="p-2 font-sans">Numerik</td>
                  <td className="p-2">Indeks (2010 = 100)</td>
                  <td className="p-2 font-sans">BPS</td>
                  <td className="p-2 font-sans text-[var(--muted)]">ITK &gt; 100 = Optimis</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-[var(--bps-orange)]">Gap_ITB_ITK</td>
                  <td className="p-2 font-sans font-medium">Gap (ITB − ITK)</td>
                  <td className="p-2 font-sans text-[var(--muted)]">Selisih sentimen bisnis dan konsumen</td>
                  <td className="p-2 font-sans">Numerik</td>
                  <td className="p-2">-</td>
                  <td className="p-2 font-sans text-[var(--bps-orange)]">Turunan</td>
                  <td className="p-2 font-sans text-[var(--muted)]">Positif: ITB &gt; ITK</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-purple-600 dark:text-purple-400">Gap_Direction</td>
                  <td className="p-2 font-sans font-medium">Arah Divergensi</td>
                  <td className="p-2 font-sans text-[var(--muted)]">Arah perbedaan sentimen</td>
                  <td className="p-2 font-sans">Kategori</td>
                  <td className="p-2">ITB &gt; ITK / ITK &gt; ITB</td>
                  <td className="p-2 font-sans text-[var(--bps-orange)]">Turunan</td>
                  <td className="p-2 font-sans text-[var(--muted)]">Berdasarkan Gap</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-purple-600 dark:text-purple-400">ITB_Status</td>
                  <td className="p-2 font-sans font-medium">Status ITB terhadap 100</td>
                  <td className="p-2 font-sans text-[var(--muted)]">Klasifikasi posisi ITB terhadap level netral 100</td>
                  <td className="p-2 font-sans">Kategori</td>
                  <td className="p-2">&gt; 100 (Optimis) / &lt; 100 (Pesimis)</td>
                  <td className="p-2 font-sans text-[var(--bps-orange)]">Turunan</td>
                  <td className="p-2 font-sans text-[var(--muted)]">Benchmark = 100</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-purple-600 dark:text-purple-400">ITK_Status</td>
                  <td className="p-2 font-sans font-medium">Status ITK terhadap 100</td>
                  <td className="p-2 font-sans text-[var(--muted)]">Klasifikasi posisi ITK terhadap level netral 100</td>
                  <td className="p-2 font-sans">Kategori</td>
                  <td className="p-2">&gt; 100 (Optimis) / &lt; 100 (Pesimis)</td>
                  <td className="p-2 font-sans text-[var(--bps-orange)]">Turunan</td>
                  <td className="p-2 font-sans text-[var(--muted)]">Benchmark = 100</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-purple-600 dark:text-purple-400">Quadrant</td>
                  <td className="p-2 font-sans font-medium">Quadrant ITB × ITK</td>
                  <td className="p-2 font-sans text-[var(--muted)]">Klasifikasi kombinasi posisi ITB dan ITK</td>
                  <td className="p-2 font-sans">Kategori</td>
                  <td className="p-2">4 Kategori</td>
                  <td className="p-2 font-sans text-[var(--bps-orange)]">Turunan</td>
                  <td className="p-2 font-sans text-[var(--muted)]">Broad Optimism, dll</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: KUALITAS DATA (4 Cols) */}
        <div className="lg:col-span-4 bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-10 h-10 rounded-full bg-[var(--bps-green)]/10 text-[var(--bps-green)] flex items-center justify-center shrink-0">
                <HugeiconsIcon icon={CheckmarkCircle01Icon} size={22} />
              </span>
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-[var(--fg)] font-heading">
                KUALITAS DATA
              </h2>
            </div>

            <div className="space-y-2 text-xs font-heading">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--surface-alt)] border border-[var(--border)]">
                <span className="text-[var(--muted)] font-semibold">Jumlah Observasi</span>
                <span className="font-mono font-bold text-[var(--fg)] flex items-center gap-1.5">
                  80 <HugeiconsIcon icon={CheckmarkCircle01Icon} size={16} className="text-[var(--bps-green)]" />
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--surface-alt)] border border-[var(--border)]">
                <span className="text-[var(--muted)] font-semibold">Periode Data</span>
                <span className="font-mono font-bold text-[var(--fg)] flex items-center gap-1.5">
                  2000 Q2 – 2020 Q1 <HugeiconsIcon icon={CheckmarkCircle01Icon} size={16} className="text-[var(--bps-green)]" />
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--surface-alt)] border border-[var(--border)]">
                <span className="text-[var(--muted)] font-semibold">Missing Value</span>
                <span className="font-mono font-bold text-[var(--fg)] flex items-center gap-1.5">
                  0 (0%) <HugeiconsIcon icon={CheckmarkCircle01Icon} size={16} className="text-[var(--bps-green)]" />
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--surface-alt)] border border-[var(--border)]">
                <span className="text-[var(--muted)] font-semibold">Duplikasi</span>
                <span className="font-mono font-bold text-[var(--fg)] flex items-center gap-1.5">
                  0 (0%) <HugeiconsIcon icon={CheckmarkCircle01Icon} size={16} className="text-[var(--bps-green)]" />
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--surface-alt)] border border-[var(--border)]">
                <span className="text-[var(--muted)] font-semibold">Tipe Data Konsisten</span>
                <span className="font-mono font-bold text-[var(--fg)] flex items-center gap-1.5">
                  Ya <HugeiconsIcon icon={CheckmarkCircle01Icon} size={16} className="text-[var(--bps-green)]" />
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--surface-alt)] border border-[var(--border)]">
                <span className="text-[var(--muted)] font-semibold">Rentang ITB</span>
                <span className="font-mono font-bold text-[var(--bps-blue)]">95,12 – 122,50</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--surface-alt)] border border-[var(--border)]">
                <span className="text-[var(--muted)] font-semibold">Rentang ITK</span>
                <span className="font-mono font-bold text-[var(--bps-green)]">93,20 – 125,68</span>
              </div>
            </div>
          </div>

          <div className="bg-[var(--bps-green)]/10 border border-[var(--bps-green)]/30 rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--bps-green)] text-white flex items-center justify-center shrink-0 shadow-xs">
              <HugeiconsIcon icon={CheckmarkCircle01Icon} size={22} />
            </div>
            <p className="text-xs font-semibold text-[var(--fg)] leading-tight">
              Data bersih, lengkap, dan siap digunakan untuk analisis.
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Row: PROSES TRANSFORMASI DATA, CATATAN & KETERBATASAN, KONTAK */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* PROSES TRANSFORMASI DATA (6 Cols) */}
        <div className="lg:col-span-6 bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-10 h-10 rounded-full bg-[var(--bps-blue)]/10 text-[var(--bps-blue)] flex items-center justify-center shrink-0">
                <HugeiconsIcon icon={RefreshIcon} size={22} />
              </span>
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-[var(--fg)] font-heading">
                PROSES TRANSFORMASI DATA
              </h2>
            </div>

            {/* 6 Horizontal Steps Flowchart */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl p-3 space-y-1.5 relative">
                <div className="w-8 h-8 rounded-full bg-[var(--bps-blue)] text-white font-extrabold text-xs flex items-center justify-center font-mono shadow-2xs">1</div>
                <div className="font-bold text-xs text-[var(--fg)] font-heading">Pengumpulan Data</div>
                <p className="text-[10px] text-[var(--muted)] leading-relaxed">
                  Mengunduh data ITB dan ITK dari publikasi resmi BPS (format CSV/XLS).
                </p>
              </div>

              <div className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl p-3 space-y-1.5 relative">
                <div className="w-8 h-8 rounded-full bg-[var(--bps-blue)] text-white font-extrabold text-xs flex items-center justify-center font-mono shadow-2xs">2</div>
                <div className="font-bold text-xs text-[var(--fg)] font-heading">Pembersihan Data</div>
                <p className="text-[10px] text-[var(--muted)] leading-relaxed">
                  Penyatuan format, trim teks, menghapus baris tidak relevan.
                </p>
              </div>

              <div className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl p-3 space-y-1.5 relative">
                <div className="w-8 h-8 rounded-full bg-[var(--bps-blue)] text-white font-extrabold text-xs flex items-center justify-center font-mono shadow-2xs">3</div>
                <div className="font-bold text-xs text-[var(--fg)] font-heading">Penyusunan Periode</div>
                <p className="text-[10px] text-[var(--muted)] leading-relaxed">
                  Membuat kolom Tahun, Kuartal, dan Periode (Contoh: 2000 Q2).
                </p>
              </div>

              <div className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl p-3 space-y-1.5 relative">
                <div className="w-8 h-8 rounded-full bg-[var(--bps-blue)] text-white font-extrabold text-xs flex items-center justify-center font-mono shadow-2xs">4</div>
                <div className="font-bold text-xs text-[var(--fg)] font-heading">Perhitungan Turunan</div>
                <p className="text-[10px] text-[var(--muted)] leading-relaxed">
                  Menghitung Gap, arah divergensi, status terhadap 100, dan quadrant.
                </p>
              </div>

              <div className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl p-3 space-y-1.5 relative">
                <div className="w-8 h-8 rounded-full bg-[var(--bps-blue)] text-white font-extrabold text-xs flex items-center justify-center font-mono shadow-2xs">5</div>
                <div className="font-bold text-xs text-[var(--fg)] font-heading">Validasi &amp; Cek Kualitas</div>
                <p className="text-[10px] text-[var(--muted)] leading-relaxed">
                  Pengecekan missing value, duplikasi, rentang nilai, dan konsistensi.
                </p>
              </div>

              <div className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl p-3 space-y-1.5 relative">
                <div className="w-8 h-8 rounded-full bg-[var(--bps-blue)] text-white font-extrabold text-xs flex items-center justify-center font-mono shadow-2xs">6</div>
                <div className="font-bold text-xs text-[var(--fg)] font-heading">Master Dataset</div>
                <p className="text-[10px] text-[var(--muted)] leading-relaxed">
                  Menyimpan data final ke Master_Data (siap untuk analisis &amp; visualisasi).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CATATAN & KETERBATASAN (3 Cols) */}
        <div className="lg:col-span-3 bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-10 h-10 rounded-full bg-[var(--bps-orange)]/10 text-[var(--bps-orange)] flex items-center justify-center shrink-0">
                <HugeiconsIcon icon={Alert01Icon} size={22} />
              </span>
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-[var(--bps-orange)] font-heading">
                CATATAN &amp; KETERBATASAN
              </h2>
            </div>

            <ul className="space-y-2 text-xs font-medium text-[var(--fg)] leading-relaxed list-disc pl-4">
              <li>Indeks dinyatakan dalam basis (2010 = 100).</li>
              <li>Data bersifat kuartalan dan mengikuti rilis BPS.</li>
              <li>Tidak ada revisi data pada periode ini.</li>
              <li>Analisis hanya menggunakan dua indikator sentimen (ITB dan ITK).</li>
              <li>Untuk analisis lebih luas diperlukan data makro ekonomi lainnya.</li>
            </ul>
          </div>
        </div>

        {/* KONTAK (3 Cols) */}
        <div className="lg:col-span-3 bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-10 h-10 rounded-full bg-[var(--bps-blue)]/10 text-[var(--bps-blue)] flex items-center justify-center shrink-0">
                <HugeiconsIcon icon={UserIcon} size={22} />
              </span>
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-[var(--fg)] font-heading">
                KONTAK
              </h2>
            </div>

            <div className="space-y-2 text-xs font-heading">
              <div className="flex items-center justify-between pb-1.5 border-b border-[var(--border-light)]">
                <span className="text-[var(--muted)] font-semibold">Dibuat oleh</span>
                <span className="font-bold text-[var(--fg)] font-sans">Ikhsan Kamal</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-[var(--border-light)]">
                <span className="text-[var(--muted)] font-semibold">Peran</span>
                <span className="font-bold text-[var(--fg)] font-sans">Data Analyst / BI Developer</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-[var(--border-light)]">
                <span className="text-[var(--muted)] font-semibold">Email</span>
                <a href="mailto:iamikhsank@gmail.com" className="font-mono text-[var(--bps-blue)] hover:underline truncate max-w-[170px]" title="iamikhsank@gmail.com">
                  iamikhsank@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-[var(--border-light)]">
                <span className="text-[var(--muted)] font-semibold">GitHub</span>
                <a href="https://github.com/iamikhsank" target="_blank" rel="noreferrer" className="font-mono text-[var(--bps-blue)] hover:underline truncate max-w-[170px]" title="https://github.com/iamikhsank">
                  github.com/iamikhsank
                </a>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-[var(--border-light)]">
                <span className="text-[var(--muted)] font-semibold">LinkedIn</span>
                <a href="https://linkedin.com/in/ikhsankamal" target="_blank" rel="noreferrer" className="font-mono text-[var(--bps-blue)] hover:underline truncate max-w-[170px]" title="https://linkedin.com/in/ikhsankamal">
                  linkedin.com/in/ikhsankamal
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted)] font-semibold">Web Profile</span>
                <a href="https://iamikhsank.github.io/Web-Profile-iamikhsank/" target="_blank" rel="noreferrer" className="font-mono text-[var(--bps-blue)] hover:underline truncate max-w-[170px]" title="https://iamikhsank.github.io/Web-Profile-iamikhsank/">
                  iamikhsank.github.io
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Master Data Table Component (For Full Data Exploration & Export) */}
      <SentimentDataTable records={records} />

    </div>
  );
};
