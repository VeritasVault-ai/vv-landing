"use client"

import { useState } from "react"
import { createBrowserClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { useAnalytics } from "@/hooks/use-analytics"
import { Github, Mail } from "lucide-react"

interface SocialLoginsProps {
  redirectUrl?: string
}

export function SocialLogins({ redirectUrl = "/dashboard" }: SocialLoginsProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const { trackEvent } = useAnalytics()

  const handleSocialLogin = async (provider: "github" | "google" | "discord") => {
    try {
      setIsLoading(provider)

      // Track social login attempt
      trackEvent({
        action: "social_login_attempt",
        category: "authentication",
        label: provider,
        custom_data: {
          redirected_from: redirectUrl,
        },
      })

      const supabase = createBrowserClient()

      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?redirectTo=${redirectUrl}`,
        },
      })
    } catch (error) {
      console.error(`${provider} login error:`, error)

      // Track social login error
      trackEvent({
        action: "social_login_error",
        category: "authentication",
        label: provider,
        custom_data: {
          error: "oauth_initialization_failed",
        },
      })
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        onClick={() => handleSocialLogin("github")}
        disabled={isLoading !== null}
        className="w-full"
      >
        <Github className="mr-2 h-4 w-4" />
        GitHub
      </Button>
      <Button
        variant="outline"
        onClick={() => handleSocialLogin("google")}
        disabled={isLoading !== null}
        className="w-full"
      >
        <Mail className="mr-2 h-4 w-4" />
        Google
      </Button>
    </div>
  )
}
