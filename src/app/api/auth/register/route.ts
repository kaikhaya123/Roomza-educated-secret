import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { studentRegistrationSchema, publicRegistrationSchema } from '@/lib/validations';
import { generateRandomString } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userType, ...data } = body;

    // Validate based on user type
    const schema = userType === 'STUDENT' ? studentRegistrationSchema : publicRegistrationSchema;
    const validatedData = schema.parse(data);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        userType: userType || 'PUBLIC',
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        phone: validatedData.phone,
        dateOfBirth: new Date(validatedData.dateOfBirth),
        province: validatedData.province,
        homeAddress: validatedData.homeAddress,
        municipality: 'municipality' in validatedData ? validatedData.municipality : undefined,
        town: 'town' in validatedData ? validatedData.town : undefined,
        institution: 'institution' in validatedData ? validatedData.institution : undefined,
        campus: 'campus' in validatedData ? validatedData.campus : undefined,
        residence: 'residence' in validatedData ? validatedData.residence : undefined,
      },
    });

    // Send verification email
    try {
      const { sendVerificationEmail } = await import('@/lib/email');
      await sendVerificationEmail(user.email, user.firstName);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Don't fail registration if email fails
    }

    return NextResponse.json(
      {
        message: 'Registration successful! Please check your email to verify your account.',
        userId: user.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}
