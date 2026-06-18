# Workforce Management and Recruitment Platform

A full-stack web application built for **Tech Valley Solutions Ltd. (TVSL)** to digitize the company's HR, employee management, and recruitment work. It is a
comprehensive full-stack web application designed to digitize TVSL's HR operations,
streamline recruitment processes, and enhance employee communication through AI-powered
tools.

Developed during an eight-week industrial attachment at TVSL's IT Section.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?logo=fastapi&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase&logoColor=white)
![Gemini](https://img.shields.io/badge/Google_Gemini-AI-4285F4?logo=google&logoColor=white)

---

## Overview

The platform is organized into four connected modules:

- **Public Portal** — company information, careers page, job listings with filtering, a multi-step online application, and an AI-generated technical exam.
- **Employee Portal** — secure login, a personal dashboard, profile management, a department-based team directory, real-time chat, and a notice board.
- **Admin Console** — employee, job-posting, and application management, plus the AI answer evaluator and AI CV scanner.
- **AI Chatbot** — a hybrid assistant on a ~5,000-entry knowledge base with the Gemini API as a fallback for harder questions.

## Features

### Recruitment
- Browse and filter open positions by department and job type
- Three-step application form (personal info → education → experience + CV upload)
- **AI exam generation** — a 45-minute, 20-question exam (15 MCQ + 5 short-answer) tailored to the applied role, built with FastAPI, LangChain, and the Gemini API
- **AI answer evaluation** — MCQs scored by rule-based logic; short answers scored on semantic similarity (Sentence Transformers `all-MiniLM-L6-v2`) with AI-generated feedback
- **AI CV scanner** — uploaded CVs matched against job requirements using FAISS + PyMuPDF, returning a score and recommendation
- Application pipeline tracking (pending → shortlisted → interview → rejected)

### Workforce
- JWT-based authentication with hashed passwords
- Personalized employee dashboard (tasks, notices, quick actions)
- Profile management
- Team viewer grouped by department
- Real-time group chat (Socket.io)
- Priority-based notice board

### Administration
- Recruitment + workforce analytics dashboard
- Full CRUD for employees, jobs, and applications

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | Next.js 16 (App Router), React, TypeScript, Tailwind CSS v4, custom CSS design system |
| Backend | Node.js, Next.js API Routes, Socket.io, REST (JSON) |
| AI Services | Python, FastAPI, Google Gemini API, LangChain, Sentence Transformers (`all-MiniLM-L6-v2`), FAISS, PyMuPDF |
| Database | PostgreSQL via Supabase (8 normalized tables, Row Level Security) |
| Tooling | Git, GitHub, Trello (Agile Kanban), VS Code, npm, pip |

## Architecture

A three-tier client–server design:

```
Browser (Next.js UI)
        │  HTTPS
        ▼
Next.js API Routes (Node.js)  ──Supabase SDK──►  Supabase (PostgreSQL)
        │  HTTP / JSON
        ▼
Python FastAPI AI Services  ──►  Sentence Transformers + FAISS
        │
        └──►  Google Gemini API
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.10+ and pip
- A Supabase project
- A Google Gemini API key ([Google AI Studio](https://aistudio.google.com))

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/workforce-recruitment-platform.git
cd workforce-recruitment-platform
```

### 2. Set up the database
In your Supabase project's SQL editor, run the schema:
```bash
supabase/schema.sql
```
This creates the eight tables (`employees`, `teams`, `jobs`, `applications`, `exam_results`, `notices`, `tasks`, `chat_messages`) with seed data.

### 3. Configure environment variables
Create a `.env.local` file in the project root:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Run the Next.js app
```bash
npm install
npm run dev
```
The app runs at `http://localhost:3000`.

### 5. Run the AI services
```bash
cd ai-services
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
.........
nwwsnskxjwybuydjyuvbyurcfut
