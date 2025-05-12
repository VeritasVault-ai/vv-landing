import { BaseRepository } from "./base-repository"
import type { Event } from "@/lib/models/types"
import { createClient } from "@/lib/supabase/supabase"

export class EventRepository extends BaseRepository<Event> {
  constructor() {
    super("events")
  }

  /**
   * Get upcoming events for a user
   */
  async getUpcomingForUser(userId: string): Promise<Event[]> {
    const supabase = createClient()

    const now = new Date().toISOString()

    const { data, error } = await supabase
      .from(this.tableName)
      .select("*")
      .eq("user_id", userId)
      .gt("date", now)
      .order("date", { ascending: true })

    if (error) {
      console.error("Error fetching upcoming events:", error)
      throw new Error(`Failed to fetch upcoming events: ${error.message}`)
    }

    return data as Event[]
  }
}

export const eventRepository = new EventRepository()
