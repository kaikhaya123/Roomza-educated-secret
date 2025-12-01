import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { cacheGet, cacheSet, CACHE_KEYS, CACHE_TTL } from '@/lib/redis';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const cacheKey = CACHE_KEYS.QUIZ('daily');
    
    // Try to get from cache
    const cached = await cacheGet(cacheKey);
    if (cached) {
      return NextResponse.json(cached);
    }

    // Get today's quiz
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const quiz = await prisma.quiz.findFirst({
      where: {
        isActive: true,
        scheduledFor: {
          gte: today,
          lt: tomorrow,
        },
      },
      include: {
        questions: {
          orderBy: { order: 'asc' },
          select: {
            id: true,
            question: true,
            options: true,
            points: true,
            order: true,
            // Don't include correctAnswer
          },
        },
      },
    });

    if (!quiz) {
      return NextResponse.json(
        { error: 'No quiz available for today' },
        { status: 404 }
      );
    }

    // Check if user has already attempted this quiz
    const attempt = await prisma.quizAttempt.findUnique({
      where: {
        userId_quizId: {
          userId: session.user.id,
          quizId: quiz.id,
        },
      },
    });

    if (attempt) {
      return NextResponse.json(
        { 
          error: 'You have already completed today\'s quiz',
          attempt,
        },
        { status: 400 }
      );
    }

    // Cache the result
    await cacheSet(cacheKey, quiz, CACHE_TTL.MEDIUM);

    return NextResponse.json(quiz);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quiz' },
      { status: 500 }
    );
  }
}
