// --- SAFE REBUILD START ---
// Realtime functionality using Pusher for instant admin updates

/**
 * Pusher configuration for real-time updates
 * In production, set NEXT_PUBLIC_PUSHER_KEY and NEXT_PUBLIC_PUSHER_CLUSTER in .env
 */

// Server-side function to trigger events
export async function triggerRealtimeEvent(channel: string, event: string, data: any) {
  const pusher = getPusherServer()
  if (!pusher) return false
  
  try {
    await pusher.trigger(channel, event, data)
    return true
  } catch (error) {
    console.error('Pusher trigger error:', error)
    return false
  }
}

// Get Pusher server instance
function getPusherServer() {
  const key = process.env.PUSHER_KEY
  const secret = process.env.PUSHER_SECRET
  const cluster = process.env.PUSHER_CLUSTER
  
  if (!key || !secret || !cluster) {
    console.warn('Pusher not configured - realtime features disabled')
    return null
  }
  
  // Dynamic import to avoid issues when not configured
  try {
    const Pusher = require('pusher')
    return new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key,
      secret,
      cluster,
      useTLS: true,
    })
  } catch {
    return null
  }
}

// Event types for type safety
export type RealtimeEvent = 
  | 'new-message'
  | 'message-read'
  | 'message-deleted'
  | 'post-published'
  | 'post-unpublished'
  | 'stats-updated'

// Channel names
export const CHANNELS = {
  ADMIN: 'admin-channel',
  PUBLIC: 'public-channel',
} as const

// Event names
export const EVENTS = {
  NEW_MESSAGE: 'new-message',
  MESSAGE_READ: 'message-read',
  MESSAGE_DELETED: 'message-deleted',
  POST_PUBLISHED: 'post-published',
  POST_UNPUBLISHED: 'post-unpublished',
  STATS_UPDATED: 'stats-updated',
} as const

/**
 * Notify admin of new message (call after contact form submission)
 */
export async function notifyNewMessage(message: {
  id: string
  name: string
  email: string
  subject?: string
  createdAt: string
}) {
  return triggerRealtimeEvent(CHANNELS.ADMIN, EVENTS.NEW_MESSAGE, message)
}

/**
 * Notify admin of message status change
 */
export async function notifyMessageRead(messageId: string) {
  return triggerRealtimeEvent(CHANNELS.ADMIN, EVENTS.MESSAGE_READ, { messageId })
}

/**
 * Notify admin when stats change
 */
export async function notifyStatsUpdate(stats: any) {
  return triggerRealtimeEvent(CHANNELS.ADMIN, EVENTS.STATS_UPDATED, stats)
}

// Client-side subscription hook would be in a separate file
// Example usage in a client component:
// import Pusher from 'pusher-js'
// useEffect(() => {
//   const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
//     cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER
//   })
//   const channel = pusher.subscribe('admin-channel')
//   channel.bind('new-message', (data) => {
//     // Update state with new message
//   })
//   return () => pusher.unsubscribe('admin-channel')
// }, [])

// --- SAFE REBUILD END ---
