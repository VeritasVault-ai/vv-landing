import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

const { createClient } = vi.hoisted(() => ({ createClient: vi.fn(() => ({ kind: "client" })) }))

vi.mock("server-only", () => ({}))
vi.mock("@supabase/supabase-js", () => ({ createClient }))

import { createServiceRoleClient } from "./server"

describe("createServiceRoleClient", () => {
  const originalUrl = process.env.SUPABASE_URL
  const originalPublicUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const originalServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  beforeEach(() => {
    vi.clearAllMocks()
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role-key"
    delete process.env.NEXT_PUBLIC_SUPABASE_URL
  })

  afterEach(() => {
    restoreEnvironmentVariable("SUPABASE_URL", originalUrl)
    restoreEnvironmentVariable("NEXT_PUBLIC_SUPABASE_URL", originalPublicUrl)
    restoreEnvironmentVariable("SUPABASE_SERVICE_ROLE_KEY", originalServiceRoleKey)
  })

  it("creates the privileged client for an HTTPS Supabase URL", () => {
    process.env.SUPABASE_URL = "https://project.supabase.co"

    expect(createServiceRoleClient()).toEqual({ kind: "client" })
    expect(createClient).toHaveBeenCalledWith(
      "https://project.supabase.co",
      "service-role-key",
      expect.any(Object),
    )
  })

  it("rejects a non-HTTPS remote Supabase URL", () => {
    process.env.SUPABASE_URL = "http://supabase.internal"

    expect(() => createServiceRoleClient()).toThrow(
      "Supabase service-role connections require HTTPS",
    )
    expect(createClient).not.toHaveBeenCalled()
  })
})

function restoreEnvironmentVariable(name: string, value: string | undefined) {
  if (value === undefined) {
    delete process.env[name]
  } else {
    process.env[name] = value
  }
}
