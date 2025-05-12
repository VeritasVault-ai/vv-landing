"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, ArrowUpRight, BarChart3, Download, TrendingUp, Calculator, Vote } from "lucide-react"
import { DashboardOverview } from "@/components/corporate/dashboard-overview"
import { DashboardPerformance } from "@/components/corporate/dashboard-performance"
import { ModelResults } from "@/components/corporate/model-results"
import { DashboardVoting } from "@/components/corporate/voting"

export function DashboardContent() {
  const handleTabChange = (value: string) => {
    // You can add analytics tracking here if needed
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-900 dark:text-blue-300">
                <span>Veritas</span>
                <span className="text-blue-700 dark:text-blue-400">Vault</span>
                <span className="text-blue-500">.ai</span>
              </span>
            </a>

            <div className="hidden md:flex items-center gap-6 ml-6">
              <a
                href="/corporate/dashboard"
                className="text-sm font-medium text-blue-700 dark:text-blue-400 border-b-2 border-blue-700 dark:border-blue-400 pb-1"
              >
                Dashboard
              </a>
              <a
                href="/corporate/portfolio"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
              >
                Portfolio
              </a>
              <a
                href="/corporate/strategies"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
              >
                Strategies
              </a>
              <a
                href="/corporate/analytics"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
              >
                Analytics
              </a>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <span className="text-blue-700 dark:text-blue-300 font-medium">IT</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Corporate Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-400">Portfolio overview and performance metrics</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Portfolio Value</CardDescription>
              <CardTitle className="text-3xl font-bold flex items-center">
                $12.4M
                <span className="text-green-600 dark:text-green-500 text-sm font-normal ml-2 flex items-center">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  2.4%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 dark:text-slate-400">Updated 10 minutes ago</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Strategies</CardDescription>
              <CardTitle className="text-3xl font-bold flex items-center">
                7
                <span className="text-blue-600 dark:text-blue-500 text-sm font-normal ml-2">
                  3 optimized
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 dark:text-slate-400">Last updated today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Risk Score</CardDescription>
              <CardTitle className="text-3xl font-bold flex items-center">
                Low
                <span className="text-green-600 dark:text-green-500 text-sm font-normal ml-2 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Optimal
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 dark:text-slate-400">Within institutional parameters</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6" onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>Performance</span>
            </TabsTrigger>
            <TabsTrigger value="models" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              <span>Model Results</span>
            </TabsTrigger>
            <TabsTrigger value="voting" className="flex items-center gap-2">
              <Vote className="h-4 w-4" />
              <span>Governance</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="performance">
            <DashboardPerformance />
          </TabsContent>

          <TabsContent value="models">
            <ModelResults />
          </TabsContent>
          
          <TabsContent value="voting">
            <DashboardVoting />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-slate-600 dark:text-slate-400">
            &copy; 2025 VeritasVault.ai. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}