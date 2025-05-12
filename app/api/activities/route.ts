import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/auth/auth-utils"
import { activityRepository } from "@/lib/repository/activity-repository"

export async function GET(req: NextRequest) {
  return withAuth(req, async (req, user) => {
    try {
      const { searchParams } = new URL(req.url)
      const filter = searchParams.get("filter") || "all"

      let activities

      if (filter === "all") {
        activities = await activityRepository.getRecentForUser(user.id, 10)
      } else {
        activities = await activityRepository.getByType(user.id, filter, 10)
      }

      return NextResponse.json(activities)
    } catch (error) {
      console.error("Error in activities API:", error)
      return NextResponse.json({ error: error.message || "Failed to fetch activities" }, { status: 500 })
    }
  })
}
