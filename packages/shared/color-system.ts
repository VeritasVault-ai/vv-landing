// Color System for Neural Liquid
// This file defines the color system used throughout the application

// Primary accent colors
export const colors = {
  primary: {
    default: "#3b82f6", // blue-500
    hover: "#2563eb", // blue-600
    active: "#1d4ed8", // blue-700
    light: "#dbeafe", // blue-100
  },
  secondary: {
    default: "#6366f1", // indigo-500
    hover: "#4f46e5", // indigo-600
    active: "#4338ca", // indigo-700
    light: "#e0e7ff", // indigo-100
  },
  success: {
    default: "#10b981", // emerald-500
    hover: "#059669", // emerald-600
    active: "#047857", // emerald-700
    light: "#d1fae5", // emerald-100
  },
  warning: {
    default: "#f59e0b", // amber-500
    hover: "#d97706", // amber-600
    active: "#b45309", // amber-700
    light: "#fef3c7", // amber-100
  },
  danger: {
    default: "#ef4444", // red-500
    hover: "#dc2626", // red-600
    active: "#b91c1c", // red-700
    light: "#fee2e2", // red-100
  },
  neutral: {
    100: "#FFFFFF",
    200: "#F8F9FA",
    300: "#E9ECEF",
    400: "#DEE2E6",
    500: "#CED4DA",
    600: "#ADB5BD",
    700: "#6C757D",
    800: "#343A40",
    900: "#212529",
  },

  // Background gradients
  gradients: {
    // Dark mode gradients
    dark: {
      primary: "linear-gradient(135deg, #0D1B2A 0%, #1A1A2E 100%)",
      secondary: "linear-gradient(135deg, #0F3443 0%, #1A1A2E 100%)",
      dashboard: "linear-gradient(135deg, #0A192F 0%, #162A4A 100%)",
      strategy: "linear-gradient(135deg, #1A1A2E 0%, #2C2C54 100%)",
      docs: "linear-gradient(135deg, #121212 0%, #1E1E1E 100%)",
    },
    // Light mode gradients
    light: {
      primary: "linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 100%)",
      secondary: "linear-gradient(135deg, #E9ECEF 0%, #DEE2E6 100%)",
      dashboard: "linear-gradient(135deg, #F1F3F5 0%, #E9ECEF 100%)",
      strategy: "linear-gradient(135deg, #EFF1F3 0%, #E2E6EA 100%)",
      docs: "linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)",
    },
  },

  // Data visualization palette (colorblind-friendly)
  dataViz: {
    blue: "#3b82f6", // blue-500
    indigo: "#6366f1", // indigo-500
    purple: "#8b5cf6", // purple-500
    pink: "#ec4899", // pink-500
    red: "#ef4444", // red-500
    orange: "#f97316", // orange-500
    amber: "#f59e0b", // amber-500
    yellow: "#eab308", // yellow-500
    lime: "#84cc16", // lime-500
    green: "#10b981", // emerald-500
    teal: "#14b8a6", // teal-500
    cyan: "#06b6d4", // cyan-500
  },

  // Special accents
  special: {
    gold: "rgba(255, 215, 0, 0.15)", // Gold with 15% opacity for wealth sections
    neural: "#8A2BE2", // Purple for AI/neural network elements
  },
}

// Helper function to apply a gradient overlay to a component
export const applyGradientOverlay = (baseColor: string, opacity = 0.03) => {
  return `linear-gradient(135deg, ${baseColor}00 0%, ${baseColor}${Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0")} 100%)`
}

// Animation keyframes for color transitions
export const colorAnimations = {
  pulse: {
    primary: "pulse-primary 2s infinite",
    success: "pulse-success 2s infinite",
    warning: "pulse-warning 2s infinite",
  },
}

// CSS variables to be injected into the root
export const cssVariables = `
  :root {
    --color-primary: ${colors.primary.default};
    --color-primary-hover: ${colors.primary.hover};
    --color-primary-active: ${colors.primary.active};
    --color-primary-light: ${colors.primary.light};
    
    --color-secondary: ${colors.secondary.default};
    --color-secondary-hover: ${colors.secondary.hover};
    --color-secondary-active: ${colors.secondary.active};
    --color-secondary-light: ${colors.secondary.light};
    
    --color-success: ${colors.success.default};
    --color-success-hover: ${colors.success.hover};
    --color-success-active: ${colors.success.active};
    --color-success-light: ${colors.success.light};
    
    --color-warning: ${colors.warning.default};
    --color-warning-hover: ${colors.warning.hover};
    --color-warning-active: ${colors.warning.active};
    --color-warning-light: ${colors.warning.light};
    
    --color-danger: ${colors.danger.default};
    --color-danger-hover: ${colors.danger.hover};
    --color-danger-active: ${colors.danger.active};
    --color-danger-light: ${colors.danger.light};
    
    --gradient-primary-dark: ${colors.gradients.dark.primary};
    --gradient-secondary-dark: ${colors.gradients.dark.secondary};
    --gradient-dashboard-dark: ${colors.gradients.dark.dashboard};
    --gradient-strategy-dark: ${colors.gradients.dark.strategy};
    --gradient-docs-dark: ${colors.gradients.dark.docs};
    
    --gradient-primary-light: ${colors.gradients.light.primary};
    --gradient-secondary-light: ${colors.gradients.light.secondary};
    --gradient-dashboard-light: ${colors.gradients.light.dashboard};
    --gradient-strategy-light: ${colors.gradients.light.strategy};
    --gradient-docs-light: ${colors.gradients.light.docs};
    
    --special-gold: ${colors.special.gold};
    --special-neural: ${colors.special.neural};
  }
  
  @keyframes pulse-primary {
    0% { box-shadow: 0 0 0 0 rgba(58, 134, 255, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(58, 134, 255, 0); }
    100% { box-shadow: 0 0 0 0 rgba(58, 134, 255, 0); }
  }
  
  @keyframes pulse-success {
    0% { box-shadow: 0 0 0 0 rgba(6, 214, 160, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(6, 214, 160, 0); }
    100% { box-shadow: 0 0 0 0 rgba(6, 214, 160, 0); }
  }
  
  @keyframes pulse-warning {
    0% { box-shadow: 0 0 0 0 rgba(255, 209, 102, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(255, 209, 102, 0); }
    100% { box-shadow: 0 0 0 0 rgba(255, 209, 102, 0); }
  }
`
