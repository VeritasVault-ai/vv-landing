"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Droplets,
  LineChart,
  Sparkles,
  FlaskConical,
  Zap,
  BookOpen,
  ChevronRight,
  Settings,
  HelpCircle,
} from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface NavItem {
  name: string
  href: string
  icon: React.ReactNode
  badge?: string | number
  items?: { name: string; href: string }[]
}

export function EnhancedSidebar() {
  const pathname = usePathname()
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    analytics: true,
    strategies: true,
  })

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }))
  }

  const navItems: NavItem[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Liquidity Pools",
      href: "/pools",
      icon: <Droplets className="h-5 w-5" />,
      badge: 6,
    },
    {
      name: "Strategies",
      href: "/strategies",
      icon: <FlaskConical className="h-5 w-5" />,
      items: [
        { name: "My Strategies", href: "/strategies" },
        { name: "Create Strategy", href: "/strategies/create" },
        { name: "Strategy Templates", href: "/strategies/templates" },
      ],
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: <LineChart className="h-5 w-5" />,
      items: [
        { name: "Performance", href: "/analytics" },
        { name: "Historical Data", href: "/analytics/historical" },
        { name: "Market Trends", href: "/analytics/market" },
      ],
    },
    {
      name: "Flash Loans",
      href: "/flash-loans",
      icon: <Zap className="h-5 w-5" />,
    },
    {
      name: "AI Features",
      href: "/ai-features",
      icon: <Sparkles className="h-5 w-5" />,
      badge: "New",
    },
    {
      name: "How It Works",
      href: "/how-it-works",
      icon: <BookOpen className="h-5 w-5" />,
    },
  ]

  return (
    <div className="hidden border-r border-slate-800/30 bg-gradient-to-b from-[#0D1B2A] to-[#1A1A2E] lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b border-slate-800/30 px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold text-white">
            <Logo width={32} height={32} />
            <span>NeuralLiquid</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2 px-3">
          <nav className="grid items-start gap-1 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

              if (item.items) {
                const isGroupOpen = openGroups[item.name.toLowerCase()]
                const hasActiveChild = item.items.some((subItem) => pathname === subItem.href)

                return (
                  <Collapsible
                    key={item.href}
                    open={isGroupOpen || hasActiveChild}
                    onOpenChange={() => toggleGroup(item.name.toLowerCase())}
                    className="w-full"
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-between px-3 py-2 text-left text-white/70 hover:text-white hover:bg-white/5",
                          (isActive || hasActiveChild) && "text-white bg-white/5",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <span>{item.name}</span>
                          {item.badge && (
                            <span
                              className={cn(
                                "ml-auto rounded-full px-2 py-0.5 text-xs",
                                typeof item.badge === "string" && item.badge.toLowerCase() === "new"
                                  ? "bg-brand-purple/20 text-brand-purple"
                                  : "bg-white/10 text-white/70",
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <ChevronRight
                          className={cn("h-4 w-4 transition-transform", (isGroupOpen || hasActiveChild) && "rotate-90")}
                        />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-10 pr-2">
                      <div className="flex flex-col gap-1 pt-1">
                        {item.items.map((subItem) => {
                          const isSubActive = pathname === subItem.href
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={cn(
                                "rounded-md px-3 py-2 text-white/60 hover:text-white hover:bg-white/5 transition-colors",
                                isSubActive && "text-white bg-white/5 font-medium",
                              )}
                            >
                              {subItem.name}
                            </Link>
                          )
                        })}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                )
              }

              return (
                <TooltipProvider key={item.href}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 transition-colors",
                          isActive && "text-white bg-white/5 font-medium",
                        )}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                        {item.badge && (
                          <span
                            className={cn(
                              "ml-auto rounded-full px-2 py-0.5 text-xs",
                              typeof item.badge === "string" && item.badge.toLowerCase() === "new"
                                ? "bg-brand-purple/20 text-brand-purple"
                                : "bg-white/10 text-white/70",
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-slate-900 text-white border-slate-800">
                      {item.name}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            })}
          </nav>

          <div className="mt-6 pt-6 border-t border-slate-800/30">
            <nav className="grid items-start gap-1 text-sm font-medium">
              <Link
                href="/settings"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
              <Link
                href="/help"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              >
                <HelpCircle className="h-5 w-5" />
                <span>Help & Support</span>
              </Link>
            </nav>
          </div>
        </div>
        <div className="mt-auto p-4 border-t border-slate-800/30">
          <Button
            className="w-full bg-gradient-to-r from-[#3A86FF] to-[#4ECDC4] hover:from-[#3A86FF]/90 hover:to-[#4ECDC4]/90 text-white"
            size="sm"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </div>
  )
}
