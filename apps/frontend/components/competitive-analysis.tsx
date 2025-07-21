"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

export default function CompetitiveAnalysis() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Competitive Analysis</CardTitle>
        <CardDescription className="max-w-2xl mx-auto">How LiquidAI compares to existing solutions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Features</th>
                <th className="text-center p-2">
                  <div className="flex flex-col items-center">
                    <span>LiquidAI</span>
                    <Badge className="mt-1 bg-emerald-600">Our Solution</Badge>
                  </div>
                </th>
                <th className="text-center p-2">
                  <div className="flex flex-col items-center">
                    <span>Competitor A</span>
                    <Badge variant="outline" className="mt-1">
                      Yield Aggregator
                    </Badge>
                  </div>
                </th>
                <th className="text-center p-2">
                  <div className="flex flex-col items-center">
                    <span>Competitor B</span>
                    <Badge variant="outline" className="mt-1">
                      Portfolio Manager
                    </Badge>
                  </div>
                </th>
                <th className="text-center p-2">
                  <div className="flex flex-col items-center">
                    <span>Competitor C</span>
                    <Badge variant="outline" className="mt-1">
                      Analytics Platform
                    </Badge>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">AI-Powered Predictions</td>
                <td className="text-center p-2">
                  <Check className="mx-auto h-5 w-5 text-emerald-600" />
                </td>
                <td className="text-center p-2">
                  <X className="mx-auto h-5 w-5 text-gray-300" />
                </td>
                <td className="text-center p-2">
                  <X className="mx-auto h-5 w-5 text-gray-300" />
                </td>
                <td className="text-center p-2">
                  <Check className="mx-auto h-5 w-5 text-emerald-600" />
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Automated Rebalancing</td>
                <td className="text-center p-2">
                  <Check className="mx-auto h-5 w-5 text-emerald-600" />
                </td>
                <td className="text-center p-2">
                  <Check className="mx-auto h-5 w-5 text-emerald-600" />
                </td>
                <td className="text-center p-2">
                  <X className="mx-auto h-5 w-5 text-gray-300" />
                </td>
                <td className="text-center p-2">
                  <X className="mx-auto h-5 w-5 text-gray-300" />
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Multi-Chain Support</td>
                <td className="text-center p-2">
                  <Check className="mx-auto h-5 w-5 text-emerald-600" />
                </td>
                <td className="text-center p-2">
                  <X className="mx-auto h-5 w-5 text-gray-300" />
                </td>
                <td className="text-center p-2">
                  <X className="mx-auto h-5 w-5 text-gray-300" />
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Impermanent Loss Prediction</td>
                <td className="text-center p-2">
                  <Check className="mx-auto h-5 w-5 text-emerald-600" />
                </td>
                <td className="text-center p-2">
                  <X className="mx-auto h-5 w-5 text-gray-300" />
                </td>
                <td className="text-center p-2">
                  <Check className="mx-auto h-5 w-5 text-emerald-600" />
                </td>
                <td className="text-center p-2">
                  <Check className="mx-auto h-5 w-5 text-emerald-600" />
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Custom Strategy Builder</td>
                <td className="text-center p-2">
                  <Check className="mx-auto h-5 w-5 text-emerald-600" />
                </td>
                <td className="text-center p-2">
                  <X className="mx-auto h-5 w-5 text-gray-300" />
                </td>
                <td className="text-center p-2">
                  <Check className="mx-auto h-5 w-5 text-emerald-600" />
                </td>
                <td className="text-center p-2">
                  <X className="mx-auto h-5 w-5 text-gray-300" />
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Non-Custodial</td>
                <td className="text-center p-2">
                  <Check className="mx-auto h-5 w-5 text-emerald-600" />
                </td>
                <td className="text-center p-2">
                  <X className="mx-auto h-5 w-5 text-gray-300" />
                </td>
                <td className="text-center p-2">
                  <Check className="mx-auto h-5 w-5 text-emerald-600" />
                </td>
                <td className="text-center p-2">
                  <Check className="mx-auto h-5 w-5 text-emerald-600" />
                </td>
              </tr>
              <tr>
                <td className="p-2">Tezos & Etherlink Focus</td>
                <td className="text-center p-2">
                  <Check className="mx-auto h-5 w-5 text-emerald-600" />
                </td>
                <td className="text-center p-2">
                  <X className="mx-auto h-5 w-5 text-gray-300" />
                </td>
                <td className="text-center p-2">
                  <X className="mx-auto h-5 w-5 text-gray-300" />
                </td>
                <td className="text-center p-2">
                  <X className="mx-auto h-5 w-5 text-gray-300" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium text-center mb-4">Our Competitive Advantages</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4 text-center">
              <h4 className="font-medium">Proprietary AI Models</h4>
              <p className="text-sm text-muted-foreground mt-2">
                Our machine learning models are specifically trained on Tezos and Etherlink DeFi data, providing
                superior predictive accuracy compared to general-purpose analytics.
              </p>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <h4 className="font-medium">Ecosystem Integration</h4>
              <p className="text-sm text-muted-foreground mt-2">
                Deep integration with Tezos and Etherlink protocols allows for optimized gas usage, MEV protection, and
                specialized yield strategies unavailable to competitors.
              </p>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <h4 className="font-medium">Dynamic Risk Management</h4>
              <p className="text-sm text-muted-foreground mt-2">
                Our platform offers sophisticated risk scoring and impermanent loss mitigation that adapts to changing
                market conditions in real-time.
              </p>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <h4 className="font-medium">User Experience</h4>
              <p className="text-sm text-muted-foreground mt-2">
                Intuitive interface designed for both retail and institutional users, with customizable dashboards and
                strategy builders that require no coding knowledge.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
