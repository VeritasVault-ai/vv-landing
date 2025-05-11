"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useAnalytics } from "@/hooks/use-analytics"
import { Plus } from "lucide-react"
import { Separator } from "@/components/ui/separator"

// Predefined alert templates
const ALERT_TEMPLATES = [
  {
    id: "error-spike",
    name: "Error Rate Spike",
    description: "Alert when error rates exceed normal thresholds",
    metric: "error_rate",
    condition: "is_greater_than",
    threshold: "5",
    timeframe: "hour",
    notifyVia: ["email"],
  },
  {
    id: "traffic-drop",
    name: "Traffic Drop",
    description: "Alert when traffic drops significantly compared to previous period",
    metric: "user_count",
    condition: "decreased_by_more_than",
    threshold: "30",
    timeframe: "day",
    notifyVia: ["email", "slack"],
  },
  {
    id: "conversion-drop",
    name: "Conversion Rate Drop",
    description: "Alert when strategy creation conversion rate drops",
    metric: "conversion_rate",
    condition: "decreased_by_more_than",
    threshold: "15",
    timeframe: "day",
    notifyVia: ["email"],
  },
  {
    id: "unusual-activity",
    name: "Unusual User Activity",
    description: "Alert when user behavior deviates significantly from normal patterns",
    metric: "user_activity",
    condition: "anomaly_detection",
    threshold: "high",
    timeframe: "day",
    notifyVia: ["email", "slack"],
  },
]

export function AnalyticsAlerts() {
  const { isAnalyticsReady } = useAnalytics()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("templates")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [customAlert, setCustomAlert] = useState({
    name: "",
    description: "",
    metric: "",
    condition: "is_greater_than",
    threshold: "",
    timeframe: "day",
    notifyVia: ["email"],
  })
  const [alerts, setAlerts] = useState<any[]>([])

  const getSelectedTemplate = () => {
    return ALERT_TEMPLATES.find((template) => template.id === selectedTemplate)
  }

  const addAlert = (alert: any) => {
    // In a real implementation, this would save to a database
    setAlerts([...alerts, { ...alert, id: Date.now().toString() }])
    toast({
      title: "Alert Created",
      description: `Alert "${alert.name}" has been created successfully.`,
    })
  }

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
    toast({
      title: "Alert Removed",
      description: "The alert has been removed successfully.",
    })
  }

  const toggleNotification = (type: string) => {
    if (customAlert.notifyVia.includes(type)) {
      setCustomAlert({
        ...customAlert,
        notifyVia: customAlert.notifyVia.filter((t) => t !== type),
      })
    } else {
      setCustomAlert({
        ...customAlert,
        notifyVia: [...customAlert.notifyVia, type],
      })
    }
  }

  if (!isAnalyticsReady) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analytics Alerts</CardTitle>
          <CardDescription>Set up alerts for unusual patterns or errors</CardDescription>
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
        <CardTitle>Analytics Alerts</CardTitle>
        <CardDescription>Set up alerts for unusual patterns or errors</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="templates" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="templates">Alert Templates</TabsTrigger>
            <TabsTrigger value="custom">Custom Alert</TabsTrigger>
            <TabsTrigger value="active">Active Alerts ({alerts.length})</TabsTrigger>
            <TabsTrigger value="guide">Implementation Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ALERT_TEMPLATES.map((template) => (
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
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Metric:</span>
                        <span className="font-medium">{template.metric}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Condition:</span>
                        <span className="font-medium">
                          {template.condition.replace(/_/g, " ")} {template.threshold}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Timeframe:</span>
                        <span className="font-medium">Per {template.timeframe}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Notify via:</span>
                        <span className="font-medium">{template.notifyVia.join(", ")}</span>
                      </div>
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
                        if (template) addAlert(template)
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Alert
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="alert-name">Alert Name</Label>
                  <Input
                    id="alert-name"
                    placeholder="e.g., High Error Rate Alert"
                    value={customAlert.name}
                    onChange={(e) => setCustomAlert({ ...customAlert, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alert-description">Description</Label>
                  <Input
                    id="alert-description"
                    placeholder="Describe the purpose of this alert"
                    value={customAlert.description}
                    onChange={(e) => setCustomAlert({ ...customAlert, description: e.target.value })}
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="alert-metric">Metric</Label>
                  <Input
                    id="alert-metric"
                    placeholder="e.g., error_rate, user_count"
                    value={customAlert.metric}
                    onChange={(e) => setCustomAlert({ ...customAlert, metric: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alert-condition">Condition</Label>
                  <Select
                    value={customAlert.condition}
                    onValueChange={(value) => setCustomAlert({ ...customAlert, condition: value })}
                  >
                    <SelectTrigger id="alert-condition">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="is_greater_than">Is greater than</SelectItem>
                      <SelectItem value="is_less_than">Is less than</SelectItem>
                      <SelectItem value="increased_by_more_than">Increased by more than</SelectItem>
                      <SelectItem value="decreased_by_more_than">Decreased by more than</SelectItem>
                      <SelectItem value="anomaly_detection">Anomaly detection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="alert-threshold">Threshold</Label>
                  <Input
                    id="alert-threshold"
                    placeholder="e.g., 5, 10, 15"
                    value={customAlert.threshold}
                    onChange={(e) => setCustomAlert({ ...customAlert, threshold: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alert-timeframe">Timeframe</Label>
                  <Select
                    value={customAlert.timeframe}
                    onValueChange={(value) => setCustomAlert({ ...customAlert, timeframe: value })}
                  >
                    <SelectTrigger id="alert-timeframe">
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hour">Hour</SelectItem>
                      <SelectItem value="day">Day</SelectItem>
                      <SelectItem value="week">Week</SelectItem>
                      <SelectItem value="month">Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notification Methods</Label>
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="notify-email"
                      checked={customAlert.notifyVia.includes("email")}
                      onChange={() => toggleNotification("email")}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="notify-email" className="text-sm font-normal">
                      Email
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="notify-slack"
                      checked={customAlert.notifyVia.includes("slack")}
                      onChange={() => toggleNotification("slack")}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="notify-slack" className="text-sm font-normal">
                      Slack
                    </Label>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => {
                  if (customAlert.name && customAlert.metric && customAlert.threshold) {
                    addAlert({
                      id: `custom-${Date.now()}`,
                      ...customAlert,
                    })
                    setCustomAlert({
                      name: "",
                      description: "",
                      metric: "",
                      condition: "is_greater_than",
                      threshold: "",
                      timeframe: "day",
                      notifyVia: ["email"],
                    })
                  } else {
                    toast({
                      title: "Incomplete Alert",
                      description: "Please fill in all required fields.",
                      variant: "destructive",
                    })
                  }
                }}
              >
                Create Alert
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {alerts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No active alerts. Create an alert from templates or custom alerts.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <Card key={alert.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{alert.name}</CardTitle>
                          <CardDescription>{alert.description}</CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAlert(alert.id)}
                          className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                        >
                          Remove
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Metric:</span>
                          <span className="font-medium">{alert.metric}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Condition:</span>
                          <span className="font-medium">
                            {alert.condition.replace(/_/g, " ")} {alert.threshold}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Timeframe:</span>
                          <span className="font-medium">Per {alert.timeframe}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Notify via:</span>
                          <span className="font-medium">{alert.notifyVia.join(", ")}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="guide" className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <h3>Setting Up Analytics Alerts</h3>
              <p>
                Analytics alerts help you monitor your platform's performance and notify you when metrics deviate from
                expected patterns. Here's how to implement them effectively:
              </p>

              <h4>1. Choose the Right Metrics</h4>
              <ul>
                <li>
                  <strong>Error rates:</strong> Monitor for spikes in errors that could indicate technical issues
                </li>
                <li>
                  <strong>User engagement:</strong> Track drops in key user actions like strategy creation
                </li>
                <li>
                  <strong>Conversion rates:</strong> Monitor changes in important conversion funnels
                </li>
                <li>
                  <strong>Traffic patterns:</strong> Get notified of unusual traffic spikes or drops
                </li>
              </ul>

              <h4>2. Set Appropriate Thresholds</h4>
              <p>
                Start with conservative thresholds and adjust as you learn what's normal for your platform. Consider
                using:
              </p>
              <ul>
                <li>Percentage changes (e.g., 20% drop from previous period)</li>
                <li>Absolute thresholds for critical metrics (e.g., error rate {">"} 5%)</li>
                <li>Anomaly detection for complex patterns</li>
              </ul>

              <h4>3. Choose Notification Methods</h4>
              <p>Configure how you want to be notified when alerts trigger. Common options include:</p>
              <ul>
                <li>Email notifications for daily summaries</li>
                <li>Slack messages for immediate team awareness</li>
                <li>SMS for critical alerts requiring immediate action</li>
              </ul>

              <h4>4. Implement in Google Analytics</h4>
              <p>In addition to these in-app alerts, set up similar alerts in Google Analytics:</p>
              <ol>
                <li>Go to Admin → Account → Property → Custom Alerts</li>
                <li>Click "New Alert"</li>
                <li>Configure similar conditions to what you've set up here</li>
                <li>Set up email notifications</li>
              </ol>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
