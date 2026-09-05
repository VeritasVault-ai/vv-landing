import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { NextRequest } from "next/server"

const { createServiceRoleClient } = vi.hoisted(() => ({
  createServiceRoleClient: vi.fn(),
}))

vi.mock("server-only", () => ({}))
vi.mock("@/lib/supabase/server", () => ({ createServiceRoleClient }))

import { GET, PUT } from "./route"

describe("/api/settings/:key", () => {
  const originalSecret = process.env.JWT_SECRET
  const context = { params: { key: "feature_flag" } }

  beforeEach(() => {
    vi.clearAllMocks()
    delete process.env.JWT_SECRET
  })

  afterEach(() => {
    if (originalSecret === undefined) {
      delete process.env.JWT_SECRET
    } else {
      process.env.JWT_SECRET = originalSecret
    }
  })

  it("rejects an unauthenticated read before creating a privileged client", async () => {
    const request = new NextRequest("https://www.veritasvault.net/api/settings/feature_flag")
    const response = await GET(request, context)

    expect(response.status).toBe(401)
    expect(createServiceRoleClient).not.toHaveBeenCalled()
  })

  it("rejects an unauthenticated write before parsing input or creating a privileged client", async () => {
    const request = new NextRequest("https://www.veritasvault.net/api/settings/feature_flag", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ value: true }),
    })
    const response = await PUT(request, context)

    expect(response.status).toBe(401)
    expect(createServiceRoleClient).not.toHaveBeenCalled()
  })
})
