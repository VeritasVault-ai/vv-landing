import dynamic from 'next/dynamic';

// Dynamic imports for all dashboard components
export const DynamicAIAnalyticsDashboard = dynamic(
  () => import('@/components/ai-analytics-dashboard').then(m => m.AIAnalyticsDashboard),
  { ssr: false }
);

export const DynamicDashboardPerformance = dynamic(
  () => import('@/components/corporate/dashboard-performance').then(m => m.DashboardPerformance),
  { ssr: false }
);

export const DynamicDashboardVoting = dynamic(
  () => import('@/components/corporate/voting').then(m => m.DashboardVoting),
  { ssr: false }
);

export const DynamicDashboardOverview = dynamic(
  () => import('@/components/dashboard/dashboard-overview').then(m => m.DashboardOverview),
  { ssr: false }
);

export const DynamicCorporateDashboard = dynamic(
  () => import('@/src/components/dashboard/CorporateDashboard').then(m => m.CorporateDashboard),
  { ssr: false }
);

export const DynamicAdminDashboard = dynamic(
  () => import('@/src/components/features/admin/admin-dashboard').then(m => m.AdminDashboard),
  { ssr: false }
);

export const DynamicAnalyticsDashboard = dynamic(
  () => import('@/src/components/features/analytics/analytics-dashboard').then(m => m.AnalyticsDashboard),
  { ssr: false }
);

export const DynamicConsumerDashboard = dynamic(
  () => import('@/src/components/features/consumer/dashboard/consumer-dashboard').then(m => m.ConsumerDashboard),
  { ssr: false }
);

export const DynamicModelPortfolioDashboard = dynamic(
  () => import('@/src/components/features/consumer/model-portfolio/model-portfolio-dashboard').then(m => m.ModelPortfolioDashboard),
  { ssr: false }
);

export const DynamicEventGridDashboard = dynamic(
  () => import('@/src/components/features/event-grid/event-grid-dashboard').then(m => m.EventGridDashboard),
  { ssr: false }
);

export const DynamicMarketDashboard = dynamic(
  () => import('@/src/components/features/market-data/market-dashboard').then(m => m.MarketDashboard),
  { ssr: false }
);

export const DynamicTreasuryDashboard = dynamic(
  () => import('@/app/corporate-version/solutions/treasury/components/treasury-dashboard').then(m => m.TreasuryDashboard),
  { ssr: false }
);

export const DynamicOnChainDashboard = dynamic(
  () => import('@/components/corporate/dashboard/analytics/onchain-dashboard').then(m => m.OnChainDashboard),
  { ssr: false }
);

export const DynamicOffChainDashboard = dynamic(
  () => import('@/components/corporate/dashboard/analytics/offchain-dashboard').then(m => m.OffChainDashboard),
  { ssr: false }
);

export const DynamicStrategiesDashboard = dynamic(
  () => import('@/components/corporate/dashboard/tools/strategies-dashboard').then(m => m.StrategiesDashboard),
  { ssr: false }
);

export const DynamicRiskAssessmentDashboard = dynamic(
  () => import('@/components/demo/risk-assessment-dashboard').then(m => m.RiskAssessmentDashboard),
  { ssr: false }
);

export const DynamicFlashLoanExplorer = dynamic(
  () => import('@/components/flash-loan-explorer').then(m => m.default),
  { ssr: false }
);