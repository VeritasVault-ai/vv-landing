"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface SocialLoginButtonProps {
  provider: string
  icon: LucideIcon
  onClick: () => Promise<void>
  className?: string
  disabled?: boolean
}

export function SocialLoginButton({
  provider,
  icon: Icon,
  onClick,
  className,
  disabled = false,
}: SocialLoginButtonProps) {
  return (
    <Button
      variant="outline"
      className={cn("w-full flex items-center gap-2 justify-center", className)}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className="h-5 w-5" />
      <span>Continue with {provider}</span>
    </Button>
  )
}
