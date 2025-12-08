import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signAdmin } from "@/lib/auth";

export async function POST(req) {
  const { email, password } = await req.json();
  const admin = await prisma.admin.findUnique({ where: { email }});
  if (!admin) return new Response(JSON.stringify({ error: "Invalid" }), { status: 401 });

  const ok = await bcrypt.compare(password, admin.password);
  if (!ok) return new Response(JSON.stringify({ error: "Invalid" }), { status: 401 });

  const token = signAdmin({ id: admin.id, email: admin.email });
  return new Response(JSON.stringify({ token }), { status: 200 });
}
