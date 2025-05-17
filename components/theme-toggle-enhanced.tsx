"use client"

/**
 * This is an adapter component that re-exports an existing theme toggle component.
 * It prevents duplication of functionality while satisfying imports expecting ThemeToggleEnhanced.
 */

import { ThemeToggle } from '@/src/components/ThemeToggle'

export function ThemeToggleEnhanced(props: any) {
  return <ThemeToggle {...props} />
}