"use client"

import Image from "next/image"

interface VeritasVaultLogoProps {
  width?: number
  height?: number
  className?: string
}

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