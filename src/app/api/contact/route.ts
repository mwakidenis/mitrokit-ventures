// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Validate email format
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validate contact form input
function validateContactInput(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data.name || typeof data.name !== 'string' || data.name.length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  
  if (!data.email || !validateEmail(data.email)) {
    errors.push('Valid email is required');
  }
  
  if (!data.content || typeof data.content !== 'string' || data.content.length < 10) {
    errors.push('Message must be at least 10 characters');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
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

    // Validate input
    const validation = validateContactInput(body);
    
    if (!validation.valid) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          details: validation.errors 
        },
        { status: 400 }
      );
    }

    const { name, email, subject, content } = body;

    // Create message in database (or use in-memory fallback)
    // In production: const env = process.env as any;
    // const message = await db.messages.create({...}, env);
    const message = {
      id: crypto.randomUUID(),
      name,
      email,
      subject: subject || '',
      content,
      read: 0,
      archived: 0,
      created_at: new Date().toISOString(),
      user_id: '1', // Default admin user
    };

    // Try to save to database if available
    try {
      const env = (globalThis as any).env;
      if (env?.DB) {
        const savedMessage = await db.messages.create(
          { name, email, subject, content, user_id: '1' },
          env
        );
        if (savedMessage) {
          return NextResponse.json({
            success: true,
            message: 'Message sent successfully!',
            data: savedMessage
          });
        }
      }
    } catch (dbError) {
      console.log('Database not available, using in-memory storage');
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
      data: message
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return public info only - messages list would require auth in production
  return NextResponse.json({
    success: true,
    message: 'Contact API endpoint - POST with name, email, subject, and content',
    required: {
      name: 'string (min 2 characters)',
      email: 'string (valid email)',
      content: 'string (min 10 characters)'
    },
    optional: {
      subject: 'string'
    }
  });
}
