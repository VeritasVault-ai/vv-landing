import { beforeEach, describe, expect, it, vi } from "vitest"

const {
  acquireLease,
  renewLease,
  releaseLease,
  syncAll,
  syncLiquidityPools,
  syncMarketData,
  syncProtocolMetrics,
} = vi.hoisted(() => ({
  acquireLease: vi.fn(),
  renewLease: vi.fn(),
  releaseLease: vi.fn(),
  syncAll: vi.fn(),
  syncLiquidityPools: vi.fn(),
  syncMarketData: vi.fn(),
  syncProtocolMetrics: vi.fn(),
}))

vi.mock("@/lib/services/scheduled-sync-lease", () => ({
  scheduledSyncLease: {
    acquire: acquireLease,
    renew: renewLease,
    release: releaseLease,
  },
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
    body: JSON.stringify("body" in options ? options.body : {}),
  })
}

function rawRequest(body: string) {
  return new Request("https://www.veritasvault.net/api/cron/sync", {
    method: "POST",
    headers: {
      authorization: "Bearer test-scheduler-secret",
      "content-type": "application/json",
    },
    body,
  })
}

describe("POST /api/cron/sync", () => {
  beforeEach(() => {
    process.env.CRON_SECRET = "test-scheduler-secret"
    vi.clearAllMocks()
    acquireLease.mockResolvedValue("lease-holder")
    renewLease.mockResolvedValue(undefined)
    releaseLease.mockResolvedValue(undefined)
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

  it.each([
    ["malformed JSON", rawRequest("{")],
    ["a null body", request({ token: "test-scheduler-secret", body: null })],
    ["an array body", request({ token: "test-scheduler-secret", body: [] })],
  ])("rejects %s", async (_label, invalidRequest) => {
    const response = await POST(invalidRequest)

    expect(response.status).toBe(400)
    expect(acquireLease).not.toHaveBeenCalled()
    expect(syncAll).not.toHaveBeenCalled()
  })

  it("runs the requested sync with an authorized POST", async () => {
    const response = await POST(request({
      token: "test-scheduler-secret",
      body: { type: "market-data" },
    }))

    expect(response.status).toBe(200)
    expect(syncMarketData).toHaveBeenCalledOnce()
    expect(releaseLease).toHaveBeenCalledWith("lease-holder")
  })

  it("rejects a run when the distributed lease is held", async () => {
    acquireLease.mockResolvedValueOnce(null)
    const response = await POST(request({ token: "test-scheduler-secret" }))

    expect(response.status).toBe(409)
    expect(syncAll).not.toHaveBeenCalled()
    expect(releaseLease).not.toHaveBeenCalled()
  })
})
