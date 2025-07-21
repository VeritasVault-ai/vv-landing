import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// Mock all dynamic dashboard components to simple placeholders
vi.mock('@/components/dynamic-imports/dashboard-imports', () => ({
  DynamicAIAnalyticsDashboard: () => <div>AI Analytics Dashboard</div>,
  DynamicAdminDashboard: () => <div>Admin Dashboard</div>,
  DynamicAnalyticsDashboard: () => <div>Analytics Dashboard</div>,
  DynamicConsumerDashboard: () => <div>Consumer Dashboard</div>,
  DynamicDashboardOverview: () => <div>Dashboard Overview</div>,
  DynamicDashboardPerformance: () => <div>Dashboard Performance</div>,
  DynamicDashboardVoting: () => <div>Dashboard Voting</div>,
  DynamicEventGridDashboard: () => <div>Event Grid Dashboard</div>,
  DynamicFlashLoanExplorer: () => <div>Flash Loan Explorer</div>,
  DynamicMarketDashboard: () => <div>Market Dashboard</div>,
  DynamicModelPortfolioDashboard: () => <div>Model Portfolio Dashboard</div>,
  DynamicCorporateDashboard: () => <div>Modular Corporate Dashboard</div>,
  DynamicOffChainDashboard: () => <div>Off Chain Dashboard</div>,
  DynamicOnChainDashboard: () => <div>On Chain Dashboard</div>,
  DynamicRiskAssessmentDashboard: () => <div>Risk Assessment Dashboard</div>,
  DynamicStrategiesDashboard: () => <div>Strategies Dashboard</div>,
  DynamicTreasuryDashboard: () => <div>Treasury Dashboard</div>,
}));

// Mock Next.js router context
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn() }),
  usePathname: () => '/dashboard',
}));

import { CorporateDashboard } from '@/components/corporate/dashboard/corporate-dashboard';

describe('Dashboard', () => {
  it('renders the corporate dashboard sidebar', () => {
    render(<CorporateDashboard />);
    // Debug log after render
    // eslint-disable-next-line no-console
    console.log(document.body.innerHTML);
    expect(screen.getByText(/dashboards/i)).toBeInTheDocument();
    // Use a flexible matcher for the sidebar text
    const aiAnalytics = screen.queryByText((content) => /ai analytics dashboard/i.test(content));
    expect(aiAnalytics).toBeInTheDocument();
  });
});
