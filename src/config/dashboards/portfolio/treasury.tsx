import { Wallet } from 'lucide-react';
import type { DashboardConfig } from '../types';
import { TreasuryDashboard } from '@/app/corporate-version/solutions/treasury/components/treasury-dashboard';

export const treasury: DashboardConfig = {
  id: 'treasury',
  name: 'Treasury Dashboard',
  icon: <Wallet size={18} />,
  component: () => <TreasuryDashboard />,
  description: 'Comprehensive view of your treasury operations',
  path: '/corporate/dashboard/treasury',
  category: 'portfolio',
};