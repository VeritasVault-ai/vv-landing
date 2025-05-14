"use client"

import { CheckCircle } from "lucide-react"

interface VersionCardFeatureListProps {
  features: string[]
  checkColor: string
}

/**
 * Displays a list of features with a colored check icon for each item.
 *
 * @param features - The list of feature descriptions to display.
 * @param checkColor - The CSS class specifying the color of the check icon.
 */
export function VersionCardFeatureList({ features, checkColor }: VersionCardFeatureListProps) {
  return (
    <ul className="space-y-3 mb-6 flex-grow">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center text-white/80">
          <CheckCircle className={`h-4 w-4 ${checkColor} mr-2 flex-shrink-0`} />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  )
}