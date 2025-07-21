"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { AlertCircle, Loader2, X } from "lucide-react"
import { VersionAwareSocialLogins } from "./version-aware-social-logins"
import { useAnalytics } from "@/hooks/use-analytics"
import { signInWithEmail } from "@/lib/auth/auth-service"

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

interface VersionAwareLoginFormProps {
  version: "standard" | "corporate"
  redirectTo?: string
}

export function VersionAwareLoginForm({ version, redirectTo }: VersionAwareLoginFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { trackEvent } = useAnalytics()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
        version,
        login_method: "email",
      },
    })

    try {
      const {
        data,
        error,
        redirectTo: finalRedirect,
      } = await signInWithEmail(values.email, values.password, { version, redirectTo })

      if (error) {
        throw error
      }

      // Track successful login
      trackEvent({
        action: "login_success",
        category: "authentication",
        label: "email_password",
        value: 1,
        non_interaction: false,
        custom_data: {
          version,
          login_method: "email",
          user_id_hash: btoa(values.email).slice(-10), // Last 10 chars of base64 email for anonymized tracking
        },
      })

      // Redirect to the appropriate dashboard
      router.push(finalRedirect)
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
          version,
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Determine styling based on version
  const cardClassName =
    version === "corporate" ? "border-blue-200 dark:border-blue-900" : "border-emerald-200 dark:border-emerald-900"

  const buttonClassName =
    version === "corporate"
      ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
      : "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800"

  const linkClassName =
    version === "corporate"
      ? "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
      : "text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"

  return (
    <Card className={cardClassName}>
      <div className="absolute top-4 right-4">
        <Link href={version === "corporate" ? "/corporate" : "/standard"}>
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
                custom_data: { version },
              })
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      <CardHeader>
        <CardTitle className="text-2xl">{version === "corporate" ? "Enterprise Sign In" : "Sign In"}</CardTitle>
        <CardDescription>
          {version === "corporate"
            ? "Enter your credentials to access your enterprise account"
            : "Enter your email and password to access your account"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Social Login Options */}
        <VersionAwareSocialLogins version={version} redirectTo={redirectTo} />

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
                      href={`/auth/reset-password?version=${version}`}
                      className={linkClassName}
                      onClick={() => {
                        trackEvent({
                          action: "password_reset_request",
                          category: "authentication",
                          label: "from_login",
                          custom_data: { version },
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
            <Button type="submit" className={`w-full text-white ${buttonClassName}`} disabled={isLoading}>
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
            href={`/auth/register?version=${version}`}
            className={linkClassName}
            onClick={() => {
              trackEvent({
                action: "registration_link_click",
                category: "authentication",
                label: "from_login",
                custom_data: { version },
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
