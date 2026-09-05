import { beforeEach, describe, expect, it, vi } from "vitest"
import { NextRequest } from "next/server"

const { authGetUser, from } = vi.hoisted(() => ({
  authGetUser: vi.fn(),
  from: vi.fn(),
}))

vi.mock("server-only", () => ({}))
vi.mock("@/lib/supabase/server", () => ({
  createRequestServerClient: () => ({ auth: { getUser: authGetUser }, from }),
}))

import { GET } from "./route"

describe("GET /api/settings", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("rejects an unauthenticated request before querying any table", async () => {
    authGetUser.mockResolvedValue({ data: { user: null }, error: null })

    const response = await GET(new NextRequest("https://www.veritasvault.net/api/settings"))

    expect(response.status).toBe(401)
    expect(from).not.toHaveBeenCalled()
  })

  it("rejects a non-admin without querying settings", async () => {
    authGetUser.mockResolvedValue({ data: { user: { id: "user-1" } }, error: null })
    const maybeSingle = vi.fn().mockResolvedValue({ data: null, error: null })
    const eqRole = vi.fn(() => ({ maybeSingle }))
    const eqUser = vi.fn(() => ({ eq: eqRole }))
    const select = vi.fn(() => ({ eq: eqUser }))
    from.mockReturnValue({ select })

    const response = await GET(new NextRequest("https://www.veritasvault.net/api/settings"))

    expect(response.status).toBe(403)
    expect(from).toHaveBeenCalledTimes(1)
    expect(from).toHaveBeenCalledWith("user_roles")
  })

  it("allows a validated admin session to read settings through the request client", async () => {
    authGetUser.mockResolvedValue({ data: { user: { id: "admin-1" } }, error: null })
    const roleMaybeSingle = vi.fn().mockResolvedValue({ data: { role: "admin" }, error: null })
    const roleEq = vi.fn(() => ({ maybeSingle: roleMaybeSingle }))
    const userEq = vi.fn(() => ({ eq: roleEq }))
    const roleSelect = vi.fn(() => ({ eq: userEq }))
    const settingsSelect = vi.fn().mockResolvedValue({ data: [{ key: "feature_flag" }], error: null })
    from.mockImplementation((table: string) =>
      table === "user_roles" ? { select: roleSelect } : { select: settingsSelect },
    )

    const response = await GET(new NextRequest("https://www.veritasvault.net/api/settings"))

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual([{ key: "feature_flag" }])
    expect(from).toHaveBeenNthCalledWith(1, "user_roles")
    expect(from).toHaveBeenNthCalledWith(2, "settings")
  })
})
