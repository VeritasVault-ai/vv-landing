/**
 * UI-related constants
 */
export const NAVIGATION_ITEM_TYPES = {
  LINK: 'link',
  DROPDOWN: 'dropdown',
  BUTTON: 'button',
  SEPARATOR: 'separator',
} as const;

export const POSITION_TYPES = {
  HEADER: 'header',
  FOOTER: 'footer',
  BOTH: 'both',
} as const;

export const ICON_POSITIONS = {
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
  NONE: 'none',
  BOTH: 'both',
} as const;

export const ICON_SIZES = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  '2XL': '2xl',
  '3XL': '3xl',
  '4XL': '4xl',
  '5XL': '5xl',
  CUSTOM: 'custom',
} as const;