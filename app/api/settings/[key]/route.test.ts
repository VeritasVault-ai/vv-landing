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

describe("/api/settings/:key", () => {
  const context = { params: Promise.resolve({ key: "feature_flag" }) }

  beforeEach(() => {
    vi.clearAllMocks()
    authGetUser.mockResolvedValue({ data: { user: null }, error: null })
  })

  it("rejects an unauthenticated read before querying any table", async () => {
    const request = new NextRequest("https://www.veritasvault.net/api/settings/feature_flag")
    const response = await GET(request, context)

    expect(response.status).toBe(401)
    expect(from).not.toHaveBeenCalled()
  })

  it("rejects an unauthenticated write before parsing input or querying any table", async () => {
    const request = new NextRequest("https://www.veritasvault.net/api/settings/feature_flag", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ value: true }),
    })
    const response = await PUT(request, context)

    expect(response.status).toBe(401)
    expect(from).not.toHaveBeenCalled()
  })
})
