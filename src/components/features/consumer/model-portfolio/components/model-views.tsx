"use client"
import { Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import styles from "../model-portfolio-dashboard.module.css"

interface ModelView {
  asset: string
  value: string
}

interface ModelViewsProps {
  views: ModelView[]
}

export const ModelViews = ({ views }: ModelViewsProps) => {
  return (
    <Card className={styles.viewsCard}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          Views
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 ml-2 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Expected returns for each asset based on market analysis and risk appetite</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={styles.viewsList}>
          {views.map((view) => (
            <div key={view.asset} className={styles.viewItem}>
              1.0*{view.asset} = {view.value}
            </div>
          ))}
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Views represent expected returns for each asset in the portfolio based on your risk strategy and market conditions.</p>
        </div>
      </CardContent>
    </Card>
  )
}