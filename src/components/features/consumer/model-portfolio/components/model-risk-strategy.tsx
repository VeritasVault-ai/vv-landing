"use client"
import { AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import styles from "../model-portfolio-dashboard.module.css"

interface ModelRiskStrategyProps {
  riskProfile: string
}

export const ModelRiskStrategy = ({ riskProfile }: ModelRiskStrategyProps) => {
  // Map risk profile to slider value
  const getRiskValue = (profile: string): number => {
    switch (profile.toLowerCase()) {
      case "conservative":
        return 25
      case "moderate":
        return 50
      case "aggressive":
        return 75
      case "very aggressive":
        return 90
      default:
        return 50
    }
  }

  return (
    <Card className={styles.riskStrategyCard}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          Risk Strategy
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertCircle className="w-4 h-4 ml-2 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Your risk profile determines the balance between potential returns and volatility</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={styles.riskLevel}>
          <span className={styles.riskLevelLabel}>Current Risk Profile:</span>
          <span className={styles.riskLevelValue}>{riskProfile}</span>
        </div>
        
        <div className={styles.riskSlider}>
          <Slider
            defaultValue={[getRiskValue(riskProfile)]}
            max={100}
            step={1}
            disabled
          />
          <div className={styles.riskLabels}>
            <span className={styles.riskLabel}>Conservative</span>
            <span className={styles.riskLabel}>Moderate</span>
            <span className={styles.riskLabel}>Aggressive</span>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Your risk profile influences the asset allocation and expected returns of your portfolio. 
             To change your risk profile, please update your investment preferences.</p>
        </div>
      </CardContent>
    </Card>
  )
}