import { NextResponse } from "next/server"
import { generateText } from "ai"
import { deepinfra } from "@ai-sdk/deepinfra"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const { userPreferences } = await request.json()

    if (!userPreferences) {
      return NextResponse.json({ error: "User preferences are required" }, { status: 400 })
    }

    const prompt = `
      You are a DeFi strategy expert. Create an optimal liquidity provision strategy based on these user preferences:
      
      Risk tolerance: ${userPreferences.riskTolerance || "Medium"}
      Investment horizon: ${userPreferences.investmentHorizon || "6 months"}
      Target APY: ${userPreferences.targetApy || "15%"}
      Preferred protocols: ${userPreferences.preferredProtocols?.join(", ") || "Any"}
      
      Return a JSON object with the following structure:
      {
        "name": "Strategy name",
        "description": "Brief strategy description",
        "risk_level": "Low, Medium, or High",
        "target_apy": number,
        "stable_pairs_percentage": number,
        "medium_volatility_percentage": number,
        "high_volatility_percentage": number,
        "recommended_pools": [
          {
            "name": "Pool name",
            "protocol": "Protocol name",
            "allocation_percentage": number
          }
        ],
        "rebalancing_frequency": "Weekly, Monthly, or Quarterly"
      }
      
      Only return valid JSON, no other text.
    `

    try {
      const { text } = await generateText({
        model: deepinfra("mistralai/mixtral-8x7b-instruct-v0.1"),
        prompt,
        temperature: 0.2,
        maxTokens: 1000,
      })

      const strategy = JSON.parse(text)
      return NextResponse.json(strategy)
    } catch (error) {
      console.error("Error generating strategy with DeepInfra:", error)

      // Fallback strategy if AI fails
      return NextResponse.json({
        name: `${userPreferences.riskTolerance || "Balanced"} Tezos Strategy`,
        description: "A diversified strategy across Tezos DeFi protocols optimized for your risk profile",
        risk_level: userPreferences.riskTolerance || "Medium",
        target_apy: Number.parseFloat(userPreferences.targetApy) || 15,
        stable_pairs_percentage:
          userPreferences.riskTolerance === "Low" ? 60 : userPreferences.riskTolerance === "High" ? 20 : 40,
        medium_volatility_percentage:
          userPreferences.riskTolerance === "Low" ? 30 : userPreferences.riskTolerance === "High" ? 40 : 40,
        high_volatility_percentage:
          userPreferences.riskTolerance === "Low" ? 10 : userPreferences.riskTolerance === "High" ? 40 : 20,
        recommended_pools: [
          {
            name: "Tezos Stable",
            protocol: "Plenty",
            allocation_percentage:
              userPreferences.riskTolerance === "Low" ? 40 : userPreferences.riskTolerance === "High" ? 15 : 25,
          },
          {
            name: "Tezos AMM 1",
            protocol: "QuipuSwap",
            allocation_percentage:
              userPreferences.riskTolerance === "Low" ? 30 : userPreferences.riskTolerance === "High" ? 25 : 30,
          },
          {
            name: "Etherlink DEX",
            protocol: "EtherSwap",
            allocation_percentage:
              userPreferences.riskTolerance === "Low" ? 20 : userPreferences.riskTolerance === "High" ? 35 : 25,
          },
          {
            name: "Etherlink Farm",
            protocol: "EtherYield",
            allocation_percentage:
              userPreferences.riskTolerance === "Low" ? 10 : userPreferences.riskTolerance === "High" ? 25 : 20,
          },
        ],
        rebalancing_frequency:
          userPreferences.investmentHorizon === "Short term"
            ? "Weekly"
            : userPreferences.investmentHorizon === "Long term"
              ? "Quarterly"
              : "Monthly",
      })
    }
  } catch (error) {
    console.error("Error generating strategy:", error)
    return NextResponse.json({ error: "Failed to generate strategy" }, { status: 500 })
  }
}
