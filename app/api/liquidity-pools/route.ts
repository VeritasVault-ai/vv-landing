import { createSmartApiController } from "@/lib/api/smart-api-controller"

const controller = createSmartApiController("liquidity-pools", {
  // Function to fetch fresh data from external APIs
  fetchFreshData: async (params?: { limit?: number }) => {
    try {
      // In a real implementation, this would call Goldsky, etc.
      // For now, we'll return mock data

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1200))

      const allPools = [
        {
          id: "pool1",
          name: "XTZ/USDT",
          platform: "Plenty",
          token0: "XTZ",
          token1: "USDT",
          tvl: 12450000,
          apr: 14.2,
          volume24h: 3245000,
          change7d: 5.6,
        },
        {
          id: "pool2",
          name: "XTZ/ETH",
          platform: "Quipuswap",
          token0: "XTZ",
          token1: "ETH",
          tvl: 8760000,
          apr: 12.8,
          volume24h: 2180000,
          change7d: -2.3,
        },
        {
          id: "pool3",
          name: "XTZ/BTC",
          platform: "Plenty",
          token0: "XTZ",
          token1: "BTC",
          tvl: 7540000,
          apr: 10.5,
          volume24h: 1950000,
          change7d: 3.2,
        },
        {
          id: "pool4",
          name: "XTZ/USDC",
          platform: "Spicy",
          token0: "XTZ",
          token1: "USDC",
          tvl: 6820000,
          apr: 11.7,
          volume24h: 1780000,
          change7d: 1.8,
        },
        {
          id: "pool5",
          name: "XTZ/uUSD",
          platform: "Youves",
          token0: "XTZ",
          token1: "uUSD",
          tvl: 5930000,
          apr: 9.4,
          volume24h: 1540000,
          change7d: -1.2,
        },
        {
          id: "pool6",
          name: "XTZ/KUSD",
          platform: "Quipuswap",
          token0: "XTZ",
          token1: "KUSD",
          tvl: 4870000,
          apr: 8.9,
          volume24h: 1320000,
          change7d: 0.7,
        },
        {
          id: "pool7",
          name: "XTZ/LINK",
          platform: "Plenty",
          token0: "XTZ",
          token1: "LINK",
          tvl: 3950000,
          apr: 13.2,
          volume24h: 980000,
          change7d: 4.5,
        },
      ]

      // Apply limit if provided
      const limit = params?.limit || allPools.length
      const pools = allPools.slice(0, limit)

      return {
        pools,
        total: allPools.length,
        lastUpdated: new Date().toISOString(),
      }
    } catch (error) {
      console.error("Error fetching liquidity pools:", error)
      throw error
    }
  },

  // How often to refresh the data (in milliseconds)
  refreshInterval: 10 * 60 * 1000, // 10 minutes
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined

  return controller.handleRequest(request, { limit })
}
