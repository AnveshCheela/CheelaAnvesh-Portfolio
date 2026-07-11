import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SectionEyebrow } from "@/components/PortfolioNav";
import { TiltCard } from "@/components/TiltCard";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Anvesh Cheela" },
      { name: "description", content: "About Anvesh Cheela — CSE undergrad at IIIT Sricity, backend & cloud engineer focused on event-driven systems and applied AI." },
      { property: "og:title", content: "About — Anvesh Cheela" },
      { property: "og:description", content: "Engineer with a systems-first mindset." },
    ],
  }),
});

const skills = [
  { title: "Languages", items: ["C++", "Java", "Python", "JavaScript", "TypeScript", "SQL"] },
  { title: "Backend & Architecture", items: ["Node.js", "Express", "REST APIs", "WebSockets", "BullMQ", "Microservices", "Event-Driven", "JWT / RBAC"] },
  { title: "Databases & ORMs", items: ["PostgreSQL", "MongoDB", "MySQL", "DynamoDB", "Redis", "Prisma ORM"] },
  { title: "Frontend", items: ["React.js", "Next.js", "Tailwind CSS", "HTML", "CSS"] },
  { title: "Cloud, DevOps & AI", items: ["AWS Lambda", "S3", "SQS", "API Gateway", "CloudWatch", "Docker", "GitHub Actions", "Vercel", "Google Gemini"] },
  { title: "CS Fundamentals", items: ["DSA", "OOP", "SOLID", "DP", "Graphs", "Hashing"] },
];

const timeline = [
  {
    period: "2023 – 2027",
    title: "B.Tech in Computer Science Engineering",
    org: "Indian Institute of Information Technology, Sricity",
    detail: "CGPA: 7.3 / 10 (upto 5th Sem)",
  },
  {
    period: "2021 – 2023",
    title: "Senior Secondary (MPC)",
    org: "Turito College",
    detail: "975 / 1000",
  },
  {
    period: "2020 – 2021",
    title: "Secondary Education",
    org: "Vagdevi Vidyalayam High School",
    detail: "CGPA: 10.0 / 10.0",
  },
];

const certifications = [
  "AWS Cloud Practitioner Essentials",
];

const achievements = [
  "Solved 130+ Data Structures & Algorithms problems on LeetCode",
  "Built and deployed multiple full-stack and cloud-native apps using MERN and AWS",
];

function AboutPage() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 pt-32 pb-20">
      <SectionEyebrow>About</SectionEyebrow>
      <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
        Engineer with a <span className="text-gradient">systems-first</span> mindset.
      </h1>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
        I'm a B.Tech Computer Science student (Class of 2027) at IIIT Sricity. I build multi-tenant SaaS with
        Node.js, design event-driven pipelines with Redis and BullMQ, and ship serverless AI systems on AWS —
        with idempotency, caching, and automated tests baked in from day one.
      </p>

      {/* Skills */}
      <div className="mt-20">
        <SectionEyebrow>Toolbox</SectionEyebrow>
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">The complete stack</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <TiltCard>
                <div className="bg-glass shadow-3d h-full rounded-2xl border border-white/10 p-6">
                  <div className="font-display text-lg font-bold text-foreground">{g.title}</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <span key={s} className="rounded-md border border-white/10 bg-background/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-24">
        <SectionEyebrow>Journey</SectionEyebrow>
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">My path so far</h2>
        <ol className="mt-10 space-y-6 border-l border-white/10 pl-6">
          {timeline.map((t, i) => (
            <motion.li
              key={t.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative"
            >
              <span className="absolute -left-[31px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full border border-primary/60 bg-background">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <div className="font-mono text-[11px] uppercase tracking-widest text-primary">{t.period}</div>
              <div className="mt-1 font-display text-lg font-bold text-foreground">{t.title}</div>
              <div className="text-sm text-muted-foreground">{t.org}</div>
              <div className="mt-1 font-mono text-xs text-muted-foreground">{t.detail}</div>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Certifications & Achievements */}
      <div className="mt-24 grid gap-6 md:grid-cols-2">
        <TiltCard>
          <div className="bg-glass shadow-3d h-full rounded-2xl border border-white/10 p-6">
            <SectionEyebrow>Credentials</SectionEyebrow>
            <h3 className="font-display text-xl font-bold">Certifications</h3>
            <ul className="mt-4 space-y-2 font-mono text-xs text-muted-foreground">
              {certifications.map((c) => <li key={c}>› {c}</li>)}
            </ul>
          </div>
        </TiltCard>
        <TiltCard>
          <div className="bg-glass shadow-3d h-full rounded-2xl border border-white/10 p-6">
            <SectionEyebrow>Achievements</SectionEyebrow>
            <h3 className="font-display text-xl font-bold">Wins</h3>
            <ul className="mt-4 space-y-2 font-mono text-xs text-muted-foreground">
              {achievements.map((a) => <li key={a}>› {a}</li>)}
            </ul>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
