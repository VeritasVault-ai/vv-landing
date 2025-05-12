"use client"

import Image from "next/image"

interface VeritasVaultLogoProps {
  width?: number
  height?: number
  className?: string
}

/**
 * Renders the VeritasVault logo image with customizable dimensions and optional container styling.
 *
 * @param width - The width of the logo in pixels. Defaults to 40.
 * @param height - The height of the logo in pixels. Defaults to 40.
 * @param className - Additional CSS classes for the container div.
 *
 * @returns A React element displaying the VeritasVault logo.
 */
export function VeritasVaultLogo({
  width = 40,
  height = 40,
  className = "",
}: VeritasVaultLogoProps) {
  return (
    <div className={className}>
      <Image 
        src="/veritas-vault-logo.png" 
        alt="VeritasVault Logo" 
        width={width} 
        height={height} 
        className="h-auto"
      />
    </div>
  )
}