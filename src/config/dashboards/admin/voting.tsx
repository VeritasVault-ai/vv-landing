import { Vote } from 'lucide-react';
import type { DashboardConfig } from '../types';
import { DashboardVoting } from '@/components/corporate/voting';

export const voting: DashboardConfig = {
  id: 'voting',
  name: 'Governance Voting',
  icon: <Vote size={18} />,
  component: () => <DashboardVoting />,
  description: 'Participate in governance decisions',
  path: '/corporate/dashboard/voting',
  category: 'admin',
};