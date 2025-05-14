/**
 * Dashboard context module
 * 
 * This module exports the dashboard context, provider, and hooks
 * for managing dashboard state across the application.
 */

export { DashboardProvider } from './DashboardProvider';
export { useDashboard } from './useDashboard';
export { useDashboardWithTheme } from './useDashboardWithTheme';

export type { 
  DashboardSettings,
  DashboardOverview,
  DashboardPerformance,
  DashboardContextType
} from './types';