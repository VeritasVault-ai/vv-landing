"use client"

import { Button } from "@/components/ui/button"
import { useCurrentVersion } from "@/hooks/use-current-version"
import { cn } from "@/lib/utils"
import type { ButtonProps } from "@/components/ui/button"

interface VersionAwareButtonProps extends ButtonProps {
  standardClassName?: string
  corporateClassName?: string
  standardVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  corporateVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export function VersionAwareButton({
  standardClassName,
  corporateClassName,
  standardVariant,
  corporateVariant,
  className,
  variant,
  ...props
}: VersionAwareButtonProps) {
  const { isCorporate } = useCurrentVersion()

  const finalClassName = cn(className, isCorporate ? corporateClassName : standardClassName)
  const finalVariant = isCorporate ? corporateVariant || variant : standardVariant || variant

  return <Button className={finalClassName} variant={finalVariant} {...props} />
}
