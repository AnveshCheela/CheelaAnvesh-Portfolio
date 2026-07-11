import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, Github, Linkedin, Trophy, Copy, Check, ArrowUpRight } from "lucide-react";
import { TiltCard } from "@/components/TiltCard";
import { SectionEyebrow } from "@/components/PortfolioNav";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Anvesh Cheela" },
      { name: "description", content: "Get in touch with Anvesh Cheela for internships, freelance backend work, and collaborations." },
      { property: "og:title", content: "Contact — Anvesh Cheela" },
      { property: "og:description", content: "Let's build something." },
    ],
  }),
});

type Item = {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
  note: string;
  copy?: string;
};

const items: Item[] = [
  { icon: Mail, label: "Email", value: "cheelaanvesh@gmail.com", href: "mailto:cheelaanvesh@gmail.com", note: "Best for opportunities & project enquiries", copy: "cheelaanvesh@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 70137 16285", href: "tel:+917013716285", note: "IST · Mon – Sat", copy: "+917013716285" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/anvesh-cheela-063013292", href: "https://www.linkedin.com/in/anvesh-cheela-063013292/", note: "Professional profile" },
  { icon: Github, label: "GitHub", value: "github.com/AnveshCheela", href: "https://github.com/AnveshCheela", note: "Code, projects & experiments" },
  { icon: Trophy, label: "LeetCode", value: "leetcode.com/u/Cheelaanvesh", href: "https://leetcode.com/u/Cheelaanvesh/", note: "130+ problems solved" },
];

function ContactPage() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 pt-32 pb-20">
      <SectionEyebrow>Get in Touch</SectionEyebrow>
      <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
        Let's <span className="text-gradient">build</span> something.
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
        Currently open to full-time, internship and freelance opportunities — especially around backend systems,
        event-driven architectures, and applied AI. Fastest reply is email.
      </p>

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {items.map((it) => <ContactRow key={it.label} it={it} />)}
      </div>

      <TiltCard className="mt-14">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-glass p-8 shadow-glow md:p-12">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative">
            <SectionEyebrow>Availability</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              Open for opportunities
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Actively interviewing for Full-Stack, Backend and Cloud Engineering roles. Based in Hyderabad,
              open to remote and relocation.
            </p>
          </div>
        </div>
      </TiltCard>
    </section>
  );
}

function ContactRow({ it }: { it: Item }) {
  const [copied, setCopied] = useState(false);
  const Icon = it.icon;

  const doCopy = async () => {
    if (!it.copy) return;
    try { await navigator.clipboard.writeText(it.copy); } catch { /* ignore */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <TiltCard>
      <div className="bg-glass shadow-3d flex h-full items-center justify-between gap-4 rounded-2xl border border-white/10 p-5">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{it.label} →</div>
            <div className="truncate font-display text-sm font-semibold text-foreground">{it.value}</div>
            <div className="mt-0.5 truncate text-xs text-muted-foreground">{it.note}</div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={it.href}
            target={it.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-background/40 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition hover:border-primary/60 hover:text-primary"
          >
            Open <ArrowUpRight className="h-3 w-3" />
          </a>
          {it.copy && (
            <button
              onClick={doCopy}
              className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-background/40 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition hover:border-primary/60 hover:text-primary"
            >
              {copied ? <><Check className="h-3 w-3" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}
            </button>
          )}
        </div>
      </div>
    </TiltCard>
  );
}
