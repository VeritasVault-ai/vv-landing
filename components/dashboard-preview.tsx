"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

const poolData = [
  { name: "Tezos AMM 1", apy: 12.4, tvl: 2.4, risk: "Low" },
  { name: "Etherlink DEX", apy: 18.7, tvl: 1.8, risk: "Medium" },
  { name: "Tezos Stable", apy: 8.2, tvl: 3.6, risk: "Low" },
  { name: "Etherlink Farm", apy: 24.5, tvl: 1.2, risk: "High" },
]

const performanceData = [
  { name: "Jan", returns: 4.2 },
  { name: "Feb", returns: 5.1 },
  { name: "Mar", returns: 3.8 },
  { name: "Apr", returns: 6.2 },
  { name: "May", returns: 5.7 },
  { name: "Jun", returns: 7.3 },
]

const allocationData = [
  { name: "Tezos AMM 1", value: 35 },
  { name: "Etherlink DEX", value: 25 },
  { name: "Tezos Stable", value: 30 },
  { name: "Etherlink Farm", value: 10 },
]

const COLORS = ["#10b981", "#3b82f6", "#6366f1", "#8b5cf6"]

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="w-full overflow-hidden rounded-lg border bg-background">
      <div className="flex flex-col">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <div className="text-lg font-semibold">Liquidity Dashboard</div>
          <Tabs defaultValue="overview" className="w-auto" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="pools">Pools</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="p-0">
          <Image
            src="/dashboard-preview.png"
            alt="Dashboard Preview"
            width={600}
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </div>
  )
}
