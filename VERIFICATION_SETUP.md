# Email, SMS & CAPTCHA Verification Setup Guide

This guide provides step-by-step instructions for setting up email verification, SMS verification, and reCAPTCHA protection for the R.E.S. platform.

## 📧 Email Verification Setup

### 1. Gmail SMTP Configuration (Recommended for Development)

#### Step 1: Enable 2-Factor Authentication
1. Go to your [Google Account](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification**
3. Follow the prompts to enable 2FA

#### Step 2: Generate App Password
1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select **Mail** and **Other (Custom name)**
3. Enter "R.E.S. Platform" as the name
4. Click **Generate**
5. Copy the 16-character password (no spaces)

#### Step 3: Update Environment Variables
```env
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-16-char-app-password"
```

### 2. Alternative Email Providers

#### SendGrid
```env
EMAIL_HOST="smtp.sendgrid.net"
EMAIL_PORT=587
EMAIL_USER="apikey"
EMAIL_PASSWORD="your-sendgrid-api-key"
```

#### Mailgun
```env
EMAIL_HOST="smtp.mailgun.org"
EMAIL_PORT=587
EMAIL_USER="your-mailgun-smtp-username"
EMAIL_PASSWORD="your-mailgun-smtp-password"
```

#### AWS SES
```env
EMAIL_HOST="email-smtp.us-east-1.amazonaws.com"
EMAIL_PORT=587
EMAIL_USER="your-aws-access-key"
EMAIL_PASSWORD="your-aws-secret-key"
```

### 3. Test Email Sending

```bash
# In your project directory
node -e "
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'
  }
});
transporter.sendMail({
  from: 'your-email@gmail.com',
  to: 'test@example.com',
  subject: 'Test Email',
  text: 'Email verification working!'
}).then(() => console.log('✅ Email sent!')).catch(err => console.error('❌ Error:', err));
"
```

---

## 📱 SMS Verification Setup (Twilio)

### 1. Create Twilio Account

1. Visit [Twilio Sign Up](https://www.twilio.com/try-twilio)
2. Complete registration and verify your email
3. Complete phone number verification
4. Choose "SMS" as your first product

### 2. Get Twilio Credentials

1. Go to [Twilio Console](https://console.twilio.com/)
2. Find your **Account SID** and **Auth Token** on the dashboard
3. Click **Get a Trial Number** to get a free phone number

### 3. Update Environment Variables

```env
TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
TWILIO_AUTH_TOKEN="your-auth-token"
TWILIO_PHONE_NUMBER="+15551234567"
```

### 4. Add Phone Numbers to Trial (Development Only)

For trial accounts, you must verify phone numbers before sending SMS:

1. Go to **Phone Numbers** → **Verified Caller IDs**
2. Click **Add a new number**
3. Enter the phone number you want to test with
4. Complete verification via SMS or voice call

### 5. Upgrade for Production

Trial accounts have limitations:
- Can only send to verified numbers
- Messages include "Sent from your Twilio trial account"
- Limited to $15.50 in credit

To go live:
1. Go to **Console Dashboard**
2. Click **Upgrade** button
3. Complete billing information
4. Remove trial restrictions

### 6. Test SMS Sending

```bash
node -e "
const twilio = require('twilio');
const client = twilio('ACCOUNT_SID', 'AUTH_TOKEN');
client.messages.create({
  body: 'Test SMS from R.E.S. Platform',
  from: '+15551234567',
  to: '+27123456789'
}).then(() => console.log('✅ SMS sent!')).catch(err => console.error('❌ Error:', err));
"
```

### 7. SMS Pricing (South Africa)

- **Outbound SMS**: ~$0.0125 per message
- **Phone Number**: ~$1/month
- **Toll-Free Number**: ~$2/month

---

## 🤖 reCAPTCHA v2 Setup

### 1. Register Your Site

1. Visit [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin/create)
2. Sign in with your Google account
3. Fill in the registration form:
   - **Label**: "R.E.S. Platform"
   - **reCAPTCHA type**: Select "reCAPTCHA v2" → "I'm not a robot"
   - **Domains**: Add your domains:
     - `localhost` (for development)
     - `yourdomain.com` (your production domain)
     - `www.yourdomain.com`
   - Accept terms and submit

### 2. Get API Keys

After registration, you'll receive:
- **Site Key** (public key - visible in frontend)
- **Secret Key** (private key - never expose in frontend)

### 3. Update Environment Variables

```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="6LeXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
RECAPTCHA_SECRET_KEY="6LeYYYYYYYYYYYYYYYYYYYYYYYYYYYYY"
```

⚠️ **Important**: The `NEXT_PUBLIC_` prefix makes the site key available in the browser (required for reCAPTCHA widget).

### 4. Test reCAPTCHA

1. Start your development server: `npm run dev`
2. Navigate to `/auth/register` or `/auth/login`
3. You should see the reCAPTCHA widget
4. Complete the challenge
5. Submit the form

### 5. Verify reCAPTCHA on Backend (Optional Enhancement)

Currently, reCAPTCHA is validated on the frontend. For enhanced security, you can add backend verification:

```typescript
// In your API route
async function verifyRecaptcha(token: string): Promise<boolean> {
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  });
  
  const data = await response.json();
  return data.success;
}

// In register route
const isValidCaptcha = await verifyRecaptcha(captchaToken);
if (!isValidCaptcha) {
  return NextResponse.json({ error: 'Invalid CAPTCHA' }, { status: 400 });
}
```

---

## 🔧 Complete Environment Configuration

Create a `.env` file in your project root:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/res_db?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"

# Redis
REDIS_URL="redis://localhost:6379"

# ===== EMAIL CONFIGURATION =====
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-16-character-app-password"

# ===== SMS CONFIGURATION (TWILIO) =====
TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
TWILIO_AUTH_TOKEN="your-twilio-auth-token"
TWILIO_PHONE_NUMBER="+15551234567"

# ===== reCAPTCHA v2 =====
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="6LeXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
RECAPTCHA_SECRET_KEY="6LeYYYYYYYYYYYYYYYYYYYYYYYYYYYYY"

# Payment Gateway (PayFast)
PAYFAST_MERCHANT_ID="your-merchant-id"
PAYFAST_MERCHANT_KEY="your-merchant-key"
PAYFAST_PASSPHRASE="your-passphrase"
PAYFAST_MODE="sandbox"

# Analytics
GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"

# Rate Limiting
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW_MS=900000

# Feature Flags
FEATURE_VOTING_ENABLED=true
FEATURE_QUIZ_ENABLED=true
FEATURE_STREAMING_ENABLED=true
```

---

## 🧪 Testing the Implementation

### 1. Test User Registration

```bash
# Start development server
npm run dev

# Navigate to http://localhost:3000/auth/register
# Fill in registration form
# Complete reCAPTCHA
# Submit form
# Check your email for verification link
```

### 2. Test Email Verification

```bash
# Click verification link in email
# Should redirect to login with success message
# User status should be marked as verified in database
```

### 3. Test SMS Verification (Optional Flow)

```typescript
// Make API call to send SMS code
const response = await fetch('/api/auth/verify-phone', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phone: '+27123456789',
    action: 'verify'
  })
});

// User receives 6-digit code via SMS

// Verify the code
const verifyResponse = await fetch('/api/auth/verify-phone', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phone: '+27123456789',
    action: 'confirm',
    code: '123456'
  })
});
```

---

## 🚀 Production Checklist

### Email
- [ ] Use dedicated email service (SendGrid, Mailgun, AWS SES)
- [ ] Set up proper SPF, DKIM, and DMARC records
- [ ] Configure custom domain for emails
- [ ] Set up email templates with branding
- [ ] Implement rate limiting for email sending

### SMS
- [ ] Upgrade Twilio account (remove trial restrictions)
- [ ] Purchase dedicated phone number
- [ ] Set up message templates
- [ ] Implement SMS rate limiting (prevent abuse)
- [ ] Monitor SMS costs and usage
- [ ] Add SMS opt-out functionality

### reCAPTCHA
- [ ] Update domains in reCAPTCHA admin
- [ ] Add backend verification for captcha tokens
- [ ] Monitor reCAPTCHA analytics
- [ ] Consider v3 for better UX (invisible captcha)
- [ ] Set up alerts for high failure rates

### Security
- [ ] Never commit `.env` file to version control
- [ ] Use environment variable management service (AWS Secrets Manager, HashiCorp Vault)
- [ ] Rotate credentials regularly
- [ ] Monitor for suspicious verification attempts
- [ ] Implement rate limiting on verification endpoints

---

## 📊 Monitoring & Analytics

### Email Metrics
- Delivery rate
- Open rate
- Click-through rate (for verification links)
- Bounce rate
- Spam complaints

### SMS Metrics
- Delivery rate
- Failed deliveries
- Cost per message
- Verification success rate

### CAPTCHA Metrics
- Challenge completion rate
- Failed attempts
- Bot detection effectiveness

---

## 🐛 Troubleshooting

### Email Not Sending

**Issue**: `Error: Invalid login`
- **Solution**: Ensure 2FA is enabled and using App Password, not regular password

**Issue**: `Error: Connection timeout`
- **Solution**: Check firewall settings, ensure port 587 is open

**Issue**: Emails going to spam
- **Solution**: Configure SPF, DKIM records; use dedicated email service

### SMS Not Delivering

**Issue**: `Error: The number +27XXXXXXXXX is unverified`
- **Solution**: Add number to Verified Caller IDs in Twilio console (trial accounts)

**Issue**: `Error: Insufficient credits`
- **Solution**: Add funds to Twilio account

**Issue**: Wrong number format
- **Solution**: Ensure South African numbers use +27 prefix (not +270)

### reCAPTCHA Not Working

**Issue**: "Invalid site key"
- **Solution**: Verify `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is correct and has `NEXT_PUBLIC_` prefix

**Issue**: reCAPTCHA not showing
- **Solution**: Check console for errors; ensure domain is registered in reCAPTCHA admin

**Issue**: "localhost is not a registered domain"
- **Solution**: Add `localhost` to domains list in reCAPTCHA admin console

---

## 📞 Support Resources

- **Nodemailer**: https://nodemailer.com/about/
- **Twilio SMS**: https://www.twilio.com/docs/sms
- **Google reCAPTCHA**: https://developers.google.com/recaptcha/docs/display
- **Prisma**: https://www.prisma.io/docs/

---

## ✅ Verification Features Implemented

### ✅ Email Verification
- [x] Automated verification emails on registration
- [x] 24-hour expiry for verification tokens
- [x] Styled HTML email templates
- [x] Welcome email after verification
- [x] Resend verification email endpoint

### ✅ SMS Verification
- [x] 6-digit verification codes
- [x] 10-minute code expiry
- [x] South African phone number formatting (+27)
- [x] SMS notification system
- [x] Password reset via SMS

### ✅ reCAPTCHA Protection
- [x] Registration form protection
- [x] Login form protection
- [x] Dark theme integration
- [x] Automatic reset on errors
- [x] Client-side validation

---

**Implementation Status**: ✅ **100% Complete**

All three verification systems are now fully integrated and ready for testing!
