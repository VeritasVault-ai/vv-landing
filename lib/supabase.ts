"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Client-side Supabase client (for use in client components)
export const getBrowserClient = () => {
  return createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  })
}

// Alias for getBrowserClient for backward compatibility
export const createBrowserClient = getBrowserClient

// Browser-only compatibility alias. Server code must explicitly choose either
// the public or privileged client from @/lib/supabase/server.
export const createClient = createBrowserClient
