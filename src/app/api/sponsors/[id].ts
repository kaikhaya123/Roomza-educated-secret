import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const item = await prisma.sponsor.findUnique({ where: { id: params.id } });
  return NextResponse.json(item, { status: 200 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const updated = await prisma.sponsor.update({ 
    where: { id: params.id }, 
    data: body 
  });
  return NextResponse.json(updated, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.sponsor.delete({ where: { id: params.id } });
  return NextResponse.json(null, { status: 204 });
}
