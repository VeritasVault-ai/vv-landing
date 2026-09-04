import { createHash, timingSafeEqual } from "node:crypto"
import { NextResponse } from "next/server"
import { scheduledSyncLease } from "@/lib/services/scheduled-sync-lease"
import { syncService } from "@/lib/services/sync-service"

const ALLOWED_SYNC_TYPES = ["liquidity-pools", "market-data", "protocol-metrics", "all"] as const
type SyncType = (typeof ALLOWED_SYNC_TYPES)[number]
const LEASE_HEARTBEAT_MS = 60_000

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
  let leaseHeartbeat: ReturnType<typeof setInterval> | null = null
  let syncAbortController: AbortController | null = null
  try {
    let body: unknown
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
    }

    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return NextResponse.json({ error: "JSON body must be an object" }, { status: 400 })
    }

    const requestedType = (body as { type?: unknown }).type
    const syncType = requestedType ?? "all"

    if (typeof syncType !== "string" || !ALLOWED_SYNC_TYPES.includes(syncType as SyncType)) {
      return NextResponse.json({ error: "Invalid sync type" }, { status: 400 })
    }

    leaseHolder = await scheduledSyncLease.acquire()
    if (!leaseHolder) {
      return NextResponse.json({ error: "A scheduled sync is already running" }, { status: 409 })
    }

    const holderId = leaseHolder
    syncAbortController = new AbortController()
    const syncSignal = syncAbortController.signal
    leaseHeartbeat = setInterval(() => {
      void scheduledSyncLease.renew(holderId).catch((error) => {
        console.error("Could not renew scheduled sync lease:", error)
        if (leaseHeartbeat) {
          clearInterval(leaseHeartbeat)
          leaseHeartbeat = null
        }
        syncAbortController?.abort(new Error("Scheduled sync lease was lost"))
      })
    }, LEASE_HEARTBEAT_MS)

    switch (syncType) {
      case "liquidity-pools":
        await syncService.syncLiquidityPools(syncSignal)
        break
      case "market-data":
        await syncService.syncMarketData(syncSignal)
        break
      case "protocol-metrics":
        await syncService.syncProtocolMetrics(syncSignal)
        break
      case "all":
        await syncService.syncAll(syncSignal)
        break
    }
    syncSignal.throwIfAborted()

    return NextResponse.json({ success: true, message: `Scheduled sync ${syncType} completed successfully` })
  } catch (error) {
    console.error("Error in cron sync API:", error)
    return NextResponse.json({ error: "Scheduled sync operation failed" }, { status: 500 })
  } finally {
    if (leaseHeartbeat) clearInterval(leaseHeartbeat)
    if (leaseHolder) {
      await scheduledSyncLease.release(leaseHolder).catch((error) => {
        console.error("Could not release scheduled sync lease:", error)
      })
    }
  }
}
