import { NextResponse } from "next/server"

// Goldsky GraphQL endpoint
// Update the GOLDSKY_API_URL to use a more reliable public API or your specific Goldsky URL
// Replace this:
// const GOLDSKY_API_URL =
//   "https://api.goldsky.com/api/public/project_cldf2o9pqagp43svs5rg9kta8/subgraphs/tezos-defi/0.0.1/gn"

// With your actual Goldsky URL or use a fallback:
const GOLDSKY_API_URL =
  process.env.GOLDSKY_API_URL ||
  "https://api.goldsky.com/api/public/project_YOUR_PROJECT_ID/subgraphs/YOUR_SUBGRAPH_NAME/VERSION/gn"

/**
 * Fetches the list of available protocols from Goldsky
 */
export async function GET() {
  try {
    // For now, always return mock data until the Goldsky subgraph is being set up
    console.log("Using mock data while Goldsky subgraph is being set up")
    return NextResponse.json(getMockProtocolData())

    // The rest of the function remains unchanged but will be skipped for now
    // You can uncomment this section once your Goldsky subgraph is ready
  } catch (error) {
    console.error("Error fetching protocols:", error)
    return NextResponse.json(getMockProtocolData())
  }
}

/**
 * Generate mock protocol data for development and preview environments
 */
function getMockProtocolData() {
  return [
    {
      id: "1",
      name: "Quipuswap",
      slug: "quipuswap",
      type: "DEX",
      totalValueLockedUSD: "1200000",
      cumulativeVolumeUSD: "5000000",
    },
    {
      id: "2",
      name: "Plenty",
      slug: "plenty",
      type: "DEX",
      totalValueLockedUSD: "800000",
      cumulativeVolumeUSD: "3000000",
    },
    {
      id: "3",
      name: "Youves",
      slug: "youves",
      type: "Lending",
      totalValueLockedUSD: "600000",
      cumulativeVolumeUSD: "2000000",
    },
    {
      id: "4",
      name: "Spicyswap",
      slug: "spicyswap",
      type: "DEX",
      totalValueLockedUSD: "400000",
      cumulativeVolumeUSD: "1500000",
    },
    {
      id: "5",
      name: "Crunchy",
      slug: "crunchy",
      type: "Yield",
      totalValueLockedUSD: "200000",
      cumulativeVolumeUSD: "800000",
    },
  ]
}
