/**
 * Service for handling navigation items
 * Uses static data instead of API calls to avoid network errors
 */

import { STATIC_NAVIGATION } from "../static-data"
import type { NavigationItem } from "../models/types"

export const navigationService = {
  getAll(): NavigationItem[] {
    return STATIC_NAVIGATION
  },

  getByGroup(group: string): NavigationItem[] {
    return STATIC_NAVIGATION.filter((item) => item.group === group)
  },
}
