import { randomUUID } from "node:crypto"
import { createClient } from "@supabase/supabase-js"

const LEASE_NAME = "scheduled-sync"
const LEASE_TTL_SECONDS = 12 * 60

function adminClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    throw new Error("Server-side Supabase configuration is unavailable")
  }

  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

export const scheduledSyncLease = {
  async acquire(): Promise<string | null> {
    const holderId = randomUUID()
    const { data, error } = await adminClient().rpc("acquire_scheduled_sync_lease", {
      p_holder_id: holderId,
      p_lease_name: LEASE_NAME,
      p_ttl_seconds: LEASE_TTL_SECONDS,
    })

    if (error) throw new Error(`Could not acquire scheduled sync lease: ${error.message}`)
    return data === true ? holderId : null
  },

  async release(holderId: string): Promise<void> {
    const { error } = await adminClient().rpc("release_scheduled_sync_lease", {
      p_holder_id: holderId,
      p_lease_name: LEASE_NAME,
    })

    if (error) throw new Error(`Could not release scheduled sync lease: ${error.message}`)
  },

  async renew(holderId: string): Promise<void> {
    const { data, error } = await adminClient().rpc("renew_scheduled_sync_lease", {
      p_holder_id: holderId,
      p_lease_name: LEASE_NAME,
      p_ttl_seconds: LEASE_TTL_SECONDS,
    })

    if (error) throw new Error(`Could not renew scheduled sync lease: ${error.message}`)
    if (data !== true) throw new Error("Could not renew scheduled sync lease: lease is no longer held")
  },
}
