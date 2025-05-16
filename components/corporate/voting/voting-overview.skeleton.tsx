import { Card, CardContent, CardHeader } from "@/components/ui/card"
import styles from "./voting-overview.skeleton.module.css"
import { cn } from "@/lib/utils"

/**
 * Skeleton loading state for the VotingOverview component.
 * Uses CSS modules for styling isolation and better maintainability.
 * 
 * @returns A React component that mimics the structure of the VotingOverview component with animated placeholders.
 */
export function VotingOverviewSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className={cn(styles.skeletonPulse, styles.skeletonText)}></div>
              <div className={cn(styles.skeletonPulse, styles.skeletonTitle, "mt-2")}></div>
            </CardHeader>
            <CardContent>
              <div className={cn(styles.skeletonPulse, styles.skeletonText)}></div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className={cn(styles.skeletonPulse, styles.skeletonTitle)}></div>
            <div className={cn(styles.skeletonPulse, styles.skeletonSubtitle, "mt-2")}></div>
          </CardHeader>
          <CardContent className={styles.skeletonChartContainer}>
            <div className={cn(styles.skeletonPulse, styles.skeletonChart)}></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className={cn(styles.skeletonPulse, styles.skeletonTitle)}></div>
            <div className={cn(styles.skeletonPulse, styles.skeletonSubtitle, "mt-2")}></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className={styles.skeletonDelegation}>
                  <div>
                    <div className={cn(styles.skeletonPulse, styles.skeletonAddress)}></div>
                    <div className={cn(styles.skeletonPulse, styles.skeletonTimeAgo, "mt-2")}></div>
                  </div>
                  <div className={cn(styles.skeletonPulse, styles.skeletonBadge)}></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}