import type React from "react"
import { EnhancedDashboardLayout } from "@/components/layout/enhanced-dashboard-layout"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <EnhancedDashboardLayout>{children}</EnhancedDashboardLayout>
}
