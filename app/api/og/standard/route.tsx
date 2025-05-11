import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const title = searchParams.get("title") || "NeuralLiquid - AI-Powered Liquidity Management"

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #1e293b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1e293b 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            {/* Simplified logo SVG */}
            <circle cx="60" cy="60" r="60" fill="#3b82f6" />
            <path d="M40 40 L80 40 L80 80 L40 80 Z" fill="#ffffff" />
          </svg>
        </div>
        <div
          style={{
            fontSize: 60,
            fontWeight: 800,
            letterSpacing: "-0.025em",
            lineHeight: 1.2,
            color: "white",
            marginBottom: 16,
            textAlign: "center",
            padding: "0 120px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#94a3b8",
            marginTop: 16,
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          AI-Powered Liquidity Management for DeFi Users
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e) {
    console.error(e)
    return new Response("Failed to generate image", { status: 500 })
  }
}
