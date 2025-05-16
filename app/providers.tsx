'use client'

import { ReactNode, useEffect } from 'react'
import { MockInitializer } from './layout-with-mocks'

interface ProvidersProps {
  children: ReactNode
}

/**
 * Client-side providers wrapper that initializes necessary services
 * Includes MSW initialization for development environment
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {/* Initialize MSW in development */}
      <MockInitializer />
      {children}
    </>
  )
}