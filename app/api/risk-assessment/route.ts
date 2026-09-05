import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/auth/auth-utils"
import { riskAssessmentRepository } from "@/lib/repository/risk-assessment-repository"

export async function GET(req: NextRequest) {
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

      const overallScore = assessment.assessment.overall_risk_score <= 10
        ? assessment.assessment.overall_risk_score * 10
        : assessment.assessment.overall_risk_score
      const categoryScore = (pattern: RegExp) => {
        const factor = assessment.assessment.risk_factors.find(({ factor }) => pattern.test(factor))
        if (!factor) return overallScore
        return factor.severity === "Low" ? 30 : factor.severity === "Medium" ? 60 : 85
      }

      // Transform the assessment data into the format expected by the frontend
      return NextResponse.json({
        overall: overallScore,
        categories: [
          {
            name: "Volatility",
            value: categoryScore(/volatil/i),
            description: "Market price fluctuations",
          },
          {
            name: "Impermanent Loss",
            value: categoryScore(/impermanent|divergence/i),
            description: "Loss due to price divergence",
          },
          {
            name: "Smart Contract",
            value: categoryScore(/contract|code/i),
            description: "Code vulnerabilities",
          },
          {
            name: "Liquidity",
            value: categoryScore(/liquidity|depth|exit/i),
            description: "Ability to exit positions",
          },
          {
            name: "Counterparty",
            value: categoryScore(/counterparty/i),
            description: "Risk from other parties",
          },
        ],
        recommendations: assessment.assessment.recommendations || [
          "Consider diversifying your liquidity pool investments",
          "Monitor impermanent loss in your current positions",
          "Reduce exposure to high volatility pairs",
        ],
      })
    } catch (error) {
      console.error("Error in risk assessment API:", error)
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "Failed to fetch risk assessment" },
        { status: 500 },
      )
    }
  })
}
