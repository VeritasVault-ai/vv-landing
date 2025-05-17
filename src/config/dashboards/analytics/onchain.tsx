import { Layers } from 'lucide-react';
import type { DashboardConfig } from '../types';
import { OnChainDashboard } from '@/components/corporate/dashboard/analytics/onchain-dashboard';

export const onchain: DashboardConfig = {
  id: 'onchain',
  name: 'On-Chain Analytics',
  icon: <Layers size={18} />,
  component: () => <OnChainDashboard />,
  description: 'On-chain data analysis and metrics',
  path: '/corporate/dashboard/onchain',
  category: 'analytics',
};