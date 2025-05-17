import { Coins } from 'lucide-react';
import type { DashboardConfig } from '../types';
import { DashboardOverview } from '@/components/dashboard/dashboard-overview';

export const tezosLiquidity: DashboardConfig = {
  id: 'tezos-liquidity',
  name: 'Veritas Vault - Tezos Liquidity',
  icon: <Coins size={18} />,
  component: () => (
    <div className="dashboardWrapper">
      <h2 className="sectionTitle">Tezos Liquidity Management</h2>
      <div className="dashboardSection">
        <DashboardOverview />
      </div>
    </div>
  ),
  description: 'AI-powered Tezos liquidity management',
  path: '/corporate/dashboard/tezos',
  category: 'main',
};