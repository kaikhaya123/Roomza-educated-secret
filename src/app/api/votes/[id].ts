import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const vote = await prisma.vote.findUnique({ where: { id: params.id } });
  if (!vote) return NextResponse.json({ error: "Vote not found" }, { status: 404 });
  await prisma.vote.delete({ where: { id: params.id } });
  return NextResponse.json(null, { status: 204 });
}
