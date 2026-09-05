import { type NextRequest, NextResponse } from "next/server"
import { withAdminAuth } from "@/lib/auth/auth-utils"
import { createPublicServerClient, createServiceRoleClient } from "@/lib/supabase/server"

type RouteContext = { params: { id: string } }

export async function GET(request: Request, { params }: RouteContext) {
  const { searchParams } = new URL(request.url)
  const startDate = searchParams.get("start_date")
  const endDate = searchParams.get("end_date")

  try {
    const supabase = createPublicServerClient()

    let query = supabase.from("performance_history").select("*").eq("pool_id", params.id)

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
  return withAdminAuth(request, (authenticatedRequest) => createPerformanceEntry(authenticatedRequest, context))
}

async function createPerformanceEntry(request: NextRequest, { params }: RouteContext) {
  try {
    const supabase = createServiceRoleClient()
    const body = await request.json()

    const { data, error } = await supabase
      .from("performance_history")
      .insert({
        ...body,
        pool_id: params.id,
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
