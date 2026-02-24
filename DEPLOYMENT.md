# Cloudflare Workers Deployment Guide

This document provides complete instructions for deploying mitrokit-ventures to Cloudflare Workers.

## Architecture Overview

### What's Changed for Cloudflare Workers

1. **No Node.js APIs** - Removed fs, path, crypto (Node version), process-based server logic
2. **No Prisma** - Replaced with Cloudflare D1 (SQLite) or in-memory fallback
3. **JWT via jose** - Uses Web Crypto API (compatible with Workers)
4. **Edge Runtime** - All API routes use `export const runtime = 'edge'`
5. **Environment Bindings** - Secrets managed via Cloudflare wrangler

### Key Files Updated

| File | Purpose |
|------|---------|
| `next.config.js` | Next.js config (no static export) |
| `wrangler.toml` | Cloudflare Workers config with D1 |
| `src/lib/jwt.ts` | JWT using jose + Web Crypto |
| `src/lib/db.ts` | D1 database with in-memory fallback |
| `src/middleware.ts` | Edge-compatible middleware |
| `database-schema.sql` | D1 database schema |

---

## Prerequisites

1. **Node.js 18+** installed
2. **Cloudflare account** with Workers enabled
3. **GitHub account** (for CI/CD)

---

## Local Development

### 1. Install Dependencies

```
bash
npm install
```

### 2. Run Development Server

```
bash
npm run dev
```

This runs Next.js dev server at http://localhost:3000

### 3. Test API Endpoints

```
bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mitrokit.com","password":"admin123"}'

# Contact Form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","content":"Hello world"}'

# Subscribe
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

---

## Build & Deploy

### Option 1: GitHub Actions (Recommended)

1. **Set Secrets in GitHub**

   Go to your repo Settings → Secrets and variables → Actions:

   | Secret | Value |
   |--------|-------|
   | `CLOUDFLARE_API_TOKEN` | Cloudflare API Token (Edit Workers) |
   | `CLOUDFLARE_ACCOUNT_ID` | From Cloudflare dashboard URL |
   | `GITHUB_TOKEN` | GitHub token for repo access |
   | `NEXT_PUBLIC_SITE_URL` | Your workers domain |

2. **Push to Main Branch**

   
```
bash
   git add -A
   git commit -m "Deploy to Cloudflare Workers"
   git push origin main
   
```

3. **Watch Deployment**

   Go to GitHub repo → Actions to monitor the build

### Option 2: Manual Deploy

```
bash
# Install dependencies
npm install

# Build the app
npm run build

# Deploy to Cloudflare Workers
npx wrangler deploy

# Or create a preview
npx wrangler deploy --preview
```

---

## D1 Database Setup

### Create D1 Database

```bash
npx wrangler d1 create mitrokit-ventures
```

This returns a `database_id` - update `wrangler.toml`:

```
toml
[[d1_databases]]
binding = "DB"
database_name = "mitrokit-ventures"
database_id = "YOUR-DATABASE-ID-HERE"
```

### Push Schema

```
bash
# Local development
npx wrangler d1 execute mitrokit-ventures --local --file=./database-schema.sql

# Production
npx wrangler d1 execute mitrokit-ventures --remote --file=./database-schema.sql
```

---

## Environment Variables

### Set Secrets

```
bash
# JWT Secret (generate a secure random string)
npx wrangler secret put JWT_SECRET
# Enter: openssl rand -base64 32

# Admin Password (optional, for production)
npx wrangler secret put ADMIN_PASSWORD
```

### In wrangler.toml

```
toml
[vars]
ENVIRONMENT = "production"
NEXT_PUBLIC_SITE_URL = "https://your-domain.workers.dev"
```

---

## Testing Guide

### 1. Test Login

```
bash
curl -X POST https://your-domain.workers.dev/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mitrokit.com","password":"admin123"}'
```

**Expected Response:**
```
json
{
  "success": true,
  "data": {
    "user": {
      "id": "1",
      "email": "admin@mitrokit.com",
      "name": "Mwaki Denis",
      "role": "ADMIN"
    },
    "token": "eyJhbGc..."
  }
}
```

### 2. Test Contact Form

```
bash
curl -X POST https://your-domain.workers.dev/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","content":"This is a test message"}'
```

**Expected Response:**
```
json
{
  "success": true,
  "message": "Message sent successfully!",
  "data": {
    "id": "uuid-here",
    "name": "Test User",
    "email": "test@example.com",
    "content": "This is a test message",
    "created_at": "2024-..."
  }
}
```

### 3. Test Newsletter Subscription

```
bash
curl -X POST https://your-domain.workers.dev/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"newsubscriber@example.com"}'
```

**Expected Response:**
```
json
{
  "success": true,
  "message": "Successfully subscribed to newsletter!",
  "data": {
    "id": "uuid-here",
    "email": "newsubscriber@example.com",
    "active": 1,
    "subscribed_at": "2024-..."
  }
}
```

### 4. Test Protected Route (401 Expected)

```
bash
curl -X GET https://your-domain.workers.dev/admin
```

**Expected Response:** Redirect to /login (or 401 for API)

### 5. Test with Valid Token

```
bash
# First get a token from login, then:
curl -X GET https://your-domain.workers.dev/admin \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Common Issues & Fixes

### Issue: "D1Database not found"

**Fix:** Add D1 binding in wrangler.toml:
```
toml
[[d1_databases]]
binding = "DB"
database_name = "mitrokit-ventures"
database_id = "YOUR-ID"
```

### Issue: "JWT verification failed"

**Fix:** Set JWT_SECRET:
```
bash
npx wrangler secret put JWT_SECRET
```

### Issue: "Module not found: Can't resolve 'fs'"

**Fix:** This shouldn't happen now. If it does, check that no Node.js-only imports exist in your code.

### Issue: Build fails on Windows

**Fix:** Use GitHub Actions for deployment (runs on Linux)

### Issue: Middleware not working

**Fix:** Ensure middleware uses edge-compatible code (no Node.js imports)

---

## API Endpoints Summary

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/login` | POST | No | User login |
| `/api/contact` | POST | No | Contact form |
| `/api/subscribe` | POST | No | Newsletter |
| `/api/repos` | GET | No | GitHub repos |

---

## Production Checklist

- [ ] Set `JWT_SECRET` via wrangler
- [ ] Set Cloudflare secrets in GitHub
- [ ] Create D1 database and update wrangler.toml
- [ ] Push database schema
- [ ] Test all endpoints
- [ ] Configure custom domain (optional)

---

## Support

For issues, check:
1. GitHub Actions logs
2. Cloudflare Workers logs (dashboard)
3. Browser console for errors
