'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PerformanceChart } from "@/components/performance-chart"

/**
 * Content for the Performance tab in the corporate dashboard
 */
export function CorporatePerformanceTab() {
  return (
    <div className="space-y-6">
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
    </div>
  )
}