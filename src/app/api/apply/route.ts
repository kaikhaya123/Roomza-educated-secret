import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabase';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      institution,
      campus,
      province,
      homeAddress,
      bio,
    } = body;

    if (!firstName || !lastName || !email || !institution) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const id = randomUUID();

    const { error } = await supabase.from('Contestant').insert({
      id,
      firstName,
      lastName,
      province: province || null,
      homeAddress: homeAddress || null,
      phone: phone || null,
      municipality: null,
      town: null,
      institution,
      campus: campus || null,
      residence: null,
      bio: bio || null,
      photoUrl: null,
      isActive: true,
      isEliminated: false,
    });

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id });
  } catch (err: any) {
    console.error('Apply POST error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
