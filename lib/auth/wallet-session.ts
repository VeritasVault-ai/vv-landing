"use client"

import { createBrowserClient } from "@/lib/supabase"
import { v4 as uuidv4 } from "uuid"

export interface WalletSession {
  id: string
  walletAddress: string
  connectedAt: number
  expiresAt: number
  chainId: number
  lastActive: number
  isActive: boolean
}

const SESSION_DURATION = 4 * 60 * 60 * 1000 // 4 hours in milliseconds
const STORAGE_KEY = "vv_wallet_session"

/**
 * Creates a new wallet session when a wallet connects to the application.
 * 
 * @param walletAddress The connected wallet address
 * @param chainId The blockchain network ID the wallet is connected to
 * @returns The created wallet session
 */
export async function createWalletSession(walletAddress: string, chainId: number): Promise<WalletSession> {
  const supabase = createBrowserClient()
  
  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("User must be authenticated to create a wallet session")
  }

  const now = Date.now()
  const session: WalletSession = {
    id: uuidv4(),
    walletAddress,
    chainId,
    connectedAt: now,
    expiresAt: now + SESSION_DURATION,
    lastActive: now,
    isActive: true
  }

  // Store session in local storage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))

  // Store session in database for persistence and monitoring
  try {
    const { error } = await supabase
      .from("wallet_sessions")
      .insert({
        session_id: session.id,
        user_id: user.id,
        wallet_address: walletAddress,
        chain_id: chainId,
        connected_at: new Date(session.connectedAt).toISOString(),
        expires_at: new Date(session.expiresAt).toISOString(),
        last_active: new Date(session.lastActive).toISOString(),
        is_active: session.isActive
      })
    
    if (error) {
      // Database insertion failed, clean up localStorage
      localStorage.removeItem(STORAGE_KEY)
      throw new Error(`Failed to create wallet session: ${error.message}`)
    }
  } catch (error) {
    // Database insertion failed, clean up localStorage
    localStorage.removeItem(STORAGE_KEY)
    throw error
  }

  return session
}

/**
 * Updates the activity timestamp for the current wallet session.
 * Call this function regularly when the user performs actions.
 */
export async function updateWalletSessionActivity(): Promise<void> {
  const session = getWalletSession()
  if (!session) return

  // Only update if we have an active session
  if (session.isActive) {
    session.lastActive = Date.now()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))

    // Update the database record
    try {
      const supabase = createBrowserClient()
      const { error } = await supabase
        .from("wallet_sessions")
        .update({
          last_active: new Date(session.lastActive).toISOString()
        })
        .eq("session_id", session.id)

      if (error) {
        console.error("Failed to update wallet session activity:", error)
      }
    } catch (error) {
      console.error("Database error updating session activity:", error)
    }
  }
}

/**
 * Extends the current wallet session by resetting its expiration time.
 */
export async function extendWalletSession(): Promise<WalletSession | null> {
  const session = getWalletSession()
  if (!session || !session.isActive) return null

  // Extend the session expiration
  session.expiresAt = Date.now() + SESSION_DURATION
  session.lastActive = Date.now()
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))

  // Update the database record
  try {
    const supabase = createBrowserClient()
    const { error } = await supabase
      .from("wallet_sessions")
      .update({
        expires_at: new Date(session.expiresAt).toISOString(),
        last_active: new Date(session.lastActive).toISOString()
      })
      .eq("session_id", session.id)

    if (error) {
      console.error("Failed to extend wallet session:", error)
      return null
    }
  } catch (error) {
    console.error("Database error extending session:", error)
    return null
  }

  return session
}

/**
 * Terminates the current wallet session.
 */
export async function terminateWalletSession(): Promise<void> {
  const session = getWalletSession()
  if (!session) return

  // Mark the session as inactive
  session.isActive = false
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))

  // Update the database record
  try {
    const supabase = createBrowserClient()
    const { error } = await supabase
      .from("wallet_sessions")
      .update({
        is_active: false
      })
      .eq("session_id", session.id)

    if (error) {
      console.error("Failed to terminate wallet session:", error)
    }
  } catch (error) {
    console.error("Database error terminating session:", error)
  }
}

/**
 * Gets the current wallet session from local storage.
 * 
 * @returns The current wallet session or null if no active session exists
 */
export function getWalletSession(): WalletSession | null {
  const storedSession = localStorage.getItem(STORAGE_KEY)
  if (!storedSession) return null

  let session: WalletSession
  try {
    session = JSON.parse(storedSession) as WalletSession
  } catch (error) {
    // Malformed session data, clean up and return null
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
  
  // Check if session has expired
  if (session.expiresAt < Date.now()) {
    // Session expired, clean up both localStorage and database
    localStorage.removeItem(STORAGE_KEY)
    
    // Mark session as inactive in database
    const supabase = createBrowserClient()
    supabase
      .from("wallet_sessions")
      .update({ is_active: false })
      .eq("session_id", session.id)
      .then() // Fire and forget to avoid blocking
    
    return null
  }
  
  return session
}

/**
 * Validates if the current wallet session is active and not expired.
 * 
 * @returns True if the session is valid, false otherwise
 */
export function isWalletSessionValid(): boolean {
  const session = getWalletSession()
  return !!session && session.isActive && session.expiresAt > Date.now()
}