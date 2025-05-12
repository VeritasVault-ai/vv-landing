"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, AlertTriangle, ArrowUpRight, Download, Calendar, FileText, Shield } from "lucide-react"
import { AllocationChart } from "@/components/allocation-chart"
import { PerformanceChart } from "@/components/performance-chart"
import { trackNavigationEvent } from "@/lib/analytics/track-events"
import { CorporateDashboardHeader } from "./corporate-dashboard-header"
import { CorporatePortfolioSummary } from "./corporate-portfolio-summary"
import { CorporateRiskAssessment } from "./corporate-risk-assessment"
import { CorporateRecentActivity } from "./corporate-recent-activity"
import { CorporateUpcomingEvents } from "./corporate-upcoming-events"
import { CollapsibleSidebar } from "@/components/layout/collapsible-sidebar"

export function CorporateDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    trackNavigationEvent({
      feature_name: "corporate_dashboard_tab",
      tab_destination: value,
    })
  }

  const handleSidebarToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <CollapsibleSidebar onToggle={handleSidebarToggle} />

        {/* Main content */}
        <div className={`flex-1 overflow-auto transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
          <CorporateDashboardHeader />

          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Institutional Dashboard</h1>
                <p className="text-slate-600 dark:text-slate-400">Welcome back, Institutional Treasury Team</p>
              </div>
              <div className="flex gap-3 mt-4 md:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                >
                  <Calendar className="h-4 w-4" />
                  <span>May 1, 2025</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                >
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardHeader className="pb-2">
                  <CardDescription className="text-slate-500 dark:text-slate-400">
                    Total Assets Under Management
                  </CardDescription>
                  <CardTitle className="text-3xl font-bold flex items-center text-slate-900 dark:text-slate-100">
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

              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardHeader className="pb-2">
                  <CardDescription className="text-slate-500 dark:text-slate-400">Current Yield (APY)</CardDescription>
                  <CardTitle className="text-3xl font-bold flex items-center text-slate-900 dark:text-slate-100">
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

              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardHeader className="pb-2">
                  <CardDescription className="text-slate-500 dark:text-slate-400">Risk Assessment</CardDescription>
                  <CardTitle className="text-3xl font-bold flex items-center text-slate-900 dark:text-slate-100">
                    Low-Medium
                    <span className="text-amber-500 dark:text-amber-400 text-sm font-normal ml-2 flex items-center">
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
              <TabsList className="bg-slate-100 dark:bg-slate-800 p-1">
                <TabsTrigger
                  value="overview"
                  className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger
                  value="performance"
                  className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100"
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Performance</span>
                </TabsTrigger>
                <TabsTrigger
                  value="risk"
                  className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100"
                >
                  <Shield className="h-4 w-4" />
                  <span>Risk</span>
                </TabsTrigger>
                <TabsTrigger
                  value="reports"
                  className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100"
                >
                  <FileText className="h-4 w-4" />
                  <span>Reports</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                      <CardHeader>
                        <CardTitle className="text-slate-900 dark:text-slate-100">Portfolio Performance</CardTitle>
                        <CardDescription className="text-slate-500 dark:text-slate-400">
                          30-day historical performance
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="h-80">
                        <PerformanceChart />
                      </CardContent>
                    </Card>
                  </div>
                  <div>
                    <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                      <CardHeader>
                        <CardTitle className="text-slate-900 dark:text-slate-100">Asset Allocation</CardTitle>
                        <CardDescription className="text-slate-500 dark:text-slate-400">
                          Current distribution
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="h-80">
                        <AllocationChart />
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <CorporatePortfolioSummary />
                  </div>
                  <div className="space-y-6">
                    <CorporateRecentActivity />
                    <CorporateUpcomingEvents />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="performance" className="space-y-6">
                <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-slate-900 dark:text-slate-100">Historical Performance</CardTitle>
                    <CardDescription className="text-slate-500 dark:text-slate-400">
                      Portfolio value over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-96">
                    <PerformanceChart />
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-slate-900 dark:text-slate-100">Top Performers</CardTitle>
                      <CardDescription className="text-slate-500 dark:text-slate-400">
                        Assets with highest returns
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="font-medium text-slate-900 dark:text-slate-100">AAVE</div>
                          <div className="text-green-600 dark:text-green-500">+12.4%</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="font-medium text-slate-900 dark:text-slate-100">ETH</div>
                          <div className="text-green-600 dark:text-green-500">+8.7%</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="font-medium text-slate-900 dark:text-slate-100">WBTC</div>
                          <div className="text-green-600 dark:text-green-500">+6.2%</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="font-medium text-slate-900 dark:text-slate-100">MATIC</div>
                          <div className="text-green-600 dark:text-green-500">+5.8%</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="font-medium text-slate-900 dark:text-slate-100">SOL</div>
                          <div className="text-green-600 dark:text-green-500">+4.3%</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-slate-900 dark:text-slate-100">Underperformers</CardTitle>
                      <CardDescription className="text-slate-500 dark:text-slate-400">
                        Assets requiring attention
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="font-medium text-slate-900 dark:text-slate-100">LINK</div>
                          <div className="text-red-600 dark:text-red-500">-2.1%</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="font-medium text-slate-900 dark:text-slate-100">UNI</div>
                          <div className="text-red-600 dark:text-red-500">-1.4%</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="font-medium text-slate-900 dark:text-slate-100">COMP</div>
                          <div className="text-amber-600 dark:text-amber-500">-0.8%</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="font-medium text-slate-900 dark:text-slate-100">SNX</div>
                          <div className="text-amber-600 dark:text-amber-500">-0.5%</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="font-medium text-slate-900 dark:text-slate-100">MKR</div>
                          <div className="text-amber-600 dark:text-amber-500">-0.3%</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="risk" className="space-y-6">
                <CorporateRiskAssessment />
              </TabsContent>

              <TabsContent value="reports" className="space-y-6">
                <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-slate-900 dark:text-slate-100">Available Reports</CardTitle>
                    <CardDescription className="text-slate-500 dark:text-slate-400">
                      Download or schedule reports for your portfolio
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          <div>
                            <div className="font-medium text-slate-900 dark:text-slate-100">
                              Monthly Performance Report
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">April 2025</div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>

                      <div className="flex justify-between items-center p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          <div>
                            <div className="font-medium text-slate-900 dark:text-slate-100">Risk Assessment Report</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">Q2 2025</div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>

                      <div className="flex justify-between items-center p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          <div>
                            <div className="font-medium text-slate-900 dark:text-slate-100">
                              Regulatory Compliance Report
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">Q2 2025</div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>

                      <div className="flex justify-between items-center p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          <div>
                            <div className="font-medium text-slate-900 dark:text-slate-100">Tax Documentation</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">2024 Fiscal Year</div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
