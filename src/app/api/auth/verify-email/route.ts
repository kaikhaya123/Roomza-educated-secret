import { NextRequest, NextResponse } from 'next/server';
import { verifyEmailToken } from '@/lib/email';
import { sendWelcomeEmail } from '@/lib/email';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.redirect(
        new URL('/auth/login?error=missing-token', process.env.NEXTAUTH_URL!)
      );
    }

    // Verify the token and get the email
    const email = await verifyEmailToken(token);

    if (!email) {
      return NextResponse.redirect(
        new URL('/auth/login?error=invalid-token', process.env.NEXTAUTH_URL!)
      );
    }

    // Update user verification status
    const user = await prisma.user.update({
      where: { email },
      data: { isVerified: true },
    });

    // Send welcome email
    await sendWelcomeEmail(user.email, user.firstName);

    return NextResponse.redirect(
      new URL('/auth/login?verified=true', process.env.NEXTAUTH_URL!)
    );
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.redirect(
      new URL('/auth/login?error=verification-failed', process.env.NEXTAUTH_URL!)
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (user.isVerified) {
      return NextResponse.json(
        { error: 'Email already verified' },
        { status: 400 }
      );
    }

    // Send new verification email
    const { sendVerificationEmail } = await import('@/lib/email');
    await sendVerificationEmail(user.email, user.firstName);

    return NextResponse.json(
      { message: 'Verification email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Resend verification error:', error);
    return NextResponse.json(
      { error: 'Failed to send verification email' },
      { status: 500 }
    );
  }
}
