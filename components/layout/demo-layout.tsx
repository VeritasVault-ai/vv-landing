"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  ChevronRight,
  CreditCard,
  DollarSign,
  Download,
  Home,
  LayoutDashboard,
  Moon,
  PieChart,
  Play,
  PresentationIcon as PresentationScreen,
  Settings,
  Shield,
  Sun,
  Users,
  Wallet,
  Mail,
  Zap,
  History,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Footer } from "@/components/layout/footer"
import { useTheme } from "next-themes"
import { LogoFull } from "@/components/ui/logo-full"

interface DemoLayoutProps {
  children: React.ReactNode
}

export function DemoLayout({ children }: DemoLayoutProps) {
  const pathname = usePathname()
  const [comingSoonOpen, setComingSoonOpen] = useState(false)
  const [featureName, setFeatureName] = useState("")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can access the window object
  useEffect(() => {
    setMounted(true)
  }, [])

  const showComingSoon = (name: string) => {
    setFeatureName(name)
    setComingSoonOpen(true)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleContactClick = () => {
    // Construct mailto URL with CC
    const mailtoUrl = `mailto:jurie@phoenixvc.tech?cc=smit.jurie@gmail.com&subject=${encodeURIComponent("Inquiry from NeuralLiquid")}`
    window.location.href = mailtoUrl
  }

  const isInvestorDemoPage = pathname === "/demo"

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <div className="flex flex-1 w-full">
          <Sidebar className="border-r border-border bg-background">
            <SidebarHeader>
              <div className="flex items-center gap-2 px-4 py-2 logo-clear-space">
                <LogoFull width={180} height={40} />
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/")}>
                    <Link href="/">
                      <Home className="mr-2 h-4 w-4" />
                      <span>Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/demo")}>
                    <Link href="/demo">
                      <PresentationScreen className="mr-2 h-4 w-4" />
                      <span>Investor Demo</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
                    <Link href="/dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/pools")}>
                    <Link href="/pools">
                      <PieChart className="mr-2 h-4 w-4" />
                      <span>Liquidity Pools</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/flash-loans")}>
                    <Link href="/flash-loans">
                      <Zap className="mr-2 h-4 w-4" />
                      <span>Flash Loans</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Integrated protocols section */}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/protocols/uniswap")}>
                    <Link href="/protocols/uniswap">
                      <ChevronRight className="mr-2 h-4 w-4" />
                      <span>Uniswap</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/protocols/sushiswap")}>
                    <Link href="/protocols/sushiswap">
                      <ChevronRight className="mr-2 h-4 w-4" />
                      <span>SushiSwap</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/protocols/raydium")}>
                    <Link href="/protocols/raydium">
                      <ChevronRight className="mr-2 h-4 w-4" />
                      <span>Raydium</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/protocols/gnosis")}>
                    <Link href="/protocols/gnosis">
                      <ChevronRight className="mr-2 h-4 w-4" />
                      <span>Gnosis</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/analytics")}>
                    <Link href="/analytics">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      <span>Analytics</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/analytics/historical")}>
                    <Link href="/analytics/historical">
                      <History className="mr-2 h-4 w-4" />
                      <span>Historical Data</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/strategies")}>
                    <Link href="/strategies">
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Strategies</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/transactions")}>
                    <Link href="/transactions">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Transactions</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/users")}>
                    <Link href="/users">
                      <Users className="mr-2 h-4 w-4" />
                      <span>Users</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={handleContactClick}>
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Contact Us</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <div className="space-y-2 p-4">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => showComingSoon("Connect Wallet")}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  <span>Connect Wallet</span>
                </Button>
                <div className="rounded-lg border bg-card p-4 mt-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Demo Mode</p>
                      <p className="text-xs text-muted-foreground">Investor Preview</p>
                    </div>
                  </div>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>

          <div className="flex flex-col flex-1 w-full">
            <header className="sticky top-0 z-10 border-b border-border bg-background w-full">
              <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex items-center gap-2">
                  <SidebarTrigger />
                  <div className="flex items-center logo-clear-space">
                    <LogoFull width={180} height={40} />
                    {pathname !== "/" && (
                      <span className="ml-2 text-muted-foreground">
                        {pathname === "/demo" ? "Investor Demo" : "AI-Enhanced Liquidity Management"}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isInvestorDemoPage && (
                    <>
                      <Button variant="outline" size="sm" className="gap-1" asChild>
                        <Link href="/dashboard">
                          <Play className="h-3.5 w-3.5" />
                          Live Demo
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => showComingSoon("Pitch Deck")}
                      >
                        <Download className="h-3.5 w-3.5" />
                        Pitch Deck
                      </Button>
                    </>
                  )}
                  {mounted && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    >
                      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={() => showComingSoon("Notifications")}>
                    Notifications
                  </Button>
                  <Button size="sm" onClick={() => showComingSoon("Schedule Demo")}>
                    Schedule Demo
                  </Button>
                </div>
              </div>
            </header>

            <main className="flex-1 w-full">
              <div className="w-full pt-0">{children}</div>
            </main>

            <Footer />
          </div>
        </div>
      </div>

      <Dialog open={comingSoonOpen} onOpenChange={setComingSoonOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Coming Soon</DialogTitle>
            <DialogDescription>
              The {featureName} feature is currently under development and will be available in a future update.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button onClick={() => setComingSoonOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}
