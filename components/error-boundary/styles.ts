/**
 * Tailwind CSS class collections for error boundary components
 */

export const errorStyles = {
  // Container styles
  container: {
    default: "flex flex-col items-center justify-center min-h-[400px] p-6 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg text-center",
    compact: "p-6 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg",
  },
  
  // Icon styles
  icon: {
    large: "h-12 w-12 text-red-500 mb-4",
    small: "h-5 w-5 text-red-500",
  },
  
  // Heading styles
  heading: {
    large: "text-2xl font-bold text-red-700 dark:text-red-400 mb-2",
    small: "text-lg font-medium text-red-700 dark:text-red-400",
  },
  
  // Text styles
  text: {
    default: "text-slate-600 dark:text-slate-300 mb-6 max-w-md",
    compact: "text-slate-600 dark:text-slate-300 mb-4",
  },
  
  // Error details container
  errorDetails: {
    container: "bg-red-100 dark:bg-red-900/30 p-4 rounded-md mb-6 max-w-full overflow-auto text-left",
    message: "font-mono text-sm text-red-800 dark:text-red-300 mb-2",
    stackContainer: "mt-2",
    stackSummary: "text-sm font-medium cursor-pointer",
    stackContent: "mt-2 text-xs overflow-auto p-2 bg-red-50 dark:bg-red-900/50 rounded",
  },
  
  // Button styles
  button: {
    default: "flex items-center gap-2",
    icon: "h-4 w-4",
  },
  
  // Header styles for compact error
  header: {
    compact: "flex items-center gap-3 mb-4",
  },
};