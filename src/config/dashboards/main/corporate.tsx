import { CorporateDashboard as ModularCorporateDashboard } from '@/src/components/dashboard/CorporateDashboard';
import { LayoutDashboard } from 'lucide-react';
import type { DashboardConfig } from '../types';

export const corporate: DashboardConfig = {
  id: 'corporate',
  name: 'Corporate Dashboard',
  icon: <LayoutDashboard size={18} />,
  component: () => <ModularCorporateDashboard />,
  description: 'Enterprise liquidity management dashboard',
  path: '/corporate/dashboard',
  category: 'main',
};