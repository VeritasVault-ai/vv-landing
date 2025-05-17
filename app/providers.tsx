'use client'

import { ReactNode } from 'react'
import { MockInitializer } from './layout-with-mocks'
import { SessionProvider } from '@/components/providers/SessionProvider'

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