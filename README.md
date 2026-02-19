# Mitrokit Ventures
<img width="1920" height="1080" alt="Screenshot 2026-02-19 155025" src="https://github.com/user-attachments/assets/3b22f188-c463-43c4-816f-14dbd0a12350" />
A modern, responsive business website built with Next.js 14, React, TypeScript, and Tailwind CSS. This project includes a comprehensive business website with sections for services, projects, testimonials, blog, FAQ, contact form, and more, along with an admin panel for content management.

## Features

### Frontend Features
 <img width="1920" height="1080" alt="Screenshot 2026-02-19 155120" src="https://github.com/user-attachments/assets/d829453a-b89a-437c-928a-05d50c6ebcf9" />
- **Hero Section** - Eye-catching landing area with call-to-action
- **Services** - Showcase your business services
- **Projects/Portfolio** - Display completed projects
- **Clients** - Show client logos/testimonials
- **Testimonials** - Customer reviews and feedback
- **Blog** - Company blog with markdown support
- **FAQ** - Frequently asked questions with accordion
- **About** - Company information
- **Skills** - Team skills and expertise
- **Career** - Job openings and hiring
- **Education** - Educational background/training
- **Contact** - Contact form with email integration
- **App Download** - Mobile app promotion
- **Hire Workflow** - How the hiring process works

### Backend Features
- **Admin Panel** - `/admin` route for content management
- **Authentication** - Secure login with JWT tokens
- **API Routes** - RESTful API endpoints
- **Database** - Prisma ORM with SQLite (easily switchable to PostgreSQL/MySQL)
- **Form Handling** - Contact form with server actions
- **Email Subscription** - Newsletter signup functionality

### Tech Stack
- **Framework**: Next.js 14.2.3
- **Language**: TypeScript
- **UI Library**: React 18.3.1
- **Styling**: Tailwind CSS 3.4.3
- **Animation**: Framer Motion 11.2.4
- **Icons**: Lucide React
- **State Management**: Zustand 4.5.2
- **Database**: Prisma 5.14.0 with SQLite
- **Authentication**: bcryptjs + jsonwebtoken
- **Forms**: React Hook Form + Zod
- **UI Components**: Radix UI (Dialog, Dropdown, Tabs, Toast, Tooltip, Accordion, Select, Label, Slot)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.x or higher
- npm or yarn
- Git

## Installation

1. **Clone the repository**
   
```
bash
   git clone <repository-url>
   cd mitrokit-ventures
   
```

2. **Install dependencies**
   
```
bash
   npm install
   # or
   yarn install
   
```

3. **Environment Setup**
   
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

## Database Setup

1. **Generate Prisma Client**
   
```
bash
   npm run db:generate
   # or
   npx prisma generate
   
```

2. **Push Schema to Database**
   
```
bash
   npm run db:push
   # or
   npx prisma db push
   
```

3. **Run Migrations (if needed)**
   
```
bash
   npm run db:migrate
   # or
   npx prisma migrate dev
   
```

## Running the Development Server

```
bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

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

## Project Structure

```
mitrokit-ventures/
├── prisma/
│   └── schema.prisma          # Database schema
├── public/
│   └── _headers               # Cloudflare headers (for deployment)
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   │   ├── auth/
│   │   │   │   └── login/    # Login endpoint
│   │   │   ├── contact/       # Contact form endpoint
│   │   │   └── subscribe/     # Newsletter subscription
│   │   ├── admin/             # Admin panel
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── login/             # Login page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   └── sections/          # Page sections
│   │       ├── About.tsx
│   │       ├── AppDownload.tsx
│   │       ├── Blog.tsx
│   │       ├── Career.tsx
│   │       ├── Clients.tsx
│   │       ├── Contact.tsx
│   │       ├── Education.tsx
│   │       ├── FAQ.tsx
│   │       ├── Hero.tsx
│   │       ├── HireWorkflow.tsx
│   │       ├── Projects.tsx
│   │       ├── Services.tsx
│   │       ├── Skills.tsx
│   │       └── Testimonials.tsx
│   ├── lib/
│   │   └── utils.ts           # Utility functions
│   ├── stores/                # Zustand stores
│   │   ├── adminStore.ts
│   │   ├── authStore.ts
│   │   ├── blogStore.ts
│   │   ├── projectStore.ts
│   │   └── uiStore.ts
│   ├── types/
│   │   └── index.ts           # TypeScript types
│   └── middleware.ts          # Authentication middleware
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/login` | POST | User authentication |
| `/api/contact` | POST | Contact form submission |
| `/api/subscribe` | POST | Newsletter subscription |

## Authentication

The application uses JWT (JSON Web Tokens) for authentication. To access the admin panel:

1. Navigate to `/login`
2. Enter your credentials
3. Upon successful login, you'll be redirected to `/admin`

### Default Admin User
You'll need to create an admin user through Prisma or use the registration endpoint (if available).

## Deployment

### Vercel (Recommended)
```bash
npm run build
```

Deploy to Vercel with the following settings:
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`

### Cloudflare Pages
```
bash
npm run deploy
```

This will build the project and prepare it for Cloudflare Pages deployment.

### Other Platforms
The project can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Render
- AWS Amplify
- DigitalOcean App Platform

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:migrate` | Run database migrations |
| `npm run deploy` | Build and deploy to Cloudflare |

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Database connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `NEXT_PUBLIC_SITE_URL` | Public site URL | No |

## Technologies Used

### Core
- [Next.js](https://nextjs.org/) - React framework
- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

### Database
- [Prisma](https://www.prisma.io/) - ORM
- [SQLite](https://www.sqlite.org/) - Database (default)

### UI/UX
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide React](https://lucide.dev/) - Icons
- [Radix UI](https://www.radix-ui.com/) - Accessible components

### Forms & Validation
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation

### State Management
- [Zustand](https://zustand-demo.pmnd.rs/) - Lightweight state management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the repository or contact the development team.

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
