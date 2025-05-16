'use client'

import { ReactNode } from 'react'

/**
 * A wrapper component that marks its children as client-side only
 * Use this to wrap components that need to access theme context
 */
export function ThemeAwareComponent({ children }: { children: ReactNode }) {
  return <>{children}</>
}