"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DemoModeBanner } from "@/components/demo-mode/banner"
import { trackNavigationEvent } from "@/lib/analytics/track-events"
import { AllocationChart } from "@/components/allocation-chart"
import { BarChart3, TrendingUp, AlertTriangle, ArrowUpRight, Download } from "lucide-react"

export function CorporateDemoDashboard() {
  const [isExitModalOpen, setIsExitModalOpen] = useState(false)

  const handleExitDemo = () => {
    trackNavigationEvent({
      feature_name: "corporate_demo_exit",
      tab_destination: "corporate_main",
    })
    window.location.href = "/corporate-version"
  }

  const handleTabChange = (value: string) => {
    trackNavigationEvent({
      feature_name: "corporate_demo_dashboard_tab",
      tab_destination: value,
    })
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <DemoModeBanner onExit={() => setIsExitModalOpen(true)} />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Institutional Treasury Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">Simulated portfolio with $100M in assets</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Assets Under Management</CardDescription>
            <CardTitle className="text-3xl font-bold flex items-center">
              $100,245,890
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
            <CardDescription>Current Yield (APY)</CardDescription>
            <CardTitle className="text-3xl font-bold flex items-center">
              5.82%
              <span className="text-green-600 dark:text-green-500 text-sm font-normal ml-2 flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                0.3%
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500 dark:text-slate-400">Blended rate across all positions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Risk Assessment</CardDescription>
            <CardTitle className="text-3xl font-bold flex items-center">
              Low-Medium
              <span className="text-amber-500 text-sm font-normal ml-2 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1" />
                Review
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500 dark:text-slate-400">2 positions require attention</p>
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
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>Current distribution across asset classes</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <AllocationChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Exposure</CardTitle>
                <CardDescription>Distribution by risk category</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <AllocationChart />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Holdings</CardTitle>
              <CardDescription>Largest positions by value</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Asset</th>
                      <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Value</th>
                      <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-300">
                        Allocation
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Yield</th>
                      <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-300">
                        Risk Score
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-3 px-4">USDC</td>
                      <td className="text-right py-3 px-4">$32,450,000</td>
                      <td className="text-right py-3 px-4">32.4%</td>
                      <td className="text-right py-3 px-4">4.2%</td>
                      <td className="text-right py-3 px-4">
                        <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-2 py-1 rounded-full">
                          Low
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-3 px-4">ETH</td>
                      <td className="text-right py-3 px-4">$18,750,000</td>
                      <td className="text-right py-3 px-4">18.7%</td>
                      <td className="text-right py-3 px-4">3.8%</td>
                      <td className="text-right py-3 px-4">
                        <span className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 text-xs px-2 py-1 rounded-full">
                          Medium
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-3 px-4">WBTC</td>
                      <td className="text-right py-3 px-4">$15,320,000</td>
                      <td className="text-right py-3 px-4">15.3%</td>
                      <td className="text-right py-3 px-4">2.1%</td>
                      <td className="text-right py-3 px-4">
                        <span className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 text-xs px-2 py-1 rounded-full">
                          Medium
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-3 px-4">DAI</td>
                      <td className="text-right py-3 px-4">$12,500,000</td>
                      <td className="text-right py-3 px-4">12.5%</td>
                      <td className="text-right py-3 px-4">4.5%</td>
                      <td className="text-right py-3 px-4">
                        <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-2 py-1 rounded-full">
                          Low
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-3 px-4">AAVE</td>
                      <td className="text-right py-3 px-4">$8,750,000</td>
                      <td className="text-right py-3 px-4">8.7%</td>
                      <td className="text-right py-3 px-4">6.2%</td>
                      <td className="text-right py-3 px-4">
                        <span className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs px-2 py-1 rounded-full">
                          High
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historical Performance</CardTitle>
              <CardDescription>Portfolio value over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex items-center justify-center h-full text-slate-500 dark:text-slate-400">
                Performance chart would be displayed here
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Assets with highest returns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">AAVE</div>
                    <div className="text-green-600 dark:text-green-500">+12.4%</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-medium">ETH</div>
                    <div className="text-green-600 dark:text-green-500">+8.7%</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-medium">WBTC</div>
                    <div className="text-green-600 dark:text-green-500">+6.2%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Underperformers</CardTitle>
                <CardDescription>Assets requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">LINK</div>
                    <div className="text-red-600 dark:text-red-500">-2.1%</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-medium">UNI</div>
                    <div className="text-red-600 dark:text-red-500">-1.4%</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-medium">COMP</div>
                    <div className="text-amber-600 dark:text-amber-500">-0.8%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
