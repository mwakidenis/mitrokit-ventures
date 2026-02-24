// src/lib/auth.ts - Cloudflare Workers compatible authentication
import { JWTPayload } from 'jose';
import { verifyToken as verifyTokenFromJwt } from './jwt';

// Types for Cloudflare environment
interface CloudflareEnv {
  DB?: any;
  JWT_SECRET?: string;
  ADMIN_PASSWORD?: string;
}

/**
 * Verify a JWT token
 * Returns the payload if valid, null otherwise
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  return verifyTokenFromJwt(token);
}

/**
 * Check if user is authenticated
 * Returns user info if valid token, null otherwise
 */
export async function getAuthenticatedUser(
  authHeader: string | null,
  cookieToken: string | null
): Promise<{ userId: string; email: string; role: string } | null> {
  // Extract token from header or cookie
  let token: string | null = null;
  
  if (authHeader) {
    const parts = authHeader.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1];
    }
  }
  
  if (!token && cookieToken) {
    token = cookieToken;
  }
  
  if (!token) {
    return null;
  }
  
  const payload = await verifyToken(token);
  if (!payload) {
    return null;
  }
  
  return {
    userId: payload.userId as string,
    email: payload.email as string,
    role: payload.role as string,
  };
}

/**
 * Check if user has required role
 */
export function hasRole(userRole: string, requiredRole: string): boolean {
  const roleHierarchy = ['USER', 'ADMIN', 'SUPER_ADMIN'];
  const userLevel = roleHierarchy.indexOf(userRole);
  const requiredLevel = roleHierarchy.indexOf(requiredRole);
  
  return userLevel >= requiredLevel;
}

/**
 * Require authentication - throws error if not authenticated
 */
export async function requireAuth(
  authHeader: string | null,
  cookieToken: string | null
): Promise<{ userId: string; email: string; role: string }> {
  const user = await getAuthenticatedUser(authHeader, cookieToken);
  
  if (!user) {
    throw new Error('Unauthorized');
  }
  
  return user;
}

/**
 * Require specific role - throws error if not authorized
 */
export async function requireRole(
  authHeader: string | null,
  cookieToken: string | null,
  role: string
): Promise<{ userId: string; email: string; role: string }> {
  const user = await requireAuth(authHeader, cookieToken);
  
  if (!hasRole(user.role, role)) {
    throw new Error('Forbidden');
  }
  
  return user;
}
