import { NextRequest, NextResponse } from "next/server";

// Admin login endpoint - currently disabled as admin model not in schema
export async function POST(req: NextRequest) {
  return NextResponse.json(
    { error: "Admin login not yet implemented" },
    { status: 503 }
  );
}
