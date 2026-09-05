/**
 * Authentication is deliberately unavailable until the approved Mystira OIDC
 * integration lands. Callers that still depend on this migration bridge must
 * fail closed instead of accepting a legacy NextAuth or Supabase session.
 */
export interface LegacySession {
  user: {
    id: string
  }
}

export const getSession = async (_request?: Request): Promise<LegacySession | null> => null
