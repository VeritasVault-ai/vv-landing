import { BaseRepository } from "./base-repository"
import type { RiskAssessment } from "@/lib/models/types"
import { createClient } from "@/lib/supabase/supabase-client"

export class RiskAssessmentRepository extends BaseRepository<RiskAssessment> {
  constructor() {
    super("risk_assessments")
  }

  /**
   * Get latest risk assessment for a user
   */
  async getLatestForUser(userId: string): Promise<RiskAssessment | null> {
    const supabase = createClient()

    const { data, error } = await supabase
      .from(this.tableName)
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        // Record not found
        return null
      }

      console.error("Error fetching latest risk assessment:", error)
      throw new Error(`Failed to fetch latest risk assessment: ${error.message}`)
    }

    return data as RiskAssessment
  }
}

export const riskAssessmentRepository = new RiskAssessmentRepository()
