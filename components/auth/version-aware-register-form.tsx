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
import { signUpWithEmail } from "@/lib/auth/auth-service"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

interface VersionAwareRegisterFormProps {
  version: "standard" | "corporate"
  redirectTo?: string
}

export function VersionAwareRegisterForm({ version, redirectTo }: VersionAwareRegisterFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  const { trackEvent } = useAnalytics()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)

    // Track registration attempt
    trackEvent({
      action: "registration_attempt",
      category: "authentication",
      label: "email_password",
      value: 1,
      non_interaction: false,
      custom_data: {
        version,
      },
    })

    try {
      const userData = {
        full_name: values.name,
        account_type: version,
      }

      const {
        data,
        error,
        redirectTo: finalRedirect,
      } = await signUpWithEmail(values.email, values.password, userData, { version, redirectTo })

      if (error) throw error

      // Track successful registration
      trackEvent({
        action: "registration_success",
        category: "authentication",
        label: "email_password",
        value: 1,
        non_interaction: false,
        custom_data: {
          version,
          user_id_hash: btoa(values.email).slice(-10), // Last 10 chars of base64 email for anonymized tracking
        },
      })

      setIsSuccess(true)

      // Auto-login and redirect if email confirmation is not required
      if (!data.session) {
        // Email confirmation is required
        return
      }

      // Redirect to the appropriate dashboard
      router.push(finalRedirect)
      router.refresh()
    } catch (err: any) {
      console.error("Registration error:", err)
      setError(err.message || "Failed to register")
      setIsSuccess(false)

      // Track failed registration
      trackEvent({
        action: "registration_error",
        category: "authentication",
        label: err.message || "unknown_error",
        value: 0,
        non_interaction: false,
        custom_data: {
          error_type: err.message?.includes("email") ? "email_in_use" : "system_error",
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
                action: "registration_abandoned",
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
        <CardTitle className="text-2xl">
          {version === "corporate" ? "Create Enterprise Account" : "Create an Account"}
        </CardTitle>
        <CardDescription>
          {version === "corporate"
            ? "Enter your details to create your enterprise account"
            : "Enter your details to create your account"}
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
            <span className="bg-background px-2 text-muted-foreground">Or register with email</span>
          </div>
        </div>

        {isSuccess ? (
          <Alert>
            <AlertDescription>
              Registration successful! Please check your email to verify your account.
            </AlertDescription>
          </Alert>
        ) : (
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                    <FormLabel>Password</FormLabel>
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
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registering...
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href={`/auth/login?version=${version}`}
            className={linkClassName}
            onClick={() => {
              trackEvent({
                action: "login_link_click",
                category: "authentication",
                label: "from_register",
                custom_data: { version },
              })
            }}
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
