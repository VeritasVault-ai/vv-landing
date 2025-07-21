"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  className?: string
  iconClassName?: string
  accentColor?: string
  onClick?: () => void
}

export function FeatureCard({
  title,
  description,
  icon,
  className,
  iconClassName,
  accentColor = "#3A86FF",
  onClick,
}: FeatureCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}
      style={{
        borderTop: `3px solid ${accentColor}`,
      }}
    >
      <CardHeader className="pb-2">
        <div
          className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-4", iconClassName)}
          style={{
            backgroundColor: `${accentColor}20`, // 20% opacity
            color: accentColor,
          }}
        >
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
