import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/auth/auth-utils"
import {
  runLeasedSync,
  SYNC_TYPES,
  SyncAlreadyRunningError,
  type SyncType,
} from "../../../lib/services/leased-sync-service"

export async function POST(req: Request) {
  return withAuth(req as NextRequest, async (req, user) => {
    try {
      // Check if user has admin privileges
      if (!user.isAdmin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
      }

      // Get sync type from request body
      const { type } = await req.json()

      if (typeof type !== "string" || !SYNC_TYPES.includes(type as SyncType)) {
        return NextResponse.json({ error: "Invalid sync type" }, { status: 400 })
      }

      await runLeasedSync(type as SyncType, req.signal)

      return NextResponse.json({ success: true, message: `Sync ${type} completed successfully` })
    } catch (error) {
      if (error instanceof SyncAlreadyRunningError) {
        return NextResponse.json({ error: error.message }, { status: 409 })
      }
      console.error("Error in sync API:", error)
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "Sync operation failed" },
        { status: 500 },
      )
    }
  })
}
