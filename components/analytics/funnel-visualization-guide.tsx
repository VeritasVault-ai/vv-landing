"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Check, Copy, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function FunnelVisualizationGuide() {
  const { toast } = useToast()
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    toast({
      title: "Copied to clipboard",
      description: "The configuration has been copied to your clipboard.",
    })
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="prose max-w-none dark:prose-invert">
        <h2>Creating Visual Funnel Reports in Google Analytics 4</h2>
        <p>
          Funnel visualizations help you understand how users progress through multi-step processes in your application.
          Follow this guide to create effective funnel reports for your Tezos Liquidity Management platform.
        </p>
      </div>

      <Tabs defaultValue="auth-funnel">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="auth-funnel">Authentication Funnel</TabsTrigger>
          <TabsTrigger value="strategy-funnel">Strategy Creation Funnel</TabsTrigger>
          <TabsTrigger value="custom-funnel">Custom Funnel</TabsTrigger>
        </TabsList>

        <TabsContent value="auth-funnel" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Funnel</CardTitle>
              <CardDescription>
                Track how users move through the authentication process, from login attempt to successful dashboard
                access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md border">
                <div className="bg-muted px-4 py-3 font-medium border-b">Step 1: Access Exploration</div>
                <div className="p-4 space-y-4">
                  <p>
                    In Google Analytics 4, navigate to the <strong>Explore</strong> section from the left sidebar menu.
                    Then click on <strong>Create new exploration</strong>.
                  </p>
                  <div className="relative h-64 w-full rounded-md overflow-hidden border">
                    <Image
                      src="/google-analytics-4-explore.png"
                      alt="Google Analytics 4 Explore Section"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="bg-muted px-4 py-3 font-medium border-b">Step 2: Select Funnel Technique</div>
                <div className="p-4 space-y-4">
                  <p>
                    In the template gallery, select <strong>Funnel exploration</strong> from the available techniques.
                  </p>
                  <div className="relative h-64 w-full rounded-md overflow-hidden border">
                    <Image
                      src="/google-analytics-4-funnel-exploration.png"
                      alt="Google Analytics 4 Funnel Exploration Template"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="bg-muted px-4 py-3 font-medium border-b">Step 3: Configure Authentication Funnel</div>
                <div className="p-4 space-y-4">
                  <p>Configure your funnel with the following steps:</p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>
                      <strong>Step 1:</strong> Event name = <code>page_view</code>, Page path = <code>/auth/login</code>
                    </li>
                    <li>
                      <strong>Step 2:</strong> Event name = <code>login_attempt</code>
                    </li>
                    <li>
                      <strong>Step 3:</strong> Event name = <code>login_success</code>
                    </li>
                    <li>
                      <strong>Step 4:</strong> Event name = <code>page_view</code>, Page path = <code>/dashboard</code>
                    </li>
                  </ol>
                  <div className="relative h-64 w-full rounded-md overflow-hidden border">
                    <Image
                      src="/ga4-authentication-funnel.png"
                      alt="Google Analytics 4 Authentication Funnel Configuration"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="bg-muted px-4 py-3 font-medium border-b">Step 4: Add Segments (Optional)</div>
                <div className="p-4 space-y-4">
                  <p>
                    Add segments to compare different user groups, such as new vs. returning users or different
                    authentication methods.
                  </p>
                  <div className="relative h-64 w-full rounded-md overflow-hidden border">
                    <Image
                      src="/google-analytics-4-funnel-segments.png"
                      alt="Google Analytics 4 Funnel Segments"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="bg-muted px-4 py-3 font-medium border-b">Step 5: Save and Share</div>
                <div className="p-4 space-y-4">
                  <p>
                    Name your report (e.g., "Authentication Funnel Analysis"), save it, and share it with your team
                    members.
                  </p>
                  <div className="relative h-64 w-full rounded-md overflow-hidden border">
                    <Image
                      src="/google-analytics-4-save-share.png"
                      alt="Google Analytics 4 Save and Share Report"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() =>
                  copyToClipboard(
                    `Authentication Funnel Configuration:
1. Step 1: Event name = page_view, Page path = /auth/login
2. Step 2: Event name = login_attempt
3. Step 3: Event name = login_success
4. Step 4: Event name = page_view, Page path = /dashboard`,
                    "auth-funnel",
                  )
                }
              >
                {copied === "auth-funnel" ? (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Copied Configuration
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" /> Copy Configuration
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="strategy-funnel" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Strategy Creation Funnel</CardTitle>
              <CardDescription>
                Track how users progress through the strategy creation process in your platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md border">
                <div className="bg-muted px-4 py-3 font-medium border-b">Step 1: Access Exploration</div>
                <div className="p-4 space-y-4">
                  <p>
                    In Google Analytics 4, navigate to the <strong>Explore</strong> section from the left sidebar menu.
                    Then click on <strong>Create new exploration</strong>.
                  </p>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="bg-muted px-4 py-3 font-medium border-b">Step 2: Select Funnel Technique</div>
                <div className="p-4 space-y-4">
                  <p>
                    In the template gallery, select <strong>Funnel exploration</strong> from the available techniques.
                  </p>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="bg-muted px-4 py-3 font-medium border-b">
                  Step 3: Configure Strategy Creation Funnel
                </div>
                <div className="p-4 space-y-4">
                  <p>Configure your funnel with the following steps:</p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>
                      <strong>Step 1:</strong> Event name = <code>page_view</code>, Page path = <code>/strategies</code>
                    </li>
                    <li>
                      <strong>Step 2:</strong> Event name = <code>create_strategy</code>
                    </li>
                    <li>
                      <strong>Step 3:</strong> Event name = <code>adjust_allocation</code>
                    </li>
                    <li>
                      <strong>Step 4:</strong> Event name = <code>adjust_risk_tolerance</code>
                    </li>
                    <li>
                      <strong>Step 5:</strong> Event name = <code>save_strategy</code>
                    </li>
                  </ol>
                  <div className="relative h-64 w-full rounded-md overflow-hidden border">
                    <Image
                      src="/ga4-strategy-funnel.png"
                      alt="Google Analytics 4 Strategy Creation Funnel Configuration"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="bg-muted px-4 py-3 font-medium border-b">Step 4: Add Segments (Optional)</div>
                <div className="p-4 space-y-4">
                  <p>
                    Add segments to compare different user groups, such as new vs. experienced users or users with
                    different risk profiles.
                  </p>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="bg-muted px-4 py-3 font-medium border-b">Step 5: Save and Share</div>
                <div className="p-4 space-y-4">
                  <p>
                    Name your report (e.g., "Strategy Creation Funnel Analysis"), save it, and share it with your team
                    members.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() =>
                  copyToClipboard(
                    `Strategy Creation Funnel Configuration:
1. Step 1: Event name = page_view, Page path = /strategies
2. Step 2: Event name = create_strategy
3. Step 3: Event name = adjust_allocation
4. Step 4: Event name = adjust_risk_tolerance
5. Step 5: Event name = save_strategy`,
                    "strategy-funnel",
                  )
                }
              >
                {copied === "strategy-funnel" ? (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Copied Configuration
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" /> Copy Configuration
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="custom-funnel" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Funnel Creation</CardTitle>
              <CardDescription>Create your own custom funnel based on your specific business needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md border">
                <div className="bg-muted px-4 py-3 font-medium border-b">Step 1: Define Your Funnel Goals</div>
                <div className="p-4 space-y-4">
                  <p>Before creating a custom funnel, clearly define:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>The specific user journey you want to analyze</li>
                    <li>The key steps users should take</li>
                    <li>The desired outcome or conversion point</li>
                    <li>The metrics that matter most for this journey</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="bg-muted px-4 py-3 font-medium border-b">Step 2: Ensure Event Tracking</div>
                <div className="p-4 space-y-4">
                  <p>
                    Make sure all necessary events are being tracked in your application. For each step in your funnel,
                    you need a corresponding event in Google Analytics.
                  </p>
                  <div className="bg-muted p-4 rounded-md">
                    <p className="font-mono text-sm">
                      // Example of tracking a custom event
                      <br />
                      window.gtag(&apos;event&apos;, &apos;custom_action_name&apos;, {"{"}
                      <br />
                      &nbsp;&nbsp;step_name: &apos;Step Description&apos;,
                      <br />
                      &nbsp;&nbsp;category: &apos;Category Name&apos;,
                      <br />
                      &nbsp;&nbsp;value: optionalNumericValue
                      <br />
                      {"}"});
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="bg-muted px-4 py-3 font-medium border-b">Step 3: Create Custom Funnel in GA4</div>
                <div className="p-4 space-y-4">
                  <p>Follow these steps to create your custom funnel:</p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Navigate to Explore &rarr; Create new exploration</li>
                    <li>Select &quot;Funnel exploration&quot; technique</li>
                    <li>Add your custom events as steps in the funnel</li>
                    <li>Configure any additional parameters or conditions for each step</li>
                    <li>Add segments if needed for comparative analysis</li>
                  </ol>
                  <div className="relative h-64 w-full rounded-md overflow-hidden border">
                    <Image
                      src="/ga4-custom-funnel.png"
                      alt="Google Analytics 4 Custom Funnel Creation"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="bg-muted px-4 py-3 font-medium border-b">Step 4: Analyze and Optimize</div>
                <div className="p-4 space-y-4">
                  <p>Once your funnel is set up, focus on these key metrics:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Conversion rate:</strong> Percentage of users who complete the entire funnel
                    </li>
                    <li>
                      <strong>Drop-off points:</strong> Steps where users abandon the process
                    </li>
                    <li>
                      <strong>Time to convert:</strong> How long it takes users to move through the funnel
                    </li>
                    <li>
                      <strong>Segment comparison:</strong> How different user groups perform in the funnel
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open("https://analytics.google.com/", "_blank")}
              >
                <ExternalLink className="mr-2 h-4 w-4" /> Open Google Analytics
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Interpreting Funnel Visualizations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Identifying Drop-off Points</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Look for steps with significant drop-offs (&gt;20%). These represent friction points in your user
                journey that need optimization. Common issues include:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Complex form fields or validation errors</li>
                <li>Unclear instructions or next steps</li>
                <li>Performance issues or slow loading times</li>
                <li>Trust concerns or missing information</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comparing Segments</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Compare how different user segments move through your funnels:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>New vs. returning users</li>
                <li>Desktop vs. mobile users</li>
                <li>Different traffic sources</li>
                <li>Users with different experience levels</li>
              </ul>
              <p className="mt-2">
                Significant differences between segments can reveal optimization opportunities for specific user groups.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tracking Improvements</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                After making changes to your user journey, use funnel comparisons over time to measure the impact of
                your optimizations:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Compare funnel performance before and after changes</li>
                <li>Look for improvements in overall conversion rate</li>
                <li>Check if specific drop-off points have improved</li>
                <li>Monitor changes in time to conversion</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Taking Action</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Based on funnel insights, consider these optimization strategies:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Simplify steps with high drop-off rates</li>
                <li>Add clearer instructions or progress indicators</li>
                <li>Implement A/B testing for critical funnel steps</li>
                <li>Create targeted experiences for different user segments</li>
                <li>Add re-engagement campaigns for users who abandon funnels</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />

      <div className="prose max-w-none dark:prose-invert">
        <h3>Additional Resources</h3>
        <ul>
          <li>
            <a
              href="https://support.google.com/analytics/answer/9327974"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              Google Analytics 4: Funnel Exploration Documentation
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </li>
          <li>
            <a
              href="https://support.google.com/analytics/answer/9143382"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              Google Analytics 4: Custom Events
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </li>
          <li>
            <a
              href="https://support.google.com/analytics/answer/9304153"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              Google Analytics 4: User Properties and Segments
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
