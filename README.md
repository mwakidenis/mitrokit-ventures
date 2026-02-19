# Mitrokit Ventures
<img width="1920" height="1080" alt="Screenshot 2026-02-19 225437" src="https://github.com/user-attachments/assets/503bbc9c-5c29-45cb-8225-415680c07837" />

Mitrokit Ventures is a modern, responsive business website built with Next.js 14, React, TypeScript, and Tailwind CSS. The website showcases a full-stack development agency with comprehensive sections for services, projects, testimonials, blog, FAQ, contact form, and more, along with an admin panel for content management.

## About Mitrokit Ventures

**Tagline**: "Mitrokit Ventures makes the world a better place for you!"

**Mission**: Instant, Reliable, and Affordable Development

**Services Offered**:
- Full-Stack Development
- API Development
- Cloud Expert Services
- Digital Marketing
- Email Marketing
- Graphics Design
- Web Development
- App Development
- Cyber Security

**Location**: Nairobi, Kenya

**Contact**:
- Email: contact@mitrokit.com
- Phone: +254 798 750 585

**Founder/Author**: Mwaki Denis

## Features
<img width="1920" height="1080" alt="Screenshot 2026-02-19 155025" src="https://github.com/user-attachments/assets/5dfbc55a-f3d7-4bd5-b1d8-6309463dbe6e" />

### Frontend Features
The website includes the following sections on the homepage:

1. **Navbar** - Responsive navigation with:
   - Logo with animated hexagon icon
   - Navigation links: Home, About, Services, Projects, Blog, Contact
   - CTA buttons: "Hire Us" and "View Projects"
   - Mobile hamburger menu with slide-in animation
   - Scroll-aware background with backdrop blur effect
   - Smooth scroll to sections
   - Uses Framer Motion for animations
   - Uses Lucide React icons (Menu, X, Hexagon)

2. **Hero Section** - Eye-catching landing area with call-to-action
3. **Clients** - Display client logos and trusted by companies
4. **About** - Company information and story
5. **Skills** - Team skills and expertise showcase
6. **Education** - Educational background and training
7. **Career** - Job openings and hiring information
8. **Services** - Comprehensive list of services offered
9. **Projects/Portfolio** - Display completed projects with tech stack, category, year, featured projects, live URL and GitHub links
10. **Testimonials** - Customer reviews and feedback with ratings
11. **Blog** - Company blog with markdown content, tags, reading time, likes, views, and comments
12. **FAQ** - Frequently asked questions with accordion
13. **Hire Workflow** - How the hiring process works
14. **App Download** - Mobile app promotion section
15. **Contact** - Contact form with email integration
16. **Footer** - Complete footer with company branding, contact info, links, and social media

### Backend Features
- **Admin Panel** - `/admin` route for content management
- **Authentication** - Secure login with JWT tokens and bcrypt password hashing
- **Role-based Access Control** - USER, ADMIN, SUPER_ADMIN roles
- **API Routes** - RESTful API endpoints:
  - `/api/auth/login` - User authentication
  - `/api/contact` - Contact form submissions
  - `/api/subscribe` - Newsletter subscriptions
- **Database** - Prisma ORM with PostgreSQL (easily switchable to MySQL/SQLite)
- **Form Handling** - Contact form with server actions
- **Email Subscription** - Newsletter signup functionality
- **Audit Logging** - Track admin actions for security

### Tech Stack

#### Core Technologies
- **Framework**: Next.js 14.2.3
- **Language**: TypeScript 5.4.5
- **UI Library**: React 18.3.1
- **Styling**: Tailwind CSS 3.4.3
- **CSS Preprocessor**: PostCSS 8.4.38

#### UI/UX
- **Animation**: Framer Motion 11.2.4
- **Icons**: Lucide React 0.378.0
- **Fonts**: Inter (body text), JetBrains Mono (code)
- **Theme**: Dark mode with neon accent colors:
  - Neon Blue (#00D9FF)
  - Neon Green (#39FF14)
  - Neon Orange (#FF6B35)
  - Neon Yellow

#### UI Components (Radix UI)
- @radix-ui/react-accordion
- @radix-ui/react-dialog
- @radix-ui/react-dropdown-menu
- @radix-ui/react-label
- @radix-ui/react-select
- @radix-ui/react-slot
- @radix-ui/react-tabs
- @radix-ui/react-toast
- @radix-ui/react-tooltip

#### State Management & Data
- **State Management**: Zustand 4.5.2
- **Stores**: authStore, blogStore, projectStore, adminStore, uiStore
- **Database ORM**: Prisma 5.14.0
- **Database**: PostgreSQL (configurable in schema.prisma)

#### Forms & Validation
- **Form Handling**: React Hook Form 7.51.4
- **Schema Validation**: Zod 3.23.8
- **Form Resolvers**: @hookform/resolvers 3.4.2

#### Authentication
- **Password Hashing**: bcryptjs 2.4.3
- **JWT**: jsonwebtoken 9.0.2

#### Content Management
- **Markdown**: gray-matter 4.0.3, remark 15.0.1, remark-html 16.0.0
- **Date Formatting**: date-fns 3.6.0

#### Deployment
- **Cloud Platform**: Cloudflare Pages support
- **Deployment**: @cloudflare/next-on-pages 1.11.3
- **Dev Server**: wrangler 3.60.0 (for Cloudflare)

#### Development Tools
- **Linting**: ESLint 8.57.0
- **Type Checking**: TypeScript 5.4.5

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

## Database Schema

The application uses Prisma ORM with the following database models:

### User Model
- **id**: Unique identifier (cuid)
- **email**: User email (unique)
- **password**: Hashed password
- **name**: Optional user name
- **role**: USER, ADMIN, or SUPER_ADMIN
- **createdAt**: Creation timestamp
- **updatedAt**: Last update timestamp
- **Relations**: Posts, Projects, Messages, Testimonials, AuditLogs

### Project Model
- **id**: Unique identifier
- **title**: Project title
- **description**: Project description
- **image**: Optional image URL
- **techStack**: Array of technologies used
- **category**: Project category
- **year**: Completion year
- **featured**: Featured flag
- **liveUrl**: Optional live URL
- **githubUrl**: Optional GitHub URL

### BlogPost Model
- **id**: Unique identifier
- **title**: Post title
- **slug**: URL-friendly slug (unique)
- **content**: Markdown content
- **excerpt**: Optional excerpt
- **coverImage**: Optional cover image
- **tags**: Array of tags
- **published**: Published status
- **readingTime**: Calculated reading time
- **likes**: Like count
- **views**: View count

### Testimonial Model
- **id**: Unique identifier
- **name**: Person name
- **role**: Job role
- **company**: Optional company
- **content**: Testimonial content
- **avatar**: Optional avatar URL
- **rating**: Rating (1-5)
- **featured**: Featured flag

### Service Model
- **id**: Unique identifier
- **name**: Service name
- **description**: Service description
- **icon**: Optional icon
- **features**: Array of features
- **order**: Display order
- **active**: Active status

### FAQ Model
- **id**: Unique identifier
- **question**: Question text
- **answer**: Answer text
- **category**: Optional category
- **order**: Display order
- **active**: Active status

### Message Model
- **id**: Unique identifier
- **name**: Sender name
- **email**: Sender email
- **subject**: Optional subject
- **content**: Message content
- **read**: Read status
- **archived**: Archived status

### Subscriber Model
- **id**: Unique identifier
- **email**: Subscriber email (unique)
- **name**: Optional name
- **active**: Active status
- **subscribedAt**: Subscription timestamp
- **unsubscribedAt**: Optional unsubscription timestamp

### AuditLog Model
- **id**: Unique identifier
- **action**: Action performed
- **entityType**: Type of entity
- **entityId**: Optional entity ID
- **details**: JSON details
- **ipAddress**: IP address
- **userAgent**: User agent

### BrandAsset Model
- **id**: Unique identifier
- **type**: Asset type (logo, favicon, etc.)
- **name**: Asset name
- **url**: Asset URL
- **active**: Active status

## TypeScript Types

The application includes comprehensive TypeScript types in `src/types/index.ts`:

### User Types
- `User` - User interface with id, email, name, role, timestamps
- `AuthResponse` - Authentication response with user and token

### Project Types
- `Project` - Project interface
- `ProjectFormData` - Form data for creating/editing projects

### Blog Types
- `BlogPost` - Blog post interface
- `BlogPostFormData` - Form data for blog posts
- `Comment` - Comment interface

### Testimonial Types
- `Testimonial` - Testimonial interface
- `TestimonialFormData` - Form data for testimonials

### Service Types
- `Service` - Service interface

### FAQ Types
- `FAQ` - FAQ interface

### Message Types
- `Message` - Message interface

### Subscriber Types
- `Subscriber` - Subscriber interface

### Audit Types
- `AuditLog` - Audit log interface

### Brand Types
- `BrandAsset` - Brand asset interface

### API Response Types
- `ApiResponse<T>` - Generic API response
- `PaginatedResponse<T>` - Paginated response

### Form Types
- `ContactFormData` - Contact form data
- `SubscribeFormData` - Subscription form data

### Filter Types
- `ProjectFilter` - Project filter options
- `BlogFilter` - Blog filter options

## Utility Functions

The application includes utility functions in `src/lib/utils.ts`:

### cn()
Merges classNames using tailwind-merge for conditional Tailwind classes.

### formatDate(date: Date | string)
Formats a date to a human-readable string (e.g., "January 1, 2024").

### calculateReadingTime(content: string)
Calculates the estimated reading time for blog content (200 words per minute).

### slugify(text: string)
Converts text to a URL-friendly slug (lowercase, hyphens instead of spaces/special chars).

### truncateText(text: string, maxLength: number)
Truncates text to a specified maximum length with ellipsis.

### generateId()
Generates a random ID string.

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
