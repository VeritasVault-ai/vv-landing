'use client'

import { createContext } from 'react';
import type { DashboardContextType } from './types';

// Create a context with a default empty value
export const DashboardContext = createContext<DashboardContextType>({
  overviewData: null,
  performanceData: null,
  isLoading: {
    overview: true,
    performance: true,
  },
  errors: {
    overview: null,
    performance: null,
  },
  settings: {
    visibleMetrics: {
      portfolioValue: true,
      activeStrategies: true,
      riskScore: true,
    },
    refreshRates: {
      portfolioValue: 20,
      riskScore: 60,
      performance: 90,
      modelResults: 45,
      voting: 30,
    },
    theme: "system",
    compactView: false,
  },
  updateSettings: () => {},
  activeTab: "overview",
  setActiveTab: () => {},
  refreshData: async () => {},
});