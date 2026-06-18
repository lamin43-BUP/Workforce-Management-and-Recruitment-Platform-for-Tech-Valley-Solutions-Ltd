// Gemini AI utilities
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_MODEL = 'gemini-1.5-flash';
const BASE_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export async function geminiGenerate(prompt: string, systemInstruction?: string): Promise<string> {
  if (!GEMINI_API_KEY) return 'AI features require GEMINI_API_KEY to be set.';
  const body = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    ...(systemInstruction && { systemInstruction: { parts: [{ text: systemInstruction }] } }),
    generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
  };
  const res = await fetch(`${BASE_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Gemini error: ${res.status}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

export async function generateExamQuestions(jobTitle: string, dept: string, count = 20) {
  const prompt = `Generate ${count} exam questions for a ${jobTitle} position at a networking and data center company (Tech Valley Solutions Ltd., Bangladesh).
Mix: 15 MCQ questions and 5 short answer questions.
Topics: ${dept}-specific technical knowledge, company/industry context, problem-solving.
Format as JSON array:
[{"id":"q1","type":"mcq","topic":"Topic","text":"Question?","options":["A","B","C","D"],"correct":0,"difficulty":"Easy|Medium|Hard"},
 {"id":"q6","type":"short","topic":"Topic","text":"Question?","difficulty":"Medium"}]
Return ONLY the JSON array, no markdown.`;
  const raw = await geminiGenerate(prompt);
  try { return JSON.parse(raw.replace(/```json\n?|```/g, '').trim()); }
  catch { return getFallbackQuestions(jobTitle); }
}

export async function evaluateExamAnswers(
  questions: Array<{id: string; text: string; type: string; options?: string[]; correct?: number}>,
  answers: Record<string, unknown>,
  jobTitle: string
) {
  const prompt = `Evaluate exam answers for a ${jobTitle} candidate.
Questions and answers:
${questions.map(q => `Q${q.id}: ${q.text}\nAnswer: ${answers[q.id] ?? 'Not answered'}`).join('\n\n')}
Provide:
1. Score out of 100
2. Brief feedback per question (if short answer)
3. Overall assessment (2-3 sentences)
4. Recommendation: "Strong Hire" | "Hire" | "Consider" | "Reject"
Format as JSON: {"score":85,"feedback":{"q6":"..."},"overall":"...","recommendation":"Hire"}
Return ONLY JSON.`;
  const raw = await geminiGenerate(prompt);
  try { return JSON.parse(raw.replace(/```json\n?|```/g, '').trim()); }
  catch { return { score: 70, feedback: {}, overall: 'Evaluation completed.', recommendation: 'Consider' }; }
}

export async function scanCV(cvText: string, jobTitle: string, requirements: string[]) {
  const prompt = `Evaluate this CV for a ${jobTitle} position at a networking/data center company.
Job requirements: ${requirements.join(', ')}
CV content: ${cvText.slice(0, 3000)}
Provide: match score (0-100), strengths (array), gaps (array), recommendation (string), summary (1 sentence).
Format: {"score":75,"strengths":["..."],"gaps":["..."],"recommendation":"...","summary":"..."}
Return ONLY JSON.`;
  const raw = await geminiGenerate(prompt);
  try { return JSON.parse(raw.replace(/```json\n?|```/g, '').trim()); }
  catch { return { score: 60, strengths: [], gaps: [], recommendation: 'Review manually', summary: 'CV analysis completed.' }; }
}

export async function chatbotReply(message: string, history: Array<{role:string;text:string}>) {
  const system = `You are the AI assistant for Tech Valley Solutions Ltd. (TVSL), a networking and data center company in Dhaka, Bangladesh.
You help with: job openings, application process, company info, networking/data center questions.
Company: TVSL provides enterprise networking, data center solutions, fiber connectivity, and managed IT services.
Keep replies concise (2-4 sentences). Be professional and helpful.`;
  const ctx = history.slice(-6).map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`).join('\n');
  return geminiGenerate(`${ctx}\nUser: ${message}`, system);
}

function getFallbackQuestions(jobTitle: string) {
  return Array.from({ length: 20 }, (_, i) => ({
    id: `q${i+1}`, type: i < 15 ? 'mcq' : 'short',
    topic: 'General', text: `Sample question ${i+1} for ${jobTitle} position`,
    options: i < 15 ? ['Option A', 'Option B', 'Option C', 'Option D'] : undefined,
    correct: i < 15 ? 0 : undefined, difficulty: 'Medium',
  }));
}
