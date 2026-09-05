import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { NextRequest } from "next/server"

const { createServiceRoleClient } = vi.hoisted(() => ({
  createServiceRoleClient: vi.fn(),
}))

vi.mock("server-only", () => ({}))
vi.mock("@/lib/supabase/server", () => ({ createServiceRoleClient }))

import { generateToken } from "@/lib/auth/auth-utils"
import { GET } from "./route"

describe("GET /api/settings", () => {
  const originalSecret = process.env.JWT_SECRET

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

  it("rejects an unauthenticated request before creating a privileged client", async () => {
    const response = await GET(new NextRequest("https://www.veritasvault.net/api/settings"))

    expect(response.status).toBe(401)
    expect(createServiceRoleClient).not.toHaveBeenCalled()
  })

  it("rejects an authenticated non-admin before creating a privileged client", async () => {
    process.env.JWT_SECRET = "test-secret-with-at-least-32-characters"
    const token = await generateToken({ sub: "user-1", isAdmin: false })
    const request = new NextRequest("https://www.veritasvault.net/api/settings", {
      headers: { cookie: `token=${token}` },
    })

    const response = await GET(request)

    expect(response.status).toBe(403)
    expect(createServiceRoleClient).not.toHaveBeenCalled()
  })
})
