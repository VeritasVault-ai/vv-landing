/**
 * UI-related types
 */
import { NAVIGATION_ITEM_TYPES, POSITION_TYPES, ICON_POSITIONS, ICON_SIZES } from '../constants/ui';

export type NavigationItemType = typeof NAVIGATION_ITEM_TYPES[keyof typeof NAVIGATION_ITEM_TYPES];
export type PositionType = typeof POSITION_TYPES[keyof typeof POSITION_TYPES];
export type IconPosition = typeof ICON_POSITIONS[keyof typeof ICON_POSITIONS];
export type IconSize = typeof ICON_SIZES[keyof typeof ICON_SIZES];