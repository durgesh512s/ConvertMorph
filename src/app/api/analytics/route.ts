import { NextResponse } from 'next/server';

type Event = { 
  name: string; 
  tool?: string; 
  sizeMb?: number; 
  pages?: number; 
  durationMs?: number; 
  code?: string; 
  t: number 
};

const ring: Event[] = [];

export async function POST(req: Request) {
  try {
    const e = await req.json();
    const evt: Event = { ...e, t: Date.now() };
    ring.push(evt);
    if (ring.length > 500) ring.shift();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
