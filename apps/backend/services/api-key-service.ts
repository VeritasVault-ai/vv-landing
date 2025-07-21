import { createServerClient } from "@/lib/supabase"

export async function getGoogleApiKey(userId: string): Promise<string | null> {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase.from("user_settings").select("google_api_key").eq("user_id", userId).single()

    if (error || !data) {
      console.error("Error fetching Google API key:", error)
      return null
    }

    return data.google_api_key
  } catch (error) {
    console.error("Error in getGoogleApiKey:", error)
    return null
  }
}

export async function hasGoogleApiKey(userId: string): Promise<boolean> {
  const apiKey = await getGoogleApiKey(userId)
  return !!apiKey
}
