import { NextRequest, NextResponse } from "next/server";

// Student endpoint - currently disabled as student model not in schema
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json(
    { error: "Students API not implemented" },
    { status: 501 }
  );
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json(
    { error: "Students API not implemented" },
    { status: 501 }
  );
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json(
    { error: "Students API not implemented" },
    { status: 501 }
  );
}
