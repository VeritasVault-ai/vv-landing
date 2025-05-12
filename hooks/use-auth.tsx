"use client"

import { signInWithEmail, signInWithProvider, signOut, signUpWithEmail } from "@/lib/auth/auth-service"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAnalytics } from "./use-analytics"

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { trackEvent } = useAnalytics()

  const login = async (email: string, password: string, options?: { version?: "standard" | "corporate", redirectTo?: string }) => {
    setIsLoading(true)
    setError(null)

    try {
      const version = options?.version || "standard"
      
      // Track login attempt
      trackEvent({
        action: "login_attempt",
        category: "authentication",
        label: "header_login",
        custom_data: { version },
      })

      const { data, error, redirectTo } = await signInWithEmail(email, password, options)

      if (error) throw error

      // Track successful login
      trackEvent({
        action: "login_success",
        category: "authentication",
        label: "header_login",
        custom_data: { 
          version,
          user_id_hash: btoa(email).slice(-10), 
        },
      })

      router.push(redirectTo)
      router.refresh()
      return { success: true }
    } catch (err: any) {
      setError(err.message || "Failed to sign in")
      
      // Track login error
      trackEvent({
        action: "login_error",
        category: "authentication",
        label: err.message || "unknown_error",
        custom_data: { 
          error_type: err.message?.includes("credentials") ? "invalid_credentials" : "system_error",
          version: options?.version || "standard",
        },
      })
      
      return { success: false, error: err.message }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (
    email: string, 
    password: string, 
    userData: any, 
    options?: { version?: "standard" | "corporate", redirectTo?: string }
  ) => {
    setIsLoading(true)
    setError(null)

    try {
      const version = options?.version || "standard"
      
      // Track registration attempt
      trackEvent({
        action: "registration_attempt",
        category: "authentication",
        label: "header_register",
        custom_data: { version },
      })

      const { data, error, redirectTo } = await signUpWithEmail(email, password, userData, options)

      if (error) throw error

      // Track successful registration
      trackEvent({
        action: "registration_success",
        category: "authentication",
        label: "header_register",
        custom_data: { 
          version,
          user_id_hash: btoa(email).slice(-10), 
        },
      })

      // Auto-login and redirect if email confirmation is not required
      if (!data.session) {
        return { success: true, requiresEmailConfirmation: true }
      }

      router.push(redirectTo)
      router.refresh()
      return { success: true, requiresEmailConfirmation: false }
    } catch (err: any) {
      setError(err.message || "Failed to register")
      
      // Track registration error
      trackEvent({
        action: "registration_error",
        category: "authentication",
        label: err.message || "unknown_error",
        custom_data: { 
          error_type: err.message?.includes("email") ? "email_in_use" : "system_error",
          version: options?.version || "standard",
        },
      })
      
      return { success: false, error: err.message }
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithProvider = async (
    provider: "google" | "github", 
    options?: { version?: "standard" | "corporate", redirectTo?: string }
  ) => {
    setIsLoading(true)
    setError(null)

    try {
      const version = options?.version || "standard"
      
      // Track social login attempt
      trackEvent({
        action: "social_login_attempt",
        category: "authentication",
        label: provider,
        custom_data: { version },
      })

      await signInWithProvider(provider, options)
      return { success: true }
    } catch (err: any) {
      setError(err.message || `Failed to sign in with ${provider}`)
      
      // Track social login error
      trackEvent({
        action: "social_login_error",
        category: "authentication",
        label: provider,
        custom_data: { 
          error: String(err),
          version: options?.version || "standard",
        },
      })
      
      return { success: false, error: err.message }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    
    try {
      // Track logout attempt
      trackEvent({
        action: "logout_attempt",
        category: "authentication",
      })
      
      await signOut()
      
      // Track successful logout
      trackEvent({
        action: "logout_success",
        category: "authentication",
      })
      
      router.push("/")
      router.refresh()
      return { success: true }
    } catch (err: any) {
      setError(err.message || "Failed to sign out")
      return { success: false, error: err.message }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    login,
    register,
    loginWithProvider,
    logout,
    isLoading,
    error,
  }
}