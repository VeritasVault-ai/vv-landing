import { createSmartApiController } from "@/lib/api/smart-api-controller"

const controller = createSmartApiController("protocol-metrics", {
  // Function to fetch fresh data from external APIs
  fetchFreshData: async () => {
    try {
      // In a real implementation, this would call DeFiLlama, etc.
      // For now, we'll return mock data

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      return {
        protocols: [
          {
            name: "Plenty",
            tvl: 78450000,
            tvlChange: 4.2,
            poolCount: 32,
            avgApr: 12.5,
          },
          {
            name: "Quipuswap",
            tvl: 65230000,
            tvlChange: -1.8,
            poolCount: 28,
            avgApr: 10.2,
          },
          {
            name: "Youves",
            tvl: 42180000,
            tvlChange: 2.3,
            poolCount: 15,
            avgApr: 8.7,
          },
          {
            name: "Spicy",
            tvl: 31540000,
            tvlChange: 5.6,
            poolCount: 22,
            avgApr: 14.3,
          },
          {
            name: "Crunchy",
            tvl: 18920000,
            tvlChange: -0.7,
            poolCount: 12,
            avgApr: 9.8,
          },
        ],
        lastUpdated: new Date().toISOString(),
      }
    } catch (error) {
      console.error("Error fetching protocol metrics:", error)
      throw error
    }
  },

  // How often to refresh the data (in milliseconds)
  refreshInterval: 30 * 60 * 1000, // 30 minutes
})

export async function GET(request: Request) {
  return controller.handleRequest(request)
}
