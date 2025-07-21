// src/components/LogoFull.tsx
'use client'

import Image from 'next/image'
import { CORPORATE_PRODUCT_NAME } from "@/lib/config/product-info"

interface LogoFullProps {
  width?: number
  height?: number
  primaryColor?: string
  secondaryColor?: string
  tertiaryColor?: string
  className?: string
}

/**
 * Renders the full corporate product logo with a shield image and styled text.
 *
 * Displays a shield icon alongside the product name, allowing customization of colors, size, and additional CSS classes.
 *
 * @param width - The overall width of the logo in pixels.
 * @param height - The overall height of the logo in pixels.
 * @param primaryColor - Color for the first part of the text segment.
 * @param secondaryColor - Color for the second part of the text segment.
 * @param tertiaryColor - Background color for the shield icon.
 * @param className - Additional CSS classes for the container.
 */
export function LogoFull({
  width = 280,
  height = 60,
  primaryColor = '#4842E3',     // Primary blue
  secondaryColor = '#FFD700',   // Gold for second part
  tertiaryColor = '#E3E348',    // Light accent for shield background
  className = '',
}: LogoFullProps) {
  // Split the product name into two parts (assuming format like "VeritasVault")
  const productNameParts = CORPORATE_PRODUCT_NAME.match(/^([A-Z][a-z]*)(.*)$/) || [CORPORATE_PRODUCT_NAME, "", ""];
  const firstPart = productNameParts[1] || ""; // First word with capital letter
  const secondPart = productNameParts[2] || ""; // Rest of the name
  return (
    <div
      className={`flex items-center ${className}`}
      style={{ width, height }}
    >
      {/* Shield with tertiaryColor background */}
      <div
        className="mr-3 rounded-full p-1"
        style={{ backgroundColor: tertiaryColor }}
      >
        <Image
          src="/veritas-vault-logo.png"
          alt={`${CORPORATE_PRODUCT_NAME} Logo`}
          width={40}
          height={40}
          className="h-auto"
        />
      </div>

      {/* Text part of the logo */}
      <div className="flex items-center">
        <span
          className="text-2xl font-bold"
          style={{ color: primaryColor }}
        >
          <span>{firstPart}</span>
        </span>
        <span
          className="text-2xl font-bold ml-1"
          style={{ color: secondaryColor }}
        >
          {secondPart}
        </span>
      </div>
    </div>
  )
}
