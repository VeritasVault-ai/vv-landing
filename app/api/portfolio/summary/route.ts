import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/auth/auth-utils"
import { liquidityPoolRepository } from "@/lib/repository/liquidity-pool-repository"
import { strategyRepository } from "@/lib/repository/strategy-repository"

export async function GET(req: NextRequest) {
  return withAuth(req, async (req, user) => {
    try {
      const { searchParams } = new URL(req.url)
      const filter = searchParams.get("filter") || "all"

      // Get user's portfolio data
      // In a real app, you would fetch the user's actual portfolio
      // For now, we'll generate some data based on the available pools and strategies

      // Get liquidity pools
      const pools = await liquidityPoolRepository.getAll()

      // Get strategies
      const strategies = await strategyRepository.getAll()

      // Generate allocation data based on filter
      let allocation = []

      if (filter === "all" || filter === "liquidity-pools") {
        // Add top 3 liquidity pools by TVL
        const topPools = pools
          .sort((a, b) => b.tvl - a.tvl)
          .slice(0, 3)
          .map((pool, index) => ({
            name: pool.name,
            value: pool.tvl * (Math.random() * 0.5 + 0.5), // Simulate user's allocation
            color: [`#4f46e5`, `#0ea5e9`, `#10b981`][index % 3],
          }))

        allocation = [...allocation, ...topPools]
      }

      if (filter === "all" || filter === "strategies") {
        // Add top 2 strategies
        const topStrategies = strategies.slice(0, 2).map((strategy, index) => ({
          name: strategy.name,
          value: Math.random() * 50000 + 10000, // Simulate value
          color: [`#f59e0b`, `#ec4899`][index % 2],
        }))

        allocation = [...allocation, ...topStrategies]
      }

      // Calculate total value
      const totalValue = allocation.reduce((sum, item) => sum + item.value, 0)

      // Generate performance data
      const performance = {
        daily: (Math.random() * 6 - 2).toFixed(2), // Between -2% and +4%
        weekly: (Math.random() * 10 - 3).toFixed(2), // Between -3% and +7%
        monthly: (Math.random() * 20 - 5).toFixed(2), // Between -5% and +15%
      }

      return NextResponse.json({
        allocation,
        totalValue,
        performance,
      })
    } catch (error) {
      console.error("Error in portfolio summary API:", error)
      return NextResponse.json({ error: error.message || "Failed to fetch portfolio data" }, { status: 500 })
    }
  })
}
