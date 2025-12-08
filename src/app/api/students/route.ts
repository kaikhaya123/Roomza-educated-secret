import { NextRequest, NextResponse } from "next/server";

// Students endpoint - currently disabled as student model not in schema
export async function GET() {
  return NextResponse.json(
    { error: "Students API not implemented" },
    { status: 501 }
  );
}

export async function POST(req: NextRequest) {
  return NextResponse.json(
    { error: "Students API not implemented" },
    { status: 501 }
  );
}
