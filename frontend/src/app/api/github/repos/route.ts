import { NextResponse } from 'next/server';
import { getUserRepos, getOrgRepos } from '@/lib/github';
import { projectMeta, getFeaturedProjects } from '@/data/projectMeta';

export const revalidate = 3600; // 1 hour

export interface EnrichedRepo {
  name: string;
  displayName: string;
  tagline: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  topics: string[];
  updatedAt: string;
  featured: boolean;
  category: 'personal' | 'org' | 'meta';
  status: 'active' | 'completed' | 'experimental';
  story: string[];
  achievements: { metric: string; label: string; detail: string }[];
  extraTech: string[];
  org: 'AnveshCheela';
}

export async function GET() {
  try {
    const [personalRepos, orgRepos] = await Promise.all([
      getUserRepos('AnveshCheela').catch(() => []),
      getOrgRepos('AnveshCheela').catch(() => []),
    ]);

    const enrich = (repos: typeof personalRepos, org: 'AnveshCheela'): EnrichedRepo[] =>
      repos.map(repo => {
        const meta = projectMeta[repo.name] ?? projectMeta[repo.name.toLowerCase()];
        return {
          name: repo.name,
          displayName: meta?.displayName ?? repo.name,
          tagline: meta?.tagline ?? repo.description ?? '',
          description: repo.description,
          htmlUrl: repo.html_url,
          homepage: meta?.homepageOverride ?? repo.homepage,
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          topics: repo.topics ?? [],
          updatedAt: repo.updated_at,
          featured: meta?.featured ?? false,
          category: meta?.category ?? 'personal',
          status: meta?.status ?? 'completed',
          story: meta?.story ?? [],
          achievements: meta?.achievements ?? [],
          extraTech: meta?.extraTech ?? [],
          org,
        };
      });

    const all = [
      ...enrich(personalRepos, 'AnveshCheela'),
      ...enrich(orgRepos, 'AnveshCheela'),
    ];

    // Deduplicate by name (org repos might overlap)
    const seen = new Set<string>();
    const unique = all.filter(r => {
      if (seen.has(r.name)) return false;
      seen.add(r.name);
      return true;
    });

    // Inject projectMeta-only entries (no GitHub repo) so they always appear
    for (const [name, meta] of Object.entries(projectMeta)) {
      if (!seen.has(name)) {
        unique.push({
          name,
          displayName: meta.displayName,
          tagline: meta.tagline,
          description: meta.descriptionOverride ?? meta.tagline,
          htmlUrl: '',
          homepage: meta.homepageOverride ?? null,
          language: meta.extraTech?.[0] ?? null,
          stars: 0,
          forks: 0,
          topics: meta.extraTech ?? [],
          updatedAt: new Date().toISOString(),
          featured: meta.featured,
          category: meta.category,
          status: meta.status,
          story: meta.story,
          achievements: meta.achievements,
          extraTech: meta.extraTech ?? [],
          org: 'AnveshCheela' as const,
        });
      }
    }

    const explicitOrder = getFeaturedProjects();
    unique.sort((a, b) => {
      const idxA = explicitOrder.indexOf(a.name);
      const idxB = explicitOrder.indexOf(b.name);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return NextResponse.json(unique, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    });
  } catch (err) {
    console.error('GitHub repos API error:', err);
    return NextResponse.json({ error: 'Failed to fetch repos' }, { status: 500 });
  }
}
