import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

const { getTezosTokenData, getCoinHistoricalData } = vi.hoisted(() => ({
  getTezosTokenData: vi.fn(),
  getCoinHistoricalData: vi.fn(),
}))

vi.mock("@/lib/api/coingecko-client", () => ({
  coinGeckoClient: { getTezosTokenData, getCoinHistoricalData },
}))
vi.mock("@/lib/api/defillama-client", () => ({ defiLlamaClient: {} }))
vi.mock("@/lib/api/goldsky-client", () => ({ goldskyClient: {} }))
vi.mock("@/lib/repository/liquidity-pool-repository", () => ({ liquidityPoolRepository: {} }))

import { SyncService } from "./sync-service"

describe("SyncService cancellation", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("preserves an unrelated upstream failure when cancellation races it", async () => {
    const controller = new AbortController()
    const upstreamFailure = new Error("upstream failed")
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined)
    getTezosTokenData.mockImplementation(async () => {
      controller.abort(new Error("lease lost"))
      throw upstreamFailure
    })

    await expect(new SyncService().syncMarketData(controller.signal)).rejects.toThrow(
      "Failed to sync market data: upstream failed",
    )
    expect(consoleError).toHaveBeenCalledWith("Error syncing market data:", upstreamFailure)
    expect(getCoinHistoricalData).not.toHaveBeenCalled()
  })
})
