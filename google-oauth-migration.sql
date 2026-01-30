-- Google OAuth Migration for User table
-- Run this in Supabase SQL Editor to add support for Google OAuth

-- Add Google OAuth fields to User table
ALTER TABLE "User" 
ADD COLUMN IF NOT EXISTS "googleId" TEXT,
ADD COLUMN IF NOT EXISTS "image" TEXT,
ADD COLUMN IF NOT EXISTS "provider" TEXT DEFAULT 'credentials';

-- Make password field optional (for OAuth users)
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL;

-- Make dateOfBirth and province optional for OAuth users (can be filled later)
ALTER TABLE "User" ALTER COLUMN "dateOfBirth" DROP NOT NULL;
ALTER TABLE "User" ALTER COLUMN "province" DROP NOT NULL;
ALTER TABLE "User" ALTER COLUMN "homeAddress" DROP NOT NULL;

-- Add unique constraint for googleId (only if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'User_googleId_unique') THEN
        ALTER TABLE "User" ADD CONSTRAINT "User_googleId_unique" UNIQUE ("googleId");
    END IF;
END $$;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS "User_googleId_idx" ON "User"("googleId");
CREATE INDEX IF NOT EXISTS "User_provider_idx" ON "User"("provider");

-- Update existing users to have 'credentials' provider
UPDATE "User" SET "provider" = 'credentials' WHERE "provider" IS NULL;