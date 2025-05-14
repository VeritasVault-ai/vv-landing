"use client"

import { LucideIcon } from "lucide-react"

interface VersionCardHeaderProps {
  icon: LucideIcon
  title: string
  description: string
  iconColor: string
  iconBgColor: string
}

export function VersionCardHeader({
  icon: Icon,
  title,
  description,
  iconColor,
  iconBgColor
}: VersionCardHeaderProps) {
  return (
    <>
      <div className={`flex items-center justify-center h-16 w-16 rounded-full ${iconBgColor} mx-auto mb-6`}>
        <Icon className={`h-8 w-8 ${iconColor}`} />
      </div>
      <h2 className="text-2xl font-semibold text-center text-white mb-4">{title}</h2>
      <p className="text-white/70 text-center mb-6">
        {description}
      </p>
    </>
  )
}