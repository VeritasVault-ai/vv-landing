import { DashboardOverview, DashboardPerformance } from '@/lib/repositories/dashboard-repository';

/**
 * Service layer for interacting with the dashboard API
 */
class DashboardService {
  /**
   * Fetch dashboard overview data
   */
  async getDashboardOverview(): Promise<DashboardOverview> {
    const response = await fetch('/api/dashboard/overview');
    if (!response.ok) {
      throw new Error(`Failed to fetch dashboard overview: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Fetch dashboard performance data
   */
  async getDashboardPerformance(): Promise<DashboardPerformance> {
    const response = await fetch('/api/dashboard/performance');
    if (!response.ok) {
      throw new Error(`Failed to fetch dashboard performance: ${response.statusText}`);
    }
    return response.json();
  }
}

// Export a singleton instance
export const dashboardService = new DashboardService();