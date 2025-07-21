import { createClient } from "@/lib/supabase/supabase-client"

/**
 * Service for logging errors
 */
export class ErrorLoggingService {
  /**
   * Log an error to the database and console
   * @param source Source of the error (e.g., API endpoint, component)
   * @param error The error object or message
   * @param context Additional context about the error
   */
  static async logError(source: string, error: Error | string, context: Record<string, any> = {}): Promise<void> {
    const errorMessage = error instanceof Error ? error.message : error
    const errorStack = error instanceof Error ? error.stack : undefined

    // Log to console
    console.error(`[${source}] Error:`, errorMessage)
    if (errorStack) {
      console.error(errorStack)
    }
    if (Object.keys(context).length > 0) {
      console.error("Context:", context)
    }

    try {
      // Log to database
      const supabase = createClient()
      await supabase.from("error_logs").insert({
        source,
        message: errorMessage,
        stack: errorStack,
        context: context,
        created_at: new Date().toISOString(),
      })
    } catch (loggingError) {
      // If logging to the database fails, just log to console
      console.error("Failed to log error to database:", loggingError)
    }
  }
}
