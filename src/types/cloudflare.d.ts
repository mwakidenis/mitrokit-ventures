// Cloudflare Workers type declarations
// This file provides TypeScript types for Cloudflare Workers environment

export interface Env {
  mitrokit_ventures: D1Database;
  JWT_SECRET?: string;
  ADMIN_PASSWORD?: string;
}

export interface D1Database {
  prepare(sql: string): D1Statement;
  exec(sql: string): Promise<D1ExecResult>;
}

export interface D1Statement {
  bind(...args: any[]): D1PreparedStatement;
  first<T = any>(params?: any): Promise<T | null>;
  all<T = any>(params?: any): Promise<D1Result<T>>;
  run(...args: any[]): Promise<D1Response>;
}

export interface D1PreparedStatement {
  bind(...args: any[]): D1PreparedStatement;
  first<T = any>(): Promise<T | null>;
  all<T = any>(): Promise<D1Result<T>>;
  run(): Promise<D1Response>;
}

export interface D1Response {
  success: boolean;
  meta?: {
    rows_written?: number;
    rows_read?: number;
    changes?: number;
  };
  error?: string;
}

export interface D1Result<T = any> {
  results: T[];
  success: boolean;
  meta?: {
    rows_written?: number;
    rows_read?: number;
    changes?: number;
  };
}

export interface D1ExecResult {
  count: number;
  duration: number;
}

// Extend the global namespace for Cloudflare Workers
declare global {
  const mitrokit_ventures: D1Database;
  const JWT_SECRET: string;
  const ADMIN_PASSWORD: string;
}
