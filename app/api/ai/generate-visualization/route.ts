import { NextResponse } from "next/server"
import * as fal from "@fal-ai/serverless-client"

export const runtime = "nodejs"

// Initialize the FAL client
fal.config({
  credentials: process.env.FAL_KEY,
})

export async function POST(request: Request) {
  try {
    const { strategy } = await request.json()

    if (!strategy) {
      return NextResponse.json({ error: "Strategy data is required" }, { status: 400 })
    }

    // Create a prompt based on the strategy details
    const prompt = `
      A professional financial visualization of a DeFi liquidity strategy with the following allocation:
      ${strategy.stable_pairs_percentage || 30}% stable pairs (low risk),
      ${strategy.medium_volatility_percentage || 50}% medium volatility pairs (medium risk),
      ${strategy.high_volatility_percentage || 20}% high volatility pairs (high risk).
      Target APY: ${strategy.target_apy || 15}%.
      Style: Clean, professional financial dashboard visualization with charts and graphs.
      No text or labels.
    `

    // Generate the image using FAL
    const result = await fal.run({
      provider: "stability",
      model: "stable-diffusion-xl-1024-v1-0",
      input: {
        prompt,
        negative_prompt: "text, words, labels, watermark, low quality, blurry",
        num_inference_steps: 30,
        guidance_scale: 7.5,
        width: 1024,
        height: 768,
      },
    })

    return NextResponse.json({
      imageUrl: result.images[0].url,
      prompt,
    })
  } catch (error) {
    console.error("Error generating visualization:", error)
    return NextResponse.json({ error: "Failed to generate visualization" }, { status: 500 })
  }
}
