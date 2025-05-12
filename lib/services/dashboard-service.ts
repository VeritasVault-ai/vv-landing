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
      await this.handleErrorResponse(response, 'dashboard overview');
    }
    
    return response.json();
  }

  /**
   * Fetch dashboard performance data
   */
  async getDashboardPerformance(): Promise<DashboardPerformance> {
    const response = await fetch('/api/dashboard/performance');
    
    if (!response.ok) {
      await this.handleErrorResponse(response, 'dashboard performance');
    }
    
    return response.json();
  }

  /**
   * Handle error responses with comprehensive error information
   * @param response - The fetch Response object
   * @param resourceName - Name of the resource being fetched
   */
  private async handleErrorResponse(response: Response, resourceName: string): Promise<never> {
    let errorBody: string | object = '';
    
    try {
      // Try to parse response as JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        errorBody = await response.clone().json();
      } else {
        // Fall back to text if not JSON
        errorBody = await response.clone().text();
      }
    } catch (e) {
      // If we can't read the body, continue with what we have
      errorBody = 'Unable to parse error response body';
    }

    const errorMessage = `Failed to fetch ${resourceName}: [${response.status} ${response.statusText}] ${
      typeof errorBody === 'object' ? JSON.stringify(errorBody) : errorBody
    }`;
    
    throw new Error(errorMessage);
  }
}

// Export a singleton instance
export const dashboardService = new DashboardService();