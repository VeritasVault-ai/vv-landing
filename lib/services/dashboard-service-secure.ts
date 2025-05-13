import { BaseService, ApiResponse } from './base-service-secure';
import { DashboardOverview, DashboardPerformance } from '@/lib/repositories/dashboard-repository';
import { getRequiredEnv } from '../env-validation';

/**
 * Type definitions for dashboard service responses
 */
export type DashboardOverviewResponse = ApiResponse<DashboardOverview>;
export type DashboardPerformanceResponse = ApiResponse<DashboardPerformance>;

/**
 * Service layer for interacting with the dashboard API with security enhancements
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
   * Export dashboard data as CSV with security enhancements
   */
  async exportDashboardData(format: 'csv' | 'pdf' | 'excel' = 'csv'): Promise<Blob> {
    // Get authentication token securely
    const authToken = await this.getAuthToken();
    
    const response = await fetch(`/api/dashboard/export?format=${format}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/octet-stream',
        'Authorization': `Bearer ${authToken}`
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to export dashboard data: ${response.statusText}`);
    }
    
    return await response.blob();
  }
  
  /**
   * Get authentication token securely
   * @returns JWT token for authenticated requests
   */
  private async getAuthToken(): Promise<string> {
    try {
      // In a real implementation, this would get a token from your auth provider
      // For example, from Supabase or your authentication service
      
      // This is just a placeholder - replace with actual secure auth implementation
      const response = await fetch('/api/auth/token', {
        method: 'GET',
        credentials: 'include', // Include cookies for session-based auth
      });
      
      if (!response.ok) {
        throw new Error('Failed to get authentication token');
      }
      
      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error('Error getting authentication token');
      // Log error details safely in a development environment only
      if (process.env.NODE_ENV === 'development') {
        console.error('Details:', error instanceof Error ? error.message : String(error));
      }
      throw new Error('Authentication failed');
    }
  }
}

// Export a singleton instance
export const dashboardService = new DashboardService();