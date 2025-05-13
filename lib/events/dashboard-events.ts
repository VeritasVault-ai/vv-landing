import { DashboardOverview, DashboardPerformance } from '@/lib/repositories/dashboard-repository';
import { ApiResponse } from '../api/api-response';
import { ApiRequestOptions, BaseService } from '../services/base-service';

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
   * @param options Request options including AbortSignal for cancellation
   */
  async getDashboardOverview(options?: ApiRequestOptions): Promise<DashboardOverview> {
    const response = await this.get<DashboardOverview>('/api/dashboard/overview', options);
    return response.data;
  }

  /**
   * Fetch dashboard performance data
   * @param options Request options including AbortSignal for cancellation
   */
  async getDashboardPerformance(options?: ApiRequestOptions): Promise<DashboardPerformance> {
    const response = await this.get<DashboardPerformance>('/api/dashboard/performance', options);
    return response.data;
  }
  
  /**
   * Export dashboard data in the specified format
   * @param format The format to export (csv, pdf, or excel)
   * @param options Request options including AbortSignal for cancellation
   * @returns A blob containing the exported data
   */
  async exportDashboardData(
    format: 'csv' | 'pdf' | 'excel' = 'csv', 
    options?: ApiRequestOptions
  ): Promise<Blob> {
    // Get authentication token securely
    const authToken = await this.getAuthToken();
    
    // Cancel any ongoing export request
    this.cancelOngoingRequest(`/api/dashboard/export?format=${format}`, 'GET');
    
    // Create a new AbortController if one wasn't provided
    const controller = new AbortController();
    const signal = options?.signal ? 
      this.createCombinedSignal(controller.signal, options.signal) : 
      controller.signal;
    
    const response = await fetch(`/api/dashboard/export?format=${format}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/octet-stream',
        'Authorization': `Bearer ${authToken}`
      },
      signal,
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
      console.error(
        'Authentication token retrieval failed:',
        error instanceof Error ? error.message : 'Unknown error'
      );
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
  
  /**
   * Create a signal that aborts when either input signal aborts
   */
  private createCombinedSignal(signal1: AbortSignal, signal2: AbortSignal): AbortSignal {
    const controller = new AbortController();
    
    const abortHandler = () => controller.abort();
    
    signal1.addEventListener('abort', abortHandler);
    signal2.addEventListener('abort', abortHandler);
    
    // Clean up event listeners when this signal aborts
    controller.signal.addEventListener('abort', () => {
      signal1.removeEventListener('abort', abortHandler);
      signal2.removeEventListener('abort', abortHandler);
    });
    
    return controller.signal;
  }
}

// Export a singleton instance
export const dashboardService = new DashboardService();