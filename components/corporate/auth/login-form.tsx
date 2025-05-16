"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle } from "lucide-react"
import { FaGithub, FaGoogle, FaMicrosoft } from "react-icons/fa"

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>
  isLoading: boolean
  error: string | null
  returnUrl: string
}

/**
 * Login form component with email/password and SSO options
 */
export function LoginForm({ onLogin, isLoading, error, returnUrl }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onLogin(email, password)
  }
  
  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Email address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Password
            </label>
            <Link 
              href="/corporate-version/forgot-password" 
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            className="w-full"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remember-me" 
              checked={rememberMe}
              onCheckedChange={(checked) => {
                if (typeof checked === 'boolean') {
                  setRememberMe(checked)
                }
              }}
              disabled={isLoading}
            />
            <label 
              htmlFor="remember-me" 
              className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer"
            >
              Remember me
            </label>
          </div>
        </div>
        
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-slate-950 px-2 text-slate-500 dark:text-slate-400">
            Or continue with
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <Button variant="outline" className="w-full" disabled={isLoading}>
          <FaGoogle className="h-4 w-4" />
          <span className="sr-only">Google</span>
        </Button>
        <Button variant="outline" className="w-full" disabled={isLoading}>
          <FaMicrosoft className="h-4 w-4" />
          <span className="sr-only">Microsoft</span>
        </Button>
        <Button variant="outline" className="w-full" disabled={isLoading}>
          <FaGithub className="h-4 w-4" />
          <span className="sr-only">GitHub</span>
        </Button>
      </div>
      
      <div className="text-center text-sm text-slate-600 dark:text-slate-400">
        Don't have an account?{" "}
        <Link 
          href={`/corporate-version/signup?returnUrl=${encodeURIComponent(returnUrl)}`}
          className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          Sign up
        </Link>
      </div>
    </div>
  )
}