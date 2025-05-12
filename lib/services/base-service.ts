/**
 * Common API response type for all services
 */
export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

/**
 * Error class for API errors
 */
export class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number = 500) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Base service class with common functionality
 */
export abstract class BaseService {
  /**
   * Base fetch method with error handling and response parsing
   */
  protected async fetchApi<T>(
    url: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new ApiError(
          `API request failed: ${response.statusText}`,
          response.status
        );
      }

      const data = await response.json();
      
      return {
        data: data as T,
        status: 'success',
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Handle network errors or JSON parsing errors
      throw new ApiError(
        error instanceof Error ? error.message : 'Unknown error occurred',
        500
      );
    }
  }
  
  /**
   * Helper method for GET requests
   */
  protected async get<T>(url: string): Promise<ApiResponse<T>> {
    return this.fetchApi<T>(url, { method: 'GET' });
  }
  
  /**
   * Helper method for POST requests
   */
  protected async post<T>(url: string, data: any): Promise<ApiResponse<T>> {
    return this.fetchApi<T>(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  
  /**
   * Helper method for PUT requests
   */
  protected async put<T>(url: string, data: any): Promise<ApiResponse<T>> {
    return this.fetchApi<T>(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
  
  /**
   * Helper method for DELETE requests
   */
  protected async delete<T>(url: string): Promise<ApiResponse<T>> {
    return this.fetchApi<T>(url, { method: 'DELETE' });
  }
}