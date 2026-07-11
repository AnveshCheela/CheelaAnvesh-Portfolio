import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function PortfolioNav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto mt-4 max-w-6xl px-4">
        <div className="bg-glass shadow-3d flex items-center justify-between rounded-2xl border border-white/10 px-5 py-3 backdrop-blur-xl">
          <Link to="/" className="flex items-center gap-2 font-display text-sm font-bold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-background/40 font-mono text-[13px] text-primary">A</span>
            <span className="text-gradient">anvesh.dev</span>
          </Link>
          <nav className="hidden gap-7 text-sm text-muted-foreground md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="transition hover:text-foreground [&.active]:text-foreground [&.active]:underline [&.active]:underline-offset-8 [&.active]:decoration-primary"
                activeOptions={{ exact: true }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <HireMeButton />
        </div>
      </div>
    </header>
  );
}

function HireMeButton() {
  return (
    <Link
      to="/contact"
      aria-label="Hire me — go to contact page"
      className="group relative inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-background/40 px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-foreground transition hover:border-primary/60 hover:text-primary"
    >
      Hire me <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}

export function PortfolioFooter() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-10 pt-6">
      <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 font-mono text-[11px] text-muted-foreground md:flex-row">
        <div>© 2026 Anvesh Cheela · Hyderabad, India</div>
        <div>Designed in the dark.</div>
      </div>
    </footer>
  );
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary">
      <span className="inline-block h-2 w-2 rotate-45 bg-primary" />
      {children}
    </div>
  );
}
