import { NextResponse } from 'next/server';

// Streaming votes endpoint is disabled until a Supabase-compatible stream is implemented.
export async function GET() {
  return NextResponse.json(
    { error: 'Live vote stream not implemented with Supabase yet' },
    { status: 501 }
  );
}
