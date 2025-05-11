import { createClient as createSupabaseClient } from "@supabase/supabase-js"

// Create a single supabase client for interacting with your database
export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

// Create a singleton instance for client-side usage
let supabaseInstance: ReturnType<typeof createSupabaseClient> | null = null

export const getClientSideSupabase = () => {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Missing Supabase environment variables")
    }

    supabaseInstance = createSupabaseClient(supabaseUrl, supabaseAnonKey)
  }

  return supabaseInstance
}
