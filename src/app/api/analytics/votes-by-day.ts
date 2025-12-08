import prisma from "@/lib/db";

export async function GET() {
  // Example: aggregate votes by day
  const result = await prisma.vote.groupBy({
    by: ['createdAt'],
    _count: { id: true },
    orderBy: { createdAt: 'asc' }
  });
  const data = result.map(row => ({
    label: row.createdAt.toISOString().slice(0, 10),
    votes: row._count.id
  }));
  return new Response(JSON.stringify(data), { status: 200 });
}
