import { NextResponse } from "next/server"

// Fetch DeFi protocol data
export async function GET() {
  try {
    // In a production environment, you would fetch this from a real API
    // For example: DefiLlama API
    const response = await fetch("https://api.llama.fi/protocols", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`DefiLlama API error: ${response.statusText}`)
    }

    const data = await response.json()

    // Filter and format the data
    const formattedData = data
      .filter((protocol: any) => protocol.category === "Dexes" || protocol.category === "Lending")
      .slice(0, 10)
      .map((protocol: any) => ({
        id: protocol.id,
        name: protocol.name,
        category: protocol.category,
        tvl: protocol.tvl,
        change_1d: protocol.change_1d,
        change_7d: protocol.change_7d,
        chains: protocol.chains,
      }))

    return NextResponse.json(formattedData)
  } catch (error) {
    console.error("Error fetching DeFi data:", error)

    // Fallback to mock data if API fails
    const mockData = [
      {
        id: "uniswap",
        name: "Uniswap",
        category: "Dexes",
        tvl: 5678901234,
        change_1d: 1.23,
        change_7d: -2.34,
        chains: ["Ethereum"],
      },
      {
        id: "aave",
        name: "Aave",
        category: "Lending",
        tvl: 4567890123,
        change_1d: 0.87,
        change_7d: 3.21,
        chains: ["Ethereum", "Polygon", "Avalanche"],
      },
      {
        id: "quipuswap",
        name: "QuipuSwap",
        category: "Dexes",
        tvl: 123456789,
        change_1d: 2.45,
        change_7d: 5.67,
        chains: ["Tezos"],
      },
    ]

    return NextResponse.json(mockData)
  }
}
