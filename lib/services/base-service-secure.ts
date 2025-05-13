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
 * Redacts sensitive information such as API keys, tokens, secrets, and passwords from error messages.
 *
 * @param message - The error message to sanitize.
 * @returns The sanitized error message with sensitive values replaced by [REDACTED].
 */
function sanitizeErrorMessage(message: string): string {
  // Remove potential API keys, tokens, or credentials from error messages
  return message.replace(
    /(api[_-]?key|token|key|secret|password|credential|auth)[=:]\s*["']?\w+["']?/gi,
    '$1=[REDACTED]'
  );
}

/**
 * Recursively redacts sensitive fields in data structures to prevent exposure of confidential information.
 *
 * Sensitive fields such as passwords, tokens, secrets, and API keys are replaced with '[REDACTED]'.
 *
 * @param data - The input data to sanitize.
 * @returns The sanitized data with sensitive fields redacted.
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
  
  // Redact sensitive fields
  for (const field of sensitiveFields) {
    if (field in sanitized) {
      sanitized[field] = '[REDACTED]';
    }
  }
  
  // Recursively sanitize nested objects
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
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
  
  constructor() {
    // Use environment validation to safely get API base URL
    this.apiBaseUrl = getRequiredEnv('NEXT_PUBLIC_APP_URL');
  }

  /**
   * Base fetch method with error handling, response parsing, and security enhancements
   */
  protected async fetchApi<T>(
    url: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    // Create a sanitized version of options for logging
    const sanitizedOptions = { ...options };
    if (sanitizedOptions.headers) {
      sanitizedOptions.headers = { ...sanitizedOptions.headers };
      // Redact any authorization headers
      if ('Authorization' in sanitizedOptions.headers) {
        (sanitizedOptions.headers as any).Authorization = '[REDACTED]';
      }
    }
    
    // Log sanitized request details in development
    if (process.env.NODE_ENV !== 'production') {
      console.log(`API Request: ${url}`, sanitizedOptions);
    }

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

      const text = await response.text();
      const data = text ? JSON.parse(text) : null;
      
      // Log sanitized response in development
      if (process.env.NODE_ENV !== 'production') {
        console.log(`API Response: ${url}`, sanitizeData(data));
      }
      
      return {
        data: data as T,
        status: 'success',
      };
    } catch (error) {
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
   * Helper method for GET requests
   */
  protected async get<T>(url: string): Promise<ApiResponse<T>> {
    return this.fetchApi<T>(url, { method: 'GET' });
  }
  
  /**
   * Helper method for POST requests with security enhancements
   */
  protected async post<T>(url: string, data: any): Promise<ApiResponse<T>> {
    // Log sanitized request body in development
    if (process.env.NODE_ENV !== 'production') {
      console.log(`POST Request Body (sanitized): ${url}`, sanitizeData(data));
    }
    
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