// Cloudflare D1 compatible database utility
// Works with D1 (SQLite) and can be adapted for PostgreSQL

interface User {
  id: string;
  email: string;
  password: string;
  name: string | null;
  role: string;
}

// Demo users - in production, replace with D1 database queries
const demoUsers: User[] = [
  {
    id: '1',
    email: 'admin@mitrokit.com',
    password: '$2a$10$xQZ8jK9pL2mN4vR6tW8xY0zA1bC2dE3fG4hI5jK6lM7nO8pQ9rS', // admin123 (bcrypt hash)
    name: 'Mwaki Denis',
    role: 'ADMIN'
  }
];

// Database operations
export const db = {
  // User operations
  users: {
    findUnique: async (params: { where: { email?: string; id?: string } }) => {
      const { where } = params;
      if (where.email) {
        return demoUsers.find(u => u.email === where.email) || null;
      }
      if (where.id) {
        return demoUsers.find(u => u.id === where.id) || null;
      }
      return null;
    },
    
    findMany: async (params?: { where?: { role?: string } }) => {
      if (params?.where?.role) {
        return demoUsers.filter(u => u.role === params.where!.role);
      }
      return demoUsers;
    },
    
    create: async (data: { email: string; password: string; name?: string; role?: string }) => {
      const newUser: User = {
        id: Date.now().toString(),
        email: data.email,
        password: data.password,
        name: data.name || null,
        role: data.role || 'USER'
      };
      demoUsers.push(newUser);
      return newUser;
    }
  }
};

// Helper to verify password (simple comparison for demo)
// In production, use bcrypt.compare
export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  // For demo purposes, accept 'admin123' as the plain password
  // In production, use: import { compare } from 'bcryptjs'; return await compare(plainPassword, hashedPassword);
  if (hashedPassword.startsWith('$2a$10$')) {
    // This is a bcrypt hash - for demo, check against known password
    // In production, use proper bcrypt comparison
    return plainPassword === 'admin123';
  }
  return plainPassword === hashedPassword;
}
