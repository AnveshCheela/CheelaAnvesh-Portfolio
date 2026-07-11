import { createFileRoute, Link } from "@tanstack/react-router";
import { Scene3D } from "@/components/Scene3D";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { SectionEyebrow } from "@/components/PortfolioNav";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Anvesh Cheela — Full-Stack Engineer & Cloud Architect" },
      { name: "description", content: "Portfolio of Anvesh Cheela — CSE student at IIIT Sricity building full-stack MERN, event-driven, and serverless AI systems." },
      { property: "og:title", content: "Anvesh Cheela — Full-Stack Engineer" },
      { property: "og:description", content: "Full-stack, cloud, and AI systems portfolio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Home() {
  return (
    <section className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 pt-28 pb-16">
      <div className="grid w-full items-center gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <SectionEyebrow>Based in Hyderabad · Open to Opportunities</SectionEyebrow>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Anvesh <span className="text-gradient">Cheela</span>
          </h1>
          <h2 className="mt-6 font-display text-xl font-semibold text-primary md:text-2xl">
            Full-Stack Developer <span className="text-muted-foreground">&</span> Cloud / AI Engineer
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            I architect multi-tenant SaaS on Node.js, wire event-driven pipelines with Redis and BullMQ, and cut cloud bills with self-optimizing serverless ML. B.Tech CSE '27 · IIIT Sricity.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-background/40 px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest text-foreground transition hover:border-primary/60 hover:text-primary"
            >
              View Projects <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-background/40 px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition hover:border-white/30 hover:text-foreground"
            >
              Get in Touch
            </Link>
            <a
              href="https://github.com/AnveshCheela"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-background/40 px-4 py-2.5 text-muted-foreground transition hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6" />
          <div className="grid grid-cols-3 gap-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <Stat k="3+" v="Projects" />
            <Stat k="130+" v="LeetCode" />
            <Stat k="7.3" v="CGPA · IIITS" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="relative hidden h-[420px] md:block md:h-[560px]"
        >
          <div className="absolute inset-0 shadow-glow">
            <Scene3D />
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5" />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest text-muted-foreground">
        SCROLL ↓
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-bold text-primary">{k}</div>
      <div className="mt-1">{v}</div>
    </div>
  );
}
