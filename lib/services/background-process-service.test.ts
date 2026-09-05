import { beforeEach, describe, expect, it, vi } from "vitest"

const { runLeasedSync, updateEq, upsert } = vi.hoisted(() => ({
  runLeasedSync: vi.fn(),
  updateEq: vi.fn(),
  upsert: vi.fn(),
}))

vi.mock("./leased-sync-service", () => ({ runLeasedSync }))

vi.mock("@/lib/supabase/supabase-client", () => ({
  createClient: () => ({
    from: (table: string) => {
      if (table === "background_processes") {
        return { update: () => ({ eq: updateEq }) }
      }
      return { upsert }
    },
  }),
}))

import { BackgroundProcessService } from "./background-process-service"

describe("BackgroundProcessService synchronization", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    runLeasedSync.mockResolvedValue(undefined)
    updateEq.mockResolvedValue(undefined)
    upsert.mockResolvedValue(undefined)
  })

  it.each([
    ["LIQUIDITY_POOLS", "liquidity-pools"],
    ["MARKET_DATA", "market-data"],
    ["PROTOCOL_METRICS", "protocol-metrics"],
    ["ALL", "all"],
  ])("runs %s through the shared lease", async (dataType, syncType) => {
    const execute = Reflect.get(BackgroundProcessService, "executeBackgroundProcess") as (
      processId: string,
      dataType: string,
    ) => Promise<void>

    await execute.call(BackgroundProcessService, "process-id", dataType)

    expect(runLeasedSync).toHaveBeenCalledWith(syncType)
  })
})
