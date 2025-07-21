"use client"

import { Button } from "@/components/ui/button"
import { Github, Loader2 } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { useState } from "react"
import { useAnalytics } from "@/hooks/use-analytics"
import { signInWithProvider } from "@/lib/auth/auth-service"

interface VersionAwareSocialLoginsProps {
  version: "standard" | "corporate"
  redirectTo?: string
}

export function VersionAwareSocialLogins({ version, redirectTo }: VersionAwareSocialLoginsProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const { trackEvent } = useAnalytics()

  const handleSocialLogin = async (provider: "google" | "github") => {
    setIsLoading(provider)

    trackEvent({
      action: "social_login_attempt",
      category: "authentication",
      label: provider,
      custom_data: { version },
    })

    try {
      await signInWithProvider(provider, { version, redirectTo })
    } catch (error) {
      console.error(`${provider} login error:`, error)
      trackEvent({
        action: "social_login_error",
        category: "authentication",
        label: provider,
        custom_data: { version, error: String(error) },
      })
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        onClick={() => handleSocialLogin("google")}
        disabled={isLoading !== null}
        className="w-full"
      >
        {isLoading === "google" ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FcGoogle className="mr-2 h-4 w-4" />
        )}
        Google
      </Button>
      <Button
        variant="outline"
        onClick={() => handleSocialLogin("github")}
        disabled={isLoading !== null}
        className="w-full"
      >
        {isLoading === "github" ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}
        GitHub
      </Button>
    </div>
  )
}
