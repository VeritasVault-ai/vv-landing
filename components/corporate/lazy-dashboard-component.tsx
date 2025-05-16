"use client"

import { Suspense, lazy, ComponentType } from 'react'

// Loading component
function ComponentLoading() {
  return (
    <div className="w-full h-64 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 dark:border-blue-400"></div>
    </div>
  )
}

// Error fallback component
function ComponentError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/50 p-6 my-4">
      <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
        Failed to load component
      </h3>
      <p className="text-sm text-red-600 dark:text-red-300 mb-4">
        {error.message || "An unexpected error occurred"}
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-700 dark:text-red-300 rounded-md text-sm font-medium"
      >
        Try Again
      </button>
    </div>
  )
}

interface LazyDashboardComponentProps {
  componentPath: string
  fallback?: React.ReactNode
  [key: string]: any
}

/**
 * A wrapper component that lazily loads dashboard components
 * This improves initial load time by only loading components when they're needed
 * 
 * @param componentPath - Path to the component relative to the app root
 * @param fallback - Optional custom loading component
 * @param props - Props to pass to the loaded component
 */
export function LazyDashboardComponent({ 
  componentPath, 
  fallback = <ComponentLoading />,
  ...props 
}: LazyDashboardComponentProps) {
  // Dynamically import the component based on the path
  const DynamicComponent = lazy(() => {
    // Add a small delay to ensure the loading state is shown
    // This prevents flickering for fast-loading components
    return new Promise<{ default: ComponentType<any> }>((resolve) => {
      // First try to import the component
      import(`@/${componentPath}`)
        .then((module) => {
          // Add a small delay to show loading state
          setTimeout(() => resolve(module), 300)
        })
        .catch((error) => {
          console.error(`Failed to load component from path: ${componentPath}`, error)
          // Return an error component as the default export
          resolve({
            default: () => (
              <ComponentError 
                error={new Error(`Failed to load component: ${error.message}`)} 
                reset={() => window.location.reload()} 
              />
            )
          })
        })
    })
  })

  return (
    <Suspense fallback={fallback}>
      <DynamicComponent {...props} />
    </Suspense>
  )
}