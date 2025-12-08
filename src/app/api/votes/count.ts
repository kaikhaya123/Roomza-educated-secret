import prisma from "@/lib/db";

export async function GET() {
  const count = await prisma.vote.count();
  return new Response(JSON.stringify({ count }), { status: 200 });
}
