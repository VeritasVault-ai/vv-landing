"use client"

import { LoginForm } from "@/components/auth/login-form"
import { trackLoginEvent } from "@/lib/analytics/auth-analytics"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface LoginClientProps {
  returnUrl: string
  loginFlag: string
}

/**
 * Client component for the login page
 * Handles login logic and analytics tracking
 */
export function LoginClient({ returnUrl, loginFlag }: LoginClientProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    // Track page view with login flag
    trackLoginEvent('page_view', {
      flag: loginFlag,
      returnUrl: returnUrl
    })
  }, [loginFlag, returnUrl])
  
  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Track login attempt
      trackLoginEvent('login_attempt', {
        flag: loginFlag,
        method: 'credentials',
        email_domain: email.split('@')[1] || 'unknown'
      })
      
      // Simulate authentication - replace with your actual auth logic
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, flag: loginFlag })
      })
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Authentication failed')
      }
      
      const data = await response.json()
      
      // Track successful login
      trackLoginEvent('login_success', {
        flag: loginFlag,
        method: 'credentials'
      })
      
      // Store auth token
      localStorage.setItem('auth_token', data.token)
      
      // Redirect to return URL or dashboard
      router.push(returnUrl || '/dashboard')
    } catch (err) {
      // Track failed login
      trackLoginEvent('login_failure', {
        flag: loginFlag,
        method: 'credentials',
        error: err instanceof Error ? err.message : 'Unknown error'
      })
      
      setError(err instanceof Error ? err.message : 'An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleSSOLogin = (provider: 'github' | 'google' | string) => { 
    // Track SSO login attempt
    trackLoginEvent('login_attempt', {
      flag: loginFlag,
      method: provider
    })
    
    // Redirect to SSO provider
    window.location.href = `/api/auth/${encodeURIComponent(provider)}?returnUrl=${encodeURIComponent(returnUrl)}&flag=${encodeURIComponent(loginFlag)}`  
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <LoginForm 
        onLogin={handleLogin}
        onSSOLogin={handleSSOLogin}
        isLoading={isLoading}
        error={error}
        loginFlag={loginFlag}
      />
    </div>
  )
}