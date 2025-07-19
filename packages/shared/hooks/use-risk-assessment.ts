"use client"

import { useState, useEffect } from "react"
import { getBrowserClient } from "@/lib/supabase"

interface RiskFactor {
  factor: string
  severity: "Low" | "Medium" | "High"
  description: string
  impact: string
}

interface MitigationStrategy {
  strategy: string
  description: string
  effectiveness: "Low" | "Medium" | "High"
}

interface MarketConditions {
  current_assessment: string
  outlook: string
}

export interface RiskAssessment {
  id: string
  pool_id?: string
  strategy_id?: string
  assessment: {
    overall_risk_score: number
    risk_factors: RiskFactor[]
    mitigation_strategies: MitigationStrategy[]
    market_conditions: MarketConditions
    recommendations: string[]
  }
  created_at: string
  updated_at?: string
}

export function useRiskAssessment(poolId?: string, strategyId?: string) {
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessment | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const supabase = getBrowserClient()

  useEffect(() => {
    if (!poolId && !strategyId) return

    const fetchRiskAssessment = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Try to fetch existing assessment first
        const query = supabase.from("risk_assessments").select("*").order("created_at", { ascending: false }).limit(1)

        if (poolId) {
          query.eq("pool_id", poolId)
        } else if (strategyId) {
          query.eq("strategy_id", strategyId)
        }

        const { data, error: fetchError } = await query

        if (fetchError) {
          throw fetchError
        }

        if (data && data.length > 0) {
          setRiskAssessment(data[0] as RiskAssessment)
        } else {
          // No existing assessment, generate a new one
          const response = await fetch("/api/ai/risk-assessment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ poolId, strategyId }),
          })

          if (!response.ok) {
            throw new Error("Failed to generate risk assessment")
          }

          const assessmentData = await response.json()

          // Fetch the newly created assessment
          const { data: newData, error: newFetchError } = await query

          if (newFetchError) {
            throw newFetchError
          }

          if (newData && newData.length > 0) {
            setRiskAssessment(newData[0] as RiskAssessment)
          } else {
            // If we still don't have the assessment from the database,
            // create a temporary one with the API response
            setRiskAssessment({
              id: "temp",
              pool_id: poolId,
              strategy_id: strategyId,
              assessment: assessmentData,
              created_at: new Date().toISOString(),
            })
          }
        }
      } catch (err) {
        console.error("Error fetching risk assessment:", err)
        setError(err instanceof Error ? err : new Error("Failed to fetch risk assessment"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchRiskAssessment()
  }, [poolId, strategyId, supabase])

  const generateNewAssessment = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch("/api/ai/risk-assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ poolId, strategyId }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate risk assessment")
      }

      // Fetch the newly created assessment
      const query = supabase.from("risk_assessments").select("*").order("created_at", { ascending: false }).limit(1)

      if (poolId) {
        query.eq("pool_id", poolId)
      } else if (strategyId) {
        query.eq("strategy_id", strategyId)
      }

      const { data, error: fetchError } = await query

      if (fetchError) {
        throw fetchError
      }

      if (data && data.length > 0) {
        setRiskAssessment(data[0] as RiskAssessment)
      }

      return data?.[0] as RiskAssessment
    } catch (err) {
      console.error("Error generating new risk assessment:", err)
      setError(err instanceof Error ? err : new Error("Failed to generate new risk assessment"))
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { riskAssessment, isLoading, error, generateNewAssessment }
}
