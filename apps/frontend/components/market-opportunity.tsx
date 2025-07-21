"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const marketSizeData = [
  { year: 2025, value: 24.5 },
  { year: 2024, value: 31.2 },
  { year: 2025, value: 39.7 },
  { year: 2026, value: 50.5 },
  { year: 2027, value: 64.3 },
  { year: 2028, value: 81.9 },
]

const marketShareData = [
  { category: "Automated Market Makers", value: 42 },
  { category: "Lending Protocols", value: 28 },
  { category: "Yield Aggregators", value: 15 },
  { category: "Derivatives", value: 10 },
  { category: "Other DeFi", value: 5 },
]

export default function MarketOpportunity() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Market Opportunity</CardTitle>
        <CardDescription className="max-w-2xl mx-auto">
          Analysis of the DeFi liquidity management market
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-medium mb-2">Market Size & Growth</h3>
          <p className="text-sm text-muted-foreground mb-4">
            The global DeFi liquidity management market is projected to grow at a CAGR of 27.3% from 2025 to 2028.
          </p>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={marketSizeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}B`, "Market Size"]} />
                <Area type="monotone" dataKey="value" stroke="#10b981" fill="#10b98133" name="Market Size" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-medium mb-2">Market Segments</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Breakdown of DeFi liquidity management by protocol type.
            </p>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={marketShareData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="category" type="category" width={100} />
                  <Tooltip formatter={(value) => [`${value}%`, "Market Share"]} />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-medium mb-2">Key Market Drivers</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-emerald-500/20 p-1 mt-0.5">
                  <svg
                    className="h-3 w-3 text-emerald-600"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Growing DeFi TVL</p>
                  <p className="text-sm text-muted-foreground">
                    Total Value Locked in DeFi has grown from $1B in 2020 to over $50B in 2025
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-emerald-500/20 p-1 mt-0.5">
                  <svg
                    className="h-3 w-3 text-emerald-600"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Institutional Adoption</p>
                  <p className="text-sm text-muted-foreground">
                    Increasing institutional capital entering DeFi markets seeking yield
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-emerald-500/20 p-1 mt-0.5">
                  <svg
                    className="h-3 w-3 text-emerald-600"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Protocol Proliferation</p>
                  <p className="text-sm text-muted-foreground">
                    Expanding ecosystem of DeFi protocols creating more opportunities for yield
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-emerald-500/20 p-1 mt-0.5">
                  <svg
                    className="h-3 w-3 text-emerald-600"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">AI Integration</p>
                  <p className="text-sm text-muted-foreground">
                    Growing demand for AI-powered solutions to optimize complex DeFi strategies
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-medium mb-4 text-center">Target Customer Segments</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4 text-center">
              <h4 className="font-medium">Retail Liquidity Providers</h4>
              <p className="text-sm text-muted-foreground mt-2">
                Individual investors seeking to optimize their DeFi yields
              </p>
              <div className="mt-3">
                <p className="text-xs text-muted-foreground">Market Size</p>
                <p className="text-lg font-bold">5.2M</p>
              </div>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <h4 className="font-medium">Protocol Treasuries</h4>
              <p className="text-sm text-muted-foreground mt-2">
                DeFi protocols managing treasury assets for maximum yield
              </p>
              <div className="mt-3">
                <p className="text-xs text-muted-foreground">Market Size</p>
                <p className="text-lg font-bold">$12.5B</p>
              </div>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <h4 className="font-medium">Institutional Investors</h4>
              <p className="text-sm text-muted-foreground mt-2">Funds and institutions entering DeFi markets</p>
              <div className="mt-3">
                <p className="text-xs text-muted-foreground">Market Size</p>
                <p className="text-lg font-bold">$28.3B</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
