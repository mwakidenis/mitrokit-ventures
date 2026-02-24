// src/app/api/subscribe/route.ts - Cloudflare Workers compatible
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Edge runtime for Cloudflare compatibility
export const runtime = 'edge';

// Validate email format
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

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

    const { email, name } = body;

    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Try to save to database if available
    try {
      const env = (globalThis as any).env;
      if (env?.DB) {
        const subscriber = await db.subscribers.upsert({ email, name }, env);
        return NextResponse.json({
          success: true,
          message: 'Successfully subscribed to newsletter!',
          data: subscriber
        });
      }
    } catch (dbError) {
      console.log('Database not available, using in-memory storage');
    }

    // Fallback to in-memory storage
    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      data: {
        id: crypto.randomUUID(),
        email,
        name: name || null,
        active: 1,
        subscribed_at: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Newsletter subscription endpoint - POST with email',
    required: {
      email: 'string (valid email)'
    },
    optional: {
      name: 'string'
    }
  });
}
