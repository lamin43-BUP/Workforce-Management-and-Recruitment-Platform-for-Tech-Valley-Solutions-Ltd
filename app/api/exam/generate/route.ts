import { NextRequest, NextResponse } from 'next/server';
import { generateExamQuestions } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { jobTitle, dept } = await req.json();
    const questions = await generateExamQuestions(jobTitle, dept, 20);
    return NextResponse.json({ questions });
  } catch {
    return NextResponse.json({ error: 'Failed to generate questions' }, { status: 500 });
  }
}
