-- Roomza's Educated Secret - PostgreSQL Database Setup for Supabase
-- Run this script in Supabase SQL Editor

-- Create ENUMs
CREATE TYPE "UserType" AS ENUM ('STUDENT', 'PUBLIC', 'ADMIN');
CREATE TYPE "Province" AS ENUM (
  'EASTERN_CAPE',
  'FREE_STATE',
  'GAUTENG',
  'KWAZULU_NATAL',
  'LIMPOPO',
  'MPUMALANGA',
  'NORTHERN_CAPE',
  'NORTH_WEST',
  'WESTERN_CAPE'
);
CREATE TYPE "VoteStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'USED');
CREATE TYPE "QuizDifficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- Create User table
CREATE TABLE "User" (
  "id" TEXT PRIMARY KEY,
  "email" TEXT UNIQUE NOT NULL,
  "emailVerified" TIMESTAMP,
  "phone" TEXT,
  "phoneVerified" TIMESTAMP,
  "password" TEXT NOT NULL,
  "userType" "UserType" DEFAULT 'PUBLIC' NOT NULL,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "dateOfBirth" TIMESTAMP NOT NULL,
  "province" "Province" NOT NULL,
  "homeAddress" TEXT NOT NULL,
  "municipality" TEXT,
  "town" TEXT,
  "institution" TEXT,
  "campus" TEXT,
  "residence" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL
);

-- Create Contestant table
CREATE TABLE "Contestant" (
  "id" TEXT PRIMARY KEY,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "dateOfBirth" TIMESTAMP,
  "province" "Province",
  "homeAddress" TEXT,
  "phone" TEXT,
  "municipality" TEXT,
  "town" TEXT,
  "institution" TEXT,
  "campus" TEXT,
  "residence" TEXT,
  "bio" TEXT,
  "photoUrl" TEXT,
  "isActive" BOOLEAN DEFAULT true NOT NULL,
  "isEliminated" BOOLEAN DEFAULT false NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL
);

-- Create Vote table
CREATE TABLE "Vote" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "contestantId" TEXT NOT NULL,
  "voteCount" INTEGER DEFAULT 1 NOT NULL,
  "isPaid" BOOLEAN DEFAULT false NOT NULL,
  "amount" DOUBLE PRECISION,
  "transactionId" TEXT,
  "status" "VoteStatus" DEFAULT 'ACTIVE' NOT NULL,
  "votingRound" INTEGER NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
  CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "Vote_contestantId_fkey" FOREIGN KEY ("contestantId") REFERENCES "Contestant"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Create Nomination table
CREATE TABLE "Nomination" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "contestantId" TEXT,
  "nomineeFirstName" TEXT NOT NULL,
  "nomineeLastName" TEXT NOT NULL,
  "nomineeEmail" TEXT NOT NULL,
  "nomineePhone" TEXT NOT NULL,
  "nomineeInstitution" TEXT NOT NULL,
  "nomineeCampus" TEXT NOT NULL,
  "nomineeProvince" "Province" NOT NULL,
  "reason" TEXT NOT NULL,
  "supportingInfo" TEXT,
  "status" TEXT DEFAULT 'pending' NOT NULL,
  "reviewedAt" TIMESTAMP,
  "reviewedBy" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL,
  CONSTRAINT "Nomination_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "Nomination_contestantId_fkey" FOREIGN KEY ("contestantId") REFERENCES "Contestant"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- Create Sponsor table
CREATE TABLE "Sponsor" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "tier" TEXT NOT NULL,
  "logoUrl" TEXT NOT NULL,
  "websiteUrl" TEXT,
  "description" TEXT,
  "investment" DOUBLE PRECISION,
  "benefits" JSONB,
  "isActive" BOOLEAN DEFAULT true NOT NULL,
  "startDate" TIMESTAMP NOT NULL,
  "endDate" TIMESTAMP,
  "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL
);

-- Create Quiz table
CREATE TABLE "Quiz" (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "difficulty" "QuizDifficulty" DEFAULT 'MEDIUM' NOT NULL,
  "timeLimit" INTEGER NOT NULL,
  "isActive" BOOLEAN DEFAULT false NOT NULL,
  "scheduledFor" TIMESTAMP NOT NULL,
  "expiresAt" TIMESTAMP NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL
);

-- Create QuizQuestion table
CREATE TABLE "QuizQuestion" (
  "id" TEXT PRIMARY KEY,
  "quizId" TEXT NOT NULL,
  "question" TEXT NOT NULL,
  "options" JSONB NOT NULL,
  "correctAnswer" INTEGER NOT NULL,
  "points" INTEGER DEFAULT 10 NOT NULL,
  "order" INTEGER NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
  CONSTRAINT "QuizQuestion_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create QuizAttempt table
CREATE TABLE "QuizAttempt" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "quizId" TEXT NOT NULL,
  "answers" JSONB NOT NULL,
  "score" INTEGER NOT NULL,
  "completedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
  "timeTaken" INTEGER NOT NULL,
  CONSTRAINT "QuizAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "QuizAttempt_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "QuizAttempt_userId_quizId_key" UNIQUE ("userId", "quizId")
);

-- Create Achievement table
CREATE TABLE "Achievement" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "imageUrl" TEXT,
  "criteria" JSONB NOT NULL,
  "points" INTEGER DEFAULT 0 NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create UserAchievement table
CREATE TABLE "UserAchievement" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "achievementId" TEXT NOT NULL,
  "unlockedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
  CONSTRAINT "UserAchievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "UserAchievement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "UserAchievement_userId_achievementId_key" UNIQUE ("userId", "achievementId")
);

-- Create LiveStream table
CREATE TABLE "LiveStream" (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "platform" TEXT NOT NULL,
  "streamUrl" TEXT NOT NULL,
  "embedCode" TEXT,
  "scheduledStart" TIMESTAMP NOT NULL,
  "scheduledEnd" TIMESTAMP NOT NULL,
  "actualStart" TIMESTAMP,
  "actualEnd" TIMESTAMP,
  "isLive" BOOLEAN DEFAULT false NOT NULL,
  "viewCount" INTEGER DEFAULT 0 NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL
);

-- Create Analytics table
CREATE TABLE "Analytics" (
  "id" TEXT PRIMARY KEY,
  "eventType" TEXT NOT NULL,
  "eventData" JSONB NOT NULL,
  "userId" TEXT,
  "ipAddress" TEXT,
  "userAgent" TEXT,
  "timestamp" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create SystemConfig table
CREATE TABLE "SystemConfig" (
  "id" TEXT PRIMARY KEY,
  "key" TEXT UNIQUE NOT NULL,
  "value" TEXT NOT NULL,
  "description" TEXT,
  "updatedAt" TIMESTAMP NOT NULL
);

-- Create Indexes
CREATE INDEX "Vote_userId_votingRound_idx" ON "Vote"("userId", "votingRound");
CREATE INDEX "Vote_contestantId_idx" ON "Vote"("contestantId");
CREATE INDEX "Vote_createdAt_idx" ON "Vote"("createdAt");

CREATE INDEX "Contestant_isActive_isEliminated_idx" ON "Contestant"("isActive", "isEliminated");

CREATE INDEX "Nomination_status_idx" ON "Nomination"("status");
CREATE INDEX "Nomination_createdAt_idx" ON "Nomination"("createdAt");

CREATE INDEX "Sponsor_tier_isActive_idx" ON "Sponsor"("tier", "isActive");

CREATE INDEX "Quiz_isActive_scheduledFor_idx" ON "Quiz"("isActive", "scheduledFor");

CREATE INDEX "QuizQuestion_quizId_idx" ON "QuizQuestion"("quizId");

CREATE INDEX "QuizAttempt_quizId_score_idx" ON "QuizAttempt"("quizId", "score");

CREATE INDEX "UserAchievement_userId_idx" ON "UserAchievement"("userId");

CREATE INDEX "LiveStream_isLive_scheduledStart_idx" ON "LiveStream"("isLive", "scheduledStart");

CREATE INDEX "Analytics_eventType_timestamp_idx" ON "Analytics"("eventType", "timestamp");
CREATE INDEX "Analytics_userId_idx" ON "Analytics"("userId");

-- Create function to update updatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW."updatedAt" = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updatedAt
CREATE TRIGGER update_user_updated_at BEFORE UPDATE ON "User"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contestant_updated_at BEFORE UPDATE ON "Contestant"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_nomination_updated_at BEFORE UPDATE ON "Nomination"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sponsor_updated_at BEFORE UPDATE ON "Sponsor"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quiz_updated_at BEFORE UPDATE ON "Quiz"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_livestream_updated_at BEFORE UPDATE ON "LiveStream"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_systemconfig_updated_at BEFORE UPDATE ON "SystemConfig"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Success message
SELECT 'Database setup complete! All tables, indexes, and triggers created successfully.' AS status;
