"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { RobustThemeProvider } from "@/src/context/RobustThemeProvider"
import { EXPERIENCE_TYPES, CORPORATE_VARIANTS, COLOR_MODES } from "@/src/constants/theme"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Check } from "lucide-react"

/**
 * Client component for the Forgot Password page
 */
export function ForgotPasswordClient() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <RobustThemeProvider 
      defaultExperience={EXPERIENCE_TYPES.CORPORATE}
      defaultVariant={CORPORATE_VARIANTS.CORPORATE}
      defaultColorMode={COLOR_MODES.LIGHT}
    >
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-slate-900">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center">
            <Link href="/corporate-version" className="flex items-center gap-2">
              <Image 
                src="/logo.svg" 
                alt="VeritasVault Logo" 
                width={40} 
                height={40} 
              />
              <span className="text-xl font-bold">
                VeritasVault<span className="text-blue-600">Enterprise</span>
              </span>
            </Link>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8">
            {!isSubmitted ? (
              <>
                <div className="mb-6 text-center">
                  <h1 className="text-2xl font-bold mb-2">Reset your password</h1>
                  <p className="text-slate-600 dark:text-slate-400">
                    Enter your email address and we'll send you instructions to reset your password.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email address" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Reset Instructions"}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                  <Check className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Check your email</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  We've sent password reset instructions to <strong>{email}</strong>. 
                  Please check your inbox and follow the link in the email.
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Didn't receive an email? Check your spam folder or{" "}
                  <button 
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                    onClick={() => setIsSubmitted(false)}
                  >
                    try again
                  </button>
                </p>
              </div>
            )}
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
              <Link 
                href="/corporate-version/login" 
                className="flex items-center justify-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </RobustThemeProvider>
  )
}