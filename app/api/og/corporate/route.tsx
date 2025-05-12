import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const title = searchParams.get("title") || "VeritasVault.ai - Institutional-Grade Liquidity Management"

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0c1220",
          backgroundImage:
            "linear-gradient(45deg, #0f1a2d 25%, transparent 25%, transparent 50%, #0f1a2d 50%, #0f1a2d 75%, transparent 75%, transparent)",
          backgroundSize: "20px 20px",
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
            {/* Simplified corporate logo SVG */}
            <circle cx="60" cy="60" r="60" fill="#1e40af" />
            <path d="M30 50 L60 30 L90 50 L90 70 L60 90 L30 70 Z" fill="#ffffff" />
          </svg>
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            letterSpacing: "-0.025em",
            lineHeight: 1.2,
            color: "white",
            marginBottom: 16,
            textAlign: "center",
            padding: "0 100px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#94a3b8",
            marginTop: 16,
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Enterprise-Grade Liquidity Management for Institutional Clients
        </div>
        <div
          style={{
            fontSize: 18,
            color: "#64748b",
            marginTop: 24,
            textAlign: "center",
          }}
        >
          VeritasVault.ai by NeuralLiquid
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
