import { Skeleton } from "@/components/ui/skeleton"

/**
 * Displays a skeleton UI representing the loading state of a dashboard page.
 *
 * Renders placeholder elements for the dashboard's title, controls, navigation tabs, summary cards, main content area, and a detailed list to indicate content is loading.
 */
export default function DashboardLoading() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-9 w-32 mt-4 md:mt-0" />
      </div>

      {/* Tab skeleton */}
      <Skeleton className="h-10 w-full max-w-md mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border rounded-lg p-4">
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-40" />
          </div>
        ))}
      </div>

      <div className="mb-6">
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>

      <div>
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}