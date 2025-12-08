import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./src/lib/auth";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/admin")) {
    const auth = req.cookies.get("admin_token")?.value;
    if (!auth) return NextResponse.redirect(new URL("/admin/login", req.url));
    const valid = verifyToken(auth);
    if (!valid) return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/admin/:path*"],
};
