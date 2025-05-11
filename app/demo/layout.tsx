"use client"

import type React from "react"

import { TourProvider } from "@/components/tour/tour-context"

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <TourProvider>{children}</TourProvider>
}
