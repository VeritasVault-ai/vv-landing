import { Briefcase } from 'lucide-react';
import type { DashboardConfig } from '../types';
import { ConsumerDashboard } from '@/src/components/features/consumer/dashboard/consumer-dashboard';

export const portfolio: DashboardConfig = {
  id: 'portfolio',
  name: 'Portfolio Dashboard',
  icon: <Briefcase size={18} />,
  component: () => <ConsumerDashboard defaultTab="portfolio" />,
  description: 'Portfolio overview and management',
  path: '/corporate/dashboard/portfolio',
  category: 'portfolio',
};