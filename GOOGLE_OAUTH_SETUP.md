# Google OAuth Setup Guide for Roomza's Educated Secret

## Overview
This guide will help you complete the Google OAuth integration for your website.

## 1. Database Migration

First, run the database migration to add Google OAuth support:

1. Open your Supabase dashboard
2. Go to the SQL Editor
3. Run the migration script in `google-oauth-migration.sql`

## 2. Google Cloud Console Setup

### Step 1: Create Google OAuth Credentials

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Select or create a project** for your application
3. **Enable Google+ API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. **Create OAuth Credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Set application type to "Web application"
   - Add your authorized redirect URIs:
     - For development: `http://localhost:3000/api/auth/callback/google`
     - For production: `https://yourdomain.com/api/auth/callback/google`

### Step 2: Get Your Credentials

After creating the OAuth client, you'll receive:
- **Client ID**: A long string ending with `.apps.googleusercontent.com`
- **Client Secret**: A shorter alphanumeric string

## 3. Environment Variables

Update your `.env` file with the Google OAuth credentials:

```env
# Google OAuth (replace with your actual credentials)
GOOGLE_CLIENT_ID="your-google-client-id-from-console.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret-from-console"
```

## 4. Testing the Integration

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Navigate to the login page**: http://localhost:3000/auth/login

3. **Click "Continue with Google"** and test the OAuth flow

## 5. What's Been Implemented

### Backend Changes:
- ✅ Added Google OAuth provider to NextAuth configuration
- ✅ Updated authentication callbacks to handle Google OAuth users
- ✅ Added database migration for Google OAuth fields
- ✅ Updated TypeScript types for NextAuth

### Frontend Changes:
- ✅ Google login button already exists in your login page
- ✅ Uses proper NextAuth signIn function for Google OAuth

### Database Changes:
- ✅ Added `googleId` field to store Google account ID
- ✅ Added `image` field to store user profile picture from Google
- ✅ Added `provider` field to track authentication method
- ✅ Made `password` field optional for OAuth users
- ✅ Made some required fields optional for OAuth users (can be filled later)

## 6. User Flow

1. **New Google Users**:
   - Click "Continue with Google"
   - Authorize with Google
   - New user account created automatically in your database
   - User is signed in and redirected to home page

2. **Existing Users**:
   - If email matches existing account, Google account is linked
   - User can sign in with either credentials or Google OAuth

## 7. Security Considerations

- Google accounts are automatically marked as email verified
- User type defaults to 'PUBLIC' (you can change this in the auth callback)
- Users can complete their profile information later through your app

## 8. Troubleshooting

### Common Issues:

1. **"redirect_uri_mismatch" error**:
   - Ensure your redirect URI in Google Console matches exactly
   - Check for typos in the URI
   - Make sure to use the correct domain/port

2. **"invalid_client" error**:
   - Verify your Google Client ID and Secret are correct
   - Check for extra spaces in environment variables

3. **Database errors**:
   - Ensure the migration script has been run
   - Check Supabase logs for any constraint violations

## 9. Production Deployment

Before going live:

1. **Update Google OAuth settings**:
   - Add production domain to authorized origins
   - Add production callback URL
   
2. **Update environment variables**:
   - Set `NEXTAUTH_URL` to your production domain
   - Generate a secure `NEXTAUTH_SECRET`

3. **Test thoroughly**:
   - Test OAuth flow in production environment
   - Verify user creation and login works correctly

## Next Steps

- Consider adding Apple OAuth (button already exists)
- Add user onboarding flow for OAuth users to complete profile
- Implement role-based access control based on user type
- Add user profile management features