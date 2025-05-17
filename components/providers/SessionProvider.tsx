'use client'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface SessionProviderProps {
  children: ReactNode
}

/**
 * SessionProvider wraps the application with NextAuth's SessionProvider
 * to make session data available throughout the app.
 */
export function SessionProvider({ children }: SessionProviderProps) {
  return (
    <NextAuthSessionProvider 
      // Explicitly specify the API path to ensure consistency
      basePath="/api/auth"
    >
      {children}
    </NextAuthSessionProvider>
  )
}