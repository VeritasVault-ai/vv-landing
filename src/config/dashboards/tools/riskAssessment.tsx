import { ShieldAlert } from 'lucide-react';
import type { DashboardConfig } from '../types';
import { RiskAssessmentDashboard } from '@/components/demo/risk-assessment-dashboard';

export const riskAssessment: DashboardConfig = {
  id: 'risk-assessment',
  name: 'Risk Assessment',
  icon: <ShieldAlert size={18} />,
  component: () => <RiskAssessmentDashboard />,
  description: 'Portfolio risk analysis and assessment',
  path: '/corporate/dashboard/risk-assessment',
  category: 'tools',
};