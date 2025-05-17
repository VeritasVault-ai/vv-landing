import { Calculator } from 'lucide-react';
import type { DashboardConfig } from '../types';
import { AIAnalyticsDashboard } from '@/components/ai-analytics-dashboard';

export const aiAnalytics: DashboardConfig = {
  id: 'ai-analytics',
  name: 'AI Analytics',
  icon: <Calculator size={18} />,
  component: () => <AIAnalyticsDashboard />,
  description: 'AI-powered analytics and insights',
  path: '/corporate/dashboard/ai-analytics',
  category: 'analytics',
};