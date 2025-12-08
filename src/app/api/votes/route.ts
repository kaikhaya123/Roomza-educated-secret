import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { contestantId, voteCount = 1, isPaid = false } = await req.json();
  const updated = await prisma.$transaction([
    prisma.vote.create({ 
      data: { 
        contestantId, 
        voteCount, 
        isPaid,
        votingRound: 1,
        userId: "" // Placeholder - should use actual userId from session
      } 
    }),
  ]);
  return NextResponse.json({ success: true }, { status: 200 });
}
