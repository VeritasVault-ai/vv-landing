import { allDashboards } from './dashboardsIndex';
import type { DashboardCategory, DashboardConfig } from './dashboards/types';

export function getDashboardsByCategory(
  category: DashboardCategory
): DashboardConfig[] {
  return allDashboards.filter((d) => d.category === category);
}

export const categoryDisplayNames: Record<DashboardCategory, string> = {
  main: 'Main',
  analytics: 'Analytics',
  portfolio: 'Portfolio',
  admin: 'Administration',
  tools: 'Tools',
};