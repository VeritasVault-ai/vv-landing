import { STATIC_NAVIGATION, STATIC_CONTENT } from "../static-data"
import type { ContentBlock, NavigationItem } from "../models/types"

export const contentService = {
  getContent(id: string): ContentBlock {
    const content = STATIC_CONTENT.find((item) => item.id === id)
    return (
      content || {
        id,
        title: "Content Unavailable",
        content: "Content could not be loaded",
        type: "text",
      }
    )
  },

  getPageContent(page: string): ContentBlock[] {
    // In a real implementation, this would filter by page
    return STATIC_CONTENT
  },

  getAllContent(): ContentBlock[] {
    return STATIC_CONTENT
  },

  getNavigation(): NavigationItem[] {
    return STATIC_NAVIGATION
  },

  getNavigationByGroup(group: string): NavigationItem[] {
    return STATIC_NAVIGATION.filter((item) => item.group === group)
  },
}
