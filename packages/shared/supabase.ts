"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"

// Client-side Supabase client (for use in client components)
export const getBrowserClient = () => {
  return createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  })
}

// Alias for getBrowserClient for backward compatibility
export const createBrowserClient = getBrowserClient

// Server-side Supabase client (for use in server components and API routes)
export const createServerClient = () => {
  return createSupabaseClient(
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}

// For backward compatibility
export const createClient = () => {
  // Check if we're in a browser environment
  if (typeof window !== "undefined") {
    return createBrowserClient()
  } else {
    return createServerClient()
  }
}
