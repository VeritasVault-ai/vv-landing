import { type NextRequest, NextResponse } from "next/server"
import { withAdminAuth } from "@/lib/auth/auth-utils"
import { createServiceRoleClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  return withAdminAuth(request, async () => {
    try {
      const supabase = createServiceRoleClient()

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
