import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-8">
      <Skeleton className="mb-6 h-10 w-64" />
      <Skeleton className="h-[300px] w-full rounded-lg" />
    </div>
  )
}
