import type { NextRequest, NextResponse } from "next/server"
import { DataFreshnessService } from "@/lib/services/data-freshness-service"
import { BackgroundProcessService } from "@/lib/services/background-process-service"
import { dataRefreshRepository } from "@/lib/repository/data-refresh-repository"
import { ApiResponseUtil } from "@/lib/api/api-response"
import { ErrorLoggingService } from "@/lib/services/error-logging-service"

/**
 * Controller for implementing smart data retrieval strategy
 */
export class SmartApiController {
  /**
   * Handle a data request with smart refresh logic
   * @param req The Next.js request object
   * @param dataType The type of data being requested
   * @param fetchCurrentData Function to fetch current data from the database
   * @param options Additional options
   * @returns NextResponse with the data and refresh status
   */
  static async handleDataRequest<T>(
    req: NextRequest,
    dataType: keyof typeof DataFreshnessService.DEFAULT_REFRESH_INTERVALS,
    fetchCurrentData: () => Promise<T>,
    options: {
      forceRefresh?: boolean
      refreshOptions?: Record<string, any>
    } = {},
  ): Promise<NextResponse> {
    try {
      // Check if force refresh is requested
      const { searchParams } = new URL(req.url)
      const forceRefresh = options.forceRefresh || searchParams.get("refresh") === "true"

      // Get current refresh status
      const refreshStatus = await dataRefreshRepository.getRefreshStatus(dataType)

      // Determine if data needs refresh
      const needsRefresh =
        forceRefresh || !refreshStatus || DataFreshnessService.needsRefresh(dataType, refreshStatus.last_updated)

      // Fetch current data (may be stale)
      const currentData = await fetchCurrentData()

      // If data doesn't need refresh or is already being refreshed, return current data
      if (!needsRefresh || (refreshStatus && refreshStatus.is_refreshing)) {
        return ApiResponseUtil.success(currentData, "Data retrieved successfully", {
          refreshStatus: {
            lastUpdated: refreshStatus?.last_updated,
            nextRefresh: refreshStatus?.next_refresh,
            isRefreshing: refreshStatus?.is_refreshing || false,
          },
        })
      }

      // Start background refresh process
      const { processId } = await BackgroundProcessService.startBackgroundProcess(
        dataType,
        options.refreshOptions || {},
      )

      // Update refresh status
      await dataRefreshRepository.updateRefreshStatus(
        dataType,
        true, // isRefreshing
      )

      // Return current data with refresh status
      return ApiResponseUtil.refreshing(
        currentData,
        processId,
        refreshStatus?.last_updated,
        "Data is being refreshed in the background",
      )
    } catch (error) {
      const normalizedError = error instanceof Error ? error : new Error(String(error))
      // Log the error
      await ErrorLoggingService.logError(`SmartApiController.handleDataRequest(${dataType})`, normalizedError, { url: req.url })

      // Return error response
      return ApiResponseUtil.error(`Failed to retrieve ${dataType} data: ${normalizedError.message}`, 500)
    }
  }

  /**
   * Check the status of a background refresh process
   * @param req The Next.js request object
   * @param processId The ID of the process to check
   * @returns NextResponse with the process status
   */
  static async checkProcessStatus(req: NextRequest, processId: string): Promise<NextResponse> {
    try {
      const status = await BackgroundProcessService.checkProcessStatus(processId)
      return ApiResponseUtil.success(status, "Process status retrieved")
    } catch (error) {
      const normalizedError = error instanceof Error ? error : new Error(String(error))
      await ErrorLoggingService.logError("SmartApiController.checkProcessStatus", normalizedError, { processId })
      return ApiResponseUtil.error(`Failed to check process status: ${normalizedError.message}`, 500)
    }
  }
}

/**
 * Factory function to create a smart API controller instance
 * @param options Configuration options for the controller
 * @returns A configured SmartApiController instance
 */
export function createSmartApiController<T, P = Record<string, never>>(
  dataType: string,
  options: {
    fetchFreshData: (params?: P) => Promise<T>
    refreshInterval?: number
  },
) {
  const cache = new Map<string, { data: T; expiresAt: number }>()

  return {
    async handleRequest(request: Request, params?: P): Promise<NextResponse> {
      try {
        const cacheKey = JSON.stringify(params ?? {})
        const cached = cache.get(cacheKey)
        if (cached && cached.expiresAt > Date.now()) {
          return ApiResponseUtil.success(cached.data, `${dataType} data retrieved from cache`)
        }

        const data = await options.fetchFreshData(params)
        if (options.refreshInterval && options.refreshInterval > 0) {
          cache.set(cacheKey, { data, expiresAt: Date.now() + options.refreshInterval })
        }
        return ApiResponseUtil.success(data, `${dataType} data retrieved successfully`)
      } catch (error) {
        const normalizedError = error instanceof Error ? error : new Error(String(error))
        await ErrorLoggingService.logError(`SmartApiController.${dataType}`, normalizedError, {
          url: request.url,
        })
        return ApiResponseUtil.error(`Failed to retrieve ${dataType} data: ${normalizedError.message}`, 500)
      }
    },
  }
}
