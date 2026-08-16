export interface SentimentRecord {
  rowIndex?: number;
  Tahun: number;
  Kuartal_Num: number;
  Kuartal: string;
  Periode: string;
  ITB: number;
  ITK: number;
  Gap_ITB_ITK: number;
  Quadrant: 'Broad Optimism' | 'Business-led' | 'Consumer-led' | 'Broad Pessimism' | string;
}

export interface KPIMetrics {
  totalRecords: number;
  meanITB: number;
  meanITK: number;
  medianITB: number;
  medianITK: number;
  stdITB: number;
  stdITK: number;
  correlation: number;
  meanGap: number;
  itkHigherCount: number;
  itbHigherCount: number;
  quadrantCounts: {
    'Broad Optimism': number;
    'Business-led': number;
    'Consumer-led': number;
    'Broad Pessimism': number;
  };
  minGapRecord?: SentimentRecord;
  maxGapRecord?: SentimentRecord;
}

export interface AnnualSummary {
  Tahun: number;
  ITB: number;
  ITK: number;
  Gap: number;
}

export interface QuarterlyBoxplotData {
  kuartal: string;
  itbStats: { min: number; q1: number; median: number; q3: number; max: number };
  itkStats: { min: number; q1: number; median: number; q3: number; max: number };
}

export interface FilterState {
  yearRange: [number, number];
  selectedQuarters: string[];
  searchQuery: string;
  benchmark: number;
}
