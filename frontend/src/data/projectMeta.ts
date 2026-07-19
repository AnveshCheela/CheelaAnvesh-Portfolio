/**
 * Manual project metadata
 *
 * Enriches GitHub API data with taglines, stories, achievements, and context
 * that can't be derived from the API alone. Keyed by repo name.
 */

export interface Achievement {
  metric: string;
  label: string;
  detail: string;
}

export interface ProjectMeta {
  displayName: string;
  tagline: string;
  story: string[];
  achievements: Achievement[];
  featured: boolean;
  category: 'personal' | 'org' | 'meta';
  status: 'active' | 'completed' | 'experimental';
  /** Override the GitHub description */
  descriptionOverride?: string;
  /** Tech stack (augments GitHub topics) */
  extraTech?: string[];
}

export const projectMeta: Record<string, ProjectMeta> = {
  'CheelaAnvesh-Portfolio': {
    displayName: "AnveshOS",
    tagline: "You're looking at it right now",
    featured: true,
    category: 'meta',
    status: 'active',
    story: [
      "This portfolio itself. A desktop OS simulator built with Next.js 15, React 19, Framer Motion, and Zustand. Because a static page felt boring.",
      "Features a boot sequence, draggable windows, a real terminal, macOS-style dock magnification, and this very Projects app you're reading through.",
    ],
    achievements: [
      { metric: 'AnveshOS v2.0', label: 'Full OS metaphor', detail: 'Boot sequence, windows, dock, apps' },
      { metric: 'Next.js 15', label: 'React 19', detail: 'Latest and greatest' },
    ],
    extraTech: ['Next.js 15', 'React 19', 'TypeScript', 'Framer Motion', 'Zustand', 'Tailwind CSS'],
  },
};

/** Get all featured projects in display order */
export function getFeaturedProjects(): string[] {
  const explicit = [
    'CheelaAnvesh-Portfolio'
  ];
  // Append any featured projects not explicitly listed, preserving declaration order
  const rest = Object.keys(projectMeta).filter(
    k => projectMeta[k].featured && !explicit.includes(k)
  );
  return [...explicit, ...rest].filter(k => k in projectMeta);
}
