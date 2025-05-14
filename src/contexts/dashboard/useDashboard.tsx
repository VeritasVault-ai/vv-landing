'use client'

import { useContext } from 'react';
import { DashboardContext } from './DashboardContext';

/**
 * Hook to access dashboard context
 * 
 * @returns Dashboard context value
 * @throws Error if used outside of DashboardProvider
 */
export function useDashboard() {
  const context = useContext(DashboardContext);
  
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  
  return context;
}