/**
 * TEMPORARY FILE - PART OF CODEBASE MIGRATION
 * 
 * This is a temporary bridge file created to fix the missing module error.
 * It re-exports the dashboard context from the modular implementation.
 * 
 * TODO: Once the dashboard context is properly refactored, this file should be deleted.
 */

import { 
  DashboardProvider as OriginalDashboardProvider,
  useDashboard as useOriginalDashboard,
  useDashboardWithTheme as useOriginalDashboardWithTheme
} from '@/src/contexts/dashboard';

// Re-export everything from the new implementation
export const DashboardProvider = OriginalDashboardProvider;
export const useDashboard = useOriginalDashboard;
export const useDashboardWithTheme = useOriginalDashboardWithTheme;

// Re-export types
export type { 
  DashboardSettings,
  DashboardOverview,
  DashboardPerformance,
  DashboardContextType
} from '@/src/contexts/dashboard';