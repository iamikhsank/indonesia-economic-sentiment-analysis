import React from 'react';
import { SentimentRecord, KPIMetrics } from '../types';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  ReferenceLine,
  ScatterChart,
  Scatter,
  ZAxis,
  Cell
} from 'recharts';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ChartIncreaseIcon,
  UserGroupIcon,
  TradeUpIcon,
  Idea01Icon,
  Calendar03Icon,
  Grid02Icon,
  BarChartIcon
} from '@hugeicons/core-free-icons';
import { SentimentDataTable } from './SentimentDataTable';
import { DataInfoView } from './DataInfoView';

interface ChartsGridProps {
  records: SentimentRecord[];
  metrics: KPIMetrics | null;
  benchmark: number;
  activeTab: 'overview' | 'divergence' | 'statistics' | 'data_info';
}

// BPS Official Corporate Branding Palette
const BPS_BLUE = '#0095DA';
const BPS_GREEN = '#57B736';
const BPS_ORANGE = '#E77400';
const BPS_RED = '#dc2626';

/**
 * Authentic SVG Custom Boxplot Chart for Visual 8
 * Renders ITB (BPS Blue) vs ITK (BPS Green) Boxplots per Quarter (Q1-Q4)
 * Equipped with Rich Interactive Tooltips & Subtle Front-layered Benchmark Line
 */
const QuarterlyBoxplotChart: React.FC<{
  data: {
    kuartal: string;
    meanITB: number;
    meanITK: number;
    itbStats: { mean: number; median: number; std: number; min: number; max: number; q1: number; q3: number; iqr: number };
    itkStats: { mean: number; median: number; std: number; min: number; max: number; q1: number; q3: number; iqr: number };
  }[];
  benchmark: number;
}> = ({ data, benchmark }) => {
  const [activeTooltip, setActiveTooltip] = React.useState<{
    kuartal: string;
    type: 'ITB' | 'ITK';
    mean: number;
    stats: { mean: number; median: number; std: number; min: number; max: number; q1: number; q3: number; iqr: number };
    xPos: number;
    yPos: number;
  } | null>(null);

  const height = 250;
  const minY = 80;
  const maxY = 130;
  const paddingTop = 15;
  const paddingBottom = 30;
  const plotHeight = height - paddingTop - paddingBottom;

  const yScale = (val: number) => {
    const clamped = Math.max(minY, Math.min(maxY, val));
    return paddingTop + plotHeight * (1 - (clamped - minY) / (maxY - minY));
  };

  const yTicks = [80, 90, 100, 110, 120, 130];
  const benchmarkY = yScale(benchmark);

  return (
    <div className="w-full relative select-none">
      {/* Interactive Tooltip Card Overlay */}
      {activeTooltip && (
        <div
          className="absolute z-30 bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl p-3 shadow-xl pointer-events-none text-xs font-mono transition-all duration-150 animate-in fade-in zoom-in-95"
          style={{
            top: Math.max(10, activeTooltip.yPos - 115),
            left: activeTooltip.xPos > 300 ? activeTooltip.xPos - 195 : activeTooltip.xPos + 25,
            width: '185px'
          }}
        >
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-1.5 mb-1.5 font-heading text-[10.5px] font-bold">
            <span className={activeTooltip.type === 'ITB' ? 'text-[var(--bps-blue)]' : 'text-[var(--bps-green)]'}>
              Kuartal {activeTooltip.kuartal} ({activeTooltip.type})
            </span>
            <span className="text-[var(--muted)]">Detail Boxplot</span>
          </div>

          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">Rata-rata (Mean):</span>
              <span className="font-bold text-[var(--fg)]">{activeTooltip.stats.mean.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">Median (Q2):</span>
              <span className="font-bold text-[var(--fg)]">{activeTooltip.stats.median.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">Maksimum:</span>
              <span className="font-bold text-[var(--fg)]">{activeTooltip.stats.max.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">Kuartil 3 (Q3):</span>
              <span className="font-bold text-[var(--fg)]">{activeTooltip.stats.q3.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">Kuartil 1 (Q1):</span>
              <span className="font-bold text-[var(--fg)]">{activeTooltip.stats.q1.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">Minimum:</span>
              <span className="font-bold text-[var(--fg)]">{activeTooltip.stats.min.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between border-t border-[var(--border)] pt-1 mt-1 text-[9.5px]">
              <span className="text-[var(--muted)]">Rentang IQR:</span>
              <span className="font-bold text-[var(--fg)]">{activeTooltip.stats.iqr.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-end gap-5 mb-2 text-xs font-semibold font-heading">
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded bg-[#0095DA] border border-[#007ab3] inline-block"></span>
          <span className="text-[var(--fg)]">ITB – Indeks Tendensi Bisnis</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded bg-[#57B736] border border-[#439626] inline-block"></span>
          <span className="text-[var(--fg)]">ITK – Indeks Tendensi Konsumen</span>
        </div>
      </div>

      <svg viewBox={`0 0 600 ${height}`} className="w-full h-[250px]">
        {/* Background Gridlines */}
        {yTicks.map(t => {
          const y = yScale(t);
          return (
            <g key={t}>
              <line x1="40" y1={y} x2="580" y2={y} stroke="var(--border)" strokeDasharray="2 2" strokeWidth={1} />
              <text x="32" y={y + 3} textAnchor="end" fontSize="10" fill="var(--muted)" className="font-mono">{t}</text>
            </g>
          );
        })}

        {/* Boxplot Visual Elements */}
        {data.map((item, idx) => {
          const quarterWidth = (540) / 4;
          const xCenter = 40 + idx * quarterWidth + quarterWidth / 2;
          const xItb = xCenter - 14;
          const xItk = xCenter + 14;
          const boxWidth = 18;

          const itbTop = yScale(item.itbStats.q3);
          const itbBottom = yScale(item.itbStats.q1);
          const itbMed = yScale(item.itbStats.median);
          const itbMin = yScale(item.itbStats.min);
          const itbMax = yScale(item.itbStats.max);

          const itkTop = yScale(item.itkStats.q3);
          const itkBottom = yScale(item.itkStats.q1);
          const itkMed = yScale(item.itkStats.median);
          const itkMin = yScale(item.itkStats.min);
          const itkMax = yScale(item.itkStats.max);

          return (
            <g key={item.kuartal}>
              {/* ITB Boxplot (BPS Blue) with Hover Tooltip */}
              <g
                className="transition-all hover:opacity-85 cursor-pointer group"
                onMouseEnter={() => {
                  setActiveTooltip({
                    kuartal: item.kuartal,
                    type: 'ITB',
                    mean: item.meanITB,
                    stats: item.itbStats,
                    xPos: xItb,
                    yPos: itbTop
                  });
                }}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                <line x1={xItb} y1={itbMax} x2={xItb} y2={itbMin} stroke={BPS_BLUE} strokeWidth="1.5" />
                <line x1={xItb - 4} y1={itbMax} x2={xItb + 4} y2={itbMax} stroke={BPS_BLUE} strokeWidth="1.5" />
                <line x1={xItb - 4} y1={itbMin} x2={xItb + 4} y2={itbMin} stroke={BPS_BLUE} strokeWidth="1.5" />
                <rect x={xItb - boxWidth / 2} y={itbTop} width={boxWidth} height={Math.max(2, itbBottom - itbTop)} fill={BPS_BLUE} stroke="#007ab3" strokeWidth="1.5" rx="2" />
                <line x1={xItb - boxWidth / 2} y1={itbMed} x2={xItb + boxWidth / 2} y2={itbMed} stroke="#ffffff" strokeWidth="2" />
                <circle cx={xItb} cy={itbMax - 4} r="2" fill={BPS_BLUE} />
                <circle cx={xItb} cy={itbMin + 4} r="2" fill={BPS_BLUE} />
              </g>

              {/* ITK Boxplot (BPS Green) with Hover Tooltip */}
              <g
                className="transition-all hover:opacity-85 cursor-pointer group"
                onMouseEnter={() => {
                  setActiveTooltip({
                    kuartal: item.kuartal,
                    type: 'ITK',
                    mean: item.meanITK,
                    stats: item.itkStats,
                    xPos: xItk,
                    yPos: itkTop
                  });
                }}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                <line x1={xItk} y1={itkMax} x2={xItk} y2={itkMin} stroke={BPS_GREEN} strokeWidth="1.5" />
                <line x1={xItk - 4} y1={itkMax} x2={xItk + 4} y2={itkMax} stroke={BPS_GREEN} strokeWidth="1.5" />
                <line x1={xItk - 4} y1={itkMin} x2={xItk + 4} y2={itkMin} stroke={BPS_GREEN} strokeWidth="1.5" />
                <rect x={xItk - boxWidth / 2} y={itkTop} width={boxWidth} height={Math.max(2, itkBottom - itkTop)} fill={BPS_GREEN} stroke="#439626" strokeWidth="1.5" rx="2" />
                <line x1={xItk - boxWidth / 2} y1={itkMed} x2={xItk + boxWidth / 2} y2={itkMed} stroke="#ffffff" strokeWidth="2" />
                <circle cx={xItk} cy={itkMax - 5} r="2" fill={BPS_GREEN} />
                <circle cx={xItk} cy={itkMin + 5} r="2" fill={BPS_GREEN} />
              </g>

              <text x={xCenter} y={height - 8} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--fg)" className="font-heading">
                {item.kuartal}
              </text>
            </g>
          );
        })}

        {/* Subtle Front-Layered Neutral Benchmark Line (100) and Soft Label */}
        <line x1="40" y1={benchmarkY} x2="580" y2={benchmarkY} stroke="var(--muted)" strokeDasharray="4 4" strokeWidth="1.2" />
        <text x="575" y={benchmarkY - 4} textAnchor="end" fontSize="9.5" fontWeight="600" fill="var(--muted)" className="font-mono">
          Level Netral (100)
        </text>

        <line x1="40" y1={height - 23} x2="580" y2={height - 23} stroke="var(--border)" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

export const ChartsGrid: React.FC<ChartsGridProps> = ({ records, metrics, benchmark, activeTab }) => {
  if (!records || records.length === 0) {
    return (
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-8 text-center text-[var(--muted)] mb-6 font-body shadow-xs">
        Tidak ada data observasi yang memenuhi kriteria filter.
      </div>
    );
  }

  // 1. Chronological Line Data
  const lineData = [...records].sort((a, b) => (a.Tahun - b.Tahun) || (a.Kuartal_Num - b.Kuartal_Num));

  // 2. Annual Sentiment Data & Annual Extremes
  const annualMap: { [year: number]: { count: number; sumITB: number; sumITK: number } } = {};
  lineData.forEach(r => {
    if (!annualMap[r.Tahun]) {
      annualMap[r.Tahun] = { count: 0, sumITB: 0, sumITK: 0 };
    }
    annualMap[r.Tahun].count += 1;
    annualMap[r.Tahun].sumITB += r.ITB;
    annualMap[r.Tahun].sumITK += r.ITK;
  });

  const annualData = Object.keys(annualMap).map(yrStr => {
    const yr = Number(yrStr);
    const item = annualMap[yr];
    return {
      Tahun: yr,
      ITB: Number((item.sumITB / item.count).toFixed(2)),
      ITK: Number((item.sumITK / item.count).toFixed(2))
    };
  }).sort((a, b) => a.Tahun - b.Tahun);

  let bestItbYear = annualData[0] || { Tahun: 2000, ITB: 118.67, ITK: 115.0 };
  let bestItkYear = annualData[0] || { Tahun: 2002, ITB: 110.0, ITK: 117.66 };
  let worstItbYear = annualData[0] || { Tahun: 2005, ITB: 102.35, ITK: 98.0 };
  let worstItkYear = annualData[0] || { Tahun: 2005, ITB: 102.35, ITK: 95.76 };

  annualData.forEach(item => {
    if (item.ITB > bestItbYear.ITB) bestItbYear = item;
    if (item.ITK > bestItkYear.ITK) bestItkYear = item;
    if (item.ITB < worstItbYear.ITB) worstItbYear = item;
    if (item.ITK < worstItkYear.ITK) worstItkYear = item;
  });

  // 3. Gap & Quadrant Data
  const gapData = lineData.map(r => ({
    Periode: r.Periode,
    Gap: r.Gap_ITB_ITK,
    fill: r.Gap_ITB_ITK >= 0 ? BPS_GREEN : BPS_RED
  }));

  const quadrantData = lineData.map(r => ({
    ...r,
    fill: r.Quadrant === 'Broad Optimism' ? BPS_GREEN :
          r.Quadrant === 'Business-led' ? BPS_BLUE :
          r.Quadrant === 'Consumer-led' ? BPS_ORANGE : BPS_RED
  }));

  // 4. Heatmap Data & Extremes
  const yearsList = Array.from(new Set(lineData.map(r => r.Tahun))).sort((a, b) => a - b);
  const qList = ['Q1', 'Q2', 'Q3', 'Q4'];
  const heatmapMatrix: { [year: number]: { [q: string]: { itb?: number; itk?: number } } } = {};
  
  let minItbRecord = lineData[0];
  let maxItbRecord = lineData[0];
  let minItkRecord = lineData[0];
  let maxItkRecord = lineData[0];

  lineData.forEach(r => {
    if (!heatmapMatrix[r.Tahun]) heatmapMatrix[r.Tahun] = {};
    heatmapMatrix[r.Tahun][r.Kuartal] = { itb: r.ITB, itk: r.ITK };

    if (r.ITB < minItbRecord.ITB) minItbRecord = r;
    if (r.ITB > maxItbRecord.ITB) maxItbRecord = r;
    if (r.ITK < minItkRecord.ITK) minItkRecord = r;
    if (r.ITK > maxItkRecord.ITK) maxItkRecord = r;
  });

  const getHeatmapBlueColor = (val: number | undefined) => {
    if (val === undefined) return 'var(--surface-alt)';
    if (val >= 115) return 'rgba(0, 149, 218, 0.85)';
    if (val >= 105) return 'rgba(0, 149, 218, 0.55)';
    if (val >= 100) return 'rgba(0, 149, 218, 0.30)';
    if (val >= 95) return 'rgba(0, 149, 218, 0.15)';
    return 'rgba(0, 149, 218, 0.08)';
  };

  const getHeatmapGreenColor = (val: number | undefined) => {
    if (val === undefined) return 'var(--surface-alt)';
    if (val >= 115) return 'rgba(87, 183, 54, 0.85)';
    if (val >= 105) return 'rgba(87, 183, 54, 0.55)';
    if (val >= 100) return 'rgba(87, 183, 54, 0.30)';
    if (val >= 95) return 'rgba(87, 183, 54, 0.15)';
    return 'rgba(87, 183, 54, 0.08)';
  };

  // 5. KDE Density Calculations
  const itbArr = lineData.map(r => r.ITB);
  const itkArr = lineData.map(r => r.ITK);
  const gapArr = lineData.map(r => r.Gap_ITB_ITK);

  const allVals = [...itbArr, ...itkArr];
  const minVal = Math.min(...allVals) - 3;
  const maxVal = Math.max(...allVals) + 3;

  const kde = (vals: number[], gridPoint: number) => {
    const n = vals.length;
    if (n === 0) return 0;
    const mean = vals.reduce((a, b) => a + b, 0) / n;
    const std = Math.sqrt(vals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (n - 1 || 1));
    const h = 1.06 * (std || 1) * Math.pow(n, -0.2);
    let sum = 0;
    for (let v of vals) {
      const z = (gridPoint - v) / h;
      sum += Math.exp(-0.5 * z * z);
    }
    return sum / (n * h * Math.sqrt(2 * Math.PI));
  };

  const distributionGrid: { value: number; densityITB: number; densityITK: number }[] = [];
  const steps = 80;
  for (let i = 0; i <= steps; i++) {
    const gPoint = minVal + (i / steps) * (maxVal - minVal);
    distributionGrid.push({
      value: Number(gPoint.toFixed(1)),
      densityITB: Number(kde(itbArr, gPoint).toFixed(4)),
      densityITK: Number(kde(itkArr, gPoint).toFixed(4))
    });
  }

  // 6. Boxplot & Advanced Statistical Calculations
  const getFullStats = (arr: number[]) => {
    const s = [...arr].sort((a, b) => a - b);
    const n = s.length;
    if (n === 0) return { mean: 0, median: 0, std: 0, min: 0, max: 0, q1: 0, q3: 0, iqr: 0 };
    const sum = s.reduce((a, b) => a + b, 0);
    const mean = sum / n;
    const std = Math.sqrt(s.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (n - 1 || 1));
    const min = s[0];
    const max = s[n - 1];

    const getPercentile = (p: number) => {
      const index = (n - 1) * p;
      const lower = Math.floor(index);
      const upper = Math.ceil(index);
      const weight = index - lower;
      return s[lower] * (1 - weight) + s[upper] * weight;
    };

    const q1 = getPercentile(0.25);
    const median = getPercentile(0.50);
    const q3 = getPercentile(0.75);
    const iqr = q3 - q1;

    return {
      mean: Number(mean.toFixed(2)),
      median: Number(median.toFixed(2)),
      std: Number(std.toFixed(2)),
      min: Number(min.toFixed(2)),
      max: Number(max.toFixed(2)),
      q1: Number(q1.toFixed(2)),
      q3: Number(q3.toFixed(2)),
      iqr: Number(iqr.toFixed(2))
    };
  };

  const itbFullStats = getFullStats(itbArr);
  const itkFullStats = getFullStats(itkArr);
  const gapFullStats = getFullStats(gapArr);

  const boxplotQuarterlyData = qList.map(q => {
    const subITB = lineData.filter(r => r.Kuartal === q).map(r => r.ITB);
    const subITK = lineData.filter(r => r.Kuartal === q).map(r => r.ITK);
    
    const meanITBVal = subITB.length > 0 ? (subITB.reduce((a, b) => a + b, 0) / subITB.length) : 0;
    const meanITKVal = subITK.length > 0 ? (subITK.reduce((a, b) => a + b, 0) / subITK.length) : 0;

    return {
      kuartal: q,
      meanITB: Number(meanITBVal.toFixed(2)),
      meanITK: Number(meanITKVal.toFixed(2)),
      itbStats: getFullStats(subITB),
      itkStats: getFullStats(subITK)
    };
  });

  const n = lineData.length;
  const meanItbVal = metrics?.meanITB ?? itbFullStats.mean;
  const meanItkVal = metrics?.meanITK ?? itkFullStats.mean;
  const stdItbVal = metrics?.stdITB ?? itbFullStats.std;
  const stdItkVal = metrics?.stdITK ?? itkFullStats.std;
  const corrVal = metrics?.correlation ?? 0.369;
  const meanGapVal = metrics?.meanGap ?? gapFullStats.mean;
  const itkHigherCount = metrics?.itkHigherCount ?? 48;
  const itbHigherCount = metrics?.itbHigherCount ?? 32;

  const medianItbVal = metrics?.medianITB ?? itbFullStats.median;
  const medianItkVal = metrics?.medianITK ?? itkFullStats.median;

  const boCount = metrics?.quadrantCounts['Broad Optimism'] || 69;
  const blCount = metrics?.quadrantCounts['Business-led'] || 4;
  const clCount = metrics?.quadrantCounts['Consumer-led'] || 4;
  const bpCount = metrics?.quadrantCounts['Broad Pessimism'] || 3;

  return (
    <div className="space-y-6 font-body text-[var(--fg)]">

      {/* ========================================================= */}
      {/* PAGE 1: EXECUTIVE OVERVIEW */}
      {/* ========================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Visual 1: Dinamika Sentimen (Line Chart with Subtle Front Layered Neutral Benchmark Line) */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-5 shadow-xs flex flex-col justify-between">
              <div>
                <h2 className="text-sm font-extrabold text-[var(--fg)] uppercase font-heading">
                  DINAMIKA SENTIMEN BISNIS DAN KONSUMEN INDONESIA
                </h2>
                <p className="text-xs font-medium text-[var(--muted)] mb-3">
                  Pergerakan ITB dan ITK secara kuartalan, 2000 Q2–2020 Q1
                </p>

                <div className="h-[340px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineData} margin={{ top: 10, right: 20, left: -10, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis
                        dataKey="Periode"
                        tickFormatter={(val: string) => val.split(' ')[0]}
                        tick={{ fontSize: 9.5, fill: 'var(--muted)', fontWeight: 600 }}
                        interval={3}
                        angle={0}
                        textAnchor="middle"
                        dy={4}
                        label={{ value: 'Tahun', position: 'insideBottom', offset: -10, fontSize: 11, fontWeight: 700 }}
                      />
                      <YAxis domain={[80, 130]} tick={{ fontSize: 10, fill: 'var(--muted)' }} label={{ value: 'Indeks', angle: -90, position: 'insideLeft', fontSize: 11, fontWeight: 600 }} />
                      <Tooltip
                        wrapperStyle={{ zIndex: 100 }}
                        contentStyle={{ backgroundColor: 'var(--surface-alt)', color: 'var(--fg)', borderRadius: '10px', borderColor: 'var(--border)', fontSize: '11px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)' }}
                        itemStyle={{ color: 'var(--fg)', fontWeight: 600 }}
                        labelStyle={{ color: 'var(--fg)', fontWeight: 700 }}
                        formatter={(val: any) => [Number(val).toFixed(2), 'Indeks']}
                      />
                      <Legend verticalAlign="top" align="left" height={36} wrapperStyle={{ fontSize: '11px', fontWeight: 600, left: 0 }} />
                      <Line type="monotone" dataKey="ITB" name="ITB – Indeks Tendensi Bisnis" stroke={BPS_BLUE} strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                      <Line type="monotone" dataKey="ITK" name="ITK – Indeks Tendensi Konsumen" stroke={BPS_GREEN} strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                      
                      {/* Subtle Front Layered Neutral Benchmark Line (100) */}
                      <ReferenceLine
                        y={benchmark}
                        stroke="var(--muted)"
                        strokeDasharray="4 4"
                        strokeWidth={1.2}
                        label={{
                          value: `Level Netral (${benchmark})`,
                          fill: 'var(--muted)',
                          fontSize: 10,
                          fontWeight: 600,
                          position: 'insideBottomRight'
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Visual 4: Quadrant Map (Subtle Front Layered Benchmark Lines) */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-5 shadow-xs flex flex-col justify-between">
              <div>
                <h2 className="text-sm font-extrabold text-[var(--fg)] uppercase font-heading">
                  PETA KONDISI SENTIMEN BISNIS DAN KONSUMEN
                </h2>
                <p className="text-xs font-medium text-[var(--muted)] mb-2">
                  Klasifikasi kuartal berdasarkan posisi ITB dan ITK terhadap level netral 100
                </p>

                <div className="h-[340px] w-full relative">
                  {/* Top-Left Quadrant Badge: Consumer-led */}
                  <div className="absolute top-4 left-[96px] z-10 bg-[var(--bps-orange)]/10 border border-[var(--bps-orange)]/30 rounded-md px-2 py-1 text-[9.5px] font-bold text-[var(--bps-orange)] leading-snug backdrop-blur-xs shadow-2xs">
                    <div>ITK &gt; 100</div>
                    <div>ITB &lt; 100</div>
                    <div className="mt-1 pt-1 border-t border-[var(--bps-orange)]/30 font-mono">
                      {clCount} Kuartal ({((clCount/n)*100).toFixed(2)}%)
                    </div>
                  </div>

                  {/* Top-Right Quadrant Badge: Broad Optimism */}
                  <div className="absolute top-4 right-7 z-10 bg-[var(--bps-green)]/10 border border-[var(--bps-green)]/30 rounded-md px-2 py-1 text-[9.5px] font-bold text-[var(--bps-green)] leading-snug text-right backdrop-blur-xs shadow-2xs">
                    <div>ITK &gt; 100</div>
                    <div>ITB &gt; 100</div>
                    <div className="mt-1 pt-1 border-t border-[var(--bps-green)]/30 font-mono">
                      {boCount} Kuartal ({((boCount/n)*100).toFixed(2)}%)
                    </div>
                  </div>

                  {/* Bottom-Left Quadrant Badge: Broad Pessimism */}
                  <div className="absolute bottom-[68px] left-[96px] z-10 bg-rose-500/10 border border-rose-500/30 rounded-md px-2 py-1 text-[9.5px] font-bold text-rose-600 dark:text-rose-400 leading-snug backdrop-blur-xs shadow-2xs">
                    <div>ITK &lt; 100</div>
                    <div>ITB &lt; 100</div>
                    <div className="mt-1 pt-1 border-t border-rose-500/30 font-mono">
                      {bpCount} Kuartal ({((bpCount/n)*100).toFixed(2)}%)
                    </div>
                  </div>

                  {/* Bottom-Right Quadrant Badge: Business-led */}
                  <div className="absolute bottom-[68px] right-7 z-10 bg-[var(--bps-blue)]/10 border border-[var(--bps-blue)]/30 rounded-md px-2 py-1 text-[9.5px] font-bold text-[var(--bps-blue)] leading-snug text-right backdrop-blur-xs shadow-2xs">
                    <div>ITK &lt; 100</div>
                    <div>ITB &gt; 100</div>
                    <div className="mt-1 pt-1 border-t border-[var(--bps-blue)]/30 font-mono">
                      {blCount} Kuartal ({((blCount/n)*100).toFixed(2)}%)
                    </div>
                  </div>

                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 15, right: 20, bottom: 25, left: 15 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis type="number" dataKey="ITB" name="ITB" domain={[75, 135]} tick={{ fontSize: 10, fill: 'var(--muted)' }} label={{ value: 'ITB', position: 'insideBottom', offset: -10, fontSize: 11, fontWeight: 700 }} />
                      <YAxis type="number" dataKey="ITK" name="ITK" domain={[75, 135]} tick={{ fontSize: 10, fill: 'var(--muted)' }} label={{ value: 'ITK', angle: -90, position: 'insideLeft', fontSize: 11, fontWeight: 600 }} />
                      <ZAxis type="number" range={[45, 45]} />
                      <Tooltip
                        wrapperStyle={{ zIndex: 100 }}
                        contentStyle={{ backgroundColor: 'var(--surface-alt)', color: 'var(--fg)', borderRadius: '10px', borderColor: 'var(--border)', fontSize: '11px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)' }}
                        itemStyle={{ color: 'var(--fg)', fontWeight: 600 }}
                        labelStyle={{ color: 'var(--fg)', fontWeight: 700 }}
                      />
                      <Scatter name="Kuartal Observasi" data={quadrantData}>
                        {quadrantData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Scatter>

                      {/* Subtle Front Layered Benchmark Lines (100) */}
                      <ReferenceLine x={benchmark} stroke="var(--muted)" strokeDasharray="4 4" strokeWidth={1.2} />
                      <ReferenceLine y={benchmark} stroke="var(--muted)" strokeDasharray="4 4" strokeWidth={1.2} />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-5 shadow-xs flex flex-col justify-between">
              <h2 className="text-xs font-extrabold text-[var(--fg)] uppercase mb-4 tracking-wider font-heading">
                RINGKASAN INSIGHT UTAMA
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--bps-blue)]/10 text-[var(--bps-blue)] flex items-center justify-center shrink-0">
                    <HugeiconsIcon icon={ChartIncreaseIcon} size={22} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[var(--fg)] font-heading">Optimisme Dominan</h3>
                    <p className="text-[11px] text-[var(--muted)] leading-relaxed mt-0.5">
                      ITB dan ITK secara umum berada di atas level netral 100. 86,25% kuartal menunjukkan kondisi optimistis secara simultan.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--bps-green)]/10 text-[var(--bps-green)] flex items-center justify-center shrink-0">
                    <HugeiconsIcon icon={UserGroupIcon} size={22} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[var(--fg)] font-heading">Konsumen Lebih Optimistis</h3>
                    <p className="text-[11px] text-[var(--muted)] leading-relaxed mt-0.5">
                      Rata-rata ITK ({meanItkVal.toFixed(2).replace('.', ',')}) lebih tinggi daripada ITB ({meanItbVal.toFixed(2).replace('.', ',')}). ITK juga lebih volatil dengan std. dev. {stdItkVal.toFixed(2).replace('.', ',')} vs {stdItbVal.toFixed(2).replace('.', ',')}.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <HugeiconsIcon icon={TradeUpIcon} size={22} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[var(--fg)] font-heading">Korelasi Moderat</h3>
                    <p className="text-[11px] text-[var(--muted)] leading-relaxed mt-0.5">
                      Korelasi ITB-ITK sebesar {corrVal.toFixed(3).replace('.', ',')} menunjukkan hubungan positif, namun tidak selalu bergerak searah.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--bps-orange)]/10 text-[var(--bps-orange)] flex items-center justify-center shrink-0">
                    <HugeiconsIcon icon={ChartIncreaseIcon} size={22} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[var(--fg)] font-heading">Divergensi Terjadi</h3>
                    <p className="text-[11px] text-[var(--muted)] leading-relaxed mt-0.5">
                      ITK lebih tinggi daripada ITB pada {((itkHigherCount/n)*100).toFixed(0)}% kuartal. Terdapat periode dengan perbedaan ekstrem di kedua arah.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 100% Centered Key Insight Executive Overview Card */}
            <div className="lg:col-span-5 bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-5 shadow-xs flex flex-col justify-between">
              <h2 className="text-xs font-extrabold text-[var(--fg)] uppercase tracking-wider font-heading mb-2">
                KEY INSIGHT EXECUTIVE OVERVIEW
              </h2>

              <div className="flex-1 flex items-center justify-center py-3">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center shrink-0 shadow-md">
                    <HugeiconsIcon icon={Idea01Icon} size={26} />
                  </div>
                  <p className="text-xs font-medium text-[var(--fg)] leading-relaxed flex-1">
                    Indonesia secara umum berada dalam kondisi sentimen positif, dengan konsumen cenderung lebih optimistis daripada bisnis. Namun, sentimen konsumen lebih volatil dan tidak selalu bergerak searah dengan sentimen bisnis, yang terlihat dari korelasi moderat dan divergensi pada banyak periode.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* PAGE 2: SENTIMENT DIVERGENCE */}
      {/* ========================================================= */}
      {activeTab === 'divergence' && (
        <div className="space-y-6 animate-in fade-in duration-300">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Visual 1: Gap Bar Chart with High-Contrast Dark-Mode Ready Enterprise Tooltip */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-5 shadow-xs flex flex-col justify-between relative">
              <div>
                <h2 className="text-sm font-extrabold text-[var(--fg)] uppercase font-heading">
                  DIVERGENSI SENTIMEN BISNIS DAN KONSUMEN
                </h2>
                <p className="text-xs font-medium text-[var(--muted)] mb-3">
                  Selisih ITB − ITK per kuartal (positif = ITB lebih tinggi)
                </p>

                <div className="absolute top-4 right-4 bg-[var(--surface-alt)] border border-[var(--border)] rounded-lg p-2 text-[10px] font-mono font-bold text-[var(--fg)] space-y-1 shadow-2xs z-10">
                  <div className="flex items-center justify-between gap-3 text-[var(--muted)] border-b border-[var(--border)] pb-1">
                    <span>Mean Gap (ITB − ITK)</span>
                    <span className="text-[var(--fg)]">{meanGapVal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-rose-600 dark:text-rose-400">
                    <span>ITK &gt; ITB (Negatif)</span>
                    <span>{itkHigherCount} Kuartal ({((itkHigherCount/n)*100).toFixed(2).replace('.', ',')}%)</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-[var(--bps-green)]">
                    <span>ITB &gt; ITK (Positif)</span>
                    <span>{itbHigherCount} Kuartal ({((itbHigherCount/n)*100).toFixed(2).replace('.', ',')}%)</span>
                  </div>
                </div>

                <div className="h-[340px] w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={gapData} margin={{ top: 10, right: 15, left: -30, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis
                        dataKey="Periode"
                        tickFormatter={(val: string) => val.split(' ')[0]}
                        tick={{ fontSize: 9.5, fill: 'var(--muted)', fontWeight: 600 }}
                        interval={3}
                        angle={0}
                        textAnchor="middle"
                        dy={4}
                        label={{ value: 'Tahun', position: 'insideBottom', offset: -10, fontSize: 11, fontWeight: 700 }}
                      />
                      <YAxis domain={[-30, 20]} tick={{ fontSize: 10, fill: 'var(--muted)' }} label={{ value: 'Gap (ITB − ITK)', angle: -90, position: 'insideLeft', offset: 10, fontSize: 11, fontWeight: 600 }} />
                      <Tooltip
                        wrapperStyle={{ zIndex: 100 }}
                        contentStyle={{
                          backgroundColor: 'var(--surface-alt)',
                          color: 'var(--fg)',
                          borderRadius: '10px',
                          borderColor: 'var(--border)',
                          fontSize: '11.5px',
                          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.35)',
                          padding: '8px 12px'
                        }}
                        itemStyle={{ color: 'var(--fg)', fontWeight: 600, padding: '2px 0' }}
                        labelStyle={{ color: 'var(--fg)', fontWeight: 700, marginBottom: '4px' }}
                        formatter={(val: any) => {
                          const num = Number(val);
                          const formattedNum = num > 0 ? `+${num.toFixed(2).replace('.', ',')}` : num.toFixed(2).replace('.', ',');
                          return [
                            <span style={{ color: num >= 0 ? BPS_GREEN : BPS_RED, fontWeight: 700 }}>
                              {formattedNum} poin
                            </span>,
                            'Selisih (ITB - ITK)'
                          ];
                        }}
                      />
                      <Bar dataKey="Gap" name="Selisih ITB - ITK" radius={0}>
                        {gapData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>

                      {/* Subtle Front Layered Baseline 0 Line */}
                      <ReferenceLine y={0} stroke="var(--muted)" strokeWidth={1.2} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Visual 2: Annual Sentiment Grouped Bar Chart (Subtle Front Layered Benchmark Line) */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-5 shadow-xs flex flex-col justify-between relative">
              <div>
                <h2 className="text-sm font-extrabold text-[var(--fg)] uppercase font-heading">
                  PERUBAHAN SENTIMEN EKONOMI DARI TAHUN KE TAHUN
                </h2>
                <p className="text-xs font-medium text-[var(--muted)] mb-3">
                  Rata-rata tahunan ITB dan ITK
                </p>

                <div className="absolute top-4 right-4 bg-[var(--surface-alt)] border border-[var(--border)] rounded-lg p-2 text-[10px] font-mono font-bold text-[var(--fg)] space-y-1 shadow-2xs z-10">
                  <div className="text-[10px] font-extrabold text-[var(--muted)] uppercase border-b border-[var(--border)] pb-0.5 font-heading">
                    Tahun Penting
                  </div>
                  <div className="flex items-center justify-between gap-2 text-[var(--bps-blue)]">
                    <span>▲ Puncak ITB</span>
                    <span>: {bestItbYear.Tahun} ({bestItbYear.ITB.toFixed(2).replace('.', ',')})</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 text-[var(--bps-green)]">
                    <span>▲ Puncak ITK</span>
                    <span>: {bestItkYear.Tahun} ({bestItkYear.ITK.toFixed(2).replace('.', ',')})</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 text-rose-600 dark:text-rose-400">
                    <span>▼ Terendah ITB</span>
                    <span>: {worstItbYear.Tahun} ({worstItbYear.ITB.toFixed(2).replace('.', ',')})</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 text-rose-600 dark:text-rose-400">
                    <span>▼ Terendah ITK</span>
                    <span>: {worstItkYear.Tahun} ({worstItkYear.ITK.toFixed(2).replace('.', ',')})</span>
                  </div>
                </div>

                <div className="h-[340px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={annualData} margin={{ top: 10, right: 15, left: -30, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="Tahun" tick={{ fontSize: 10, fill: 'var(--muted)' }} label={{ value: 'Tahun', position: 'insideBottom', offset: -10, fontSize: 11, fontWeight: 600 }} />
                      <YAxis domain={[80, 130]} tick={{ fontSize: 10, fill: 'var(--muted)' }} label={{ value: 'Indeks', angle: -90, position: 'insideLeft', offset: 10, fontSize: 11, fontWeight: 600 }} />
                      <Tooltip
                        wrapperStyle={{ zIndex: 100 }}
                        contentStyle={{ backgroundColor: 'var(--surface-alt)', color: 'var(--fg)', borderRadius: '10px', borderColor: 'var(--border)', fontSize: '11.5px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.35)' }}
                        itemStyle={{ color: 'var(--fg)', fontWeight: 600 }}
                        labelStyle={{ color: 'var(--fg)', fontWeight: 700 }}
                        formatter={(val: any) => [Number(val).toFixed(2), 'Rata-rata Indeks']}
                      />
                      <Legend
                        verticalAlign="top"
                        align="left"
                        height={36}
                        wrapperStyle={{ fontSize: '11px', fontWeight: 600, left: 0 }}
                      />
                      <Bar dataKey="ITB" name="ITB – Indeks Tendensi Bisnis" fill={BPS_BLUE} radius={0} />
                      <Bar dataKey="ITK" name="ITK – Indeks Tendensi Konsumen" fill={BPS_GREEN} radius={0} />
                      
                      {/* Subtle Front Layered Neutral Benchmark Line (100) */}
                      <ReferenceLine
                        y={benchmark}
                        stroke="var(--muted)"
                        strokeDasharray="4 4"
                        strokeWidth={1.2}
                        label={{
                          value: `Level Netral (${benchmark})`,
                          fill: 'var(--muted)',
                          fontSize: 10,
                          fontWeight: 600,
                          position: 'insideBottomRight'
                        }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Visual 3: Heatmap ITB (100% Fit, Table Fixed, Zero Horizontal Scroll Required) */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-5 shadow-xs flex flex-col justify-between">
              <div>
                <h2 className="text-sm font-extrabold text-[var(--fg)] uppercase mb-1 font-heading">
                  PETA INTENSITAS SENTIMEN BISNIS (ITB)
                </h2>
                <p className="text-xs font-medium text-[var(--muted)] mb-3">
                  Heatmap intensitas ITB berdasarkan tahun dan kuartal
                </p>

                <div className="w-full">
                  <table className="w-full text-center border-collapse table-fixed select-none">
                    <thead>
                      <tr className="bg-[var(--surface-alt)] border-b border-[var(--border)] font-heading">
                        <th className="w-10 p-1 font-semibold text-[var(--fg)] text-[10px]">Qtr</th>
                        {yearsList.map(yr => (
                          <th key={yr} className="p-0.5 font-semibold text-[var(--fg)] text-[8.5px] font-mono tracking-tighter" title={`Tahun ${yr}`}>
                            {String(yr).slice(-2)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {qList.map(q => (
                        <tr key={q} className="border-b border-[var(--border-light)]">
                          <td className="w-10 p-1 font-bold font-mono text-[var(--fg)] text-[10px] bg-[var(--surface-alt)]">{q}</td>
                          {yearsList.map(yr => {
                            const val = heatmapMatrix[yr]?.[q]?.itb;
                            return (
                              <td
                                key={yr}
                                style={{ backgroundColor: getHeatmapBlueColor(val) }}
                                className="p-0.5 text-[var(--fg)] font-mono font-bold text-[9px] truncate"
                                title={`Tahun ${yr} ${q}: ${val !== undefined ? val.toFixed(2).replace('.', ',') : '-'}`}
                              >
                                {val !== undefined ? Math.round(val) : '-'}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border)] space-y-2 text-xs text-[var(--muted)] font-body">
                  <div className="flex items-center justify-between text-[10px] font-semibold font-mono">
                    <span>Rendah (95,12)</span>
                    <div className="flex-1 mx-3 h-2 rounded-full bg-gradient-to-r from-sky-100 via-sky-400 to-[#0095DA]"></div>
                    <span>Level Netral (100)</span>
                    <div className="flex-1 mx-3 h-2 rounded-full bg-gradient-to-r from-[#0095DA] to-blue-900"></div>
                    <span>Tinggi (122,50)</span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-[11px] font-medium pt-1 gap-2">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--bps-blue)]"></span> Minimum ITB: <strong className="font-mono">{minItbRecord.ITB.toFixed(2).replace('.', ',')} ({minItbRecord.Periode})</strong></span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--bps-blue)]"></span> Maksimum ITB: <strong className="font-mono">{maxItbRecord.ITB.toFixed(2).replace('.', ',')} ({maxItbRecord.Periode})</strong></span>
                  </div>
                  <p className="text-[10px] italic text-[var(--muted)]">
                    (i) ITB relatif lebih stabil dibanding ITK (Std. Dev. {stdItbVal.toFixed(2).replace('.', ',')})
                  </p>
                </div>
              </div>
            </div>

            {/* Visual 4: Heatmap ITK (100% Fit, Table Fixed, Zero Horizontal Scroll Required) */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-5 shadow-xs flex flex-col justify-between">
              <div>
                <h2 className="text-sm font-extrabold text-[var(--fg)] uppercase mb-1 font-heading">
                  PETA INTENSITAS SENTIMEN KONSUMEN (ITK)
                </h2>
                <p className="text-xs font-medium text-[var(--muted)] mb-3">
                  Heatmap intensitas ITK berdasarkan tahun dan kuartal
                </p>

                <div className="w-full">
                  <table className="w-full text-center border-collapse table-fixed select-none">
                    <thead>
                      <tr className="bg-[var(--surface-alt)] border-b border-[var(--border)] font-heading">
                        <th className="w-10 p-1 font-semibold text-[var(--fg)] text-[10px]">Qtr</th>
                        {yearsList.map(yr => (
                          <th key={yr} className="p-0.5 font-semibold text-[var(--fg)] text-[8.5px] font-mono tracking-tighter" title={`Tahun ${yr}`}>
                            {String(yr).slice(-2)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {qList.map(q => (
                        <tr key={q} className="border-b border-[var(--border-light)]">
                          <td className="w-10 p-1 font-bold font-mono text-[var(--fg)] text-[10px] bg-[var(--surface-alt)]">{q}</td>
                          {yearsList.map(yr => {
                            const val = heatmapMatrix[yr]?.[q]?.itk;
                            return (
                              <td
                                key={yr}
                                style={{ backgroundColor: getHeatmapGreenColor(val) }}
                                className="p-0.5 text-[var(--fg)] font-mono font-bold text-[9px] truncate"
                                title={`Tahun ${yr} ${q}: ${val !== undefined ? val.toFixed(2).replace('.', ',') : '-'}`}
                              >
                                {val !== undefined ? Math.round(val) : '-'}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border)] space-y-2 text-xs text-[var(--muted)] font-body">
                  <div className="flex items-center justify-between text-[10px] font-semibold font-mono">
                    <span>Rendah (93,20)</span>
                    <div className="flex-1 mx-3 h-2 rounded-full bg-gradient-to-r from-emerald-100 via-emerald-400 to-[#57B736]"></div>
                    <span>Level Netral (100)</span>
                    <div className="flex-1 mx-3 h-2 rounded-full bg-gradient-to-r from-[#57B736] to-emerald-900"></div>
                    <span>Tinggi (125,68)</span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-[11px] font-medium pt-1 gap-2">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--bps-green)]"></span> Minimum ITK: <strong className="font-mono">{minItkRecord.ITK.toFixed(2).replace('.', ',')} ({minItkRecord.Periode})</strong></span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--bps-green)]"></span> Maksimum ITK: <strong className="font-mono">{maxItkRecord.ITK.toFixed(2).replace('.', ',')} ({maxItkRecord.Periode})</strong></span>
                  </div>
                  <p className="text-[10px] italic text-[var(--muted)]">
                    (i) ITK lebih volatil dibanding ITB (Std. Dev. {stdItkVal.toFixed(2).replace('.', ',')})
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* INSIGHT DIVERGENCE Card with Crisp Vertical Border Dividers & Clean Title (No Title Icon) */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            
            {/* Left Title Column (Clean Text, No Icon, Crisp Right Border) */}
            <div className="lg:w-40 shrink-0 lg:border-r lg:border-[var(--border)] lg:pr-5">
              <h2 className="text-xs font-extrabold text-[var(--fg)] uppercase tracking-wider font-heading leading-tight mb-1">
                INSIGHT DIVERGENCE
              </h2>
              <p className="text-[10px] text-[var(--muted)] leading-normal hidden lg:block">
                Analisis 5 poin utama dinamika selisih sentimen.
              </p>
            </div>

            {/* Right Items Grid (5 Items Sejajar with Crisp Dividers) */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-0">
              
              {/* Item 1 */}
              <div className="flex items-start gap-3 lg:pr-4 lg:border-r lg:border-[var(--border)]">
                <div className="w-9 h-9 rounded-full bg-[var(--bps-green)]/10 text-[var(--bps-green)] flex items-center justify-center shrink-0">
                  <HugeiconsIcon icon={ChartIncreaseIcon} size={20} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[var(--fg)] font-heading leading-tight pt-1">
                    ITK Lebih Sering Lebih Tinggi
                  </h3>
                  <p className="text-[11px] text-[var(--muted)] leading-relaxed mt-1">
                    ITK lebih tinggi daripada ITB pada {itkHigherCount} dari {n} kuartal ({((itkHigherCount/n)*100).toFixed(0)}%). Konsumen cenderung lebih optimistis.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-3 lg:px-4 lg:border-r lg:border-[var(--border)]">
                <div className="w-9 h-9 rounded-full bg-[var(--bps-blue)]/10 text-[var(--bps-blue)] flex items-center justify-center shrink-0">
                  <HugeiconsIcon icon={TradeUpIcon} size={20} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[var(--fg)] font-heading leading-tight pt-1">
                    Divergensi Ekstrem
                  </h3>
                  <p className="text-[11px] text-[var(--muted)] leading-relaxed mt-1">
                    Perbedaan terbesar terjadi pada 2001 Q4 (-24,16 poin) ketika ITK jauh di atas ITB, dan 2008 Q2 (+17,88 poin) ketika ITB jauh di atas ITK.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-3 lg:px-4 lg:border-r lg:border-[var(--border)]">
                <div className="w-9 h-9 rounded-full bg-[var(--bps-orange)]/10 text-[var(--bps-orange)] flex items-center justify-center shrink-0">
                  <HugeiconsIcon icon={Calendar03Icon} size={20} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[var(--fg)] font-heading leading-tight pt-1">
                    Tahun Tertekan: 2005
                  </h3>
                  <p className="text-[11px] text-[var(--muted)] leading-relaxed mt-1">
                    Tahun 2005 menjadi titik terendah bagi kedua indeks, terutama ITK (95,76) yang berada di bawah level netral 100.
                  </p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex items-start gap-3 lg:px-4 lg:border-r lg:border-[var(--border)]">
                <div className="w-9 h-9 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <HugeiconsIcon icon={Grid02Icon} size={20} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[var(--fg)] font-heading leading-tight pt-1">
                    ITK Lebih Volatil
                  </h3>
                  <p className="text-[11px] text-[var(--muted)] leading-relaxed mt-1">
                    Heatmap menunjukkan warna ITK lebih bervariasi dengan ekstrem tinggi dan rendah yang lebih sering.
                  </p>
                </div>
              </div>

              {/* Item 5 (Last item, no right border) */}
              <div className="flex items-start gap-3 lg:pl-4">
                <div className="w-9 h-9 rounded-full bg-[var(--bps-green)]/10 text-[var(--bps-green)] flex items-center justify-center shrink-0">
                  <HugeiconsIcon icon={UserGroupIcon} size={20} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[var(--fg)] font-heading leading-tight pt-1">
                    Pola Pasca 2016
                  </h3>
                  <p className="text-[11px] text-[var(--muted)] leading-relaxed mt-1">
                    Sentimen kedua indeks cenderung membaik setelah 2016 dengan ITK konsisten berada di atas level ITB pada banyak periode.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* PAGE 3: STATISTICAL PROFILE */}
      {/* ========================================================= */}
      {activeTab === 'statistics' && (
        <div className="space-y-6 animate-in fade-in duration-300">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

            {/* Visual 7: KDE Density Distribution Area Chart (Subtle Front Layered Benchmark Line) */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-5 shadow-xs flex flex-col justify-between h-full relative">
              <div>
                <h2 className="text-sm font-extrabold text-[var(--fg)] uppercase font-heading">
                  DISTRIBUSI SENTIMEN BISNIS DAN KONSUMEN
                </h2>
                <p className="text-xs font-medium text-[var(--muted)] mb-3">
                  Perbandingan distribusi (KDE) ITB dan ITK
                </p>

                <div className="absolute top-4 right-4 bg-[var(--surface-alt)] border border-[var(--border)] rounded-lg p-2 text-[10px] font-mono font-bold text-[var(--fg)] space-y-0.5 shadow-2xs z-10">
                  <div className="text-[10px] font-extrabold text-[var(--muted)] uppercase border-b border-[var(--border)] pb-0.5 font-heading">
                    RINGKASAN
                  </div>
                  <div className="flex items-center justify-between gap-3 text-[var(--bps-blue)]">
                    <span className="text-[var(--muted)]">Mean ITB</span>
                    <span>{meanItbVal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-[var(--bps-green)]">
                    <span className="text-[var(--muted)]">Mean ITK</span>
                    <span>{meanItkVal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-[var(--bps-blue)]">
                    <span className="text-[var(--muted)]">Median ITB</span>
                    <span>{medianItbVal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-[var(--bps-green)]">
                    <span className="text-[var(--muted)]">Median ITK</span>
                    <span>{medianItkVal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-[var(--bps-blue)]">
                    <span className="text-[var(--muted)]">Std. Dev. ITB</span>
                    <span>{stdItbVal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-[var(--bps-green)]">
                    <span className="text-[var(--muted)]">Std. Dev. ITK</span>
                    <span>{stdItkVal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-[var(--bps-blue)]">
                    <span className="text-[var(--muted)]">Min ITB</span>
                    <span>{minItbRecord.ITB.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-[var(--bps-blue)]">
                    <span className="text-[var(--muted)]">Max ITB</span>
                    <span>{maxItbRecord.ITB.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-[var(--bps-green)]">
                    <span className="text-[var(--muted)]">Min ITK</span>
                    <span>{minItkRecord.ITK.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-[var(--bps-green)]">
                    <span className="text-[var(--muted)]">Max ITK</span>
                    <span>{maxItkRecord.ITK.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>

                <div className="h-[330px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={distributionGrid} margin={{ top: 25, right: 20, left: -10, bottom: 5 }}>
                      <defs>
                        <linearGradient id="kdeGradientITB" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0095DA" stopOpacity={0.65} />
                          <stop offset="100%" stopColor="#0095DA" stopOpacity={0.12} />
                        </linearGradient>
                        <linearGradient id="kdeGradientITK" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#57B736" stopOpacity={0.65} />
                          <stop offset="100%" stopColor="#57B736" stopOpacity={0.12} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis
                        type="number"
                        dataKey="value"
                        domain={[90, 130]}
                        ticks={[90, 95, 100, 105, 110, 115, 120, 125, 130]}
                        tick={{ fontSize: 10, fill: 'var(--muted)' }}
                        label={{ value: 'Indeks', position: 'insideBottom', offset: 0, fontSize: 11, fontWeight: 700 }}
                      />
                      <YAxis
                        domain={[0, 0.15]}
                        ticks={[0, 0.03, 0.06, 0.09, 0.12, 0.15]}
                        tickFormatter={(val: number) => val.toFixed(2).replace('.', ',')}
                        tick={{ fontSize: 10, fill: 'var(--muted)' }}
                        label={{ value: 'Kepadatan', angle: -90, position: 'insideLeft', fontSize: 11, fontWeight: 600 }}
                      />
                      <Tooltip
                        wrapperStyle={{ zIndex: 100 }}
                        contentStyle={{ backgroundColor: 'var(--surface-alt)', color: 'var(--fg)', borderRadius: '10px', borderColor: 'var(--border)', fontSize: '11px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)' }}
                        itemStyle={{ color: 'var(--fg)', fontWeight: 600 }}
                        labelStyle={{ color: 'var(--fg)', fontWeight: 700 }}
                      />
                      <Legend
                        verticalAlign="top"
                        align="left"
                        height={36}
                        wrapperStyle={{ fontSize: '11px', fontWeight: 600, left: 0 }}
                      />
                      <Area type="monotone" dataKey="densityITB" name="ITB – Indeks Tendensi Bisnis" stroke={BPS_BLUE} strokeWidth={2} fillOpacity={1} fill="url(#kdeGradientITB)" />
                      <Area type="monotone" dataKey="densityITK" name="ITK – Indeks Tendensi Konsumen" stroke={BPS_GREEN} strokeWidth={2} fillOpacity={1} fill="url(#kdeGradientITK)" />

                      {/* Subtle Front Layered Neutral Benchmark Line (100) */}
                      <ReferenceLine
                        x={100}
                        stroke="var(--muted)"
                        strokeDasharray="4 4"
                        strokeWidth={1.2}
                        label={{
                          value: 'Level Netral (100)',
                          position: 'insideTopLeft',
                          fill: 'var(--muted)',
                          fontSize: 10,
                          fontWeight: 600,
                          dy: 5
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Seamless Bottom Key Insight Box */}
              <div className="mt-3 pt-3 border-t border-[var(--border)] bg-[var(--surface-alt)] p-3 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <HugeiconsIcon icon={Idea01Icon} size={22} />
                </div>
                <p className="text-xs text-[var(--fg)] leading-relaxed font-medium">
                  <strong>KEY INSIGHT:</strong> ITK memiliki pusat distribusi yang lebih tinggi (lebih optimistis) namun penyebarannya lebih lebar (lebih volatil) dibandingkan ITB.
                </p>
              </div>
            </div>

            {/* Visual 8: Authentic Custom SVG Boxplot Quarterly (Fit 100% Zero White Gap & Interactive Tooltip) */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-5 shadow-xs flex flex-col justify-between h-full relative">
              <div>
                <h2 className="text-sm font-extrabold text-[var(--fg)] uppercase font-heading">
                  VARIASI SENTIMEN BERDASARKAN KUARTAL
                </h2>
                <p className="text-xs font-medium text-[var(--muted)] mb-3">
                  Distribusi ITB dan ITK pada Q1 hingga Q4 (Boxplot)
                </p>

                <QuarterlyBoxplotChart data={boxplotQuarterlyData} benchmark={benchmark} />

                <div className="grid grid-cols-4 gap-2 bg-[var(--surface-alt)] p-2.5 rounded-xl border border-[var(--border)] mt-2">
                  {boxplotQuarterlyData.map(item => (
                    <div key={item.kuartal} className="text-center font-mono text-[10px] space-y-0.5 font-bold">
                      <div className="text-[var(--bps-blue)]">Mean ITB: {item.meanITB.toFixed(2).replace('.', ',')}</div>
                      <div className="text-[var(--bps-green)]">Mean ITK: {item.meanITK.toFixed(2).replace('.', ',')}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seamless Bottom Key Insight Box */}
              <div className="mt-3 pt-3 border-t border-[var(--border)] bg-[var(--surface-alt)] p-3 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--bps-green)] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <HugeiconsIcon icon={Idea01Icon} size={22} />
                </div>
                <p className="text-xs text-[var(--fg)] leading-relaxed font-medium">
                  <strong>KEY INSIGHT:</strong> Q2 cenderung menjadi kuartal dengan sentimen tertinggi untuk kedua indikator, sedangkan Q1 adalah yang terendah.
                </p>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            <div className="lg:col-span-7 bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-5 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <h2 className="text-sm font-extrabold text-[var(--fg)] uppercase font-heading">
                  GAMBARAN UMUM STATISTIK SENTIMEN EKONOMI INDONESIA
                </h2>
                <p className="text-xs font-medium text-[var(--muted)] mb-3">
                  Ringkasan statistik utama selama periode 2000 Q2–2020 Q1 (80 observasi)
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-center border-collapse">
                    <thead>
                      <tr className="bg-[var(--surface-alt)] text-[var(--fg)] border-b border-[var(--border)] font-heading">
                        <th className="p-2 font-bold text-left">Indikator</th>
                        <th className="p-2 font-bold">Mean</th>
                        <th className="p-2 font-bold">Median</th>
                        <th className="p-2 font-bold">Std. Dev.</th>
                        <th className="p-2 font-bold">Min</th>
                        <th className="p-2 font-bold">Max</th>
                        <th className="p-2 font-bold">Q1 (25%)</th>
                        <th className="p-2 font-bold">Q3 (75%)</th>
                        <th className="p-2 font-bold">IQR</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-light)] font-mono text-[var(--fg)]">
                      <tr>
                        <td className="p-2 font-sans font-bold text-left text-[var(--bps-blue)]">ITB</td>
                        <td className="p-2 font-bold">{itbFullStats.mean.toFixed(2).replace('.', ',')}</td>
                        <td className="p-2">{itbFullStats.median.toFixed(2).replace('.', ',')}</td>
                        <td className="p-2">{itbFullStats.std.toFixed(2).replace('.', ',')}</td>
                        <td className="p-2">{itbFullStats.min.toFixed(2).replace('.', ',')}</td>
                        <td className="p-2">{itbFullStats.max.toFixed(2).replace('.', ',')}</td>
                        <td className="p-2">{itbFullStats.q1.toFixed(2).replace('.', ',')}</td>
                        <td className="p-2">{itbFullStats.q3.toFixed(2).replace('.', ',')}</td>
                        <td className="p-2">{itbFullStats.iqr.toFixed(2).replace('.', ',')}</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-sans font-bold text-left text-[var(--bps-green)]">ITK</td>
                        <td className="p-2 font-bold">{itkFullStats.mean.toFixed(2).replace('.', ',')}</td>
                        <td className="p-2">{itkFullStats.median.toFixed(2).replace('.', ',')}</td>
                        <td className="p-2">{itkFullStats.std.toFixed(2).replace('.', ',')}</td>
                        <td className="p-2">{itkFullStats.min.toFixed(2).replace('.', ',')}</td>
                        <td className="p-2">{itkFullStats.max.toFixed(2).replace('.', ',')}</td>
                        <td className="p-2">{itkFullStats.q1.toFixed(2).replace('.', ',')}</td>
                        <td className="p-2">{itkFullStats.q3.toFixed(2).replace('.', ',')}</td>
                        <td className="p-2">{itkFullStats.iqr.toFixed(2).replace('.', ',')}</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-sans font-bold text-left text-[var(--bps-orange)]">GAP (ITB−ITK)</td>
                        <td className="p-2 font-bold">{gapFullStats.mean.toFixed(2).replace('.', ',')}</td>
                        <td className="p-2">{gapFullStats.median.toFixed(2).replace('.', ',')}</td>
                        <td className="p-2">{gapFullStats.std.toFixed(2).replace('.', ',')}</td>
                        <td className="p-2">{gapFullStats.min.toFixed(2).replace('.', ',')}</td>
                        <td className="p-2">+{gapFullStats.max.toFixed(2).replace('.', ',')}</td>
                        <td className="p-2">{gapFullStats.q1.toFixed(2).replace('.', ',')}</td>
                        <td className="p-2">{gapFullStats.q3.toFixed(2).replace('.', ',')}</td>
                        <td className="p-2">{gapFullStats.iqr.toFixed(2).replace('.', ',')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                      <HugeiconsIcon icon={BarChartIcon} size={22} />
                    </div>
                    <div>
                      <div className="text-[10px] font-extrabold text-[var(--muted)] uppercase font-heading">KORELASI</div>
                      <div className="text-lg font-extrabold text-[var(--fg)] font-mono tabular-nums leading-tight">{corrVal.toFixed(3).replace('.', ',')}</div>
                      <div className="text-[9px] font-semibold text-slate-500">Korelasi Positif Moderat</div>
                    </div>
                  </div>

                  <div className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--bps-orange)]/10 text-[var(--bps-orange)] flex items-center justify-center shrink-0">
                      <HugeiconsIcon icon={TradeUpIcon} size={22} />
                    </div>
                    <div>
                      <div className="text-[10px] font-extrabold text-[var(--muted)] uppercase font-heading">DIVERGENSI</div>
                      <div className="text-[11px] font-bold text-[var(--bps-green)] font-mono">ITK &gt; ITB: {itkHigherCount} Kuartal (60,00%)</div>
                      <div className="text-[11px] font-bold text-[var(--bps-blue)] font-mono">ITB &gt; ITK: {itbHigherCount} Kuartal (40,00%)</div>
                    </div>
                  </div>

                  <div className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--bps-green)]/10 text-[var(--bps-green)] flex items-center justify-center shrink-0">
                      <HugeiconsIcon icon={ChartIncreaseIcon} size={22} />
                    </div>
                    <div>
                      <div className="text-[10px] font-extrabold text-[var(--muted)] uppercase font-heading">KONDISI UMUM</div>
                      <div className="text-[11px] font-bold text-[var(--bps-green)] font-mono">Broad Optimism: {boCount} Kuartal (86,25%)</div>
                      <div className="text-[11px] font-bold text-rose-600 dark:text-rose-400 font-mono">Kedua Indikator &lt; 100: {bpCount} Kuartal (3,75%)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-5 shadow-xs flex flex-col justify-between">
              <h2 className="text-xs font-extrabold text-[var(--bps-orange)] uppercase tracking-wider font-heading">
                RINGKASAN NARATIF
              </h2>

              <div className="flex-1 flex items-center py-4">
                <p className="text-xs font-medium text-[var(--fg)] leading-relaxed">
                  Selama 80 observasi kuartalan (2000 Q2–2020 Q1), Indonesia secara umum berada dalam kondisi sentimen positif dengan ITB dan ITK di atas level netral (100) pada 86,25% periode. Konsumen cenderung lebih optimistis dibandingkan bisnis, namun juga menunjukkan volatilitas yang lebih tinggi. Korelasi yang positif namun moderat (0,369) serta divergensi yang terjadi pada 60% periode menunjukkan bahwa kedua sentimen tidak selalu bergerak searah dan dipengaruhi faktor yang berbeda.
                </p>
              </div>

              <div className="bg-[var(--bps-orange)]/10 border border-[var(--bps-orange)]/30 rounded-xl p-4 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[var(--bps-orange)] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <HugeiconsIcon icon={Idea01Icon} size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold text-[var(--bps-orange)] font-heading">
                    KEY TAKEAWAY:
                  </div>
                  <p className="text-xs font-semibold text-[var(--fg)] leading-relaxed mt-0.5">
                    Sentimen konsumen lebih tinggi dan lebih volatil, sementara sentimen bisnis lebih stabil namun tidak selalu sejalan dengan sentimen konsumen.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* PAGE 4: MASTER DATA INFO */}
      {/* ========================================================= */}
      {activeTab === 'data_info' && (
        <DataInfoView records={records} />
      )}

    </div>
  );
};
