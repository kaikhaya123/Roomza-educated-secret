import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { cacheGet, cacheSet, CACHE_KEYS, CACHE_TTL } from '@/lib/redis';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const province = searchParams.get('province');
    
    const cacheKey = `${CACHE_KEYS.CONTESTANTS}:${page}:${limit}:${province || 'all'}`;
    
    // Try to get from cache
    const cached = await cacheGet(cacheKey);
    if (cached) {
      return NextResponse.json(cached);
    }

    const where = {
      isActive: true,
      isEliminated: false,
      ...(province && { province: province as any }),
    };

    const [contestants, total] = await Promise.all([
      prisma.contestant.findMany({
        where,
        orderBy: { totalVotes: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          name: true,
          bio: true,
          institution: true,
          campus: true,
          province: true,
          imageUrl: true,
          totalVotes: true,
          weeklyVotes: true,
        },
      }),
      prisma.contestant.count({ where }),
    ]);

    const response = {
      contestants,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };

    // Cache the result
    await cacheSet(cacheKey, response, CACHE_TTL.SHORT);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching contestants:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contestants' },
      { status: 500 }
    );
  }
}
