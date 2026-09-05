import { describe, expect, it, vi } from "vitest"

import { createSmartApiController } from "./smart-api-controller"

describe("createSmartApiController", () => {
  it("reuses unexpired cached responses", async () => {
    const fetchFreshData = vi.fn(async (params?: { limit: number }) => params?.limit)
    const controller = createSmartApiController("test", { fetchFreshData, refreshInterval: 60_000 })
    const request = new Request("https://example.invalid/api/test")

    await controller.handleRequest(request, { limit: 5 })
    await controller.handleRequest(request, { limit: 5 })

    expect(fetchFreshData).toHaveBeenCalledTimes(1)
  })

  it("evicts the oldest entry when the cache reaches its bound", async () => {
    const fetchFreshData = vi.fn(async (params?: { limit: number }) => params?.limit)
    const controller = createSmartApiController("test", { fetchFreshData, refreshInterval: 60_000 })
    const request = new Request("https://example.invalid/api/test")

    for (let limit = 0; limit <= 100; limit += 1) {
      await controller.handleRequest(request, { limit })
    }
    await controller.handleRequest(request, { limit: 0 })

    expect(fetchFreshData).toHaveBeenCalledTimes(102)
  })
})
