import { getSession } from "next-auth/react"

// Error types for better error handling
export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }
}

export class AuthenticationError extends ApiError {
  constructor(message = "Authentication required") {
    super(message, 401)
    this.name = "AuthenticationError"
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = "Access forbidden") {
    super(message, 403)
    this.name = "ForbiddenError"
  }
}

// API client configuration
interface ApiClientConfig {
  baseUrl: string
  headers?: Record<string, string>
  timeout?: number
}

// Default configuration
const defaultConfig: ApiClientConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds
}

/**
 * API Client for making authenticated requests to the backend
 */
export class ApiClient {
  private config: ApiClientConfig

  constructor(config: Partial<ApiClientConfig> = {}) {
    this.config = { ...defaultConfig, ...config }
  }

  /**
   * Get authentication headers for requests
   */
  private async getAuthHeaders(): Promise<Record<string, string>> {
    const session = await getSession()

    if (!session?.accessToken) {
      return {}
    }

    return {
      Authorization: `Bearer ${session.accessToken}`,
    }
  }

  /**
   * Make an API request with authentication
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`
    const authHeaders = await this.getAuthHeaders()

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout)

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.config.headers,
          ...authHeaders,
          ...options.headers,
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // Handle HTTP errors
      if (!response.ok) {
        if (response.status === 401) {
          throw new AuthenticationError()
        }

        if (response.status === 403) {
          throw new ForbiddenError()
        }

        const errorText = await response.text()
        throw new ApiError(`API error: ${response.statusText} - ${errorText}`, response.status)
      }

      // Handle empty responses
      const contentType = response.headers.get("content-type")
      if (contentType?.includes("application/json")) {
        return await response.json()
      }

      return (await response.text()) as unknown as T
    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof ApiError) {
        throw error
      }

      if (error.name === "AbortError") {
        throw new ApiError("Request timeout", 408)
      }

      throw new ApiError(`Network error: ${error.message}`, 0)
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "GET",
    })
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data: any, options: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data: any, options: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, data: any, options: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data),
    })
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "DELETE",
    })
  }
}

// Export a singleton instance
export const apiClient = new ApiClient()
