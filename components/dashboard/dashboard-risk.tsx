"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, Info } from "lucide-react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

interface DashboardRiskProps {
  fullView?: boolean
}

/**
 * Component that displays risk analysis charts and metrics
 */
export function DashboardRisk({ fullView = false }: DashboardRiskProps) {
  // Mock data for risk analysis
  const riskAllocation = [
    { name: "Low Risk", value: 45, color: "#22c55e" },
    { name: "Medium Risk", value: 35, color: "#f59e0b" },
    { name: "High Risk", value: 20, color: "#ef4444" }
  ]
  
  const riskFactors = [
    { 
      factor: "Market Volatility", 
      severity: "Medium", 
      description: "Current market conditions show moderate volatility" 
    },
    { 
      factor: "Liquidity Risk", 
      severity: "Low", 
      description: "Portfolio maintains high liquidity across assets" 
    },
    { 
      factor: "Smart Contract Risk", 
      severity: "Medium", 
      description: "Some protocols used have limited audits" 
    },
    { 
      factor: "Regulatory Risk", 
      severity: "High", 
      description: "Uncertain regulatory environment in key jurisdictions" 
    }
  ]
  
  // Only show a subset of risk factors if not in full view
  const displayedRiskFactors = fullView ? riskFactors : riskFactors.slice(0, 2)
  
  return (
    <Card className={fullView ? "col-span-2" : ""}>
      <CardHeader>
        <CardTitle>Risk Analysis</CardTitle>
        <CardDescription>Portfolio risk exposure and factors</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`grid ${fullView ? 'grid-cols-2 gap-6' : 'grid-cols-1 gap-4'}`}>
          <div>
            <h4 className="text-sm font-medium mb-3">Risk Allocation</h4>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskAllocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {riskAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, 'Allocation']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-3">Risk Factors</h4>
            <div className="space-y-3">
              {displayedRiskFactors.map((risk, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  {risk.severity === "Low" ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  ) : risk.severity === "Medium" ? (
                    <Info className="h-5 w-5 text-amber-500 mt-0.5" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium text-sm">{risk.factor}</h5>
                      <Badge 
                        variant={
                          risk.severity === "Low" ? "success" : 
                          risk.severity === "Medium" ? "warning" : "destructive"
                        }
                        className="text-xs py-0 px-2"
                      >
                        {risk.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {risk.description}
                    </p>
                  </div>
                </div>
              ))}
              
              {!fullView && riskFactors.length > 2 && (
                <div className="text-center">
                  <span className="text-xs text-blue-600 dark:text-blue-400">
                    +{riskFactors.length - 2} more risk factors
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {fullView && (
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-sm font-medium mb-3">Mitigation Strategies</h4>
            <ul className="space-y-2">
              <li className="text-sm flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Diversification across multiple chains and protocols</span>
              </li>
              <li className="text-sm flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Regular security audits of smart contract integrations</span>
              </li>
              <li className="text-sm flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Maintaining sufficient liquidity reserves</span>
              </li>
              <li className="text-sm flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Regulatory compliance monitoring in relevant jurisdictions</span>
              </li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}