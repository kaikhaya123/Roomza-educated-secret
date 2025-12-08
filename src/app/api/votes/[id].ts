import prisma from "@/lib/db";

export async function DELETE(req: Request, { params }: any) {
  const id = Number(params.id);
  // Find vote and decrement contestant votes
  const vote = await prisma.vote.findUnique({ where: { id } });
  if (!vote) return new Response(JSON.stringify({ error: "Vote not found" }), { status: 404 });
  await prisma.$transaction([
    prisma.vote.delete({ where: { id } }),
    prisma.contestant.update({ where: { id: vote.contestantId }, data: { votes: { decrement: 1 } } })
  ]);
  return new Response(null, { status: 204 });
}
