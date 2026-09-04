import { beforeEach, describe, expect, it, vi } from "vitest"

const { syncAll, syncLiquidityPools, syncMarketData, syncProtocolMetrics } = vi.hoisted(() => ({
  syncAll: vi.fn(),
  syncLiquidityPools: vi.fn(),
  syncMarketData: vi.fn(),
  syncProtocolMetrics: vi.fn(),
}))

vi.mock("@/lib/services/sync-service", () => ({
  syncService: {
    syncAll,
    syncLiquidityPools,
    syncMarketData,
    syncProtocolMetrics,
  },
}))

import { POST } from "./route"

function request(options: { token?: string; body?: unknown } = {}) {
  const headers = new Headers({ "content-type": "application/json" })
  if (options.token) headers.set("authorization", `Bearer ${options.token}`)

  return new Request("https://www.veritasvault.net/api/cron/sync", {
    method: "POST",
    headers,
    body: JSON.stringify(options.body ?? {}),
  })
}

describe("POST /api/cron/sync", () => {
  beforeEach(() => {
    process.env.CRON_SECRET = "test-scheduler-secret"
    vi.clearAllMocks()
  })

  it("fails closed when the scheduler secret is unavailable", async () => {
    delete process.env.CRON_SECRET
    const response = await POST(request({ token: "test-scheduler-secret" }))
    expect(response.status).toBe(401)
  })

  it("rejects missing or incorrect credentials", async () => {
    expect((await POST(request())).status).toBe(401)
    expect((await POST(request({ token: "wrong" }))).status).toBe(401)
    expect(syncAll).not.toHaveBeenCalled()
  })

  it("rejects an unknown sync type", async () => {
    const response = await POST(request({ token: "test-scheduler-secret", body: { type: "unknown" } }))
    expect(response.status).toBe(400)
  })

  it("runs the requested sync with an authorized POST", async () => {
    const response = await POST(request({
      token: "test-scheduler-secret",
      body: { type: "market-data" },
    }))

    expect(response.status).toBe(200)
    expect(syncMarketData).toHaveBeenCalledOnce()
  })

  it("rejects overlapping runs", async () => {
    let finishFirstRun: (() => void) | undefined
    syncAll.mockImplementationOnce(() => new Promise<void>((resolve) => {
      finishFirstRun = resolve
    }))

    const firstRun = POST(request({ token: "test-scheduler-secret" }))
    await vi.waitFor(() => expect(syncAll).toHaveBeenCalledOnce())

    const overlap = await POST(request({ token: "test-scheduler-secret" }))
    expect(overlap.status).toBe(409)

    finishFirstRun?.()
    expect((await firstRun).status).toBe(200)
  })
})
