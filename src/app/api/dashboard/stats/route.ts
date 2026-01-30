import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Get total votes cast
    const { count: totalVotes, error: votesError } = await supabase
      .from('Vote')
      .select('id', { count: 'exact', head: true });

    if (votesError) {
      console.error('Error fetching votes count:', votesError);
    }

    // Get total active contestants
    const { count: totalContestants, error: contestantsError } = await supabase
      .from('Contestant')
      .select('id', { count: 'exact', head: true })
      .eq('isActive', true)
      .eq('isEliminated', false);

    if (contestantsError) {
      console.error('Error fetching contestants count:', contestantsError);
    }

    // Get total registered users
    const { count: totalUsers, error: usersError } = await supabase
      .from('User')
      .select('id', { count: 'exact', head: true });

    if (usersError) {
      console.error('Error fetching users count:', usersError);
    }

    // Get top 5 contestants by vote count
    const { data: topContestants, error: topError } = await supabase
      .from('Vote')
      .select(`
        contestantId,
        voteCount,
        Contestant:contestantId (
          firstName,
          lastName
        )
      `)
      .order('voteCount', { ascending: false })
      .limit(5);

    if (topError) {
      console.error('Error fetching top contestants:', topError);
    }

    // Calculate leaderboard with aggregated votes
    const leaderboard = [];
    if (topContestants) {
      const votesByContestant = topContestants.reduce((acc: any, vote: any) => {
        const contestantId = vote.contestantId;
        const contestant = vote.Contestant;
        
        if (!acc[contestantId]) {
          acc[contestantId] = {
            id: contestantId,
            name: `${contestant?.firstName || ''} ${contestant?.lastName || ''}`.trim(),
            votes: 0
          };
        }
        
        acc[contestantId].votes += vote.voteCount;
        return acc;
      }, {});

      leaderboard.push(...Object.values(votesByContestant)
        .sort((a: any, b: any) => b.votes - a.votes)
        .slice(0, 5));
    }

    const stats = {
      votesCast: totalVotes || 0,
      totalContestants: totalContestants || 0,
      totalUsers: totalUsers || 0,
      leaderboard: leaderboard
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
}