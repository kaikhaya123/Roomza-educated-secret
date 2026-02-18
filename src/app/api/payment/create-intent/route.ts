import { NextRequest, NextResponse } from 'next/server'

export async function POST(_req: NextRequest) {
  return NextResponse.json({ error: 'Payment processing not yet configured' }, { status: 503 })
}
