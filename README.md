# R.E.S. - Roomza's Educated Secret

South Africa's first large-scale student-focused reality show platform. This web application merges entertainment, education, and social impact, allowing users to vote for contestants, participate in daily quizzes, nominate students, and watch live streams.

## 🌟 Features

### Core Functionality
- **User Registration & Authentication**
  - Separate registration flows for students and general public
  - Email verification
  - CAPTCHA anti-bot protection
  - Secure password recovery

- **Voting System**
  - Cast up to 100 votes per day per user
  - Free tier: 10 votes/day
  - Premium voting packages (R5, R10, R30)
  - Real-time vote tracking and leaderboards
  - Anti-fraud measures

- **Daily Quizzes**
  - Dynamic MCQ generation with time limits
  - Score tracking and leaderboards
  - Achievement badges and rewards
  - Points system for engagement

- **Nomination System**
  - User-driven contestant nominations
  - Approval workflow for administrators
  - Secure submission forms

- **Live Streaming Integration**
  - Multi-platform streaming (TikTok, Facebook, YouTube)
  - 18 hours daily live content
  - Real-time viewer statistics
  - Push notifications for live events

- **Gamification**
  - User achievements and badges
  - Leaderboards and rankings
  - Weekly competitions
  - Referral bonuses

### Admin Features
- User management dashboard
- Content management for quizzes
- Contestant and nomination moderation
- Real-time analytics and reporting
- System configuration controls

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI, Lucide Icons
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod validation
- **State Management:** SWR for data fetching

### Backend
- **Runtime:** Node.js
- **API:** Next.js API Routes (REST)
- **Authentication:** NextAuth.js with JWT
- **Database:** PostgreSQL with Prisma ORM
- **Caching:** Redis
- **Email:** Nodemailer

### Infrastructure
- **Hosting:** Vercel / AWS / Azure
- **Database:** PostgreSQL (Supabase / AWS RDS)
- **CDN:** Cloudflare
- **Monitoring:** Datadog / New Relic
- **CI/CD:** GitHub Actions

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL 14+
- Redis 6+
- Git

### Step 1: Clone the Repository
```powershell
git clone <repository-url>
cd "Student Competition website"
```

### Step 2: Install Dependencies
```powershell
npm install
```

### Step 3: Set Up Environment Variables
```powershell
Copy-Item .env.example .env
```

Edit the `.env` file with your credentials:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/res_db"
NEXTAUTH_SECRET="your-secret-key"
REDIS_URL="redis://localhost:6379"
# Add other variables as needed
```

### Step 4: Set Up Database
```powershell
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database (optional)
npx prisma db seed
```

### Step 5: Start Development Server
```powershell
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🚀 Deployment

### Production Build
```powershell
npm run build
npm start
```

### Environment Setup for Production
Ensure all environment variables are set:
- Database connection strings
- Redis URL
- NextAuth secret and URL
- Email server credentials
- Payment gateway keys
- Social media API credentials

### Scaling Considerations
- Use managed PostgreSQL with connection pooling
- Set up Redis cluster for high availability
- Enable CDN caching for static assets
- Configure auto-scaling for compute resources
- Implement rate limiting and DDoS protection

## 📊 Database Schema

The application uses a comprehensive PostgreSQL schema with the following main entities:

- **User** - User accounts (students and public)
- **Contestant** - Competition participants
- **Vote** - User voting records
- **Nomination** - User-submitted nominations
- **Quiz** - Daily quiz questions
- **QuizAttempt** - User quiz submissions
- **Achievement** - Gamification badges
- **Sponsor** - Partner organizations
- **LiveStream** - Streaming session metadata
- **Analytics** - Event tracking data

## 🔐 Security Features

- **Authentication:** JWT-based secure sessions
- **Password Hashing:** bcryptjs with salt
- **Rate Limiting:** Redis-based request throttling
- **CAPTCHA:** Bot prevention on forms
- **SQL Injection Prevention:** Parameterized queries via Prisma
- **XSS Protection:** Input sanitization
- **CSRF Protection:** Built-in Next.js protection
- **HTTPS:** Enforced SSL/TLS
- **Data Encryption:** At-rest and in-transit

## 📈 Scalability Design

### For 15 Million Concurrent Users
- **Load Balancers:** Distribute traffic across multiple servers
- **Microservices:** Separate auth, voting, quiz, and streaming services
- **Caching Strategy:**
  - Redis for session and vote data
  - CDN for static assets
  - Database query caching
- **Database Optimization:**
  - Read replicas for queries
  - Write-master for mutations
  - Sharding for horizontal scaling
- **Queue Systems:** RabbitMQ/AWS SQS for async tasks
- **Auto-scaling:** Cloud-native scaling based on metrics

## 🧪 Testing

```powershell
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Load testing
npm run test:load
```

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/verify-email` - Email verification

### Voting Endpoints
- `GET /api/contestants` - List all contestants
- `POST /api/vote` - Cast votes
- `GET /api/leaderboard` - Get current standings

### Quiz Endpoints
- `GET /api/quiz/daily` - Get today's quiz
- `POST /api/quiz/submit` - Submit quiz answers
- `GET /api/quiz/leaderboard` - Quiz rankings

### Admin Endpoints
- `GET /api/admin/users` - User management
- `POST /api/admin/contestants` - Contestant management
- `GET /api/admin/analytics` - Platform analytics

## 💰 Revenue Streams

1. **Premium Voting** - R5-R30 per package
2. **Display Ads** - CPM model (R8.75-R26.25)
3. **Brand Sponsorships** - R250K-R1M per season
4. **Affiliate Marketing** - Commission-based
5. **Merchandise Sales** - Branded products

### Projected Revenue (4-Week Cycle)
- Paid Voting: R19M
- Display Ads: R2M-R5M
- Sponsorships: R500K-R1.5M
- **Total: R21M-R28M+**

## 📞 Support

For issues, questions, or contributions:
- Email: info@res-show.co.za
- Phone: +27 (0) 11 123 4567
- GitHub Issues: [repository-url]/issues

## 📄 License

Copyright © 2025 Roomza's Educated Secret. All rights reserved.

## 🤝 Contributing

We welcome contributions! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Create a Pull Request

## 🙏 Acknowledgments

- All participating universities and TVET colleges
- 7,660 campus ambassadors
- Our sponsors and partners
- The development team
- South African youth community

---

**Built with ❤️ for South African Students**
