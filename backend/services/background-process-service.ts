import { syncService } from "./sync-service"
import { createClient } from "@/lib/supabase/supabase-client"

/**
 * Service for managing background data refresh processes
 */
export class BackgroundProcessService {
  /**
   * Start a background process to refresh data
   * @param dataType The type of data to refresh
   * @param options Additional options for the refresh process
   * @returns Promise that resolves when the process is initiated (not when completed)
   */
  static async startBackgroundProcess(
    dataType: string,
    options: Record<string, any> = {},
  ): Promise<{ processId: string }> {
    // Generate a unique process ID
    const processId = `${dataType}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

    // Record the process start in the database
    const supabase = createClient()
    await supabase.from("background_processes").insert({
      id: processId,
      data_type: dataType,
      status: "started",
      options: options,
      started_at: new Date().toISOString(),
    })

    // Start the actual background process without awaiting its completion
    this.executeBackgroundProcess(processId, dataType, options).catch((error) => {
      console.error(`Background process ${processId} failed:`, error)
      // Update process status to failed
      supabase
        .from("background_processes")
        .update({
          status: "failed",
          error_message: error.message,
          completed_at: new Date().toISOString(),
        })
        .eq("id", processId)
    })

    // Return the process ID immediately
    return { processId }
  }

  /**
   * Execute the background process
   * @param processId Unique ID for the process
   * @param dataType The type of data to refresh
   * @param options Additional options for the refresh process
   */
  private static async executeBackgroundProcess(
    processId: string,
    dataType: string,
    options: Record<string, any> = {},
  ): Promise<void> {
    const supabase = createClient()

    try {
      // Execute the appropriate sync operation based on data type
      switch (dataType) {
        case "LIQUIDITY_POOLS":
          await syncService.syncLiquidityPools()
          break
        case "MARKET_DATA":
          await syncService.syncMarketData()
          break
        case "PROTOCOL_METRICS":
          await syncService.syncProtocolMetrics()
          break
        case "ALL":
          await syncService.syncAll()
          break
        default:
          throw new Error(`Unknown data type: ${dataType}`)
      }

      // Update process status to completed
      await supabase
        .from("background_processes")
        .update({
          status: "completed",
          completed_at: new Date().toISOString(),
        })
        .eq("id", processId)

      // Update the last_updated timestamp for this data type
      await supabase.from("data_refresh_status").upsert(
        {
          data_type: dataType,
          last_updated: new Date().toISOString(),
          next_refresh: new Date(Date.now() + 3600000).toISOString(), // Default 1 hour
        },
        { onConflict: "data_type" },
      )
    } catch (error) {
      // Update process status to failed
      await supabase
        .from("background_processes")
        .update({
          status: "failed",
          error_message: error.message,
          completed_at: new Date().toISOString(),
        })
        .eq("id", processId)

      throw error
    }
  }

  /**
   * Check the status of a background process
   * @param processId The ID of the process to check
   * @returns The current status of the process
   */
  static async checkProcessStatus(
    processId: string,
  ): Promise<{ status: string; completedAt?: string; errorMessage?: string }> {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("background_processes")
      .select("status, completed_at, error_message")
      .eq("id", processId)
      .single()

    if (error) {
      throw new Error(`Failed to check process status: ${error.message}`)
    }

    return {
      status: data.status,
      completedAt: data.completed_at,
      errorMessage: data.error_message,
    }
  }
}
