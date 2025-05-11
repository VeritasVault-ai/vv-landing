import { NextResponse } from "next/server"
import { syncService } from "@/lib/services/sync-service"
import { withAuth } from "@/lib/auth/auth-utils"

export async function POST(req: Request) {
  return withAuth(req, async (req, user) => {
    try {
      // Check if user has admin privileges
      if (!user.isAdmin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
      }

      // Get sync type from request body
      const { type } = await req.json()

      // Run the appropriate sync operation
      switch (type) {
        case "liquidity-pools":
          await syncService.syncLiquidityPools()
          break
        case "market-data":
          await syncService.syncMarketData()
          break
        case "protocol-metrics":
          await syncService.syncProtocolMetrics()
          break
        case "all":
          await syncService.syncAll()
          break
        default:
          return NextResponse.json({ error: "Invalid sync type" }, { status: 400 })
      }

      return NextResponse.json({ success: true, message: `Sync ${type} completed successfully` })
    } catch (error) {
      console.error("Error in sync API:", error)
      return NextResponse.json({ error: error.message || "Sync operation failed" }, { status: 500 })
    }
  })
}
