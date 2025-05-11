import { createServerClient } from "@/lib/supabase"

export async function syncUserProfile(userId: string) {
  const supabase = createServerClient()

  // Get user data from auth.users
  const { data: userData, error: userError } = await supabase.auth.admin.getUserById(userId)

  if (userError || !userData.user) {
    console.error("Error fetching user data:", userError)
    return
  }

  const user = userData.user

  // Check if profile exists
  const { data: existingProfile } = await supabase.from("user_profiles").select("*").eq("user_id", userId).single()

  // Extract profile data from user metadata and identity providers
  const identities = user.identities || []
  const provider = identities[0]?.provider || "email"

  // Get name from appropriate source
  let fullName = user.user_metadata?.full_name
  if (!fullName && provider === "google") {
    fullName = user.user_metadata?.name || user.user_metadata?.full_name
  } else if (!fullName && provider === "discord") {
    fullName = user.user_metadata?.full_name || user.user_metadata?.name || user.user_metadata?.preferred_username
  }

  // Get avatar from appropriate source
  let avatarUrl = user.user_metadata?.avatar_url
  if (provider === "google") {
    avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture
  } else if (provider === "discord") {
    // Discord avatars require special handling
    const discordId = user.user_metadata?.provider_id
    const discordAvatar = user.user_metadata?.avatar
    if (discordId && discordAvatar) {
      avatarUrl = `https://cdn.discordapp.com/avatars/${discordId}/${discordAvatar}.png`
    }
  }

  const profileData = {
    user_id: userId,
    full_name: fullName || "User",
    email: user.email || "",
    avatar_url: avatarUrl || null,
    auth_provider: provider,
    last_sign_in: new Date().toISOString(),
  }

  if (existingProfile) {
    // Update existing profile
    const { error: updateError } = await supabase.from("user_profiles").update(profileData).eq("user_id", userId)

    if (updateError) {
      console.error("Error updating user profile:", updateError)
    }
  } else {
    // Create new profile
    const { error: insertError } = await supabase.from("user_profiles").insert(profileData)

    if (insertError) {
      console.error("Error creating user profile:", insertError)
    }
  }
}
