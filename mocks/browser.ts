import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'
// This is conditionally exported to avoid issues during build
export const worker = typeof window !== 'undefined' 
  ? setupWorker(...handlers)
  : null