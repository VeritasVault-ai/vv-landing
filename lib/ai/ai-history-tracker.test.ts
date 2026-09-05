import { describe, expect, it } from "vitest"
import { AIHistoryTracker, type AIInteraction } from "./ai-history-tracker"

describe("AIHistoryTracker metadata isolation", () => {
  it("deep-clones nested metadata before storing an interaction", () => {
    const interaction: Omit<AIInteraction, "id" | "timestamp"> = {
      feature: "data-analysis",
      action: "analyze",
      metadata: {
        details: {
          model: "original",
        },
      },
    }
    const tracker = AIHistoryTracker.getInstance()

    tracker.setEnabled(true)
    tracker.clearHistory()
    tracker.recordInteraction(interaction)
    interaction.metadata.details.model = "mutated"

    expect(tracker.getHistory()[0].metadata?.details).toEqual({ model: "original" })
  })
})
