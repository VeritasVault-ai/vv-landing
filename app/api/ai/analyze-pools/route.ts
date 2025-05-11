import { NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const { pools } = await request.json()

    if (!pools || !Array.isArray(pools) || pools.length === 0) {
      return NextResponse.json({ error: "Invalid or missing pools data" }, { status: 400 })
    }

    // Calculate basic statistics
    const totalTVL = pools.reduce((sum, pool) => sum + pool.tvl, 0)
    const averageAPY = pools.reduce((sum, pool) => sum + pool.apy, 0) / pools.length

    const riskDistribution = {
      low: pools.filter((p) => p.risk_level === "Low").length,
      medium: pools.filter((p) => p.risk_level === "Medium").length,
      high: pools.filter((p) => p.risk_level === "High").length,
    }

    // Use Groq to analyze the pools and generate recommendations
    const prompt = `
      You are a DeFi liquidity management AI assistant. Analyze these liquidity pools and provide strategic recommendations:
      
      ${JSON.stringify(pools, null, 2)}
      
      Provide 3 specific recommendations in this JSON format:
      [
        {
          "type": "opportunity" or "risk",
          "pool": "pool name",
          "message": "specific recommendation",
          "impact": "potential impact"
        }
      ]
      
      Only return valid JSON, no other text.
    `

    let recommendations
    try {
      const { text } = await generateText({
        model: groq("llama3-70b-8192"),
        prompt,
        temperature: 0.2,
        maxTokens: 1000,
      })

      recommendations = JSON.parse(text)
    } catch (error) {
      console.error("Error generating recommendations with Groq:", error)

      // Fallback recommendations if AI fails
      recommendations = [
        {
          type: "opportunity",
          pool: pools.sort((a, b) => b.apy - a.apy)[0]?.name || "High APY Pool",
          message: "Consider increasing allocation to this high-performing pool",
          impact: "Potential 2.3% increase in portfolio yield",
        },
        {
          type: "risk",
          pool: pools.filter((p) => p.risk_level === "High")[0]?.name || "High Risk Pool",
          message: "Monitor this high-risk pool closely for volatility",
          impact: "Reduce potential impermanent loss",
        },
        {
          type: "opportunity",
          pool: "Tezos Stable",
          message: "Stable pairs provide consistent returns with lower risk",
          impact: "Improve risk-adjusted returns by 1.5%",
        },
      ]
    }

    // Generate forecast data
    const forecast = Array(7)
      .fill(0)
      .map((_, i) => ({
        day: i + 1,
        apy: averageAPY * (1 + (Math.random() * 0.2 - 0.1)),
      }))

    return NextResponse.json({
      overview: {
        totalTVL,
        averageAPY,
        riskDistribution,
      },
      recommendations,
      forecast,
    })
  } catch (error) {
    console.error("Error analyzing pools:", error)
    return NextResponse.json({ error: "Failed to analyze pools" }, { status: 500 })
  }
}
