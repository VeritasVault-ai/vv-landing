import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function GET(request: Request, { params }: { params: { group: string } }) {
  try {
    const group = params.group
    const supabase = createClient()

    // This is a placeholder implementation - in a real app, you would fetch from a navigation table
    // For now, we'll return hardcoded navigation items filtered by group
    const allNavigationItems = [
      {
        id: "1",
        label: "Dashboard",
        path: "/dashboard",
        icon: "layout-dashboard",
        group: "main",
      },
      {
        id: "2",
        label: "Pools",
        path: "/pools",
        icon: "database",
        group: "main",
      },
      {
        id: "3",
        label: "Analytics",
        path: "/analytics",
        icon: "bar-chart",
        group: "main",
      },
      {
        id: "4",
        label: "Strategies",
        path: "/strategies",
        icon: "git-branch",
        group: "main",
      },
      {
        id: "5",
        label: "Flash Loans",
        path: "/flash-loans",
        icon: "zap",
        group: "main",
      },
      {
        id: "6",
        label: "Home",
        path: "/",
        icon: "home",
        group: "marketing",
      },
      {
        id: "7",
        label: "How It Works",
        path: "/how-it-works",
        icon: "info",
        group: "marketing",
      },
      {
        id: "8",
        label: "Contact",
        path: "/contact",
        icon: "mail",
        group: "marketing",
      },
    ]

    const filteredItems = allNavigationItems.filter((item) => item.group === group)

    return NextResponse.json(filteredItems)
  } catch (error) {
    console.error(`Error fetching navigation for group ${params.group}:`, error)
    return NextResponse.json({ error: "Failed to fetch navigation" }, { status: 500 })
  }
}
