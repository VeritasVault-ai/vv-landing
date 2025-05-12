"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PastProposal } from "@/lib/repositories/voting-repository"
import { votingService } from "@/lib/services/voting-service"
import { votingEvents } from "@/lib/events/voting-events"

export function VotingHistory() {
  const [pastProposals, setPastProposals] = useState<PastProposal[]>([])
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const proposals = await votingService.getPastProposals()
        setPastProposals(proposals)
      } catch (err) {
        console.error('Error fetching past proposals:', err)
        setError('Failed to load voting history. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Subscribe to proposal-closed events to update the history in real-time
    const unsubscribe = votingEvents.subscribe('proposal-closed', ({ pastProposal }) => {
      setPastProposals(prevProposals => [pastProposal, ...prevProposals])
    })

    // Cleanup subscription when component unmounts
    return () => unsubscribe()
  }, [])
  
  const filteredProposals = filter === "all" 
    ? pastProposals 
    : pastProposals.filter(proposal => 
        filter === "participated" 
          ? proposal.yourVote !== null 
          : proposal.category === filter
      )

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2 text-slate-600 dark:text-slate-400">Loading voting history...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-md">
        <p className="text-red-800 dark:text-red-200">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" onValueChange={setFilter}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Proposals</TabsTrigger>
          <TabsTrigger value="participated">Participated</TabsTrigger>
          <TabsTrigger value="treasury">Treasury</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Past Proposals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-300">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Title</th>
                  <th className="text-center py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Result</th>
                  <th className="text-center py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Your Vote</th>
                  <th className="text-center py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Category</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredProposals.map((proposal) => (
                  <tr key={proposal.id} className="border-b border-slate-100 dark:border-slate-800">
                    <td className="py-3 px-4 font-mono text-sm">{proposal.id}</td>
                    <td className="py-3 px-4">{proposal.title}</td>
                    <td className="py-3 px-4 text-center">
                      {proposal.result === "passed" ? (
                        <Badge variant="success" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Passed
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                          Failed
                        </Badge>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {proposal.yourVote === "for" ? (
                        <span className="inline-flex items-center text-green-600 dark:text-green-500">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          For
                        </span>
                      ) : proposal.yourVote === "against" ? (
                        <span className="inline-flex items-center text-red-600 dark:text-red-500">
                          <XCircle className="h-4 w-4 mr-1" />
                          Against
                        </span>
                      ) : (
                        <span className="text-slate-400">Did not vote</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant="outline" className="capitalize">
                        {proposal.category}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">{proposal.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredProposals.length === 0 && (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
              No proposals found matching the selected filter.
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Voting Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <div className="text-sm text-slate-500 dark:text-slate-400">Total Proposals</div>
              <div className="text-2xl font-bold mt-1">{pastProposals.length}</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <div className="text-sm text-slate-500 dark:text-slate-400">Participated</div>
              <div className="text-2xl font-bold mt-1">
                {pastProposals.filter(p => p.yourVote !== null).length}
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <div className="text-sm text-slate-500 dark:text-slate-400">Voted With Majority</div>
              <div className="text-2xl font-bold mt-1">
                {pastProposals.filter(p => 
                  (p.result === "passed" && p.yourVote === "for") || 
                  (p.result === "failed" && p.yourVote === "against")
                ).length}
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <div className="text-sm text-slate-500 dark:text-slate-400">Participation Rate</div>
              <div className="text-2xl font-bold mt-1">
                {pastProposals.length > 0 
                  ? Math.round((pastProposals.filter(p => p.yourVote !== null).length / pastProposals.length) * 100)
                  : 0}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}