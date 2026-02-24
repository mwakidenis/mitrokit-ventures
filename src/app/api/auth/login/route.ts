// src/app/api/auth/login/route.ts - Cloudflare Workers compatible
import { NextResponse } from 'next/server';
import { createToken } from '@/lib/jwt';
import { db, verifyPassword } from '@/lib/db';

// Edge runtime for Cloudflare compatibility
export const runtime = 'edge';

// Demo users for development (no database required)
const DEMO_USERS = [
  {
    id: '1',
    email: 'admin@mitrokit.com',
    password: 'admin123', // Plain text for demo - use hashed in production
    name: 'Mwaki Denis',
    role: 'ADMIN'
  }
];

export async function POST(request: Request) {
  try {
    let body;
    
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user (try database first, then fall back to demo)
    let user = null;
    
    // Try to find in demo users first
    user = DEMO_USERS.find(u => u.email === email);
    
    if (!user) {
      // In production, you would query the database:
      // const env = process.env as any;
      // user = await db.users.findByEmail(email, env);
    }

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = await createToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });

    // Create response with token in cookie
    const response = NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        token
      }
    });

    // Set token as HTTP-only cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Login endpoint - POST with email and password',
    demo: {
      email: 'admin@mitrokit.com',
      password: 'admin123'
    }
  });
}
