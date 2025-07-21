"use client"

import { ThemeAwareImage } from "@/components/ui/theme-aware-image"

interface TrustedInstitutionsProps {
  className?: string
}

export function TrustedInstitutions({ className = "" }: TrustedInstitutionsProps) {
  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      <h2 className="text-2xl font-semibold mb-8 text-center">Trusted by Leading Institutions</h2>
      <ThemeAwareImage
        src="/trusted-institutions.png"
        lightSrc="/trusted-institutions-light.png"
        darkSrc="/trusted-institutions.png"
        alt="Logos of financial institutions that trust our platform"
        width={800}
        height={100}
        className="max-w-full h-auto"
        priority
      />
    </div>
  )
}
