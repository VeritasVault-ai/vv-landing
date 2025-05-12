"use client"

import { useCurrentVersion } from "@/hooks/use-current-version"
import { cn } from "@/lib/utils"
import Link from "next/link"
import type { HTMLAttributes } from "react"

interface VersionAwareCTAProps extends HTMLAttributes<HTMLDivElement> {
  standardClassName?: string
  corporateClassName?: string
  standardTitle?: string
  corporateTitle?: string
  standardDescription?: string
  corporateDescription?: string
  standardButtonText?: string
  corporateButtonText?: string
  standardButtonHref?: string
  corporateButtonHref?: string
  standardButtonClassName?: string
  corporateButtonClassName?: string
}

export function VersionAwareCTA({
  standardClassName,
  corporateClassName,
  standardTitle = "Ready to get started?",
  corporateTitle = "Ready to transform your treasury operations?",
  standardDescription = "Join thousands of users optimizing their liquidity with AI.",
  corporateDescription = "Schedule a consultation with our institutional specialists.",
  standardButtonText = "Sign up now",
  corporateButtonText = "Schedule a consultation",
  standardButtonHref = "/standard/register",
  corporateButtonHref = "/corporate/contact",
  standardButtonClassName,
  corporateButtonClassName,
  className,
  ...props
}: VersionAwareCTAProps) {
  const { isCorporate } = useCurrentVersion()

  const finalClassName = cn(
    "rounded-lg p-8 text-center",
    className,
    isCorporate ? cn("bg-slate-900 text-white", corporateClassName) : cn("bg-blue-600 text-white", standardClassName),
  )

  const title = isCorporate ? corporateTitle : standardTitle
  const description = isCorporate ? corporateDescription : standardDescription
  const buttonText = isCorporate ? corporateButtonText : standardButtonText
  const buttonHref = isCorporate ? corporateButtonHref : standardButtonHref
  const buttonClassName = cn(
    "mt-4 inline-flex items-center justify-center rounded-md px-6 py-3 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    isCorporate
      ? cn("bg-blue-700 text-white hover:bg-blue-800", corporateButtonClassName)
      : cn("bg-white text-blue-600 hover:bg-blue-50", standardButtonClassName),
  )

  return (
    <div className={finalClassName} {...props}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 text-lg opacity-90">{description}</p>
      <Link href={buttonHref} className={buttonClassName}>
        {buttonText}
      </Link>
    </div>
  )
}
