"use client"

import Image from "next/image"

interface LogoFullProps {
  width?: number
  height?: number
  primaryColor?: string
  secondaryColor?: string
  className?: string
}

export function LogoFull({
  width = 280,
  height = 60,
  primaryColor = "#4842E3", // VeritasVault primary blue
  secondaryColor = "#FFD700", // Gold color for the shield
  className = "",
}: LogoFullProps) {
  return (
    <div className={`flex items-center ${className}`} style={{ width, height }}>
      {/* Logo image - using the shield logo */}
      <div className="mr-3">
        <Image 
          src="/veritas-vault-logo.png" 
          alt="VeritasVault Logo" 
          width={40} 
          height={40} 
          className="h-auto"
        />
      </div>
      
      {/* Text part of the logo */}
      <div className="flex items-center">
        <span className="text-2xl font-bold" style={{ color: primaryColor }}>
          <span>Veritas</span>
          <span style={{ color: "#4053CC" }}>Vault</span>
          <span style={{ color: "#3A86FF" }}>.ai</span>
        </span>
      </div>
    </div>
  )
}