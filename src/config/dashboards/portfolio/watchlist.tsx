import { Eye } from 'lucide-react';
import type { DashboardConfig } from '../types';
import { ConsumerDashboard } from '@/src/components/features/consumer/dashboard/consumer-dashboard';

export const watchlist: DashboardConfig = {
  id: 'watchlist',
  name: 'Watchlist Dashboard',
  icon: <Eye size={18} />,
  component: () => <ConsumerDashboard defaultTab="watchlist" />,
  description: 'Monitor assets on your watchlist',
  path: '/corporate/dashboard/watchlist',
  category: 'portfolio',
};