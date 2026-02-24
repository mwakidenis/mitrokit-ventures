// src/lib/jwt.ts - Cloudflare Workers compatible JWT using Web Crypto API
import { SignJWT, jwtVerify, JWTPayload } from 'jose';

// Get JWT_SECRET from Cloudflare environment bindings
// In development, use process.env or a fallback
function getJwtSecret(): Uint8Array {
  // Try Cloudflare binding first
  const cfSecret = (globalThis as any).JWT_SECRET 
    || (typeof process !== 'undefined' ? process.env.JWT_SECRET : null)
    || 'fallback-dev-secret-change-in-production-min-32-chars';
  
  // Ensure it's at least 32 characters
  const paddedSecret = cfSecret.padEnd(32, '0').slice(0, 32);
  return new TextEncoder().encode(paddedSecret);
}

/**
 * Create a JWT token for authenticated users
 * Compatible with Cloudflare Workers (uses Web Crypto API via jose)
 */
export async function createToken(payload: object): Promise<string> {
  const secret = getJwtSecret();
  
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('24h') // 24 hours expiry
    .sign(secret);
}

/**
 * Verify a JWT token and return the payload
 * Returns null if token is invalid or expired
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const secret = getJwtSecret();
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}

/**
 * Extract token from Authorization header
 * Expected format: "Bearer <token>"
 */
export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader) return null;
  
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }
  
  return parts[1];
}

/**
 * Extract token from cookie
 */
export function extractTokenFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  
  const cookies = cookieHeader.split(';').map(c => c.trim());
  const tokenCookie = cookies.find(c => c.startsWith('token='));
  
  if (!tokenCookie) return null;
  
  return tokenCookie.split('=')[1];
}
