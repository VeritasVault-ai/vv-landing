import { BaseService, ApiResponse } from './base-service';
import { DashboardOverview, DashboardPerformance } from '@/lib/repositories/dashboard-repository';

/**
 * Type definitions for dashboard service responses
 */
export type DashboardOverviewResponse = ApiResponse<DashboardOverview>;
export type DashboardPerformanceResponse = ApiResponse<DashboardPerformance>;

/**
 * Service layer for interacting with the dashboard API
 */
class DashboardService extends BaseService {
  /**
   * Fetch dashboard overview data
   */
  async getDashboardOverview(): Promise<DashboardOverview> {
    const response = await this.get<DashboardOverview>('/api/dashboard/overview');
    return response.data;
  }

  /**
   * Fetch dashboard performance data
   */
  async getDashboardPerformance(): Promise<DashboardPerformance> {
    const response = await this.get<DashboardPerformance>('/api/dashboard/performance');
    return response.data;
  }
  
  /**
   * Export dashboard data as CSV
   */
  async exportDashboardData(format: 'csv' | 'pdf' | 'excel' = 'csv'): Promise<Blob> {
    const response = await fetch(`/api/dashboard/export?format=${format}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/octet-stream',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to export dashboard data: ${response.statusText}`);
    }
    
    return await response.blob();
  }
}

// Export a singleton instance
export const dashboardService = new DashboardService();