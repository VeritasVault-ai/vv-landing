import { describe, expect, it } from "vitest"
import { NextRequest } from "next/server"
import { isProtectedAlphaRoute, isRetiredCorporateRoute, middleware } from "./middleware"

describe("alpha route policy", () => {
  it.each(["/dashboard", "/settings", "/analytics/reports", "/admin"])(
    "fails closed for protected UI route %s",
    (pathname) => {
      expect(isProtectedAlphaRoute(pathname)).toBe(true)
    },
  )

  it.each(["/", "/standard", "/auth/login", "/api/health"])(
    "keeps public route %s outside the protected list",
    (pathname) => {
      expect(isProtectedAlphaRoute(pathname)).toBe(false)
    },
  )

  it.each(["/corporate", "/corporate/dashboard", "/corporate-version/pricing"])(
    "retires Corporate prototype route %s",
    (pathname) => {
      expect(isRetiredCorporateRoute(pathname)).toBe(true)
    },
  )

  it("redirects a protected route to the unavailable sign-in page", async () => {
    const response = await middleware(new NextRequest("https://www.veritasvault.net/settings"))

    expect(response.status).toBe(307)
    expect(response.headers.get("location")).toBe("https://www.veritasvault.net/auth/login")
  })

  it("redirects a Corporate route to the Standard landing", async () => {
    const response = await middleware(new NextRequest("https://www.veritasvault.net/corporate/dashboard"))

    expect(response.status).toBe(307)
    expect(response.headers.get("location")).toBe("https://www.veritasvault.net/standard")
  })
})
