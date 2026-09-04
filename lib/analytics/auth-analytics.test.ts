import { beforeEach, describe, expect, it, vi } from "vitest"

const { trackEvent } = vi.hoisted(() => ({
  trackEvent: vi.fn(),
}))

vi.mock("./provider", () => ({ trackEvent }))

import { trackLoginAttempt } from "./auth-analytics"

describe("authentication analytics", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("removes undefined properties before the provider boundary", () => {
    trackLoginAttempt("sign-in", "github")

    expect(trackEvent).toHaveBeenCalledOnce()
    const properties = trackEvent.mock.calls[0][1]
    expect(trackEvent.mock.calls[0][0]).toBe("auth_login_attempt")
    expect(properties).toMatchObject({
      flag: "sign-in",
      method: "github",
      timestamp: expect.any(String),
    })
    expect(properties).not.toHaveProperty("email_domain")
  })
})
