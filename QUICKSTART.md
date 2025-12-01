# Quick Start Guide - R.E.S. Website

## 🚀 Getting Started in 5 Minutes

### Prerequisites Checklist
- [ ] Node.js 18+ installed
- [ ] PostgreSQL 14+ installed and running
- [ ] Redis 6+ installed and running (optional for development)
- [ ] Git installed
- [ ] Code editor (VS Code recommended)

---

## Step-by-Step Setup

### 1. Install Dependencies

Open PowerShell in the project directory:

```powershell
# Install all npm packages
npm install
```

This will install all required dependencies including Next.js, Prisma, NextAuth, and more.

### 2. Configure Environment Variables

```powershell
# Copy the example environment file
Copy-Item .env.example .env
```

Edit the `.env` file with your local configuration:

```env
# Minimum required for local development:
DATABASE_URL="postgresql://postgres:password@localhost:5432/res_db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-generate-with: openssl rand -base64 32"
```

### 3. Set Up Database

```powershell
# Generate Prisma Client
npx prisma generate

# Create database and run migrations
npx prisma migrate dev --name init

# Optional: Open Prisma Studio to view database
npx prisma studio
```

### 4. Start Development Server

```powershell
npm run dev
```

Visit http://localhost:3000 🎉

---

## 🎨 Project Structure Overview

```
src/
├── app/                        # Next.js App Router
│   ├── api/                   # API routes
│   │   ├── auth/             # Authentication endpoints
│   │   ├── contestants/      # Contestant data
│   │   ├── vote/             # Voting system
│   │   └── quiz/             # Quiz functionality
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
├── components/                # React components
│   ├── home/                 # Homepage sections
│   ├── layout/               # Navbar, Footer
│   └── ui/                   # Reusable UI components
├── lib/                       # Utility functions
│   ├── prisma.ts            # Database client
│   ├── redis.ts             # Cache client
│   ├── auth.ts              # Auth configuration
│   ├── utils.ts             # Helper functions
│   └── validations.ts       # Form schemas
└── types/                     # TypeScript types

prisma/
└── schema.prisma             # Database schema

public/                        # Static assets
```

---

## 📝 Common Tasks

### Create a New API Route

```typescript
// src/app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Hello' });
}
```

### Add a New Page

```typescript
// src/app/example/page.tsx
export default function ExamplePage() {
  return <div>My New Page</div>;
}
```

### Update Database Schema

```powershell
# 1. Edit prisma/schema.prisma
# 2. Create migration
npx prisma migrate dev --name add_new_field

# 3. Generate client
npx prisma generate
```

---

## 🧪 Testing Features

### Test User Registration
1. Go to http://localhost:3000/auth/register
2. Fill in the student or public registration form
3. Submit and check database

### Test Voting System
1. Create test contestants in database (use Prisma Studio)
2. Login with test user
3. Go to http://localhost:3000/vote
4. Cast votes

### Test Quiz System
1. Create test quiz in database
2. Go to http://localhost:3000/quiz
3. Complete quiz and check results

---

## 🔧 Troubleshooting

### Port 3000 Already in Use
```powershell
# Kill process on port 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Or use different port
$env:PORT=3001; npm run dev
```

### Database Connection Error
```powershell
# Check PostgreSQL is running
Get-Service postgresql*

# Test connection
psql -U postgres -h localhost
```

### Prisma Client Not Found
```powershell
# Regenerate Prisma Client
npx prisma generate
```

### Cache Errors (Redis)
Redis is optional for development. If you see cache errors:
- Comment out Redis code in `src/lib/redis.ts`
- Or install and start Redis locally

---

## 📚 Next Steps

### For Developers
1. ✅ Complete authentication flow
2. ✅ Build voting UI components
3. ✅ Create admin dashboard
4. ✅ Implement payment integration
5. ✅ Add real-time features with WebSockets

### For Designers
1. 🎨 Create contestant profile cards
2. 🎨 Design quiz interface
3. 🎨 Build mobile-responsive layouts
4. 🎨 Add animations and transitions

### For Testers
1. 🧪 Test registration flows
2. 🧪 Verify voting limits
3. 🧪 Check quiz scoring
4. 🧪 Test on mobile devices

---

## 🚢 Production Deployment

### Build for Production

```powershell
# Create optimized build
npm run build

# Test production build locally
npm start
```

### Deploy to Vercel (Recommended)

```powershell
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Other Platforms
- AWS: Use Elastic Beanstalk or ECS
- Azure: Use App Service
- DigitalOcean: Use App Platform

---

## 📞 Need Help?

- 📖 Read the full [README.md](./README.md)
- 🐛 Report issues on GitHub
- 💬 Contact: info@res-show.co.za
- 📱 WhatsApp: +27 (0) 11 123 4567

---

**Happy Coding! 🎉**
