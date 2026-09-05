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

import { GET, PUT } from "./route"

describe("/api/profiles/me", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    authGetUser.mockResolvedValue({ data: { user: { id: "user-1" } }, error: null })
  })

  it("reads the validated user's profile through the request client", async () => {
    const single = vi.fn().mockResolvedValue({ data: { id: "user-1" }, error: null })
    const eq = vi.fn(() => ({ single }))
    const select = vi.fn(() => ({ eq }))
    from.mockReturnValue({ select })

    const response = await GET(
      new NextRequest("https://www.veritasvault.net/api/profiles/me", {
        headers: { cookie: "sb-project-auth-token=session" },
      }),
    )

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ id: "user-1" })
    expect(from).toHaveBeenCalledWith("profiles")
    expect(eq).toHaveBeenCalledWith("id", "user-1")
  })

  it("updates only the validated user's profile through the request client", async () => {
    const select = vi.fn().mockResolvedValue({ data: [{ id: "user-1", name: "Updated" }], error: null })
    const eq = vi.fn(() => ({ select }))
    const update = vi.fn(() => ({ eq }))
    from.mockReturnValue({ update })

    const response = await PUT(
      new NextRequest("https://www.veritasvault.net/api/profiles/me", {
        method: "PUT",
        headers: {
          cookie: "sb-project-auth-token=session",
          "content-type": "application/json",
        },
        body: JSON.stringify({ name: "Updated" }),
      }),
    )

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ id: "user-1", name: "Updated" })
    expect(eq).toHaveBeenCalledWith("id", "user-1")
  })

  it("rejects a request without a validated user before querying profiles", async () => {
    authGetUser.mockResolvedValue({ data: { user: null }, error: null })

    const response = await GET(new NextRequest("https://www.veritasvault.net/api/profiles/me"))

    expect(response.status).toBe(401)
    expect(from).not.toHaveBeenCalled()
  })
})
