import { AnalyticsEvents, AnalyticsCategories } from "./event-constants"

type EventParams = {
  action: string
  category: string
  label?: string
  value?: number
  [key: string]: any
}

export function createEventPayload(
  event: keyof typeof AnalyticsEvents | string,
  category: keyof typeof AnalyticsCategories | string,
  params: Record<string, any> = {},
): EventParams {
  // Get the actual event name if it's a key from AnalyticsEvents
  const action =
    typeof event === "string" && Object.values(AnalyticsEvents).some((group) => Object.values(group).includes(event))
      ? event
      : Object.values(AnalyticsEvents).find((group) => Object.keys(group).includes(event as string))?.[
          event as keyof typeof AnalyticsEvents
        ] || event

  // Get the actual category name if it's a key from AnalyticsCategories
  const categoryValue = Object.values(AnalyticsCategories).includes(category)
    ? category
    : AnalyticsCategories[category as keyof typeof AnalyticsCategories] || category

  return {
    action,
    category: categoryValue,
    ...params,
  }
}
