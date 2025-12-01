# 🪟 Windows Installation Guide

Complete step-by-step installation guide for Windows users.

---

## 📋 Prerequisites Installation

### 1. Install Node.js

**Download & Install:**
1. Visit https://nodejs.org
2. Download LTS version (18.x or higher)
3. Run the installer
4. Check "Automatically install necessary tools" option
5. Click through the installation wizard

**Verify Installation:**
```powershell
node --version
# Should show: v18.x.x or higher

npm --version
# Should show: 9.x.x or higher
```

### 2. Install PostgreSQL

**Download & Install:**
1. Visit https://www.postgresql.org/download/windows/
2. Download PostgreSQL 14 or higher
3. Run the installer
4. Remember the password you set for 'postgres' user
5. Accept default port (5432)
6. Complete installation

**Verify Installation:**
```powershell
# Check if PostgreSQL service is running
Get-Service postgresql*

# Connect to PostgreSQL
psql -U postgres
# Enter password when prompted
# Type \q to exit
```

### 3. Install Git (Optional but Recommended)

**Download & Install:**
1. Visit https://git-scm.com/download/win
2. Download and run installer
3. Use default options
4. Complete installation

**Verify Installation:**
```powershell
git --version
# Should show: git version 2.x.x
```

### 4. Install Redis (Optional - for Production)

**Option A: Windows Native**
1. Download from https://github.com/microsoftarchive/redis/releases
2. Extract ZIP file
3. Run redis-server.exe

**Option B: Docker (Recommended)**
1. Install Docker Desktop for Windows
2. Run: `docker run -d -p 6379:6379 redis`

**For Development: Redis is optional**
You can run the project without Redis initially.

### 5. Install Visual Studio Code (Recommended)

**Download & Install:**
1. Visit https://code.visualstudio.com
2. Download Windows version
3. Run installer
4. Install recommended extensions:
   - ESLint
   - Prettier
   - Prisma
   - Tailwind CSS IntelliSense

---

## 🚀 Project Setup

### Step 1: Open Project in VS Code

```powershell
# Navigate to project directory
cd "c:\Users\khaya\Desktop\Student Competition website"

# Open in VS Code
code .
```

### Step 2: Install Dependencies

**Open Terminal in VS Code** (Ctrl + `)

```powershell
# Install all npm packages
npm install
```

This will take 2-5 minutes. It installs:
- Next.js framework
- React libraries
- Prisma ORM
- Database drivers
- UI libraries
- And 20+ other packages

**If installation fails:**
```powershell
# Clear cache and try again
npm cache clean --force
Remove-Item -Recurse -Force node_modules
npm install
```

### Step 3: Configure Environment Variables

```powershell
# Copy example environment file
Copy-Item .env.example .env

# Open .env file
notepad .env
```

**Edit the `.env` file:**

```env
# Database - Update with your PostgreSQL password
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/res_db?schema=public"

# NextAuth - Generate a secret key
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="run: node -e console.log(require('crypto').randomBytes(32).toString('base64'))"

# Redis (Optional for development)
REDIS_URL="redis://localhost:6379"

# Email (Configure later)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="noreply@res-show.co.za"
```

**Generate NEXTAUTH_SECRET:**
```powershell
# Run this command to generate a secret
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Copy the output and paste it as NEXTAUTH_SECRET in .env
```

### Step 4: Set Up Database

**Create Database:**
```powershell
# Connect to PostgreSQL
psql -U postgres

# In psql, create database:
CREATE DATABASE res_db;

# Exit psql
\q
```

**Run Prisma Migrations:**
```powershell
# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma migrate dev --name init
```

You should see:
```
✔ Generated Prisma Client
✔ Database migrated successfully
```

**Optional: Open Prisma Studio to view database:**
```powershell
npx prisma studio
```
This opens a web interface at http://localhost:5555

### Step 5: Start Development Server

```powershell
# Start the development server
npm run dev
```

You should see:
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- event compiled client and server successfully
```

**Open your browser:** http://localhost:3000 🎉

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Node.js installed (v18+)
- [ ] PostgreSQL installed and running
- [ ] Project dependencies installed (`node_modules` folder exists)
- [ ] `.env` file created and configured
- [ ] Database created (`res_db`)
- [ ] Prisma migrations ran successfully
- [ ] Development server starts without errors
- [ ] Browser shows homepage at localhost:3000
- [ ] No console errors in browser (F12)

---

## 🔧 Common Windows-Specific Issues

### Issue: "execution of scripts is disabled"

**Solution:**
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Then try npm install again
```

### Issue: "node-gyp" errors during install

**Solution:**
```powershell
# Install Windows Build Tools
npm install --global windows-build-tools

# Or install Visual Studio Build Tools manually
# https://visualstudio.microsoft.com/downloads/
```

### Issue: PostgreSQL service won't start

**Solution:**
```powershell
# Check service status
Get-Service postgresql*

# Start service manually
Start-Service postgresql-x64-14

# Set to automatic startup
Set-Service -Name postgresql-x64-14 -StartupType Automatic
```

### Issue: Port 3000 already in use

**Solution:**
```powershell
# Find process using port 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess

# Kill the process (replace PID with actual number)
Stop-Process -Id PID -Force

# Or use a different port
$env:PORT=3001; npm run dev
```

### Issue: Permission denied errors

**Solution:**
```powershell
# Run PowerShell as Administrator
# Or change folder permissions

# Right-click project folder
# Properties → Security → Edit
# Add Full Control for your user
```

---

## 📝 Useful Windows Commands

### Project Management
```powershell
# Check Node/npm versions
node --version
npm --version

# List installed packages
npm list --depth=0

# Update packages
npm update

# Clean install
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

### Database Management
```powershell
# Connect to database
psql -U postgres -d res_db

# Check PostgreSQL status
Get-Service postgresql*

# Restart PostgreSQL
Restart-Service postgresql-x64-14

# Backup database
pg_dump -U postgres res_db > backup.sql

# Restore database
psql -U postgres -d res_db < backup.sql
```

### Development Workflow
```powershell
# Start dev server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Run linter
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

### Prisma Commands
```powershell
# Generate client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Reset database
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio

# Push schema without migration
npx prisma db push
```

---

## 🎯 Next Steps After Installation

1. **Explore the Homepage**
   - Open http://localhost:3000
   - Check all sections load correctly
   - Test navigation and links

2. **Review the Code**
   - Open `src/app/page.tsx` to see homepage
   - Check `src/components/home/` for sections
   - Review `src/lib/` for utilities

3. **Test API Endpoints**
   - Visit http://localhost:3000/api/contestants
   - Check response in browser

4. **Read Documentation**
   - Open `README.md` for overview
   - Check `QUICKSTART.md` for quick reference
   - Review `CHECKLIST.md` for what's next

5. **Start Development**
   - Pick a feature from `CHECKLIST.md`
   - Create new components in `src/components/`
   - Add API routes in `src/app/api/`

---

## 💻 Development Tools Setup

### VS Code Extensions (Recommended)

Install these extensions for better development experience:

1. **ESLint** (`dbaeumer.vscode-eslint`)
   - Linting and code quality

2. **Prettier** (`esbenp.prettier-vscode`)
   - Code formatting

3. **Prisma** (`Prisma.prisma`)
   - Prisma schema support

4. **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
   - Tailwind class autocomplete

5. **TypeScript + JavaScript** (Built-in)
   - Already included in VS Code

6. **Error Lens** (`usernamehw.errorlens`)
   - Shows errors inline

7. **Auto Rename Tag** (`formulahendry.auto-rename-tag`)
   - Renames paired HTML/JSX tags

### VS Code Settings

Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

---

## 🎓 Learning Resources

### For This Project
- Next.js: https://nextjs.org/docs
- React: https://react.dev
- TypeScript: https://www.typescriptlang.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Prisma: https://www.prisma.io/docs

### Windows Development
- PowerShell: https://docs.microsoft.com/powershell
- WSL2 (Advanced): https://docs.microsoft.com/windows/wsl

---

## 📞 Getting Help

If you encounter issues:

1. Check `TROUBLESHOOTING.md` file
2. Search error message on Google
3. Check project documentation files
4. Ask team on Slack/Discord
5. Create GitHub issue with details

---

## ✨ You're All Set!

You now have a fully functional development environment for the R.E.S. website!

**Happy Coding!** 🚀

---

Last Updated: November 30, 2025
