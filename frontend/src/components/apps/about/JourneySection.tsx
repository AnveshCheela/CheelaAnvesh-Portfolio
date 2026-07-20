import React from "react";
import { Hairline } from "@/components/editorial";

/**
 * JourneySection - narrative, typeset as a plain editorial column.
 *
 * No glass cards, no colored pills, no icon medallions, no hover:scale. Pull
 * quotes become a left Hairline + italic serif. Lists become mono bullets.
 * Prose is preserved verbatim from the prior build (copy is a separate pass).
 */

function PullQuote({ children, cite }: { children: React.ReactNode; cite?: string }) {
  return (
    <div className="flex gap-5 my-2">
      <Hairline orientation="vertical" />
      <div className="flex flex-col gap-2">
        <p className="font-display text-text text-[clamp(1.25rem,3.4cqi,1.75rem)] leading-snug italic">
          {children}
        </p>
        {cite && <p className="font-mono-meta">{cite}</p>}
      </div>
    </div>
  );
}

export function JourneySection() {
  return (
    <div className="flex flex-col gap-10 max-w-[68ch]">
      <p className="text-lg text-text-secondary leading-relaxed">
        My journey into software engineering started with a simple curiosity: how do the tools we use every day actually work under the hood?
      </p>

      <section className="flex flex-col gap-3">
        <h3 className="editorial-head text-text text-[clamp(1.5rem,4cqi,2rem)]">
          The foundation
        </h3>
        <p className="text-lg text-text-secondary leading-relaxed">
          I started out learning the basics of programming, experimenting with logic and problem-solving. But it wasn&apos;t until I built my first functional web application that it really clicked.
        </p>
        <p className="text-lg text-text-secondary leading-relaxed">
          Seeing lines of code turn into a platform that people could actually interact with? That was the moment I realized this was what I wanted to do.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <p className="font-mono-meta">IIIT SriCity</p>
        <h3 className="editorial-head text-text text-[clamp(1.5rem,4cqi,2rem)]">
          Deep diving into Computer Science
        </h3>
        <p className="text-lg text-text-secondary leading-relaxed">
          Pursuing my B.Tech in Computer Science and Engineering at IIIT SriCity gave me the theoretical foundation I needed. It pushed me to look beyond just writing code and focus on system architecture, algorithms, and writing clean, maintainable software.
        </p>
        <PullQuote>
          &ldquo;Software engineering isn&apos;t just about making things work; it&apos;s about making things work well under pressure.&rdquo;
        </PullQuote>
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="editorial-head text-text text-[clamp(1.5rem,4cqi,2rem)]">
          Building real systems
        </h3>
        <p className="text-lg text-text-secondary leading-relaxed">
          I started moving away from simple tutorials and began architecting real-world applications. The challenges got harder, but the rewards got much bigger.
        </p>
        <p className="text-lg text-text-secondary leading-relaxed">
          I discovered the MERN stack and Next.js, and suddenly I was building complex platforms:
        </p>
        <ul className="flex flex-col gap-2 text-lg text-text-secondary leading-relaxed mt-2">
          <li className="flex gap-3"><span aria-hidden className="text-text-secondary">&middot;</span><span><span className="text-text">GymRats:</span> A fitness social platform with workout tracking</span></li>
          <li className="flex gap-3"><span aria-hidden className="text-text-secondary">&middot;</span><span><span className="text-text">OpsGuardian:</span> An infrastructure monitoring tool</span></li>
          <li className="flex gap-3"><span aria-hidden className="text-text-secondary">&middot;</span><span><span className="text-text">VerifyFlow:</span> A secure identity verification system</span></li>
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <p className="font-mono-meta">Now</p>
        <h3 className="editorial-head text-text text-[clamp(1.5rem,4cqi,2rem)]">
          Scaling up
        </h3>
        <p className="text-lg text-text-secondary leading-relaxed">
          These days, my focus is on backend architecture, distributed systems, and DevOps. I love the challenge of designing scalable APIs, automating CI/CD pipelines, and creating infrastructure that doesn&apos;t fall over at 3 AM.
        </p>
        <p className="text-lg text-text leading-relaxed">
          I&apos;m always exploring new technologies, diving into system design, and building things that matter. The curiosity that started it all is still there—it&apos;s just pointed at much bigger problems now.
        </p>
      </section>
    </div>
  );
}
