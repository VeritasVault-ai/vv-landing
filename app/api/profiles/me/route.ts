import { type NextRequest, NextResponse } from "next/server"
import { type SupabaseAuthContext, withSupabaseAuth } from "@/lib/auth/supabase-auth"

export async function GET(request: NextRequest) {
  return withSupabaseAuth(request, readProfile)
}

async function readProfile(_: NextRequest, { supabase, user }: SupabaseAuthContext) {
  try {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  return withSupabaseAuth(request, updateProfile)
}

async function updateProfile(request: NextRequest, { supabase, user }: SupabaseAuthContext) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from("profiles")
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
