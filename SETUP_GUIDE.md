# Email, SMS, and CAPTCHA Integration Setup Guide

This guide walks you through setting up the three new security and communication features added to the R.E.S. platform.

## 📧 Email Verification Setup (Nodemailer)

### 1. Configure Gmail for Sending Emails

**Option A: Using Gmail App Password (Recommended)**

1. Go to your Google Account settings: https://myaccount.google.com/
2. Select "Security" from the left menu
3. Under "How you sign in to Google," enable 2-Factor Authentication
4. Once 2FA is enabled, return to Security settings
5. Under "How you sign in to Google," select "App passwords"
6. Generate a new app password for "Mail"
7. Copy the 16-character password

**Option B: Using OAuth2 (Advanced)**
- Requires setting up Google Cloud Console project
- More secure but complex setup
- See: https://nodemailer.com/smtp/oauth2/

### 2. Update Environment Variables

Add to your `.env` file:

```bash
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-16-char-app-password"
NEXTAUTH_URL="http://localhost:3000"  # Update for production
```

### 3. Alternative Email Providers

**SendGrid:**
```bash
EMAIL_HOST="smtp.sendgrid.net"
EMAIL_PORT=587
EMAIL_USER="apikey"
EMAIL_PASSWORD="your-sendgrid-api-key"
```

**AWS SES:**
```bash
EMAIL_HOST="email-smtp.us-east-1.amazonaws.com"
EMAIL_PORT=587
EMAIL_USER="your-aws-access-key"
EMAIL_PASSWORD="your-aws-secret-key"
```

**Mailgun:**
```bash
EMAIL_HOST="smtp.mailgun.org"
EMAIL_PORT=587
EMAIL_USER="postmaster@your-domain.mailgun.org"
EMAIL_PASSWORD="your-mailgun-password"
```

### 4. Test Email Functionality

```bash
# Start your dev server
npm run dev

# Register a new user to trigger verification email
# Check console for any errors
```

---

## 📱 SMS Verification Setup (Twilio)

### 1. Create a Twilio Account

1. Sign up at https://www.twilio.com/try-twilio
2. Complete the verification process
3. Get **$15 free trial credit**

### 2. Get Twilio Credentials

1. Go to Twilio Console: https://console.twilio.com/
2. Find your **Account SID** and **Auth Token** on the dashboard
3. Get a phone number:
   - Navigate to **Phone Numbers** → **Manage** → **Buy a number**
   - Filter by country: **South Africa (+27)**
   - Select a number with SMS capabilities
   - Complete purchase (uses trial credit)

### 3. Update Environment Variables

Add to your `.env` file:

```bash
TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
TWILIO_AUTH_TOKEN="your-auth-token"
TWILIO_PHONE_NUMBER="+27123456789"
```

### 4. Trial Account Limitations

- Can only send to verified phone numbers
- Add verified numbers at: https://console.twilio.com/us1/develop/phone-numbers/manage/verified
- Includes "Sent from your Twilio trial account" prefix
- Upgrade to remove limitations

### 5. Alternative SMS Providers

**AWS SNS:**
```typescript
// Update src/lib/sms.ts to use AWS SNS SDK
import { SNS } from '@aws-sdk/client-sns';
```

**Clickatell:**
```bash
# API-based, easier integration for South Africa
SMS_PROVIDER_URL="https://platform.clickatell.com/messages/http/send"
SMS_API_KEY="your-clickatell-api-key"
```

---

## 🤖 reCAPTCHA v2 Setup

### 1. Register Your Site

1. Go to Google reCAPTCHA: https://www.google.com/recaptcha/admin
2. Click **Register a new site**
3. Fill in details:
   - **Label:** R.E.S. Platform
   - **reCAPTCHA type:** reCAPTCHA v2 → "I'm not a robot" Checkbox
   - **Domains:** 
     - `localhost` (for development)
     - `your-domain.com` (for production)
   - Accept terms and submit

### 2. Get Your Keys

After registration, you'll receive:
- **Site Key** (public, goes in frontend)
- **Secret Key** (private, server-side only)

### 3. Update Environment Variables

Add to your `.env` file:

```bash
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="6LcxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxQ"
RECAPTCHA_SECRET_KEY="6LcxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxQ"
```

⚠️ **Important:** The `NEXT_PUBLIC_` prefix makes the site key available in browser

### 4. Server-Side Verification (Optional Enhancement)

To add server-side verification in registration/login:

```typescript
// src/lib/recaptcha.ts
export async function verifyCaptcha(token: string): Promise<boolean> {
  const response = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    }
  );
  
  const data = await response.json();
  return data.success;
}
```

Then in your API routes:
```typescript
import { verifyCaptcha } from '@/lib/recaptcha';

// In registration/login handler
const { captchaToken } = await request.json();
const isValid = await verifyCaptcha(captchaToken);

if (!isValid) {
  return NextResponse.json(
    { error: 'CAPTCHA verification failed' },
    { status: 400 }
  );
}
```

---

## 🚀 Complete Setup Checklist

### Development Environment

- [ ] Install packages: `npm install`
- [ ] Copy `.env.example` to `.env`
- [ ] Configure Gmail App Password
- [ ] Add email credentials to `.env`
- [ ] Create Twilio account and get credentials
- [ ] Add Twilio credentials to `.env`
- [ ] Register site with Google reCAPTCHA
- [ ] Add reCAPTCHA keys to `.env`
- [ ] Start dev server: `npm run dev`
- [ ] Test registration with email verification
- [ ] Test SMS verification flow
- [ ] Verify reCAPTCHA appears on forms

### Production Environment

- [ ] Use production email service (SendGrid/AWS SES recommended)
- [ ] Upgrade Twilio account (remove trial limitations)
- [ ] Add production domain to reCAPTCHA settings
- [ ] Update `NEXTAUTH_URL` to production URL
- [ ] Set secure environment variables in hosting platform
- [ ] Test all flows in production
- [ ] Monitor email delivery rates
- [ ] Monitor SMS delivery rates
- [ ] Check reCAPTCHA analytics

---

## 🔧 Troubleshooting

### Email Issues

**"Invalid login" error:**
- Ensure 2FA is enabled on Google account
- Regenerate app password
- Check EMAIL_USER matches the Gmail account

**Emails not sending:**
- Check console for errors
- Verify SMTP settings
- Test with a different email provider
- Check spam folder

**"Connection timeout":**
- Firewall might block port 587
- Try port 465 with `secure: true`
- Contact your hosting provider

### SMS Issues

**"Authentication failed":**
- Double-check Account SID and Auth Token
- Ensure no extra spaces in credentials

**"Unverified number" (trial account):**
- Verify recipient number in Twilio Console
- Upgrade account to remove restriction

**Wrong country code:**
- South African numbers: +27 followed by 9 digits
- Update phone format in `src/lib/sms.ts` if needed

### reCAPTCHA Issues

**"Invalid site key":**
- Verify `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is correct
- Ensure domain is registered in reCAPTCHA settings
- Add `localhost` for development

**CAPTCHA not appearing:**
- Check browser console for errors
- Ensure site key starts with `6Lc`
- Try incognito mode (extensions might block it)

**"CAPTCHA verification failed":**
- Implement server-side verification (see section above)
- Check network requests in DevTools

---

## 📊 API Endpoints Reference

### Email Verification

```bash
# Verify email (GET request from email link)
GET /api/auth/verify-email?token=abc123

# Resend verification email
POST /api/auth/verify-email
Content-Type: application/json
{
  "email": "user@example.com"
}
```

### SMS Verification

```bash
# Send SMS verification code
POST /api/auth/verify-phone
Content-Type: application/json
{
  "phone": "0821234567",
  "action": "verify"
}

# Confirm verification code
POST /api/auth/verify-phone
Content-Type: application/json
{
  "phone": "0821234567",
  "code": "123456",
  "action": "confirm"
}
```

---

## 💰 Cost Estimates

### Email (Nodemailer + Gmail)
- **Free:** Up to 500 emails/day
- **Upgrade:** Use SendGrid (100 emails/day free, then $14.95/month for 40k emails)

### SMS (Twilio)
- **Trial:** $15 credit (≈300 SMS in South Africa)
- **Pay-as-you-go:** R0.65 per SMS to South African numbers
- **Monthly:** 100 SMS ≈ R65, 1000 SMS ≈ R650

### reCAPTCHA
- **Free:** 1 million assessments/month
- **Enterprise:** $1 per 1,000 assessments (only if you exceed free tier)

### Recommended for Production
- **Email:** SendGrid ($14.95/month) or AWS SES ($0.10 per 1,000 emails)
- **SMS:** Twilio pay-as-you-go or Clickatell bulk packages
- **reCAPTCHA:** Free tier sufficient for most use cases

---

## 🔐 Security Best Practices

1. **Never commit `.env` file to Git**
   ```bash
   # Already in .gitignore
   .env
   .env.local
   ```

2. **Use environment-specific configs**
   - Development: `.env.development`
   - Production: `.env.production`

3. **Rotate credentials regularly**
   - Change email passwords every 90 days
   - Rotate Twilio tokens every 6 months
   - Regenerate reCAPTCHA keys if exposed

4. **Monitor usage**
   - Check Twilio dashboard for unusual activity
   - Review email bounce rates
   - Monitor reCAPTCHA score analytics

5. **Rate limiting**
   - Already implemented in codebase
   - Prevents abuse of SMS/email endpoints
   - Consider adding per-user limits

---

## 📝 Next Steps

After setup is complete:

1. **Test thoroughly:**
   - Register multiple test accounts
   - Verify emails arrive promptly
   - Test SMS to different carriers
   - Ensure reCAPTCHA blocks bots

2. **Monitor initial deployment:**
   - Watch for failed deliveries
   - Check user feedback
   - Review server logs

3. **Optimize:**
   - Adjust email templates
   - Customize SMS messages
   - Fine-tune reCAPTCHA sensitivity

4. **Scale as needed:**
   - Upgrade email service for higher volume
   - Consider SMS bulk packages
   - Enable reCAPTCHA enterprise features

---

## 📞 Support Resources

- **Nodemailer Documentation:** https://nodemailer.com/
- **Twilio Documentation:** https://www.twilio.com/docs
- **reCAPTCHA Documentation:** https://developers.google.com/recaptcha
- **Next.js Environment Variables:** https://nextjs.org/docs/basic-features/environment-variables

---

**Implementation Status:** ✅ Complete
- Email verification with Nodemailer
- SMS verification with Twilio
- reCAPTCHA v2 on registration and login forms
- All API endpoints functional
- Environment configuration ready
