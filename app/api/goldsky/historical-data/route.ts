import { NextResponse } from "next/server"

// Goldsky GraphQL endpoint
// Replace this:
// const GOLDSKY_API_URL =
//   "https://api.goldsky.com/api/public/project_cldf2o9pqagp43svs5rg9kta8/subgraphs/tezos-defi/0.0.1/gn"

// With your actual Goldsky URL or use a fallback:
const GOLDSKY_API_URL =
  process.env.GOLDSKY_API_URL ||
  "https://api.goldsky.com/api/public/project_YOUR_PROJECT_ID/subgraphs/YOUR_SUBGRAPH_NAME/VERSION/gn"

/**
 * Fetches historical TVL and APY data from Goldsky
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const protocol = searchParams.get("protocol") || "all"
  const days = Number.parseInt(searchParams.get("days") || "30", 10)

  try {
    // For now, always return mock data until the Goldsky subgraph is being set up
    console.log("Using mock data while Goldsky subgraph is being set up")
    return NextResponse.json(getMockHistoricalData())

    // The rest of the function remains unchanged but will be skipped for now
    // You can uncomment this section once your Goldsky subgraph is ready
  } catch (error) {
    console.error("Error fetching historical data:", error)
    return NextResponse.json(getMockHistoricalData())
  }
}

/**
 * Process the raw data from Goldsky to format it for the frontend
 */
function processHistoricalData(snapshots: any[]) {
  // Group by protocol
  const protocolData: Record<string, any> = {}

  snapshots.forEach((snapshot) => {
    const protocolName = snapshot.protocol.name
    const date = new Date(snapshot.timestamp * 1000).toISOString().split("T")[0]

    if (!protocolData[protocolName]) {
      protocolData[protocolName] = {
        name: protocolName,
        slug: snapshot.protocol.slug,
        tvlHistory: [],
        apyHistory: [],
      }
    }

    protocolData[protocolName].tvlHistory.push({
      date,
      value: Number.parseFloat(snapshot.totalValueLockedUSD),
    })

    protocolData[protocolName].apyHistory.push({
      date,
      value: snapshot.apy ? Number.parseFloat(snapshot.apy) : null,
    })
  })

  return Object.values(protocolData)
}

/**
 * Generate mock historical data for development and preview environments
 */
function getMockHistoricalData() {
  const protocols = ["Quipuswap", "Plenty", "Youves", "Spicyswap", "Crunchy"]
  const result = []

  for (const protocol of protocols) {
    const tvlHistory = []
    const apyHistory = []

    // Generate 30 days of mock data
    const today = new Date()
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split("T")[0]

      // Generate realistic but random TVL values (in millions)
      const baseTvl = Math.random() * 10 + 1 // 1-11 million
      const dailyVariation = (Math.random() - 0.5) * 0.2 // +/- 10%
      const tvl = baseTvl * (1 + i * 0.01 + dailyVariation) * 1000000 // Growing trend with variation

      // Generate realistic but random APY values
      const baseApy = Math.random() * 15 + 5 // 5-20%
      const apyVariation = (Math.random() - 0.5) * 0.1 // +/- 5%
      const apy = baseApy * (1 + apyVariation)

      tvlHistory.push({ date: dateStr, value: tvl })
      apyHistory.push({ date: dateStr, value: apy })
    }

    result.push({
      name: protocol,
      slug: protocol.toLowerCase(),
      tvlHistory,
      apyHistory,
    })
  }

  return result
}
