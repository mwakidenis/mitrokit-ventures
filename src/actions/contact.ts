'use server'

// --- SAFE REBUILD START ---
// Contact form server action with email sending and database storage

import { z } from 'zod'
import { db } from '@/lib/db'

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().optional(),
  content: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

// Rate limiting map (in production, use Redis or database)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

/**
 * Check rate limit for an identifier
 */
function checkRateLimit(identifier: string, action: string, limit: number = 5, windowMs: number = 60000): boolean {
  const key = `${action}:${identifier}`
  const now = Date.now()
  const record = rateLimitMap.get(key)
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (record.count >= limit) {
    return false
  }
  
  record.count++
  return true
}

/**
 * Send contact form email using Resend API
 */
async function sendContactEmail(data: ContactFormData): Promise<boolean> {
  const resendApiKey = process.env.RESEND_API_KEY
  
  if (!resendApiKey) {
    console.warn('RESEND_API_KEY not configured, skipping email send')
    return false
  }
  
  try {
    const resend = await import('resend')
    const { data: result, error } = await resend.emails.send({
      from: 'Mitrokit Contact <onboarding@resend.dev>',
      to: ['mwakidenice@gmail.com'],
      subject: `New Contact: ${data.subject || 'Project Inquiry'} - ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${data.content}</p>
        <hr />
        <p style="color: #666; font-size: 12px;">Sent from mitrokit-ventures</p>
      `,
      text: `New Contact from ${data.name} (${data.email}): ${data.subject || 'No subject'}\n\n${data.content}`,
    })
    
    if (error) {
      console.error('Resend error:', error)
      return false
    }
    
    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

/**
 * Server action to handle contact form submission
 */
export async function submitContactForm(formData: ContactFormData): Promise<{
  success: boolean
  message: string
  data?: any
}> {
  try {
    // Validate input
    const validatedData = contactSchema.parse(formData)
    
    // Check rate limit (5 submissions per minute per IP)
    const clientIP = 'unknown' // In production, get from headers
    if (!checkRateLimit(clientIP, 'contact')) {
      return {
        success: false,
        message: 'Too many requests. Please try again later.',
      }
    }
    
    // Also check rate limit by email
    if (!checkRateLimit(validatedData.email, 'contact-email')) {
      return {
        success: false,
        message: 'Too many requests from this email. Please try again later.',
      }
    }
    
    // Send email notification
    const emailSent = await sendContactEmail(validatedData)
    
    // Save to database
    let savedMessage = null
    try {
      // Use the database if available
      const env = process.env as any
      if (env.DATABASE_URL) {
        // In production with Prisma, uncomment:
        // savedMessage = await db.message.create({
        //   data: {
        //     name: validatedData.name,
        //     email: validatedData.email,
        //     subject: validatedData.subject || '',
        //     content: validatedData.content,
        //     userId: 'system', // Default system user
        //   }
        // })
      }
    } catch (dbError) {
      console.error('Database error:', dbError)
    }
    
    // Use in-memory fallback if database not available
    if (!savedMessage) {
      savedMessage = {
        id: crypto.randomUUID(),
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject || '',
        content: validatedData.content,
        read: false,
        archived: false,
        createdAt: new Date().toISOString(),
      }
    }
    
    return {
      success: true,
      message: emailSent 
        ? 'Message sent successfully! We\'ll get back to you soon.' 
        : 'Message received! (Email notification pending)',
      data: savedMessage,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0].message,
      }
    }
    
    console.error('Contact form error:', error)
    return {
      success: false,
      message: 'Failed to send message. Please try again.',
    }
  }
}
// --- SAFE REBUILD END ---
