// src/components/LogoFull.tsx
'use client'

import Image from 'next/image'

interface LogoFullProps {
  width?: number
  height?: number
  primaryColor?: string
  secondaryColor?: string
  tertiaryColor?: string
  className?: string
}

export function LogoFull({
  width = 280,
  height = 60,
  primaryColor = '#4842E3',     // VeritasVault primary blue
  secondaryColor = '#FFD700',   // Gold for "Vault"
  tertiaryColor = '#E3E348',    // Light accent for shield background
  className = '',
}: LogoFullProps) {
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
          alt="VeritasVault Logo"
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
          <span>Veritas</span>
        </span>
        <span
          className="text-2xl font-bold ml-1"
          style={{ color: secondaryColor }}
        >
          Vault
        </span>
      </div>
    </div>
  )
}
