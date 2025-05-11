"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { createBrowserClient } from "@/lib/supabase"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { AlertCircle, Loader2, X } from "lucide-react"
import { SocialLogins } from "./social-logins"
import { useAnalytics } from "@/hooks/use-analytics"
import { setUserPropertiesAfterLogin } from "@/lib/analytics/set-user-properties"

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

// Inner component that uses searchParams
function LoginFormInner({ callbackUrl, error: initialError }: { callbackUrl?: string, error?: string | null }) {
  const [error, setError] = useState<string | null>(initialError || null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectedFrom = callbackUrl || searchParams?.get("redirectedFrom") || "/dashboard"
  const { trackEvent } = useAnalytics()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Login form submission logic (unchanged)
    setIsLoading(true)
    setError(null)

    // Track login attempt with source information
    trackEvent({
      action: "login_attempt",
      category: "authentication",
      label: "email_password",
      value: 1,
      non_interaction: false,
      custom_data: {
        redirected_from: redirectedFrom,
        login_method: "email",
      },
    })

    try {
      const supabase = createBrowserClient()
      const { error, data } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })

      if (error) {
        throw error
      }

      // Track successful login with user properties (anonymized)
      trackEvent({
        action: "login_success",
        category: "authentication",
        label: "email_password",
        value: 1,
        non_interaction: false,
        custom_data: {
          redirected_from: redirectedFrom,
          login_method: "email",
          user_id_hash: btoa(values.email).slice(-10), // Last 10 chars of base64 email for anonymized tracking
          is_returning: data.user?.app_metadata?.provider === "email" ? "yes" : "new",
        },
      })

      // Get user profile data to set user properties
      if (data.user) {
        try {
          const { data: profile } = await supabase
            .from("user_profiles")
            .select("*")
            .eq("user_id", data.user.id)
            .single()

          if (profile) {
            // Get user strategies count
            const { count: strategiesCount } = await supabase
              .from("strategies")
              .select("id", { count: "exact", head: true })
              .eq("user_id", data.user.id)

            // Calculate days active
            const createdAt = new Date(profile.created_at)
            const now = new Date()
            const daysActive = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24))

            // Set user properties in Google Analytics
            setUserPropertiesAfterLogin({
              riskProfile: profile.risk_profile || "moderate",
              accountTier: profile.account_tier || "basic",
              experienceLevel: profile.experience_level || "beginner",
              hasActiveStrategies: strategiesCount ? strategiesCount > 0 : false,
              strategiesCount: strategiesCount || 0,
              daysActive,
              preferredChain: profile.preferred_chain || "tezos",
            })
          }
        } catch (profileError) {
          console.error("Error fetching user profile:", profileError)
        }
      }

      // Redirect to the original requested page or dashboard
      router.push(redirectedFrom)
      router.refresh()
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "Failed to sign in")

      // Track failed login (without sensitive info)
      trackEvent({
        action: "login_error",
        category: "authentication",
        label: err.message || "unknown_error",
        value: 0,
        non_interaction: false,
        custom_data: {
          error_type: err.message?.includes("credentials") ? "invalid_credentials" : "system_error",
          redirected_from: redirectedFrom,
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <div className="absolute top-4 right-4">
        <Link href="/">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close"
            onClick={() => {
              trackEvent({
                action: "login_abandoned",
                category: "authentication",
                label: "close_button",
                non_interaction: false,
              })
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>Enter your email and password to access your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Social Login Options */}
        <SocialLogins redirectUrl={redirectedFrom} />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      href="/auth/reset-password"
                      className="text-sm text-primary hover:underline"
                      onClick={() => {
                        trackEvent({
                          action: "password_reset_request",
                          category: "authentication",
                          label: "from_login",
                        })
                      }}
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="text-primary hover:underline"
            onClick={() => {
              trackEvent({
                action: "registration_link_click",
                category: "authentication",
                label: "from_login",
              })
            }}
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

export function LoginForm({ callbackUrl, error }: { callbackUrl?: string, error?: string | null }) {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading login form...</div>}>
      <LoginFormInner callbackUrl={callbackUrl} error={error} />
    </Suspense>
  )
}