import { Users } from 'lucide-react';
import type { DashboardConfig } from '../types';
import { ConsumerDashboard } from '@/src/components/features/consumer/dashboard/consumer-dashboard';

export const consumer: DashboardConfig = {
  id: 'consumer',
  name: 'Consumer Dashboard',
  icon: <Users size={18} />,
  component: () => <ConsumerDashboard />,
  description: 'Multi-chain analytics and insights for consumers',
  path: '/corporate/dashboard/consumer',
  category: 'main',
};