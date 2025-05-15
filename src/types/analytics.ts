// Date range for filtering analytics data
export interface DateRange {
  start: Date
  end: Date
}

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
export interface AssetPerformance {
  symbol: string
  name: string
  price: number
  volume24h: number
  marketCap: number
  change24h: number
}

// User demographics data
export interface UserDemographics {
  byRegion: { region: string; percentage: number }[]
  byExperience: { level: string; percentage: number }[]
  byPlatform: { platform: string; percentage: number }[]
}

// Complete analytics data structure
export interface AnalyticsData {
  kpis: KPIs
  userActivity: UserActivity
  transactionMetrics: TransactionMetrics
  chainComparison: ChainMetric[]
  topAssets: AssetPerformance[]
  userDemographics: UserDemographics
}

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