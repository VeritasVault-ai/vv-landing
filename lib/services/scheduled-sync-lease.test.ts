import { beforeEach, describe, expect, it, vi } from "vitest"

const { createClient, rpc } = vi.hoisted(() => ({
  createClient: vi.fn(),
  rpc: vi.fn(),
}))

vi.mock("@supabase/supabase-js", () => ({ createClient }))

import { scheduledSyncLease } from "./scheduled-sync-lease"

describe("scheduled sync lease", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.SUPABASE_URL = "https://example.supabase.co"
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-role-key"
    createClient.mockReturnValue({ rpc })
  })

  it("acquires an atomic database lease with a bounded TTL", async () => {
    rpc.mockResolvedValue({ data: true, error: null })

    const holderId = await scheduledSyncLease.acquire()

    expect(holderId).toMatch(/^[0-9a-f-]{36}$/)
    expect(rpc).toHaveBeenCalledWith("acquire_scheduled_sync_lease", {
      p_holder_id: holderId,
      p_lease_name: "scheduled-sync",
      p_ttl_seconds: 1800,
    })
  })

  it("returns null while another replica owns the lease", async () => {
    rpc.mockResolvedValue({ data: false, error: null })
    await expect(scheduledSyncLease.acquire()).resolves.toBeNull()
  })

  it("fails closed without server-side credentials", async () => {
    delete process.env.SUPABASE_SERVICE_ROLE_KEY
    await expect(scheduledSyncLease.acquire()).rejects.toThrow(
      "Server-side Supabase configuration is unavailable",
    )
  })

  it("releases only the caller's lease", async () => {
    rpc.mockResolvedValue({ data: null, error: null })
    await scheduledSyncLease.release("holder-id")

    expect(rpc).toHaveBeenCalledWith("release_scheduled_sync_lease", {
      p_holder_id: "holder-id",
      p_lease_name: "scheduled-sync",
    })
  })
})
