"use client"

import { useEffect } from "react"
import { createBrowserClient } from "@/lib/supabase"
import { setUserPropertiesAfterLogin } from "@/lib/analytics/set-user-properties"

export function UserPropertiesUpdater() {
  useEffect(() => {
    const updateUserProperties = async () => {
      try {
        const supabase = createBrowserClient()

        // Get current user
        const {
          data: { session },
          error: authError,
        } = await supabase.auth.getSession()

        if (authError || !session) {
          return
        }

        // Get user profile data
        const { data: profile, error: profileError } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("user_id", session.user.id)
          .single()

        if (profileError || !profile) {
          return
        }

        // Get user strategies count
        const { count: strategiesCount } = await supabase
          .from("strategies")
          .select("id", { count: "exact", head: true })
          .eq("user_id", session.user.id)

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
      } catch (error) {
        console.error("[Analytics] Error setting user properties:", error)
      }
    }

    updateUserProperties()
  }, [])

  // This component doesn't render anything
  return null
}
