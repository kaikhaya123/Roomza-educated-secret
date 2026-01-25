import { NextRequest, NextResponse } from 'next/server';
import { cacheGet, cacheSet, CACHE_KEYS, CACHE_TTL } from '@/lib/redis';
import { supabase } from '@/lib/supabase';

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

    // Fetch contestants page
    const { data: contestants, error } = await supabase
      .from('Contestant')
      .select('id, firstName, lastName, bio, institution, campus, province, photoUrl')
      .eq('isActive', true)
      .eq('isEliminated', false)
      .order('createdAt', { ascending: false })
      .range((page - 1) * limit, page * limit - 1)
      .filter('province', province ? 'eq' : 'is', province ?? null);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch contestants' },
        { status: 500 }
      );
    }

    const { count: total, error: countError } = await supabase
      .from('Contestant')
      .select('id', { count: 'exact', head: true })
      .eq('isActive', true)
      .eq('isEliminated', false)
      .filter('province', province ? 'eq' : 'is', province ?? null);

    if (countError) {
      return NextResponse.json(
        { error: 'Failed to count contestants' },
        { status: 500 }
      );
    }

    // Fetch vote totals per contestant
    const contestantIds = (contestants ?? []).map((c) => c.id);
    let voteTotals: Record<string, number> = {};
    if (contestantIds.length > 0) {
      const { data: votes, error: votesError } = await supabase
        .from('Vote')
        .select('contestantId, voteCount')
        .in('contestantId', contestantIds);

      if (!votesError && votes) {
        voteTotals = votes.reduce((acc, v) => {
          acc[v.contestantId] = (acc[v.contestantId] ?? 0) + (v.voteCount ?? 0);
          return acc;
        }, {} as Record<string, number>);
      }
    }

    // Calculate vote counts
    const contestantsWithVotes = (contestants ?? []).map((contestant) => ({
      ...contestant,
      totalVotes: voteTotals[contestant.id] ?? 0,
    }));

    const response = {
      contestants: contestantsWithVotes,
      pagination: {
        page,
        limit,
        total: total ?? 0,
        pages: Math.ceil((total ?? 0) / limit),
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
