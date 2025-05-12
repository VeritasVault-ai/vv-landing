"use client"

import { AllocationChart } from "@/components/allocation-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardOverview() {
  return (
    <div className="space-y-6">
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
                  <td className="text-right py-3 px-4">$4,450,000</td>
                  <td className="text-right py-3 px-4">35.9%</td>
                  <td className="text-right py-3 px-4">4.2%</td>
                  <td className="text-right py-3 px-4">
                    <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-2 py-1 rounded-full">
                      Low
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-3 px-4">ETH</td>
                  <td className="text-right py-3 px-4">$2,750,000</td>
                  <td className="text-right py-3 px-4">22.2%</td>
                  <td className="text-right py-3 px-4">3.8%</td>
                  <td className="text-right py-3 px-4">
                    <span className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 text-xs px-2 py-1 rounded-full">
                      Medium
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-3 px-4">WBTC</td>
                  <td className="text-right py-3 px-4">$2,320,000</td>
                  <td className="text-right py-3 px-4">18.7%</td>
                  <td className="text-right py-3 px-4">2.1%</td>
                  <td className="text-right py-3 px-4">
                    <span className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 text-xs px-2 py-1 rounded-full">
                      Medium
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-3 px-4">DAI</td>
                  <td className="text-right py-3 px-4">$1,880,000</td>
                  <td className="text-right py-3 px-4">15.2%</td>
                  <td className="text-right py-3 px-4">4.5%</td>
                  <td className="text-right py-3 px-4">
                    <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-2 py-1 rounded-full">
                      Low
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-3 px-4">AAVE</td>
                  <td className="text-right py-3 px-4">$1,000,000</td>
                  <td className="text-right py-3 px-4">8.0%</td>
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
    </div>
  )
}