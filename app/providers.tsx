'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { MockInitializer } from './layout-with-mocks'

interface ProvidersProps {
  children: ReactNode
}

/**
 * Client-side providers wrapper that initializes necessary services
 * Includes MSW initialization for development environment
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Initialize MSW in development */}
      <MockInitializer />

      <SessionProvider>
        {children}
      </SessionProvider>
    </>
  )
}