import { PieChart } from 'lucide-react';
import type { DashboardConfig } from '../types';
import { ModelPortfolioDashboard } from '@/src/components/features/consumer/model-portfolio/model-portfolio-dashboard';

export const modelPortfolio: DashboardConfig = {
  id: 'model-portfolio',
  name: 'Model Portfolio',
  icon: <PieChart size={18} />,
  component: () => (
    <ModelPortfolioDashboard
      modelId="default-model-1"
      modelName="Balanced Growth Portfolio"
    />
  ),
  description: 'Model portfolio management and analysis',
  path: '/corporate/dashboard/model-portfolio',
  category: 'portfolio',
};