'use client'

/**
 * TEMPORARY FILE - PART OF CODEBASE MIGRATION
 * 
 * This is a temporary client-side wrapper created during the src/ directory migration.
 * It provides a non-SSR version of the ThemeToggle component to prevent hydration mismatches.
 * 
 * TODO: Once the component structure is finalized, this should either:
 * 1. Be moved to the src/ directory as a proper component, or
 * 2. Be deleted and imports updated to use a proper client-side ThemeToggle directly
 */

import dynamic from 'next/dynamic'

// Import the ThemeToggle component with no SSR to prevent hydration mismatch
const ThemeToggleNoSSR = dynamic(() => import('../src/components/ThemeToggle').then(mod => ({ default: mod.ThemeToggle })), {
  ssr: false,
})

export function ThemeToggleClient({ variant }: { variant?: 'icon-only' }) {
  return <ThemeToggleNoSSR />
}