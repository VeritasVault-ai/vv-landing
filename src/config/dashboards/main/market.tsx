import { BarChart3 } from 'lucide-react';
import type { DashboardConfig } from '../types';
import { MarketDashboard } from '@/src/components/features/market-data/market-dashboard';

export const market: DashboardConfig = {
  id: 'market',
  name: 'Market Dashboard',
  icon: <BarChart3 size={18} />,
  component: () => <MarketDashboard />,
  description: 'Real-time market data and analytics',
  path: '/corporate/dashboard/market',
  category: 'main',
};