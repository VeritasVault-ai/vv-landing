/**
 * TEMPORARY FILE - PART OF CODEBASE MIGRATION
 * 
 * This is a temporary bridge file created to fix the missing module error.
 * It re-exports the dashboard context from the improved version.
 * 
 * TODO: Once the dashboard context is properly refactored, this file should be deleted.
 */

import { createContext } from 'react';
import { useDashboard as useImprovedDashboard, DashboardProvider as ImprovedDashboardProvider } from '@/contexts/dashboard-context-improved';
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

// Re-export the useDashboard hook from the improved version
export const useDashboard = useImprovedDashboard;