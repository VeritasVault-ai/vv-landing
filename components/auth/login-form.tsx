"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { FaGithub, FaGoogle, FaMicrosoft } from "react-icons/fa"

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>
  onSSOLogin: (provider: string) => void
  isLoading: boolean
  error: string | null
  loginFlag: string
}

/**
 * Login form component with email/password and SSO options
 * Includes analytics flag tracking
 */
export function LoginForm({ onLogin, onSSOLogin, isLoading, error, loginFlag }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onLogin(email, password)
  }
  
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-4">
          <Image 
            src="/logo.png" 
            alt="VeritasVault Logo" 
            width={48} 
            height={48} 
            className="dark:hidden"
          />
          <Image 
            src="/logo-white.png" 
            alt="VeritasVault Logo" 
            width={48} 
            height={48} 
            className="hidden dark:block"
          />
        </div>
        <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
        <CardDescription className="text-center">
          Log in to your VeritasVault account
        </CardDescription>
        
        {/* Login flag indicator - only visible in development */}
        {process.env.NODE_ENV === 'development' && loginFlag !== 'default' && (
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium inline-block mx-auto">
            Login Flag: {loginFlag}
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Error alert */}
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {/* Email/Password form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link 
                href="/forgot-password" 
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Forgot password?
              </Link>
            </div>
            <Input 
              id="password" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Log in"
            )}
          </Button>
        </form>
        
        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-slate-900 px-2 text-slate-500 dark:text-slate-400">
              Or continue with
            </span>
          </div>
        </div>
        
        {/* SSO Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <Button 
            variant="outline" 
            onClick={() => onSSOLogin('github')}
            disabled={isLoading}
            className="flex items-center justify-center"
          >
            <FaGithub className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onSSOLogin('google')}
            disabled={isLoading}
            className="flex items-center justify-center"
          >
            <FaGoogle className="h-4 w-4" />
            <span className="sr-only">Google</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onSSOLogin('microsoft')}
            disabled={isLoading}
            className="flex items-center justify-center"
          >
            <FaMicrosoft className="h-4 w-4" />
            <span className="sr-only">Microsoft</span>
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-center text-sm text-slate-600 dark:text-slate-400 w-full">
          Don't have an account?{" "}
          <Link 
            href="/signup" 
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}