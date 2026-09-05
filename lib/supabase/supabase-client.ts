import { createClient as createSupabaseClient } from "@supabase/supabase-js"

// Create a singleton instance of the Supabase client
let supabaseClient: ReturnType<typeof createSupabaseClient<any>> | null = null

export function createClient() {
  if (!supabaseClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Supabase URL and anon key must be provided")
    }

    supabaseClient = createSupabaseClient<any>(supabaseUrl, supabaseAnonKey)
  }

  return supabaseClient
}

// Create a server-side client with service role for admin operations
export function createAdminClient() {}
