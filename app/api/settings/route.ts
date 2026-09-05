import { type NextRequest, NextResponse } from "next/server"
import { withSupabaseAdminAuth } from "@/lib/auth/supabase-auth"

export async function GET(request: NextRequest) {
  return withSupabaseAdminAuth(request, async (_, { supabase }) => {
    try {
      const { data, error } = await supabase.from("settings").select("*")

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json(data)
    } catch {
      return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
    }
  })
}
