import { NextRequest, NextResponse } from 'next/server';
import { scanCV } from '@/lib/gemini';
import { JOBS_DATA } from '@/lib/data';

export async function POST(req: NextRequest) {
  try {
    const { cvText, jobId } = await req.json();
    const job = JOBS_DATA.find(j => j.id === jobId);
    if (!job) return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    const result = await scanCV(cvText, job.title, job.requirements);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'CV scan failed' }, { status: 500 });
  }
}
