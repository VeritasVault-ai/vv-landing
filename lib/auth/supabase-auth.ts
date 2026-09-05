import "server-only"

import type { SupabaseClient, User } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"
import { createRequestServerClient } from "@/lib/supabase/server"

export type SupabaseAuthContext = {
  supabase: SupabaseClient
  user: User
}

type AuthenticatedHandler = (
  request: NextRequest,
  context: SupabaseAuthContext,
) => Promise<NextResponse>

export async function withSupabaseAuth(
  request: NextRequest,
  handler: AuthenticatedHandler,
): Promise<NextResponse> {
  const cookiesToSet: Parameters<NonNullable<Parameters<typeof createRequestServerClient>[1]>>[0] = []
  const supabase = createRequestServerClient(request, (cookies) => cookiesToSet.push(...cookies))
  const withRefreshedCookies = (response: NextResponse) => {
    cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
    return response
  }
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return withRefreshedCookies(
      NextResponse.json({ error: "Authentication required" }, { status: 401 }),
    )
  }

  return withRefreshedCookies(await handler(request, { supabase, user }))
}

export async function withSupabaseAdminAuth(
  request: NextRequest,
  handler: AuthenticatedHandler,
): Promise<NextResponse> {
  return withSupabaseAuth(request, async (authenticatedRequest, context) => {
    const { data: role, error } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.user.id)
      .eq("role", "admin")
      .maybeSingle()

    if (error || !role) {
      return NextResponse.json({ error: "Admin authorization required" }, { status: 403 })
    }

    return handler(authenticatedRequest, context)
  })
}
