"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { year: "Year 1", value: 0 },
  { year: "Year 2", value: 0 },
  { year: "Year 3", value: 2.5 },
  { year: "Year 4", value: 8.75 },
  { year: "Year 5", value: 22.5 },
]

export default function InvestorROI() {
  return (
    <div className="space-y-4">
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${value}M`, "Projected Return"]} />
            <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border p-3 text-center">
          <p className="text-sm text-muted-foreground">Target Exit</p>
          <p className="text-2xl font-bold">Year 5</p>
          <p className="text-xs text-muted-foreground">Strategic acquisition</p>
        </div>
        <div className="rounded-lg border p-3 text-center">
          <p className="text-sm text-muted-foreground">Projected ROI</p>
          <p className="text-2xl font-bold">9x</p>
          <p className="text-xs text-emerald-500">On seed investment</p>
        </div>
      </div>
    </div>
  )
}
