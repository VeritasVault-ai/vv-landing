'use client'

import { ReactNode } from 'react'
import { SessionProvider } from '@/components/providers/SessionProvider'

interface ProvidersProps {
  children: ReactNode
}

/**
 * Client-side providers wrapper
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}