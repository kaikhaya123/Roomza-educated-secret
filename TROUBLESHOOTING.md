# Troubleshooting Guide

Common issues and their solutions when working with the R.E.S. website.

---

## 🔧 Installation Issues

### Problem: `npm install` fails
**Solutions:**
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules, package-lock.json

# Reinstall
npm install

# If still failing, try using yarn
npm install -g yarn
yarn install
```

### Problem: Node version mismatch
**Solution:**
```powershell
# Check your Node version
node --version

# Should be 18.x or higher
# Install/update Node.js from https://nodejs.org
```

### Problem: Python required for node-gyp
**Solution:**
```powershell
# Install Windows Build Tools
npm install --global windows-build-tools

# Or install Visual Studio Build Tools
# https://visualstudio.microsoft.com/downloads/
```

---

## 🗄️ Database Issues

### Problem: Cannot connect to PostgreSQL
**Solutions:**
```powershell
# Check if PostgreSQL is running
Get-Service postgresql*

# Start PostgreSQL service
Start-Service postgresql-x64-14

# Test connection
psql -U postgres -h localhost

# Verify DATABASE_URL in .env
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

### Problem: Prisma Client not found
**Solution:**
```powershell
# Generate Prisma Client
npx prisma generate

# If still failing, delete and regenerate
Remove-Item -Recurse -Force node_modules/.prisma
npx prisma generate
```

### Problem: Migration fails
**Solutions:**
```powershell
# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Create fresh migration
npx prisma migrate dev --name init

# If migration is stuck, force it
npx prisma migrate resolve --applied "migration_name"

# Push schema without migration
npx prisma db push
```

### Problem: Database connection pool exhausted
**Solution:**
```typescript
// Update prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  relationMode = "prisma"
  pooling = {
    timeout = 20
    max = 10
  }
}
```

---

## 🔐 Authentication Issues

### Problem: NextAuth session not persisting
**Solutions:**
```powershell
# Ensure NEXTAUTH_SECRET is set in .env
# Generate a new secret
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Clear browser cookies
# Clear Next.js cache
Remove-Item -Recurse -Force .next
```

### Problem: NEXTAUTH_URL mismatch
**Solution:**
```env
# Development
NEXTAUTH_URL=http://localhost:3000

# Production (update with your domain)
NEXTAUTH_URL=https://yourdomain.com
```

### Problem: JWT token expired
**Solution:**
```typescript
// Update session maxAge in lib/auth.ts
session: {
  strategy: 'jwt',
  maxAge: 30 * 24 * 60 * 60, // 30 days
}
```

---

## 🎨 UI/Styling Issues

### Problem: Tailwind classes not working
**Solutions:**
```powershell
# Rebuild Tailwind
npm run dev

# Check tailwind.config.ts content paths
# Should include: "./src/**/*.{js,ts,jsx,tsx}"

# Clear Next.js cache
Remove-Item -Recurse -Force .next
```

### Problem: Fonts not loading
**Solution:**
```typescript
// Verify font imports in layout.tsx
import { Inter, Poppins } from 'next/font/google';

// Check font-family classes in components
className="font-sans" // Inter
className="font-display" // Poppins
```

### Problem: Icons not showing
**Solution:**
```powershell
# Ensure lucide-react is installed
npm install lucide-react

# Verify imports
import { IconName } from 'lucide-react';
```

---

## 🚀 Build & Deployment Issues

### Problem: Build fails with TypeScript errors
**Solutions:**
```powershell
# Check for type errors
npm run type-check

# Fix or temporarily disable strict mode in tsconfig.json
"strict": false,

# Ignore specific errors (not recommended)
// @ts-ignore
```

### Problem: Build succeeds but runtime errors
**Solutions:**
```powershell
# Test production build locally
npm run build
npm start

# Check environment variables are set
# Check for console errors in browser
# Verify API routes are accessible
```

### Problem: Large bundle size
**Solutions:**
```typescript
// Use dynamic imports
const Component = dynamic(() => import('./Component'));

// Optimize images
import Image from 'next/image';

// Remove unused dependencies
npm uninstall package-name
```

---

## 📦 Redis Issues

### Problem: Cannot connect to Redis
**Solutions:**
```powershell
# Check if Redis is running
# Install Redis on Windows: https://github.com/microsoftarchive/redis/releases

# Or use Docker
docker run -d -p 6379:6379 redis

# Or comment out Redis code for development
# The app will work without caching
```

### Problem: Redis connection timeout
**Solution:**
```typescript
// Update Redis timeout in lib/redis.ts
const redis = createClient({
  url: process.env.REDIS_URL,
  socket: {
    connectTimeout: 10000
  }
});
```

---

## 🔌 API Issues

### Problem: API route returns 404
**Solutions:**
```powershell
# Verify file is in correct location: src/app/api/[route]/route.ts
# Check export: export async function GET/POST/etc

# Restart dev server
# Ctrl+C then npm run dev
```

### Problem: CORS errors
**Solution:**
```typescript
// Add CORS headers in next.config.js
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' },
        { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
      ],
    },
  ];
}
```

### Problem: Request body is undefined
**Solution:**
```typescript
// Ensure you're using NextRequest/NextResponse
import { NextRequest, NextResponse } from 'next/server';

// Parse JSON body
const body = await request.json();
```

---

## ⚡ Performance Issues

### Problem: Slow page loads
**Solutions:**
```powershell
# Enable production mode optimizations
npm run build
npm start

# Check for unnecessary re-renders
# Use React.memo for expensive components

# Optimize images
# Use next/image instead of <img>

# Enable caching
# Verify Redis is working
```

### Problem: Memory leaks
**Solutions:**
```typescript
// Clean up useEffect
useEffect(() => {
  const subscription = data$.subscribe();
  return () => subscription.unsubscribe();
}, []);

// Don't store large objects in state
// Use pagination for large lists
```

---

## 🔒 Security Issues

### Problem: Environment variables exposed
**Solution:**
```typescript
// Only use NEXT_PUBLIC_ prefix for client-side variables
// Server-only variables should NOT have this prefix

// Client-safe
NEXT_PUBLIC_API_URL=https://api.example.com

// Server-only (never exposed)
DATABASE_URL=postgresql://...
```

### Problem: Session hijacking concerns
**Solution:**
```typescript
// Implement session rotation
// Use secure cookies
cookies: {
  sessionToken: {
    name: `__Secure-next-auth.session-token`,
    options: {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: true
    }
  }
}
```

---

## 📱 Mobile Issues

### Problem: Touch events not working
**Solution:**
```typescript
// Use onClick instead of onMouseDown for mobile
// Test on actual device, not just browser devtools
// Add touch-action CSS if needed
```

### Problem: Responsive design broken
**Solution:**
```html
<!-- Verify viewport meta tag in layout -->
<meta name="viewport" content="width=device-width, initial-scale=1" />

<!-- Use Tailwind responsive classes -->
<div className="w-full md:w-1/2 lg:w-1/3">
```

---

## 🧪 Testing Issues

### Problem: Tests not running
**Solution:**
```powershell
# Install testing dependencies (when tests are added)
npm install -D vitest @testing-library/react

# Run tests
npm test
```

---

## 🐛 Common Errors

### Error: "Module not found"
**Solution:**
```powershell
# Install missing package
npm install package-name

# Or check import paths
# Use @/ for src directory imports
import { Component } from '@/components/Component';
```

### Error: "Cannot read property of undefined"
**Solution:**
```typescript
// Use optional chaining
const value = object?.property?.nestedProperty;

// Provide default values
const value = object?.property ?? 'default';

// Check if exists before accessing
if (object && object.property) {
  // Safe to access
}
```

### Error: "Hydration mismatch"
**Solution:**
```typescript
// Don't use random values in SSR
// Use useEffect for client-only code
// Ensure server and client render the same HTML initially

useEffect(() => {
  // Client-only code here
}, []);
```

---

## 🔄 Cache Issues

### Problem: Stale data displayed
**Solutions:**
```powershell
# Clear browser cache
# Hard refresh: Ctrl+Shift+R

# Clear Next.js cache
Remove-Item -Recurse -Force .next

# Clear Redis cache
# Connect to Redis and run: FLUSHALL

# Restart dev server
```

---

## 📝 Development Tips

### Enable Detailed Error Messages
```env
# Add to .env.local
NODE_ENV=development
NEXT_PUBLIC_SHOW_ERRORS=true
```

### Use Logging
```typescript
// Add logging to debug
console.log('Debug:', { variable });

// Use structured logging in production
import { logger } from '@/lib/logger';
logger.info('Event', { data });
```

### Check Network Requests
```
F12 → Network tab
Filter: Fetch/XHR
Check: Request/Response
```

---

## 🆘 Getting More Help

### When Nothing Works
1. Check all error messages carefully
2. Search error on Google/Stack Overflow
3. Check Next.js documentation
4. Check Prisma documentation
5. Ask in project Slack/Discord
6. Create GitHub issue with:
   - Error message
   - Steps to reproduce
   - Environment details
   - What you've tried

### Useful Commands
```powershell
# Check all versions
node --version
npm --version
npx --version

# Clean install
Remove-Item -Recurse -Force node_modules, package-lock.json, .next
npm install

# Reset everything
git clean -fdx
npm install
npx prisma generate
```

---

## 📞 Support Channels

- **Documentation**: Check all .md files in project root
- **Email**: dev@res-show.co.za
- **Team Chat**: [Your team communication platform]
- **GitHub Issues**: For bugs and features

---

**Remember**: Most issues can be solved by:
1. Reading error messages carefully
2. Checking the documentation
3. Restarting the development server
4. Clearing caches

---

Last Updated: November 30, 2025
