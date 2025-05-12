import { BaseRepository } from "./base-repository"
import { createClient } from "@/lib/supabase/supabase-client"

export interface DataRefreshStatus {
  id?: string
  data_type: string
  last_updated: string
  next_refresh: string
  is_refreshing?: boolean
  refresh_count?: number
}

export class DataRefreshRepository extends BaseRepository<DataRefreshStatus> {
  constructor() {
    super("data_refresh_status")
  }

  /**
   * Get refresh status for a specific data type
   * @param dataType The type of data
   * @returns The refresh status or null if not found
   */
  async getRefreshStatus(dataType: string): Promise<DataRefreshStatus | null> {
    const supabase = createClient()

    const { data, error } = await supabase.from(this.tableName).select("*").eq("data_type", dataType).single()

    if (error) {
      if (error.code === "PGRST116") {
        // Record not found
        return null
      }

      console.error(`Error fetching refresh status for ${dataType}:`, error)
      throw new Error(`Failed to fetch refresh status: ${error.message}`)
    }

    return data as DataRefreshStatus
  }

  /**
   * Update the refresh status for a data type
   * @param dataType The type of data
   * @param isRefreshing Whether the data is currently being refreshed
   * @param lastUpdated When the data was last updated (optional)
   * @param nextRefresh When the data should next be refreshed (optional)
   */
  async updateRefreshStatus(
    dataType: string,
    isRefreshing: boolean,
    lastUpdated?: string,
    nextRefresh?: string,
  ): Promise<DataRefreshStatus> {
    const supabase = createClient()

    const updateData: Partial<DataRefreshStatus> = {
      is_refreshing: isRefreshing,
    }

    if (lastUpdated) {
      updateData.last_updated = lastUpdated
    }

    if (nextRefresh) {
      updateData.next_refresh = nextRefresh
    }

    // Increment refresh count if we're starting a refresh
    if (isRefreshing) {
      const { data: currentStatus } = await supabase
        .from(this.tableName)
        .select("refresh_count")
        .eq("data_type", dataType)
        .single()

      if (currentStatus) {
        updateData.refresh_count = (currentStatus.refresh_count || 0) + 1
      } else {
        updateData.refresh_count = 1
      }
    }

    const { data, error } = await supabase
      .from(this.tableName)
      .upsert(
        {
          data_type: dataType,
          ...updateData,
        },
        { onConflict: "data_type" },
      )
      .select()
      .single()

    if (error) {
      console.error(`Error updating refresh status for ${dataType}:`, error)
      throw new Error(`Failed to update refresh status: ${error.message}`)
    }

    return data as DataRefreshStatus
  }
}

export const dataRefreshRepository = new DataRefreshRepository()
