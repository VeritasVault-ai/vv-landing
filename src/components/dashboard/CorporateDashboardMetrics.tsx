'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, AlertTriangle } from "lucide-react"

/**
 * Renders a responsive grid of key corporate dashboard metrics, including total assets under management, current yield, and risk assessment.
 *
 * @remarks
 * All metric values and labels are static and do not reflect dynamic or real-time data.
 */
export function CorporateDashboardMetrics() {
  return (
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
  )
}