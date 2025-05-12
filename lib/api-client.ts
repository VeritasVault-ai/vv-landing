import { MOCK_NAVIGATION, MOCK_SETTINGS, MOCK_CONTENT } from "./mock-data"

// Custom error classes for better error handling
export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "NetworkError"
  }
}

// Simple in-memory cache
const cache: Record<string, { data: any; timestamp: number }> = {}
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Check if we're in a preview environment
const isPreviewEnvironment = () => {
  if (typeof window !== "undefined") {
    return (
      window.location.hostname.includes("vercel.app") ||
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    )
  }
  return process.env.NODE_ENV !== "production"
}

class ApiClient {
  private baseUrl: string
  private usePreviewMode: boolean

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api"
    this.usePreviewMode = isPreviewEnvironment()

    // Log the mode we're using
    if (typeof window !== "undefined") {
      console.log(`API Client initialized in ${this.usePreviewMode ? "preview" : "production"} mode`)
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    try {
      console.log(`Fetching data from ${url}...`)
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      })

      if (!response.ok) {
        throw new ApiError(`API error: ${response.statusText}`, response.status)
      }

      return await response.json()
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }

      // Handle network errors (like CORS, network offline, etc.)
      console.error(`Network error fetching ${endpoint}:`, error)
      throw new NetworkError(`Failed to fetch ${endpoint}`)
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    // In preview mode, return mock data for specific endpoints
    if (this.usePreviewMode) {
      if (endpoint === "/navigation") {
        console.log("Using mock navigation data in preview mode")
        return MOCK_NAVIGATION as unknown as T
      }
      if (endpoint.startsWith("/navigation/group/")) {
        const group = endpoint.split("/").pop()
        console.log(`Using mock navigation data for group ${group} in preview mode`)
        return MOCK_NAVIGATION.filter((item) => item.group === group) as unknown as T
      }
      if (endpoint === "/settings") {
        console.log("Using mock settings data in preview mode")
        return MOCK_SETTINGS as unknown as T
      }
      if (endpoint === "/content") {
        console.log("Using mock content data in preview mode")
        return MOCK_CONTENT as unknown as T
      }
    }

    return this.request<T>(endpoint)
  }

  async getCached<T>(endpoint: string, maxAge = CACHE_DURATION): Promise<T> {
    const cacheKey = endpoint
    const now = Date.now()

    // In preview mode, always return mock data for specific endpoints
    if (this.usePreviewMode) {
      if (endpoint === "/navigation") {
        console.log("Using mock navigation data in preview mode")
        return MOCK_NAVIGATION as unknown as T
      }
      if (endpoint.startsWith("/navigation/group/")) {
        const group = endpoint.split("/").pop()
        console.log(`Using mock navigation data for group ${group} in preview mode`)
        return MOCK_NAVIGATION.filter((item) => item.group === group) as unknown as T
      }
      if (endpoint === "/settings") {
        console.log("Using mock settings data in preview mode")
        return MOCK_SETTINGS as unknown as T
      }
      if (endpoint === "/content") {
        console.log("Using mock content data in preview mode")
        return MOCK_CONTENT as unknown as T
      }
    }

    // Check if we have a valid cached response
    if (cache[cacheKey] && now - cache[cacheKey].timestamp < maxAge) {
      return cache[cacheKey].data as T
    }

    try {
      // If not in cache or expired, make a new request
      const data = await this.get<T>(endpoint)

      // Update cache
      cache[cacheKey] = {
        data,
        timestamp: now,
      }

      return data
    } catch (error) {
      // If we have stale cache, return it rather than failing
      if (cache[cacheKey]) {
        console.warn(`Using stale cache for ${endpoint} due to error:`, error)
        return cache[cacheKey].data as T
      }

      // No cache available, check if we have mock data for this endpoint
      if (endpoint === "/navigation") {
        console.log("Falling back to mock navigation data after fetch error")
        return MOCK_NAVIGATION as unknown as T
      }
      if (endpoint.startsWith("/navigation/group/")) {
        const group = endpoint.split("/").pop()
        console.log(`Falling back to mock navigation data for group ${group} after fetch error`)
        return MOCK_NAVIGATION.filter((item) => item.group === group) as unknown as T
      }
      if (endpoint === "/settings") {
        console.log("Falling back to mock settings data after fetch error")
        return MOCK_SETTINGS as unknown as T
      }
      if (endpoint === "/content") {
        console.log("Falling back to mock content data after fetch error")
        return MOCK_CONTENT as unknown as T
      }

      // If all else fails, throw the error
      throw error
    }
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: "DELETE",
    })
  }

  // Clear the entire cache or a specific endpoint
  clearCache(endpoint?: string): void {
    if (endpoint) {
      delete cache[endpoint]
    } else {
      Object.keys(cache).forEach((key) => delete cache[key])
    }
  }
}

export const apiClient = new ApiClient()
