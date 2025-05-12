import { NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import { createClient } from "@/lib/supabase"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const { poolId, strategyId } = await request.json()

    if (!poolId && !strategyId) {
      return NextResponse.json({ error: "Either poolId or strategyId is required" }, { status: 400 })
    }

    const supabase = createClient()
    let poolData
    let strategyData

    // Fetch pool data if poolId is provided
    if (poolId) {
      const { data, error } = await supabase.from("liquidity_pools").select("*").eq("id", poolId).single()

      if (error) {
        console.error("Error fetching pool data:", error)
        return NextResponse.json({ error: "Failed to fetch pool data" }, { status: 500 })
      }

      poolData = data
    }

    // Fetch strategy data if strategyId is provided
    if (strategyId) {
      const { data: strategy, error: strategyError } = await supabase
        .from("strategies")
        .select("*")
        .eq("id", strategyId)
        .single()

      if (strategyError) {
        console.error("Error fetching strategy data:", strategyError)
        return NextResponse.json({ error: "Failed to fetch strategy data" }, { status: 500 })
      }

      strategyData = strategy

      // Fetch associated pools for the strategy
      const { data: strategyPools, error: poolsError } = await supabase
        .from("strategy_pools")
        .select("pool_id, allocation_percentage")
        .eq("strategy_id", strategyId)

      if (!poolsError && strategyPools) {
        const poolIds = strategyPools.map((sp) => sp.pool_id).filter(Boolean)

        if (poolIds.length > 0) {
          const { data: pools } = await supabase.from("liquidity_pools").select("*").in("id", poolIds)

          if (pools) {
            strategyData.pools = pools.map((pool) => {
              const strategyPool = strategyPools.find((sp) => sp.pool_id === pool.id)
              return {
                ...pool,
                allocation_percentage: strategyPool?.allocation_percentage || 0,
              }
            })
          }
        }
      }
    }

    // Prepare data for AI analysis
    const analysisData = {
      pool: poolData,
      strategy: strategyData,
    }

    // Generate risk assessment using Groq
    const prompt = `
      You are a DeFi risk assessment expert specializing in Tezos liquidity pools. Analyze the following data and provide a comprehensive risk assessment:
      
      ${JSON.stringify(analysisData, null, 2)}
      
      Provide a detailed risk assessment in the following JSON format:
      {
        "overall_risk_score": number between 1-10,
        "risk_factors": [
          {
            "factor": "name of risk factor",
            "severity": "Low", "Medium", or "High",
            "description": "detailed description of the risk",
            "impact": "potential impact on investment"
          }
        ],
        "mitigation_strategies": [
          {
            "strategy": "name of mitigation strategy",
            "description": "detailed description of the strategy",
            "effectiveness": "Low", "Medium", or "High"
          }
        ],
        "market_conditions": {
          "current_assessment": "assessment of current market conditions",
          "outlook": "short-term outlook"
        },
        "recommendations": [
          "specific actionable recommendation"
        ]
      }
      
      Only return valid JSON, no other text.
    `

    try {
      const { text } = await generateText({
        model: groq("llama3-70b-8192"),
        prompt,
        temperature: 0.2,
        maxTokens: 2000,
      })

      const riskAssessment = JSON.parse(text)

      // Store the risk assessment in the database
      const { error: insertError } = await supabase.from("risk_assessments").insert({
        pool_id: poolId || null,
        strategy_id: strategyId || null,
        assessment: riskAssessment,
        created_at: new Date().toISOString(),
      })

      if (insertError) {
        console.error("Error storing risk assessment:", insertError)
      }

      return NextResponse.json(riskAssessment)
    } catch (error) {
      console.error("Error generating risk assessment with Groq:", error)

      // Fallback risk assessment if AI fails
      const fallbackAssessment = generateFallbackRiskAssessment(analysisData)
      return NextResponse.json(fallbackAssessment)
    }
  } catch (error) {
    console.error("Error in risk assessment:", error)
    return NextResponse.json({ error: "Failed to generate risk assessment" }, { status: 500 })
  }
}

function generateFallbackRiskAssessment(data: any) {
  // Generate a basic risk assessment based on the data
  const pool = data.pool
  const strategy = data.strategy

  let riskScore = 5 // Default medium risk
  const riskFactors = []
  const mitigationStrategies = []

  if (pool) {
    // Adjust risk score based on pool risk level
    if (pool.risk_level === "low") {
      riskScore = 3
    } else if (pool.risk_level === "medium") {
      riskScore = 5
    } else if (pool.risk_level === "high") {
      riskScore = 8
    }

    // Add basic risk factors
    riskFactors.push({
      factor: "Impermanent Loss",
      severity: pool.risk_level === "high" ? "High" : pool.risk_level === "medium" ? "Medium" : "Low",
      description: "Risk of loss due to price divergence between paired assets",
      impact: "Could reduce overall returns by 2-10% depending on market volatility",
    })

    riskFactors.push({
      factor: "Smart Contract Risk",
      severity: "Medium",
      description: "Potential vulnerabilities in the protocol's smart contracts",
      impact: "Could result in partial or total loss of funds in extreme cases",
    })

    // Add basic mitigation strategies
    mitigationStrategies.push({
      strategy: "Diversification",
      description: "Spread investments across multiple pools and protocols",
      effectiveness: "High",
    })

    mitigationStrategies.push({
      strategy: "Regular Rebalancing",
      description: "Adjust positions based on market conditions to minimize impermanent loss",
      effectiveness: "Medium",
    })
  }

  if (strategy) {
    // Adjust risk assessment based on strategy allocation
    if (strategy.stable_pairs_percentage > 60) {
      riskScore = Math.max(2, riskScore - 2)
      mitigationStrategies.push({
        strategy: "Increase Yield Opportunities",
        description: "Consider allocating a small portion to higher yield opportunities",
        effectiveness: "Medium",
      })
    } else if (strategy.high_volatility_percentage > 40) {
      riskScore = Math.min(9, riskScore + 2)
      mitigationStrategies.push({
        strategy: "Hedging",
        description: "Implement hedging strategies to protect against downside risk",
        effectiveness: "High",
      })
    }
  }

  return {
    overall_risk_score: riskScore,
    risk_factors: riskFactors,
    mitigation_strategies: mitigationStrategies,
    market_conditions: {
      current_assessment: "Market conditions are currently showing moderate volatility",
      outlook: "Short-term outlook suggests continued uncertainty with potential for increased volatility",
    },
    recommendations: [
      "Maintain a balanced portfolio with appropriate risk diversification",
      "Set up automated rebalancing to manage impermanent loss",
      "Monitor protocol developments and security audits regularly",
    ],
  }
}
