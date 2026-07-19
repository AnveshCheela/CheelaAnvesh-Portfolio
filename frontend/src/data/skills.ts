/**
 * Unified skill data — single source of truth.
 *
 * Consumed by:
 *   - SkillsDashboardApp  (visual skill tree)
 *   - ResumeApp           (skills section, via skillsForResume())
 *
 * To add a skill: add one entry here. Both places update automatically.
 * To change a description, level, or XP: edit here only.
 */

export type SkillCategory = 'language' | 'frontend' | 'backend' | 'cloud' | 'tool' | 'mq' | 'auth' | 'dsa' | 'oop';

export interface Skill {
  /** Unique identifier — used for dependency references */
  id: string;
  name: string;
  category: SkillCategory;
  /** 1 (beginner) ? 5 (expert) */
  level: 1 | 2 | 3 | 4 | 5;
  /** Human-readable experience string, e.g. "3 yrs" */
  xp: string;
  /** One-liner for the skill card */
  description: string;
  /** IDs of skills that are prerequisites / closely related */
  deps: string[];
}

export const SKILLS: Skill[] = [
  // -- Languages --------------------------------------------------------
  { id: 'ts',         name: 'TypeScript',       category: 'language', level: 5, xp: '3 yrs',   description: 'Primary language for all frontend and Node.js work. Strict mode always on.', deps: [] },
  { id: 'python',     name: 'Python',           category: 'language', level: 5, xp: '4 yrs',   description: 'ML pipelines, Flask APIs, scripts, and data engineering.', deps: [] },
  { id: 'java',       name: 'Java',             category: 'language', level: 4, xp: '2 yrs',   description: 'Spring Boot microservices and enterprise patterns.', deps: [] },
  { id: 'sql',        name: 'SQL',              category: 'language', level: 5, xp: '3 yrs',   description: 'Complex queries, window functions, query optimisation, migrations.', deps: [] },
  { id: 'c',          name: 'C',                category: 'language', level: 4, xp: '2 yrs',   description: 'Systems programming, memory management, and pointers.', deps: [] },
  { id: 'cpp',        name: 'C++',              category: 'language', level: 4, xp: '2 yrs',   description: 'Object-oriented programming, STL, and performance-critical applications.', deps: ['c'] },

  // -- Frontend ---------------------------------------------------------
  { id: 'react',      name: 'React / Next.js',  category: 'frontend', level: 5, xp: '3 yrs',   description: 'App Router, RSC, Suspense, streaming. This portfolio runs on Next.js 15.', deps: ['ts'] },
  { id: 'tailwind',   name: 'Tailwind CSS',     category: 'frontend', level: 5, xp: '2 yrs',   description: 'Utility-first styling, custom design systems, dark mode.', deps: ['ts'] },
  { id: 'html',       name: 'HTML',             category: 'frontend', level: 5, xp: '4 yrs',   description: 'Semantic markup, accessibility, and SEO optimization.', deps: [] },

  // -- Backend -----------------------------------------------------------
  { id: 'node',       name: 'Node.js',          category: 'backend',  level: 5, xp: '3 yrs',   description: 'REST APIs, event-driven services, WebSockets.', deps: ['ts'] },
  { id: 'express',    name: 'Express.js',       category: 'backend',  level: 5, xp: '3 yrs',   description: 'Web application framework for Node.js, routing, middleware.', deps: ['node'] },
  { id: 'fastapi',    name: 'FastAPI',          category: 'backend',  level: 5, xp: '2 yrs',   description: 'Async Python APIs. Primary backend for all AI/ML services. Pydantic schemas.', deps: ['python'] },
  { id: 'postgres',   name: 'PostgreSQL',       category: 'backend',  level: 5, xp: '3 yrs',   description: 'Schema design, indexing, full-text search, row-level security.', deps: ['sql'] },
  { id: 'redis',      name: 'Redis',            category: 'backend',  level: 3, xp: '1 yr',    description: 'Caching layers, pub/sub messaging, session storage.', deps: ['postgres'] },
  { id: 'mongodb',    name: 'MongoDB',          category: 'backend',  level: 4, xp: '2 yrs',   description: 'NoSQL database, document schema design, aggregation pipelines.', deps: ['node'] },
  { id: 'prisma',     name: 'Prisma ORM',       category: 'backend',  level: 4, xp: '2 yrs',   description: 'Type-safe database client, migrations, schema modeling.', deps: ['postgres', 'ts'] },
  { id: 'websockets', name: 'WebSockets (Socket.io)', category: 'backend', level: 4, xp: '2 yrs', description: 'Real-time bidirectional event-based communication.', deps: ['node'] },
  { id: 'restapi',    name: 'REST API',         category: 'backend',  level: 5, xp: '3 yrs',   description: 'Design, development, and consumption of RESTful services.', deps: ['node'] },
  { id: 'tesseract',  name: 'Tesseract.js (OCR)', category: 'backend', level: 3, xp: '1 yr',   description: 'Optical Character Recognition for image text extraction.', deps: ['node'] },

  // -- Cloud / DevOps ----------------------------------------------------
  { id: 'aws',        name: 'AWS',              category: 'cloud',    level: 5, xp: '2 yrs',   description: 'EC2, S3, Lambda, RDS, VPC, ALB, ASG, KMS, IAM. Production-grade multi-AZ architecture.', deps: ['node'] },
  { id: 'docker',     name: 'Docker',           category: 'cloud',    level: 4, xp: '2 yrs',   description: 'Multi-stage builds, Compose orchestration, optimised images.', deps: ['node'] },
  { id: 'k8s',        name: 'Kubernetes',       category: 'cloud',    level: 3, xp: '1 yr',    description: 'Deployments, services, ingress, resource limits, rolling updates.', deps: ['docker'] },
  { id: 'cicd',       name: 'CI / CD',          category: 'cloud',    level: 4, xp: '2 yrs',   description: 'GitHub Actions, automated testing, zero-downtime deploy pipelines.', deps: ['docker'] },

  // -- Tools -------------------------------------------------------------
  { id: 'git',        name: 'Git',              category: 'tool',     level: 5, xp: '4 yrs',   description: 'Rebasing, bisect, worktrees, hooks. Git is muscle memory.', deps: ['ts'] },
  { id: 'graphql',    name: 'GraphQL',          category: 'tool',     level: 3, xp: '1 yr',    description: 'Schema-first design, Apollo Client, DataLoader.', deps: ['node'] },
  { id: 'posthog',    name: 'PostHog',          category: 'tool',     level: 4, xp: '1 yr',    description: 'Product analytics, feature flags, session replay. Powers this portfolio.', deps: ['react'] },
  { id: 'vercel',     name: 'Vercel',           category: 'tool',     level: 5, xp: '2 yrs',   description: 'Frontend cloud platform, serverless functions, edge edge networking.', deps: ['react'] },
  { id: 'railway',    name: 'Railway',          category: 'tool',     level: 4, xp: '1 yr',    description: 'Infrastructure platform for deploying backend services and databases.', deps: ['docker'] },
  { id: 'render',     name: 'Render',           category: 'tool',     level: 4, xp: '1 yr',    description: 'Unified cloud to build and run all apps and websites.', deps: ['docker'] },
  { id: 'resend',     name: 'Resend',           category: 'tool',     level: 4, xp: '1 yr',    description: 'Email API for developers, built for modern applications.', deps: ['node'] },

  // -- Message Queue -----------------------------------------------------
  { id: 'bullmq',     name: 'Bull MQ',          category: 'mq',       level: 4, xp: '1 yr',    description: 'Redis-based queue for Node.js. Used for background jobs and message passing.', deps: ['redis', 'node'] },

  // -- Authentication ----------------------------------------------------
  { id: 'jwt',        name: 'JWT',              category: 'auth',     level: 5, xp: '3 yrs',   description: 'JSON Web Tokens for stateless authentication and authorization.', deps: ['node'] },
  { id: 'rbac',       name: 'Role-Based Access Control', category: 'auth', level: 4, xp: '2 yrs', description: 'Restricting system access to authorized users based on roles.', deps: ['jwt'] },

  // -- Data Structures & Algorithms --------------------------------------
  { id: 'arrays',     name: 'Arrays',           category: 'dsa',      level: 5, xp: '4 yrs',   description: 'Contiguous memory allocation, two-pointer techniques, sliding windows.', deps: [] },
  { id: 'strings',    name: 'Strings',          category: 'dsa',      level: 5, xp: '4 yrs',   description: 'Pattern matching, palindromes, substring problems.', deps: [] },
  { id: 'linkedlist', name: 'Linked Lists',     category: 'dsa',      level: 5, xp: '4 yrs',   description: 'Singly and doubly linked lists, reversal, cycle detection.', deps: [] },
  { id: 'stacks',     name: 'Stacks',           category: 'dsa',      level: 5, xp: '4 yrs',   description: 'LIFO structures, valid parentheses, monotonic stacks.', deps: [] },
  { id: 'queues',     name: 'Queues',           category: 'dsa',      level: 5, xp: '4 yrs',   description: 'FIFO structures, BFS traversals.', deps: [] },
  { id: 'trees',      name: 'Trees',            category: 'dsa',      level: 4, xp: '3 yrs',   description: 'Binary trees, BSTs, traversals, lowest common ancestor.', deps: [] },
  { id: 'graphs',     name: 'Graphs',           category: 'dsa',      level: 4, xp: '3 yrs',   description: 'BFS, DFS, Dijkstra, topological sorting.', deps: [] },
  { id: 'hashing',    name: 'Hashing',          category: 'dsa',      level: 5, xp: '4 yrs',   description: 'Hash maps, collision resolution, frequency counting.', deps: [] },
  { id: 'recursion',  name: 'Recursion',        category: 'dsa',      level: 4, xp: '3 yrs',   description: 'Divide and conquer, backtracking, call stack understanding.', deps: [] },
  { id: 'dp',         name: 'Dynamic Programming', category: 'dsa',   level: 4, xp: '2 yrs',   description: 'Memoization, tabulation, knapsack, optimization problems.', deps: ['recursion'] },

  // -- Object-Oriented Programming ---------------------------------------
  { id: 'encapsulation', name: 'Encapsulation', category: 'oop',      level: 5, xp: '4 yrs',   description: 'Bundling data and methods, data hiding.', deps: [] },
  { id: 'inheritance',   name: 'Inheritance',   category: 'oop',      level: 5, xp: '4 yrs',   description: 'Code reusability, class hierarchies, overriding.', deps: [] },
  { id: 'polymorphism',  name: 'Polymorphism',  category: 'oop',      level: 5, xp: '4 yrs',   description: 'Method overloading, interfaces, dynamic dispatch.', deps: [] },
  { id: 'abstraction',   name: 'Abstraction',   category: 'oop',      level: 5, xp: '4 yrs',   description: 'Hiding complex implementation details, abstract classes.', deps: [] },
  { id: 'solid',         name: 'SOLID Principles', category: 'oop',   level: 4, xp: '2 yrs',   description: 'Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.', deps: ['encapsulation'] },
];

// ---------------------------------------------------------------------------
// Display metadata — co-located with skill data (not in components)
// ---------------------------------------------------------------------------

export const CAT_COLOR: Record<SkillCategory, string> = {
  language: '#818cf8',
  frontend: '#22d3ee',
  backend:  '#34d399',
  cloud:    '#fbbf24',
  tool:     '#f472b6',
  mq:       '#f87171',
  auth:     '#a78bfa',
  dsa:      '#38bdf8',
  oop:      '#4ade80',
};

export const CAT_LABEL: Record<SkillCategory, string> = {
  language: 'Language',
  frontend: 'Frontend',
  backend:  'Backend',
  cloud:    'Cloud / DevOps',
  tool:     'Tools',
  mq:       'Message Queue',
  auth:     'Authentication',
  dsa:      'Data Structures & Algorithms',
  oop:      'Object-Oriented Programming',
};

export const LEVEL_LABEL: Record<number, string> = {
  1: 'Beginner',
  2: 'Familiar',
  3: 'Proficient',
  4: 'Advanced',
  5: 'Expert',
};

export const SKILL_CATEGORIES = ['all', 'cloud', 'backend', 'frontend', 'language', 'tool', 'mq', 'auth', 'dsa', 'oop'] as const;
export type FilterCategory = typeof SKILL_CATEGORIES[number];

// ---------------------------------------------------------------------------
// Derived helpers
// ---------------------------------------------------------------------------

/** Skills grouped by category, for resume-style flat display */
export function skillsForResume(): { category: string; items: string[] }[] {
  const groups: Record<string, string[]> = {
    Languages:      [],
    Frontend:       [],
    Backend:        [],
    'Cloud / DevOps': [],
    Tools:          [],
    'Message Queue': [],
    Authentication: [],
    'Data Structures & Algorithms': [],
    'Object-Oriented Programming': [],
  };

  const catMap: Record<SkillCategory, string> = {
    language: 'Languages',
    frontend: 'Frontend',
    backend:  'Backend',
    cloud:    'Cloud / DevOps',
    tool:     'Tools',
    mq:       'Message Queue',
    auth:     'Authentication',
    dsa:      'Data Structures & Algorithms',
    oop:      'Object-Oriented Programming',
  };

  for (const skill of SKILLS) {
    groups[catMap[skill.category]].push(skill.name);
  }

  return Object.entries(groups)
    .filter(([, items]) => items.length > 0)
    .map(([category, items]) => ({ category, items }));
}

/** All valid skill IDs — useful for validation */
export const SKILL_IDS = new Set(SKILLS.map(s => s.id));
