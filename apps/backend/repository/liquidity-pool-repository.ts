import { BaseRepository } from "./base-repository"
import type { LiquidityPool } from "@/lib/models/types"
import { createClient } from "@/lib/supabase/supabase-client"

export class LiquidityPoolRepository extends BaseRepository<LiquidityPool> {
  constructor() {
    super("liquidity_pools")
  }

  /**
   * Get pools by protocol
   */
  async getByProtocol(protocol: string): Promise<LiquidityPool[]> {
    return this.getAll({ filters: { protocol } })
  }

  /**
   * Get pools by risk level
   */
  async getByRiskLevel(riskLevel: string): Promise<LiquidityPool[]> {
    return this.getAll({ filters: { risk_level: riskLevel } })
  }

  /**
   * Get pools with performance metrics
   */
  async getWithPerformance(): Promise<LiquidityPool[]> {
    const supabase = createClient()

    const { data, error } = await supabase.from(this.tableName).select(`
        *,
        performance:pool_performance(*)
      `)

    if (error) {
      console.error("Error fetching pools with performance:", error)
      throw new Error(`Failed to fetch pools with performance: ${error.message}`)
    }

    return data as LiquidityPool[]
  }
}

export const liquidityPoolRepository = new LiquidityPoolRepository()
