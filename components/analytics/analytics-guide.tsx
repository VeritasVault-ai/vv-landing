"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ExternalLink, Info, Copy, Check } from "lucide-react"
import { useAnalytics } from "@/hooks/use-analytics"

export function AnalyticsGuide() {
  const { isAnalyticsReady } = useAnalytics()
  const [activeTab, setActiveTab] = useState("setup")
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  if (!isAnalyticsReady) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Google Analytics Reports</CardTitle>
          <CardDescription>Learn how to set up custom reports for your platform</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Google Analytics Not Configured</AlertTitle>
            <AlertDescription>
              To set up custom reports, you need to first configure your Google Analytics Measurement ID in settings.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Google Analytics Custom Reports</CardTitle>
        <CardDescription>
          Learn how to set up custom reports to gain insights into your Tezos Liquidity Management platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="setup" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="setup">Setup Guide</TabsTrigger>
            <TabsTrigger value="reports">Recommended Reports</TabsTrigger>
            <TabsTrigger value="events">Event Reference</TabsTrigger>
          </TabsList>

          <TabsContent value="setup" className="space-y-4">
            <div className="prose max-w-none dark:prose-invert">
              <h3>Setting Up Custom Reports in Google Analytics 4</h3>
              <p>
                Follow these steps to create custom reports that provide insights into how users interact with your
                Tezos Liquidity Management platform.
              </p>

              <ol className="space-y-4">
                <li>
                  <strong>Access Google Analytics:</strong> Log in to your{" "}
                  <a
                    href="https://analytics.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center"
                  >
                    Google Analytics account
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </li>
                <li>
                  <strong>Navigate to Reports:</strong> In the left sidebar, click on "Reports"
                </li>
                <li>
                  <strong>Access Library:</strong> Click on "Library" in the left sidebar
                </li>
                <li>
                  <strong>Create Custom Report:</strong> Click the "Create" button and select "Exploration"
                </li>
                <li>
                  <strong>Configure Report:</strong> Use the interface to drag and drop dimensions and metrics
                </li>
                <li>
                  <strong>Save Report:</strong> Click "Save" in the top-right corner and give your report a name
                </li>
              </ol>

              <div className="mt-6 bg-muted p-4 rounded-md">
                <h4 className="text-lg font-medium mb-2">Pro Tips</h4>
                <ul className="space-y-2">
                  <li>Use segments to compare different user groups (e.g., new vs. returning users)</li>
                  <li>Set up scheduled email exports to receive reports regularly</li>
                  <li>Use comparisons (e.g., this month vs. last month) to track changes in user behavior over time</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="user-journey">
                <AccordionTrigger>User Journey Analysis</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p>
                      Track how users navigate through your platform, from initial landing to strategy creation and
                      execution.
                    </p>
                    <h4 className="font-medium">Configuration Steps:</h4>
                    <ol className="space-y-2 ml-5 list-decimal">
                      <li>Create a new Exploration report</li>
                      <li>Add dimensions: "Page path and screen class" and "Event name" (in the Rows section)</li>
                      <li>Add metrics: "Event count", "Total users", and "Engagement rate"</li>
                      <li>
                        Apply segment: Create a segment for users who completed a strategy creation (event:
                        "strategy_created")
                      </li>
                    </ol>
                    <div className="bg-muted p-3 rounded-md mt-2">
                      <p className="text-sm font-medium">Sample Configuration JSON:</p>
                      <div className="relative mt-2">
                        <pre className="text-xs bg-muted-foreground/10 p-2 rounded overflow-x-auto">
                          {`{
  "dimensions": ["pagePathPlusScreenName", "eventName"],
  "metrics": ["eventCount", "totalUsers", "engagementRate"],
  "segments": ["users::condition::ga4event:strategy_created"]
}`}
                        </pre>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-1 right-1"
                          onClick={() =>
                            copyToClipboard(
                              `{
  "dimensions": ["pagePathPlusScreenName", "eventName"],
  "metrics": ["eventCount", "totalUsers", "engagementRate"],
  "segments": ["users::condition::ga4event:strategy_created"]
}`,
                              "journey",
                            )
                          }
                        >
                          {copied === "journey" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="strategy-performance">
                <AccordionTrigger>Strategy Creation & Performance</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p>
                      Analyze how users create and interact with strategies, including which features are most used and
                      which lead to the best engagement.
                    </p>
                    <h4 className="font-medium">Configuration Steps:</h4>
                    <ol className="space-y-2 ml-5 list-decimal">
                      <li>Create a new Exploration report</li>
                      <li>Add dimensions: "Event name" and "Custom parameter" (select "strategy_type" parameter)</li>
                      <li>Add metrics: "Event count", "Total users", and "User engagement duration"</li>
                      <li>
                        Filter for events: "strategy_created", "strategy_modified", "strategy_executed",
                        "ai_strategy_generated"
                      </li>
                    </ol>
                    <div className="bg-muted p-3 rounded-md mt-2">
                      <p className="text-sm font-medium">Sample Configuration JSON:</p>
                      <div className="relative mt-2">
                        <pre className="text-xs bg-muted-foreground/10 p-2 rounded overflow-x-auto">
                          {`{
  "dimensions": ["eventName", "customParameter:strategy_type"],
  "metrics": ["eventCount", "totalUsers", "userEngagementDuration"],
  "filter": "eventName IN ('strategy_created', 'strategy_modified', 'strategy_executed', 'ai_strategy_generated')"
}`}
                        </pre>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-1 right-1"
                          onClick={() =>
                            copyToClipboard(
                              `{
  "dimensions": ["eventName", "customParameter:strategy_type"],
  "metrics": ["eventCount", "totalUsers", "userEngagementDuration"],
  "filter": "eventName IN ('strategy_created', 'strategy_modified', 'strategy_executed', 'ai_strategy_generated')"
}`,
                              "strategy",
                            )
                          }
                        >
                          {copied === "strategy" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="ai-feature-usage">
                <AccordionTrigger>AI Feature Adoption & Usage</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p>Measure how users are adopting and engaging with AI-powered features in your platform.</p>
                    <h4 className="font-medium">Configuration Steps:</h4>
                    <ol className="space-y-2 ml-5 list-decimal">
                      <li>Create a new Exploration report</li>
                      <li>
                        Add dimensions: "Event name", "Day", and "Custom parameter" (select "ai_feature_type" parameter)
                      </li>
                      <li>Add metrics: "Event count", "Total users", and "Conversions" (if configured)</li>
                      <li>
                        Filter for events containing "ai_" prefix (e.g., "ai_strategy_generated", "ai_risk_assessment")
                      </li>
                    </ol>
                    <div className="bg-muted p-3 rounded-md mt-2">
                      <p className="text-sm font-medium">Sample Configuration JSON:</p>
                      <div className="relative mt-2">
                        <pre className="text-xs bg-muted-foreground/10 p-2 rounded overflow-x-auto">
                          {`{
  "dimensions": ["eventName", "date", "customParameter:ai_feature_type"],
  "metrics": ["eventCount", "totalUsers"],
  "filter": "eventName CONTAINS 'ai_'"
}`}
                        </pre>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-1 right-1"
                          onClick={() =>
                            copyToClipboard(
                              `{
  "dimensions": ["eventName", "date", "customParameter:ai_feature_type"],
  "metrics": ["eventCount", "totalUsers"],
  "filter": "eventName CONTAINS 'ai_'"
}`,
                              "ai",
                            )
                          }
                        >
                          {copied === "ai" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="liquidity-pool-analysis">
                <AccordionTrigger>Liquidity Pool Interaction Analysis</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p>
                      Understand how users interact with different liquidity pools and what factors influence their
                      decisions.
                    </p>
                    <h4 className="font-medium">Configuration Steps:</h4>
                    <ol className="space-y-2 ml-5 list-decimal">
                      <li>Create a new Exploration report</li>
                      <li>
                        Add dimensions: "Event name", "Custom parameter" (select "pool_id" parameter), and "Custom
                        parameter" (select "pool_type" parameter)
                      </li>
                      <li>Add metrics: "Event count", "Total users", and "Engagement rate"</li>
                      <li>Filter for events: "pool_viewed", "pool_selected", "pool_added_to_strategy"</li>
                    </ol>
                    <div className="bg-muted p-3 rounded-md mt-2">
                      <p className="text-sm font-medium">Sample Configuration JSON:</p>
                      <div className="relative mt-2">
                        <pre className="text-xs bg-muted-foreground/10 p-2 rounded overflow-x-auto">
                          {`{
  "dimensions": ["eventName", "customParameter:pool_id", "customParameter:pool_type"],
  "metrics": ["eventCount", "totalUsers", "engagementRate"],
  "filter": "eventName IN ('pool_viewed', 'pool_selected', 'pool_added_to_strategy')"
}`}
                        </pre>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-1 right-1"
                          onClick={() =>
                            copyToClipboard(
                              `{
  "dimensions": ["eventName", "customParameter:pool_id", "customParameter:pool_type"],
  "metrics": ["eventCount", "totalUsers", "engagementRate"],
  "filter": "eventName IN ('pool_viewed', 'pool_selected', 'pool_added_to_strategy')"
}`,
                              "pool",
                            )
                          }
                        >
                          {copied === "pool" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="user-retention">
                <AccordionTrigger>User Retention & Engagement</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p>Track how well your platform retains users and keeps them engaged over time.</p>
                    <h4 className="font-medium">Configuration Steps:</h4>
                    <ol className="space-y-2 ml-5 list-decimal">
                      <li>Create a new Exploration report</li>
                      <li>Add dimensions: "User activity date", "New vs returning", and "Session source / medium"</li>
                      <li>
                        Add metrics: "Active users", "Engagement rate", "Sessions per user", and "Average engagement
                        time"
                      </li>
                      <li>Set date range comparison: "Previous period" or "Previous year"</li>
                    </ol>
                    <div className="bg-muted p-3 rounded-md mt-2">
                      <p className="text-sm font-medium">Sample Configuration JSON:</p>
                      <div className="relative mt-2">
                        <pre className="text-xs bg-muted-foreground/10 p-2 rounded overflow-x-auto">
                          {`{
  "dimensions": ["userActivityDate", "newVsReturning", "sessionSourceMedium"],
  "metrics": ["activeUsers", "engagementRate", "sessionsPerUser", "averageEngagementTime"],
  "dateRanges": [
    {"startDate": "30daysAgo", "endDate": "yesterday"},
    {"startDate": "60daysAgo", "endDate": "31daysAgo"}
  ]
}`}
                        </pre>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-1 right-1"
                          onClick={() =>
                            copyToClipboard(
                              `{
  "dimensions": ["userActivityDate", "newVsReturning", "sessionSourceMedium"],
  "metrics": ["activeUsers", "engagementRate", "sessionsPerUser", "averageEngagementTime"],
  "dateRanges": [
    {"startDate": "30daysAgo", "endDate": "yesterday"},
    {"startDate": "60daysAgo", "endDate": "31daysAgo"}
  ]
}`,
                              "retention",
                            )
                          }
                        >
                          {copied === "retention" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <div className="prose max-w-none dark:prose-invert">
              <h3>Event Reference</h3>
              <p>
                Your platform tracks the following events. Use these event names when creating custom reports and
                segments.
              </p>

              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Event Name
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Parameters
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-4 py-2 text-sm">Authentication</td>
                      <td className="px-4 py-2 text-sm font-mono">login</td>
                      <td className="px-4 py-2 text-sm">User login</td>
                      <td className="px-4 py-2 text-sm font-mono">method, status</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm">Authentication</td>
                      <td className="px-4 py-2 text-sm font-mono">register</td>
                      <td className="px-4 py-2 text-sm">User registration</td>
                      <td className="px-4 py-2 text-sm font-mono">method, status</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm">Strategy</td>
                      <td className="px-4 py-2 text-sm font-mono">strategy_created</td>
                      <td className="px-4 py-2 text-sm">New strategy created</td>
                      <td className="px-4 py-2 text-sm font-mono">strategy_type, risk_level</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm">Strategy</td>
                      <td className="px-4 py-2 text-sm font-mono">strategy_modified</td>
                      <td className="px-4 py-2 text-sm">Strategy modified</td>
                      <td className="px-4 py-2 text-sm font-mono">strategy_id, strategy_type</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm">Strategy</td>
                      <td className="px-4 py-2 text-sm font-mono">strategy_executed</td>
                      <td className="px-4 py-2 text-sm">Strategy executed</td>
                      <td className="px-4 py-2 text-sm font-mono">strategy_id, amount</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm">AI</td>
                      <td className="px-4 py-2 text-sm font-mono">ai_strategy_generated</td>
                      <td className="px-4 py-2 text-sm">AI generated a strategy</td>
                      <td className="px-4 py-2 text-sm font-mono">strategy_type, parameters</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm">AI</td>
                      <td className="px-4 py-2 text-sm font-mono">ai_risk_assessment</td>
                      <td className="px-4 py-2 text-sm">AI risk assessment used</td>
                      <td className="px-4 py-2 text-sm font-mono">strategy_id, risk_score</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm">Pools</td>
                      <td className="px-4 py-2 text-sm font-mono">pool_viewed</td>
                      <td className="px-4 py-2 text-sm">Pool details viewed</td>
                      <td className="px-4 py-2 text-sm font-mono">pool_id, pool_type</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm">Pools</td>
                      <td className="px-4 py-2 text-sm font-mono">pool_selected</td>
                      <td className="px-4 py-2 text-sm">Pool selected</td>
                      <td className="px-4 py-2 text-sm font-mono">pool_id, pool_type</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm">Pools</td>
                      <td className="px-4 py-2 text-sm font-mono">pool_added_to_strategy</td>
                      <td className="px-4 py-2 text-sm">Pool added to strategy</td>
                      <td className="px-4 py-2 text-sm font-mono">pool_id, strategy_id</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm">Flash Loans</td>
                      <td className="px-4 py-2 text-sm font-mono">flash_loan_simulated</td>
                      <td className="px-4 py-2 text-sm">Flash loan simulation</td>
                      <td className="px-4 py-2 text-sm font-mono">amount, protocol</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm">Bridge</td>
                      <td className="px-4 py-2 text-sm font-mono">bridge_initiated</td>
                      <td className="px-4 py-2 text-sm">Multi-chain bridge initiated</td>
                      <td className="px-4 py-2 text-sm font-mono">from_chain, to_chain, amount</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col items-start text-sm text-muted-foreground">
        <p>
          For more advanced reporting capabilities, consider using the{" "}
          <a
            href="https://developers.google.com/analytics/devguides/reporting/data/v1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline inline-flex items-center"
          >
            Google Analytics Data API
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </p>
      </CardFooter>
    </Card>
  )
}
