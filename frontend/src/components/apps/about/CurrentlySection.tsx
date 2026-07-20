import React from "react";
import { Hairline } from "@/components/editorial";
import {
  lookingFor, currentlyMastering, readingList, lifeItems, portfolioTechStack,
} from "@/data/aboutMe";

/**
 * CurrentlySection - list-shaped editorial column.
 *
 * Lists render as mono bullets / hairline-divided rows. Tech stack becomes an
 * inline mono run separated by middots. No glass cards, no colored pills, no
 * icon medallions, no graduation/student framing. lifeItems iconNames are
 * intentionally not rendered as medallions (kept in data for other surfaces).
 */

function Bulleted({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-2 text-lg text-text-secondary leading-relaxed">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden className="text-text-secondary">&middot;</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function CurrentlySection() {
  return (
    <div className="flex flex-col gap-10 max-w-[68ch]">
      <p className="text-lg text-text-secondary leading-relaxed">
        What I&apos;m working on, learning, and dealing with day-to-day.
      </p>

      <section className="flex flex-col gap-3">
        <h3 className="editorial-head text-text text-[clamp(1.5rem,4cqi,2rem)]">
          The work I want next
        </h3>
        <p className="text-lg text-text-secondary leading-relaxed">
          I am looking for software engineering roles where I can leverage my full-stack and cloud computing skills to build scalable, high-impact applications. I want to join teams that value engineering excellence, where my input matters, and where I can take charge of meaningful work.
        </p>
        <p className="font-mono-meta">What I&apos;m looking for</p>
        <Bulleted items={lookingFor} />
      </section>



      <section className="flex flex-col gap-3">
        <h3 className="editorial-head text-text text-[clamp(1.5rem,4cqi,2rem)]">
          What I&apos;m shipping
        </h3>
        <p className="text-lg text-text-secondary leading-relaxed">
          Most of my energy goes into building full-stack web applications right now.{" "}
          <span className="text-text">GymRats</span> is a MERN-stack fitness platform
          with workout tracking, progress analytics, and social features powered by
          Redis and BullMQ.{" "}
          <span className="text-text">OpsGuardian</span> is an incident management
          SaaS built with Next.js, PostgreSQL, and Prisma ORM for real-time alerting.
        </p>
        <p className="text-lg text-text-secondary leading-relaxed">
          Both come from the same itch: building robust, scalable platforms that
          solve real problems, not just demos.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="editorial-head text-text text-[clamp(1.5rem,4cqi,2rem)]">
          Building Portfolio OS
        </h3>
        <p className="text-lg text-text-secondary leading-relaxed">
          You&apos;re literally inside it right now. Started as a weekend project,
          turned into an ongoing experiment.
        </p>
        <p className="text-lg text-text-secondary leading-relaxed">
          Before this, I had a Three.js portfolio that felt childish. I wanted
          something different. Something uniquely mine. A space where I could express
          myself without worrying about what people think.
        </p>
        <p className="text-lg text-text-secondary leading-relaxed">
          Saw PostHog&apos;s OS-style website on Hacker News. That&apos;s it. Their
          whole vibe, the transparency, the writing, the culture, has been incredibly
          inspiring.
        </p>
        <p className="font-mono-meta">Built with</p>
        <p className="leading-relaxed">
          {portfolioTechStack.map((tech, i) => (
            <React.Fragment key={tech}>
              {i > 0 && <span aria-hidden className="mx-2 text-text-secondary">&middot;</span>}
              <span className="font-mono text-sm text-text">{tech}</span>
            </React.Fragment>
          ))}
        </p>
      </section>

      <Hairline />

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <p className="font-mono-meta">Currently mastering</p>
          <div className="flex flex-col">
            {currentlyMastering.map((item, i) => (
              <div key={item.name} className="flex flex-col">
                <div className="flex flex-col gap-1 py-3">
                  <span className="font-display text-text text-xl">{item.name}</span>
                  <span className="text-text-secondary leading-relaxed">{item.detail}</span>
                </div>
                {i < currentlyMastering.length - 1 && <Hairline />}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <p className="font-mono-meta">On the reading list</p>
          <Bulleted items={readingList} />
        </div>
      </section>



      <section className="flex flex-col gap-3">
        <h3 className="editorial-head text-text text-[clamp(1.5rem,4cqi,2rem)]">
          The honest truth
        </h3>
        <p className="text-lg text-text-secondary leading-relaxed">
          I&apos;m at that stage where possibilities feel endless but nothing&apos;s
          guaranteed. Building skills, shipping projects, learning constantly, looking
          for the right opportunity to make an impact.
        </p>
        <p className="text-lg text-text-secondary leading-relaxed">
          Not gonna pretend I have it all figured out. Still learning. Still growing.
          Still making mistakes and learning from them.
        </p>
        <p className="text-lg text-text leading-relaxed">
          But that&apos;s the fun part, right? This journey of continuous learning,
          building, breaking, and improving. That&apos;s what it&apos;s all about.
        </p>
      </section>
    </div>
  );
}
