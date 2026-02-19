# TODO: Remove Cloudflare Build Settings

- [ ] Update next.config.js to remove Cloudflare wrapper
- [ ] Delete wrangler.toml (Cloudflare configuration)
- [ ] Delete public/_headers (Cloudflare Pages headers)
- [ ] Remove Cloudflare dependencies from package.json and update the deploy script

# Build Exact Copy Instructions

To build an exact copy of this project, follow these steps:

## 1. Clone the Repository
```
bash
git clone <repository-url>
cd mitrokit-ventures
```

## 2. Install Dependencies
```
bash
npm install
# or
yarn install
```

## 3. Environment Setup
Create a `.env` file in the root directory:
```
env
# Database
DATABASE_URL="file:./dev.db"

# JWT Secret (generate a secure random string)
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# Site URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

## 4. Database Setup
```
bash
# Generate Prisma Client
npm run db:generate
# or
npx prisma generate

# Push Schema to Database
npm run db:push
# or
npx prisma db push
```

## 5. Run Development Server
```
bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 6. Build for Production
```
bash
npm run build
# or
yarn build
```

Then start the production server:
```
bash
npm run start
# or
yarn start
```

## Required Tools
- Node.js 18.x or higher
- npm or yarn
- Git
