import { getRequiredEnv } from '../env-validation';

/**
 * Common API response type for all services
 */
export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

/**
 * Request options with AbortSignal support
 */
export interface ApiRequestOptions extends RequestInit {
  signal?: AbortSignal;
}

/**
 * Error class for API errors with security enhancements
 */
export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number = 500) {
    // Sanitize error message to prevent leaking sensitive data
    const sanitizedMessage = sanitizeErrorMessage(message);
    super(sanitizedMessage);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Sanitize error messages to prevent leaking sensitive information
 */
function sanitizeErrorMessage(message: string): string {
  // Remove potential API keys, tokens, or credentials from error messages
  return message.replace(
    /(api[_-]?key|token|key|secret|password|credential|auth)[=:]\s*["']?\w+["']?/gi,
    '$1=[REDACTED]'
  );
}

/**
 * Normalize and sanitize headers to prevent case-sensitivity issues
 */
function sanitizeHeaders(headers: HeadersInit): Record<string, string> {
  const normalized: Record<string, string> = {};
  
  // Convert headers to a standard object format
  const headerObj: Record<string, string> = 
    headers instanceof Headers ? Object.fromEntries(headers.entries()) :
    Array.isArray(headers) ? Object.fromEntries(headers) :
    headers;
  
  // List of sensitive header names (lowercase for case-insensitive comparison)
  const sensitiveHeaderNames = [
    'authorization', 'x-api-key', 'api-key', 'x-auth-token', 
    'auth-token', 'bearer', 'cookie', 'set-cookie'
  ];
  
  // Normalize and sanitize headers
  Object.entries(headerObj).forEach(([key, value]) => {
    const lowerKey = key.toLowerCase();
    normalized[key] = sensitiveHeaderNames.includes(lowerKey) ? '[REDACTED]' : value;
  });
  
  return normalized;
}

/**
 * Sanitize request/response data to prevent logging sensitive information
 */
function sanitizeData(data: any): any {
  if (!data) return data;
  
  // Don't modify primitives
  if (typeof data !== 'object') return data;
  
  // Handle arrays
  if (Array.isArray(data)) {
    return data.map(item => sanitizeData(item));
  }
  
  // Handle objects
  const sanitized = { ...data };
  
  // List of sensitive field names to redact
  const sensitiveFields = [
    'password', 'token', 'secret', 'key', 'apiKey', 'api_key',
    'authorization', 'auth', 'credential', 'jwt', 'accessToken',
    'refreshToken', 'private', 'connectionString'
  ];
  
  // Redact sensitive fields (case-insensitive)
  for (const key in sanitized) {
    const lowerKey = key.toLowerCase();
    if (sensitiveFields.some(field => lowerKey.includes(field.toLowerCase()))) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = sanitizeData(sanitized[key]);
    }
  }
  
  return sanitized;
}

/**
 * Base service class with common functionality and security enhancements
 */
export abstract class BaseService {
  // API base URL from environment
  protected apiBaseUrl: string;
  
  // Active request AbortControllers
  private abortControllers: Map<string, AbortController> = new Map();
  
  constructor() {
    // Use environment validation to safely get API base URL
    this.apiBaseUrl = getRequiredEnv('NEXT_PUBLIC_APP_URL');
  }
  
  /**
   * Generate a unique request ID for a given endpoint
   */
  private getRequestKey(url: string, method: string): string {
    return `${method}:${url}`;
  }
  
  /**
   * Cancel any ongoing request to the same endpoint
   */
  protected cancelOngoingRequest(url: string, method: string): void {
    const key = this.getRequestKey(url, method);
    const controller = this.abortControllers.get(key);
    
    if (controller) {
      controller.abort();
      this.abortControllers.delete(key);
    }
  }
  
  /**
   * Create a signal that aborts when either input signal aborts
   */
  protected createCombinedSignal(signal1: AbortSignal, signal2: AbortSignal): AbortSignal {
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
  
  /**
   * Base fetch method with error handling, response parsing, and security enhancements
   */
  protected async fetchApi<T>(
    url: string,
    options: ApiRequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const method = options.method || 'GET';
    const requestKey = this.getRequestKey(url, method);
    
    // Cancel any ongoing request to the same endpoint
    this.cancelOngoingRequest(url, method);
    
    // Create a new AbortController for this request
    const controller = new AbortController();
    this.abortControllers.set(requestKey, controller);
    
    // Combine the provided signal with our controller's signal
    const signal = options.signal ? 
      this.createCombinedSignal(controller.signal, options.signal) : 
      controller.signal;
    
    // Create a sanitized version of options for logging
    const sanitizedOptions = { ...options };
    if (sanitizedOptions.headers) {
      sanitizedOptions.headers = sanitizeHeaders(sanitizedOptions.headers);
    }
    
    // Log sanitized request details in development
    if (process.env.NODE_ENV !== 'production') {
      console.log(`API Request: ${method} ${url}`, sanitizedOptions);
    }
    
    try {
      const response = await fetch(url, {
        ...options,
        signal,
        headers: mergedHeaders,
      });
      
      // Clean up the AbortController reference
      this.abortControllers.delete(requestKey);
      
      if (!response.ok) {
        throw new ApiError(
          `API request failed: ${response.statusText}`,
          response.status
        );
      }
      
      const data = await response.json();
      
      // Log sanitized response in development
      if (process.env.NODE_ENV !== 'production') {
        console.log(`API Response: ${method} ${url}`, sanitizeData(data));
      }
      
      return {
        data: data as T,
        status: 'success',
      };
    } catch (error) {
      // Clean up the AbortController reference
      this.abortControllers.delete(requestKey);
      
      // Don't throw for aborted requests
      if (error instanceof DOMException && error.name === 'AbortError') {
        return Promise.reject(new ApiError('Request was cancelled', 499)); // 499 is "Client Closed Request"
      }
      
      // Handle and sanitize errors
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Create sanitized error for other types of errors
      const errorMessage = error instanceof Error
        ? sanitizeErrorMessage(error.message)
        : 'Unknown error occurred';
        
      throw new ApiError(errorMessage, 500);
    }
  }
  
  /**
   * Helper method for GET requests with AbortSignal support
   */
  protected async get<T>(url: string, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> {
    return this.fetchApi<T>(url, { ...options, method: 'GET' });
  }
  
  /**
   * Helper method for POST requests with security enhancements and AbortSignal support
   */
  protected async post<T>(url: string, data: any, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> {
    // Log sanitized request body in development
    if (process.env.NODE_ENV !== 'production') {
      console.log(`POST Request Body (sanitized): ${url}`, sanitizeData(data));
    }
    
    return this.fetchApi<T>(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  
  /**
   * Helper method for PUT requests with AbortSignal support
   */
  protected async put<T>(url: string, data: any, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> {
    return this.fetchApi<T>(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
  
  /**
   * Helper method for DELETE requests with AbortSignal support
   */
  protected async delete<T>(url: string, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> {
    return this.fetchApi<T>(url, { ...options, method: 'DELETE' });
  }
}