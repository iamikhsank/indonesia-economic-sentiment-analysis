import { SentimentRecord, KPIMetrics } from '../types';
import masterSentimentData from '../data/master_sentiment_data.json';

declare global {
  interface Window {
    google?: {
      script: {
        run: {
          withSuccessHandler: (callback: (response: any) => void) => {
            withFailureHandler: (callback: (error: any) => void) => any;
          };
        };
      };
    };
  }
}

export const IS_GAS_PRODUCTION = typeof window !== 'undefined' && Boolean(window.google?.script?.run);
export const IS_LOCAL_DEVELOPMENT = !IS_GAS_PRODUCTION;

const LOCAL_STORAGE_KEY = 'BPS_ECONOMIC_SENTIMENT_DATA_SEED_V4';

/**
 * AUTHENTIC DATA SEED (80 Quarterly Observations: 2000 Q2 – 2020 Q1)
 * Synchronized directly with BPS_ITB_ITK_Master_Data.xlsx master dataset.
 */
function generateMasterSentimentData(): SentimentRecord[] {
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) {
      try {
        const records: SentimentRecord[] = JSON.parse(cached);
        if (Array.isArray(records) && records.length === 80 && records[0].Tahun && records[0].ITB !== undefined) {
          return records;
        }
      } catch (e) {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
  }

  // Pure authentic BPS quarterly dataset (80 observations)
  const records: SentimentRecord[] = masterSentimentData as SentimentRecord[];

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
    } catch (e) {
      console.warn('[DEV MODE] LocalStorage write quota exceeded.');
    }
  }

  return records;
}

export async function fetchSentimentRecords(): Promise<SentimentRecord[]> {
  if (IS_GAS_PRODUCTION) {
    return new Promise((resolve, reject) => {
      window.google!.script.run
        .withSuccessHandler((response: any) => {
          if (response && response.status === 'ok' && Array.isArray(response.data)) {
            resolve(response.data);
          } else if (Array.isArray(response)) {
            resolve(response);
          } else {
            reject(new Error(response?.message || 'Invalid GAS response payload'));
          }
        })
        .withFailureHandler((err: any) => {
          console.error('[PROD ERROR] GAS RPC getSentimentData failed:', err);
          reject(err);
        })
        .getSentimentData();
    });
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMasterSentimentData());
    }, 50);
  });
}

export async function fetchSentimentAnalytics(): Promise<KPIMetrics | null> {
  if (IS_GAS_PRODUCTION) {
    return new Promise((resolve, reject) => {
      window.google!.script.run
        .withSuccessHandler((response: any) => {
          if (response && response.status === 'ok' && response.metrics) {
            resolve(response.metrics);
          } else {
            resolve(null);
          }
        })
        .withFailureHandler((err: any) => {
          console.error('[PROD ERROR] GAS RPC getSentimentAnalytics failed:', err);
          reject(err);
        })
        .getSentimentAnalytics();
    });
  }

  return null;
}

export async function updateSentimentRecord(recordId: string, updatedFields: Partial<SentimentRecord>): Promise<boolean> {
  if (IS_GAS_PRODUCTION) {
    return new Promise((resolve, reject) => {
      window.google!.script.run
        .withSuccessHandler((response: any) => {
          resolve(response && response.status === 'ok');
        })
        .withFailureHandler((err: any) => {
          console.error('[PROD ERROR] GAS RPC updateSentimentRecord failed:', err);
          reject(err);
        })
        .updateSentimentRecord(recordId, updatedFields);
    });
  }

  const records = generateMasterSentimentData();
  const index = records.findIndex(r => r.Periode === recordId || String(r.rowIndex) === String(recordId));
  if (index !== -1) {
    records[index] = { ...records[index], ...updatedFields };
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
    } catch (e) {
      console.warn('[DEV MODE] LocalStorage update failed');
    }
    return true;
  }
  return false;
}
