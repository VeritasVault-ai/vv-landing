import "server-only"

import {
  createServerClient as createSupabaseSsrClient,
  type CookieOptions,
} from "@supabase/ssr"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import type { NextRequest } from "next/server"

function supabaseUrl() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL

  if (!url) {
    throw new Error("Supabase URL is not configured")
  }

  return url
}

const serverAuthOptions = {
  auth: {
    autoRefreshToken: false,
    detectSessionInUrl: false,
    persistSession: false,
  },
}

export function createPublicServerClient() {
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!anonKey) {
    throw new Error("Supabase anonymous key is not configured")
  }

  return createSupabaseClient(supabaseUrl(), anonKey, serverAuthOptions)
}

type CookieToSet = { name: string; value: string; options: CookieOptions }

export function createRequestServerClient(
  request: NextRequest,
  setCookies?: (cookies: CookieToSet[]) => void,
) {
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!anonKey) {
    throw new Error("Supabase anonymous key is not configured")
  }

  return createSupabaseSsrClient(supabaseUrl(), anonKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookies) => setCookies?.(cookies),
    },
  })
}

export function createServiceRoleClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!serviceRoleKey) {
    throw new Error("Supabase service-role key is not configured")
  }

  return createSupabaseClient(supabaseUrl(), serviceRoleKey, serverAuthOptions)
}
