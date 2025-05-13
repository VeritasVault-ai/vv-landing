"use client"

import type React from "react"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

export interface SupportCardProps {
  title: string
  icon: React.ReactNode
  features: { name: string; included: boolean; value?: string }[]
  color: "blue" | "indigo"
}

export function SupportCard({
  title,
  icon,
  features,
  color,
}: SupportCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden border-2 transition-all duration-300",
        color === "blue" ? "border-blue-200 dark:border-blue-900" : "border-indigo-200 dark:border-indigo-900",
      )}
    >
      <div
        className={cn(
          "p-6",
          color === "blue" ? "bg-blue-50 dark:bg-blue-950/30" : "bg-indigo-50 dark:bg-indigo-950/30",
        )}
      >
        <div className="flex items-center">
          <div
            className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center mr-3",
              color === "blue" ? "bg-blue-100 dark:bg-blue-900/50" : "bg-indigo-100 dark:bg-indigo-900/50",
            )}
          >
            {icon}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
      </div>
      <CardContent className="p-6">
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center justify-between">
              <span>{feature.name}</span>
              <div>
                {feature.included ? (
                  feature.value ? (
                    <span className={cn("text-sm font-medium", color === "blue" ? "text-blue-600" : "text-indigo-600")}>
                      {feature.value}
                    </span>
                  ) : (
                    <Check className={cn("h-5 w-5", color === "blue" ? "text-blue-500" : "text-indigo-500")} />
                  )
                ) : (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}