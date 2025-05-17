import { Activity } from 'lucide-react';
import type { DashboardConfig } from '../types';
import { AnalyticsDashboard } from '@/src/components/features/analytics/analytics-dashboard';

export const analytics: DashboardConfig = {
  id: 'analytics',
  name: 'Analytics Dashboard',
  icon: <Activity size={18} />,
  component: () => <AnalyticsDashboard />,
  description: 'Platform analytics and insights',
  path: '/corporate/dashboard/analytics',
  category: 'analytics',
};