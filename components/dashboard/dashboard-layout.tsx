"use client"

import { RobustThemeToggle } from "@/components/robust-theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useRobustTheme } from "@/src/context/RobustThemeProvider"
import {
  BarChart3,
  Bell,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  PieChart,
  Settings,
  Users,
  X
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

/**
 * Layout component for the dashboard
 * Provides navigation sidebar and header
 */
export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isDark } = useRobustTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-slate-950 border-r border-slate-200 
          dark:border-slate-800 transition-transform lg:translate-x-0 lg:static lg:z-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Sidebar header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
          <Link href="/corporate-version" className="flex items-center gap-2">
            <Image 
              src={isDark ? "/logo-white.png" : "/logo.png"} 
              alt="VeritasVault Logo" 
              width={32} 
              height={32} 
            />
            <span className="font-semibold text-lg text-slate-900 dark:text-white">
              VeritasVault<span className="text-blue-600">.net</span>
            </span>
          </Link>
          <button 
            type="button"
            aria-label="Close sidebar" 
            className="lg:hidden text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            onClick={toggleSidebar}
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Sidebar navigation */}
        <nav className="p-4 space-y-1">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 px-2">
            Main
          </p>
          <Link 
            href="/corporate-version/dashboard" 
            className="flex items-center gap-3 px-3 py-2 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium"
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
          <Link 
            href="/corporate-version/dashboard/analytics" 
            className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
          >
            <BarChart3 size={18} />
            <span>Analytics</span>
          </Link>
          <Link 
            href="/corporate-version/dashboard/portfolio" 
            className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
          >
            <PieChart size={18} />
            <span>Portfolio</span>
          </Link>
          
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 mt-6 px-2">
            Administration
          </p>
          <Link 
            href="/corporate-version/dashboard/team" 
            className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
          >
            <Users size={18} />
            <span>Team</span>
          </Link>
          <Link 
            href="/corporate-version/dashboard/reports" 
            className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
          >
            <FileText size={18} />
            <span>Reports</span>
          </Link>
          <Link 
            href="/corporate-version/dashboard/settings" 
            className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
          >
            <Settings size={18} />
            <span>Settings</span>
          </Link>
          
          <div className="pt-6">
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3 text-red-600 dark:text-red-400 border-slate-200 dark:border-slate-800"
              onClick={() => {  
                  // Clear auth cookies and redirect to login page  
                  document.cookie = 'auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';  
                  document.cookie = 'login_flag=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';  
                  window.location.href = '/login';  
                }}
              >
              <LogOut size={18} />
              <span>Log out</span>
            </Button>
          </div>
        </nav>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center px-4 sticky top-0 z-30">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <button 
                className="lg:hidden mr-4 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                onClick={toggleSidebar}
              >
                <Menu size={20} />
              </button>
              <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="relative">
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                  3
                </span>
              </Button>
              
              <RobustThemeToggle />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatar-placeholder.png" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}