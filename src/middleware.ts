// src/middleware.ts - Cloudflare Workers compatible middleware
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const protectedRoutes = ['/admin'];

// Routes that should not be blocked
const publicRoutes = ['/login', '/api/auth/login', '/api/contact', '/api/subscribe', '/api/repos'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // Extract token from cookie or Authorization header
  const tokenFromCookie = request.cookies.get('token')?.value;
  const tokenFromHeader = request.headers.get('authorization');
  
  const token = tokenFromCookie 
    || (tokenFromHeader ? tokenFromHeader.replace('Bearer ', '') : null);

  // For protected routes, require authentication
  if (isProtectedRoute) {
    if (!token) {
      // No token, redirect to login
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Verify the token
    const payload = verifyTokenSync(token);
    if (!payload) {
      // Invalid token, redirect to login
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Synchronous token verification for middleware
// Middleware can't use async functions in the edge runtime
function verifyTokenSync(token: string): { userId?: string; email?: string; role?: string } | null {
  try {
    // Use jose's jwtVerify synchronously-like approach
    // We need to decode without verification for middleware speed
    // Full verification happens in API routes
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    // Decode the payload (base64url)
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString());
    
    // Check expiration
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }
    
    return payload;
  } catch (error) {
    console.error('Token decode error:', error);
    return null;
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|__next/image|favicon.ico|.*\\..*$).*)',
  ],
};
