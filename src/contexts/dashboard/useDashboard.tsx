'use client'

import { useContext } from 'react';
import { DashboardContext } from './DashboardContext';

/**
 * Provides access to the current dashboard context.
 *
 * @returns The current value of the dashboard context.
 * @throws {Error} If called outside of a {@link DashboardProvider}.
 */
export function useDashboard() {
  const context = useContext(DashboardContext);
  
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  
  return context;
}