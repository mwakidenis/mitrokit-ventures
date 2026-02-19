// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server'
import { createToken } from '@/lib/jwt' // Only import what you need

export const runtime = 'edge' // Cloudflare Edge runtime

// Mock users database
const users = [
  {
    id: '1',
    email: 'admin@mitrokit.com',
    password: '$2a$10$xQZ8jK9pL2mN4vR6tW8xY0zA1bC2dE3fG4hI5jK6lM7nO8pQ9rS', // bcrypt hash for admin123
    name: 'Mwaki Denis',
    role: 'ADMIN'
  }
]

// POST handler only — do not export verifyToken or any other function
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const user = users.find(u => u.email === email)
    if (!user || password !== 'admin123') {
      // demo password check; replace with bcrypt.compare in production
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

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
