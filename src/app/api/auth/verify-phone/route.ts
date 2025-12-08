import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Generate 6-digit verification code
function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Store codes in memory (for development; use Redis in production)
const verificationCodes: Record<string, { code: string; expiresAt: number }> = {};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, action, code } = body;

    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Action 1: Send verification code
    if (action === 'verify') {
      const verificationCode = generateCode();
      const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

      // Store code
      verificationCodes[phone] = { code: verificationCode, expiresAt };

      console.log(`[SMS Verification] Code sent to ${phone}: ${verificationCode}`);

      // TODO: Integrate with Twilio to send actual SMS
      // For now, log to console for testing
      return NextResponse.json(
        {
          message: 'Verification code sent',
          // Remove in production - only for testing
          ...(process.env.NODE_ENV === 'development' && { code: verificationCode }),
        },
        { status: 200 }
      );
    }

    // Action 2: Confirm verification code
    if (action === 'confirm') {
      if (!code) {
        return NextResponse.json(
          { error: 'Verification code is required' },
          { status: 400 }
        );
      }

      const stored = verificationCodes[phone];

      if (!stored) {
        return NextResponse.json(
          { error: 'No verification code sent for this phone number' },
          { status: 400 }
        );
      }

      if (stored.expiresAt < Date.now()) {
        delete verificationCodes[phone];
        return NextResponse.json(
          { error: 'Verification code expired' },
          { status: 400 }
        );
      }

      if (stored.code !== code.toString()) {
        return NextResponse.json(
          { error: 'Invalid verification code' },
          { status: 400 }
        );
      }

      // Code is valid - mark phone as verified
      delete verificationCodes[phone];

      console.log(`[SMS Verification] Phone verified: ${phone}`);

      return NextResponse.json(
        { message: 'Phone number verified successfully' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'Invalid action. Use "verify" or "confirm"' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('[SMS Verification Error]:', error);
    return NextResponse.json(
      { error: 'An error occurred during phone verification' },
      { status: 500 }
    );
  }
}
