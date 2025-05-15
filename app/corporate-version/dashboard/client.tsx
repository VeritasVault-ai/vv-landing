"use client"

import { RobustThemeProvider } from "@/src/context/RobustThemeProvider"
import { EXPERIENCE_TYPES, CORPORATE_VARIANTS, COLOR_MODES } from "@/src/constants/theme"
import { CorporateHeader } from "@/components/corporate/corporate-header"
import { CorporateFooter } from "@/components/corporate/corporate-footer"
import { ComingSoonBanner } from "@/components/corporate/coming-soon-banner"

/**
 * Client component for the Dashboard page
 */
export function DashboardClient() {
  return (
    <RobustThemeProvider 
      defaultExperience={EXPERIENCE_TYPES.CORPORATE}
      defaultVariant={CORPORATE_VARIANTS.CORPORATE}
      defaultColorMode={COLOR_MODES.LIGHT}
    >
      <div className="min-h-screen flex flex-col">
        <ComingSoonBanner />
        
        <main className="flex-grow">
          {/* Dashboard content */}
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            
            {/* Dashboard content would go here */}
            <div className="bg-gray-100 dark:bg-slate-800 p-12 rounded-lg text-center">
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Dashboard content is under development
              </p>
            </div>
          </div>
        </main>
        
      </div>
    </RobustThemeProvider>
  )
}