"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface EnhancedCTAProps {
  text: string
  href: string
  variant?: "primary" | "secondary" | "success" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "xl"
  className?: string
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  pulse?: boolean
  onClick?: () => void
}

export function EnhancedCTA({
  text,
  href,
  variant = "primary",
  size = "default",
  className,
  icon,
  iconPosition = "right",
  pulse = false,
  onClick,
}: EnhancedCTAProps) {
  // Define variant styles
  const variantStyles = {
    primary: "bg-brand-blue hover:bg-brand-blue/90 text-white",
    secondary: "bg-brand-aqua hover:bg-brand-aqua/90 text-white",
    success: "bg-brand-success hover:bg-brand-success/90 text-white",
    outline: "border border-brand-blue text-brand-blue hover:bg-brand-blue/10",
    ghost: "text-brand-blue hover:bg-brand-blue/10",
  }

  // Define size styles
  const sizeStyles = {
    default: "py-2 px-4 text-sm",
    sm: "py-1 px-3 text-xs",
    lg: "py-3 px-6 text-base",
    xl: "py-4 px-8 text-lg",
  }

  // Define pulse animation
  const pulseAnimation = pulse ? "animate-pulse-primary" : ""

  // Combine all styles
  const buttonStyles = cn(
    variantStyles[variant],
    sizeStyles[size],
    "rounded-md font-medium transition-all duration-300 flex items-center gap-2",
    pulseAnimation,
    className,
  )

  return (
    <Button asChild className={buttonStyles} onClick={onClick}>
      <Link href={href}>
        {iconPosition === "left" && icon}
        {text}
        {iconPosition === "right" && icon}
      </Link>
    </Button>
  )
}
