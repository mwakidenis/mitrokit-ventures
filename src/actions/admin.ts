'use server'

// --- SAFE REBUILD START ---
// Admin authentication and dashboard server actions

import { z } from 'zod'
import { createToken, verifyToken } from '@/lib/jwt'
import { db } from '@/lib/db'

// Demo admin user (in production, use database)
const ADMIN_USER = {
  id: '1',
  email: 'admin@mitrokit.com',
  password: 'admin123',
  name: 'Mwaki Denis',
  role: 'ADMIN',
}

// Login schema
const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password required'),
})

type LoginData = z.infer<typeof loginSchema>

/**
 * Admin login action
 */
export async function adminLogin(data: LoginData): Promise<{
  success: boolean
  message: string
  token?: string
  user?: { id: string; email: string; name: string; role: string }
}> {
  try {
    const validated = loginSchema.parse(data)
    
    // Check credentials (demo mode - in production use database)
    if (validated.email !== ADMIN_USER.email || validated.password !== ADMIN_USER.password) {
      return { success: false, message: 'Invalid credentials' }
    }
    
    // Create JWT token
    const token = await createToken({
      userId: ADMIN_USER.id,
      email: ADMIN_USER.email,
      role: ADMIN_USER.role,
    })
    
    return {
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: ADMIN_USER.id,
        email: ADMIN_USER.email,
        name: ADMIN_USER.name,
        role: ADMIN_USER.role,
      },
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message }
    }
    return { success: false, message: 'Login failed' }
  }
}

/**
 * Verify admin token
 */
export async function verifyAdminToken(token: string): Promise<{
  valid: boolean
  user?: { id: string; email: string; name: string; role: string }
}> {
  try {
    const payload = await verifyToken(token)
    if (!payload || payload.role !== 'ADMIN') {
      return { valid: false }
    }
    
    return {
      valid: true,
      user: {
        id: payload.userId as string,
        email: payload.email as string,
        name: payload.name as string || 'Admin',
        role: payload.role as string,
      },
    }
  } catch {
    return { valid: false }
  }
}

/**
 * Dashboard statistics
 */
export async function getDashboardStats(): Promise<{
  success: boolean
  data?: {
    totalMessages: number
    unreadMessages: number
    totalPosts: number
    publishedPosts: number
    totalUsers: number
    totalProjects: number
    recentMessages: any[]
    messagesPerDay: { date: string; count: number }[]
  }
  error?: string
}> {
  try {
    // In production, fetch from database
    // For now, return mock data that would come from real database
    
    const env = process.env as any
    
    // Mock data for demonstration
    // In production, replace with actual database queries:
    // const messages = await db.message.findMany({ orderBy: { createdAt: 'desc' }, take: 10 })
    // const posts = await db.blogPost.findMany()
    // const users = await db.user.findMany()
    
    return {
      success: true,
      data: {
        totalMessages: 156,
        unreadMessages: 23,
        totalPosts: 24,
        publishedPosts: 18,
        totalUsers: 45,
        totalProjects: 12,
        recentMessages: [
          { id: '1', name: 'John Doe', subject: 'Project Inquiry', createdAt: new Date().toISOString(), read: false },
          { id: '2', name: 'Sarah Smith', subject: 'Collaboration', createdAt: new Date().toISOString(), read: false },
          { id: '3', name: 'Mike Johnson', subject: 'Job Opportunity', createdAt: new Date().toISOString(), read: true },
        ],
        messagesPerDay: [
          { date: '2024-01-20', count: 5 },
          { date: '2024-01-21', count: 8 },
          { date: '2024-01-22', count: 3 },
          { date: '2024-01-23', count: 12 },
          { date: '2024-01-24', count: 6 },
          { date: '2024-01-25', count: 9 },
          { date: '2024-01-26', count: 4 },
        ],
      },
    }
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return { success: false, error: 'Failed to fetch dashboard stats' }
  }
}

/**
 * Get all messages (for admin)
 */
export async function getMessages(): Promise<{
  success: boolean
  data?: any[]
  error?: string
}> {
  try {
    // In production, fetch from database
    // const messages = await db.message.findMany({ orderBy: { createdAt: 'desc' } })
    
    return {
      success: true,
      data: [
        { id: '1', name: 'John Doe', email: 'john@example.com', subject: 'Project Inquiry', content: 'I would like to discuss a new project...', read: false, createdAt: new Date().toISOString() },
        { id: '2', name: 'Sarah Smith', email: 'sarah@example.com', subject: 'Collaboration', content: 'Let me know if you are interested in...', read: false, createdAt: new Date().toISOString() },
        { id: '3', name: 'Mike Johnson', email: 'mike@example.com', subject: 'Job Opportunity', content: 'We have an opening that might interest you...', read: true, createdAt: new Date().toISOString() },
      ],
    }
  } catch (error) {
    return { success: false, error: 'Failed to fetch messages' }
  }
}

/**
 * Mark message as read
 */
export async function markMessageAsRead(messageId: string): Promise<{
  success: boolean
  message?: string
  error?: string
}> {
  try {
    // In production:
    // await db.message.update({ where: { id: messageId }, data: { read: true } })
    
    return { success: true, message: 'Message marked as read' }
  } catch (error) {
    return { success: false, error: 'Failed to update message' }
  }
}

/**
 * Delete message
 */
export async function deleteMessage(messageId: string): Promise<{
  success: boolean
  message?: string
  error?: string
}> {
  try {
    // In production:
    // await db.message.delete({ where: { id: messageId } })
    
    return { success: true, message: 'Message deleted' }
  } catch (error) {
    return { success: false, error: 'Failed to delete message' }
  }
}

/**
 * Toggle post publish state
 */
export async function togglePostPublish(postId: string): Promise<{
  success: boolean
  published?: boolean
  error?: string
}> {
  try {
    // In production:
    // const post = await db.blogPost.findUnique({ where: { id: postId } })
    // await db.blogPost.update({ where: { id: postId }, data: { published: !post.published } })
    
    return { success: true, published: true }
  } catch (error) {
    return { success: false, error: 'Failed to update post' }
  }
}
// --- SAFE REBUILD END ---
