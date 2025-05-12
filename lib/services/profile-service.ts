/**
 * Service for handling user profile operations
 */

import { apiClient } from "../api-client"

export interface Profile {
  id: string
  email: string
  full_name: string
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export const profileService = {
  async getCurrentProfile(): Promise<Profile> {
    return apiClient.get<Profile>("/profiles/me")
  },

  async updateProfile(profile: Partial<Profile>): Promise<Profile> {
    return apiClient.put<Profile>("/profiles/me", profile)
  },

  async uploadAvatar(file: File): Promise<{ avatar_url: string }> {
    const formData = new FormData()
    formData.append("avatar", file)

    return apiClient.fetch<{ avatar_url: string }>("/profiles/me/avatar", {
      method: "POST",
      body: formData,
      headers: {}, // Let the browser set the content type for FormData
    })
  },
}
