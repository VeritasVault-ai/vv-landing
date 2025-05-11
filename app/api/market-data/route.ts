import { createSmartApiController } from "@/lib/api/smart-api-controller"

const controller = createSmartApiController("market-data", {
  // Function to fetch fresh data from external APIs
  fetchFreshData: async () => {
    try {
      // In a real implementation, this would call CoinGecko, Goldsky, etc.
      // For now, we'll return mock data

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return {
        metrics: {
          tvl: 245678900,
          tvlChange: 3.2,
          volume24h: 34567800,
          volumeChange: -1.8,
          xtzPrice: 1.23,
          xtzPriceChange: 2.5,
        },
        lastUpdated: new Date().toISOString(),
      }
    } catch (error) {
      console.error("Error fetching market data:", error)
      throw error
    }
  },

  // How often to refresh the data (in milliseconds)
  refreshInterval: 15 * 60 * 1000, // 15 minutes
})

export async function GET(request: Request) {
  return controller.handleRequest(request)
}
