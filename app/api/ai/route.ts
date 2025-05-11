import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Fallback data to use when AI generation is not available
const getFallbackData = () => ({
  fallback: true,
  prediction: {
    apy_forecast: Array(14)
      .fill(0)
      .map((_, i) => 5 + Math.sin(i * 0.5) * 2 + Math.random()),
    confidence: 0.7,
  },
  risk_assessment: [
    { pool: "Uniswap ETH/USDC", risk: "medium", score: 0.5 },
    { pool: "Curve 3pool", risk: "low", score: 0.3 },
    { pool: "Balancer WBTC/ETH", risk: "medium-high", score: 0.7 },
  ],
  recommendations: [
    { action: "hold", reason: "Stable market conditions" },
    { action: "rebalance", target: "Increase stablecoin exposure by 5%" },
  ],
  impermanent_loss: {
    analysis: "Moderate risk due to current market volatility",
    risk_level: "medium",
  },
})

export async function POST(req: NextRequest) {
  try {
    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.warn("OpenAI API key is missing. Using fallback data.")
      return NextResponse.json(getFallbackData())
    }

    // Safely parse the request body
    let poolData, marketData
    try {
      const body = await req.json()
      poolData = body.poolData
      marketData = body.marketData
    } catch (error) {
      console.error("Error parsing request body:", error)
      return NextResponse.json(
        {
          error: "Invalid request body",
          ...getFallbackData(),
        },
        { status: 400 },
      )
    }

    // Validate input data
    if (!poolData || !marketData) {
      return NextResponse.json(
        {
          error: "Missing required data",
          ...getFallbackData(),
        },
        { status: 400 },
      )
    }

    try {
      // Generate AI prediction based on provided data
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `
          Analyze the following DeFi liquidity pool data and market conditions to provide optimization recommendations:
          
          Pool Data: ${JSON.stringify(poolData)}
          Market Data: ${JSON.stringify(marketData)}
          
          Please provide:
          1. A prediction for APY changes over the next 14 days
          2. Risk assessment for each pool
          3. Recommended allocation changes to optimize returns
          4. Impermanent loss risk analysis
          
          Format the response as JSON with the following structure:
          {
            "prediction": {
              "apy_forecast": [array of daily predictions],
              "confidence": number
            },
            "risk_assessment": [array of pool risk assessments],
            "recommendations": [array of allocation recommendations],
            "impermanent_loss": {
              "analysis": string,
              "risk_level": string
            }
          }
        `,
        system:
          "You are an AI financial analyst specializing in DeFi liquidity management. Provide accurate, data-driven analysis and recommendations.",
      })

      // Parse the AI response
      const analysis = JSON.parse(text)
      return NextResponse.json(analysis)
    } catch (error) {
      console.error("AI generation error:", error)
      // Return fallback data if AI generation fails
      return NextResponse.json(getFallbackData())
    }
  } catch (error) {
    console.error("API error:", error)
    // Return fallback data for any other errors
    return NextResponse.json(getFallbackData(), { status: 500 })
  }
}

// Add HEAD method to support API availability check
export async function HEAD() {
  return new Response(null, { status: 200 })
}
