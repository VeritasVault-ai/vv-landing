'use client'

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from '@/components/ui/card';
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from '@/components/ui/tabs';
import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Download,
  TrendingUp,
  Calculator,
  Vote,
} from 'lucide-react';

import { useDashboardMetrics } from '@src/lib/hooks/useDashboardMetrics';
import { DashboardOverview } from '@/components/corporate/dashboard-overview';
import { DashboardPerformance } from '@/components/corporate/dashboard-performance';
import { ModelResults } from '@/components/corporate/model-results';
import { DashboardVoting } from '@/components/corporate/voting';

/**
 * Renders the main corporate dashboard interface with navigation, summary metrics, export functionality, and tabbed detailed views.
 *
 * Displays a sticky header with navigation links and branding, summary cards for portfolio value, active strategies, and risk score, an export report button, and a tabbed section for overview, performance, model results, and governance content.
 */
export function DashboardContent() {
  const { portfolioValue, activeStrategies, riskScore } = useDashboardMetrics();

  const handleTabChange = (value: string) => {
    console.log(`Tab changed to: ${value}`)
    window.location.hash = value
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-900 dark:text-blue-300">
                <span>Veritas</span>
                <span className="text-blue-700 dark:text-blue-400">Vault</span>
                <span className="text-blue-500">.ai</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6 ml-6">
              {[
                { href: '/corporate/dashboard', label: 'Dashboard' },
                { href: '/corporate/portfolio', label: 'Portfolio' },
                { href: '/corporate/strategies', label: 'Strategies' },
                { href: '/corporate/analytics', label: 'Analytics' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`
                    text-sm font-medium
                    ${label === 'Dashboard'
                      ? 'text-blue-700 dark:text-blue-400 border-b-2 border-blue-700 dark:border-blue-400 pb-1'
                      : 'text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors'}
                  `}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <span className="text-blue-700 dark:text-blue-300 font-medium">IT</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Portfolio Value</CardDescription>
              <CardTitle className="text-3xl font-bold flex items-center">
                {portfolioValue.value}
                <span className="text-green-600 dark:text-green-500 text-sm font-normal ml-2 flex items-center">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  {portfolioValue.change}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Updated {portfolioValue.updatedAt}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Strategies</CardDescription>
              <CardTitle className="text-3xl font-bold flex items-center">
                {activeStrategies.value}
                <span className="text-blue-600 dark:text-blue-500 text-sm font-normal ml-2">
                  {activeStrategies.optimized} optimized
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Last updated {activeStrategies.updatedAt}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Risk Score</CardDescription>
              <CardTitle className="text-3xl font-bold flex items-center">
                {riskScore.value}
                <span className="text-green-600 dark:text-green-500 text-sm font-normal ml-2 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  {riskScore.status}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {riskScore.details}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Export button */}
        <div className="flex justify-end">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" onValueChange={handleTabChange} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="models" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Model Results
            </TabsTrigger>
            <TabsTrigger value="voting" className="flex items-center gap-2">
              <Vote className="h-4 w-4" />
              Governance
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
    </>
  );
}
