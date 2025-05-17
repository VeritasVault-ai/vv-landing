import { Calculator } from 'lucide-react';
import type { DashboardConfig } from '../types';
import dynamic from 'next/dynamic';

// Use next/dynamic with a literal import path instead of lazyImport
const AIAnalyticsDashboard = dynamic(
  () => import('@/components/ai-analytics-dashboard').then(m => m.AIAnalyticsDashboard),
  { ssr: false }
);
export const aiAnalytics: DashboardConfig = {
  id: 'ai-analytics',
  name: 'AI Analytics',
  icon: <Calculator size={18} />,
  component: () => <AIAnalyticsDashboard />,
  description: 'AI-powered analytics and insights',
  path: '/corporate/dashboard/ai-analytics',
  category: 'analytics',
};