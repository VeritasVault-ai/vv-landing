import type { SupabaseClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"
import { withSupabaseAdminAuth, withSupabaseAuth } from "@/lib/auth/supabase-auth"
import { createServiceRoleClient } from "@/lib/supabase/server"

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, context: RouteContext) {
  return withSupabaseAuth(request, (authenticatedRequest, { supabase }) =>
    readPerformanceHistory(authenticatedRequest, context, supabase),
  )
}

async function readPerformanceHistory(
  request: NextRequest,
  { params }: RouteContext,
  supabase: SupabaseClient,
) {
  const { id } = await params
  const { searchParams } = new URL(request.url)
  const startDate = searchParams.get("start_date")
  const endDate = searchParams.get("end_date")

  try {
    let query = supabase.from("performance_history").select("*").eq("pool_id", id)

    if (startDate) {
      query = query.gte("date", startDate)
    }

    if (endDate) {
      query = query.lte("date", endDate)
    }

    const { data, error } = await query.order("date", { ascending: true })

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Failed to fetch performance history" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
  return withSupabaseAdminAuth(request, (authenticatedRequest) =>
    createPerformanceEntry(authenticatedRequest, context),
  )
}

async function createPerformanceEntry(request: NextRequest, { params }: RouteContext) {
  const { id } = await params
  try {
    const supabase = createServiceRoleClient()
    const body = await request.json()

    const { data, error } = await supabase
      .from("performance_history")
      .insert({
        ...body,
        pool_id: id,
      })
      .select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Failed to create performance history entry" }, { status: 500 })
  }
}
