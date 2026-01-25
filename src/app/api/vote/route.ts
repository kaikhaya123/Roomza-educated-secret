import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redis, cacheDeletePattern } from '@/lib/redis';
import { voteSchema } from '@/lib/validations';
import { supabase } from '@/lib/supabase';
import { randomUUID } from 'crypto';

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

    const { data: voteRows, error: votesError } = await supabase
      .from('Vote')
      .select('voteCount, createdAt')
      .eq('userId', session.user.id)
      .gte('createdAt', today.toISOString());

    if (votesError) {
      return NextResponse.json({ error: 'Failed to fetch votes' }, { status: 500 });
    }

    const totalVotestoday = (voteRows ?? []).reduce((sum, row) => sum + (row.voteCount ?? 0), 0);
    const remainingVotes = validatedData.isPaid ? 10000 : 100; // Higher limit for paid users

    if (totalVotestoday + validatedData.voteCount > remainingVotes) {
      return NextResponse.json(
        { error: `You have exceeded your daily vote limit. Remaining: ${remainingVotes - totalVotestoday}` },
        { status: 400 }
      );
    }

    // Check if contestant exists and is active
    const { data: contestant, error: contestantError } = await supabase
      .from('Contestant')
      .select('isActive, isEliminated')
      .eq('id', validatedData.contestantId)
      .maybeSingle();

    if (contestantError) {
      return NextResponse.json(
        { error: 'Failed to fetch contestant' },
        { status: 500 }
      );
    }

    if (!contestant || !contestant.isActive || contestant.isEliminated) {
      return NextResponse.json(
        { error: 'Invalid contestant or contestant is no longer in the competition' },
        { status: 400 }
      );
    }

    // Create vote in a transaction
    const { data: inserted, error: insertError } = await supabase
      .from('Vote')
      .insert({
        id: randomUUID(),
        userId: session.user.id,
        contestantId: validatedData.contestantId,
        voteCount: validatedData.voteCount,
        isPaid: validatedData.isPaid,
        votingRound: currentRound,
      })
      .select('*')
      .single();

    if (insertError) {
      return NextResponse.json(
        { error: 'Failed to cast vote', details: insertError.message },
        { status: 400 }
      );
    }

    // Invalidate caches
    await cacheDeletePattern('contestants:*');
    await cacheDeletePattern('leaderboard:*');

    return NextResponse.json({
      message: 'Vote cast successfully!',
      vote: inserted,
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

    const { data: voteRows, error: votesError } = await supabase
      .from('Vote')
      .select('voteCount, createdAt')
      .eq('userId', session.user.id)
      .gte('createdAt', today.toISOString());

    if (votesError) {
      return NextResponse.json(
        { error: 'Failed to fetch vote status' },
        { status: 500 }
      );
    }

    const totalVotes = (voteRows ?? []).reduce((sum, row) => sum + (row.voteCount ?? 0), 0);

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
