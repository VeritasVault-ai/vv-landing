"use client"

import { ThemeAwareImage } from "@/components/ui/theme-aware-image-bridge"

/**
 * Renders a themed section highlighting trust by leading financial institutions.
 *
 * Displays a responsive image that adapts to light and dark themes, centered within a styled section.
 */
export function TrustedInstitutions() {
  return (
    <section className="py-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          <ThemeAwareImage
            lightSrc="/trusted-institutions-light.png"
            darkSrc="/trusted-institutions-dark.png"
            alt="Trusted by leading financial institutions"
            width={900}
            height={100}
            className="max-w-full"
          />
        </div>
      </div>
    </section>
  )
}