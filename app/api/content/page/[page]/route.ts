import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function GET(request: Request, { params }: { params: { page: string } }) {
  try {
    const page = params.page
    const supabase = createClient()

    // This is a placeholder implementation - in a real app, you would fetch from a content table
    // For now, we'll return hardcoded content blocks filtered by page
    const allContentBlocks = [
      {
        id: "1",
        title: "Welcome to NeuralLiquid",
        content: "The AI-powered liquidity management platform for Tezos.",
        page: "home",
        position: "hero",
        type: "text",
      },
      {
        id: "2",
        title: "How It Works",
        content: "Our platform uses advanced AI to optimize your liquidity positions across multiple Tezos protocols.",
        page: "home",
        position: "section1",
        type: "text",
      },
      {
        id: "3",
        title: "Contact Us",
        content: "Get in touch with our team to learn more about how we can help you maximize your returns.",
        page: "contact",
        position: "hero",
        type: "text",
      },
    ]

    const filteredBlocks = allContentBlocks.filter((block) => block.page === page)

    return NextResponse.json(filteredBlocks)
  } catch (error) {
    console.error(`Error fetching content for page ${params.page}:`, error)
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}
