/**
 * About Me data — single source of truth for all About Me section content.
 *
 * Consumed by:
 *   - AboutMeApp.tsx (masthead, spec sheet)
 *   - JourneySection.tsx
 *   - ExcitesSection.tsx
 *   - CurrentlySection.tsx
 *   - ContactSection.tsx
 *
 * To update your bio, availability status, fun facts, or contact links:
 * edit this file. Components are thin renderers — no content lives in JSX.
 *
 * Long-form narrative paragraphs (journey, excites) remain in their
 * components since they're pure storytelling and tied to specific layouts.
 * Structured, update-prone data (contact, availability, lists) lives here.
 */

import portfolioData from './portfolio.json';

const { personalInfo } = portfolioData;

// ---------------------------------------------------------------------------
// Personal / identity
// ---------------------------------------------------------------------------

export const identity = {
  name:         personalInfo.name,
  title:        personalInfo.title,
  location:     'India',
  availability: 'Open to software development roles',
  photo:        '/Anvesh-photo.png',
} as const;

// ---------------------------------------------------------------------------
// Masthead spec-line - identity-from-specifics, rendered as mono MetaLabel
// cells separated by middots. No role-label padding, no student/visa framing.
// ---------------------------------------------------------------------------

export const mastheadSpecLine = [
  'SOFTWARE DEVELOPER',
  'Building modern web applications',
  'INDIA',
  'GYMRATS / OPSGUARDIAN / VERIFYFLOW',
] as const;

// ---------------------------------------------------------------------------
// Overview spec sheet - "About This Machine" definition list. Mono values,
// MetaLabel keys. Identity leaks from the work, never from a degree,
// a graduation date, or an availability label.
// ---------------------------------------------------------------------------

export interface SpecItem {
  key:   string;
  value: string;
}

export const specs: SpecItem[] = [
  { key: 'Discipline',  value: 'Full-stack web development' },
  { key: 'Layer',       value: 'MERN / Next.js · end-to-end' },
  { key: 'Stack',       value: 'TypeScript · Next.js · Node.js · AWS' },
  { key: 'Data',        value: 'PostgreSQL · MongoDB · Redis · BullMQ' },
  { key: 'Shipping',    value: 'GymRats · OpsGuardian · VerifyFlow' },
  { key: 'Based in',    value: 'India' },
];

// ---------------------------------------------------------------------------
// Intro section
// ---------------------------------------------------------------------------

export const quickIntro = [
  "Hey! I'm a full-stack web developer who loves building robust, scalable applications from the ground up. I've shipped projects like GymRats (a fitness social platform), OpsGuardian (an infrastructure monitoring tool), and VerifyFlow (a document verification system) — all built with the MERN stack, Next.js, TypeScript, and backed by PostgreSQL, Redis, and Docker.",
  "Currently pursuing my B.Tech in Computer Science and Engineering at IIIT SriCity (graduating 2027). I genuinely love solving complex problems, whether it's designing clean APIs, architecting reliable backend systems, or crafting smooth user experiences. The challenge of turning an idea into something people actually use? That's what gets me excited.",
] as const;

export interface OriginCard {
  iconName: string;   // lucide icon name (kept for non-visitor surfaces)
  title: string;
  text: string;
}

export const originStory: OriginCard[] = [
  {
    iconName: 'Gamepad2',
    title:    'The 8-year-old kid',
    text:     "My father brought home our first laptop. I went straight for the games, but Google blew my mind. This thing had answers to everything. That curiosity never stopped. It just got more focused.",
  },
  {
    iconName: 'Disc',
    title:    'Digit magazine weekends',
    text:     "Every Friday, new CDs full of software to explore. Those weekends shaped everything: breaking things, fixing them, learning how computers actually work. That hands-on exploration became my approach to learning.",
  },
  {
    iconName: 'Monitor',
    title:    'The "Hello World" moment',
    text:     "10th standard. First C program. Discovered for loops and pattern making. Right there, I knew: I wanted to be a software engineer. Not just use technology, but build it.",
  },
  {
    iconName: 'Rocket',
    title:    'Building real things',
    text:     "From struggling with a 2-month library database project to shipping full-stack apps with real users. Every failure taught patience. Every success unlocked new capabilities. That's still how I approach problems today.",
  },
];

export const whatImAbout = [
  "I build full-stack web applications that work reliably under pressure. Clean APIs. Responsive UIs. Databases that scale. Infrastructure that doesn't fall over at 3 AM.",
  "But it's not just about the tech. It's about understanding the problem, communicating with teams, making smart trade-offs, and shipping things that matter.",
  "I'm here to learn, grow, and work on projects that actually make a difference. Always excited about opportunities that push boundaries.",
] as const;

export interface FunFact {
  iconName: string;
  label: string;
  value: string;
}

export const funFacts: FunFact[] = [
  { iconName: 'Bot',   label: 'Current workflow', value: 'VS Code + TypeScript + Docker = shipping fast' },
  { iconName: 'Gauge', label: 'F1 enthusiast',    value: 'Max Verstappen fan, love the engineering' },
  { iconName: 'Flame', label: 'Hot take',         value: 'Team pineapple on pizza, fight me' },
];

// ---------------------------------------------------------------------------
// Currently section
// ---------------------------------------------------------------------------

export const lookingFor = [
  'Teams building things that matter, not just chasing metrics',
  'Places that value engineering excellence and smart decisions',
  'Environment between startup energy and structured growth',
  'Good paycheck + security (being realistic here)',
] as const;

export interface LearningItem {
  name: string;
  detail: string;
}

export const currentlyMastering: LearningItem[] = [
  { name: 'Advanced Next.js',      detail: 'Server components, app router, edge runtime. The React ecosystem keeps evolving.' },
  { name: 'System Design',         detail: 'Thinking at scale. Designing for failure. The big picture stuff.' },
  { name: 'DevOps & AWS',          detail: 'Docker, CI/CD pipelines, cloud infrastructure. Shipping with confidence.' },
];

export const readingList = [
  '"Designing Data-Intensive Applications" (the bible)',
  'System design blogs and case studies',
  'AWS whitepapers (yes, actually reading them)',
  "PostHog's engineering blog (inspiration)",
] as const;

export interface LifeItem {
  iconName: string;
  title: string;
  detail: string;
}

export const lifeItems: LifeItem[] = [
  { iconName: 'Coffee',   title: 'Exploring India',      detail: "Finding great coffee shops and coding spots. India's got endless places to discover." },
  { iconName: 'Gauge',    title: 'Following F1',         detail: 'Max Verstappen fan. Love the strategy, the engineering, the speed.' },
  { iconName: 'Star',     title: 'Staying connected',    detail: 'Celebrating festivals, staying connected to my roots. Ganesh Chaturthi this year was amazing.' },
  { iconName: 'Dumbbell', title: 'Staying active',       detail: 'Gym helps clear the mind after long debugging sessions.' },
];

export const portfolioTechStack = [
  'Next.js 15', 'TypeScript', 'Framer Motion', 'Zustand', 'Tailwind CSS',
] as const;

// ---------------------------------------------------------------------------
// Contact section
// ---------------------------------------------------------------------------

export const contactLinks = {
  email:    personalInfo.email,
  linkedin: personalInfo.linkedin,
  github:   personalInfo.github,
} as const;
