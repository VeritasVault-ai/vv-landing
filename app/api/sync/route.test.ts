import { beforeEach, describe, expect, it, vi } from "vitest"
import { NextRequest } from "next/server"

const { runLeasedSync } = vi.hoisted(() => ({
  runLeasedSync: vi.fn(),
}))

vi.mock("@/lib/auth/auth-utils", () => ({
  withAuth: async (
    req: Request,
    handler: (req: Request, user: { isAdmin: boolean }) => Promise<Response>,
  ) => handler(req, { isAdmin: true }),
}))

vi.mock("../../../lib/services/leased-sync-service", () => {
  class SyncAlreadyRunningError extends Error {}

  return {
    runLeasedSync,
    SYNC_TYPES: ["liquidity-pools", "market-data", "protocol-metrics", "all"],
    SyncAlreadyRunningError,
  }
})

import { SyncAlreadyRunningError } from "../../../lib/services/leased-sync-service"
import { POST } from "./route"

function request(type: string) {
  return new NextRequest("https://www.veritasvault.net/api/sync", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ type }),
  })
}

describe("POST /api/sync", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    runLeasedSync.mockResolvedValue(undefined)
  })

  it("runs an admin synchronization through the shared lease", async () => {
    const response = await POST(request("market-data"))

    expect(response.status).toBe(200)
    expect(runLeasedSync).toHaveBeenCalledWith("market-data", expect.any(AbortSignal))
  })

  it("returns conflict when another synchronization holds the lease", async () => {
    runLeasedSync.mockRejectedValueOnce(new SyncAlreadyRunningError())

    const response = await POST(request("all"))

    expect(response.status).toBe(409)
  })
})
