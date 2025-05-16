"use client"

import { cn } from "@/lib/utils"
import {
  BarChart3,
  Briefcase,
  ChevronRight,
  FileText,
  Home,
  Settings,
  Shield,
  Users
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

interface SidebarProps {
  className?: string
}

/**
 * Renders a collapsible sidebar navigation menu for corporate-related pages.
 *
 * The sidebar displays navigation links with icons, highlights the active section based on the current path, and includes a toggle to expand or collapse its width. It is only visible on routes containing `/corporate/` or `/corporate-version/`.
 *
 * @param className - Optional additional CSS classes for the sidebar container.
 *
 * @returns The sidebar element if on a corporate page; otherwise, `null`.
 */
export function CorporateSidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState(true)
  
  // Navigation items with icons and paths
  const navItems = [
    { icon: Home, label: "Dashboard", path: "/corporate/dashboard" },
    { icon: Briefcase, label: "Portfolio", path: "/corporate/portfolio" },
    { icon: BarChart3, label: "Analytics", path: "/corporate/analytics" },
    { icon: Shield, label: "Compliance", path: "/corporate/compliance" },
    { icon: FileText, label: "Reports", path: "/corporate/reports" },
    { icon: Users, label: "Team", path: "/corporate/team" },
    { icon: Settings, label: "Settings", path: "/corporate/settings" },
  ]

  // Check if we're on a corporate page - include corporate-version paths too
  const isCorporatePage = pathname.includes('/corporate/') || pathname.includes('/corporate-version/')
  // Only show sidebar on corporate pages
  if (!isCorporatePage) {
    return null
  }

  return (
    <aside 
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 z-40",
        expanded ? "w-64" : "w-16",
        className
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-end p-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ChevronRight className={cn(
              "h-5 w-5 transition-transform",
              expanded ? "rotate-180" : ""
            )} />
          </button>
        </div>
        
        <nav className="flex-1 px-2 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => {
              // Check if the current path starts with the nav item path
              // This handles both exact matches and paths with fragments or additional segments
              const isActive = pathname.startsWith(item.path)
              
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                      isActive 
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" 
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    )}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {expanded && <span className="truncate">{item.label}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          {expanded && (
            <div className="text-xs text-slate-500 dark:text-slate-400">
              <p>VeritasVault.net</p>
              <p>v1.2.0</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}