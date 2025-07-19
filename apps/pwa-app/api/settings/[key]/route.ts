import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function GET(request: Request, { params }: { params: { key: string } }) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.from("settings").select("*").eq("key", params.key).single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch setting" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { key: string } }) {
  try {
    const supabase = createClient()
    const { value } = await request.json()

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
  } catch (error) {
    return NextResponse.json({ error: "Failed to update setting" }, { status: 500 })
  }
}
