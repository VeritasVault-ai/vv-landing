import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/auth/auth-utils"
import { eventRepository } from "@/lib/repository/event-repository"

export async function GET(req: NextRequest) {
  return withAuth(req, async (req, user) => {
    try {
      const { searchParams } = new URL(req.url)
      const filter = searchParams.get("filter") || "all"

      // Get upcoming events for the user
      const events = await eventRepository.getUpcomingForUser(user.id)

      // Apply filtering if needed
      let filteredEvents = events
      if (filter !== "all") {
        filteredEvents = events.filter((event) => event.type === filter)
      }

      return NextResponse.json(filteredEvents)
    } catch (error) {
      console.error("Error in events API:", error)
      return NextResponse.json({ error: error.message || "Failed to fetch events" }, { status: 500 })
    }
  })
}
