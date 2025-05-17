import { ShieldAlert } from 'lucide-react';
import type { DashboardConfig } from '../types';
import { AdminDashboard } from '@/src/components/features/admin/admin-dashboard';

export const admin: DashboardConfig = {
  id: 'admin',
  name: 'Admin Dashboard',
  icon: <ShieldAlert size={18} />,
  component: () => <AdminDashboard />,
  description: 'System administration and monitoring',
  path: '/corporate/dashboard/admin',
  category: 'admin',
};