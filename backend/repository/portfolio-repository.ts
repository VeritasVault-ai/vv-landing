import { BaseRepository } from "./base-repository"
import type { Portfolio, AssetAllocation } from "@/lib/models/types"
import { createClient } from "@/lib/supabase/supabase"

export class PortfolioRepository extends BaseRepository<Portfolio> {
  constructor() {
    super("portfolios")
  }

  /**
   * Get portfolio for a user
   */
  async getForUser(userId: string): Promise<Portfolio | null> {
    const supabase = createClient()

    const { data, error } = await supabase
      .from(this.tableName)
      .select(`
        *,
        allocations:portfolio_allocations(*)
      `)
      .eq("user_id", userId)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        // Record not found
        return null
      }

      console.error("Error fetching portfolio:", error)
      throw new Error(`Failed to fetch portfolio: ${error.message}`)
    }

    return data as Portfolio
  }

  /**
   * Update asset allocations
   */
  async updateAllocations(portfolioId: string, allocations: AssetAllocation[]): Promise<void> {
    const supabase = createClient()

    // Start a transaction
    const { error: deleteError } = await supabase.from("portfolio_allocations").delete().eq("portfolio_id", portfolioId)

    if (deleteError) {
      console.error("Error deleting existing allocations:", deleteError)
      throw new Error(`Failed to update allocations: ${deleteError.message}`)
    }

    // Insert new allocations
    const { error: insertError } = await supabase.from("portfolio_allocations").insert(
      allocations.map((allocation) => ({
        portfolio_id: portfolioId,
        ...allocation,
      })),
    )

    if (insertError) {
      console.error("Error inserting new allocations:", insertError)
      throw new Error(`Failed to update allocations: ${insertError.message}`)
    }
  }
}

export const portfolioRepository = new PortfolioRepository()
