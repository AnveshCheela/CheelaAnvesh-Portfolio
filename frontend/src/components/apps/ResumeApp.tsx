import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  EditorialSection,
  Hairline,
  MetaLabel,
} from '@/components/editorial';
import { reveal, withReduced, spring } from '@/lib/motion';
import { RESUME } from '@/data/resume';

// ---------------------------------------------------------------------------
// Section registry - single source for the rail and the document.
// ---------------------------------------------------------------------------

const SECTIONS = [
  { id: 'education',      number: '01', label: 'Education'      },
  { id: 'projects',       number: '02', label: 'Projects'       },
  { id: 'skills',         number: '03', label: 'Skills'         },
  { id: 'certifications', number: '04', label: 'Certifications' },
  { id: 'achievements',   number: '05', label: 'Achievements'   },
] as const;

type SectionId = (typeof SECTIONS)[number]['id'];
type ViewMode = 'read' | 'pdf';

const SECTION_DOM_ID = (id: SectionId) => `resume-section-${id}`;

const PDF_HREF = '/resume.pdf';
const PDF_DOWNLOAD = 'Anvesh_Cheela_Resume.pdf';

// ---------------------------------------------------------------------------
// Masthead - serif name + mono role line + hairline-divided contact run.
// ---------------------------------------------------------------------------

function Masthead() {
  const reduced = useReducedMotion();
  const { email, github, linkedin, location } = RESUME.contact;

  // Contact cells as a mono run; first cell carries the role line above it.
  const contacts: { label: string; href?: string }[] = [
    { label: email, href: `mailto:${email}` },
    { label: github, href: `https://${github}` },
    { label: 'LinkedIn', href: `https://${linkedin}` },
    { label: location },
  ];

  return (
    <div className="flex flex-col gap-4">
      <motion.h1
        variants={reveal.item(reduced)}
        className="font-display text-text leading-[0.95] text-4xl lg:text-5xl tracking-tight break-words"
      >
        {RESUME.name}
      </motion.h1>

      {/* Role line - the clean `title`, not the persona-laden tagline. */}
      <motion.p variants={reveal.item(reduced)}>
        <MetaLabel>{RESUME.title}</MetaLabel>
      </motion.p>

      {/* Contact run - mono cells separated by middots, hairline above. */}
      <motion.div variants={reveal.item(reduced)} className="flex flex-col gap-3">
        <Hairline />
        <p className="flex flex-wrap items-center gap-x-1 gap-y-2">
          {contacts.map((c, i) => (
            <React.Fragment key={c.label}>
              {i > 0 && (
                <span aria-hidden className="font-mono-meta opacity-40">
                  &middot;
                </span>
              )}
              {c.href ? (
                <a
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group inline-flex"
                >
                  <MetaLabel className="text-text-secondary transition-colors [@media(hover:hover)and(pointer:fine)]:group-hover:text-text">
                    {c.label}
                  </MetaLabel>
                </a>
              ) : (
                <MetaLabel className="text-text-secondary">{c.label}</MetaLabel>
              )}
            </React.Fragment>
          ))}
        </p>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section bodies - pure editorial typesetting, monochrome only.
// ---------------------------------------------------------------------------

function EducationBody() {
  return (
    <ol className="flex flex-col">
      <Hairline />
      {RESUME.education.map((edu) => (
        <React.Fragment key={edu.institution}>
          <li className="flex flex-col gap-2 py-6">
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-xl leading-tight text-text">
                  {edu.institution}
                </h3>
                <MetaLabel className="text-text-secondary">{edu.degree}</MetaLabel>
              </div>
              <div className="flex shrink-0 flex-col gap-0.5 sm:items-end">
                <MetaLabel as="p">{edu.period}</MetaLabel>
                <MetaLabel as="p" className="text-text-secondary">
                  {edu.location}
                </MetaLabel>
              </div>
            </div>
            {edu.detail && (
              <p className="max-w-[64ch] text-sm leading-relaxed text-text-secondary">
                {edu.detail}
              </p>
            )}
          </li>
          <Hairline />
        </React.Fragment>
      ))}
    </ol>
  );
}

function ProjectsBody() {
  return (
    <div className="flex flex-col">
      <Hairline />
      {RESUME.projects.map((proj, idx) => (
        <a
          key={proj.name}
          href={`https://${proj.link}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col gap-4 py-5 transition-colors [@media(hover:hover)and(pointer:fine)]:hover:bg-black/[0.025] dark:[@media(hover:hover)and(pointer:fine)]:hover:bg-white/[0.04]"
        >
          <div className="flex items-baseline gap-4">
            <MetaLabel className="w-8 shrink-0 justify-start text-text-secondary">
              {String(idx + 1).padStart(2, '0')}
            </MetaLabel>
            <div className="flex flex-1 flex-col gap-1.5 min-w-0">
              <h3 className="font-display text-xl leading-tight text-text">
                {proj.name}
              </h3>
              <MetaLabel className="text-text-secondary">{proj.tech}</MetaLabel>
            </div>
          </div>
          <div className="pl-12 flex flex-col gap-2">
            {proj.desc && (
              <p className="max-w-[70ch] text-sm leading-relaxed text-text-secondary mb-2">
                {proj.desc}
              </p>
            )}
            {proj.bullets && proj.bullets.length > 0 && (
              <ul className="flex flex-col gap-2">
                {proj.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm leading-relaxed text-text-secondary"
                  >
                    <span aria-hidden className="mt-[0.5em] h-px w-3 shrink-0 bg-text/40" />
                    <span className="min-w-0">{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </a>
      ))}
      <Hairline />
    </div>
  );
}

function SkillsBody() {
  return (
    <dl className="flex flex-col">
      <Hairline />
      {RESUME.skills.map((group) => (
        <React.Fragment key={group.category}>
          <div className="flex flex-col gap-2 py-4 sm:flex-row sm:gap-6">
            <dt className="shrink-0 sm:w-40">
              <MetaLabel>{group.category}</MetaLabel>
            </dt>
            <dd className="flex flex-1 flex-wrap items-baseline gap-x-1 gap-y-1">
              {group.items.map((skill, i) => (
                <React.Fragment key={skill}>
                  {i > 0 && (
                    <span aria-hidden className="font-mono-meta opacity-40">
                      &middot;
                    </span>
                  )}
                  <span
                    className="font-mono leading-snug text-text"
                    style={{ fontSize: 'clamp(0.7rem, 1.6cqi, 0.8125rem)' }}
                  >
                    {skill}
                  </span>
                </React.Fragment>
              ))}
            </dd>
          </div>
          <Hairline />
        </React.Fragment>
      ))}
    </dl>
  );
}

function CertificationsBody() {
  return (
    <ul className="flex flex-col">
      <Hairline />
      {RESUME.certifications.map((cert) => (
        <React.Fragment key={cert.name}>
          <li className="flex gap-3 py-4 text-sm leading-relaxed text-text-secondary">
            <span aria-hidden className="mt-[0.5em] h-px w-3 shrink-0 bg-text/40" />
            <span className="min-w-0 font-medium text-text">{cert.name}</span>
          </li>
          <Hairline />
        </React.Fragment>
      ))}
    </ul>
  );
}

function AchievementsBody() {
  return (
    <ul className="flex flex-col">
      <Hairline />
      {RESUME.achievements.map((ach, idx) => (
        <React.Fragment key={idx}>
          <li className="flex gap-3 py-4 text-sm leading-relaxed text-text-secondary">
            <span aria-hidden className="mt-[0.5em] h-px w-3 shrink-0 bg-text/40" />
            <span className="min-w-0 text-text">{ach.desc}</span>
          </li>
          <Hairline />
        </React.Fragment>
      ))}
    </ul>
  );
}

function SectionBody({ id }: { id: SectionId }) {
  switch (id) {
    case 'education':       return <EducationBody />;
    case 'projects':        return <ProjectsBody />;
    case 'skills':          return <SkillsBody />;
    case 'certifications':  return <CertificationsBody />;
    case 'achievements':    return <AchievementsBody />;
  }
}

// ---------------------------------------------------------------------------
// Quiet editorial controls - mode toggle + download, mono + hairline only.
// ---------------------------------------------------------------------------

function ModeToggle({
  mode,
  onMode,
  reduced,
}: {
  mode: ViewMode;
  onMode: (m: ViewMode) => void;
  reduced: boolean | null;
}) {
  return (
    <motion.div variants={reveal.item(reduced)} className="flex items-center gap-4">
      <MetaLabel className="text-text-secondary opacity-60">View As</MetaLabel>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onMode('read')}
          className={`group relative px-2 py-1 font-mono-meta text-xs uppercase tracking-widest outline-none transition-colors ${
            mode === 'read' ? 'text-text' : 'text-text-secondary hover:text-text'
          }`}
        >
          Read
          {mode === 'read' && (
            <motion.span
              layoutId="resume-mode"
              className="absolute inset-0 border border-text/10 bg-black/[0.02] dark:bg-white/[0.04]"
              transition={spring.micro}
            />
          )}
        </button>
        <button
          onClick={() => onMode('pdf')}
          className={`group relative px-2 py-1 font-mono-meta text-xs uppercase tracking-widest outline-none transition-colors ${
            mode === 'pdf' ? 'text-text' : 'text-text-secondary hover:text-text'
          }`}
        >
          PDF
          {mode === 'pdf' && (
            <motion.span
              layoutId="resume-mode"
              className="absolute inset-0 border border-text/10 bg-black/[0.02] dark:bg-white/[0.04]"
              transition={spring.micro}
            />
          )}
        </button>
      </div>
      <div className="h-4 w-px bg-text/10" />
      <a
        href={PDF_HREF}
        download={PDF_DOWNLOAD}
        className="group flex items-center gap-2 px-2 py-1 outline-none"
      >
        <span className="font-mono-meta text-xs uppercase tracking-widest text-text-secondary transition-colors group-hover:text-text">
          Download
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-text-secondary transition-colors group-hover:text-text"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </a>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Document Views
// ---------------------------------------------------------------------------

function PdfView({ reduced }: { reduced: boolean | null }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: withReduced(spring.gentle, reduced) },
        exit: { opacity: 0, y: -10, transition: withReduced({ duration: 0.2 }, reduced) },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative flex min-h-[80vh] flex-col"
    >
      <div className="absolute inset-0 bg-black/[0.02] dark:bg-white/[0.02]" />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <MetaLabel className="animate-pulse text-text-secondary">Loading PDF...</MetaLabel>
        </div>
      )}
      <iframe
        src={PDF_HREF}
        className={`relative z-10 h-[80vh] w-full flex-1 transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
        title="Resume PDF"
      />
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// App Component
// ---------------------------------------------------------------------------

export default function ResumeApp() {
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<ViewMode>('read');
  const [active, setActive] = useState<SectionId>('education');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Desktop rail spy: IntersectionObserver tracks which section is in view.
  // Not used for animation, just highlighting the current section in the rail.
  useEffect(() => {
    if (mode !== 'read') return;
    if (typeof IntersectionObserver === 'undefined') return;

    const root = scrollRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let current: string | null = null;
        let last: string | null = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            current = entry.target.id.replace('resume-section-', '');
          }
          last = entry.target.id.replace('resume-section-', '');
        }
        if (current) setActive(current as SectionId);
        else if (last) setActive(last as SectionId);
      },
      {
        root,
        // High trigger so the section highlights right as it approaches the top
        rootMargin: '-10% 0px -80% 0px',
        threshold: 0,
      },
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(SECTION_DOM_ID(s.id));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [mode]);

  // Click-to-scroll for the desktop rail.
  const scrollTo = useCallback(
    (id: SectionId) => {
      const el = document.getElementById(SECTION_DOM_ID(id));
      const root = scrollRef.current;
      if (!el || !root) return;

      setActive(id);
      const top = el.offsetTop;
      root.scrollTo({ top: Math.max(0, top - 32), behavior: 'smooth' });
    },
    [],
  );

  return (
    <div className="h-full flex flex-col bg-transparent">
      {/* 
        Scroll container: windowed to prevent OS-level bleed. 
        Note that this breaks window-level scroll triggers (like useScroll)
        unless explicitly bound to this ref. 
      */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden">
        {/* Maximum width capped to maintain reading line-lengths (max-w-6xl). */}
        <div className="mx-auto flex min-h-full max-w-6xl flex-col px-4 py-8 sm:px-8 sm:py-16 md:px-12 md:flex-row md:items-start md:gap-16">
          {/* Desktop Left Rail - 200px fixed width, sticks below header */}
          <aside className="hidden w-[200px] shrink-0 flex-col gap-12 md:sticky md:top-8 md:flex">
            {/* The rail holds the Masthead in Read mode */}
            <AnimatePresence mode="popLayout">
              {mode === 'read' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0, transition: spring.gentle }}
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                >
                  <Masthead />
                </motion.div>
              )}
            </AnimatePresence>

            <nav>
              <ul className="flex flex-col">
                <AnimatePresence mode="popLayout">
                  {mode === 'read' &&
                    SECTIONS.map((s, i) => (
                      <motion.li
                        key={s.id}
                        variants={{
                          hidden: { opacity: 0, x: -10 },
                          visible: {
                            opacity: 1,
                            x: 0,
                            transition: withReduced({ ...spring.gentle, delay: 0.1 + i * 0.05 }, reduced),
                          },
                          exit: { opacity: 0, x: -10, transition: withReduced({ duration: 0.1 }, reduced) },
                        }}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <button
                          onClick={() => scrollTo(s.id)}
                          className={`group flex w-full items-center justify-between py-2.5 outline-none transition-colors ${
                            active === s.id ? 'text-text' : 'text-text-secondary hover:text-text'
                          }`}
                        >
                          <MetaLabel className="uppercase tracking-widest text-inherit transition-colors">
                            {s.label}
                          </MetaLabel>
                          <MetaLabel className="opacity-40 transition-opacity group-hover:opacity-100">
                            {s.number}
                          </MetaLabel>
                        </button>
                        <Hairline />
                      </motion.li>
                    ))}
                </AnimatePresence>
              </ul>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex min-w-0 flex-1 flex-col gap-12">
            {/* Mobile / PDF Masthead (inline instead of in the rail) */}
            <div className="flex flex-col md:hidden">
              <Masthead />
            </div>

            {/* Mode Toggle sits above the document content */}
            <div className="flex flex-col gap-6">
              <ModeToggle mode={mode} onMode={setMode} reduced={reduced} />

              {/* View router */}
              <AnimatePresence mode="wait">
                {mode === 'pdf' ? (
                  <PdfView key="pdf" reduced={reduced} />
                ) : (
                  <motion.div
                    key="read"
                    variants={reveal.container(reduced)}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="flex flex-col gap-16 pb-24"
                  >
                    {SECTIONS.map((s) => (
                      <EditorialSection
                        key={s.id}
                        id={SECTION_DOM_ID(s.id)}
                        number={s.number}
                        title={s.label}
                      >
                        <SectionBody id={s.id} />
                      </EditorialSection>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}