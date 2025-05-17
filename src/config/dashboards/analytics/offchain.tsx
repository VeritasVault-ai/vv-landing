import { LineChart } from 'lucide-react';
import type { DashboardConfig } from '../types';
import { OffChainDashboard } from '@/components/corporate/dashboard/analytics/offchain-dashboard';

export const offchain: DashboardConfig = {
  id: 'offchain',
  name: 'Off-Chain Analytics',
  icon: <LineChart size={18} />,
  component: () => <OffChainDashboard />,
  description: 'Traditional market and off-chain data analysis',
  path: '/corporate/dashboard/offchain',
  category: 'analytics',
};