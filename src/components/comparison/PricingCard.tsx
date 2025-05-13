"use client"

import type React from "react"
import Link from "next/link"
import { Check, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export interface PricingCardProps {
  title: string
  icon: React.ReactNode
  description: string
  price: string
  period: string
  features: string[]
  buttonText: string
  buttonLink: string
  color: "blue" | "indigo"
}

export function PricingCard({
  title,
  icon,
  description,
  price,
  period,
  features,
  buttonText,
  buttonLink,
  color,
}: PricingCardProps) {
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
        <div className="flex items-center mb-4">
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
        <p className="text-muted-foreground">{description}</p>
      </div>
      <CardContent className="p-6">
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">{price}</span>
            <span className="ml-2 text-muted-foreground">{period}</span>
          </div>
        </div>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check
                className={cn("h-5 w-5 mr-3 flex-shrink-0", color === "blue" ? "text-blue-500" : "text-indigo-500")}
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          asChild
          className={cn(
            "w-full",
            color === "blue" ? "bg-blue-600 hover:bg-blue-700" : "bg-indigo-600 hover:bg-indigo-700",
          )}
        >
          <Link href={buttonLink}>
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}