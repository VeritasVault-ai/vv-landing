import { beforeEach, describe, expect, it, vi } from "vitest"

const { loadAppInsights, trackEvent, trackPageView } = vi.hoisted(() => ({
  loadAppInsights: vi.fn(),
  trackEvent: vi.fn(),
  trackPageView: vi.fn(),
}))

vi.mock("@microsoft/applicationinsights-web", () => ({
  ApplicationInsights: class {
    loadAppInsights = loadAppInsights
    trackEvent = trackEvent
    trackPageView = trackPageView
  },
}))

describe("Application Insights analytics provider", () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
    delete process.env.NEXT_PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING
  })

  it("is disabled when no connection string is configured", async () => {
    const provider = await import("./provider")
    expect(provider.analyticsEnabled()).toBe(false)

    provider.trackEvent("test_event")
    expect(loadAppInsights).not.toHaveBeenCalled()
  })

  it("loads Application Insights lazily and records an event", async () => {
    process.env.NEXT_PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING =
      "InstrumentationKey=00000000-0000-0000-0000-000000000000"

    const provider = await import("./provider")
    expect(provider.analyticsEnabled()).toBe(true)

    provider.trackEvent("test_event", { source: "unit-test" })

    await vi.waitFor(() => {
      expect(loadAppInsights).toHaveBeenCalledOnce()
      expect(trackEvent).toHaveBeenCalledWith(
        { name: "test_event" },
        { source: "unit-test" },
      )
    })
  })

  it("initializes browser telemetry and records the initial page view", async () => {
    process.env.NEXT_PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING =
      "InstrumentationKey=00000000-0000-0000-0000-000000000000"

    const provider = await import("./provider")
    provider.initializeAnalytics()

    await vi.waitFor(() => {
      expect(loadAppInsights).toHaveBeenCalledOnce()
      expect(trackPageView).toHaveBeenCalledOnce()
    })
  })
})
