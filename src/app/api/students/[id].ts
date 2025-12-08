import prisma from "@/lib/db";

export async function GET(req) {
  const id = Number(req.params.id);
  const item = await prisma.student.findUnique({ where: { id }});
  return new Response(JSON.stringify(item), { status: 200 });
}

export async function PUT(req) {
  const id = Number(req.params.id);
  const body = await req.json();
  const updated = await prisma.student.update({ where: { id }, data: body });
  return new Response(JSON.stringify(updated), { status: 200 });
}

export async function DELETE(req) {
  const id = Number(req.params.id);
  await prisma.student.delete({ where: { id }});
  return new Response(null, { status: 204 });
}
