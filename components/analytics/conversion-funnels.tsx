"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useAnalytics } from "@/hooks/use-analytics"
import { ArrowRight, Copy, Check, ExternalLink, Plus, Trash, Save } from "lucide-react"
import { AnalyticsEvents } from "@/lib/analytics/event-constants"

// Predefined funnel templates
const FUNNEL_TEMPLATES = [
  {
    id: "strategy-creation",
    name: "Strategy Creation Funnel",
    description: "Track user progression through the strategy creation workflow",
    steps: [
      { name: "View Strategy Page", event: "page_view", params: { page_path: "/strategies" } },
      { name: "Start Strategy Creation", event: AnalyticsEvents.STRATEGY.CREATE, params: {} },
      { name: "Configure Strategy", event: AnalyticsEvents.STRATEGY.ADJUST_ALLOCATION, params: {} },
      { name: "Save Strategy", event: AnalyticsEvents.STRATEGY.SAVE, params: {} },
    ],
  },
  {
    id: "ai-adoption",
    name: "AI Feature Adoption Funnel",
    description: "Track user adoption of AI-powered features",
    steps: [
      { name: "View AI Features", event: "page_view", params: { page_path: "/ai-features" } },
      { name: "Generate AI Strategy", event: AnalyticsEvents.AI.GENERATE_STRATEGY, params: {} },
      { name: "Review AI Strategy", event: "ai_strategy_reviewed", params: {} },
      { name: "Save AI Strategy", event: AnalyticsEvents.AI.SAVE_STRATEGY, params: {} },
    ],
  },
  {
    id: "user-onboarding",
    name: "User Onboarding Funnel",
    description: "Track new user progression through the onboarding process",
    steps: [
      { name: "Registration", event: AnalyticsEvents.AUTH.REGISTER, params: {} },
      { name: "Complete Profile", event: "profile_completed", params: {} },
      { name: "View Dashboard", event: "page_view", params: { page_path: "/dashboard" } },
      { name: "First Strategy Creation", event: AnalyticsEvents.STRATEGY.CREATE, params: {} },
    ],
  },
  {
    id: "flash-loan",
    name: "Flash Loan Execution Funnel",
    description: "Track user progression through flash loan execution",
    steps: [
      { name: "View Flash Loans", event: "page_view", params: { page_path: "/flash-loans" } },
      { name: "Configure Flash Loan", event: "flash_loan_configured", params: {} },
      { name: "Simulate Flash Loan", event: "flash_loan_simulated", params: {} },
      { name: "Execute Flash Loan", event: "flash_loan_executed", params: {} },
    ],
  },
]

export function ConversionFunnels() {
  const { isAnalyticsReady } = useAnalytics()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("templates")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [customFunnel, setCustomFunnel] = useState({
    name: "",
    description: "",
    steps: [{ name: "", event: "", params: {} }],
  })
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const addStep = () => {
    setCustomFunnel({
      ...customFunnel,
      steps: [...customFunnel.steps, { name: "", event: "", params: {} }],
    })
  }

  const removeStep = (index: number) => {
    const newSteps = [...customFunnel.steps]
    newSteps.splice(index, 1)
    setCustomFunnel({
      ...customFunnel,
      steps: newSteps,
    })
  }

  const updateStep = (index: number, field: string, value: string) => {
    const newSteps = [...customFunnel.steps]
    newSteps[index] = { ...newSteps[index], [field]: value }
    setCustomFunnel({
      ...customFunnel,
      steps: newSteps,
    })
  }

  const saveFunnel = () => {
    // In a real implementation, this would save to a database
    toast({
      title: "Funnel Saved",
      description: "Your conversion funnel has been saved successfully.",
    })
  }

  const getSelectedTemplate = () => {
    return FUNNEL_TEMPLATES.find((template) => template.id === selectedTemplate)
  }

  const generateGACode = (funnel: any) => {
    const steps = funnel.steps.map((step: any, index: number) => {
      return `  {
    name: "${step.name}",
    event_name: "${step.event}",
    ${Object.keys(step.params).length > 0 ? `parameters: ${JSON.stringify(step.params)},` : ""}
  }${index < funnel.steps.length - 1 ? "," : ""}`
    })

    return `// Google Analytics 4 Funnel Configuration
const ${funnel.name.replace(/\s+/g, "_").toLowerCase()}_funnel = {
  name: "${funnel.name}",
  steps: [
${steps.join("\n")}
  ]
};

// To implement this funnel in Google Analytics:
// 1. Go to Admin > Custom Definitions > Create custom dimension
// 2. Name it "funnel_step" with scope "Event"
// 3. Create a new exploration report
// 4. Add dimension "funnel_step" and metric "event_count"
// 5. Use the funnel visualization type`
  }

  if (!isAnalyticsReady) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Conversion Funnels</CardTitle>
          <CardDescription>Track user progression through important workflows</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 dark:bg-amber-900/20 dark:border-amber-800">
            <p className="text-amber-800 dark:text-amber-200">
              Google Analytics is not configured. Please set up your Google Analytics Measurement ID in settings first.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Conversion Funnels</CardTitle>
        <CardDescription>Track user progression through important workflows</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="templates" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="templates">Funnel Templates</TabsTrigger>
            <TabsTrigger value="custom">Custom Funnel</TabsTrigger>
            <TabsTrigger value="implementation">Implementation Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FUNNEL_TEMPLATES.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all ${
                    selectedTemplate === template.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {template.steps.map((step, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <div className="bg-muted rounded-full w-5 h-5 flex items-center justify-center mr-2">
                            {index + 1}
                          </div>
                          <div className="flex-1">{step.name}</div>
                          {index < template.steps.length - 1 && (
                            <ArrowRight className="h-3 w-3 mx-2 text-muted-foreground" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        const template = getSelectedTemplate()
                        if (template) {
                          copyToClipboard(generateGACode(template), template.id)
                        }
                      }}
                    >
                      {copied === template.id ? (
                        <>
                          <Check className="h-4 w-4 mr-2" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" /> Copy Configuration
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {selectedTemplate && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Selected Funnel: {getSelectedTemplate()?.name}</h3>
                <div className="bg-muted p-4 rounded-md">
                  <pre className="text-xs overflow-auto whitespace-pre-wrap">
                    {generateGACode(getSelectedTemplate())}
                  </pre>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="funnel-name">Funnel Name</Label>
                  <Input
                    id="funnel-name"
                    placeholder="e.g., Strategy Optimization Funnel"
                    value={customFunnel.name}
                    onChange={(e) => setCustomFunnel({ ...customFunnel, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="funnel-description">Description</Label>
                  <Input
                    id="funnel-description"
                    placeholder="Describe the purpose of this funnel"
                    value={customFunnel.description}
                    onChange={(e) => setCustomFunnel({ ...customFunnel, description: e.target.value })}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Funnel Steps</h3>
                  <Button variant="outline" size="sm" onClick={addStep}>
                    <Plus className="h-4 w-4 mr-2" /> Add Step
                  </Button>
                </div>

                {customFunnel.steps.map((step, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start p-4 border rounded-md">
                    <div className="space-y-2">
                      <Label htmlFor={`step-name-${index}`}>Step Name</Label>
                      <Input
                        id={`step-name-${index}`}
                        placeholder="e.g., View Strategy Page"
                        value={step.name}
                        onChange={(e) => updateStep(index, "name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`step-event-${index}`}>Event Name</Label>
                      <Input
                        id={`step-event-${index}`}
                        placeholder="e.g., page_view"
                        value={step.event}
                        onChange={(e) => updateStep(index, "event", e.target.value)}
                      />
                    </div>
                    <div className="flex items-end space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => removeStep(index)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() =>
                    setCustomFunnel({ name: "", description: "", steps: [{ name: "", event: "", params: {} }] })
                  }
                >
                  Reset
                </Button>
                <Button onClick={saveFunnel}>
                  <Save className="h-4 w-4 mr-2" /> Save Funnel
                </Button>
              </div>

              {customFunnel.name && customFunnel.steps.length > 0 && customFunnel.steps[0].name && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Generated Configuration</h3>
                  <div className="bg-muted p-4 rounded-md relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(generateGACode(customFunnel), "custom")}
                    >
                      {copied === "custom" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <pre className="text-xs overflow-auto whitespace-pre-wrap">{generateGACode(customFunnel)}</pre>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="implementation" className="space-y-4">
            <div className="prose max-w-none dark:prose-invert">
              <h3>Implementing Conversion Funnels in Google Analytics 4</h3>

              <p>
                Follow these steps to implement conversion funnels in Google Analytics 4 for your Tezos Liquidity
                Management platform:
              </p>

              <h4>Method 1: Using Exploration Reports (Recommended)</h4>
              <ol>
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
                  <strong>Create a Custom Dimension:</strong> Go to Admin &gt; Custom Definitions &gt; Create custom
                  dimension
                  <ul>
                    <li>Name it "funnel_step" with scope "Event"</li>
                    <li>This will help track the user's position in the funnel</li>
                  </ul>
                </li>
                <li>
                  <strong>Create an Exploration Report:</strong> Go to Explore &gt; Create new exploration
                </li>
                <li>
                  <strong>Select Funnel Visualization:</strong> Choose "Funnel exploration" as the technique
                </li>
                <li>
                  <strong>Configure Steps:</strong> Add your funnel steps as dimensions
                  <ul>
                    <li>Use the event names from the templates or your custom funnel</li>
                    <li>Order them in the sequence you want to track</li>
                  </ul>
                </li>
                <li>
                  <strong>Save Your Report:</strong> Name and save your funnel report for future access
                </li>
              </ol>

              <h4>Method 2: Using Google Tag Manager (Advanced)</h4>
              <ol>
                <li>
                  <strong>Set Up Google Tag Manager:</strong> If not already done, set up{" "}
                  <a
                    href="https://tagmanager.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center"
                  >
                    Google Tag Manager
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </li>
                <li>
                  <strong>Create Custom Event Tags:</strong> For each step in your funnel
                  <ul>
                    <li>Create a GA4 event tag</li>
                    <li>Add parameters including the funnel name and step</li>
                  </ul>
                </li>
                <li>
                  <strong>Set Up Triggers:</strong> Define when each funnel step should be recorded
                </li>
                <li>
                  <strong>Test and Publish:</strong> Verify your setup works correctly before publishing
                </li>
              </ol>

              <h4>Best Practices for Funnel Analysis</h4>
              <ul>
                <li>
                  <strong>Keep it Simple:</strong> Start with 3-5 key steps in your funnel
                </li>
                <li>
                  <strong>Focus on Critical Paths:</strong> Track the most important user journeys first
                </li>
                <li>
                  <strong>Analyze Drop-offs:</strong> Pay special attention to steps with high drop-off rates
                </li>
                <li>
                  <strong>Segment Your Data:</strong> Compare funnel performance across different user segments
                </li>
                <li>
                  <strong>Test Improvements:</strong> Use A/B testing to improve conversion rates at problematic steps
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col items-start text-sm text-muted-foreground">
        <p>
          For more advanced funnel analysis, consider using the{" "}
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
