// Date range for filtering analytics data
export interface DateRange {
  start: Date
  end: Date
}

export type KpiData = {
  title: string;
  value: number;
  change: number;
  type: "number" | "currency" | "percentage";
};

// Key Performance Indicators
export interface KPIs {
  totalUsers: number
  activeUsers: number
  totalTransactions: number
  totalVolume: number
  averageTransactionValue: number
  userGrowth: number
  transactionGrowth: number
  volumeGrowth: number
}

// Daily data point structure
export interface DataPoint {
  date: string
  value: number
}

// User activity metrics
export interface UserActivity {
  dailyActiveUsers: DataPoint[]
  newUsers: DataPoint[]
  sessionDuration: DataPoint[]
  bounceRate: DataPoint[]
}

// Transaction metrics
export interface TransactionMetrics {
  volume: DataPoint[]
  count: DataPoint[]
  averageValue: DataPoint[]
  fees: DataPoint[]
}

// Chain comparison metrics
export interface ChainMetric {
  name: string
  transactionCount: number
  tvl: number
  userCount: number
  growth: number
}

// Asset performance data
export type AssetPerformance = {
  name?: string;
  symbol?: string;
  price?: number;
  marketCap?: number;
  change?: number;
  volume?: number;
  rank?: number;
  chain?: string;
  volumeChange?: number;
}

export type AssetData = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  change: number;
  volume: number;
  rank: number;
  chain: string;
  priceChange24h: number;
  volumeChange24h: number;
};

export type AgeGroup = {
  group: string;
  value: number;
};

export type Region = {
  region: string;
  value: number;
};

export type Platform = {
  platform: string;
  value: number;
};

// User demographics data
export type UserDemographicsData = {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  ageGroups: AgeGroup[];
  regions: Region[];
  platforms: Platform[];
};

// Complete analytics data structure
export type AnalyticsData = {
  kpis?: KpiData[];
  userActivity?: ActivityData[];
  transactionMetrics?: TransactionMetrics[];
  chainComparison?: ChainData[];
  topAssets?: AssetPerformance[];
  userDemographics?: UserDemographicsData;
};

// Report configuration
export interface ReportConfig {
  title: string
  description: string
  sections: ReportSection[]
  dateRange: DateRange
  format: "pdf" | "csv" | "json"
}

export interface ReportSection {
  type: "kpis" | "userActivity" | "transactions" | "chains" | "assets" | "demographics"
  title: string
  includeChart: boolean
  includeTable: boolean
}

export type ActivityData = {
  date: string;
  activeUsers: number;
  newUsers: number;
};

// Chain comparison data types
export type ChainData = {
  name: string;
  volume: number;
  transactions: number;
  users: number;
};
