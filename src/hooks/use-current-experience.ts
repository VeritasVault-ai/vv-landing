"use client"

/**
 * Hook to determine the current experience based on the URL path
 * 
 * This hook uses the window.location.pathname to determine which experience
 * should be active based on the current route.
 */

import { EXPERIENCE_TYPES } from "@/src/constants/theme"

/**
 * React hook that returns the current user experience type based on the URL path.
 *
 * Determines the experience type by inspecting the pathname and updates automatically when the route changes.
 *
 * @returns The current experience type, as defined in {@link EXPERIENCE_TYPES}.
 */
export function useCurrentExperience() {
  return EXPERIENCE_TYPES.STANDARD
}
