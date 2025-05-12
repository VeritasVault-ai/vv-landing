// src/hooks/use-auth.ts
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmail, signInWithProvider, signOut, signUpWithEmail } from '@/lib/auth/auth-service'
import { useAnalytics } from './use-analytics'
import { ExperienceType } from '@/src/types'

// Helper to categorize errors more robustly
function getErrorType(message?: string): string {
  if (!message) return 'unknown_error'
  const m = message.toLowerCase()
  if (m.includes('credentials') || m.includes('password') || m.includes('email')) {
    return 'invalid_credentials'
  }
  if (m.includes('rate') || m.includes('limit')) {
    return 'rate_limited'
  }
  return 'system_error'
}

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { trackEvent } = useAnalytics()

  // Compute a short SHA-256 hash of the email for privacy
  async function hashEmail(email: string): Promise<string> {
    if (typeof crypto?.subtle === 'object') {
      const data = new TextEncoder().encode(email)
      const hashBuffer = await crypto.subtle.digest('SHA-256', data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
      return hashHex.slice(-10)
    }
    // Fallback
    return btoa(email).slice(-10)
  }

  const login = async (
    email: string,
    password: string,
    options?: { version?: ExperienceType; redirectTo?: string }
  ) => {
    setIsLoading(true)
    setError(null)
    const version = options?.version ?? 'standard'

    trackEvent({ action: 'login_attempt', category: 'authentication', label: 'login', custom_data: { version } })

    try {
      const { data, error: authErr, redirectTo } = await signInWithEmail(email, password, options)
      if (authErr) throw authErr

      const userHash = await hashEmail(email)
      trackEvent({ action: 'login_success', category: 'authentication', label: 'login', custom_data: { version, user_id_hash: userHash } })

      router.push(redirectTo)
      router.refresh()
      return { success: true }
    } catch (err: unknown) {
      const msg = (err instanceof Error ? err.message : String(err))
      setError(msg)

      const errorType = getErrorType(msg)
      trackEvent({
        action: 'login_error',
        category: 'authentication',
        label: 'login',
        custom_data: { version, error_type: errorType }
      })

      return { success: false, error: msg }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async <T extends Record<string, unknown>>(
    email: string,
    password: string,
    userData: T,
    options?: { version?: ExperienceType; redirectTo?: string }
  ) => {
    setIsLoading(true)
    setError(null)
    const version = options?.version ?? 'standard'

    trackEvent({ action: 'registration_attempt', category: 'authentication', label: 'register', custom_data: { version } })

    try {
      const { data, error: regErr, redirectTo } = await signUpWithEmail(email, password, userData, options)
      if (regErr) throw regErr

      const userHash = await hashEmail(email)
      trackEvent({ action: 'registration_success', category: 'authentication', label: 'register', custom_data: { version, user_id_hash: userHash } })

      if (!data.session) {
        return { success: true, requiresEmailConfirmation: true }
      }

      router.push(redirectTo)
      router.refresh()
      return { success: true, requiresEmailConfirmation: false }
    } catch (err: unknown) {
      const msg = (err instanceof Error ? err.message : String(err))
      setError(msg)

      const errorType = getErrorType(msg)
      trackEvent({ action: 'registration_error', category: 'authentication', label: 'register', custom_data: { version, error_type: errorType } })

      return { success: false, error: msg }
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithProvider = async (
    provider: 'google' | 'github',
    options?: { version?: ExperienceType; redirectTo?: string }
  ) => {
    setIsLoading(true)
    setError(null)
    const version = options?.version ?? 'standard'

    trackEvent({ action: 'social_login_attempt', category: 'authentication', label: provider, custom_data: { version } })

    try {
      await signInWithProvider(provider, options)
      return { success: true }
    } catch (err: unknown) {
      const msg = (err instanceof Error ? err.message : String(err))
      setError(msg)
      const errorType = getErrorType(msg)
      trackEvent({ action: 'social_login_error', category: 'authentication', label: provider, custom_data: { version, error_type: errorType } })
      return { success: false, error: msg }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      trackEvent({ action: 'logout_attempt', category: 'authentication' })
      await signOut()
      trackEvent({ action: 'logout_success', category: 'authentication' })
      router.push('/')
      router.refresh()
      return { success: true }
    } catch (err: unknown) {
      const msg = (err instanceof Error ? err.message : String(err))
      setError(msg)
      return { success: false, error: msg }
    } finally {
      setIsLoading(false)
    }
  }

  return { login, register, loginWithProvider, logout, isLoading, error }
}