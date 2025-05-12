import { BaseRepository } from "./base-repository"
import type { Activity } from "@/lib/models/types"
import { createClient } from "@/lib/supabase/supabase"

export class ActivityRepository extends BaseRepository<Activity> {
  constructor() {
    super("activities")
  }

  /**
   * Get recent activities for a user
   */
  async getRecentForUser(userId: string, limit = 10): Promise<Activity[]> {
    const supabase = createClient()

    const { data, error } = await supabase
      .from(this.tableName)
      .select("*")
      .eq("user_id", userId)
      .order("timestamp", { ascending: false })
      .limit(limit)

    if (error) {
      console.error("Error fetching recent activities:", error)
      throw new Error(`Failed to fetch recent activities: ${error.message}`)
    }

    return data as Activity[]
  }

  /**
   * Get activities by type
   */
  async getByType(userId: string, type: string, limit = 10): Promise<Activity[]> {
    const supabase = createClient()

    const { data, error } = await supabase
      .from(this.tableName)
      .select("*")
      .eq("user_id", userId)
      .eq("type", type)
      .order("timestamp", { ascending: false })
      .limit(limit)

    if (error) {
      console.error("Error fetching activities by type:", error)
      throw new Error(`Failed to fetch activities by type: ${error.message}`)
    }

    return data as Activity[]
  }
}

export const activityRepository = new ActivityRepository()
