import { Skeleton } from "@/components/ui/skeleton"

export default function StandardDashboardLoading() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-9 w-32 mt-4 md:mt-0" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border rounded-lg p-4">
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-40" />
          </div>
        ))}
      </div>

      <div className="border rounded-lg p-4 mb-6">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-80 w-full rounded-lg" />
      </div>
    </div>
  )
}
