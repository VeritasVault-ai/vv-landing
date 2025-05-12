"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useVotingWebSocketSimulation } from "@/lib/services/websocket-simulation"
import { CheckCircle, History, Vote } from "lucide-react"
import { useState } from "react"
import { ActiveProposals } from "./active-proposals"
import { VotingHistory } from "./voting-history"
import { VotingOverview } from "./voting-overview"

/**
 * Renders a governance voting dashboard with tabbed navigation for overview, active proposals, and voting history.
 *
 * Displays real-time voting updates and allows users to switch between different views related to protocol governance.
 */
export function DashboardVoting() {
  const [activeTab, setActiveTab] = useState("overview")
  
  // Initialize WebSocket simulation for real-time updates
  useVotingWebSocketSimulation()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Governance Voting</h2>
          <p className="text-slate-600 dark:text-slate-400">Manage protocol governance and voting power</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Vote className="h-4 w-4" />
            <span>Voting Overview</span>
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Active Proposals</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span>Voting History</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <VotingOverview />
        </TabsContent>
        <TabsContent value="active">
          <ActiveProposals />
        </TabsContent>
        <TabsContent value="history">
          <VotingHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}