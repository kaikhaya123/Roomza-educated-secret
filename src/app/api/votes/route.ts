import prisma from "@/lib/db";

export async function POST(req) {
  const { contestantId, ip } = await req.json();
  const updated = await prisma.$transaction([
    prisma.vote.create({ data: { contestantId, ip } }),
    prisma.contestant.update({
      where: { id: contestantId },
      data: { votes: { increment: 1 } }
    })
  ]);
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
