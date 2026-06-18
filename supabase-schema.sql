-- ============================================================
-- TVSL Platform — Supabase Database Schema
-- Run this ONCE in your Supabase SQL Editor
-- https://supabase.com → Project → SQL Editor → New Query
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- EMPLOYEES
-- ============================================================
create table if not exists employees (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text unique not null,
  role text not null,
  team text not null,
  phone text,
  location text default 'Dhaka, Bangladesh',
  joined_date date,
  bio text,
  skills text[] default '{}',
  education text,
  employee_id text unique, -- e.g. EMP-0042
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- TEAMS
-- ============================================================
create table if not exists teams (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null, -- e.g. 'networking', 'server'
  name text not null,
  lead_email text,
  icon text default 'users',
  color text default 'var(--primary)',
  created_at timestamptz default now()
);

-- ============================================================
-- JOBS
-- ============================================================
create table if not exists jobs (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null, -- e.g. 'j1'
  title text not null,
  dept text not null,
  type text default 'Full-time',
  location text default 'Dhaka, Bangladesh',
  salary text,
  posted_at timestamptz default now(),
  deadline date,
  exam_time text,
  slots integer default 1,
  tags text[] default '{}',
  short text,
  requirements text[] default '{}',
  responsibilities text[] default '{}',
  is_active boolean default true,
  created_at timestamptz default now()
);

-- ============================================================
-- APPLICATIONS
-- ============================================================
create table if not exists applications (
  id uuid primary key default uuid_generate_v4(),
  job_id uuid references jobs(id) on delete cascade,
  applicant_name text not null,
  email text not null,
  phone text,
  address text,
  education text,
  institution text,
  experience text,
  skills text[] default '{}',
  cv_text text,
  cover_letter text,
  answers jsonb default '{}',
  exam_score integer default 0,
  ai_cv_score integer,
  ai_cv_result jsonb,
  status text default 'pending', -- pending | shortlisted | interview | rejected | hired
  applied_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- EXAM RESULTS
-- ============================================================
create table if not exists exam_results (
  id uuid primary key default uuid_generate_v4(),
  application_id uuid references applications(id) on delete cascade,
  questions jsonb not null,
  answers jsonb not null,
  score integer,
  ai_feedback jsonb,
  ai_recommendation text,
  completed_at timestamptz default now()
);

-- ============================================================
-- NOTICES
-- ============================================================
create table if not exists notices (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  body text not null,
  type text default 'company', -- meeting | work | company
  priority text default 'medium', -- high | medium | low
  published_at date default current_date,
  is_active boolean default true,
  created_by text,
  created_at timestamptz default now()
);

-- ============================================================
-- TASKS (employee personal tasks)
-- ============================================================
create table if not exists tasks (
  id uuid primary key default uuid_generate_v4(),
  employee_id uuid references employees(id) on delete cascade,
  title text not null,
  tag text,
  priority text default 'medium',
  due_date date,
  is_done boolean default false,
  created_at timestamptz default now()
);

-- ============================================================
-- CHAT MESSAGES
-- ============================================================
create table if not exists chat_messages (
  id uuid primary key default uuid_generate_v4(),
  channel text not null, -- 'general' | 'it' | 'networking'
  sender_name text not null,
  sender_email text,
  message text not null,
  sent_at timestamptz default now()
);

-- ============================================================
-- SEED DATA — Initial records matching the UI
-- ============================================================

-- Teams
insert into teams (slug, name, icon, color) values
  ('networking', 'Network & Cybersecurity', 'globe', 'var(--primary)'),
  ('server', 'Server Team', 'layers', 'var(--success)'),
  ('power', 'Power Team', 'zap', 'oklch(0.7 0.14 75)'),
  ('datacenter', 'Data Center Team', 'layers', 'oklch(0.45 0.14 300)'),
  ('it', 'IT Team', 'shield', 'oklch(0.52 0.14 230)'),
  ('sales', 'Sales & Marketing', 'briefcase', 'var(--danger)'),
  ('management', 'Management', 'briefcase', 'oklch(0.42 0.15 260)')
on conflict (slug) do nothing;

-- Key employees
insert into employees (name, email, role, team, phone, employee_id) values
  ('Mohammad Mahfuz Ali Sohel', 'chairman@tvsl-bd.com', 'Chairman', 'Management', '+88 01700-000001', 'EMP-0001'),
  ('Mohammad Amir Hassan Chowdhury', 'hr@tvsl-bd.com', 'Head of HR & Admin', 'Management', '+88 01700-000002', 'EMP-0002'),
  ('Kishor Kumar Paul', 'kishor@tvsl-bd.com', 'Network Lead', 'Network & Cybersecurity', '+88 01708-155713', 'EMP-0003'),
  ('Shamir Ashik Chowdhury', 'shamir@tvsl-bd.com', 'Server Lead', 'Server Team', '+88 01708-155712', 'EMP-0004'),
  ('Sofiqur Rahman Shumon', 'sofiqur@tvsl-bd.com', 'Power Team Lead', 'Power Team', '+88 01711-674351', 'EMP-0005'),
  ('Md. Abdullah Shah', 'abdullah@tvsl-bd.com', 'Data Center Lead', 'Data Center Team', '+88 01730-335897', 'EMP-0006'),
  ('A M Rashid Ashef Hossain', 'rashid@tvsl-bd.com', 'IT Manager', 'IT Team', '+88 01711-000000', 'EMP-0042')
on conflict (email) do nothing;

-- Jobs
insert into jobs (slug, title, dept, salary, deadline, exam_time, slots, tags, short, requirements, responsibilities) values
  ('j1', 'Network Engineer', 'Networking', '৳60,000 – ৳90,000/mo', '2025-06-30', 'June 25, 2025 · 10:00 AM', 3,
   ARRAY['Cisco','CCNA','Routing','Switching'],
   'Design, implement and maintain network infrastructure for our data center clients.',
   ARRAY['3+ years of network engineering experience','CCNA or higher certification','Experience with Cisco, Juniper, or similar'],
   ARRAY['Configure and maintain enterprise-grade routers and switches','Monitor network performance and troubleshoot issues']),
  ('j2', 'Server Administrator', 'Server', '৳55,000 – ৳80,000/mo', '2025-07-05', 'June 28, 2025 · 2:00 PM', 2,
   ARRAY['Linux','Windows Server','VMware','Docker'],
   'Manage and optimize server infrastructure including virtual machines and containers.',
   ARRAY['2+ years in server administration','Linux (RHEL/Ubuntu) expertise','VMware or Hyper-V experience'],
   ARRAY['Administer Windows and Linux servers','Manage VMware/vSphere virtual environments']),
  ('j3', 'IT Support Specialist', 'IT', '৳35,000 – ৳55,000/mo', '2025-07-10', 'July 2, 2025 · 11:00 AM', 4,
   ARRAY['Help Desk','Hardware','Networking','Support'],
   'Provide technical support to internal teams and external clients.',
   ARRAY['1+ year of IT support experience','Hardware and software troubleshooting'],
   ARRAY['Respond to helpdesk tickets and resolve issues','Set up and configure workstations']),
  ('j4', 'Sales Executive', 'Sales & Marketing', '৳40,000 – ৳70,000 + commission', '2025-06-28', 'June 22, 2025 · 3:00 PM', 2,
   ARRAY['B2B Sales','Networking','CRM','Telecom'],
   'Drive growth by selling TVSL networking and data center services to businesses.',
   ARRAY['2+ years B2B sales experience','Understanding of networking/IT infrastructure'],
   ARRAY['Prospect and qualify new enterprise clients','Prepare and deliver technical proposals'])
on conflict (slug) do nothing;

-- Notices
insert into notices (title, body, type, priority, published_at) values
  ('Q2 Performance Review', 'Q2 performance reviews will begin on June 20. All team leads should submit their team reports by June 18.', 'meeting', 'high', '2025-06-10'),
  ('Network Maintenance Window', 'Scheduled downtime for core switch upgrade: Saturday June 14, 12:00 AM – 4:00 AM.', 'work', 'high', '2025-06-08'),
  ('New Client Onboarding — Apex Corporation', 'We have successfully onboarded Apex Corporation as a new enterprise client.', 'company', 'medium', '2025-06-06'),
  ('EID Holiday Notice', 'The office will be closed June 17–20 for Eid al-Adha. Emergency support remains active.', 'company', 'low', '2025-06-04')
on conflict do nothing;

-- ============================================================
-- ROW LEVEL SECURITY (optional — enable for production)
-- ============================================================
-- alter table employees enable row level security;
-- alter table applications enable row level security;
-- alter table notices enable row level security;
-- alter table chat_messages enable row level security;

-- ============================================================
-- DONE! Your TVSL database is ready.
-- ============================================================
