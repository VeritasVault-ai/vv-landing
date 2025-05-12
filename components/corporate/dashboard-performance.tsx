"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardPerformance() {
  return (
    <div className="space-y-6">
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
    </div>
  )
}