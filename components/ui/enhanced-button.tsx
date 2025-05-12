import type React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { colors } from "@/lib/color-system"

type ButtonVariant = "primary" | "secondary" | "success" | "warning" | "danger" | "outline" | "ghost"

interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
  withPulse?: boolean
  children: React.ReactNode
}

export function EnhancedButton({
  variant = "primary",
  size = "md",
  fullWidth = false,
  withPulse = false,
  className,
  children,
  ...props
}: EnhancedButtonProps) {
  // Define base styles based on variant
  const variantStyles = {
    primary: `bg-[${colors.primary.default}] hover:bg-[${colors.primary.hover}] active:bg-[${colors.primary.active}] text-white`,
    secondary: `bg-[${colors.secondary.default}] hover:bg-[${colors.secondary.hover}] active:bg-[${colors.secondary.active}] text-white`,
    success: `bg-[${colors.success.default}] hover:bg-[${colors.success.hover}] active:bg-[${colors.success.active}] text-white`,
    warning: `bg-[${colors.warning.default}] hover:bg-[${colors.warning.hover}] active:bg-[${colors.warning.active}] text-black`,
    danger: `bg-[${colors.danger.default}] hover:bg-[${colors.danger.hover}] active:bg-[${colors.danger.active}] text-white`,
    outline: `bg-transparent border border-[${colors.primary.default}] text-[${colors.primary.default}] hover:bg-[${colors.primary.light}]`,
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200",
  }

  // Define size styles
  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  }

  // Define pulse animation
  const pulseAnimation = withPulse
    ? variant === "primary"
      ? "animate-[pulse-primary]"
      : variant === "success"
        ? "animate-[pulse-success]"
        : variant === "warning"
          ? "animate-[pulse-warning]"
          : ""
    : ""

  // Combine all styles
  const buttonStyles = cn(
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? "w-full" : "",
    pulseAnimation,
    "transition-all duration-200 rounded-md font-medium focus:ring-2 focus:ring-offset-2 focus:outline-none",
    className,
  )

  return (
    <Button className={buttonStyles} {...props}>
      {children}
    </Button>
  )
}
