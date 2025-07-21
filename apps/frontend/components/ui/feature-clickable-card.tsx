"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface FeatureClickableCardProps {
  title: string
  description: string
  icon: ReactNode
  href: string
  className?: string
}

export function FeatureClickableCard({ title, description, icon, href, className }: FeatureClickableCardProps) {
  return (
    <Link href={href} className="block w-full h-full">
      <div
        className={cn(
          "clickable-card p-6 h-full flex flex-col",
          "transition-all duration-300 ease-in-out",
          "border border-transparent hover:border-standard-primary/20",
          className,
        )}
      >
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-md bg-standard-primary/10 text-standard-primary mr-3">{icon}</div>
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <p className="text-standard-muted text-sm flex-grow">{description}</p>
        <div className="mt-4 flex items-center text-standard-primary text-sm font-medium">
          <span>Learn more</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
