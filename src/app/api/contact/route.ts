import { NextResponse } from 'next/server'

// Edge runtime for Cloudflare compatibility
export const runtime = 'edge'

// Mock messages storage - in production use Prisma/Database
const messages: any[] = []

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validateContactInput(data: any) {
  const errors: string[] = []
  
  if (!data.name || data.name.length < 2) {
    errors.push('Name must be at least 2 characters')
  }
  
  if (!data.email || !validateEmail(data.email)) {
    errors.push('Valid email is required')
  }
  
  if (!data.content || data.content.length < 10) {
    errors.push('Message must be at least 10 characters')
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
    const errors = validateContactInput(body)
    
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

    const { name, email, subject, content } = body

    // Create message object
    const message = {
      id: Date.now().toString(),
      name,
      email,
      subject: subject || '',
      content,
      read: false,
      archived: false,
      createdAt: new Date().toISOString(),
      userId: '1',
    }

    // In production, save to database
    messages.push(message)

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
      data: message
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Return all messages (admin only in production)
  return NextResponse.json({
    success: true,
    data: messages
  })
}
