import FlashLoansPage from '@/app/(dashboard)/flash-loans/page';
import { Coins } from 'lucide-react';
import type { DashboardConfig } from '../types';

export const flashLoans: DashboardConfig = {
  id: 'flash-loans',
  name: 'Flash Loans',
  icon: <Coins size={18} />,
  component: () => <FlashLoansPage />,
  description: 'Flash loan management and execution',
  path: '/corporate/dashboard/flash-loans',
  category: 'tools',
};