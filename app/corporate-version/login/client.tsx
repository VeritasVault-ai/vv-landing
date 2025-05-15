"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { RobustThemeProvider } from "@/src/context/RobustThemeProvider"
import { EXPERIENCE_TYPES, CORPORATE_VARIANTS, COLOR_MODES } from "@/src/constants/theme"
import { LoginForm } from "@/components/corporate/auth/login-form"
import Image from "next/image"
import Link from "next/link"

interface LoginClientProps {
  returnUrl: string
  error?: string
}

/**
 * Client component for the Login page
 */
export function LoginClient({ returnUrl, error }: LoginClientProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(error || null)
  
  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true)
    setLoginError(null)
    
    try {
      // Simulate authentication API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For demo purposes, accept any credentials with basic validation
      if (email.includes('@') && password.length >= 6) {
        // Store auth token in localStorage
        localStorage.setItem('auth_token', `demo_token_${Date.now()}`)
        localStorage.setItem('user_email', email)
        
        // Redirect to dashboard or returnUrl
        router.push(returnUrl || '/corporate-version/dashboard')
      } else {
        throw new Error("Invalid email or password")
      }
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Authentication failed")
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <RobustThemeProvider 
      defaultExperience={EXPERIENCE_TYPES.CORPORATE}
      defaultVariant={CORPORATE_VARIANTS.CORPORATE}
      defaultColorMode={COLOR_MODES.LIGHT}
    >
      <div className="min-h-screen flex">
        {/* Left side - Login form */}
        <div className="w-full lg:w-1/2 flex flex-col p-4 sm:p-10 lg:p-16 justify-center">
          <div className="mb-8">
            <Link href="/corporate-version" className="flex items-center gap-2">
              <Image 
                src="/logo.svg" 
                alt="VeritasVault Logo" 
                width={32} 
                height={32} 
                className="dark:hidden"
              />
              <Image 
                src="/logo-white.svg" 
                alt="VeritasVault Logo" 
                width={32} 
                height={32} 
                className="hidden dark:block"
              />
              <span className="font-semibold text-xl text-slate-900 dark:text-white">
                VeritasVault<span className="text-blue-600">.ai</span>
              </span>
            </Link>
          </div>
          
          <div className="max-w-md mx-auto w-full">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Welcome back
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Log in to your account to access your dashboard
            </p>
            
            <LoginForm 
              onLogin={handleLogin}
              isLoading={isLoading}
              error={loginError}
              returnUrl={returnUrl}
            />
          </div>
        </div>
        
        {/* Right side - Image and info */}
        <div className="hidden lg:block lg:w-1/2 bg-blue-600 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-800"></div>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 to-transparent"></div>
          
          <div className="relative h-full flex flex-col justify-center p-16 text-white">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Treasury Management</h2>
              <p className="text-blue-100 text-lg">
                Secure, compliant, and optimized liquidity management for institutional investors.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Image 
                    src="/avatar-placeholder.png" 
                    alt="User avatar" 
                    width={40} 
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-blue-200">Chief Financial Officer</p>
                </div>
              </div>
              <p className="italic text-blue-100">
                "VeritasVault has transformed how we manage our treasury operations. The platform's analytics and optimization tools have helped us increase yields while maintaining our risk parameters."
              </p>
            </div>
          </div>
        </div>
      </div>
    </RobustThemeProvider>
  )
}