import { DashboardOverview, DashboardPerformance } from '@/lib/repositories/dashboard-repository';
import { ApiResponse, BaseService } from './base-service';

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
   * Export dashboard data in the specified format
   * @param format The format to export (csv, pdf, or excel)
   * @returns A blob containing the exported data
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
      const errorText = await this.getErrorDetails(response);
      throw new Error(`Failed to export dashboard data: ${errorText}`);
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
      
      const response = await fetch('/api/auth/token', {
        method: 'GET',
        credentials: 'include', // Include cookies for session-based auth
      });
      
      if (!response.ok) {
        throw new Error(`Failed to get authentication token: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error('Error getting authentication token:', error);
      throw new Error('Authentication failed');
    }
  }
  
  /**
   * Extract detailed error information from a response
   * @param response The fetch Response object
   * @returns A string with error details
   */
  private async getErrorDetails(response: Response): Promise<string> {
    try {
      // Try to get error details from response body
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.clone().json();
        return `[${response.status} ${response.statusText}] ${
          errorData.message || JSON.stringify(errorData)
        }`;
      }
      
      // Fall back to status text
      return `[${response.status}] ${response.statusText}`;
    } catch (e) {
      // If parsing fails, return basic error info
      return `[${response.status}] ${response.statusText}`;
    }
  }
}

// Export a singleton instance
export const dashboardService = new DashboardService();