'use client'

import { useTheme } from '@/src/lib/context/ThemeProvider';
import { useDashboard } from './useDashboard';

/**
 * Hook that combines dashboard context with theme context
 * 
 * @returns Combined dashboard and theme context values
 */
export function useDashboardWithTheme() {
  const dashboardContext = useDashboard();
  const themeContext = useTheme();
  
  return {
    ...dashboardContext,
    theme: themeContext
  };
}