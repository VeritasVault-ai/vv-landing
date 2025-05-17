import { BarChartHorizontal } from 'lucide-react';
import type { DashboardConfig } from '../types';
import { StrategiesDashboard } from '@/components/corporate/dashboard/tools/strategies-dashboard';

export const strategies: DashboardConfig = {
  id: 'strategies',
  name: 'Strategies',
  icon: <BarChartHorizontal size={18} />,
  component: () => <StrategiesDashboard />,
  description: 'Investment and trading strategies',
  path: '/corporate/dashboard/strategies',
  category: 'tools',
};