/**
 * Service for managing data freshness and refresh policies
 */
export class DataFreshnessService {
  // Default refresh intervals in milliseconds
  private static readonly DEFAULT_REFRESH_INTERVALS = {
    LIQUIDITY_POOLS: 3600000, // 1 hour
    MARKET_DATA: 300000, // 5 minutes
    PROTOCOL_METRICS: 1800000, // 30 minutes
    RISK_ASSESSMENT: 86400000, // 24 hours
    PORTFOLIO: 1800000, // 30 minutes
    ACTIVITIES: 600000, // 10 minutes
    EVENTS: 3600000, // 1 hour
    PERFORMANCE: 1800000, // 30 minutes
  }

  /**
   * Check if data needs to be refreshed based on lastUpdated timestamp
   * @param dataType The type of data being checked
   * @param lastUpdated ISO string timestamp when data was last updated
   * @returns boolean indicating if data should be refreshed
   */
  static needsRefresh(
    dataType: keyof typeof DataFreshnessService.DEFAULT_REFRESH_INTERVALS,
    lastUpdated: string | null,
  ): boolean {
    // If no lastUpdated timestamp, data needs refresh
    if (!lastUpdated) {
      return true
    }

    const lastUpdatedTime = new Date(lastUpdated).getTime()
    const currentTime = Date.now()
    const refreshInterval = this.DEFAULT_REFRESH_INTERVALS[dataType]

    // Check if enough time has passed since last update
    return currentTime - lastUpdatedTime > refreshInterval
  }

  /**
   * Get the refresh interval for a specific data type
   * @param dataType The type of data
   * @returns Refresh interval in milliseconds
   */
  static getRefreshInterval(dataType: keyof typeof DataFreshnessService.DEFAULT_REFRESH_INTERVALS): number {
    return this.DEFAULT_REFRESH_INTERVALS[dataType]
  }

  /**
   * Calculate next refresh time
   * @param dataType The type of data
   * @returns ISO string timestamp for next scheduled refresh
   */
  static getNextRefreshTime(dataType: keyof typeof DataFreshnessService.DEFAULT_REFRESH_INTERVALS): string {
    const nextRefreshTime = new Date(Date.now() + this.DEFAULT_REFRESH_INTERVALS[dataType])
    return nextRefreshTime.toISOString()
  }
}
