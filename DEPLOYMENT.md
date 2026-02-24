# Mitrokit Ventures - Cloudflare Workers Deployment Guide

## Quick Fix for Local Build Issues

If you're getting "'next' is not recognized" error, you need to reinstall dependencies:

### Step 1: Close all terminals and VSCode

### Step 2: Delete node_modules and lock file
```
bash
# In PowerShell (as Administrator)
cd "C:\Users\user\Desktop\mitrokit ventures"
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
```

### Step 3: Clean npm cache
```
bash
npm cache clean --force
```

### Step 4: Install fresh dependencies
```
bash
npm install
```

### Step 5: Build and deploy
```
bash
npm run build
npx wrangler deploy
```

## GitHub Actions Deployment (No Local Build Needed)

The workflow is configured to build and deploy automatically when you push to `main`.

### Required GitHub Secrets

Add these in your repo Settings → Secrets and variables → Actions:

| Secret | Value |
|--------|-------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API Token (Workers Edit permission) |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare Account ID |
| `ADMIN_PASSWORD` | ayDIh0ZrYoTAwN6Uk4JqXg== |
| `JWT_SECRET` | c4IftswT/e6qkxoN3JVzr8K8V2SyWBogPofDW7pO9L8= |
| `NEXT_PUBLIC_SITE_URL` | https://mitrokit-ventures-final.mwakidenice.workers.dev |

## Manual Cloudflare Deployment

Once dependencies are installed:

```
bash
# Build Next.js
npm run build:next

# Convert to Cloudflare Pages format
npm run build:cloudflare

# Deploy
npx wrangler deploy
```

## Cloudflare Worker Details

- **Worker Name**: mitrokit-ventures-final
- **Domain**: mitrokit-ventures-final.mwakidenice.workers.dev
- **D1 Database**: mitrokit-ventures (ID: aebc2d6e-fee4-4333-99eb-d2113f312f27)

## Testing API Endpoints

After deployment, test these endpoints:

```
bash
# Login API
curl -X POST "https://mitrokit-ventures-final.mwakidenice.workers.dev/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@mitrokit.com\",\"password\":\"admin123\"}"

# Contact API
curl -X POST "https://mitrokit-ventures-final.mwakidenice.workers.dev/api/contact" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"content\":\"Test message\"}"

# Subscribe API
curl -X POST "https://mitrokit-ventures-final.mwakidenice.workers.dev/api/subscribe" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\"}"
```

## Troubleshooting

### Build Fails
- Ensure Node.js 18+ is installed
- Delete node_modules and reinstall

### Secrets Not Working
- Run: `npx wrangler secret put ADMIN_PASSWORD`
- Run: `npx wrangler secret put JWT_SECRET`

### D1 Database Issues
- Push schema: `npx wrangler d1 execute mitrokit-ventures --remote --file=./database-schema.sql`
