import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Get current vote totals by contestant
    const { data: votes, error } = await supabase
      .from('Vote')
      .select(`
        contestantId,
        voteCount,
        Contestant:contestantId (
          id,
          firstName,
          lastName,
          photoUrl
        )
      `);

    if (error) {
      console.error('Error fetching votes:', error);
      return NextResponse.json({ error: 'Failed to fetch vote data' }, { status: 500 });
    }

    // Aggregate votes by contestant
    const votesByContestant = votes?.reduce((acc: any, vote: any) => {
      const contestantId = vote.contestantId;
      const contestant = vote.Contestant;
      
      if (!acc[contestantId]) {
        acc[contestantId] = {
          id: contestantId,
          name: `${contestant?.firstName || ''} ${contestant?.lastName || ''}`.trim(),
          photoUrl: contestant?.photoUrl,
          votes: 0
        };
      }
      
      acc[contestantId].votes += vote.voteCount;
      return acc;
    }, {}) || {};

    // Convert to array and sort by votes
    const contestants = Object.values(votesByContestant)
      .sort((a: any, b: any) => b.votes - a.votes)
      .slice(0, 10); // Top 10 contestants

    return NextResponse.json({
      contestants,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Vote stream error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
