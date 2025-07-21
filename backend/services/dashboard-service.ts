import { BaseService } from './base-service';

/**
 * Dashboard service for fetching dashboard-related data
 * Works with both real API and MSW mocks
 */
class DashboardService extends BaseService {
  /**
   * Fetch performance data for the dashboard
   */
  async getDashboardPerformance() {
    return this.get<any>('/api/dashboard/performance');
  }

  /**
   * Fetch portfolio data for the dashboard
   */
  async getDashboardPortfolio() {
    return this.get<any>('/api/dashboard/portfolio');
  }

  /**
   * Fetch market data for the dashboard
   */
  async getDashboardMarket() {
    return this.get<any>('/api/dashboard/market');
  }

  /**
   * Fetch voting data for the dashboard
   */
  async getDashboardVoting() {
    return this.get<any>('/api/dashboard/voting');
  }
}

// Export a singleton instance
export const dashboardService = new DashboardService();