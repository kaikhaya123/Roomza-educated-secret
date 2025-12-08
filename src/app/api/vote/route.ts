import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redis, cacheDeletePattern } from '@/lib/redis';
import { voteSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = voteSchema.parse(body);

    // Get current voting round (you can customize this logic)
    const currentRound = Math.ceil((Date.now() - new Date('2025-01-01').getTime()) / (7 * 24 * 60 * 60 * 1000));

    // Check daily vote limit
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const votesToday = await prisma.vote.aggregate({
      where: {
        userId: session.user.id,
        createdAt: {
          gte: today,
        },
      },
      _sum: {
        voteCount: true,
      },
    });

    const totalVotestoday = votesToday._sum.voteCount || 0;
    const remainingVotes = validatedData.isPaid ? 10000 : 100; // Higher limit for paid users

    if (totalVotestoday + validatedData.voteCount > remainingVotes) {
      return NextResponse.json(
        { error: `You have exceeded your daily vote limit. Remaining: ${remainingVotes - totalVotestoday}` },
        { status: 400 }
      );
    }

    // Check if contestant exists and is active
    const contestant = await prisma.contestant.findUnique({
      where: { id: validatedData.contestantId },
    });

    if (!contestant || !contestant.isActive || contestant.isEliminated) {
      return NextResponse.json(
        { error: 'Invalid contestant or contestant is no longer in the competition' },
        { status: 400 }
      );
    }

    // Create vote in a transaction
    const result = await prisma.$transaction([
      prisma.vote.create({
        data: {
          userId: session.user.id,
          contestantId: validatedData.contestantId,
          voteCount: validatedData.voteCount,
          isPaid: validatedData.isPaid,
          votingRound: currentRound,
        },
      }),
    ]);

    // Invalidate caches
    await cacheDeletePattern('contestants:*');
    await cacheDeletePattern('leaderboard:*');

    return NextResponse.json({
      message: 'Vote cast successfully!',
      vote: result[0],
    });
  } catch (error: any) {
    console.error('Vote error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to cast vote' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const votesToday = await prisma.vote.aggregate({
      where: {
        userId: session.user.id,
        createdAt: {
          gte: today,
        },
      },
      _sum: {
        voteCount: true,
      },
    });

    const totalVotes = votesToday._sum.voteCount || 0;

    return NextResponse.json({
      totalVotesToday: totalVotes,
      remainingVotes: 100 - totalVotes,
      limit: 100,
    });
  } catch (error) {
    console.error('Error fetching vote status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vote status' },
      { status: 500 }
    );
  }
}
