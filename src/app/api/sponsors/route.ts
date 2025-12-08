import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const list = await prisma.sponsor.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(list, { status: 200 });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const created = await prisma.sponsor.create({ data });
  return NextResponse.json(created, { status: 201 });
}
