import { NextResponse } from 'next/server'

// Edge runtime for Cloudflare compatibility
export const runtime = 'edge'

// Mock subscribers storage - in production use Prisma
const subscribers: any[] = []

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validateSubscribeInput(data: any) {
  const errors: string[] = []
  
  if (!data.email || !validateEmail(data.email)) {
    errors.push('Valid email is required')
  }
  
  return errors
}

export async function POST(request: Request) {
  try {
    let body
    
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON' },
        { status: 400 }
      )
    }
    
    // Validate input
    const errors = validateSubscribeInput(body)
    
    if (errors.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          details: errors 
        },
        { status: 400 }
      )
    }

    const { email, name } = body

    // Check if already subscribed
    const existing = subscribers.find(s => s.email === email)
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Email already subscribed' },
        { status: 400 }
      )
    }

    // Create subscriber
    const subscriber = {
      id: Date.now().toString(),
      email,
      name: name || null,
      active: true,
      subscribedAt: new Date().toISOString(),
      unsubscribedAt: null,
    }

    // In production, save to database
    subscribers.push(subscriber)

    return NextResponse.json({
      success: true,
      message: 'Subscribed successfully!',
      data: subscriber
    })
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Return all subscribers (admin only in production)
  return NextResponse.json({
    success: true,
    data: subscribers
  })
}
