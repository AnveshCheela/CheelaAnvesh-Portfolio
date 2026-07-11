import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { TiltCard } from "@/components/TiltCard";
import { SectionEyebrow } from "@/components/PortfolioNav";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
  head: () => ({
    meta: [
      { title: "Projects — Anvesh Cheela" },
      { name: "description", content: "Selected engineering work by Anvesh Cheela: MERN SaaS, event-driven incident management, and serverless ML on AWS." },
      { property: "og:title", content: "Projects — Anvesh Cheela" },
      { property: "og:description", content: "Full-stack, cloud, and AI systems shipped end-to-end." },
    ],
  }),
});

const projects = [
  {
    tag: "Full-Stack MERN",
    n: "01",
    name: "GymRats — Fitness Management Platform",
    desc: "Full-stack MERN platform with role-specific dashboards for Members, Trainers and Admins across 30+ React pages and 80+ REST endpoints. JWT + Google OAuth 2.0, tiered memberships, DDD with 5 bounded contexts, Redis TTL caching, Dockerized deploy, and 88 Jest tests gating every release.",
    stack: ["MongoDB", "Express", "React", "Node", "Redis", "Docker", "GitHub Actions"],
    link: "https://github.com/AnveshCheela/Gymrats-React",
  },
  {
    tag: "Event-Driven SaaS",
    n: "02",
    name: "OpsGuardian — AI Incident Management",
    desc: "Multi-tenant SaaS that ingests, deduplicates and escalates system crashes in real time. Async BullMQ + Redis pipeline, SHA-256 idempotency middleware, Gemini AI root-cause analysis on stack traces from S3, recursive escalation over company hierarchies, and a Socket.io dashboard.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "BullMQ", "Socket.io", "Gemini AI", "AWS S3"],
    link: "https://github.com/AnveshCheela/OpsGuardian",
  },
  {
    tag: "Serverless ML",
    n: "03",
    name: "Intelligent House Price Prediction",
    desc: "Self-optimizing serverless system on AWS with adaptive batch processing — 98.5% fewer Lambda invocations and 90% cost reduction. SQS → S3 → ML → DynamoDB pipeline with dynamic batch sizing based on queue depth and payload limits.",
    stack: ["AWS Lambda", "SQS", "S3", "DynamoDB", "Python", "Scikit-learn", "CloudWatch"],
    link: "https://github.com/AnveshCheela/Intelligent-House-Price-Prediction-System",
  },
];

function ProjectsPage() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 pt-32 pb-20">
      <SectionEyebrow>Selected Work</SectionEyebrow>
      <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
        Projects, <span className="text-gradient">shipped</span> &amp; studied.
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
        Production-style systems built end-to-end — with tests, observability, and a clear engineering rationale.
      </p>

      <div className="mt-16 space-y-8">
        {projects.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <TiltCard>
              <div className="bg-glass shadow-3d rounded-3xl border border-white/10 p-8 md:p-10">
                <div className="mb-5 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest">
                  <span className="rounded-md bg-primary/15 px-2 py-1 text-primary">{p.tag}</span>
                  <span className="text-muted-foreground">/ {p.n}</span>
                </div>
                <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{p.name}</h2>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">{p.desc}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-md border border-white/10 bg-background/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary transition hover:text-foreground"
                >
                  <Github className="h-3.5 w-3.5" /> View on GitHub →
                </a>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
