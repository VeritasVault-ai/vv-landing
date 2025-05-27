import { createServerClient } from "@/lib/supabase"
import { cookies } from "next/headers"
import { NextRequest } from "next/server"

const WALLET_SESSION_COOKIE = "vv_wallet_session_id"

/**
 * Validates a wallet session on the server side.
 * Used by middleware and server components to check wallet session validity.
 * 
 * @param request The Next.js request object
 * @returns An object with the session validity status and session data if available
 */
export async function validateWalletSession(request: NextRequest) {
  const sessionId = request.cookies.get(WALLET_SESSION_COOKIE)?.value
  
  if (!sessionId) {
    return { 
      isValid: false,
      session: null
    }
  }

  const cookieStore = cookies()
  const supabase = createServerClient()
  
  // Query the database for the session
  const { data: session, error } = await supabase
    .from("wallet_sessions")
    .select("*")
    .eq("session_id", sessionId)
    .single()
  
  if (error || !session) {
    return {
      isValid: false,
      session: null
    }
  }
  
  // Check if session is active and not expired
  const now = new Date()
  const expiresAt = new Date(session.expires_at)
  
  if (!session.is_active || expiresAt < now) {
    return {
      isValid: false,
      session: null
    }
  }
  
  return {
    isValid: true,
    session
  }
}

/**
 * Gets wallet session details for the current user.
 * Useful for server components that need to access wallet information.
 * 
 * @param userId The ID of the user to fetch wallet sessions for
 * @returns Array of active wallet sessions for the user
 */
export async function getUserWalletSessions(userId: string) {
  const supabase = createServerClient()
  
  const { data: sessions, error } = await supabase
    .from("wallet_sessions")
    .select("*")
    .eq("user_id", userId)
    .eq("is_active", true)
    .order("last_active", { ascending: false })
  
  if (error) {
    console.error("Error fetching wallet sessions:", error)
    return []
  }
  
  return sessions || []
}

/**
 * Terminates all active wallet sessions for a user.
 * Useful for security features like "sign out from all devices".
 * 
 * @param userId The ID of the user to terminate sessions for
 */
export async function terminateAllUserWalletSessions(userId: string) {
  const supabase = createServerClient()
  
  await supabase
    .from("wallet_sessions")
    .update({
      is_active: false
    })
    .eq("user_id", userId)
    .eq("is_active", true)
}