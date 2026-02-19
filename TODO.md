# TODO: Remove Cloudflare Build Settings

- [x] Update next.config.js to remove Cloudflare wrapper
- [x] Delete wrangler.toml (Cloudflare configuration)
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
# If you encounter peer dependency issues, use:
npm install --legacy-peer-deps
```

## 3. Environment Setup
Create a `.env` file in the root directory:
```
env
# Database
DATABASE_URL="file:./dev.db"

# JWT Secret (generate a secure random string for production)
# You can generate one using: openssl rand -base64 32
JWT_SECRET="your-super-secret-jwt-key-change-in-production-min-32-chars"

# Site URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

## 4. Database Setup
```
bash
# Generate Prisma Client
npm run db:generate

# Push Schema to Database
npm run db:push

# Alternative commands:
npx prisma generate
npx prisma db push
```

## 5. Run Development Server
```
bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 6. Build for Production
```
bash
npm run build

# Then start the production server:
npm run start
```

## Project Structure

```
mitrokit-ventures/
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static assets
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/              # API routes
│   │   │   ├── auth/login/   # Authentication endpoint
│   │   │   ├── contact/      # Contact form endpoint
│   │   │   └── subscribe/    # Newsletter endpoint
│   │   ├── admin/            # Admin dashboard
│   │   ├── login/            # Login page
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/            # React components
│   │   ├── layout/           # Navbar, Footer
│   │   └── sections/         # Page sections (Hero, About, Services, Projects, etc.)
│   ├── lib/                   # Utility functions
│   │   ├── jwt.ts            # JWT utilities
│   │   └── utils.ts          # General utilities
│   ├── stores/                # Zustand state stores
│   │   ├── authStore.ts      # Authentication state
│   │   ├── blogStore.ts      # Blog posts state
│   │   ├── projectStore.ts   # Projects state
│   │   └── uiStore.ts        # UI state
│   └── types/                 # TypeScript type definitions
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies
```

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT (jose library)
- **State Management**: Zustand
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form + Zod

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/login` | POST | User authentication |
| `/api/contact` | POST | Contact form submission |
| `/api/subscribe` | POST | Newsletter subscription |

## Default Login Credentials

For development/testing:
- **Email**: admin@mitrokit.com
- **Password**: admin123

## Troubleshooting

### Port Already in Use
If port 3000 is already in use:
```
bash
npm run dev -- -p 3001
```

### Database Issues
Reset the database if needed:
```
bash
npx prisma db push --force-reset
npm run db:generate
```

### Clear Build Cache
```
bash
rm -rf .next
npm run build
```

### Node Modules Issues
If you encounter issues:
```
bash
rm -rf node_modules
rm package-lock.json
npm install
```

## Deployment

### Option 1: Vercel (Recommended)
```
bash
npm i -g vercel
vercel
```

### Option 2: Docker
Create a Dockerfile and build:
```
bash
docker build -t mitrokit-ventures .
docker run -p 3000:3000 mitrokit-ventures
```

### Option 3: Traditional Hosting
```
bash
npm run build
npm run start
```

## Required Tools
- Node.js 18.x or higher
- npm or yarn
- Git

## Features

### Frontend Features
- Responsive design with Tailwind CSS
- Animated hero section with role rotation
- Services showcase
- Portfolio/projects gallery
- Client logos carousel
- Testimonials section
- FAQ accordion
- Blog functionality
- Contact form with validation
- Newsletter subscription

### Backend Features
- RESTful API endpoints
- JWT-based authentication
- SQLite database with Prisma ORM
- Admin dashboard for content management
