'use client'

import { useTheme } from '@/src/lib/context/ThemeProvider';
import { useDashboard } from './useDashboard';

/**
 * Returns a combined object containing both dashboard and theme context values.
 *
 * Use this hook to access dashboard-related state and actions along with the current theme context in a single object.
 *
 * @returns An object with all properties from the dashboard context and a {@link theme} property containing the theme context.
 */
export function useDashboardWithTheme() {
  const dashboardContext = useDashboard();
  const themeContext = useTheme();
  
  return {
    ...dashboardContext,
    theme: themeContext
  };
}