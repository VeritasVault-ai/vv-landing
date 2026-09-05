import { jwtVerify, type JWTPayload, SignJWT } from "jose"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

// JWT token expiration (24 hours)
const JWT_EXPIRES_IN = "24h"

type AuthenticatedUser = JWTPayload & {
  isAdmin?: boolean
}

function getJwtSecret(): Uint8Array | null {
  const secret = process.env.JWT_SECRET

  if (!secret || secret.length < 32) {
    return null
  }

  return new TextEncoder().encode(secret)
}

/**
 * Generate a JWT token for a user
 */
export async function generateToken(payload: JWTPayload): Promise<string> {
  const secret = getJwtSecret()

  if (!secret) {
    throw new Error("JWT_SECRET must be configured with at least 32 characters")
  }

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(secret)
}

/**
 * Verify a JWT token
 */
export async function verifyToken(token: string): Promise<AuthenticatedUser | null> {
  const secret = getJwtSecret()

  if (!secret) {
    return null
  }

  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as AuthenticatedUser
  } catch (error) {
    return null
  }
}

/**
 * Get the current user from the request
 */
export async function getCurrentUser(req: NextRequest) {
  const token = req.cookies.get("token")?.value || ""

  if (!token) {
    return null
  }

  return await verifyToken(token)
}

/**
 * Middleware to protect API routes
 */
export async function withAuth(
  req: NextRequest,
  handler: (req: NextRequest, user: AuthenticatedUser) => Promise<NextResponse>,
): Promise<NextResponse> {
  const user = await getCurrentUser(req)

  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  }

  return handler(req, user)
}

export async function withAdminAuth(
  req: NextRequest,
  handler: (req: NextRequest, user: AuthenticatedUser) => Promise<NextResponse>,
): Promise<NextResponse> {
  return withAuth(req, async (authenticatedRequest, user) => {
    if (user.isAdmin !== true) {
      return NextResponse.json({ error: "Admin authorization required" }, { status: 403 })
    }

    return handler(authenticatedRequest, user)
  })
}

/**
 * Set authentication cookies
 */
export function setAuthCookies(token: string): void {
  cookies().set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  })
}

/**
 * Clear authentication cookies
 */
export function clearAuthCookies(): void {
  cookies().delete("token")
}
