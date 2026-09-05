import { type NextRequest, NextResponse } from "next/server"
import { withSupabaseAdminAuth } from "@/lib/auth/supabase-auth"

type RouteContext = { params: { key: string } }

export async function GET(request: NextRequest, { params }: RouteContext) {
  return withSupabaseAdminAuth(request, async (_, { supabase }) => {
    try {
      const { data, error } = await supabase.from("settings").select("*").eq("key", params.key).single()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json(data)
    } catch {
      return NextResponse.json({ error: "Failed to fetch setting" }, { status: 500 })
    }
  })
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  return withSupabaseAdminAuth(request, async (authenticatedRequest, { supabase }) => {
    try {
      const { value } = await authenticatedRequest.json()

      const { data, error } = await supabase
        .from("settings")
        .update({
          value,
          updated_at: new Date().toISOString(),
        })
        .eq("key", params.key)
        .select()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json(data[0])
    } catch {
      return NextResponse.json({ error: "Failed to update setting" }, { status: 500 })
    }
  })
}
