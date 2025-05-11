import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

// Secret key for JWT signing/verification
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-at-least-32-chars-long")

// JWT token expiration (24 hours)
const JWT_EXPIRES_IN = "24h"

/**
 * Generate a JWT token for a user
 */
export async function generateToken(payload: any): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(JWT_SECRET)
}

/**
 * Verify a JWT token
 */
export async function verifyToken(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
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
  handler: (req: NextRequest, user: any) => Promise<NextResponse>,
): Promise<NextResponse> {
  const user = await getCurrentUser(req)

  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  }

  return handler(req, user)
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
