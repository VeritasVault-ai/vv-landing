import { BaseRepository } from "./base-repository"
import type { Strategy } from "@/lib/models/types"
import { createClient } from "@/lib/supabase/supabase"

export class StrategyRepository extends BaseRepository<Strategy> {
  constructor() {
    super("strategies")
  }

  /**
   * Get strategies by user ID
   */
  async getByUserId(userId: string): Promise<Strategy[]> {
    return this.getAll({ filters: { user_id: userId } })
  }

  /**
   * Get strategies with performance metrics
   */
  async getWithPerformance(): Promise<Strategy[]> {
    const supabase = createClient()

    const { data, error } = await supabase.from(this.tableName).select(`
        *,
        performance:strategy_performance(*)
      `)

    if (error) {
      console.error("Error fetching strategies with performance:", error)
      throw new Error(`Failed to fetch strategies with performance: ${error.message}`)
    }

    return data as Strategy[]
  }
}

export const strategyRepository = new StrategyRepository()
