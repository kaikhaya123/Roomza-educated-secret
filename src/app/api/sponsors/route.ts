import prisma from "@/lib/db";

export async function GET() {
  const list = await prisma.sponsor.findMany({ orderBy: { createdAt: "desc" }});
  return new Response(JSON.stringify(list), { status: 200 });
}

export async function POST(req) {
  const data = await req.json();
  const created = await prisma.sponsor.create({ data });
  return new Response(JSON.stringify(created), { status: 201 });
}
