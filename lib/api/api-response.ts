import { NextResponse } from "next/server"

/**
 * Standard API response format
 */
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
  meta?: {
    refreshStatus?: {
      lastUpdated?: string
      nextRefresh?: string
      isRefreshing?: boolean
    }
    processId?: string
    [key: string]: any
  }
}

/**
 * Utility class for creating standardized API responses
 */
export class ApiResponseUtil {
  /**
   * Create a success response
   * @param data The data to include in the response
   * @param message Optional success message
   * @param meta Optional metadata
   * @returns NextResponse with standardized format
   */
  static success<T>(data: T, message?: string, meta?: Record<string, any>): NextResponse {
    const response: ApiResponse<T> = {
      success: true,
      data,
      message,
      meta,
    }

    return NextResponse.json(response)
  }

  /**
   * Create an error response
   * @param error Error message or object
   * @param status HTTP status code
   * @param meta Optional metadata
   * @returns NextResponse with standardized format
   */
  static error(error: string | Error, status = 500, meta?: Record<string, any>): NextResponse {
    const errorMessage = error instanceof Error ? error.message : error

    const response: ApiResponse<null> = {
      success: false,
      error: errorMessage,
      meta,
    }

    return NextResponse.json(response, { status })
  }

  /**
   * Create a response for data that's being refreshed
   * @param data Current data (may be stale)
   * @param processId ID of the background refresh process
   * @param lastUpdated When the data was last updated
   * @param message Optional message
   * @returns NextResponse with standardized format
   */
  static refreshing<T>(data: T, processId: string, lastUpdated?: string, message?: string): NextResponse {
    const response: ApiResponse<T> = {
      success: true,
      data,
      message: message || "Data is being refreshed in the background",
      meta: {
        refreshStatus: {
          lastUpdated,
          isRefreshing: true,
        },
        processId,
      },
    }

    return NextResponse.json(response)
  }
}
