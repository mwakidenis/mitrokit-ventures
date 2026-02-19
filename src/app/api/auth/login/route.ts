// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server'
import { createToken, verifyToken } from '@/lib/jwt'

// Edge runtime for Cloudflare compatibility
export const runtime = 'edge'

// Mock users database - in production this would come from Prisma
const users = [
  {
    id: '1',
    email: 'admin@mitrokit.com',
    password: '$2a$10$xQZ8jK9pL2mN4vR6tW8xY0zA1bC2dE3fG4hI5jK6lM7nO8pQ9rS', // bcrypt hash for admin123
    name: 'Mwaki Denis',
    role: 'ADMIN'
  }
]

// Login handler
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = users.find(u => u.email === email)
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // For demo, accept 'admin123' as password
    // In production, use bcrypt.compare(password, user.password)
    const isValid = password === 'admin123'
    
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = await createToken({
      userId: user.id,
      email: user.email,
      role: user.role
    })

    return NextResponse.json({
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
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
