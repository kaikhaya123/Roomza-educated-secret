import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  const { contestantId, voteCount = 1, isPaid = false, userId } = await req.json();

  if (!contestantId || !userId) {
    return NextResponse.json({ error: "contestantId and userId are required" }, { status: 400 });
  }

  const { error } = await supabase
    .from("Vote")
    .insert({
      id: randomUUID(),
      contestantId,
      voteCount,
      isPaid,
      votingRound: 1,
      userId,
    });

  if (error) {
    return NextResponse.json({ error: "Failed to record vote", details: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
