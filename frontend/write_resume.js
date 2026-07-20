const fs = require('fs');
const content = `/**
 * Resume data - single source of truth.
 *
 * Consumed by ResumeApp.tsx only.
 * Personal contact info is imported from portfolio.json so there's one
 * place to update name, email, location, etc.
 *
 * Content mirrors the one-page resume. To update the resume copy: edit this file.
 * To update the downloadable PDF: replace public/resume.pdf.
 *
 * Note: ProjectsBody renders links as \`https://${link}\`, so project links are
 * stored bare (no protocol).
 */

import portfolioData from './portfolio.json';

const { personalInfo } = portfolioData;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
  location: string;
  detail: string;
}

export interface ProjectEntry {
  name: string;
  tech: string;
  desc: string;
  link: string;
  bullets: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface CertificationEntry {
  name: string;
}

export interface AchievementEntry {
  desc: string;
}

export interface ResumeData {
  name: string;
  title: string;
  tagline: string;
  contact: {
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
  };
  education: EducationEntry[];
  projects: ProjectEntry[];
  skills: SkillGroup[];
  certifications: CertificationEntry[];
  achievements: AchievementEntry[];
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

export const RESUME: ResumeData = {
  // Personal info pulled from portfolio.json - update there, reflects here
  name:    personalInfo.name,
  title:   personalInfo.title,
  tagline: 'SOFTWARE DEVELOPER · Boston, MA (Open to Relocation)',
  contact: {
    email:    personalInfo.email,
    phone:    '+91-7013716285',
    location: personalInfo.location,
    github:   'github.com/AnveshCheela',
    linkedin: 'linkedin.com/in/anvesh-cheela-063013292',
  },

  education: [
    {
      institution: 'Indian Institute of Information Technology, SriCity',
      degree:      'B.Tech., CSE',
      period:      '2027',
      location:    '7.3 (upto 5th Sem)',
      detail:      '',
    },
    {
      institution: 'Turito College',
      degree:      'Senior Secondary',
      period:      '2023',
      location:    '975/1000',
      detail:      '',
    },
    {
      institution: 'Vagdevi Vidyalayam High School',
      degree:      'Secondary',
      period:      '2021',
      location:    '10 CGPA',
      detail:      '',
    },
  ],

  projects: [
    {
      name:   'GymRats – Comprehensive Fitness Management Platform',
      tech:   'MongoDB, Express.js, React.js, Node.js, Redis, Docker, GitHub Actions',
      link:   'github.com/AnveshCheela/GymRats',
      desc:   '',
      bullets: [
        'Architected a full-stack MERN platform with role-specific dashboards for Members, Trainers, and Administrators across 30+ React pages and 80+ RESTful API endpoints, consolidating fragmented gym operations into a single data-driven system.',
        'Engineered JWT (24h expiry) and Google OAuth 2.0 authentication with role-based access control middleware, managing tiered memberships (Basic/Gold/Platinum) with automated renewal, expiry tracking, and payment recording across 16 MongoDB collections.',
        'Delivered end-to-end fitness features - personalized workout tracking, nutrition macro logging, trainer assignment, and appointment scheduling - structured using a 5-bounded-context Domain-Driven Design with 11 aggregates, 16 entities, and 23 value objects.',
        'Boosted backend performance using Redis TTL caching (300-3600s) on high-frequency admin endpoints, MongoDB full-text indexes, and float32 memory optimization; deployed via Docker on Render with Vercel CDN for frontend delivery.',
        'Automated quality assurance with a CI/CD pipeline via GitHub Actions that runs 88 Jest test cases, ESLint validation, and Vite production builds on every push, achieving zero broken deployments to production.',
      ]
    },
    {
      name:   'OpsGuardian – Automated AI-Powered Incident Management Platform',
      tech:   'Next.js, React, Tailwind CSS, Node.js, Express, TypeScript, PostgreSQL, Prisma ORM, Redis, BullMQ, WebSockets (Socket.io), AWS S3, Google Gemini AI, Resend API',
      link:   'github.com/AnveshCheela/OpsGuardian',
      desc:   '',
      bullets: [
        'Architected a multi-tenant, event-driven incident management SaaS platform that automatically ingests, deduplicates, and escalates system crashes in real-time.',
        'Engineered an asynchronous processing pipeline using Node.js, Redis, and BullMQ to decouple heavy AI and cloud tasks from the main thread, resulting in zero-blocking HTTP webhook ingestion.',
        'Implemented a custom Idempotency Middleware using SHA-256 hashing and Redis TTL to instantly drop duplicate crash payloads, preventing alert fatigue for on-call engineers.',
        'Integrated the Google Gemini AI API and AWS S3 into background workers to perform automated Root Cause Analysis (RCA) on raw stack traces, drastically reducing mean-time-to-resolution (MTTR).',
        'Developed an automated Escalation Engine using the Resend HTTP API that schedules delayed background jobs and recursively traverses company hierarchies to alert the next available engineer if SLAs are missed.',
        'Built a real-time, responsive frontend dashboard using Next.js 15, React, and Tailwind CSS, leveraging Socket.io WebSockets to instantly broadcast state changes (like incident creation and acknowledgment) to specific team rooms.',
      ]
    },
    {
      name:   'VerifyFlow – Digital KYC Verification Platform',
      tech:   'React.js, Node.js, Express.js, PostgreSQL, Redis, BullMQ, JWT, Tesseract.js (OCR), Docker, Resend API',
      link:   'github.com/AnveshCheela/VerifyFlow',
      desc:   '',
      bullets: [
        'Architected a full-stack KYC verification platform automating identity document review for digital-banking-style onboarding, decoupling OCR and fraud-checking from the request thread via a Redis-backed BullMQ job queue.',
        'Engineered an OCR extraction pipeline using Tesseract.js to parse uploaded PAN/Aadhaar documents and extract structured fields (Name, DOB, ID Number), with validation and retry handling for low-quality scans.',
        'Implemented a rule-based Fraud Detection Engine flagging submissions on name mismatches, duplicate document hashes, and invalid ID formats to reduce manual reviewer load on clean cases.',
        'Built JWT-based authentication with role-based access control (User/Admin) and audit-logging middleware recording every state-changing action across the verification lifecycle for compliance traceability.',
        'Developed an asynchronous notification service via the Resend API, triggering BullMQ delayed jobs to email users on verification status changes.',
        'Designed a React-based Admin Review Dashboard for real-time queue management, with Redis caching on high-frequency status/queue endpoints to minimize repeat-read latency - fully containerized and deployed via Docker Compose.',
      ]
    },
  ],

  skills: [
    {
      category: 'Programming Languages',
      items: ['C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'SQL'],
    },
    {
      category: 'Data Structures & Algorithms',
      items: ['Arrays', 'Strings', 'Linked Lists', 'Stacks', 'Queues', 'Trees', 'Graphs', 'Hashing', 'Recursion', 'Dynamic Programming'],
    },
    {
      category: 'Object-Oriented Programming',
      items: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction', 'SOLID Principles'],
    },
    {
      category: 'Backend & Architecture',
      items: ['Node.js', 'Express.js', 'REST APIs', 'WebSockets (Socket.io)', 'Microservices', 'Event-Driven Architecture', 'Message Queues (BullMQ)', 'Authentication (JWT)', 'Role-Based Access Control'],
    },
    {
      category: 'Databases & ORMs',
      items: ['PostgreSQL', 'MySQL', 'MongoDB', 'DynamoDB', 'Redis (Caching & Queues)', 'Prisma ORM (Indexing, Schema Design)'],
    },
    {
      category: 'Web Technologies',
      items: ['React.js', 'Next.js', 'Tailwind CSS', 'HTML', 'CSS'],
    },
    {
      category: 'Cloud, DevOps & AI',
      items: ['AWS (Lambda, S3, SQS, API Gateway, CloudWatch)', 'Docker', 'Git', 'GitHub Actions', 'Vercel', 'Railway', 'Generative AI Integration (Google Gemini)'],
    },
  ],

  certifications: [
    { name: 'AWS Cloud Practitioner Essentials' }
  ],
  
  achievements: [
    { desc: 'Solved 150+ Data Structures and Algorithms problems on LeetCode.' },
    { desc: 'Built and deployed multiple full-stack and cloud-native applications using MERN and AWS technologies.' }
  ],
};
`
fs.writeFileSync('src/data/resume.ts', content, 'utf8');
