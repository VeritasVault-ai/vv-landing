import { scheduledSyncLease } from "@/lib/services/scheduled-sync-lease"
import { syncService } from "@/lib/services/sync-service"

export const SYNC_TYPES = ["liquidity-pools", "market-data", "protocol-metrics", "all"] as const
export type SyncType = (typeof SYNC_TYPES)[number]

const LEASE_HEARTBEAT_MS = 60_000

export class SyncAlreadyRunningError extends Error {
  constructor() {
    super("A synchronization is already running")
    this.name = "SyncAlreadyRunningError"
  }
}

export async function runLeasedSync(syncType: SyncType): Promise<void> {
  const leaseHolder = await scheduledSyncLease.acquire()
  if (!leaseHolder) throw new SyncAlreadyRunningError()

  const syncAbortController = new AbortController()
  const syncSignal = syncAbortController.signal
  let leaseHeartbeat: ReturnType<typeof setInterval> | null = setInterval(() => {
    void scheduledSyncLease.renew(leaseHolder).catch((error) => {
      console.error("Could not renew synchronization lease:", error)
      if (leaseHeartbeat) {
        clearInterval(leaseHeartbeat)
        leaseHeartbeat = null
      }
      syncAbortController.abort(new Error("Synchronization lease was lost"))
    })
  }, LEASE_HEARTBEAT_MS)

  try {
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
  } finally {
    if (leaseHeartbeat) clearInterval(leaseHeartbeat)
    await scheduledSyncLease.release(leaseHolder).catch((error) => {
      console.error("Could not release synchronization lease:", error)
    })
  }
}
