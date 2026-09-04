import { createHash, timingSafeEqual } from "node:crypto"
import { NextResponse } from "next/server"
import { scheduledSyncLease } from "@/lib/services/scheduled-sync-lease"
import { syncService } from "@/lib/services/sync-service"

const ALLOWED_SYNC_TYPES = ["liquidity-pools", "market-data", "protocol-metrics", "all"] as const
type SyncType = (typeof ALLOWED_SYNC_TYPES)[number]

function credentialsMatch(provided: string, expected: string): boolean {
  const providedDigest = createHash("sha256").update(provided).digest()
  const expectedDigest = createHash("sha256").update(expected).digest()
  return timingSafeEqual(providedDigest, expectedDigest)
}

function isAuthorized(req: Request): boolean {
  const expected = process.env.CRON_SECRET
  const authorization = req.headers.get("authorization")

  if (!expected || !authorization?.startsWith("Bearer ")) return false
  return credentialsMatch(authorization.slice("Bearer ".length), expected)
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let leaseHolder: string | null = null
  try {
    const body: unknown = await req.json().catch(() => ({}))
    const requestedType =
      typeof body === "object" && body !== null && "type" in body
        ? (body as { type?: unknown }).type
        : undefined
    const syncType = requestedType ?? "all"

    if (typeof syncType !== "string" || !ALLOWED_SYNC_TYPES.includes(syncType as SyncType)) {
      return NextResponse.json({ error: "Invalid sync type" }, { status: 400 })
    }

    leaseHolder = await scheduledSyncLease.acquire()
    if (!leaseHolder) {
      return NextResponse.json({ error: "A scheduled sync is already running" }, { status: 409 })
    }

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
    }

    return NextResponse.json({ success: true, message: `Scheduled sync ${syncType} completed successfully` })
  } catch (error) {
    console.error("Error in cron sync API:", error)
    return NextResponse.json({ error: "Scheduled sync operation failed" }, { status: 500 })
  } finally {
    if (leaseHolder) {
      await scheduledSyncLease.release(leaseHolder).catch((error) => {
        console.error("Could not release scheduled sync lease:", error)
      })
    }
  }
}
