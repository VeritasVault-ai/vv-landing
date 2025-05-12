import { NextResponse } from "next/server"
import { syncService } from "@/lib/services/sync-service"

// This route is meant to be called by a cron job service like Vercel Cron
export async function GET(req: Request) {
  try {
    // Verify the request is from an authorized source
    // In production, you would check for a secret token
    const { searchParams } = new URL(req.url)
    const token = searchParams.get("token")

    if (token !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get the sync type from query params
    const syncType = searchParams.get("type") || "all"

    // Run the appropriate sync operation
    switch (syncType) {
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

    return NextResponse.json({ success: true, message: `Scheduled sync ${syncType} completed successfully` })
  } catch (error) {
    console.error("Error in cron sync API:", error)
    return NextResponse.json({ error: error.message || "Scheduled sync operation failed" }, { status: 500 })
  }
}
