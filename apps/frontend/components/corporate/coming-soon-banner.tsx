import { CalendarClock } from "lucide-react"

/**
 * Banner component to display "Coming Soon" message for pages in alpha testing
 */
export function ComingSoonBanner() {
  return (
    <div className="bg-red-600 text-white py-3 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-2 sm:mb-0">
          <CalendarClock className="h-5 w-5 mr-2" />
          <span className="font-semibold">COMING SOON - Alpha Testing</span>
        </div>
        <div className="text-sm">
          Registration available from <span className="font-bold">May 31, 2025</span>
        </div>
      </div>
    </div>
  )
}