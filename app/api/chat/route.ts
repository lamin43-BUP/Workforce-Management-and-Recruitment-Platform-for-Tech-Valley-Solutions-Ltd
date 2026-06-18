// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';

const TVSL_KNOWLEDGE = `
TVSL (Tech Valley Solutions Ltd.) is a networking and data center company in Dhaka, Bangladesh.
Website: tvsl-bd.com
Services: Enterprise networking (Cisco/Juniper), Data center solutions, Managed IT services, Fiber connectivity, 24/7 network monitoring.
Open positions: Network Engineer (৳60,000–90,000/mo), Server Administrator (৳55,000–80,000/mo), IT Support Specialist (৳35,000–55,000/mo), Sales Executive (৳40,000–70,000 + commission).
Application process: Apply online → AI-generated technical exam (45 min, 20 questions) → shortlisting → interview → offer.
The AI exam has 15 MCQ and 5 short-answer questions tailored to the specific role.
Location: Dhaka, Bangladesh. Founded 5+ years ago. 200+ enterprise clients. 50+ team members. 99.9% uptime SLA.
CEO: Md Shahrukh Hossain.
Contact: info@tvsl-bd.com
`;

// Predefined Q&A pairs (checked before Gemini/local fallback)
const PREDEFINED_QA = [
  {
    patterns: [
      "what services does tech valley solutions provide",
      "what services does tvsl provide",
      "tvsl services",
      "services offered by tvsl",
      "what services do you offer",
      "company services"
    ],
    answer: "Tech Valley Solutions Limited provides a wide range of IT infrastructure and enterprise technology services including network design, server management, data center solutions, cybersecurity implementation, and managed IT services. The company also supports organizations with system monitoring, technical support, and infrastructure optimization. In addition, it delivers custom software solutions and enterprise-level IT consultancy to improve operational efficiency. These services are designed to ensure secure, scalable, and reliable IT environments for business organizations."
  },
  {
    patterns: [
      "how can i apply for a job",
      "how to apply for a job",
      "job application process",
      "apply for job",
      "how do i apply",
      "application procedure",
      "how to submit application"
    ],
    answer: "To apply for a job, users first need to create an account and log in to the recruitment portal. After logging in, they can browse available job listings and select a suitable position. Each job page contains detailed requirements and an application form. Applicants must fill in personal information, academic background, skills, and upload their CV. Once submitted, the application is stored in the system and automatically forwarded to the AI evaluation pipeline for further processing and screening."
  },
  {
    patterns: [
      "how does the company handle client network issues",
      "network issues support",
      "client support requests",
      "how to report a network problem",
      "network problem handling",
      "client network issues",
      "support ticket system"
    ],
    answer: "The system provides a structured workflow for handling client support requests. Clients can submit issues through the portal by describing their network or IT problems. These requests are stored in the system and assigned to the relevant support team or technician based on category and priority. The assigned personnel can then track, update, and resolve the issue within the platform. This ensures faster response time, proper tracking, and improved service quality for enterprise clients."
  },
  {
    patterns: [
      "how does the system manage network devices",
      "network device management",
      "manage infrastructure devices",
      "client network devices",
      "device inventory management",
      "network infrastructure management",
      "how are devices tracked"
    ],
    answer: "The system maintains a centralized inventory of all client network devices such as routers, switches, firewalls, servers, and access points. Each device is recorded with details like configuration, location, status, and assigned technician. The platform allows administrators to monitor device health and update records in real time. This structured management helps in reducing downtime, improving maintenance efficiency, and ensuring better control over enterprise IT infrastructure."
  },
  {
    patterns: [
      "how does the system support communication between clients and company",
      "client communication",
      "communication module",
      "how to contact support",
      "client company communication",
      "messaging system",
      "how do clients communicate"
    ],
    answer: "The system includes a communication module that enables direct interaction between clients and support teams. Clients can submit inquiries, track service progress, and receive updates through the platform. Internal teams can also communicate using role-based messaging and notifications. This improves transparency, reduces communication gaps, and ensures that all client requests are handled in an organized and timely manner across the organization."
  }
];

// Check if message matches any predefined Q&A
function getPredefinedAnswer(message: string): string | null {
  const msgLower = message.toLowerCase().trim();
  
  for (const qa of PREDEFINED_QA) {
    for (const pattern of qa.patterns) {
      // Check if pattern is contained in message OR message is contained in pattern
      if (msgLower.includes(pattern) || pattern.includes(msgLower)) {
        return qa.answer;
      }
    }
  }
  
  return null;
}

async function geminiChat(message: string, history: Array<{role:string;text:string}>) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  
  const ctx = history.slice(-6).map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`).join('\n');
  const prompt = `${ctx ? ctx + '\n' : ''}User: ${message}`;
  
  const body = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: `You are the AI assistant for Tech Valley Solutions Ltd. (TVSL), a networking and data center company in Dhaka, Bangladesh. Use this knowledge:\n${TVSL_KNOWLEDGE}\nBe concise (2-4 sentences), professional, and helpful. If asked something unrelated to TVSL, politely redirect.` }] },
    generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
  };
  
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
}

function localReply(message: string): string {
  const msg = message.toLowerCase();
  if (msg.includes('service') || msg.includes('offer') || msg.includes('do you'))
    return 'TVSL offers enterprise networking (Cisco/Juniper), data center solutions, managed IT services, and fiber connectivity across Bangladesh. We serve 200+ enterprise clients with 99.9% uptime SLA.';
  if (msg.includes('job') || msg.includes('position') || msg.includes('opening') || msg.includes('hire') || msg.includes('career'))
    return 'We currently have 4 open positions: Network Engineer (৳60–90k/mo), Server Administrator (৳55–80k/mo), IT Support Specialist (৳35–55k/mo), and Sales Executive. Click "Careers" to view details and apply!';
  if (msg.includes('apply') || msg.includes('application') || msg.includes('how to'))
    return 'To apply: go to Careers, select a job, complete the 3-step form (personal info, education, CV upload), then take an AI-generated technical exam. Top scorers are shortlisted for interviews.';
  if (msg.includes('exam') || msg.includes('test') || msg.includes('assessment'))
    return 'The AI exam is 45 minutes long with 20 questions — 15 multiple choice and 5 short-answer questions tailored to the specific role. It\'s auto-generated by Gemini AI and evaluated instantly.';
  if (msg.includes('salary') || msg.includes('pay') || msg.includes('compensation'))
    return 'Salaries range from ৳35,000–৳90,000/month depending on role, plus commission for sales positions. Final offers depend on experience and exam performance.';
  if (msg.includes('location') || msg.includes('where') || msg.includes('office') || msg.includes('address'))
    return 'TVSL is headquartered in Dhaka, Bangladesh. Visit us at tvsl-bd.com or email info@tvsl-bd.com for directions.';
  if (msg.includes('contact') || msg.includes('email') || msg.includes('phone'))
    return 'You can reach TVSL at info@tvsl-bd.com or visit tvsl-bd.com. Our office is in Dhaka, Bangladesh.';
  if (msg.includes('about') || msg.includes('company') || msg.includes('tvsl') || msg.includes('who'))
    return 'Tech Valley Solutions Ltd. (TVSL) is a leading networking and data center company in Bangladesh with 5+ years of experience, serving 200+ enterprise clients with a 50+ member expert team.';
  if (msg.includes('network') || msg.includes('cisco') || msg.includes('router') || msg.includes('switch'))
    return 'TVSL specializes in enterprise networking using Cisco and Juniper equipment — including routing, switching, SD-WAN, firewall management, and 24/7 NOC monitoring for our clients.';
  if (msg.includes('data center') || msg.includes('server') || msg.includes('cloud') || msg.includes('vmware'))
    return 'Our data center services include rack colocation, server management, VMware virtualization, and disaster recovery — all managed by our certified server team.';
  return 'I\'m the TVSL AI assistant! I can help with job openings, our services, the application process, or general company info. What would you like to know?';
}

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();
    if (!message) return NextResponse.json({ error: 'No message' }, { status: 400 });
    
    // STEP 1: Check predefined Q&A first (highest priority)
    const predefinedAnswer = getPredefinedAnswer(message);
    if (predefinedAnswer) {
      return NextResponse.json({ reply: predefinedAnswer });
    }
    
    // STEP 2: Try Gemini API
    const aiReply = await geminiChat(message, history || []).catch(() => null);
    
    // STEP 3: Fall back to local knowledge base
    const reply = aiReply || localReply(message);
    
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: "I'm the TVSL assistant! I can help with job openings, services, and company info. What would you like to know?" });
  }
}