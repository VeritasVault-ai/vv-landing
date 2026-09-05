import { type NextRequest, NextResponse } from "next/server"
import { liquidityPoolRepository } from "@/lib/repository/liquidity-pool-repository"
import { withAuth } from "@/lib/auth/auth-utils"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const pool = await liquidityPoolRepository.getById(id)

    if (!pool) {
      return NextResponse.json({ error: "Pool not found" }, { status: 404 })
    }

    return NextResponse.json(pool)
  } catch (error) {
    console.error("Error fetching liquidity pool:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch liquidity pool" },
      { status: 500 },
    )
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return withAuth(req, async (req, user) => {
    try {
      const body = await req.json()

      // Check if pool exists
      const existingPool = await liquidityPoolRepository.getById(id)

      if (!existingPool) {
        return NextResponse.json({ error: "Pool not found" }, { status: 404 })
      }

      const updatedPool = await liquidityPoolRepository.update(id, body)

      return NextResponse.json(updatedPool)
    } catch (error) {
      console.error("Error updating liquidity pool:", error)
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "Failed to update liquidity pool" },
        { status: 500 },
      )
    }
  })
}
