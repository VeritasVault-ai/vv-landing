import { beforeEach, describe, expect, it, vi } from "vitest"

const { registerAzureMonitor } = vi.hoisted(() => ({
  registerAzureMonitor: vi.fn(),
}))

vi.mock("./instrumentation-node", () => ({ registerAzureMonitor }))

describe("server telemetry instrumentation", () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
    delete process.env.APPLICATIONINSIGHTS_CONNECTION_STRING
    process.env.NEXT_RUNTIME = "nodejs"
  })

  it("does nothing when the connection string is absent", async () => {
    const { register } = await import("./instrumentation")
    await register()
    expect(registerAzureMonitor).not.toHaveBeenCalled()
  })

  it("configures Azure Monitor for the Node runtime", async () => {
    const connectionString = "InstrumentationKey=00000000-0000-0000-0000-000000000000"
    process.env.APPLICATIONINSIGHTS_CONNECTION_STRING = connectionString

    const { register } = await import("./instrumentation")
    await register()

    expect(registerAzureMonitor).toHaveBeenCalledWith(connectionString)
  })
})
