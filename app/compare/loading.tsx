import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Skeleton */}
      <header className="border-b border-border/40 bg-background/95">
        <div className="container flex h-16 items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </header>

      {/* Main content skeleton */}
      <main className="flex-1 container py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          {/* Tabs skeleton */}
          <div className="mb-8">
            <div className="grid grid-cols-3 gap-2">
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
            </div>
          </div>

          {/* Table skeleton */}
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <div className="grid grid-cols-3 gap-4">
                  <Skeleton className="h-8" />
                  <Skeleton className="h-8" />
                  <Skeleton className="h-8" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Skeleton className="h-8" />
                  <Skeleton className="h-8" />
                  <Skeleton className="h-8" />
                </div>
              </div>
            ))}
          </div>

          {/* CTA skeleton */}
          <div className="mt-16 text-center">
            <Skeleton className="h-8 w-48 mx-auto mb-6" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-40" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer skeleton */}
      <footer className="border-t border-border/40 bg-background py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between">
          <Skeleton className="h-5 w-48" />
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
      </footer>
    </div>
  )
}
