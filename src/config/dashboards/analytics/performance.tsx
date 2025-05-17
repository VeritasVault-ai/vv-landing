import { TrendingUp } from 'lucide-react';
import type { DashboardConfig } from '../types';
import { DashboardPerformance } from '@/components/corporate/dashboard-performance';

export const performance: DashboardConfig = {
  id: 'performance',
  name: 'Performance Dashboard',
  icon: <TrendingUp size={18} />,
  component: () => <DashboardPerformance />,
  description: 'Portfolio performance and metrics',
  path: '/corporate/dashboard/performance',
  category: 'analytics',
};