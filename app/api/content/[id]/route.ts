import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const supabase = createClient()

    // This is a placeholder implementation - in a real app, you would fetch from a content table
    // For now, we'll return a hardcoded content block if the ID matches
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

    const contentBlock = allContentBlocks.find((block) => block.id === id)

    if (!contentBlock) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 })
    }

    return NextResponse.json(contentBlock)
  } catch (error) {
    console.error(`Error fetching content with ID ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}
