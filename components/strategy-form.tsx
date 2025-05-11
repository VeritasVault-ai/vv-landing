"use client"

import { useEffect } from "react"

import { Separator } from "@/components/ui/separator"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { getBrowserClient } from "@/lib/supabase"
import { toast } from "@/components/ui/use-toast"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Loader2, Save } from "lucide-react"
import {
  trackStrategyCreation,
  trackStrategySave,
  trackRiskAdjustment,
  trackFeatureUse,
} from "@/lib/analytics/track-events"

const COLORS = ["#10b981", "#3b82f6", "#6366f1"]

const strategySchema = z.object({
  name: z.string().min(3, { message: "Strategy name must be at least 3 characters" }),
  description: z.string().optional(),
  risk_level: z.enum(["Low", "Medium", "High"]),
  target_apy: z.coerce.number().min(1).max(100),
  stable_pairs_percentage: z.number().min(0).max(100),
  medium_volatility_percentage: z.number().min(0).max(100),
  high_volatility_percentage: z.number().min(0).max(100),
  auto_rebalance: z.boolean().default(false),
  rebalance_frequency: z.enum(["Daily", "Weekly", "Monthly"]).optional(),
  minimize_impermanent_loss: z.boolean().default(true),
  protocol_diversification: z.boolean().default(true),
})

type StrategyFormValues = z.infer<typeof strategySchema>

export function StrategyForm({ initialData }: { initialData?: StrategyFormValues }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = getBrowserClient()

  const defaultValues: Partial<StrategyFormValues> = {
    name: initialData?.name || "",
    description: initialData?.description || "",
    risk_level: initialData?.risk_level || "Medium",
    target_apy: initialData?.target_apy || 15,
    stable_pairs_percentage: initialData?.stable_pairs_percentage || 40,
    medium_volatility_percentage: initialData?.medium_volatility_percentage || 40,
    high_volatility_percentage: initialData?.high_volatility_percentage || 20,
    auto_rebalance: initialData?.auto_rebalance || false,
    rebalance_frequency: initialData?.rebalance_frequency || "Weekly",
    minimize_impermanent_loss: initialData?.minimize_impermanent_loss || true,
    protocol_diversification: initialData?.protocol_diversification || true,
  }

  const form = useForm<StrategyFormValues>({
    resolver: zodResolver(strategySchema),
    defaultValues,
  })

  const { watch, setValue } = form

  const stablePairs = watch("stable_pairs_percentage")
  const mediumVolatility = watch("medium_volatility_percentage")
  const highVolatility = watch("high_volatility_percentage")
  const autoRebalance = watch("auto_rebalance")
  const riskLevel = watch("risk_level")

  // Track form initialization
  useEffect(() => {
    trackFeatureUse("strategy_form", initialData ? "edit" : "create")
  }, [initialData])

  const handleStablePairsChange = (value: number[]) => {
    const newStablePairs = value[0]
    const remaining = 100 - newStablePairs
    const mediumRatio = mediumVolatility / (mediumVolatility + highVolatility) || 0.5

    setValue("stable_pairs_percentage", newStablePairs)
    setValue("medium_volatility_percentage", Math.round(remaining * mediumRatio))
    setValue("high_volatility_percentage", Math.round(remaining * (1 - mediumRatio)))

    // Track allocation adjustment
    trackFeatureUse("adjust_allocation", "strategy_form")
  }

  const handleMediumVolatilityChange = (value: number[]) => {
    const newMediumVolatility = value[0]
    const newHighVolatility = 100 - stablePairs - newMediumVolatility

    setValue("medium_volatility_percentage", newMediumVolatility)
    setValue("high_volatility_percentage", Math.max(0, newHighVolatility))

    // Track allocation adjustment
    trackFeatureUse("adjust_allocation", "strategy_form")
  }

  const handleRiskLevelChange = (value: string) => {
    const previousRiskLevel = riskLevel
    setValue("risk_level", value as "Low" | "Medium" | "High")

    // Track risk level change
    trackRiskAdjustment(initialData?.name || "new_strategy", previousRiskLevel, value as "Low" | "Medium" | "High")

    // Adjust allocation based on risk level
    if (value === "Low") {
      setValue("stable_pairs_percentage", 70)
      setValue("medium_volatility_percentage", 30)
      setValue("high_volatility_percentage", 0)
      setValue("target_apy", 8)
    } else if (value === "Medium") {
      setValue("stable_pairs_percentage", 40)
      setValue("medium_volatility_percentage", 40)
      setValue("high_volatility_percentage", 20)
      setValue("target_apy", 15)
    } else if (value === "High") {
      setValue("stable_pairs_percentage", 10)
      setValue("medium_volatility_percentage", 40)
      setValue("high_volatility_percentage", 50)
      setValue("target_apy", 25)
    }
  }

  const pieData = [
    { name: "Stable Pairs", value: stablePairs },
    { name: "Medium Volatility", value: mediumVolatility },
    { name: "High Volatility", value: highVolatility },
  ]

  async function onSubmit(data: StrategyFormValues) {
    try {
      setIsSubmitting(true)

      // Track strategy creation start
      trackStrategyCreation(
        initialData ? "custom_edit" : "custom_new",
        data.risk_level,
        3, // Assuming 3 asset types: stable, medium, high
        data.target_apy,
      )

      // Ensure percentages sum to 100
      const totalPercentage =
        data.stable_pairs_percentage + data.medium_volatility_percentage + data.high_volatility_percentage
      if (Math.abs(totalPercentage - 100) > 0.01) {
        toast({
          title: "Validation Error",
          description: "Allocation percentages must sum to 100%",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      // Insert strategy into database
      const { data: strategyData, error: strategyError } = await supabase
        .from("strategies")
        .insert({
          name: data.name,
          description: data.description || "",
          risk_level: data.risk_level,
          target_apy: data.target_apy,
          stable_pairs_percentage: data.stable_pairs_percentage,
          medium_volatility_percentage: data.medium_volatility_percentage,
          high_volatility_percentage: data.high_volatility_percentage,
          status: "active",
        })
        .select()

      if (strategyError) {
        throw strategyError
      }

      // Track successful strategy save
      if (strategyData && strategyData[0]) {
        trackStrategySave(
          strategyData[0].id,
          data.name,
          !initialData, // isNew flag
        )
      }

      toast({
        title: "Strategy Created",
        description: "Your strategy has been created successfully.",
      })

      // Reset form
      form.reset(defaultValues)
    } catch (error) {
      console.error("Error creating strategy:", error)
      toast({
        title: "Error",
        description: "Failed to create strategy. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Strategy Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Custom Strategy" {...field} />
                  </FormControl>
                  <FormDescription>Give your strategy a memorable name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your strategy goals and approach"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="risk_level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Risk Level</FormLabel>
                  <Select onValueChange={(value) => handleRiskLevelChange(value)} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select risk level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>This will adjust your allocation strategy accordingly</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="target_apy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target APY (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={100}
                      {...field}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value))
                        trackFeatureUse("adjust_target_apy", "strategy_form")
                      }}
                    />
                  </FormControl>
                  <FormDescription>Your desired annual percentage yield</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Allocation Strategy</h3>
              <div className="h-[200px] mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="stable_pairs_percentage"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Stable Pairs</FormLabel>
                        <span className="text-sm font-medium">{field.value}%</span>
                      </div>
                      <FormControl>
                        <Slider
                          defaultValue={[field.value]}
                          max={100}
                          step={1}
                          onValueChange={(value) => handleStablePairsChange(value)}
                        />
                      </FormControl>
                      <FormDescription>Low risk, stable returns (e.g., USDT/USDC)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="medium_volatility_percentage"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Medium Volatility</FormLabel>
                        <span className="text-sm font-medium">{field.value}%</span>
                      </div>
                      <FormControl>
                        <Slider
                          defaultValue={[field.value]}
                          max={100 - stablePairs}
                          step={1}
                          onValueChange={(value) => handleMediumVolatilityChange(value)}
                          disabled={stablePairs === 100}
                        />
                      </FormControl>
                      <FormDescription>Medium risk, higher returns (e.g., XTZ/USDT)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="high_volatility_percentage"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>High Volatility</FormLabel>
                        <span className="text-sm font-medium">{field.value}%</span>
                      </div>
                      <FormControl>
                        <div className="h-5 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                          <div
                            className="h-full rounded-full bg-slate-200 dark:bg-slate-700"
                            style={{ width: `${field.value}%` }}
                          ></div>
                        </div>
                      </FormControl>
                      <FormDescription>High risk, highest potential returns (e.g., ETL/wBTC)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Advanced Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="auto_rebalance"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Auto-Rebalance</FormLabel>
                    <FormDescription>
                      Automatically rebalance your portfolio to maintain target allocations
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked)
                        trackFeatureUse("toggle_auto_rebalance", checked ? "enabled" : "disabled")
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {autoRebalance && (
              <FormField
                control={form.control}
                name="rebalance_frequency"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Rebalance Frequency</FormLabel>
                      <FormDescription>How often should your portfolio be rebalanced</FormDescription>
                    </div>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        trackFeatureUse("set_rebalance_frequency", value)
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Daily">Daily</SelectItem>
                        <SelectItem value="Weekly">Weekly</SelectItem>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="minimize_impermanent_loss"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Minimize Impermanent Loss</FormLabel>
                    <FormDescription>Optimize pool selection to reduce impermanent loss risk</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked)
                        trackFeatureUse("toggle_impermanent_loss", checked ? "enabled" : "disabled")
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="protocol_diversification"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Protocol Diversification</FormLabel>
                    <FormDescription>Spread investments across multiple protocols to reduce risk</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked)
                        trackFeatureUse("toggle_protocol_diversification", checked ? "enabled" : "disabled")
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              trackFeatureUse("cancel_strategy", initialData ? "edit" : "create")
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            onClick={() => {
              if (!isSubmitting) {
                trackFeatureUse("submit_strategy", initialData ? "edit" : "create")
              }
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Strategy
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
