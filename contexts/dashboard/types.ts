/**
 * Dashboard context type definitions
 */

// Define types for dashboard overview data
export interface PortfolioValue {
  current: number;
  percentageChange: number;
  lastUpdated: string;
}

export interface RiskScore {
  level: number;
  status: 'low' | 'medium' | 'high' | 'critical';
  description: string;
}

export interface ActiveStrategy {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'inactive';
  performance: number;
}

export interface DashboardOverview {
  portfolioValue: PortfolioValue;
  riskScore: RiskScore;
  activeStrategies: ActiveStrategy[];
  lastUpdated: string;
}

// Define types for dashboard performance data
export interface AssetPerformance {
  id: string;
  name: string;
  symbol: string;
  performance: number;
  value: number;
}

export interface HistoricalDataPoint {
  date: string;
  value: number;
}

export interface DashboardPerformance {
  topPerformers: AssetPerformance[];
  underperformers: AssetPerformance[];
  historicalPerformance: HistoricalDataPoint[];
  lastUpdated: string;
}

// Define types for user preferences
export interface DashboardSettings {
  visibleMetrics: {
    portfolioValue: boolean;
    activeStrategies: boolean;
    riskScore: boolean;
  };
  refreshRates: {
    portfolioValue: number; // in seconds
    riskScore: number; // in seconds
    performance: number; // in seconds
    modelResults: number; // in seconds
    voting: number; // in seconds
  };
  theme: "light" | "dark" | "system";
  compactView: boolean;
}

// Define types for dashboard events
export interface PortfolioValueUpdatedEvent {
  portfolioValue: number;
  percentageChange: number;
  lastUpdated: string;
}

export interface RiskScoreChangedEvent {
  level: number;
  status: 'low' | 'medium' | 'high' | 'critical';
  description: string;
}

export interface PerformanceDataUpdatedEvent {
  historicalPerformance: HistoricalDataPoint[];
}

export interface AssetPerformanceChangedEvent {
  topPerformers: AssetPerformance[];
  underperformers: AssetPerformance[];
}

// Define the context state type
export interface DashboardContextType {
  // Dashboard data
  overviewData: DashboardOverview | null;
  performanceData: DashboardPerformance | null;
  
  // Loading and error states
  isLoading: {
    overview: boolean;
    performance: boolean;
  };
  errors: {
    overview: string | null;
    performance: string | null;
  };
  
  // User settings
  settings: DashboardSettings;
  updateSettings: (newSettings: Partial<DashboardSettings>) => void;
  
  // Active tab
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Refresh data manually
  refreshData: (section?: "overview" | "performance" | "models" | "voting") => Promise<void>;
}