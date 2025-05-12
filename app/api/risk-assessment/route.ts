import { NextResponse } from "next/server"
import { withAuth } from "@/lib/auth/auth-utils"
import { riskAssessmentRepository } from "@/lib/repository/risk-assessment-repository"

export async function GET(req: Request) {
  return withAuth(req, async (req, user) => {
    try {
      // Get the latest risk assessment for the user
      const assessment = await riskAssessmentRepository.getLatestForUser(user.id)

      if (!assessment) {
        // If no assessment exists, return a default one
        return NextResponse.json({
          overall: 50,
          categories: [
            { name: "Volatility", value: 60, description: "Market price fluctuations" },
            { name: "Impermanent Loss", value: 45, description: "Loss due to price divergence" },
            { name: "Smart Contract", value: 30, description: "Code vulnerabilities" },
            { name: "Liquidity", value: 55, description: "Ability to exit positions" },
            { name: "Counterparty", value: 40, description: "Risk from other parties" },
          ],
          recommendations: [
            "Consider diversifying your liquidity pool investments",
            "Monitor impermanent loss in your current positions",
            "Reduce exposure to high volatility pairs",
          ],
        })
      }

      // Transform the assessment data into the format expected by the frontend
      return NextResponse.json({
        overall: assessment.overall_score,
        categories: [
          {
            name: "Volatility",
            value: assessment.volatility_score,
            description: "Market price fluctuations",
          },
          {
            name: "Impermanent Loss",
            value: assessment.impermanent_loss_score,
            description: "Loss due to price divergence",
          },
          {
            name: "Smart Contract",
            value: assessment.smart_contract_score,
            description: "Code vulnerabilities",
          },
          {
            name: "Liquidity",
            value: assessment.liquidity_depth_score,
            description: "Ability to exit positions",
          },
          {
            name: "Counterparty",
            value: assessment.counterparty_score || 40,
            description: "Risk from other parties",
          },
        ],
        recommendations: assessment.recommendations || [
          "Consider diversifying your liquidity pool investments",
          "Monitor impermanent loss in your current positions",
          "Reduce exposure to high volatility pairs",
        ],
      })
    } catch (error) {
      console.error("Error in risk assessment API:", error)
      return NextResponse.json({ error: error.message || "Failed to fetch risk assessment" }, { status: 500 })
    }
  })
}
