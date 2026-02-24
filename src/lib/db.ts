// src/lib/db.ts - Database Utility
// Uses Vercel Postgres / database or falls back to in-memory for development

interface Env {
  mitrokit_ventures: D1Database;
}

// Type for user records
interface User {
  id: string;
  email: string;
  password_hash: string;
  name: string | null;
  role: string;
  created_at: string;
}

// Type for message records
interface Message {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  content: string;
  read: number;
  archived: number;
  created_at: string;
  user_id: string;
}

// Type for subscriber records
interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  active: number;
  subscribed_at: string;
  unsubscribed_at: string | null;
}

// Demo users for development/testing (when D1 is not available)
const DEMO_USERS: User[] = [
  {
    id: '1',
    email: 'admin@mitrokit.com',
    password_hash: 'admin123', // In production, use bcrypt hashes
    name: 'Mwaki Denis',
    role: 'ADMIN',
    created_at: new Date().toISOString(),
  }
];

// In-memory storage for development
let DEMO_MESSAGES: Message[] = [];
let DEMO_SUBSCRIBERS: Subscriber[] = [];

/**
 * Get the D1 database binding from the environment
 */
function getDb(env: Env): D1Database | null {
  return env.mitrokit_ventures || null;
}

/**
 * Check if we're running in a serverless environment
 */
function isServerless(): boolean {
  return !!process.env.VERCEL || !!process.env.NEXT_RUNTIME;
}

/**
 * Database operations - User
 */
export const db = {
  users: {
    /**
     * Find a user by email
     */
    findByEmail: async (email: string, env: Env): Promise<User | null> => {
      const d1 = getDb(env);
      
      if (d1) {
        try {
          const result = await d1.prepare(
            'SELECT * FROM users WHERE email = ?'
          ).bind(email).first<User>();
          return result || null;
        } catch (error) {
          console.error('D1 query error:', error);
        }
      }
      
      // Fallback to demo users
      return DEMO_USERS.find(u => u.email === email) || null;
    },

    /**
     * Find a user by ID
     */
    findById: async (id: string, env: Env): Promise<User | null> => {
      const d1 = getDb(env);
      
      if (d1) {
        try {
          const result = await d1.prepare(
            'SELECT * FROM users WHERE id = ?'
          ).bind(id).first<User>();
          return result || null;
        } catch (error) {
          console.error('D1 query error:', error);
        }
      }
      
      return DEMO_USERS.find(u => u.id === id) || null;
    },

    /**
     * Create a new user
     */
    create: async (data: { 
      email: string; 
      password_hash: string; 
      name?: string; 
      role?: string;
    }, env: Env): Promise<User | null> => {
      const d1 = getDb(env);
      const id = crypto.randomUUID();
      const now = new Date().toISOString();
      const role = data.role || 'USER';
      
      if (d1) {
        try {
          await d1.prepare(
            'INSERT INTO users (id, email, password_hash, name, role, created_at) VALUES (?, ?, ?, ?, ?, ?)'
          ).bind(id, data.email, data.password_hash, data.name || null, role, now).run();
          
          return {
            id,
            email: data.email,
            password_hash: data.password_hash,
            name: data.name || null,
            role,
            created_at: now,
          };
        } catch (error) {
          console.error('D1 insert error:', error);
        }
      }
      
      return null;
    },
  },

  messages: {
    /**
     * Create a new message
     */
    create: async (data: {
      name: string;
      email: string;
      subject?: string;
      content: string;
      user_id: string;
    }, env: Env): Promise<Message | null> => {
      const d1 = getDb(env);
      const id = crypto.randomUUID();
      const now = new Date().toISOString();
      
      if (d1) {
        try {
          await d1.prepare(
            'INSERT INTO messages (id, name, email, subject, content, read, archived, created_at, user_id) VALUES (?, ?, ?, ?, ?, 0, 0, ?, ?)'
          ).bind(id, data.name, data.email, data.subject || '', data.content, now, data.user_id).run();
          
          return {
            id,
            name: data.name,
            email: data.email,
            subject: data.subject || null,
            content: data.content,
            read: 0,
            archived: 0,
            created_at: now,
            user_id: data.user_id,
          };
        } catch (error) {
          console.error('D1 insert error:', error);
        }
      }
      
      // Fallback to in-memory
      const message: Message = {
        id,
        name: data.name,
        email: data.email,
        subject: data.subject || null,
        content: data.content,
        read: 0,
        archived: 0,
        created_at: now,
        user_id: data.user_id,
      };
      DEMO_MESSAGES.push(message);
      return message;
    },

    /**
     * Get all messages
     */
    findAll: async (env: Env): Promise<Message[]> => {
      const d1 = getDb(env);
      
      if (d1) {
        try {
          const result = await d1.prepare(
            'SELECT * FROM messages ORDER BY created_at DESC'
          ).all<Message>();
          return result.results || [];
        } catch (error) {
          console.error('D1 query error:', error);
        }
      }
      
      return DEMO_MESSAGES;
    },
  },

  subscribers: {
    /**
     * Create or update a subscriber
     */
    upsert: async (data: {
      email: string;
      name?: string;
    }, env: Env): Promise<Subscriber | null> => {
      const d1 = getDb(env);
      const id = crypto.randomUUID();
      const now = new Date().toISOString();
      
      if (d1) {
        try {
          // Try to update first
          const updateResult = await d1.prepare(
            'UPDATE subscribers SET active = 1, unsubscribed_at = NULL WHERE email = ?'
          ).bind(data.email).run();
          
          if (updateResult.success && (updateResult.meta?.rows_written || 0) > 0) {
            const subscriber = await d1.prepare(
              'SELECT * FROM subscribers WHERE email = ?'
            ).bind(data.email).first<Subscriber>();
            return subscriber || null;
          }
          
          // Insert if not found
          await d1.prepare(
            'INSERT INTO subscribers (id, email, name, active, subscribed_at) VALUES (?, ?, ?, 1, ?)'
          ).bind(id, data.email, data.name || null, now).run();
          
          return {
            id,
            email: data.email,
            name: data.name || null,
            active: 1,
            subscribed_at: now,
            unsubscribed_at: null,
          };
        } catch (error) {
          console.error('D1 upsert error:', error);
        }
      }
      
      // Fallback to in-memory
      const existing = DEMO_SUBSCRIBERS.find(s => s.email === data.email);
      if (existing) {
        existing.active = 1;
        existing.unsubscribed_at = null;
        return existing;
      }
      
      const subscriber: Subscriber = {
        id,
        email: data.email,
        name: data.name || null,
        active: 1,
        subscribed_at: now,
        unsubscribed_at: null,
      };
      DEMO_SUBSCRIBERS.push(subscriber);
      return subscriber;
    },

    /**
     * Check if email is subscribed
     */
    findByEmail: async (email: string, env: Env): Promise<Subscriber | null> => {
      const d1 = getDb(env);
      
      if (d1) {
        try {
          const result = await d1.prepare(
            'SELECT * FROM subscribers WHERE email = ? AND active = 1'
          ).bind(email).first<Subscriber>();
          return result || null;
        } catch (error) {
          console.error('D1 query error:', error);
        }
      }
      
      return DEMO_SUBSCRIBERS.find(s => s.email === email && s.active === 1) || null;
    },
  },
};

/**
 * Simple password verification (for demo purposes)
 * In production, use bcrypt.compare with proper hashing
 */
export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  // For demo users with plain text passwords
  if (hashedPassword === 'admin123') {
    return plainPassword === 'admin123';
  }
  
  // For production, you would use bcrypt
  // This requires the bcryptjs package in production
  // import { compare } from 'bcryptjs';
  // return await compare(plainPassword, hashedPassword);
  
  // Simple comparison for now (NOT SECURE FOR PRODUCTION)
  return plainPassword === hashedPassword;
}
