/**
 * Types for historical data
 */

export interface HistoricalDataPoint {
  date: string;
  value: number;
  return: number;
  drawdown: number;
}

export interface HistoricalDataSeries {
  name: string;
  data: HistoricalDataPoint[];
}

export type TimeFrame = '1d' | '1w' | '1m' | '3m' | '6m' | '1y' | 'all';