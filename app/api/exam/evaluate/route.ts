import { NextRequest, NextResponse } from 'next/server';
import { evaluateExamAnswers } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { questions, answers, jobTitle } = await req.json();
    const result = await evaluateExamAnswers(questions, answers, jobTitle);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Evaluation failed' }, { status: 500 });
  }
}
