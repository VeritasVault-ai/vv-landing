import { beforeEach, describe, expect, it, vi } from "vitest"

const { redirect } = vi.hoisted(() => ({
  redirect: vi.fn(),
}))

vi.mock("next/navigation", () => ({ redirect }))

import Home from "./page"
import LegacyStandardHomePage from "./standard-version/page"

describe("public entry routes", () => {
  beforeEach(() => {
    redirect.mockReset()
  })

  it("sends the root route directly to the Standard experience", () => {
    Home()
    expect(redirect).toHaveBeenCalledWith("/standard")
  })

  it("keeps the legacy Standard URL from rendering a blank page", () => {
    LegacyStandardHomePage()
    expect(redirect).toHaveBeenCalledWith("/standard")
  })
})
