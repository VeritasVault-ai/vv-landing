import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-8">
      <Skeleton className="h-10 w-1/3 mb-6" />
      <Skeleton className="h-6 w-2/3 mb-8" />

      <div className="space-y-8">
        <Skeleton className="h-64 w-full rounded-lg" />

        <div className="flex gap-2 mb-4">
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-10 w-1/2" />
        </div>

        <Skeleton className="h-96 w-full rounded-lg" />
      </div>
    </div>
  )
}
