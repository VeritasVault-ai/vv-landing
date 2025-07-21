'use client'

import { useEffect } from 'react'
import { initializeMockServiceWorker } from './mocks'

/**
 * Client component that initializes the Mock Service Worker
 * This should be included in your root layout
 */
export function MockInitializer() {
  useEffect(() => {
    // Initialize MSW when the component mounts
    initializeMockServiceWorker()
  }, [])
  
  // This component doesn't render anything
  return null
}