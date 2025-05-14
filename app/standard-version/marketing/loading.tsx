import { Skeleton } from "@/components/ui/skeleton"

/**
 * Displays a skeleton placeholder for the marketing page while content is loading.
 *
 * Renders a static layout of skeleton elements that mimic the structure of the marketing page, providing a visual loading state with no dynamic or conditional logic.
 */
export default function StandardMarketingLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Skeleton className="h-10 w-3/4 mb-2" />
        <Skeleton className="h-6 w-full mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[1, 2].map((i) => (
            <div key={i} className="border rounded-lg p-6">
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-64 mb-4" />
              <Skeleton className="h-16 w-full mb-4" />
              <div className="space-y-4">
                {[1, 2, 3].map((j) => (
                  <Skeleton key={j} className="h-9 w-full" />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border rounded-lg p-6">
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-64 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-4">
                <Skeleton className="h-5 w-32 mb-1" />
                <Skeleton className="h-4 w-full mb-3" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>
          <Skeleton className="h-9 w-full" />
        </div>
      </div>
    </div>
  )
}

